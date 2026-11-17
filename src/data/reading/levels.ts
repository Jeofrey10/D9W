import { CefrLevel } from '@/types/learning'

export interface ReadingLevelInfo {
  level: CefrLevel
  nameGerman: string
  nameEnglish: string
  headline: string
  description: string
  targetWordsMin: number
  targetWordsMax: number
  typicalWpm: number // words per minute reading speed
  grammarFocus: string[]
  pedagogicalOutcome: string
}

export const READING_LEVELS: Record<CefrLevel, ReadingLevelInfo> = {
  A1: {
    level: 'A1',
    nameGerman: 'Anfänger',
    nameEnglish: 'Beginner',
    headline: 'Short texts, signs, simple emails, and daily routines',
    description:
      'Grasp essential vocabulary in short everyday notices, simple personal introductions, basic grocery lists, and apartment notices in the present tense.',
    targetWordsMin: 60,
    targetWordsMax: 120,
    typicalWpm: 70,
    grammarFocus: ['Präsens (Present)', 'W-Fragen', 'Basic Word Order (V2)', 'Negation (nicht/kein)'],
    pedagogicalOutcome: 'Can understand familiar names, basic words, and very simple sentences on notices, posters, and menus.',
  },
  A2: {
    level: 'A2',
    nameGerman: 'Grundlegende Kenntnisse',
    nameEnglish: 'Elementary',
    headline: 'Routine messages, short narratives, advertisements, and travel guides',
    description:
      'Read short, simple descriptions of people, living conditions, work tasks, and travel schedules using common past tenses and basic modal verbs.',
    targetWordsMin: 120,
    targetWordsMax: 200,
    typicalWpm: 90,
    grammarFocus: ['Perfekt', 'Modalverben', 'Nebensätze mit weil/dass', 'Komparativ & Superlativ'],
    pedagogicalOutcome: 'Can read very short, simple texts and find specific, predictable information in everyday material like advertisements and timetables.',
  },
  B1: {
    level: 'B1',
    nameGerman: 'Fortgeschrittene Sprachverwendung',
    nameEnglish: 'Intermediate',
    headline: 'Workplace memos, news articles, personal letters, and opinion pieces',
    description:
      'Understand texts consisting mainly of everyday or job-related language, descriptions of events, feelings, and wishes in personal letters.',
    targetWordsMin: 200,
    targetWordsMax: 350,
    typicalWpm: 120,
    grammarFocus: ['Präteritum', 'Passiv Präsens', 'Konjunktiv II (Wünsche)', 'Relativsätze', 'Infinitiv mit zu'],
    pedagogicalOutcome: 'Can understand texts that consist mainly of high-frequency everyday or job-related language and recognize significant points in news items.',
  },
  B2: {
    level: 'B2',
    nameGerman: 'Selbstständige Sprachverwendung',
    nameEnglish: 'Upper Intermediate',
    headline: 'Analytical reports, editorials, contemporary literature, and formal debates',
    description:
      'Read articles and reports concerned with contemporary problems in which writers adopt particular attitudes, viewpoints, and specialized terminology.',
    targetWordsMin: 350,
    targetWordsMax: 500,
    typicalWpm: 150,
    grammarFocus: ['Passiv Perfekt/Präteritum', 'Zustandspassiv', 'Partizipialattribute', 'Konjunktiv I/II', 'Nomen-Verb-Verbindungen'],
    pedagogicalOutcome: 'Can understand articles and specialized reports on contemporary problems and comprehend contemporary literary prose.',
  },
  C1: {
    level: 'C1',
    nameGerman: 'Fachkundige Sprachkenntnisse',
    nameEnglish: 'Advanced Fluency',
    headline: 'Academic papers, legal statutes, complex socio-cultural treatises, and essays',
    description:
      'Comprehend wide-ranging, demanding, longer texts and recognize implicit meaning, stylistic nuances, irony, and advanced idiomatic German.',
    targetWordsMin: 450,
    targetWordsMax: 700,
    typicalWpm: 180,
    grammarFocus: ['Erweiterte Partizipien', 'Substantivierungen', 'Modalitätsverben (scheinen/drohen)', 'Rhetorische Stilmittel'],
    pedagogicalOutcome: 'Can understand long and complex factual and literary texts, appreciating distinctions of style and specialized articles outside their field.',
  },
}
