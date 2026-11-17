import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  DailyWordProgressState,
  DailyWordQuizSubmission,
} from '../types/dailyWord.types'
import { getBerlinTodayDateString } from '../utils/dailyWordEngine'
import { calculateDailyStreak } from '../utils/dailyWordStreak'
import { DAILY_WORD_CONFIG } from '@/data/daily-word/dailyWordConfig'

const PROGRESS_STORAGE_KEY = 'd9w-daily-word-progress-v1'

const DEFAULT_PROGRESS_STATE: DailyWordProgressState = {
  viewedWordIds: [],
  learnedWordIds: [],
  learnedDates: {},
  quizAttempts: {},
  completedDates: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
}

export function useDailyWordProgress() {
  const [progress, setProgress] = useLocalStorage<DailyWordProgressState>(
    PROGRESS_STORAGE_KEY,
    DEFAULT_PROGRESS_STATE
  )

  const todayKey = getBerlinTodayDateString()

  // Track word viewing
  const recordWordView = useCallback(
    (vocabId: string) => {
      setProgress((prev) => {
        if (prev.viewedWordIds.includes(vocabId)) return prev
        return {
          ...prev,
          viewedWordIds: [...prev.viewedWordIds, vocabId],
        }
      })
    },
    [setProgress]
  )

  // Mark a word as learned
  const markWordLearned = useCallback(
    (dateKey: string, vocabId: string) => {
      setProgress((prev) => {
        const learnedWordSet = new Set(prev.learnedWordIds)
        learnedWordSet.add(vocabId)

        const completedDateSet = new Set(prev.completedDates)
        completedDateSet.add(dateKey)

        const updatedCompleted = Array.from(completedDateSet)
        const { currentStreak, longestStreak } = calculateDailyStreak(
          updatedCompleted,
          todayKey
        )

        return {
          ...prev,
          learnedWordIds: Array.from(learnedWordSet),
          learnedDates: {
            ...prev.learnedDates,
            [dateKey]: vocabId,
          },
          completedDates: updatedCompleted,
          currentStreak,
          longestStreak: Math.max(prev.longestStreak, longestStreak),
          lastActivityDate: todayKey,
        }
      })
    },
    [setProgress, todayKey]
  )

  // Unmark a word as learned
  const unmarkWordLearned = useCallback(
    (dateKey: string, vocabId: string) => {
      setProgress((prev) => {
        const learnedWordSet = new Set(prev.learnedWordIds)
        learnedWordSet.delete(vocabId)

        const updatedDates = { ...prev.learnedDates }
        delete updatedDates[dateKey]

        // Only remove from completedDates if quiz was also not completed
        const completedDateSet = new Set(prev.completedDates)
        const quizList = prev.quizAttempts[dateKey] || []
        const hasPassedQuiz = quizList.some(
          (q) => q.scorePercent >= DAILY_WORD_CONFIG.PASSING_QUIZ_PERCENT
        )
        if (!hasPassedQuiz) {
          completedDateSet.delete(dateKey)
        }

        const updatedCompleted = Array.from(completedDateSet)
        const { currentStreak, longestStreak } = calculateDailyStreak(
          updatedCompleted,
          todayKey
        )

        return {
          ...prev,
          learnedWordIds: Array.from(learnedWordSet),
          learnedDates: updatedDates,
          completedDates: updatedCompleted,
          currentStreak,
          longestStreak,
        }
      })
    },
    [setProgress, todayKey]
  )

  // Record a quiz submission
  const recordQuizAttempt = useCallback(
    (submission: DailyWordQuizSubmission) => {
      setProgress((prev) => {
        const currentList = prev.quizAttempts[submission.dateKey] || []
        const updatedQuizAttempts = {
          ...prev.quizAttempts,
          [submission.dateKey]: [...currentList, submission],
        }

        const completedDateSet = new Set(prev.completedDates)
        if (submission.scorePercent >= DAILY_WORD_CONFIG.PASSING_QUIZ_PERCENT) {
          completedDateSet.add(submission.dateKey)
        }

        const updatedCompleted = Array.from(completedDateSet)
        const { currentStreak, longestStreak } = calculateDailyStreak(
          updatedCompleted,
          todayKey
        )

        return {
          ...prev,
          quizAttempts: updatedQuizAttempts,
          completedDates: updatedCompleted,
          currentStreak,
          longestStreak: Math.max(prev.longestStreak, longestStreak),
          lastActivityDate: todayKey,
        }
      })
    },
    [setProgress, todayKey]
  )

  const isWordLearned = useCallback(
    (vocabId: string) => progress.learnedWordIds.includes(vocabId),
    [progress.learnedWordIds]
  )

  const isDateCompleted = useCallback(
    (dateKey: string) => progress.completedDates.includes(dateKey),
    [progress.completedDates]
  )

  const getQuizAttemptsForDate = useCallback(
    (dateKey: string) => progress.quizAttempts[dateKey] || [],
    [progress.quizAttempts]
  )

  const resetProgress = useCallback(() => {
    setProgress({
      viewedWordIds: [],
      learnedWordIds: [],
      learnedDates: {},
      quizAttempts: {},
      completedDates: [],
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
    })
  }, [setProgress])

  // Recalculate streak dynamically based on current Berlin today
  const { currentStreak, longestStreak } = calculateDailyStreak(
    progress.completedDates,
    todayKey
  )

  return {
    progress,
    currentStreak,
    longestStreak,
    totalLearned: progress.learnedWordIds.length,
    totalViewed: progress.viewedWordIds.length,
    learnedWordIds: progress.learnedWordIds,
    completedDates: progress.completedDates,
    recordWordView,
    markWordLearned,
    unmarkWordLearned,
    recordQuizAttempt,
    isWordLearned,
    isDateCompleted,
    getQuizAttemptsForDate,
    resetProgress,
  }
}
