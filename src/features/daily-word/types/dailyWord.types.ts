import { VocabularyItem } from '@/types/learning'

export type DailyWordReviewStatus = 'verified' | 'under-review' | 'pending-curriculum'

export interface DailyWordScheduleEntry {
  dateKey: string // YYYY-MM-DD (e.g. "2026-11-17")
  vocabularyId: string
  published: boolean
  editorialReviewStatus: DailyWordReviewStatus
  dayOfYear: number // 1 to 365 (or 366 in leap year)
  theme?: string
}

export interface DailyWordItem {
  schedule: DailyWordScheduleEntry
  vocabulary: VocabularyItem
  dateFormattedGerman: string // e.g. "17. November 2026"
  dateFormattedEnglish: string // e.g. "17 November 2026"
  isToday: boolean
  isPast: boolean
  isFuture: boolean
  secondaryExample?: {
    german: string
    english: string
  }
}

export type DailyWordQuizType =
  | 'meaning-selection'
  | 'article-selection'
  | 'fill-blank'
  | 'context-usage'
  | 'word-recognition'

export interface DailyWordQuizQuestion {
  id: string
  type: DailyWordQuizType
  prompt: string
  options?: string[]
  correctAnswer: string | number
  explanation: string
  points: number
}

export interface DailyWordQuizSubmission {
  dateKey: string
  vocabularyId: string
  answers: Record<string, string | number>
  earnedPoints: number
  totalPoints: number
  scorePercent: number
  tier: 'excellent' | 'very-good' | 'good' | 'needs-practice'
  submittedAt: string
}

export interface DailyWordProgressState {
  viewedWordIds: string[]
  learnedWordIds: string[]
  learnedDates: Record<string, string> // dateKey -> vocabularyId
  quizAttempts: Record<string, DailyWordQuizSubmission[]>
  completedDates: string[] // dates where user earned credit (learned or quiz >= 60%)
  currentStreak: number
  longestStreak: number
  lastActivityDate: string | null
}
