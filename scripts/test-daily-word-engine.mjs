/**
 * Automated Verification Test Suite for D9W Wort des Tages Engine (P03-07)
 */

import { createServer } from 'vite'

let passed = 0
let failed = 0

function assert(name, condition, message = '') {
  if (condition) {
    console.log(`✓ PASS: ${name}`)
    passed++
  } else {
    console.error(`✗ FAIL: ${name} — ${message}`)
    failed++
  }
}

async function runTests() {
  console.log('=== Starting D9W Wort des Tages Verification Suite ===\n')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  const { DAILY_WORD_SCHEDULE } = await vite.ssrLoadModule('./src/data/daily-word/dailyWordSchedule.ts')
  const { DAILY_WORD_CONFIG } = await vite.ssrLoadModule('./src/data/daily-word/dailyWordConfig.ts')
  const { ALL_VOCABULARY, VOCABULARY_BY_ID } = await vite.ssrLoadModule('./src/data/vocabulary/index.ts')
  const {
    resolveDailyWord,
    getBerlinTodayDateString,
    formatGermanDate,
    formatEnglishDate,
    isDateInFuture,
  } = await vite.ssrLoadModule('./src/features/daily-word/utils/dailyWordEngine.ts')
  const {
    generateDailyWordQuiz,
    scoreDailyQuiz,
  } = await vite.ssrLoadModule('./src/features/daily-word/utils/dailyWordQuizGenerator.ts')
  const {
    calculateDailyStreak,
  } = await vite.ssrLoadModule('./src/features/daily-word/utils/dailyWordStreak.ts')
  const { getGenderStyles } = await vite.ssrLoadModule('./src/features/reading/utils/vocabularyLookup.ts')

  await vite.close()

  // 1. CONFIGURATION TESTS
  console.log('\n--- 1. Configuration & Timezone Constants ---')
  assert(
    'Centralized timezone is Europe/Berlin',
    DAILY_WORD_CONFIG.TIMEZONE === 'Europe/Berlin',
    `Found: ${DAILY_WORD_CONFIG.TIMEZONE}`
  )
  assert(
    'Schedule year is 2026',
    DAILY_WORD_CONFIG.SCHEDULE_YEAR === 2026,
    `Found: ${DAILY_WORD_CONFIG.SCHEDULE_YEAR}`
  )
  assert(
    'Fallback vocabulary ID is noun-001',
    DAILY_WORD_CONFIG.FALLBACK_VOCABULARY_ID === 'noun-001',
    `Found: ${DAILY_WORD_CONFIG.FALLBACK_VOCABULARY_ID}`
  )
  assert(
    'Primary storage key is d9w-daily-word-progress-v1',
    DAILY_WORD_CONFIG.STORAGE_KEY === 'd9w-daily-word-progress-v1',
    `Found: ${DAILY_WORD_CONFIG.STORAGE_KEY}`
  )
  assert(
    'My Vocabulary storage key matches P03-06 (d9w-reading-vocabulary-v1)',
    DAILY_WORD_CONFIG.MY_VOCABULARY_STORAGE_KEY === 'd9w-reading-vocabulary-v1',
    `Found: ${DAILY_WORD_CONFIG.MY_VOCABULARY_STORAGE_KEY}`
  )

  // 2. 365-DAY SCHEDULE INTEGRITY
  console.log('\n--- 2. 365-Day Schedule Integrity for 2026 ---')
  assert(
    'Schedule has exactly 365 entries',
    DAILY_WORD_SCHEDULE.length === 365,
    `Found: ${DAILY_WORD_SCHEDULE.length}`
  )
  assert(
    'First schedule entry is 2026-01-01',
    DAILY_WORD_SCHEDULE[0].dateKey === '2026-01-01',
    `Found: ${DAILY_WORD_SCHEDULE[0].dateKey}`
  )
  assert(
    'Last schedule entry is 2026-12-31',
    DAILY_WORD_SCHEDULE[DAILY_WORD_SCHEDULE.length - 1].dateKey === '2026-12-31',
    `Found: ${DAILY_WORD_SCHEDULE[DAILY_WORD_SCHEDULE.length - 1].dateKey}`
  )

  // Verify consecutive sequence without missing days
  let datesSequential = true
  const seenDates = new Set()
  let duplicateDate = null

  for (let i = 0; i < DAILY_WORD_SCHEDULE.length; i++) {
    const d = DAILY_WORD_SCHEDULE[i].dateKey
    if (seenDates.has(d)) {
      duplicateDate = d
      datesSequential = false
      break
    }
    seenDates.add(d)

    // Check against expected calendar date
    const expected = new Date(Date.UTC(2026, 0, 1 + i)).toISOString().split('T')[0]
    if (d !== expected) {
      datesSequential = false
      console.error(`Date mismatch at index ${i}: expected ${expected}, got ${d}`)
      break
    }
  }

  assert(
    'All 365 days are strictly consecutive and unique',
    datesSequential && seenDates.size === 365,
    `Duplicates or gaps encountered: ${duplicateDate}`
  )

  // 3. EDITORIAL REVIEW & PUBLICATION STATUS
  console.log('\n--- 3. Editorial Review & Publication Status ---')
  const publishedEntries = DAILY_WORD_SCHEDULE.filter((entry) => entry.published)
  const reviewEntries = DAILY_WORD_SCHEDULE.filter((entry) => !entry.published)

  assert(
    'Published count is 334 (Jan 01 through Nov 30, 2026)',
    publishedEntries.length === 334,
    `Found: ${publishedEntries.length}`
  )
  assert(
    'In-review count is 31 (Dec 01 through Dec 31, 2026)',
    reviewEntries.length === 31,
    `Found: ${reviewEntries.length}`
  )

  const reviewEntriesMarkedUnderReview = reviewEntries.every(
    (e) => e.editorialReviewStatus === 'under-review'
  )
  assert(
    'All unpublished entries are explicitly marked editorialReviewStatus: under-review',
    reviewEntriesMarkedUnderReview,
    'Some unpublished entries are missing the under-review status'
  )

  // 4. VOCABULARY CORPUS & CEFR DISTRIBUTION
  console.log('\n--- 4. Vocabulary Corpus & CEFR Coverage ---')
  assert(
    'Total canonical vocabulary items >= 140',
    ALL_VOCABULARY.length >= 140,
    `Found: ${ALL_VOCABULARY.length}`
  )

  const cefrCounts = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 }
  for (const v of ALL_VOCABULARY) {
    if (cefrCounts[v.level] !== undefined) {
      cefrCounts[v.level]++
    }
  }

  assert('A1 vocabulary present', cefrCounts.A1 >= 50, `Found: ${cefrCounts.A1}`)
  assert('A2 vocabulary present', cefrCounts.A2 >= 15, `Found: ${cefrCounts.A2}`)
  assert('B1 vocabulary present', cefrCounts.B1 >= 15, `Found: ${cefrCounts.B1}`)
  assert('B2 vocabulary present (P03-07 expansion)', cefrCounts.B2 >= 10, `Found: ${cefrCounts.B2}`)
  assert('C1 vocabulary present (P03-07 expansion)', cefrCounts.C1 >= 8, `Found: ${cefrCounts.C1}`)

  // Verify all schedule entries point to valid vocabulary
  let allScheduleIdsValid = true
  let missingId = null
  for (const entry of DAILY_WORD_SCHEDULE) {
    if (!VOCABULARY_BY_ID.has(entry.vocabularyId)) {
      allScheduleIdsValid = false
      missingId = entry.vocabularyId
      break
    }
  }

  assert(
    'All 365 schedule entries link to existing canonical vocabulary IDs',
    allScheduleIdsValid,
    `Missing ID: ${missingId}`
  )

  // 5. DETERMINISM & BERLIN DATE RESOLUTION
  console.log('\n--- 5. Determinism & Berlin Date Resolution ---')
  const testDate = '2026-05-18'
  const res1 = resolveDailyWord(testDate)
  const res2 = resolveDailyWord(testDate)

  assert(
    'resolveDailyWord is purely deterministic for same date',
    res1.schedule.dateKey === res2.schedule.dateKey && res1.vocabulary.id === res2.vocabulary.id,
    'Non-deterministic result returned for identical date query'
  )

  const fallbackRes = resolveDailyWord('2030-01-01')
  assert(
    'resolveDailyWord falls back gracefully for dates outside schedule',
    fallbackRes.vocabulary.id === 'noun-001',
    `Found fallback ID: ${fallbackRes.vocabulary.id}`
  )

  const todayBerlin = getBerlinTodayDateString()
  assert(
    'getBerlinTodayDateString returns valid YYYY-MM-DD string',
    /^\d{4}-\d{2}-\d{2}$/.test(todayBerlin),
    `Found: ${todayBerlin}`
  )

  const germanFormatted = formatGermanDate('2026-10-03')
  assert(
    'formatGermanDate formats correctly in German locale',
    germanFormatted.includes('Oktober') || germanFormatted.includes('Okt'),
    `Found: ${germanFormatted}`
  )

  const englishFormatted = formatEnglishDate('2026-10-03')
  assert(
    'formatEnglishDate formats correctly in English locale',
    englishFormatted.includes('October') || englishFormatted.includes('Oct'),
    `Found: ${englishFormatted}`
  )

  assert(
    'isDateInFuture correctly identifies future date vs past date',
    isDateInFuture('2099-01-01') === true && isDateInFuture('2020-01-01') === false,
    'Future/past calculation incorrect'
  )

  // 6. MINI QUIZ GENERATION & SCORING
  console.log('\n--- 6. Mini-Quiz Generation & Scoring ---')
  const testVocab = VOCABULARY_BY_ID.get('noun-001') // der Tisch
  const quiz = generateDailyWordQuiz(testVocab)

  assert(
    'Quiz generates valid question array',
    quiz.length >= 2,
    `Found: ${quiz.length}`
  )

  assert(
    'First question is article selection for nouns',
    quiz[0].type === 'article-selection',
    `Found: ${quiz[0].type}`
  )

  assert(
    'Second question is meaning selection with 4 options',
    quiz[1].type === 'meaning-selection' && quiz[1].options.length === 4,
    `Found options length: ${quiz[1].options.length}`
  )

  assert(
    'Meaning question options contain the correct answer',
    quiz[1].options.includes(quiz[1].options[quiz[1].correctAnswer]),
    `Options: ${quiz[1].options.join(', ')} | Correct Index: ${quiz[1].correctAnswer}`
  )

  // Test scoring logic
  const perfectScore = scoreDailyQuiz(3, 3)
  assert(
    'Score 3/3 produces 100% and Ausgezeichnet! tier',
    perfectScore.scorePercent === 100 && perfectScore.title === 'Ausgezeichnet!',
    `Title: ${perfectScore.title}, %: ${perfectScore.scorePercent}`
  )

  const twoThirdsScore = scoreDailyQuiz(2, 3)
  assert(
    'Score 2/3 produces 67% and Gut gemacht! tier',
    twoThirdsScore.scorePercent === 67 && twoThirdsScore.title === 'Gut gemacht!',
    `Title: ${twoThirdsScore.title}, %: ${twoThirdsScore.scorePercent}`
  )

  const zeroScore = scoreDailyQuiz(0, 3)
  assert(
    'Score 0/3 produces 0% and Weiter üben! tier',
    zeroScore.scorePercent === 0 && zeroScore.title === 'Weiter üben!',
    `Title: ${zeroScore.title}, %: ${zeroScore.scorePercent}`
  )

  // 7. STREAK CALCULATOR
  console.log('\n--- 7. Consecutive Daily Streak Calculator ---')
  // Scenario: Today is 2026-05-10. Completed 2026-05-10, 2026-05-09, 2026-05-08
  const mockDates = ['2026-05-08', '2026-05-09', '2026-05-10']
  const streakRes = calculateDailyStreak(mockDates, '2026-05-10')
  assert(
    'Active 3-day consecutive streak calculates to 3',
    streakRes.currentStreak === 3 && streakRes.longestStreak === 3,
    `Current: ${streakRes.currentStreak}, Longest: ${streakRes.longestStreak}`
  )

  // Scenario: Missed yesterday
  const brokenStreakDates = ['2026-05-05', '2026-05-06', '2026-05-10']
  const brokenRes = calculateDailyStreak(brokenStreakDates, '2026-05-10')
  assert(
    'Broken streak resets current streak to 1',
    brokenRes.currentStreak === 1 && brokenRes.longestStreak === 2,
    `Current: ${brokenRes.currentStreak}, Longest: ${brokenRes.longestStreak}`
  )

  // 8. GENDER COLOR TOKEN CONSISTENCY
  console.log('\n--- 8. Gender Color Token Consistency ---')
  const derStyle = getGenderStyles('der')
  const dieStyle = getGenderStyles('die')
  const dasStyle = getGenderStyles('das')

  assert(
    'der uses Prussian Blue (#1E3A8A)',
    derStyle.colorClass.includes('#1E3A8A'),
    `Class: ${derStyle.colorClass}`
  )
  assert(
    'die uses Crimson Red (#C83B32)',
    dieStyle.colorClass.includes('#C83B32'),
    `Class: ${dieStyle.colorClass}`
  )
  assert(
    'das uses Forest Moss Green (#15803D)',
    dasStyle.colorClass.includes('#15803D'),
    `Class: ${dasStyle.colorClass}`
  )

  // SUMMARY
  console.log(`\n========================================`)
  console.log(`Total tests: ${passed + failed}`)
  console.log(`Passed:      ${passed}`)
  console.log(`Failed:      ${failed}`)
  console.log(`========================================\n`)

  if (failed > 0) {
    process.exit(1)
  }
}

runTests().catch((err) => {
  console.error('Fatal error running verification suite:', err)
  process.exit(1)
})
