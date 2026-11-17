/**
 * Central configuration for D9W Wort des Tages (German Word of the Day).
 * All timezone and schedule conventions originate here.
 */

export const DAILY_WORD_CONFIG = {
  /**
   * Official Institute Timezone.
   * Ensures all students worldwide see the same word on the same Berlin calendar day.
   */
  TIMEZONE: 'Europe/Berlin',

  /**
   * Schedule Reference Year
   */
  SCHEDULE_YEAR: 2026,

  /**
   * Fallback vocabulary ID if a date has no scheduled entry
   */
  FALLBACK_VOCABULARY_ID: 'noun-001', // Haus (A1)

  /**
   * Primary storage key for Wort des Tages interaction & streak state
   */
  STORAGE_KEY: 'd9w-daily-word-progress-v1',

  /**
   * Primary storage key for saved vocabulary (unified with P03-06 My Vocabulary)
   */
  MY_VOCABULARY_STORAGE_KEY: 'd9w-reading-vocabulary-v1',

  /**
   * Streak qualification rule:
   * 'quiz-or-learned': counts if quiz completed (>=60%) OR marked learned.
   */
  STREAK_RULE: 'quiz-or-learned' as const,

  /**
   * Minimum quiz score percentage required to award daily quiz credit
   */
  PASSING_QUIZ_PERCENT: 60,
} as const
