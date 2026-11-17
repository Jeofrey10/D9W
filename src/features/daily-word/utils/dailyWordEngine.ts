import { DAILY_WORD_CONFIG } from '@/data/daily-word/dailyWordConfig'
import {
  DAILY_WORD_SCHEDULE_MAP,
  DAILY_WORD_SCHEDULE,
} from '@/data/daily-word/dailyWordSchedule'
import { ALL_VOCABULARY, findVocabularyById } from '@/data/vocabulary'
import {
  DailyWordItem,
  DailyWordScheduleEntry,
} from '../types/dailyWord.types'
import { MONTH_NAMES_DE, MONTH_NAMES_EN } from '@/features/batches/utils/calendarUtils'

/**
 * Returns today's calendar date string (YYYY-MM-DD) in the official institute timezone (Europe/Berlin).
 * This guarantees midnight transitions and dates are identical for all learners worldwide.
 */
export function getBerlinTodayDateString(): string {
  try {
    const formatter = new Intl.DateTimeFormat('en-CA', {
      timeZone: DAILY_WORD_CONFIG.TIMEZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    return formatter.format(new Date())
  } catch (err) {
    console.warn('Intl timezone calculation fallback:', err)
    return new Date().toISOString().split('T')[0]
  }
}

/**
 * Checks if a date string is in the future relative to Europe/Berlin today.
 */
export function isDateInFuture(dateKey: string): boolean {
  const todayKey = getBerlinTodayDateString()
  return dateKey > todayKey
}

/**
 * Checks if a date string refers to Europe/Berlin today.
 */
export function isDateToday(dateKey: string): boolean {
  const todayKey = getBerlinTodayDateString()
  return dateKey === todayKey
}

/**
 * Formats YYYY-MM-DD into a human-readable German date (e.g. "17. November 2026").
 */
export function formatGermanDate(dateKey: string): string {
  const parts = dateKey.split('-').map(Number)
  if (parts.length !== 3 || parts.some(isNaN)) return dateKey
  const [year, month, day] = parts
  const monthName = MONTH_NAMES_DE[month - 1] || ''
  return `${day}. ${monthName} ${year}`
}

/**
 * Formats YYYY-MM-DD into a human-readable English date (e.g. "17 November 2026").
 */
export function formatEnglishDate(dateKey: string): string {
  const parts = dateKey.split('-').map(Number)
  if (parts.length !== 3 || parts.some(isNaN)) return dateKey
  const [year, month, day] = parts
  const monthName = MONTH_NAMES_EN[month - 1] || ''
  return `${day} ${monthName} ${year}`
}

/**
 * Resolves the DailyWordItem for a specified date key.
 * Strictly deterministic: identical dateKey always resolves to the identical published word.
 */
export function resolveDailyWord(dateKey: string): DailyWordItem {
  const todayKey = getBerlinTodayDateString()

  // 1. Look up schedule entry
  let scheduleEntry: DailyWordScheduleEntry | undefined = DAILY_WORD_SCHEDULE_MAP[dateKey]

  // Fallback to day of year or first schedule item if outside 2026 bounds
  if (!scheduleEntry) {
    const fallbackEntry =
      DAILY_WORD_SCHEDULE[0] || {
        dateKey,
        vocabularyId: DAILY_WORD_CONFIG.FALLBACK_VOCABULARY_ID,
        published: true,
        editorialReviewStatus: 'verified',
        dayOfYear: 1,
      }
    scheduleEntry = {
      ...fallbackEntry,
      dateKey,
    }
  }

  // 2. Look up canonical vocabulary record
  let vocabItem = findVocabularyById(scheduleEntry.vocabularyId)

  // Fallback if ID was not found in dictionary pool
  if (!vocabItem) {
    vocabItem =
      findVocabularyById(DAILY_WORD_CONFIG.FALLBACK_VOCABULARY_ID) ||
      ALL_VOCABULARY[0]
  }

  const isToday = dateKey === todayKey
  const isPast = dateKey < todayKey
  const isFuture = dateKey > todayKey

  return {
    schedule: scheduleEntry,
    vocabulary: vocabItem,
    dateFormattedGerman: formatGermanDate(dateKey),
    dateFormattedEnglish: formatEnglishDate(dateKey),
    isToday,
    isPast,
    isFuture,
  }
}
