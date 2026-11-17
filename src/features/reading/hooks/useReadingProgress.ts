import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { ReadingProgressState, ReadingAttemptResult } from '../types/reading.types'

const PROGRESS_STORAGE_KEY = 'd9w-reading-progress-v1'

const DEFAULT_READING_PROGRESS: ReadingProgressState = {
  completedPassageIds: [],
  attempts: {},
  bestScores: {},
  totalReadingMinutes: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
}

export function useReadingProgress() {
  const [progress, setProgress] = useLocalStorage<ReadingProgressState>(
    PROGRESS_STORAGE_KEY,
    DEFAULT_READING_PROGRESS
  )

  const recordAttempt = useCallback(
    (result: ReadingAttemptResult, readingMinutes: number) => {
      const today = new Date().toISOString().split('T')[0]

      setProgress((prev) => {
        const currentAttempts = prev.attempts[result.passageId] || []
        const currentBest = prev.bestScores[result.passageId] || 0
        const newBest = Math.max(currentBest, result.scorePercent)

        const completedSet = new Set(prev.completedPassageIds)
        if (result.completed) {
          completedSet.add(result.passageId)
        }

        // Streak day update
        let streak = prev.streakDays
        if (prev.lastActiveDate !== today) {
          const prevDate = new Date(prev.lastActiveDate || today)
          const currDate = new Date(today)
          const diffDays = Math.floor(
            (currDate.getTime() - prevDate.getTime()) / (1000 * 3600 * 24)
          )
          if (diffDays === 1) {
            streak += 1
          } else if (diffDays > 1) {
            streak = 1
          }
        }

        return {
          ...prev,
          completedPassageIds: Array.from(completedSet),
          attempts: {
            ...prev.attempts,
            [result.passageId]: [...currentAttempts, result],
          },
          bestScores: {
            ...prev.bestScores,
            [result.passageId]: newBest,
          },
          totalReadingMinutes:
            prev.totalReadingMinutes + Math.max(1, Math.round(readingMinutes)),
          streakDays: streak,
          lastActiveDate: today,
        }
      })
    },
    [setProgress]
  )

  const resetProgress = useCallback(() => {
    setProgress({
      completedPassageIds: [],
      attempts: {},
      bestScores: {},
      totalReadingMinutes: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    })
  }, [setProgress])

  return {
    progress,
    recordAttempt,
    resetProgress,
    totalCompleted: progress.completedPassageIds.length,
    totalMinutes: progress.totalReadingMinutes,
    averageScore: (() => {
      const scores = Object.values(progress.bestScores)
      if (scores.length === 0) return 0
      const sum = scores.reduce((a, b) => a + b, 0)
      return Math.round(sum / scores.length)
    })(),
    streakDays: progress.streakDays,
  }
}
