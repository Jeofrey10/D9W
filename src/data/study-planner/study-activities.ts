import { CefrLevel } from '@/types'
import { AllSkills } from './skill-allocation'

export type ActivityCategory =
  | 'listening'
  | 'reading'
  | 'writing'
  | 'speaking'
  | 'grammar'
  | 'vocabulary'
  | 'mock-exam'
  | 'revision'

export interface StudyActivityTemplate {
  id: string
  category: ActivityCategory
  skill: AllSkills | 'mock-exam' | 'revision'
  supportedLevels: CefrLevel[]
  title: string
  germanTitle: string
  defaultMinutes: number
  instructions: string
  toolRoute?: string
  toolName?: string
  tips?: string[]
}

export const STUDY_ACTIVITY_TEMPLATES: StudyActivityTemplate[] = [
  // --- 1. LISTENING (HÖREN) ---
  {
    id: 'act-list-01',
    category: 'listening',
    skill: 'listening',
    supportedLevels: ['A1', 'A2'],
    title: 'Short Announcements & Everyday Messages',
    germanTitle: 'Hörverstehen: Ansagen & Durchsagen im Alltag',
    defaultMinutes: 20,
    instructions:
      'Listen to public transit, train station, and store announcements. Note key information: time, platform, price, and actions required. Attempt at normal 1.0x speed, then verify difficult words at 0.85x.',
    toolRoute: '/listening-practice',
    toolName: 'Listening Practice',
    tips: ['Focus on numbers, times, and prepositions of place.', 'Do not stop on first unknown word; grasp overall meaning first.'],
  },
  {
    id: 'act-list-02',
    category: 'listening',
    skill: 'listening',
    supportedLevels: ['A1', 'A2', 'B1'],
    title: 'Informal Dialogue & Social Interactions',
    germanTitle: 'Hörverstehen: Alltägliche Gespräche & Verabredungen',
    defaultMinutes: 25,
    instructions:
      'Listen to conversational dialogues between friends arranging a meeting, ordering at a restaurant, or discussing weekend plans. Complete comprehension questions and check dictation.',
    toolRoute: '/listening-practice',
    toolName: 'Listening Practice',
    tips: ['Listen for agreement or rejection signals (z.B. "Eigentlich gerne, aber...", "Das passt mir gut").'],
  },
  {
    id: 'act-list-03',
    category: 'listening',
    skill: 'listening',
    supportedLevels: ['B1', 'B2'],
    title: 'Radio Interviews & Expert Discussions',
    germanTitle: 'Hörverstehen: Radiobeiträge & Interviews',
    defaultMinutes: 30,
    instructions:
      'Listen to longer interview excerpts discussing work, education, or environmental topics. Practice taking concise shorthand notes during first listening pass.',
    toolRoute: '/listening-practice',
    toolName: 'Listening Practice',
    tips: ['Distinguish between the speakers stance and quoted third-party opinions.'],
  },
  {
    id: 'act-list-04',
    category: 'listening',
    skill: 'listening',
    supportedLevels: ['B2', 'C1'],
    title: 'Academic Lectures & Scientific Presentations',
    germanTitle: 'Hörverstehen: Vorlesungsausschnitte & Wissenschaft',
    defaultMinutes: 35,
    instructions:
      'Practice listening to structured technical or academic presentations without pausing. Note the thesis statement, arguments, counter-arguments, and statistical data.',
    toolRoute: '/listening-practice',
    toolName: 'Listening Practice',
    tips: ['Identify discourse markers: "In Anbetracht...", "Demgegenüber steht...", "Zusammenfassend lässt sich sagen...".'],
  },

  // --- 2. READING (LESEN) ---
  {
    id: 'act-read-01',
    category: 'reading',
    skill: 'reading',
    supportedLevels: ['A1', 'A2'],
    title: 'Short Notices, Flyers & Classified Advertisements',
    germanTitle: 'Leseverstehen: Mitteilungen, Anzeigen & Schilder',
    defaultMinutes: 20,
    instructions:
      'Read short practical texts from everyday German life. Locate specific data quickly (opening hours, requirements, dates) and answer comprehension questions.',
    toolRoute: '/reading-practice',
    toolName: 'Reading Practice',
    tips: ['Skim for keywords before reading every sentence in detail.'],
  },
  {
    id: 'act-read-02',
    category: 'reading',
    skill: 'reading',
    supportedLevels: ['A2', 'B1'],
    title: 'Editorial Articles & Blog Posts',
    germanTitle: 'Leseverstehen: Magazinartikel & Erfahrungsberichte',
    defaultMinutes: 25,
    instructions:
      'Read a multi-paragraph editorial text. Click unfamiliar words to inspect noun gender and translation, then answer the multi-choice and true/false questions.',
    toolRoute: '/reading-practice',
    toolName: 'Reading Practice',
    tips: ['Save 3-5 useful new vocabulary terms to My Vocabulary for later flashcard review.'],
  },
  {
    id: 'act-read-03',
    category: 'reading',
    skill: 'reading',
    supportedLevels: ['B1', 'B2'],
    title: 'Opinion Editorials & Commentaries',
    germanTitle: 'Leseverstehen: Kommentare & Leserbriefe zu aktuellen Themen',
    defaultMinutes: 30,
    instructions:
      'Analyze contrasting reader opinions on a controversial societal topic. Map out who argues for and against the proposition.',
    toolRoute: '/reading-practice',
    toolName: 'Reading Practice',
    tips: ['Pay close attention to subjunctive forms (Konjunktiv II) expressing hypothetical conditions.'],
  },
  {
    id: 'act-read-04',
    category: 'reading',
    skill: 'reading',
    supportedLevels: ['B2', 'C1'],
    title: 'Scientific Summaries & Academic Papers',
    germanTitle: 'Leseverstehen: Wissenschaftliche Fachtexte & Analysen',
    defaultMinutes: 35,
    instructions:
      'Read complex, densely written academic texts. Analyze nominalized structures (Nominalstil), passive constructions, and complex participle attributes.',
    toolRoute: '/reading-practice',
    toolName: 'Reading Practice',
    tips: ['Deconstruct extended participial attributes into relative clauses for clarity.'],
  },

  // --- 3. WRITING (SCHREIBEN) ---
  {
    id: 'act-write-01',
    category: 'writing',
    skill: 'writing',
    supportedLevels: ['A1', 'A2'],
    title: 'Informal Message or Postcard',
    germanTitle: 'Schriftlicher Ausdruck: Persönliche Nachricht oder E-Mail',
    defaultMinutes: 20,
    instructions:
      'Write a 40–50 word informal email to a friend. Cover 3 required points: reason for writing, greeting, and asking for a reply. Use appropriate salutation ("Liebe/Lieber...") and closing ("Herzliche Grüße").',
    tips: ['Check verb placement (V2 in main clause, modal verb bracket).', 'Ensure correct accusative pronouns (dich, mich).'],
  },
  {
    id: 'act-write-02',
    category: 'writing',
    skill: 'writing',
    supportedLevels: ['A2', 'B1'],
    title: 'Semi-Formal Inquiry or Apology',
    germanTitle: 'Schriftlicher Ausdruck: Halbformelle Anfrage oder Entschuldigung',
    defaultMinutes: 25,
    instructions:
      'Write a 60–80 word email to a teacher, landlord, or course coordinator explaining an absence or requesting information. Use formal address ("Sie / Ihnen / Ihr").',
    tips: ['Use polite modal expressions: "Könnten Sie mir bitte mitteilen...", "Ich möchte mich dafür entschuldigen, dass...".'],
  },
  {
    id: 'act-write-03',
    category: 'writing',
    skill: 'writing',
    supportedLevels: ['B1', 'B2'],
    title: 'Forum Contribution & Opinion Essay',
    germanTitle: 'Schriftlicher Ausdruck: Diskussionsbeitrag & Stellungnahme',
    defaultMinutes: 35,
    instructions:
      'Write a 120–150 word forum post stating your opinion on a given topic (e.g., Remote Work, Public Transit). Structure with introduction, 2 supporting arguments with personal examples, and conclusion.',
    tips: ['Vary sentence connectors: "Einerseits... andererseits...", "Darüber hinaus", "Meiner Ansicht nach".'],
  },
  {
    id: 'act-write-04',
    category: 'writing',
    skill: 'writing',
    supportedLevels: ['B2', 'C1'],
    title: 'Formal Argumentative Essay with Chart Analysis',
    germanTitle: 'Schriftlicher Ausdruck: Wissenschaftliche Argumentation & Grafikbeschreibung',
    defaultMinutes: 45,
    instructions:
      'Describe key trends in an economic or sociological chart (increase, stagnation, peak). Discuss advantages and disadvantages in structured German academic style.',
    tips: ['Use graphic Redemittel: "Die vorliegende Grafik veranschaulicht...", "Im Mittelfeld befindet sich...", "Auffällig ist, dass...".'],
  },

  // --- 4. SPEAKING (SPRECHEN) ---
  {
    id: 'act-speak-01',
    category: 'speaking',
    skill: 'speaking',
    supportedLevels: ['A1', 'A2'],
    title: 'Personal Introduction & Daily Routine Monologue',
    germanTitle: 'Mündlicher Ausdruck: Sich vorstellen & Tagesablauf schildern',
    defaultMinutes: 15,
    instructions:
      'Record a 2-minute voice note on your phone introducing yourself: name, origin, residence, occupation, hobbies, and a description of your typical morning routine.',
    tips: ['Listen back to your recording to check word order and pronunciation of "ch", "r", and umlauts (ä, ö, ü).'],
  },
  {
    id: 'act-speak-02',
    category: 'speaking',
    skill: 'speaking',
    supportedLevels: ['A2', 'B1'],
    title: 'Planning an Event with a Partner',
    germanTitle: 'Mündlicher Ausdruck: Gemeinsam etwas planen & Termine abstimmen',
    defaultMinutes: 20,
    instructions:
      'Simulate an exam conversation: propose a birthday party or weekend trip. State 3 ideas, respond to hypothetical counter-proposals, and agree on a budget and time.',
    tips: ['Use planning phrases: "Was hältst du davon, wenn...", "Das ist eine gute Idee, aber...", "Wann passt es dir am besten?".'],
  },
  {
    id: 'act-speak-03',
    category: 'speaking',
    skill: 'speaking',
    supportedLevels: ['B1', 'B2'],
    title: 'Mini-Presentation & Follow-up Q&A',
    germanTitle: 'Mündlicher Ausdruck: Kurzvortrag strukturieren & Fragen beantworten',
    defaultMinutes: 25,
    instructions:
      'Prepare a 3-minute presentation on a chosen topic. Include: introduction, personal experience, situation in your home country, pros and cons, and personal opinion.',
    tips: ['Use clean transitional phrases: "Nun möchte ich zur Situation in meinem Heimatland kommen.", "Ein wesentlicher Vorteil ist...".'],
  },
  {
    id: 'act-speak-04',
    category: 'speaking',
    skill: 'speaking',
    supportedLevels: ['B2', 'C1'],
    title: 'Academic Discussion & Spontaneous Argumentation',
    germanTitle: 'Mündlicher Ausdruck: Fachdiskussion & Spontane Reaktionen',
    defaultMinutes: 30,
    instructions:
      'Pick a complex societal issue (z.B. Künstliche Intelligenz an Schulen). Speak continuously for 4 minutes evaluating ethical implications, rebutting counterarguments, and summarizing your stance.',
    tips: ['Maintain fluid delivery without excessive "äh" pauses by using discourse fillers: "In diesem Zusammenhang ist hervorzuheben...", "Man darf nicht außer Acht lassen, dass...".'],
  },

  // --- 5. GRAMMAR (GRAMMATIK) ---
  {
    id: 'act-gram-01',
    category: 'grammar',
    skill: 'grammar',
    supportedLevels: ['A1', 'A2', 'B1'],
    title: 'German Cases & Article Declension',
    germanTitle: 'Grammatik: Nominativ, Akkusativ & Dativ Vertiefung',
    defaultMinutes: 20,
    instructions:
      'Practice identifying direct vs indirect objects and applying correct case endings. Review the difference between Wer?, Wen?, and Wem? questions.',
    toolRoute: '/case-translator',
    toolName: 'Contextual Case Translator',
    tips: ['Remember the golden rule: masculine articles change most (der -> den -> dem -> des), while feminine/plural stay closer to base.'],
  },
  {
    id: 'act-gram-02',
    category: 'grammar',
    skill: 'grammar',
    supportedLevels: ['A1', 'A2', 'B1'],
    title: 'Two-Way Prepositions (Wechselpräpositionen)',
    germanTitle: 'Grammatik: Wechselpräpositionen (Wo? vs. Wohin?)',
    defaultMinutes: 20,
    instructions:
      'Master the 9 two-way prepositions (an, auf, hinter, in, neben, über, unter, vor, zwischen). Practice distinguishing directional destination (Akkusativ) from static location (Dativ).',
    toolRoute: '/case-translator',
    toolName: 'Contextual Case Translator',
    tips: ['Movement inside a room without crossing boundary is still Dativ! (z.B. Er läuft im Zimmer auf und ab).'],
  },
  {
    id: 'act-gram-03',
    category: 'grammar',
    skill: 'grammar',
    supportedLevels: ['A1', 'A2', 'B1', 'B2'],
    title: 'Sentence Order: V2, TeKaMoLo & Subordinate Clauses',
    germanTitle: 'Grammatik: Satzbau & Verbstellung',
    defaultMinutes: 20,
    instructions:
      'Build sentences using proper German word order: finite verb in position 2 for main clauses, TeKaMoLo (Temporal, Kausal, Modal, Lokal) for adverbial phrases, and verb at the end with weil/dass/obwohl.',
    toolRoute: '/sentence-builder',
    toolName: 'Sentence Builder',
    tips: ['If a temporal adverb starts the sentence, the subject immediately follows the verb (Inversion).'],
  },
  {
    id: 'act-gram-04',
    category: 'grammar',
    skill: 'grammar',
    supportedLevels: ['A1', 'A2'],
    title: 'Noun Gender & Article Explorer',
    germanTitle: 'Grammatik: Genusregeln & Artikel-Explorer',
    defaultMinutes: 15,
    instructions:
      'Practice identifying Der, Die, Das patterns by noun endings (-ung, -heit, -keit, -schaft, -chen, -or, -ist). Train instant recall.',
    toolRoute: '/article-explorer',
    toolName: 'Article Explorer',
    tips: ['Always learn new German nouns with their definite article and plural form as one single lexical unit.'],
  },

  // --- 6. VOCABULARY (WORTSCHATZ) ---
  {
    id: 'act-voc-01',
    category: 'vocabulary',
    skill: 'vocabulary',
    supportedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    title: 'Daily German Word (Wort des Tages)',
    germanTitle: 'Wortschatz: Wort des Tages & Kontext-Quiz',
    defaultMinutes: 15,
    instructions:
      'Study today curated German word. Review its article, plural, CEFR example sentences, pronunciation, and complete the 3-question mini-quiz to extend your streak.',
    toolRoute: '/word-of-the-day',
    toolName: 'Wort des Tages',
    tips: ['Write your own original sentence using the word in your notebook to lock in long-term memory.'],
  },
  {
    id: 'act-voc-02',
    category: 'vocabulary',
    skill: 'vocabulary',
    supportedLevels: ['A1', 'A2', 'B1', 'B2'],
    title: 'Curated Thematic Flashcard Review',
    germanTitle: 'Wortschatz: Mein Vokabelheft & Spaced Repetition',
    defaultMinutes: 20,
    instructions:
      'Review your saved terms in My Vocabulary. Test yourself on noun articles, collocations, and verb prepositions.',
    toolRoute: '/my-vocabulary',
    toolName: 'My Vocabulary',
    tips: ['Focus especially on words you marked as difficult or missed during reading/listening exercises.'],
  },

  // --- 7. MOCK EXAMS & REVISION ---
  {
    id: 'act-mock-01',
    category: 'mock-exam',
    skill: 'mock-exam',
    supportedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    title: 'Full Mock Exam Simulation (Timed)',
    germanTitle: 'Prüfungssimulation: Gesamter Modelltest unter Zeitdruck',
    defaultMinutes: 90,
    instructions:
      'Simulate exam conditions. Silence your phone, set a timer for each section (Lesen, Hören, Schreiben), and complete the paper without pausing or consulting a dictionary. Record your practice scores.',
    tips: ['Do not spend more than allotted time per section. If stuck, make an educated guess and move forward.'],
  },
  {
    id: 'act-rev-01',
    category: 'revision',
    skill: 'revision',
    supportedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    title: 'Targeted Error Analysis & Weak-Point Remediation',
    germanTitle: 'Wiederholung: Gezielte Fehleranalyse & Schwachstellen-Training',
    defaultMinutes: 30,
    instructions:
      'Review mistakes made during the latest mock exam or quizzes. Identify patterns: was it a vocabulary gap, a grammar rule confusion, or misreading the question?',
    toolRoute: '/assessment',
    toolName: 'Diagnostic Assessment',
    tips: ['Write out corrected sentences with clear notes explaining why the original answer was flawed.'],
  },
]
