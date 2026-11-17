import { CefrLevel, GermanArticle, WordType } from '@/types/learning'

export type ReadingCategoryKey =
  | 'alltag'
  | 'familie'
  | 'reisen'
  | 'essen-kultur'
  | 'arbeit-karriere'
  | 'bildung'
  | 'technologie'
  | 'gesundheit'
  | 'umwelt'
  | 'gesellschaft'
  | 'geschichte'
  | 'literatur'

export interface ReadingCategory {
  key: ReadingCategoryKey
  titleGerman: string
  titleEnglish: string
  description: string
  iconName: string
}

export type ReadingDifficulty = 'easy' | 'moderate' | 'challenging'
export type ReadingPublicationStatus = 'published' | 'draft' | 'under-review'
export type ReadingMode = 'reading' | 'learning' | 'review'

export type ReadingFontSize = 'sm' | 'md' | 'lg'
export type ReadingLineSpacing = 'compact' | 'comfortable' | 'relaxed'

export interface ReadingPreferences {
  fontSize: ReadingFontSize
  lineSpacing: ReadingLineSpacing
  mode: ReadingMode
  vocabularyAssistance: boolean
}

export interface ReadingWordToken {
  id: string
  rawToken: string // Exactly as displayed in the passage (including casing)
  cleanWord: string // Stripped of punctuation and whitespace
  prefixPunctuation?: string
  suffixPunctuation?: string
  isWord: boolean
  lookupKey: string // Lowercased for vocabulary lookup
}

export interface ContextualWordExplanation {
  word: string
  baseForm: string
  article?: GermanArticle
  plural?: string
  wordType: WordType | 'preposition' | 'conjunction' | 'pronoun' | 'expression'
  level: CefrLevel
  contextMeaning: string
  englishMeaning: string
  exampleSentence?: string
  exampleTranslation?: string
  grammarNotes?: string
  dictionaryId?: string
}

export type ReadingQuestionType = 'multiple-choice' | 'true-false' | 'fill-blank' | 'short-answer'

export interface BaseReadingQuestion {
  id: string
  type: ReadingQuestionType
  prompt: string
  explanation: string
  points?: number
}

export interface MultipleChoiceReadingQuestion extends BaseReadingQuestion {
  type: 'multiple-choice'
  options: string[]
  correctIndex: number
}

export interface TrueFalseReadingQuestion extends BaseReadingQuestion {
  type: 'true-false'
  statement: string
  correctAnswer: boolean
}

export interface FillBlankReadingQuestion extends BaseReadingQuestion {
  type: 'fill-blank'
  sentenceWithBlank: string // e.g. "Der ICE fährt um 14:15 Uhr von Gleis ___ ab."
  acceptedAnswers: string[]
}

export interface ShortAnswerReadingQuestion extends BaseReadingQuestion {
  type: 'short-answer'
  acceptedAnswers?: string[]
  modelAnswer: string
  gradingGuidance: string
}

export type ReadingQuestion =
  | MultipleChoiceReadingQuestion
  | TrueFalseReadingQuestion
  | FillBlankReadingQuestion
  | ShortAnswerReadingQuestion

export interface ReadingPassage {
  id: string
  titleGerman: string
  titleEnglish: string
  level: CefrLevel
  category: ReadingCategoryKey
  difficulty: ReadingDifficulty
  estimatedMinutes: number
  wordCount: number
  paragraphs: string[]
  description: string
  provenance: string
  status: ReadingPublicationStatus
  keyVocabulary: ContextualWordExplanation[]
  questions: ReadingQuestion[]
}

export interface SavedVocabularyItem {
  id: string
  word: string
  baseForm: string
  article?: GermanArticle
  plural?: string
  wordType: WordType | 'preposition' | 'conjunction' | 'pronoun' | 'expression'
  level: CefrLevel
  contextMeaning: string
  englishMeaning: string
  exampleSentence?: string
  sourcePassageId: string
  sourcePassageTitle: string
  dateSaved: string
}

export interface ReadingAttemptResult {
  passageId: string
  timestamp: string
  timeSpentSeconds: number
  totalQuestions: number
  correctQuestions: number
  earnedPoints: number
  totalPoints: number
  scorePercent: number
  tier: 'excellent' | 'very-good' | 'good' | 'needs-practice'
  userAnswers: Record<string, string | number | boolean>
  completed: boolean
}

export interface ReadingProgressState {
  completedPassageIds: string[]
  attempts: Record<string, ReadingAttemptResult[]>
  bestScores: Record<string, number>
  totalReadingMinutes: number
  streakDays: number
  lastActiveDate: string | null
}
