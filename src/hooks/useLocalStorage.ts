import { useState, useEffect, useCallback } from 'react'
import { LearningProgress, AssessmentResult } from '@/types/learning'

const STORAGE_VERSION = 'v1'
const PROGRESS_KEY = `d9w_learning_progress_${STORAGE_VERSION}`

const DEFAULT_PROGRESS: LearningProgress = {
  favorites: [],
  recentSearches: [],
  quizScores: {
    articleExplorer: { correct: 0, total: 0, bestStreak: 0 },
    numberTrainer: { correct: 0, total: 0 },
    timeTrainer: { correct: 0, total: 0 },
    sentenceBuilder: { correct: 0, total: 0 },
  },
  streak: {
    current: 1,
    lastActiveDate: new Date().toISOString().split('T')[0],
  },
  assessmentHistory: [],
}

/**
 * Generic safe LocalStorage hook with fallback
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    try {
      const item = window.localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      console.warn(`LocalStorage read failed for key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
          }
          return valueToStore
        })
      } catch (error) {
        console.warn(`LocalStorage write failed for key "${key}":`, error)
      }
    },
    [key]
  )

  return [storedValue, setValue]
}

/**
 * Specialized learning progress hook
 */
export function useLearningProgress() {
  const [progress, setProgress] = useLocalStorage<LearningProgress>(PROGRESS_KEY, DEFAULT_PROGRESS)

  // Verify and update streak on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const lastActive = progress.streak.lastActiveDate

    if (lastActive !== today) {
      const lastDate = new Date(lastActive)
      const currDate = new Date(today)
      const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24))

      setProgress((prev) => {
        let newStreak = prev.streak.current
        if (diffDays === 1) {
          newStreak += 1
        } else if (diffDays > 1) {
          newStreak = 1
        }

        return {
          ...prev,
          streak: {
            current: newStreak,
            lastActiveDate: today,
          },
        }
      })
    }
  }, [progress.streak.lastActiveDate, setProgress])

  const toggleFavorite = useCallback(
    (vocabId: string) => {
      setProgress((prev) => {
        const isFav = prev.favorites.includes(vocabId)
        const updated = isFav
          ? prev.favorites.filter((id) => id !== vocabId)
          : [vocabId, ...prev.favorites]

        return { ...prev, favorites: updated }
      })
    },
    [setProgress]
  )

  const isFavorite = useCallback(
    (vocabId: string) => progress.favorites.includes(vocabId),
    [progress.favorites]
  )

  const addRecentSearch = useCallback(
    (query: string) => {
      const clean = query.trim()
      if (!clean) return

      setProgress((prev) => {
        const filtered = prev.recentSearches.filter((s) => s.toLowerCase() !== clean.toLowerCase())
        return {
          ...prev,
          recentSearches: [clean, ...filtered].slice(0, 8),
        }
      })
    },
    [setProgress]
  )

  const updateQuizScore = useCallback(
    (
      tool: keyof LearningProgress['quizScores'],
      scoreData: { correctDelta: number; totalDelta: number; streak?: number }
    ) => {
      setProgress((prev) => {
        const currentToolScore = prev.quizScores[tool]
        const bestStreak =
          'bestStreak' in currentToolScore
            ? Math.max(currentToolScore.bestStreak, scoreData.streak ?? 0)
            : undefined

        return {
          ...prev,
          quizScores: {
            ...prev.quizScores,
            [tool]: {
              correct: currentToolScore.correct + scoreData.correctDelta,
              total: currentToolScore.total + scoreData.totalDelta,
              ...(bestStreak !== undefined ? { bestStreak } : {}),
            },
          },
        }
      })
    },
    [setProgress]
  )

  const saveAssessmentResult = useCallback(
    (result: AssessmentResult) => {
      setProgress((prev) => ({
        ...prev,
        assessmentHistory: [result, ...prev.assessmentHistory].slice(0, 5),
      }))
    },
    [setProgress]
  )

  return {
    progress,
    toggleFavorite,
    isFavorite,
    addRecentSearch,
    updateQuizScore,
    saveAssessmentResult,
  }
}
