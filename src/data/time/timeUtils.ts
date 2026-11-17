/**
 * D9W German Time Expression Generator
 * Generates both formal (24h) and informal conversational German time strings with linguistic precision.
 */

const HOUR_WORDS: Record<number, string> = {
  0: 'zwölf',
  1: 'ein', // used in "ein Uhr"
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
  16: 'sechzehn',
  17: 'siebzehn',
  18: 'achtzehn',
  19: 'neunzehn',
  20: 'zwanzig',
  21: 'einundzwanzig',
  22: 'zweiundzwanzig',
  23: 'dreiundzwanzig',
  24: 'vierundzwanzig',
}

const MINUTE_WORDS: Record<number, string> = {
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
  15: 'fünfzehn',
  20: 'zwanzig',
  25: 'fünfundzwanzig',
  30: 'dreißig',
  35: 'fünfunddreißig',
  40: 'vierzig',
  45: 'fünfundvierzig',
  50: 'fünfzig',
  55: 'fünfundfünfzig',
}

export interface GermanTimeRepresentation {
  formal: string
  informal: string
  explanation: string
  digitalFormatted: string
}

/**
 * Returns formal and informal German representations for hour (0-23) and minute (0-59)
 */
export function getGermanTime(hour: number, minute: number): GermanTimeRepresentation {
  const clampedHour = Math.max(0, Math.min(23, hour))
  const clampedMinute = Math.max(0, Math.min(59, minute))

  const pad = (n: number) => n.toString().padStart(2, '0')
  const digitalFormatted = `${pad(clampedHour)}:${pad(clampedMinute)}`

  // 1. Formal representation (24-hour system)
  let formalHourWord = HOUR_WORDS[clampedHour] || `${clampedHour}`
  if (clampedHour === 1 && clampedMinute === 0) {
    formalHourWord = 'ein' // "ein Uhr"
  } else if (clampedHour === 1) {
    formalHourWord = 'ein'
  }

  let formal = ''
  if (clampedMinute === 0) {
    formal = `Es ist ${formalHourWord} Uhr.`
  } else {
    const minuteWord = MINUTE_WORDS[clampedMinute] || `${clampedMinute}`
    formal = `Es ist ${formalHourWord} Uhr ${minuteWord}.`
  }

  // 2. Informal representation (12-hour conversational system)
  const hour12 = clampedHour % 12 === 0 ? 12 : clampedHour % 12
  const nextHour12 = (hour12 % 12) + 1

  const currentHourWord = hour12 === 1 ? 'eins' : HOUR_WORDS[hour12]
  const currentHourForUhr = hour12 === 1 ? 'ein' : HOUR_WORDS[hour12]
  const nextHourWord = nextHour12 === 1 ? 'eins' : HOUR_WORDS[nextHour12]

  let informal = ''
  let explanation = ''

  if (clampedMinute === 0) {
    informal = `Es ist ${currentHourForUhr} Uhr.`
    explanation = 'On the full hour, standard informal time uses "[Hour] Uhr".'
  } else if (clampedMinute === 15) {
    informal = `Es ist Viertel nach ${currentHourWord}.`
    explanation = '15 minutes past the hour is expressed as "Viertel nach [hour]".'
  } else if (clampedMinute === 30) {
    informal = `Es ist halb ${nextHourWord}.`
    explanation = 'Crucial German rule: "halb" refers to halfway toward the NEXT hour.'
  } else if (clampedMinute === 45) {
    informal = `Es ist Viertel vor ${nextHourWord}.`
    explanation = '15 minutes before the next hour is expressed as "Viertel vor [next hour]".'
  } else if (clampedMinute < 25) {
    const minWord = MINUTE_WORDS[clampedMinute] || `${clampedMinute}`
    informal = `Es ist ${minWord} nach ${currentHourWord}.`
    explanation = `Up to 24 minutes past, use "[minutes] nach ${currentHourWord}".`
  } else if (clampedMinute < 30) {
    const minDiff = 30 - clampedMinute
    const minWord = MINUTE_WORDS[minDiff] || `${minDiff}`
    informal = `Es ist ${minWord} vor halb ${nextHourWord}.`
    explanation = `Between 25 and 29 minutes, conversational German uses "[minutes] vor halb ${nextHourWord}".`
  } else if (clampedMinute < 35) {
    const minDiff = clampedMinute - 30
    const minWord = MINUTE_WORDS[minDiff] || `${minDiff}`
    informal = `Es ist ${minWord} nach halb ${nextHourWord}.`
    explanation = `Between 31 and 35 minutes, conversational German uses "[minutes] nach halb ${nextHourWord}".`
  } else {
    const minDiff = 60 - clampedMinute
    const minWord = MINUTE_WORDS[minDiff] || `${minDiff}`
    informal = `Es ist ${minWord} vor ${nextHourWord}.`
    explanation = `From 36 to 59 minutes, conversational German counts toward the next hour with "vor ${nextHourWord}".`
  }

  return {
    formal,
    informal,
    explanation,
    digitalFormatted,
  }
}
