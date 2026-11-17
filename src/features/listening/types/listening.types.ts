import { CefrLevel } from '@/types'

export type ListeningExerciseType =
  | 'multiple-choice'
  | 'true-false'
  | 'fill-blank'
  | 'conversation'
  | 'announcement'
  | 'dictation'

export type ListeningCategoryKey =
  | 'alltag'
  | 'familie-freunde'
  | 'einkaufen'
  | 'restaurant-cafe'
  | 'reisen-verkehr'
  | 'arbeit-beruf'
  | 'bildung'
  | 'gesundheit'
  | 'nachrichten-durchsagen'
  | 'diskussionen'

export type DifficultyLevel = 'easy' | 'medium' | 'hard'

export type AudioStatus = 'available' | 'pending' | 'draft'

export interface ListeningCategory {
  key: ListeningCategoryKey
  titleDe: string
  titleEn: string
  description: string
  iconName: string
  recommendedLevel: CefrLevel
}

export interface CEFRLevelInfo {
  level: CefrLevel
  name: string
  subtitle: string
  description: string
  difficulty: DifficultyLevel
  exerciseCount: number
  targetDurationMinutes: number
  skillsFocus: string[]
  recommendedSpeed: string
}

export interface VocabularyItem {
  german: string
  english: string
  context?: string
}

export interface BaseQuestion {
  id: string
  prompt?: string
  explanation: string
  points: number
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice'
  options: string[]
  correctAnswer: number // index of options
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false'
  statement: string
  isCorrect: boolean // true = Richtig, false = Falsch
}

export interface FillBlankQuestion extends BaseQuestion {
  type: 'fill-blank'
  sentencePrefix: string
  sentenceSuffix: string
  acceptedAnswers: string[]
  caseSensitive?: boolean
}

export interface DictationQuestion extends BaseQuestion {
  type: 'dictation'
  fullText: string
  hint?: string
}

export type ListeningQuestion =
  | MultipleChoiceQuestion
  | TrueFalseQuestion
  | FillBlankQuestion
  | DictationQuestion

export interface SpeakerTurn {
  speaker: string
  text: string
  timestampSeconds?: number
}

export interface ListeningTranscript {
  summary?: string
  dialogue?: SpeakerTurn[]
  fullText?: string
}

export interface ListeningExercise {
  id: string
  title: string
  subtitleDe: string
  level: CefrLevel
  category: ListeningCategoryKey
  exerciseType: ListeningExerciseType
  difficulty: DifficultyLevel
  estimatedDurationMinutes: number
  audioSrc: string
  audioDurationSeconds: number
  audioStatus: AudioStatus
  published: boolean
  instructionsDe: string
  instructionsEn: string
  transcript: ListeningTranscript
  vocabulary: VocabularyItem[]
  listeningTip?: string
  questions: ListeningQuestion[]
  attribution: {
    source: string
    license: string
    speakerName?: string
    notes?: string
  }
}

export interface UserAnswerRecord {
  questionId: string
  givenAnswer: string | number | boolean
  isCorrect: boolean
  scoreEarned: number
  maxScore: number
}

export interface ExerciseAttemptResult {
  exerciseId: string
  timestampIso: string
  scorePercent: number
  earnedPoints: number
  totalPoints: number
  timeSpentSeconds: number
  answers: UserAnswerRecord[]
  completed: boolean
}

export interface ListeningProgressState {
  completedExerciseIds: string[]
  exerciseAttempts: Record<string, ExerciseAttemptResult[]> // exerciseId -> attempts
  bestScores: Record<string, number> // exerciseId -> percentage
  totalListeningSeconds: number
  streakDays: number
  lastActiveDate: string
}

export type PlaybackSpeed = 0.75 | 1.0 | 1.25 | 1.5

export type TranscriptViewMode = 'hidden' | 'revealed' | 'review'
