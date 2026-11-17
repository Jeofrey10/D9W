import { CefrLevel } from '@/types/learning'

export type GrammaticalCase = 'Nominativ' | 'Akkusativ' | 'Dativ' | 'Genitiv'

export type GrammaticalGender = 'masculine' | 'feminine' | 'neuter' | 'plural'

export type ArticleType = 'definite' | 'indefinite' | 'negative' | 'possessive'

export type PrepositionCategory = 'accusative' | 'dative' | 'genitive' | 'two-way'

export type SyntacticFunction =
  | 'subject'
  | 'direct-object'
  | 'indirect-object'
  | 'genitive-attribute'
  | 'prepositional-object'
  | 'predicate-nominative'
  | 'finite-verb'
  | 'infinitive-verb'
  | 'separable-prefix'
  | 'adverbial'
  | 'conjunction'
  | 'particle'
  | 'unknown'

export interface CaseDefinition {
  caseName: GrammaticalCase
  germanName: string
  englishLabel: string
  questionWords: string[] // e.g. ["Wer?", "Was?"]
  roleDescription: string
  syntacticRoles: string[]
  definiteArticles: Record<GrammaticalGender, string>
  indefiniteArticles: Record<GrammaticalGender, string>
  personalPronouns: string[]
  keyPrepositions: string[]
  commonVerbs: string[]
  typicalSentenceStructure: string
  commonMistakes: {
    wrong: string
    correct: string
    explanation: string
  }[]
  exampleSentences: {
    german: string
    english: string
    highlight: string
    explanation: string
    level: CefrLevel
  }[]
}

export interface DeclensionForm {
  masculine: string
  feminine: string
  neuter: string
  plural: string
}

export interface ArticleDeclensionSet {
  articleType: ArticleType
  label: string
  baseWord?: string
  declension: Record<GrammaticalCase, DeclensionForm>
  notes?: string
}

export interface PersonalPronounDeclension {
  person: string // '1st singular (ich)', '2nd singular informal (du)', etc.
  nominativ: string
  akkusativ: string
  dativ: string
  genitiv: string
  english: string
}

export interface PrepositionItem {
  id: string
  preposition: string
  category: PrepositionCategory
  meaning: string
  exampleGerman: string
  exampleEnglish: string
  caseTriggered: GrammaticalCase | 'Dativ (Wo?) oder Akkusativ (Wohin?)'
  contraction?: string
  contractionExplanation?: string
  tip?: string
}

export interface VerbValencyItem {
  id: string
  verb: string
  meaning: string
  governedCase: GrammaticalCase | 'Dativ + Akkusativ'
  valencyPattern: string // e.g. "helfen + Dativ"
  exampleGerman: string
  exampleEnglish: string
  notes?: string
  level: CefrLevel
}

export interface AnalyzedToken {
  index: number
  rawToken: string
  cleanWord: string
  normalizedWord: string
  partOfSpeech:
    | 'article'
    | 'noun'
    | 'pronoun'
    | 'verb'
    | 'preposition'
    | 'adjective'
    | 'adverb'
    | 'punctuation'
    | 'other'
  grammaticalCase?: GrammaticalCase
  grammaticalGender?: GrammaticalGender
  syntacticFunction: SyntacticFunction
  functionLabel: string
  reasonExplanation: string
  associatedPhrase?: string
}

export interface SentenceAnalysisResult {
  originalSentence: string
  status: 'supported' | 'partial' | 'unsupported' | 'empty'
  confidence: number // 0 to 100
  patternId?: string
  patternName?: string
  translationGermanToEnglish?: string
  tokens: AnalyzedToken[]
  elements: {
    label: string
    text: string
    caseName?: GrammaticalCase
    role: SyntacticFunction
    roleName: string
    explanation: string
  }[]
  overallExplanation: string
  limitationsNote?: string
}

export type CaseQuestionType =
  | 'identify-case'
  | 'choose-article'
  | 'fill-blank'
  | 'choose-preposition'
  | 'identify-function'
  | 'correct-sentence'
  | 'two-way-distinction'

export interface CaseQuizQuestion {
  id: string
  level: CefrLevel
  type: CaseQuestionType
  targetCase?: GrammaticalCase
  prepositionCategory?: PrepositionCategory
  prompt: string
  sentenceWithBlank?: string
  options: string[]
  correctIndex: number
  correctAnswerText: string
  explanation: string
  grammarConcept: string
  hint?: string
}

export interface CaseQuizSubmission {
  questionId: string
  selectedIndex: number
  isCorrect: boolean
  targetCase?: GrammaticalCase
  answeredAt: string
}

export interface CaseSentenceBuilderExercise {
  id: string
  level: CefrLevel
  category: string
  englishPrompt: string
  targetGerman: string
  scrambledTiles: string[]
  acceptableOrders: string[]
  caseBreakdown: {
    element: string
    word: string
    caseName: GrammaticalCase
    explanation: string
  }[]
  explanation: string
}

export interface CaseGrammarProgressState {
  version: 1
  totalAttempts: number
  totalCorrect: number
  caseAccuracy: Record<
    GrammaticalCase,
    { attempted: number; correct: number }
  >
  recentQuestions: CaseQuizSubmission[]
  builderCompletedIds: string[]
  lastPracticedDate: string | null
  streakDays: number
}
