import type { CefrLevel } from '@/types'
import { businessInfo } from '@/config/business'

export interface CourseSkill {
  id: 'listening' | 'speaking' | 'reading' | 'writing'
  germanTitle: string
  englishTitle: string
  description: string
  practicalCapability: string
  exampleTask: string
}

export interface ComparisonCategoryItem {
  id: string
  label: string
  categoryGroup: 'overview' | 'skills' | 'linguistics' | 'logistics'
  description?: string
  values: Record<CefrLevel, string>
}

export interface CourseComparisonLevel {
  level: CefrLevel
  id: string
  name: string
  stage: string
  tagline: string
  badgeLabel: string
  shortDescription: string
  progressionOrder: number
  hoursTotal: number
  durationWeeks: number
  examTarget: string
  deliveryMode: string
  nextLevel: string
  milestone: string
  skills: {
    listening: CourseSkill
    speaking: CourseSkill
    reading: CourseSkill
    writing: CourseSkill
  }
  grammarCoverage: string
  vocabularyRange: string
  realWorldScenario: string
  syllabusHighlights: string[]
}

export const COURSE_COMPARISON_LEVELS: Record<CefrLevel, CourseComparisonLevel> = {
  A1: {
    level: 'A1',
    id: 'a1',
    name: 'Beginner Foundation',
    stage: 'Breakthrough (A1)',
    tagline: 'First steps in German phonetics and everyday communication',
    badgeLabel: 'Anfänger',
    shortDescription: 'Master fundamental phonetics, basic greetings, articles, and simple present-tense expressions for immediate daily needs.',
    progressionOrder: 1,
    hoursTotal: 80,
    durationWeeks: 8,
    examTarget: 'Goethe-Zertifikat A1 / Start Deutsch 1',
    deliveryMode: 'Hybrid (Online Live & Offline Classroom)',
    nextLevel: 'A2 Elementary',
    milestone: 'Can introduce yourself, ask simple questions, order in a café, and understand slow, clear speech.',
    skills: {
      listening: {
        id: 'listening',
        germanTitle: 'Hören',
        englishTitle: 'Listening',
        description: 'Understand everyday words and basic expressions spoken slowly and distinctly.',
        practicalCapability: 'Recognize familiar words and basic phrases concerning yourself, family, and immediate surroundings.',
        exampleTask: 'Understanding train platform announcements, simple prices, and spoken phone numbers.',
      },
      speaking: {
        id: 'speaking',
        germanTitle: 'Sprechen',
        englishTitle: 'Speaking',
        description: 'Engage in simple dialogues and introduce yourself with basic vocabulary.',
        practicalCapability: 'Ask and answer simple questions about personal details, where you live, and what you have.',
        exampleTask: 'Introducing your profession and asking someone for their address or phone number.',
      },
      reading: {
        id: 'reading',
        germanTitle: 'Lesen',
        englishTitle: 'Reading',
        description: 'Read brief notices, storefront signs, simple menus, and directory listings.',
        practicalCapability: 'Understand familiar names, words, and very simple sentences on notices and posters.',
        exampleTask: 'Reading opening hours on a bakery door or identifying products in a supermarket.',
      },
      writing: {
        id: 'writing',
        germanTitle: 'Schreiben',
        englishTitle: 'Writing',
        description: 'Compose basic personal notes and fill out standard registration forms.',
        practicalCapability: 'Write short, simple postcards and enter personal details on hotel check-in forms.',
        exampleTask: 'Completing a visa application form with name, nationality, and date of birth.',
      },
    },
    grammarCoverage: 'Present tense (Präsens), personal pronouns, definite/indefinite articles (der/die/das/ein/kein), basic V2 word order, yes/no questions, modal verbs (können, möchten).',
    vocabularyRange: '~600–800 essential words (family, numbers, time, food, home, daily routine).',
    realWorldScenario: 'Ordering a coffee and pastry in Berlin, buying a train ticket at a ticket machine, and checking into a hotel.',
    syllabusHighlights: [
      'Phonetics and German alphabet pronunciation',
      'Definite and indefinite article genders (der, die, das)',
      'Regular and irregular present-tense verb conjugations',
      'Numbers, prices, clock times, and calendar dates',
    ],
  },
  A2: {
    level: 'A2',
    id: 'a2',
    name: 'Elementary Proficiency',
    stage: 'Waystage (A2)',
    tagline: 'Routine conversations, past experiences, and social interactions',
    badgeLabel: 'Grundlegend',
    shortDescription: 'Navigate routine daily situations, describe past events, express preferences, and manage everyday social and workplace interactions.',
    progressionOrder: 2,
    hoursTotal: 80,
    durationWeeks: 8,
    examTarget: 'Goethe-Zertifikat A2 / telc Deutsch A2',
    deliveryMode: 'Hybrid (Online Live & Offline Classroom)',
    nextLevel: 'B1 Intermediate',
    milestone: 'Can handle routine social exchanges, describe past events (Perfekt), and write structured informal messages.',
    skills: {
      listening: {
        id: 'listening',
        germanTitle: 'Hören',
        englishTitle: 'Listening',
        description: 'Catch the main point in short, clear messages, announcements, and routine conversations.',
        practicalCapability: 'Understand phrases related to areas of immediate personal relevance (shopping, employment, local area).',
        exampleTask: 'Understanding doctor appointment reminders and radio weather forecasts.',
      },
      speaking: {
        id: 'speaking',
        germanTitle: 'Sprechen',
        englishTitle: 'Speaking',
        description: 'Describe routine tasks and exchange information on familiar topics.',
        practicalCapability: 'Describe your background, immediate environment, and matters in areas of immediate need.',
        exampleTask: 'Explaining a minor illness to a pharmacist or describing your weekend trip.',
      },
      reading: {
        id: 'reading',
        germanTitle: 'Lesen',
        englishTitle: 'Reading',
        description: 'Extract specific predictable information from everyday materials.',
        practicalCapability: 'Read short, simple texts such as advertisements, prospectuses, menus, and timetables.',
        exampleTask: 'Finding transit departure times and rental apartment requirements in a local notice.',
      },
      writing: {
        id: 'writing',
        germanTitle: 'Schreiben',
        englishTitle: 'Writing',
        description: 'Draft short personal letters, thank-you notes, and routine email confirmations.',
        practicalCapability: 'Write short, simple notes and messages relating to matters in areas of immediate need.',
        exampleTask: 'Writing an email to a landlord confirming an appointment to view a flat.',
      },
    },
    grammarCoverage: 'Conversational past tense (Perfekt with haben/sein), simple past of modals/auxiliaries (Präteritum war/hatte), accusative & dative cases, two-way prepositions (Wechselpräpositionen), reflexive verbs.',
    vocabularyRange: '~1,200–1,500 words (travel, health, living, shopping, leisure, work routines).',
    realWorldScenario: 'Scheduling a medical appointment, asking for refunds in stores, and discussing weekend plans with colleagues.',
    syllabusHighlights: [
      'Narrating past events using Perfekt with haben and sein',
      'Two-way prepositions (Wechselpräpositionen with Akkusativ/Dativ)',
      'Modal verb past forms (musste, konnte, wollte)',
      'Comparative and superlative adjective forms',
    ],
  },
  B1: {
    level: 'B1',
    id: 'b1',
    name: 'Intermediate Independence',
    stage: 'Threshold (B1)',
    tagline: 'Independent communication, travel self-reliance, and work entry',
    badgeLabel: 'Selbstständig',
    shortDescription: 'Attain independent language competence: express opinions, discuss personal goals, navigate German bureaucracy, and prepare for citizenship or vocational training.',
    progressionOrder: 3,
    hoursTotal: 100,
    durationWeeks: 10,
    examTarget: 'Goethe-Zertifikat B1 / telc Deutsch B1 / ÖSD B1',
    deliveryMode: 'Hybrid (Online Live & Offline Classroom)',
    nextLevel: 'B2 Upper-Intermediate',
    milestone: 'Can live independently in German-speaking countries, handle most travel situations, and write formal correspondence.',
    skills: {
      listening: {
        id: 'listening',
        germanTitle: 'Hören',
        englishTitle: 'Listening',
        description: 'Follow the main points of clear standard German on work, school, and leisure topics.',
        practicalCapability: 'Understand main ideas in audio broadcasts and straightforward conversations when standard dialect is spoken.',
        exampleTask: 'Following a presentation at work or understanding a podcast on current cultural events.',
      },
      speaking: {
        id: 'speaking',
        germanTitle: 'Sprechen',
        englishTitle: 'Speaking',
        description: 'Participate unprepared in discussions on familiar topics and state reasons for opinions.',
        practicalCapability: 'Connect phrases to describe experiences, ambitions, and give reasons for plans and views.',
        exampleTask: 'Participating in a job interview or debating environmental habits with acquaintances.',
      },
      reading: {
        id: 'reading',
        germanTitle: 'Lesen',
        englishTitle: 'Reading',
        description: 'Comprehend texts consisting of everyday or job-related language and personal correspondence.',
        practicalCapability: 'Understand descriptions of events, feelings, and wishes in personal letters and articles.',
        exampleTask: 'Reading workplace safety instructions or an editorial article in a German newspaper.',
      },
      writing: {
        id: 'writing',
        germanTitle: 'Schreiben',
        englishTitle: 'Writing',
        description: 'Draft connected texts, official letters, and semi-formal emails with clear argumentation.',
        practicalCapability: 'Write straightforward connected texts on familiar topics and personal letters conveying experiences.',
        exampleTask: 'Writing a formal letter of complaint or a motivation letter for a vocational apprenticeship.',
      },
    },
    grammarCoverage: 'Subordinate clauses with conjunctions (weil, dass, obwohl, wenn, als), relative clauses, full adjective declension across four cases, passive voice basics, infinitive with zu (um...zu), Konjunktiv II for polite requests.',
    vocabularyRange: '~2,500–3,000 words (workplace, current affairs, environment, technology, emotions).',
    realWorldScenario: 'Discussing contract terms with a utility company, attending child-parent school meetings, and opening a bank account independently.',
    syllabusHighlights: [
      'Complex subordinate clauses and connectors (obwohl, damit, während)',
      'Adjective endings in Nominativ, Akkusativ, Dativ, and Genitiv',
      'Konjunktiv II for hypothetical wishes and polite requests',
      'Official letter formatting according to DIN standards',
    ],
  },
  B2: {
    level: 'B2',
    id: 'b2',
    name: 'Upper-Intermediate Professional',
    stage: 'Vantage (B2)',
    tagline: 'Professional workplace fluency, clinical healthcare, and technical discourse',
    badgeLabel: 'Fließend',
    shortDescription: 'Achieve advanced working proficiency demanded by German hospitals, engineering firms, and universities: master nuanced debates, passive structures, and complex documentation.',
    progressionOrder: 4,
    hoursTotal: 120,
    durationWeeks: 12,
    examTarget: 'Goethe-Zertifikat B2 / telc Deutsch B2 / TestDaF (TDN 3/4)',
    deliveryMode: 'Hybrid (Online Live & Offline Classroom)',
    nextLevel: 'C1 Advanced Mastery',
    milestone: 'Can communicate spontaneously and fluently with native speakers, lead technical discussions, and write detailed essays.',
    skills: {
      listening: {
        id: 'listening',
        germanTitle: 'Hören',
        englishTitle: 'Listening',
        description: 'Understand extended speech, lectures, and complex lines of technical argument.',
        practicalCapability: 'Understand complex lectures, television news programs, and most feature films in standard dialect.',
        exampleTask: 'Following medical handovers in a hospital or understanding an engineering sprint retrospective.',
      },
      speaking: {
        id: 'speaking',
        germanTitle: 'Sprechen',
        englishTitle: 'Speaking',
        description: 'Interact with natural spontaneity and present clear, detailed arguments on complex topics.',
        practicalCapability: 'Explain viewpoints on topical issues giving advantages and disadvantages of various options.',
        exampleTask: 'Presenting a project proposal in a corporate meeting and defending conclusions against objections.',
      },
      reading: {
        id: 'reading',
        germanTitle: 'Lesen',
        englishTitle: 'Reading',
        description: 'Read technical articles, specialized reports, and contemporary German prose with nuance.',
        practicalCapability: 'Understand articles and reports on contemporary problems where authors adopt specific stances.',
        exampleTask: 'Reading German labor law summaries, clinical trial documentation, or industry whitepapers.',
      },
      writing: {
        id: 'writing',
        germanTitle: 'Schreiben',
        englishTitle: 'Writing',
        description: 'Write clear, detailed texts on complex subjects, synthesizing information from diverse sources.',
        practicalCapability: 'Write well-structured essays, reports, and professional correspondence passing on critical insights.',
        exampleTask: 'Writing a detailed incident analysis or a formal project evaluation report.',
      },
    },
    grammarCoverage: 'Vorgangspassiv & Zustandspassiv (all tenses) and passive substitutes (lassen sich, sein zu + Infinitiv), Konjunktiv II for past counterfactuals, two-part connectors (sowohl...als auch, weder...noch), participial attributes.',
    vocabularyRange: '~4,500–5,000 words (technical jargon, academic register, healthcare terminology, idiomatic expressions).',
    realWorldScenario: 'Leading a multidisciplinary team meeting, consulting German medical patients, and negotiating contractual agreements.',
    syllabusHighlights: [
      'Passive voice mastery and passive alternatives (Modalverb-Ersatzformen)',
      'Subjunctive II past counterfactuals (hätte gekonnt / wäre gewesen)',
      'Participial constructions (Partizip I and II as descriptive attributes)',
      'Multi-part sentence connectors (nicht nur... sondern auch, je... desto)',
    ],
  },
  C1: {
    level: 'C1',
    id: 'c1',
    name: 'Advanced Professional Mastery',
    stage: 'Effective Operational Proficiency (C1)',
    tagline: 'Academic matriculation, scientific publication, and executive command',
    badgeLabel: 'Fachkundig',
    shortDescription: 'Express complex ideas spontaneously and effortlessly: comprehend demanding long texts, appreciate implicit meanings, and write rigorous scientific and executive compositions.',
    progressionOrder: 5,
    hoursTotal: 140,
    durationWeeks: 14,
    examTarget: 'Goethe-Zertifikat C1 / TestDaF (TDN 4/5) / DSH-2/3',
    deliveryMode: 'Hybrid (Online Live & Offline Classroom)',
    nextLevel: 'C2 Mastery / Professional Practice',
    milestone: 'Can study at German universities without language conditions, write scientific papers, and conduct executive business.',
    skills: {
      listening: {
        id: 'listening',
        germanTitle: 'Hören',
        englishTitle: 'Listening',
        description: 'Follow extended speech on abstract topics with subtle idiomatic expressions and register shifts.',
        practicalCapability: 'Understand a wide range of demanding spoken texts, implicit meanings, and rapid colloquial dialogues.',
        exampleTask: 'Following university lectures on philosophy or law and understanding rapid multi-speaker debates.',
      },
      speaking: {
        id: 'speaking',
        germanTitle: 'Sprechen',
        englishTitle: 'Speaking',
        description: 'Express ideas fluently, spontaneously, and with precision without searching for words.',
        practicalCapability: 'Formulate nuanced arguments, use language flexibly for academic and professional purposes, and adapt tone.',
        exampleTask: 'Delivering a keynote presentation at an academic conference and moderating panel discussions.',
      },
      reading: {
        id: 'reading',
        germanTitle: 'Lesen',
        englishTitle: 'Reading',
        description: 'Analyze complex literary and scientific texts, appreciating stylistic distinctions and subtext.',
        practicalCapability: 'Understand long and complex factual and literary texts, appreciating stylistic nuances and implicit messages.',
        exampleTask: 'Critically reviewing peer-reviewed German academic papers and judicial rulings.',
      },
      writing: {
        id: 'writing',
        germanTitle: 'Schreiben',
        englishTitle: 'Writing',
        description: 'Compose well-structured scientific compositions, policy papers, and executive summaries.',
        practicalCapability: 'Write clear, well-structured texts on complex subjects, demonstrating controlled use of organizational patterns.',
        exampleTask: 'Writing a master’s thesis literature review or an executive business memorandum.',
      },
    },
    grammarCoverage: 'Reported speech (Konjunktiv I & II), nominalization style (Nominalstil / Verbalstil transformations), complex extended participle clauses (erweiterte Partizipialattribute), modal particles (ja, doch, mal, wohl).',
    vocabularyRange: '~8,000+ words (scientific registers, metaphorical idiom, nuanced stylistic variations, socio-political rhetoric).',
    realWorldScenario: 'Defending a doctoral dissertation in German, authoring corporate white papers, and managing complex regulatory compliance.',
    syllabusHighlights: [
      'Reported speech with Konjunktiv I and indirect quotation styles',
      'Nominal style (Nominalstil) transformations for academic literature',
      'Subtle German modal particles (ja, wohl, doch, eben, halt)',
      'Stylistic register variation and persuasive rhetorical devices',
    ],
  },
}

export const COMPARISON_CATEGORIES: ComparisonCategoryItem[] = [
  {
    id: 'cefr-level',
    label: '1. CEFR Level',
    categoryGroup: 'overview',
    description: 'Official Common European Framework of Reference level code',
    values: {
      A1: 'A1 (Beginner)',
      A2: 'A2 (Elementary)',
      B1: 'B1 (Intermediate)',
      B2: 'B2 (Upper Intermediate)',
      C1: 'C1 (Advanced)',
    },
  },
  {
    id: 'learning-stage',
    label: '2. Learning Stage',
    categoryGroup: 'overview',
    description: 'European educational competency tier',
    values: {
      A1: 'Breakthrough — Discovery and survival fundamentals',
      A2: 'Waystage — Routine interactions and social exchange',
      B1: 'Threshold — Independent communication and travel confidence',
      B2: 'Vantage — Professional fluency and clinical/technical discourse',
      C1: 'Operational Proficiency — Academic research and executive command',
    },
  },
  {
    id: 'main-focus',
    label: '3. Main Learning Focus',
    categoryGroup: 'overview',
    description: 'Core pedagogical priority for this level',
    values: {
      A1: 'Phonetic accuracy, basic present-tense syntax, and essential everyday vocabulary',
      A2: 'Past tense narration (Perfekt), social conversations, and daily routine descriptions',
      B1: 'Independent discourse, complex sentence connectors, and official correspondence',
      B2: 'Advanced technical discourse, passive constructions, and spontaneous fluent debate',
      C1: 'Academic writing, reported speech (Konjunktiv I), and nuanced stylistic command',
    },
  },
  {
    id: 'speaking',
    label: '4. Speaking Capabilities',
    categoryGroup: 'skills',
    description: 'What you can articulate orally',
    values: {
      A1: 'Introduce yourself, ask simple personal questions, order food, and state immediate needs',
      A2: 'Exchange information on familiar topics, describe past activities, and schedule appointments',
      B1: 'Enter unprepared into conversations on familiar subjects, express opinions, and describe ambitions',
      B2: 'Speak fluently and spontaneously with native speakers, defend viewpoints, and lead discussions',
      C1: 'Express ideas effortlessly without searching for words, with precise stylistic modulation',
    },
  },
  {
    id: 'listening',
    label: '5. Listening Capabilities',
    categoryGroup: 'skills',
    description: 'What you can comprehend when spoken to',
    values: {
      A1: 'Understand simple words, numbers, and basic instructions spoken slowly and clearly',
      A2: 'Understand short messages, announcements, and key points in routine conversations',
      B1: 'Follow standard speech on familiar topics, radio broadcasts, and workplace discussions',
      B2: 'Understand extended technical lectures, complex debates, and TV news broadcasts in standard German',
      C1: 'Comprehend demanding lectures, idiomatic expressions, rapid colloquial speech, and implicit nuances',
    },
  },
  {
    id: 'reading',
    label: '6. Reading Capabilities',
    categoryGroup: 'skills',
    description: 'What texts you can interpret independently',
    values: {
      A1: 'Read short storefront signs, basic menus, simple forms, and street directory listings',
      A2: 'Extract key details from advertisements, timetables, personal emails, and brochures',
      B1: 'Understand everyday job-related documents, newspaper articles, and personal letters',
      B2: 'Read specialized technical reports, contemporary literature, and complex editorial essays',
      C1: 'Analyze long, demanding academic papers, legal documents, and subtle literary prose',
    },
  },
  {
    id: 'writing',
    label: '7. Writing Capabilities',
    categoryGroup: 'skills',
    description: 'What documents you can compose',
    values: {
      A1: 'Fill in standard forms (name, address, date) and write very short personal greetings',
      A2: 'Write short personal notes, thank-you messages, and brief email confirmations',
      B1: 'Draft straightforward connected texts, formal complaint letters, and personal narratives',
      B2: 'Write structured analytical essays, detailed technical reports, and professional correspondence',
      C1: 'Produce sophisticated academic compositions, executive summaries, and publishable articles',
    },
  },
  {
    id: 'grammar',
    label: '8. Grammar Coverage',
    categoryGroup: 'linguistics',
    description: 'Key structural and syntactical rules mastered',
    values: {
      A1: 'Present tense (Präsens), articles (der/die/das/ein/kein), V2 rule, modal verbs (können, möchten)',
      A2: 'Conversational past (Perfekt), modal past (Präteritum), accusative & dative cases, Wechselpräpositionen',
      B1: 'Subordinate clauses (weil, dass, obwohl), relative clauses, adjective declensions, passive voice basics',
      B2: 'Full passive system, passive substitutes (sein zu), Konjunktiv II counterfactuals, two-part connectors',
      C1: 'Reported speech (Konjunktiv I/II), nominal style (Nominalstil), extended participial attributes, modal particles',
    },
  },
  {
    id: 'vocabulary',
    label: '9. Vocabulary Development',
    categoryGroup: 'linguistics',
    description: 'Estimated active and passive lexical range',
    values: {
      A1: '~600–800 words (numbers, family, food, time, everyday home objects)',
      A2: '~1,200–1,500 words (travel, health, work routines, shopping, living quarters)',
      B1: '~2,500–3,000 words (current affairs, professional aspirations, emotions, technology)',
      B2: '~4,500–5,000 words (technical jargon, healthcare terms, academic register, idioms)',
      C1: '~8,000+ words (scientific terminology, metaphorical nuances, socio-political discourse)',
    },
  },
  {
    id: 'real-world',
    label: '10. Real-World Communication',
    categoryGroup: 'overview',
    description: 'Authentic situations you can master',
    values: {
      A1: 'Supermarket shopping, café ordering, hotel check-in, asking for directions',
      A2: 'Doctor appointments, routine office chats, train station navigation, weekend plans',
      B1: 'German citizenship/visa interviews, workplace meetings, customer complaints, Ausbildung entry',
      B2: 'Hospital clinical rounds, engineering sprints, university seminars, contract negotiations',
      C1: 'Doctoral thesis defense, scientific publications, corporate board meetings, legal proceedings',
    },
  },
  {
    id: 'exam-prep',
    label: '11. Exam Preparation',
    categoryGroup: 'logistics',
    description: 'Verified official examinations targeted',
    values: {
      A1: 'Goethe-Zertifikat A1 / Start Deutsch 1',
      A2: 'Goethe-Zertifikat A2 / telc Deutsch A2',
      B1: 'Goethe-Zertifikat B1 / telc Deutsch B1 / ÖSD B1',
      B2: 'Goethe-Zertifikat B2 / telc Deutsch B2 / TestDaF (TDN 3/4)',
      C1: 'Goethe-Zertifikat C1 / TestDaF (TDN 4/5) / DSH-2/3',
    },
  },
  {
    id: 'learning-modes',
    label: '12. Available Learning Modes',
    categoryGroup: 'logistics',
    description: 'How you can study this course at D9W',
    values: {
      A1: 'Hybrid (Interactive Online Live & Institute Classroom)',
      A2: 'Hybrid (Interactive Online Live & Institute Classroom)',
      B1: 'Hybrid (Interactive Online Live & Institute Classroom)',
      B2: 'Hybrid (Interactive Online Live & Institute Classroom)',
      C1: 'Hybrid (Interactive Online Live & Institute Classroom)',
    },
  },
  {
    id: 'course-duration',
    label: '13. Course Duration',
    categoryGroup: 'logistics',
    description: 'Verified academic timeline and hours',
    values: {
      A1: '8 Weeks • 80 Teaching Hours',
      A2: '8 Weeks • 80 Teaching Hours',
      B1: '10 Weeks • 100 Teaching Hours',
      B2: '12 Weeks • 120 Teaching Hours',
      C1: '14 Weeks • 140 Teaching Hours',
    },
  },
  {
    id: 'next-level',
    label: '14. Recommended Next Level',
    categoryGroup: 'logistics',
    description: 'Natural progression milestone',
    values: {
      A1: 'A2 Elementary Proficiency',
      A2: 'B1 Intermediate Independence',
      B1: 'B2 Upper-Intermediate Professional',
      B2: 'C1 Advanced Professional Mastery',
      C1: 'C2 Mastery & Specialized Academic Practice',
    },
  },
]

export const ALL_CEFR_LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1']

/**
 * Builds a properly encoded WhatsApp click-to-chat URL with prefilled course enquiry text.
 * Uses official D9W phone number +91 80566 57640 (918056657640).
 */
export function buildWhatsAppCourseEnquiryUrl(level: CefrLevel): string {
  const course = COURSE_COMPARISON_LEVELS[level]
  const message = `Hello D9W! I am interested in joining your ${course.level} German language course (${course.name}). Please share the available levels, batch timings and admission details.`
  const encodedText = encodeURIComponent(message)
  return `https://wa.me/${businessInfo.whatsappNumber}?text=${encodedText}`
}
