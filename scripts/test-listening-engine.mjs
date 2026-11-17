/**
 * Automated Verification Test Suite for D9W Listening Practice Engine (P03-05)
 */

import fs from 'fs'
import path from 'path'
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
  console.log('=== Starting D9W Listening Practice Engine Verification Suite ===\n')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  const {
    cleanGermanText,
    checkFillBlankAnswer,
    evaluateDictation,
  } = await vite.ssrLoadModule('./src/features/listening/utils/answerNormalization.ts')

  const {
    getScoreTier,
    formatAudioTime,
    evaluateExerciseSubmission,
  } = await vite.ssrLoadModule('./src/features/listening/utils/listeningScoring.ts')

  const { LISTENING_EXERCISES } = await vite.ssrLoadModule('./src/data/listening/exercises.ts')
  const { AUDIO_MANIFEST } = await vite.ssrLoadModule('./src/data/listening/audioManifest.ts')

  await vite.close()

  // TEST 1: Total exercise count target (36 exercises)
  assert(
    'Total exercise count is exactly 36',
    LISTENING_EXERCISES.length === 36,
    `Found: ${LISTENING_EXERCISES.length}`
  )

  // TEST 2: CEFR level distribution (A1: 8, A2: 8, B1: 8, B2: 6, C1: 6)
  const countA1 = LISTENING_EXERCISES.filter((e) => e.level === 'A1').length
  const countA2 = LISTENING_EXERCISES.filter((e) => e.level === 'A2').length
  const countB1 = LISTENING_EXERCISES.filter((e) => e.level === 'B1').length
  const countB2 = LISTENING_EXERCISES.filter((e) => e.level === 'B2').length
  const countC1 = LISTENING_EXERCISES.filter((e) => e.level === 'C1').length

  assert(
    'CEFR Level target distribution (8, 8, 8, 6, 6)',
    countA1 === 8 && countA2 === 8 && countB1 === 8 && countB2 === 6 && countC1 === 6,
    `A1=${countA1}, A2=${countA2}, B1=${countB1}, B2=${countB2}, C1=${countC1}`
  )

  // TEST 3: All 10 categories covered
  const categories = new Set(LISTENING_EXERCISES.map((e) => e.category))
  assert(
    'All 10 required listening categories represented',
    categories.size === 10,
    `Covered: ${categories.size} categories`
  )

  // TEST 4: All 6 exercise types represented
  const types = new Set(LISTENING_EXERCISES.map((e) => e.exerciseType))
  assert(
    'All 6 exercise types represented (mc, tf, fill, conv, announcement, dictation)',
    types.has('multiple-choice') &&
      types.has('true-false') &&
      types.has('fill-blank') &&
      types.has('conversation') &&
      types.has('announcement') &&
      types.has('dictation'),
    `Types: ${Array.from(types).join(', ')}`
  )

  // TEST 5: Published exercises have real audio files on disk
  const publishedExercises = LISTENING_EXERCISES.filter((e) => e.published)
  let allAudioFilesExist = true
  for (const ex of publishedExercises) {
    const relativePath = ex.audioSrc.replace(/^\//, '')
    const fullPath = path.resolve(process.cwd(), 'public', relativePath.replace(/^public\//, ''))
    if (!fs.existsSync(fullPath)) {
      console.error(`Missing audio asset: ${fullPath} for exercise ${ex.id}`)
      allAudioFilesExist = false
    } else {
      const stats = fs.statSync(fullPath)
      if (stats.size < 1000) {
        console.error(`Audio file too small: ${fullPath} (${stats.size} bytes)`)
        allAudioFilesExist = false
      }
    }
  }
  assert(
    `All ${publishedExercises.length} published exercises have physical, playable audio files on disk`,
    allAudioFilesExist && publishedExercises.length === 10,
    `Published count: ${publishedExercises.length}`
  )

  // TEST 6: Audio Manifest consistency
  const manifestKeys = Object.keys(AUDIO_MANIFEST)
  assert(
    'Audio manifest contains entries for all published exercises',
    manifestKeys.length === publishedExercises.length,
    `Manifest keys: ${manifestKeys.length}`
  )

  // TEST 7: Text Normalization and Cleaning
  const sampleClean = cleanGermanText('  Guten Tag, Herr Müller! Wie geht es?  ')
  assert(
    'German text cleaner removes punctuation and trims',
    sampleClean === 'Guten Tag Herr Müller Wie geht es',
    `Result: "${sampleClean}"`
  )

  // TEST 8: Fill-in-the-blank answer validation
  const match1 = checkFillBlankAnswer('Cappuccino', ['Cappuccino', 'Kaffee'])
  const match2 = checkFillBlankAnswer('cappuccino', ['Cappuccino', 'Kaffee'])
  const match3 = checkFillBlankAnswer('Tee', ['Cappuccino', 'Kaffee'])
  assert('Fill-in-the-blank tolerant answer checking', match1 && match2 && !match3)

  // TEST 9: Dictation evaluation with word similarity
  const dictationTarget = 'Meine Telefonnummer ist 01520 3994636.'
  const dictationGivenFull = 'Meine Telefonnummer ist 01520 3994636.'
  const dictationGivenPartial = 'Meine Telefonnummer ist.'
  const evalFull = evaluateDictation(dictationGivenFull, dictationTarget)
  const evalPart = evaluateDictation(dictationGivenPartial, dictationTarget)

  assert(
    'Dictation 100% exact match evaluation',
    evalFull.similarityPercent === 100 && evalFull.matchingWordCount === 5,
    `Similarity: ${evalFull.similarityPercent}%, Matching: ${evalFull.matchingWordCount}/5`
  )
  assert(
    'Dictation partial match calculation',
    evalPart.similarityPercent === 60 && evalPart.matchingWordCount === 3,
    `Similarity: ${evalPart.similarityPercent}%, Matching: ${evalPart.matchingWordCount}/5`
  )

  // TEST 10: Score Tier Classification
  const tier95 = getScoreTier(95)
  const tier80 = getScoreTier(80)
  const tier65 = getScoreTier(65)
  const tier40 = getScoreTier(40)

  assert(
    'Score Tier grading thresholds (90+, 75+, 60+, <60)',
    tier95.tier === 'excellent' &&
      tier80.tier === 'very-good' &&
      tier65.tier === 'good' &&
      tier40.tier === 'needs-practice',
    `Tiers: ${tier95.tier}, ${tier80.tier}, ${tier65.tier}, ${tier40.tier}`
  )

  // TEST 11: Audio Time Formatter
  assert(
    'Audio time formatting (mm:ss)',
    formatAudioTime(75) === '1:15' && formatAudioTime(8) === '0:08',
    `75s -> ${formatAudioTime(75)}, 8s -> ${formatAudioTime(8)}`
  )

  // TEST 12: Full Exercise Submission Evaluation
  const testEx = LISTENING_EXERCISES[0] // ex-a1-alltag-01 (q1: multiple-choice [index 1], q2: true-false [false])
  const answersCorrect = { q1: 1, q2: false }
  const resultCorrect = evaluateExerciseSubmission(testEx, answersCorrect, 15)

  assert(
    'Submission evaluation generates accurate 100% score for correct answers',
    resultCorrect.scorePercent === 100 &&
      resultCorrect.earnedPoints === 20 &&
      resultCorrect.totalPoints === 20,
    `Score: ${resultCorrect.scorePercent}%, Points: ${resultCorrect.earnedPoints}/${resultCorrect.totalPoints}`
  )

  const answersWrong = { q1: 0, q2: true }
  const resultWrong = evaluateExerciseSubmission(testEx, answersWrong, 10)
  assert(
    'Submission evaluation generates accurate 0% score for incorrect answers',
    resultWrong.scorePercent === 0 && resultWrong.earnedPoints === 0,
    `Score: ${resultWrong.scorePercent}%`
  )

  console.log(`\n=== Test Results: ${passed} Passed, ${failed} Failed ===`)
  if (failed > 0) process.exit(1)
}

runTests().catch((err) => {
  console.error('Fatal error in listening test suite:', err)
  process.exit(1)
})
