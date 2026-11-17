import {
  ReadingPassage,
  ReadingQuestion,
  ReadingAttemptResult,
} from '../types/reading.types'

/**
 * Normalizes user text response for tolerant matching.
 */
export function normalizeAnswerText(text: string): string {
  if (!text) return ''
  return text
    .trim()
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'«»„“]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
}

/**
 * Verifies if a given answer satisfies a question's criteria.
 */
export function isQuestionAnswerCorrect(
  question: ReadingQuestion,
  userAnswer: string | number | boolean | undefined
): boolean {
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    return false
  }

  switch (question.type) {
    case 'multiple-choice':
      return Number(userAnswer) === question.correctIndex

    case 'true-false':
      return Boolean(userAnswer) === question.correctAnswer

    case 'fill-blank': {
      const normGiven = normalizeAnswerText(String(userAnswer))
      return question.acceptedAnswers.some(
        (accepted) => normalizeAnswerText(accepted) === normGiven
      )
    }

    case 'short-answer': {
      // If student used self-evaluation checkmark
      if (typeof userAnswer === 'boolean') {
        return userAnswer
      }
      // If typed string matches accepted answers
      if (question.acceptedAnswers && question.acceptedAnswers.length > 0) {
        const normGiven = normalizeAnswerText(String(userAnswer))
        return question.acceptedAnswers.some(
          (accepted) => normalizeAnswerText(accepted) === normGiven
        )
      }
      // Non-empty submission in self-review mode counts as completed
      return String(userAnswer).trim().length > 3
    }

    default:
      return false
  }
}

export function getReadingScoreTier(scorePercent: number): {
  tier: 'excellent' | 'very-good' | 'good' | 'needs-practice'
  titleGerman: string
  titleEnglish: string
  description: string
  colorClass: string
} {
  if (scorePercent >= 90) {
    return {
      tier: 'excellent',
      titleGerman: 'Ausgezeichnet!',
      titleEnglish: 'Excellent!',
      description: 'Superb reading comprehension. You understood virtually all nuances and details.',
      colorClass: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
    }
  }
  if (scorePercent >= 75) {
    return {
      tier: 'very-good',
      titleGerman: 'Sehr Gut!',
      titleEnglish: 'Very Good!',
      description: 'Strong text comprehension with minor inaccuracies in complex sentences.',
      colorClass: 'text-[#1E3A8A] bg-[#EFF6FF] border-[#BFDBFE]',
    }
  }
  if (scorePercent >= 60) {
    return {
      tier: 'good',
      titleGerman: 'Gut gemacht!',
      titleEnglish: 'Good Progress!',
      description: 'Solid basic understanding. Review vocabulary cards and re-read the tricky parts.',
      colorClass: 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]',
    }
  }
  return {
    tier: 'needs-practice',
    titleGerman: 'Noch einmal üben!',
    titleEnglish: 'Keep Practising!',
    description: 'A challenging text. Use vocabulary mode, review key words, and retry the questions.',
    colorClass: 'text-[#C83B32] bg-[#FEF2F2] border-[#FECACA]',
  }
}

export function evaluateReadingSubmission(
  passage: ReadingPassage,
  userAnswers: Record<string, string | number | boolean>,
  timeSpentSeconds: number
): ReadingAttemptResult {
  const questions = passage.questions || []
  let correctCount = 0
  const pointsPerQuestion = 10
  const totalPoints = questions.length * pointsPerQuestion

  for (const q of questions) {
    const isCorrect = isQuestionAnswerCorrect(q, userAnswers[q.id])
    if (isCorrect) correctCount++
  }

  const earnedPoints = correctCount * pointsPerQuestion
  const scorePercent =
    totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 100

  const tierInfo = getReadingScoreTier(scorePercent)

  return {
    passageId: passage.id,
    timestamp: new Date().toISOString(),
    timeSpentSeconds,
    totalQuestions: questions.length,
    correctQuestions: correctCount,
    earnedPoints,
    totalPoints,
    scorePercent,
    tier: tierInfo.tier,
    userAnswers,
    completed: scorePercent >= 60,
  }
}
