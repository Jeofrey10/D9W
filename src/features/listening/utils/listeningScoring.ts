import {
  ListeningExercise,
  UserAnswerRecord,
  ExerciseAttemptResult,
} from '../types/listening.types'
import { checkFillBlankAnswer, evaluateDictation } from './answerNormalization'

export type ScoreTier = 'excellent' | 'very-good' | 'good' | 'needs-practice'

export interface ScoreTierInfo {
  tier: ScoreTier
  labelDe: string
  labelEn: string
  colorBadgeClass: string
  feedbackText: string
}

export function getScoreTier(percentage: number): ScoreTierInfo {
  if (percentage >= 90) {
    return {
      tier: 'excellent',
      labelDe: 'Ausgezeichnet',
      labelEn: 'Excellent',
      colorBadgeClass: 'bg-[#2E7D32]/10 text-[#2E7D32] border-[#2E7D32]/30',
      feedbackText: 'Hervorragendes Hörverständnis! Sie haben fast alle Details sicher erfasst.',
    }
  }
  if (percentage >= 75) {
    return {
      tier: 'very-good',
      labelDe: 'Sehr gut',
      labelEn: 'Very Good',
      colorBadgeClass: 'bg-[#1E4F8A]/10 text-[#1E4F8A] border-[#1E4F8A]/30',
      feedbackText: 'Sehr gute Leistung! Die wesentlichen Handlungsschritte wurden verstanden.',
    }
  }
  if (percentage >= 60) {
    return {
      tier: 'good',
      labelDe: 'Gute Leistung',
      labelEn: 'Good Progress',
      colorBadgeClass: 'bg-[#D7B95D]/20 text-[#8C7225] border-[#D7B95D]/40',
      feedbackText: 'Solides Fundament. Wiederholen Sie die Passage mit langsamerer Geschwindigkeit (0.75x).',
    }
  }
  return {
    tier: 'needs-practice',
    labelDe: 'Weiter üben',
    labelEn: 'Keep Practising',
    colorBadgeClass: 'bg-[#C83B32]/10 text-[#C83B32] border-[#C83B32]/30',
    feedbackText: 'Lassen Sie sich nicht entmutigen. Nutzen Sie das Transkript und wiederholen Sie das Audio.',
  }
}

/**
 * Formats seconds into mm:ss
 */
export function formatAudioTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

/**
 * Evaluates all user answers for an exercise and returns structured attempt result.
 */
export function evaluateExerciseSubmission(
  exercise: ListeningExercise,
  givenAnswers: Record<string, string | number | boolean>,
  timeSpentSeconds: number
): ExerciseAttemptResult {
  let earnedPoints = 0
  let totalPoints = 0
  const records: UserAnswerRecord[] = []

  for (const question of exercise.questions) {
    const rawAnswer = givenAnswers[question.id]
    let isCorrect = false
    let scoreEarned = 0
    const maxScore = question.points || 10
    totalPoints += maxScore

    if (question.type === 'multiple-choice') {
      const selectedIndex = typeof rawAnswer === 'number' ? rawAnswer : parseInt(String(rawAnswer), 10)
      isCorrect = selectedIndex === question.correctAnswer
      scoreEarned = isCorrect ? maxScore : 0
    } else if (question.type === 'true-false') {
      const boolVal = typeof rawAnswer === 'boolean' ? rawAnswer : rawAnswer === 'true'
      isCorrect = boolVal === question.isCorrect
      scoreEarned = isCorrect ? maxScore : 0
    } else if (question.type === 'fill-blank') {
      const textVal = String(rawAnswer || '')
      isCorrect = checkFillBlankAnswer(textVal, question.acceptedAnswers, question.caseSensitive)
      scoreEarned = isCorrect ? maxScore : 0
    } else if (question.type === 'dictation') {
      const textVal = String(rawAnswer || '')
      const dictationResult = evaluateDictation(textVal, question.fullText)
      isCorrect = dictationResult.similarityPercent >= 80
      scoreEarned = Math.round((dictationResult.similarityPercent / 100) * maxScore)
    }

    earnedPoints += scoreEarned
    records.push({
      questionId: question.id,
      givenAnswer: rawAnswer !== undefined ? rawAnswer : '',
      isCorrect,
      scoreEarned,
      maxScore,
    })
  }

  const scorePercent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0

  return {
    exerciseId: exercise.id,
    timestampIso: new Date().toISOString(),
    scorePercent,
    earnedPoints,
    totalPoints,
    timeSpentSeconds,
    answers: records,
    completed: true,
  }
}
