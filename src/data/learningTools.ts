import { LearningToolItem } from '@/types'

export const LEARNING_TOOLS_DATA: LearningToolItem[] = [
  {
    id: 'tool-dictionary',
    name: 'German Dictionary',
    slug: '/dictionary',
    description:
      'Search German vocabulary with grammatical gender tags, plural forms, IPA pronunciation guides, and CEFR level classifications.',
    category: 'Vocabulary',
    levelRange: 'A1–C1',
    iconName: 'BookMarked',
    status: 'Ready',
  },
  {
    id: 'tool-article-explorer',
    name: 'Article Explorer',
    slug: '/article-explorer',
    description:
      'Master German noun genders (der, die, das) with rule-based pattern recognition, noun endings analysis (-ung, -heit, -chen), and rapid visual drills.',
    category: 'Grammar',
    levelRange: 'A1–B1',
    iconName: 'Sparkles',
    status: 'Ready',
  },
  {
    id: 'tool-number-trainer',
    name: 'Number Trainer',
    slug: '/number-trainer',
    description:
      'Practise German numbers (Zahlen 0–1,000,000), inverted digit orders (einundzwanzig), phone numbers, and euro pricing with native audio simulation.',
    category: 'Communication',
    levelRange: 'A1–A2',
    iconName: 'Binary',
    status: 'Ready',
  },
  {
    id: 'tool-time-trainer',
    name: 'Time Trainer',
    slug: '/time-trainer',
    description:
      'Interactive analog clock interface to practise formal (14:30) and informal (halb drei, Viertel vor) German time expressions.',
    category: 'Communication',
    levelRange: 'A1–A2',
    iconName: 'Clock',
    status: 'Ready',
  },
  {
    id: 'tool-sentence-builder',
    name: 'Sentence Builder',
    slug: '/sentence-builder',
    description:
      'Drag-and-drop German word order engine enforcing Verb-Second (V2) rules in main clauses, TeKaMoLo adverbial order, and verb-final subordinate clauses.',
    category: 'Grammar',
    levelRange: 'A1–B2',
    iconName: 'Puzzle',
    status: 'Ready',
  },
  {
    id: 'tool-listening',
    name: 'Listening Practice',
    slug: '/listening-practice',
    description:
      'Interactive German listening comprehension with authentic dialogue passages, variable speeds (0.75x–1.5x), transcripts, dictation, and CEFR A1–C1 exercises.',
    category: 'Communication',
    levelRange: 'A1–C1',
    iconName: 'Headphones',
    status: 'Ready',
  },
  {
    id: 'tool-reading',
    name: 'Reading Practice',
    slug: '/reading-practice',
    description:
      'Interactive German reading comprehension with 36 CEFR-graded passages, click-to-translate vocabulary cards, noun gender colors, and comprehension questions.',
    category: 'Communication',
    levelRange: 'A1–C1',
    iconName: 'FileText',
    status: 'Ready',
  },
  {
    id: 'tool-daily-word',
    name: 'Daily German Word',
    slug: '/word-of-the-day',
    description:
      'Wort des Tages: Daily curated German word featuring example sentences in context, grammatical inflections, audio, and cultural etymology.',
    category: 'Vocabulary',
    levelRange: 'A1–C1',
    iconName: 'Calendar',
    status: 'Ready',
  },
  {
    id: 'tool-translator',
    name: 'Contextual Case Translator',
    slug: '/case-translator',
    description:
      'Dissect the four German cases (Nominativ, Akkusativ, Dativ, Genitiv), article declensions, and prepositional rection with interactive sentence analyzer and quiz.',
    category: 'Grammar',
    levelRange: 'A1–C1',
    iconName: 'Languages',
    status: 'Ready',
  },
  {
    id: 'tool-study-planner',
    name: 'Study Planner & Exam Countdown',
    slug: '/study-planner',
    description:
      'Personalized German study schedule and exam countdown engine (Goethe, telc, TestDaF, DSH) with daily focus sessions, weekly timetables, mock tests, and GLH calculations.',
    category: 'Personal Learning',
    levelRange: 'A1–C1',
    iconName: 'CheckSquare',
    status: 'Ready',
  },
]
