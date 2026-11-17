/**
 * Text and Answer Normalization Utilities for German Listening Practice
 */

/**
 * Standard German text cleaner: strips harmless punctuation and collapses spaces.
 */
export function cleanGermanText(text: string): string {
  if (!text) return ''
  return text
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»„“]/g, '')
    .replace(/\s+/g, ' ')
}

/**
 * Normalizes text to lowercase with standard whitespace.
 */
export function normalizeGermanAnswer(text: string): string {
  return cleanGermanText(text).toLowerCase()
}

/**
 * Optional transliteration of German umlauts and eszett for tolerant checking.
 */
export function transliterateGerman(text: string): string {
  return text
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
}

/**
 * Checks if a given answer matches any accepted answer for Fill-in-the-blank questions.
 */
export function checkFillBlankAnswer(
  given: string,
  accepted: string[],
  caseSensitive = false
): boolean {
  if (!given || given.trim() === '') return false

  const cleanedGiven = cleanGermanText(given)
  const normalizedGiven = caseSensitive ? cleanedGiven : cleanedGiven.toLowerCase()
  const transliteratedGiven = transliterateGerman(normalizedGiven)

  for (const candidate of accepted) {
    const cleanedCandidate = cleanGermanText(candidate)
    const normalizedCandidate = caseSensitive ? cleanedCandidate : cleanedCandidate.toLowerCase()
    const transliteratedCandidate = transliterateGerman(normalizedCandidate)

    if (
      normalizedGiven === normalizedCandidate ||
      transliteratedGiven === transliteratedCandidate
    ) {
      return true
    }
  }

  return false
}

export interface DictationScoreResult {
  similarityPercent: number
  matchingWordCount: number
  totalWordCount: number
  wordComparison: Array<{
    targetWord: string
    matched: boolean
    givenWord?: string
  }>
}

/**
 * Evaluates dictation typing against the authentic target sentence.
 * Awards partial points based on word-level accuracy.
 */
export function evaluateDictation(
  givenText: string,
  targetText: string
): DictationScoreResult {
  const targetWords = cleanGermanText(targetText).split(' ').filter(Boolean)
  const givenWords = cleanGermanText(givenText).split(' ').filter(Boolean)

  if (targetWords.length === 0) {
    return {
      similarityPercent: 100,
      matchingWordCount: 0,
      totalWordCount: 0,
      wordComparison: [],
    }
  }

  let matches = 0
  const wordComparison: DictationScoreResult['wordComparison'] = []

  // Track matches
  for (let i = 0; i < targetWords.length; i++) {
    const targetW = targetWords[i]
    const targetNorm = targetW.toLowerCase()
    const targetTrans = transliterateGerman(targetNorm)

    // Check at exact index or nearby word
    const givenW = givenWords[i]
    const givenNorm = givenW ? givenW.toLowerCase() : ''
    const givenTrans = transliterateGerman(givenNorm)

    const isMatch =
      givenNorm === targetNorm ||
      givenTrans === targetTrans ||
      givenWords.some(
        (gw) =>
          gw.toLowerCase() === targetNorm ||
          transliterateGerman(gw.toLowerCase()) === targetTrans
      )

    if (isMatch) {
      matches++
    }

    wordComparison.push({
      targetWord: targetW,
      matched: isMatch,
      givenWord: givenW || undefined,
    })
  }

  const similarityPercent = Math.round((matches / targetWords.length) * 100)

  return {
    similarityPercent,
    matchingWordCount: matches,
    totalWordCount: targetWords.length,
    wordComparison,
  }
}
