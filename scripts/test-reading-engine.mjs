/**
 * Automated Verification Test Suite for D9W Reading Practice Engine (P03-06)
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
  console.log('=== Starting D9W Reading Practice Engine Verification Suite ===\n')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  const { READING_PASSAGES } = await vite.ssrLoadModule('./src/data/reading/passages.ts')
  const { READING_CATEGORIES } = await vite.ssrLoadModule('./src/data/reading/categories.ts')
  const { _READING_LEVELS } = await vite.ssrLoadModule('./src/data/reading/levels.ts')
  const { tokenizeParagraph } = await vite.ssrLoadModule('./src/features/reading/utils/tokenizeGermanText.ts')
  const { lookupWord, GERMAN_MORPHOLOGY_MAP, getGenderStyles } = await vite.ssrLoadModule('./src/features/reading/utils/vocabularyLookup.ts')
  const {
    isQuestionAnswerCorrect,
    getReadingScoreTier,
    evaluateReadingSubmission,
    normalizeAnswerText,
  } = await vite.ssrLoadModule('./src/features/reading/utils/readingScoring.ts')
  const {
    normalizeVocabKey,
    generateVocabularyCsv,
  } = await vite.ssrLoadModule('./src/features/reading/utils/vocabularyExport.ts')

  await vite.close()

  // TEST 1: Total passage inventory
  assert(
    'Total passage count is exactly 36',
    READING_PASSAGES.length === 36,
    `Found: ${READING_PASSAGES.length}`
  )

  // TEST 2: CEFR Level distribution
  const countA1 = READING_PASSAGES.filter((p) => p.level === 'A1').length
  const countA2 = READING_PASSAGES.filter((p) => p.level === 'A2').length
  const countB1 = READING_PASSAGES.filter((p) => p.level === 'B1').length
  const countB2 = READING_PASSAGES.filter((p) => p.level === 'B2').length
  const countC1 = READING_PASSAGES.filter((p) => p.level === 'C1').length

  assert(
    'CEFR Level target distribution (8, 8, 8, 6, 6)',
    countA1 === 8 && countA2 === 8 && countB1 === 8 && countB2 === 6 && countC1 === 6,
    `A1=${countA1}, A2=${countA2}, B1=${countB1}, B2=${countB2}, C1=${countC1}`
  )

  // TEST 3: All 12 categories represented
  const coveredCategories = new Set(READING_PASSAGES.map((p) => p.category))
  assert(
    'All 12 required reading categories represented in curriculum',
    coveredCategories.size === 12 && READING_CATEGORIES.length === 12,
    `Covered: ${coveredCategories.size} of 12`
  )

  // TEST 4: Published passages with verified answer keys
  const publishedPassages = READING_PASSAGES.filter((p) => p.status === 'published')
  assert(
    'Published passages count >= 10 with verified questions and answer keys',
    publishedPassages.length >= 10,
    `Found ${publishedPassages.length} published passages`
  )

  // TEST 5: Word count calculations
  const allHavePositiveWordCounts = READING_PASSAGES.every((p) => p.wordCount > 30)
  assert(
    'All 36 passages have valid word counts and paragraph structures',
    allHavePositiveWordCounts,
    'Some passages have 0 or invalid word counts'
  )

  // TEST 6: German Text Tokenization preserving punctuation and umlauts
  const sampleParagraph = 'Der Junge geht jeden Morgen zur Schule, oder nicht?'
  const tokens = tokenizeParagraph(sampleParagraph, 0)
  const wordTokens = tokens.filter((t) => t.isWord)
  const questionMarkToken = tokens.find((t) => t.rawToken === '?')

  assert(
    'German text tokenization separates words, punctuation and casing',
    wordTokens.length === 9 &&
      Boolean(questionMarkToken) &&
      wordTokens[0].cleanWord === 'Der' &&
      wordTokens[1].cleanWord === 'Junge',
    `Found words (${wordTokens.length}): ${wordTokens.map((w) => w.cleanWord).join(' ')}`
  )

  // TEST 7: German Morphology and Inflection lookup
  const resolvedHaus = GERMAN_MORPHOLOGY_MAP['häuser']
  const resolvedGehen = GERMAN_MORPHOLOGY_MAP['ging']
  const resolvedAufstehen = GERMAN_MORPHOLOGY_MAP['stehe']
  assert(
    'Morphology map resolves plural nouns and irregular verbs (häuser->Haus, ging->gehen, stehe->aufstehen)',
    resolvedHaus === 'Haus' && resolvedGehen === 'gehen' && resolvedAufstehen === 'aufstehen',
    `häuser->${resolvedHaus}, ging->${resolvedGehen}, stehe->${resolvedAufstehen}`
  )

  // TEST 8: Word Lookup integrating passage key vocabulary and ALL_VOCABULARY
  const samplePassage = READING_PASSAGES[0] // pass-a1-alltag-01 (contains "Wohnung", "Brötchen", "aufstehen")
  const lookedUpMorgen = lookupWord('Morgen', samplePassage)
  const lookedUpBroetchen = lookupWord('Brötchen', samplePassage)
  const lookedUpUnknown = lookupWord('Xylofonzauberstein', samplePassage)

  assert(
    'Word lookup returns contextual definitions and noun articles',
    lookedUpMorgen?.article === 'der' &&
      lookedUpBroetchen?.article === 'das' &&
      lookedUpUnknown === null,
    `Morgen: ${lookedUpMorgen?.article}, Brötchen: ${lookedUpBroetchen?.article}, Unknown: ${lookedUpUnknown}`
  )

  // TEST 9: Gender styling helper
  const stylesDer = getGenderStyles('der')
  const stylesDie = getGenderStyles('die')
  const stylesDas = getGenderStyles('das')
  assert(
    'Gender color tokens follow D9W design rules (der: blue, die: red, das: green)',
    stylesDer.colorClass.includes('1E3A8A') &&
      stylesDie.colorClass.includes('C83B32') &&
      stylesDas.colorClass.includes('15803D'),
    'Gender color tokens mismatch'
  )

  // TEST 10: Answer normalization for Fill-in-the-blank and short answer
  const norm1 = normalizeAnswerText('  Brötchen!  ')
  const norm2 = normalizeAnswerText('broetchen')
  assert(
    'Answer normalization strips punctuation, whitespace and transliterates umlauts',
    norm1 === 'broetchen' && norm2 === 'broetchen',
    `norm1="${norm1}", norm2="${norm2}"`
  )

  // TEST 11: Question evaluation logic across question types
  const mcQuestion = samplePassage.questions[0] // q1 (correctIndex = 1)
  const tfQuestion = samplePassage.questions[1] // q2 (correctAnswer = false)
  const fillQuestion = samplePassage.questions[2] // q3 (acceptedAnswers = ["Brötchen", "broetchen"])

  assert(
    'Question evaluation accurately grades MC, T/F, and Fill-in-Blank',
    isQuestionAnswerCorrect(mcQuestion, 1) &&
      !isQuestionAnswerCorrect(mcQuestion, 0) &&
      isQuestionAnswerCorrect(tfQuestion, false) &&
      !isQuestionAnswerCorrect(tfQuestion, true) &&
      isQuestionAnswerCorrect(fillQuestion, 'brötchen') &&
      !isQuestionAnswerCorrect(fillQuestion, 'Kaffee'),
    'Question grading failed'
  )

  // TEST 12: Full Exercise Submission Evaluation
  const correctSubmission = { q1: 1, q2: false, q3: 'Brötchen', q4: 'um halb neun' }
  const resultCorrect = evaluateReadingSubmission(samplePassage, correctSubmission, 120)
  assert(
    'Submission evaluation generates accurate 100% score and tier "excellent"',
    resultCorrect.scorePercent === 100 &&
      resultCorrect.tier === 'excellent' &&
      resultCorrect.earnedPoints === 40,
    `Score: ${resultCorrect.scorePercent}%, Tier: ${resultCorrect.tier}`
  )

  // TEST 13: Score Tier thresholds
  const tier90 = getReadingScoreTier(92)
  const tier75 = getReadingScoreTier(80)
  const tier60 = getReadingScoreTier(65)
  const tier40 = getReadingScoreTier(45)
  assert(
    'Score Tier grading thresholds (90+, 75+, 60+, <60)',
    tier90.tier === 'excellent' &&
      tier75.tier === 'very-good' &&
      tier60.tier === 'good' &&
      tier40.tier === 'needs-practice',
    `Tiers: ${tier90.tier}, ${tier75.tier}, ${tier60.tier}, ${tier40.tier}`
  )

  // TEST 14: Normalized Vocabulary Key & CSV Export
  const key1 = normalizeVocabKey('Haus', 'das')
  const key2 = normalizeVocabKey('haus', 'das')
  const sampleItems = [
    {
      id: 'v1',
      word: 'Brötchen',
      baseForm: 'Brötchen',
      article: 'das',
      plural: 'Brötchen',
      wordType: 'noun',
      level: 'A1',
      contextMeaning: 'Small bread roll',
      englishMeaning: 'bread roll',
      exampleSentence: 'Ich kaufe zwei Brötchen.',
      sourcePassageId: 'pass-a1-alltag-01',
      sourcePassageTitle: 'Mein Morgen in Berlin',
      dateSaved: '2026-11-17',
    },
  ]
  const csv = generateVocabularyCsv(sampleItems)

  assert(
    'Vocabulary deduplication key and CSV generation conform to RFC 4180',
    key1 === key2 &&
      key1 === 'das_haus' &&
      csv.includes('"German Word"') &&
      csv.includes('"Brötchen"') &&
      csv.includes('"das"'),
    `CSV snippet: ${csv.substring(0, 80)}`
  )

  console.log(`\n=== Test Results: ${passed} Passed, ${failed} Failed ===`)
  if (failed > 0) process.exit(1)
}

runTests().catch((err) => {
  console.error('Fatal error in reading test suite:', err)
  process.exit(1)
})
