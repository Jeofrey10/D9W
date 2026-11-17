import { VocabularyItem } from '@/types/learning'
import { ALL_VOCABULARY } from '@/data/vocabulary'
import { DailyWordQuizQuestion } from '../types/dailyWord.types'

/**
 * Generates interactive mini-quiz questions tailored to a specific vocabulary item.
 */
export function generateDailyWordQuiz(item: VocabularyItem): DailyWordQuizQuestion[] {
  const questions: DailyWordQuizQuestion[] = []

  // Question 1: Article selection (for nouns only)
  if (item.type === 'noun' && item.article) {
    questions.push({
      id: `q-article-${item.id}`,
      type: 'article-selection',
      prompt: `Welcher bestimmte Artikel gehört zu „${item.word}“?`,
      options: ['der', 'die', 'das'],
      correctAnswer: item.article,
      explanation: `„${item.word}“ ist ein ${
        item.article === 'der'
          ? 'maskulines'
          : item.article === 'die'
          ? 'feminines'
          : 'neutrales'
      } Nomen und heißt „${item.article} ${item.word}“${
        item.plural ? ` (Plural: die ${item.plural})` : ''
      }.`,
      points: 10,
    })
  }

  // Question 2: Meaning selection (4 options)
  const otherItems = ALL_VOCABULARY.filter(
    (v) => v.id !== item.id && v.english !== item.english
  )
  // Deterministic seed based on item.id characters to ensure identical options on every render
  let seed = 0
  for (let i = 0; i < item.id.length; i++) {
    seed += item.id.charCodeAt(i)
  }

  const distractors: string[] = []
  for (let i = 0; i < 3; i++) {
    const idx = (seed * (i + 1) * 7) % otherItems.length
    distractors.push(otherItems[idx].english)
  }

  // Deterministic placement of correct answer
  const correctSlot = seed % 4
  const options = [...distractors]
  options.splice(correctSlot, 0, item.english)

  questions.push({
    id: `q-meaning-${item.id}`,
    type: 'meaning-selection',
    prompt: `Was bedeutet das Wort „${item.word}“ auf Englisch?`,
    options,
    correctAnswer: correctSlot,
    explanation: `„${item.word}“ bedeutet auf Englisch „${item.english}“.`,
    points: 10,
  })

  // Question 3: Fill in the blank / Contextual usage
  if (item.example?.german) {
    const regex = new RegExp(`\\b${item.word}\\b`, 'i')
    const sentenceWithBlank = item.example.german.replace(regex, '______')

    if (sentenceWithBlank !== item.example.german) {
      questions.push({
        id: `q-blank-${item.id}`,
        type: 'fill-blank',
        prompt: `Ergänzen Sie das passende Wort im Satz:`,
        options: [sentenceWithBlank],
        correctAnswer: item.word,
        explanation: `Der vollständige Beispielsatz lautet: „${item.example.german}“ (${item.example.english}).`,
        points: 10,
      })
    }
  }

  return questions
}

export interface QuizScoreEvaluation {
  earnedPoints: number
  totalPoints: number
  scorePercent: number
  tier: 'excellent' | 'very-good' | 'good' | 'needs-practice'
  title: 'Ausgezeichnet!' | 'Sehr gut!' | 'Gut gemacht!' | 'Weiter üben!'
}

/**
 * Evaluates quiz results and assigns standard pedagogical CEFR feedback tiers.
 */
export function scoreDailyQuiz(
  correctCount: number,
  totalQuestions: number,
  pointsPerQuestion: number = 10
): QuizScoreEvaluation {
  const totalPoints = totalQuestions * pointsPerQuestion
  const earnedPoints = correctCount * pointsPerQuestion
  const scorePercent =
    totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 100

  let tier: QuizScoreEvaluation['tier'] = 'needs-practice'
  let title: QuizScoreEvaluation['title'] = 'Weiter üben!'

  if (scorePercent >= 90) {
    tier = 'excellent'
    title = 'Ausgezeichnet!'
  } else if (scorePercent >= 75) {
    tier = 'very-good'
    title = 'Sehr gut!'
  } else if (scorePercent >= 60) {
    tier = 'good'
    title = 'Gut gemacht!'
  }

  return {
    earnedPoints,
    totalPoints,
    scorePercent,
    tier,
    title,
  }
}
