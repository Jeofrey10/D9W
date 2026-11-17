import { CefrLevel } from './index'

export type { CefrLevel } from './index'

export type WordType = 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase'
export type GermanArticle = 'der' | 'die' | 'das'

export interface VocabularyExample {
  german: string
  english: string
}

export interface VocabularyPronunciation {
  ipa?: string
}

export interface VerbConjugation {
  infinitive: string
  present3rd: string // e.g. "er/sie/es geht"
  pastPerfekt: string // e.g. "ist gegangen"
  isSeparable?: boolean
  isIrregular?: boolean
}

export interface AdjectiveForms {
  comparative?: string
  superlative?: string
  opposite?: string
}

export interface VocabularyItem {
  id: string
  word: string
  type: WordType
  article?: GermanArticle // ONLY for nouns!
  plural?: string
  pluralEnglish?: string
  english: string
  level: CefrLevel
  category: string
  example: VocabularyExample
  pronunciation?: VocabularyPronunciation
  tags: string[]
  verbDetails?: VerbConjugation
  adjectiveDetails?: AdjectiveForms
  suffixHint?: string // e.g. "-ung", "-heit", "-chen"
}

export interface ArticleRule {
  suffix: string
  article: GermanArticle
  ruleDescription: string
  reliability: string // e.g. "99%", "85%"
  exceptions?: string[]
}

export interface SentenceExercise {
  id: string
  level: CefrLevel
  category: string
  english: string
  germanTarget: string // Canonical correct answer
  tokens: string[] // Scrambled pieces
  acceptableOrders?: string[] // Multiple valid permutations if applicable
  grammarRule: string
  grammarConcept: 'V2_RULE' | 'SUBORDINATE_VERB_FINAL' | 'MODAL_BRACKET' | 'TEKAMOLO' | 'SEPARABLE_VERB' | 'NEGATION' | 'QUESTION'
  explanation: string
}

export interface AssessmentQuestion {
  id: string
  level: CefrLevel
  category: 'Vocabulary' | 'Grammar' | 'Sentence Structure' | 'Reading Comprehension' | 'Functional Language'
  question: string
  passage?: string // for reading comprehension
  options: string[]
  correctIndex: number
  explanation: string
}

export interface AssessmentResult {
  totalQuestions: number
  score: number
  percentage: number
  recommendedLevel: CefrLevel
  categoryScores: Record<string, { correct: number; total: number }>
  completedAt: string
}

export interface LearningProgress {
  favorites: string[] // Vocabulary item IDs
  recentSearches: string[]
  quizScores: {
    articleExplorer: { correct: number; total: number; bestStreak: number }
    numberTrainer: { correct: number; total: number }
    timeTrainer: { correct: number; total: number }
    sentenceBuilder: { correct: number; total: number }
  }
  streak: {
    current: number
    lastActiveDate: string
  }
  assessmentHistory: AssessmentResult[]
}
