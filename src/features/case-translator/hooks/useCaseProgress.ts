import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import {
  CaseGrammarProgressState,
  CaseQuizSubmission,
  GrammaticalCase,
} from '../types/caseTranslator.types'

const STORAGE_KEY = 'd9w-case-grammar-progress-v1'

const DEFAULT_STATE: CaseGrammarProgressState = {
  version: 1,
  totalAttempts: 0,
  totalCorrect: 0,
  caseAccuracy: {
    Nominativ: { attempted: 0, correct: 0 },
    Akkusativ: { attempted: 0, correct: 0 },
    Dativ: { attempted: 0, correct: 0 },
    Genitiv: { attempted: 0, correct: 0 },
  },
  recentQuestions: [],
  builderCompletedIds: [],
  lastPracticedDate: null,
  streakDays: 0,
}

export function useCaseProgress() {
  const [progress, setProgress] = useLocalStorage<CaseGrammarProgressState>(
    STORAGE_KEY,
    DEFAULT_STATE
  )

  const recordQuizAnswer = useCallback(
    (submission: CaseQuizSubmission) => {
      setProgress((prev) => {
        const totalAttempts = prev.totalAttempts + 1
        const totalCorrect = prev.totalCorrect + (submission.isCorrect ? 1 : 0)

        const caseAccuracy = { ...prev.caseAccuracy }
        if (submission.targetCase && caseAccuracy[submission.targetCase]) {
          const current = caseAccuracy[submission.targetCase]
          caseAccuracy[submission.targetCase] = {
            attempted: current.attempted + 1,
            correct: current.correct + (submission.isCorrect ? 1 : 0),
          }
        }

        const recent = [submission, ...prev.recentQuestions].slice(0, 50)
        const todayStr = new Date().toISOString().split('T')[0]

        return {
          ...prev,
          totalAttempts,
          totalCorrect,
          caseAccuracy,
          recentQuestions: recent,
          lastPracticedDate: todayStr,
        }
      })
    },
    [setProgress]
  )

  const recordBuilderCompletion = useCallback(
    (exerciseId: string) => {
      setProgress((prev) => {
        if (prev.builderCompletedIds.includes(exerciseId)) return prev
        const todayStr = new Date().toISOString().split('T')[0]
        return {
          ...prev,
          builderCompletedIds: [...prev.builderCompletedIds, exerciseId],
          lastPracticedDate: todayStr,
        }
      })
    },
    [setProgress]
  )

  const resetProgress = useCallback(() => {
    setProgress(DEFAULT_STATE)
  }, [setProgress])

  // Calculated metrics
  const accuracyPercent =
    progress.totalAttempts > 0
      ? Math.round((progress.totalCorrect / progress.totalAttempts) * 100)
      : 0

  // Strongest and weakest case determination
  const cases: GrammaticalCase[] = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv']
  let strongestCase: { caseName: GrammaticalCase; rate: number } | null = null
  let weakestCase: { caseName: GrammaticalCase; rate: number } | null = null

  for (const c of cases) {
    const data = progress.caseAccuracy[c]
    if (data.attempted >= 2) {
      const rate = Math.round((data.correct / data.attempted) * 100)
      if (!strongestCase || rate > strongestCase.rate) {
        strongestCase = { caseName: c, rate }
      }
      if (!weakestCase || rate < weakestCase.rate) {
        weakestCase = { caseName: c, rate }
      }
    }
  }

  return {
    progress,
    totalAttempts: progress.totalAttempts,
    totalCorrect: progress.totalCorrect,
    accuracyPercent,
    strongestCase,
    weakestCase,
    recordQuizAnswer,
    recordBuilderCompletion,
    resetProgress,
  }
}
