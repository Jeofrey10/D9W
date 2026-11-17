import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  ListeningProgressState,
  ExerciseAttemptResult,
} from '../types/listening.types'

const STORAGE_KEY = 'd9w-listening-progress-v1'

const DEFAULT_LISTENING_PROGRESS: ListeningProgressState = {
  completedExerciseIds: [],
  exerciseAttempts: {},
  bestScores: {},
  totalListeningSeconds: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
}

export function useListeningProgress() {
  const [progress, setProgress] = useLocalStorage<ListeningProgressState>(
    STORAGE_KEY,
    DEFAULT_LISTENING_PROGRESS
  )

  const recordAttempt = useCallback(
    (result: ExerciseAttemptResult, durationSeconds: number) => {
      const today = new Date().toISOString().split('T')[0]

      setProgress((prev) => {
        const currentAttempts = prev.exerciseAttempts[result.exerciseId] || []
        const currentBest = prev.bestScores[result.exerciseId] || 0
        const newBest = Math.max(currentBest, result.scorePercent)

        const completedSet = new Set(prev.completedExerciseIds)
        if (result.completed) {
          completedSet.add(result.exerciseId)
        }

        // Streak calculation
        let streak = prev.streakDays
        if (prev.lastActiveDate !== today) {
          const prevDate = new Date(prev.lastActiveDate)
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
          completedExerciseIds: Array.from(completedSet),
          exerciseAttempts: {
            ...prev.exerciseAttempts,
            [result.exerciseId]: [...currentAttempts, result],
          },
          bestScores: {
            ...prev.bestScores,
            [result.exerciseId]: newBest,
          },
          totalListeningSeconds: prev.totalListeningSeconds + durationSeconds,
          streakDays: streak,
          lastActiveDate: today,
        }
      })
    },
    [setProgress]
  )

  const getBestScore = useCallback(
    (exerciseId: string): number | undefined => {
      return progress.bestScores[exerciseId]
    },
    [progress.bestScores]
  )

  const isCompleted = useCallback(
    (exerciseId: string): boolean => {
      return progress.completedExerciseIds.includes(exerciseId)
    },
    [progress.completedExerciseIds]
  )

  const resetProgress = useCallback(() => {
    setProgress({
      completedExerciseIds: [],
      exerciseAttempts: {},
      bestScores: {},
      totalListeningSeconds: 0,
      streakDays: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
    })
  }, [setProgress])

  // Computed summary metrics
  const totalCompleted = progress.completedExerciseIds.length
  const totalMinutes = Math.round(progress.totalListeningSeconds / 60)
  const scoresArray = Object.values(progress.bestScores)
  const averageScore =
    scoresArray.length > 0
      ? Math.round(scoresArray.reduce((acc, curr) => acc + curr, 0) / scoresArray.length)
      : 0

  return {
    progress,
    recordAttempt,
    getBestScore,
    isCompleted,
    resetProgress,
    totalCompleted,
    totalMinutes,
    averageScore,
    streakDays: progress.streakDays,
  }
}
