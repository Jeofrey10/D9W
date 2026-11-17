/**
 * D9W German Number Generation and Validation Engine
 * Handles accurate German cardinal and ordinal number rules for 0 to 1,000,000.
 */

const ONES: Record<number, string> = {
  0: 'null',
  1: 'eins',
  2: 'zwei',
  3: 'drei',
  4: 'vier',
  5: 'fünf',
  6: 'sechs',
  7: 'sieben',
  8: 'acht',
  9: 'neun',
  10: 'zehn',
  11: 'elf',
  12: 'zwölf',
  13: 'dreizehn',
  14: 'vierzehn',
  15: 'fünfzehn',
  16: 'sechzehn', // note: no 's'
  17: 'siebzehn', // note: no 'en'
  18: 'achtzehn',
  19: 'neunzehn',
}

const TENS: Record<number, string> = {
  20: 'zwanzig',
  30: 'dreißig',
  40: 'vierzig',
  50: 'fünfzig',
  60: 'sechzig', // note: no 's'
  70: 'siebzig', // note: no 'en'
  80: 'achtzig',
  90: 'neunzig',
}

/**
 * Converts numbers between 0 and 99 into German words
 */
function convertBelow100(n: number): string {
  if (n < 20) {
    return ONES[n]
  }

  const ten = Math.floor(n / 10) * 10
  const rem = n % 10

  if (rem === 0) {
    return TENS[ten]
  }

  const oneWord = rem === 1 ? 'ein' : ONES[rem]
  return `${oneWord}und${TENS[ten]}`
}

/**
 * Converts numbers between 0 and 999 into German words
 */
function convertBelow1000(n: number, isSubChunk = false): string {
  if (n < 100) {
    if (n === 1 && isSubChunk) return 'ein'
    return convertBelow100(n)
  }

  const hundred = Math.floor(n / 100)
  const rem = n % 100

  const hundredPrefix = hundred === 1 ? 'ein' : ONES[hundred]
  const base = `${hundredPrefix}hundert`

  if (rem === 0) {
    return base
  }

  return `${base}${convertBelow100(rem)}`
}

/**
 * Converts any integer from 0 to 1,000,000 to standard German word
 */
export function numberToGermanWord(n: number): string {
  if (n < 0 || !Number.isInteger(n)) return ''
  if (n === 0) return 'null'
  if (n === 1000000) return 'eine Million'

  let result = ''
  let remaining = n

  // Millions
  if (remaining >= 1000000) {
    const millions = Math.floor(remaining / 1000000)
    remaining %= 1000000
    if (millions === 1) {
      result += 'eine Million '
    } else {
      result += `${convertBelow1000(millions)} Millionen `
    }
  }

  // Thousands
  if (remaining >= 1000) {
    const thousands = Math.floor(remaining / 1000)
    remaining %= 1000

    if (thousands === 1) {
      result += 'eintausend'
    } else {
      result += `${convertBelow1000(thousands, true)}tausend`
    }
  }

  // Remainder below 1000
  if (remaining > 0) {
    result += convertBelow1000(remaining)
  }

  return result.trim()
}

/**
 * Sanitizes and normalizes user input for spelling validation
 */
export function normalizeGermanSpelling(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '') // Remove internal whitespace for compound words
    .replace(/ss/g, 'ß') // Allow 'ss' as acceptable alternative for 'ß'
}

/**
 * Compares user spelling input with canonical German word
 */
export function validateGermanSpelling(userInput: string, canonical: string): boolean {
  const normUser = normalizeGermanSpelling(userInput)
  const normCanonical = normalizeGermanSpelling(canonical)

  return normUser === normCanonical
}
