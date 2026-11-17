import type { CefrLevel } from '@/types'
import { D9W_WHATSAPP_NUMBER } from '@/data/batches'

export interface SyllabusSkillOutcomes {
  listening: {
    summary: string
    practicalTask: string
    benchmark: string
  }
  speaking: {
    summary: string
    practicalTask: string
    benchmark: string
  }
  reading: {
    summary: string
    practicalTask: string
    benchmark: string
  }
  writing: {
    summary: string
    practicalTask: string
    benchmark: string
  }
}

export interface SyllabusModule {
  id: string
  moduleNumber: number
  title: string
  germanTitle: string
  description: string
  learningObjectives: string[]
  grammarTopics: string[]
  vocabularyThemes: string[]
  skillActivities: {
    listening: string
    speaking: string
    reading: string
    writing: string
  }
  suggestedActivities: string[]
}

export interface GrammarMapItem {
  topic: string
  description: string
  moduleRef: number
  level: CefrLevel
}

export interface VocabularyThemeItem {
  theme: string
  exampleWords: string[]
  moduleRef: number
}

export interface ExamPreparationInfo {
  applicableExams: string[]
  cefrBenchmark: string
  examStructure: string
  keyStrategies: string[]
  disclaimer: string
}

export interface SyllabusDocument {
  level: CefrLevel
  title: string
  germanTitle: string
  subtitle: string
  overview: string
  prerequisites: string[]
  hoursTotal: number
  durationWeeks: number
  learningObjectives: string[]
  skillOutcomes: SyllabusSkillOutcomes
  modules: SyllabusModule[]
  grammarMap: GrammarMapItem[]
  vocabularyMap: VocabularyThemeItem[]
  examPreparation: ExamPreparationInfo
  progression: string
  recommendedNextLevel?: CefrLevel
  publishedDate: string
}

export const SYLLABUS_DATA: Record<CefrLevel, SyllabusDocument> = {
  A1: {
    level: 'A1',
    title: 'A1 Beginner German Foundation',
    germanTitle: 'A1 — Anfänger Grundstufe',
    subtitle: 'Breakthrough Language Competence (CEFR A1)',
    overview:
      'The A1 curriculum is designed for absolute beginners with zero prior German background. Learners develop authentic phonetic clarity, essential everyday vocabulary, and fundamental sentence structure to communicate in immediate real-world situations such as greetings, shopping, ordering food, and personal introductions.',
    prerequisites: [
      'None — absolute beginners welcome with zero prior language experience',
      'Familiarity with the Latin alphabet',
      'Willingness to practice oral phonetics and daily repetition',
    ],
    hoursTotal: 80,
    durationWeeks: 8,
    publishedDate: '2026-11-15',
    learningObjectives: [
      'Master German phonetics, alphabet spelling, and standard diphthongs (ei, eu, au).',
      'Introduce oneself and others, ask and answer questions about personal details.',
      'Navigate routine daily situations (ordering in cafés, buying train tickets, shopping).',
      'Understand grammatical gender (der, die, das) and construct correct Verb-Second sentences.',
      'Compose simple postcards, text messages, and fill out hotel registration forms.',
    ],
    skillOutcomes: {
      listening: {
        summary: 'Understand everyday words, simple phrases, and numbers spoken slowly and clearly.',
        practicalTask: 'Comprehending platform arrival announcements at German train stations and audio cashier totals.',
        benchmark: 'Can extract specific numerical and factual information from short, articulated announcements.',
      },
      speaking: {
        summary: 'Introduce yourself, state your profession and nationality, and ask simple survival questions.',
        practicalTask: 'Roleplaying a bakery visit: ordering bread rolls, asking for the price, and paying in Euros.',
        benchmark: 'Can manage simple conversational exchanges using basic formulaic expressions.',
      },
      reading: {
        summary: 'Recognize familiar names, words, and short sentences in storefronts, flyers, and menus.',
        practicalTask: 'Reading restaurant opening hours, menu categories, and street directional signs in Berlin.',
        benchmark: 'Can locate predictable specific information in simple everyday public notices.',
      },
      writing: {
        summary: 'Fill out standard forms and write short, simple personal notes and greeting cards.',
        practicalTask: 'Completing a hotel check-in card with name, nationality, birthdate, and contact details.',
        benchmark: 'Can write isolated phrases and sentences about themselves and immediate personal needs.',
      },
    },
    modules: [
      {
        id: 'a1-mod-1',
        moduleNumber: 1,
        title: 'First Steps, Phonetics & Introductions',
        germanTitle: 'Modul 1: Erste Schritte & Aussprache',
        description: 'Focuses on German phonetics, alphabet spelling, greetings, and introducing yourself and others.',
        learningObjectives: [
          'Pronounce German vowels, umlauts (ä, ö, ü), and diphthongs accurately.',
          'Introduce oneself, spell your name, and state where you come from.',
          'Count from 0 to 100 and exchange phone numbers.',
        ],
        grammarTopics: [
          'Personal pronouns (ich, du, er, sie, es, wir, ihr, sie/Sie)',
          'Regular present-tense verb conjugations (-e, -st, -t, -en, -t, -en)',
          'Irregular core verbs: sein (to be) & haben (to have)',
          'Sentence structure: Verb-Second (V2) in declarative sentences',
          'W-questions (Wer, Wie, Woher, Was, Wo)',
        ],
        vocabularyThemes: ['Greetings & Farewells', 'Alphabet & Spelling', 'Numbers 0–100', 'Countries & Nationalities', 'Languages'],
        skillActivities: {
          listening: 'Listening to phone numbers, names spelled aloud, and standard greetings.',
          speaking: 'Introducing your study partner to the class and stating their country of origin.',
          reading: 'Reading name badges, business cards, and international country lists.',
          writing: 'Writing a short 4-sentence introductory self-profile for an online language exchange.',
        },
        suggestedActivities: ['Phonetic repetition drills with audio feedback', 'Interactive Number Trainer practice', 'Pair introduction roleplay'],
      },
      {
        id: 'a1-mod-2',
        moduleNumber: 2,
        title: 'Family, Routine & The Clock',
        germanTitle: 'Modul 2: Familie & Tagesablauf',
        description: 'Covers family relationships, professions, describing a typical day, telling the time, and calendar dates.',
        learningObjectives: [
          'Describe your family tree and household members.',
          'Ask for and tell the time using formal (24h) and conversational German.',
          'Describe a daily morning and evening schedule.',
        ],
        grammarTopics: [
          'Possessive articles in the nominative (mein/meine, dein/deine, sein/ihr)',
          'Definite articles (der, die, das) & Indefinite articles (ein, eine, ein)',
          'Negative article: kein / keine / kein vs. adverbial nicht',
          'Separable prefix verbs (aufstehen, anrufen, einkaufen)',
          'Sentence bracket (Satzklammer) with separable verbs',
        ],
        vocabularyThemes: ['Family & Relatives', 'Professions & Jobs', 'Clock Time & Periods of the Day', 'Days of the Week & Months'],
        skillActivities: {
          listening: 'Audio dictation of appointment hours, radio time announcements, and daily routines.',
          speaking: 'Describing what you do on Saturdays from morning until night.',
          reading: 'Reading a weekly calendar schedule and doctor consultation hours.',
          writing: 'Writing a short message informing a friend when your German class starts and ends.',
        },
        suggestedActivities: ['Interactive Time Trainer drills (formal vs. informal "halb vier")', 'Family tree presentation', 'Daily schedule worksheet'],
      },
      {
        id: 'a1-mod-3',
        moduleNumber: 3,
        title: 'Food, Dining & Grocery Shopping',
        germanTitle: 'Modul 3: Essen, Trinken & Einkaufen',
        description: 'Essential communicative competence for supermarkets, farmers markets, bakeries, and traditional German restaurants.',
        learningObjectives: [
          'Order food, beverages, and request the bill politely in a café or restaurant.',
          'Shop at a supermarket, ask for weights, quantities, and prices in Euros.',
          'Express likes, dislikes, and culinary preferences.',
        ],
        grammarTopics: [
          'The Accusative case (den, die, das / einen, eine, ein)',
          'Masculine article shift in accusative: der &rarr; den / ein &rarr; einen',
          'Stem-changing verbs in present tense (essen: du isst; nehmen: du nimmst)',
          'Modal verb: möchten (would like) & können (can/to be able)',
          'Negation in accusative: keinen, keine, kein',
        ],
        vocabularyThemes: ['Food & Groceries', 'Beverages & Meals', 'Weights & Packaging', 'Restaurant & Café Vocabulary', 'Prices & Euro currency'],
        skillActivities: {
          listening: 'Comprehending waiter recommendations, total prices, and grocery aisle questions.',
          speaking: 'Ordering a three-course lunch in a German Gasthaus and asking for the bill.',
          reading: 'Interpreting a bakery price board, supermarket weekly discounts, and restaurant menus.',
          writing: 'Compiling a categorized weekly shopping list and writing a short thank-you dinner note.',
        },
        suggestedActivities: ['Article Explorer practice focusing on food nouns', 'Simulated restaurant ordering roleplay', 'Grocery receipt decoding'],
      },
      {
        id: 'a1-mod-4',
        moduleNumber: 4,
        title: 'Housing, Town Orientation & Hobbies',
        germanTitle: 'Modul 4: Wohnen, Orientierung & Freizeit',
        description: 'Covers home environments, describing furniture, navigating city streets, asking for directions, and leisure activities.',
        learningObjectives: [
          'Describe your apartment or house, rooms, and basic furniture.',
          'Ask for and provide directions in an unfamiliar German town.',
          'Discuss hobbies, sports, weekend interests, and make invitations.',
        ],
        grammarTopics: [
          'Ja/Nein questions and inversion word order',
          'Locational adverbs: links, rechts, geradeaus, da drüben',
          'Modal verbs in sentences: müssen, wollen, dürfen',
          'Prepositions of place intro: in, an, auf (basic locational contexts)',
          'Imperative with Sie (polite directions: "Gehen Sie geradeaus!")',
        ],
        vocabularyThemes: ['Rooms & Furniture', 'City Landmarks & Transit', 'Directions & Cardinal Points', 'Hobbies, Sports & Leisure'],
        skillActivities: {
          listening: 'Following spoken walking directions to the central train station (Hauptbahnhof).',
          speaking: 'Describing your ideal living room and asking where the nearest pharmacy is located.',
          reading: 'Reading floor plans, rental apartment advertisements, and local leisure activity schedules.',
          writing: 'Writing a short invitation email to a classmate for a weekend museum visit.',
        },
        suggestedActivities: ['Sentence Builder engine drills for modal sentence brackets', 'Map navigation simulation', 'Vocabulary flashcard review'],
      },
    ],
    grammarMap: [
      { topic: 'Personal Pronouns & Regular Verbs', description: 'Subject pronouns and standard present tense endings.', moduleRef: 1, level: 'A1' },
      { topic: 'Irregular Verbs: sein & haben', description: 'Essential auxiliary forms in present tense.', moduleRef: 1, level: 'A1' },
      { topic: 'Grammatical Genders: der / die / das', description: 'Definite and indefinite articles in the Nominative.', moduleRef: 2, level: 'A1' },
      { topic: 'Separable Prefix Verbs', description: 'Splitting prefixes to the end of main clauses.', moduleRef: 2, level: 'A1' },
      { topic: 'The Accusative Case', description: 'Direct object declension with masculine article shift (den/einen).', moduleRef: 3, level: 'A1' },
      { topic: 'Modal Verbs (können, möchten, müssen)', description: 'Auxiliary modal verbs and infinitive bracket.', moduleRef: 3, level: 'A1' },
      { topic: 'Negation: nicht vs. kein', description: 'Article negation vs. predicate/verb negation.', moduleRef: 4, level: 'A1' },
      { topic: 'Question Formations (W-Fragen & Ja/Nein)', description: 'Inversion syntax for questions and polite imperatives.', moduleRef: 4, level: 'A1' },
    ],
    vocabularyMap: [
      { theme: 'Personal Identification', exampleWords: ['Name', 'Herkunft', 'Wohnort', 'Beruf', 'Alter'], moduleRef: 1 },
      { theme: 'Family & Relations', exampleWords: ['Mutter', 'Vater', 'Eltern', 'Kinder', 'Geschwister'], moduleRef: 2 },
      { theme: 'Daily Life & Time', exampleWords: ['Uhrzeit', 'Morgen', 'Abend', 'Woche', 'Termin'], moduleRef: 2 },
      { theme: 'Food & Dining', exampleWords: ['Brot', 'Kaffee', 'Wasser', 'Käse', 'Rechnung'], moduleRef: 3 },
      { theme: 'City & Home', exampleWords: ['Wohnung', 'Zimmer', 'Bahnhof', 'Straße', 'Apotheke'], moduleRef: 4 },
    ],
    examPreparation: {
      applicableExams: ['Goethe-Zertifikat A1: Start Deutsch 1', 'telc Deutsch A1', 'ÖSD Zertifikat A1'],
      cefrBenchmark: 'CEFR A1 Breakthrough (Lowest official international certification tier)',
      examStructure: '4 Modules: Hören (approx. 20 min), Lesen (approx. 25 min), Schreiben (approx. 20 min), Sprechen (group oral, approx. 15 min).',
      keyStrategies: [
        'Practice spelling your name and email address clearly in German.',
        'Memorize numbers and prices thoroughly for the listening module.',
        'Master the standard form-filling fields (Vorname, Nachname, Geburtsdatum, PLZ).',
        'Learn 5 versatile letter/email closing formulas (Viele Grüße, Mit freundlichen Grüßen).',
      ],
      disclaimer: 'D9W German Language Institute is an independent language institute. Our curriculum aligns with CEFR benchmarks and Goethe/telc formats; course completion does not replace official examination registration.',
    },
    progression: 'Prepares directly for A2 Elementary Proficiency.',
    recommendedNextLevel: 'A2',
  },

  A2: {
    level: 'A2',
    title: 'A2 Elementary German Proficiency',
    germanTitle: 'A2 — Grundlegende Kenntnisse',
    subtitle: 'Waystage Language Competence (CEFR A2)',
    overview:
      'The A2 curriculum expands foundational communication into routine social, travel, and workplace contexts. Learners master conversational past tenses (Perfekt and Präteritum of modal verbs), two-way prepositions, the dative case, reflexive verbs, and subordinate clauses to narrate past experiences and negotiate everyday arrangements.',
    prerequisites: [
      'Completion of CEFR A1 course or equivalent foundational German knowledge',
      'Solid command of present tense conjugations and basic accusative case',
      'Vocabulary bank of approximately 600–800 words',
    ],
    hoursTotal: 80,
    durationWeeks: 8,
    publishedDate: '2026-11-15',
    learningObjectives: [
      'Communicate in simple, routine tasks requiring a direct exchange of information.',
      'Narrate past events and experiences using the conversational past (Perfekt).',
      'Master the Dative case and two-way prepositions (Wechselpräpositionen).',
      'Formulate polite requests, schedule appointments, and explain minor health issues.',
      'Draft informal emails, notes, and structured messages with basic connectors (weil, dass).',
    ],
    skillOutcomes: {
      listening: {
        summary: 'Understand phrases and highest frequency vocabulary related to areas of immediate personal relevance.',
        practicalTask: 'Following audio instructions at a doctor’s clinic and detailed transit delay notifications.',
        benchmark: 'Can identify the main topic of short, simple radio news and recorded telephone messages.',
      },
      speaking: {
        summary: 'Participate in simple routine conversations describing background, living conditions, and past events.',
        practicalTask: 'Explaining symptoms to a pharmacist and describing your educational and work background.',
        benchmark: 'Can describe personal experiences using connected sentences with temporal adverbs.',
      },
      reading: {
        summary: 'Understand short, simple texts such as advertisements, brochures, menus, and timetables.',
        practicalTask: 'Reading apartment rental requirements, transit route maps, and doctor prescription notices.',
        benchmark: 'Can locate specific, predictable information in everyday commercial and public print materials.',
      },
      writing: {
        summary: 'Write short, simple notes, messages, and brief personal letters/emails thanking someone or apologizing.',
        practicalTask: 'Writing an email to a landlord confirming an appointment or rescheduling a lesson.',
        benchmark: 'Can write a series of simple phrases and sentences linked with connectors like und, aber, weil.',
      },
    },
    modules: [
      {
        id: 'a2-mod-1',
        moduleNumber: 1,
        title: 'Travel, Transit & The Dative Case',
        germanTitle: 'Modul 1: Unterwegs & Der Dativ',
        description: 'Covers domestic and international travel, public transit, booking tickets, and dative prepositions.',
        learningObjectives: [
          'Navigate airport, train, and bus terminals in German-speaking countries.',
          'Understand and apply the Dative case (dem, der, dem, den + n).',
          'Use dative prepositions accurately (aus, bei, mit, nach, seit, von, zu).',
        ],
        grammarTopics: [
          'The Dative Case: definite and indefinite articles (dem, der, dem / einem, einer, einem)',
          'Dative Personal Pronouns (mir, dir, ihm, ihr, uns, euch, ihnen/Ihnen)',
          'Dative Prepositions: aus, bei, mit, nach, seit, von, zu',
          'Common verbs requiring the dative: helfen, danken, gefallen, gehören',
        ],
        vocabularyThemes: ['Travel & Transportation', 'Train Station & Airport', 'Hotels & Accommodations', 'Luggage & Packing'],
        skillActivities: {
          listening: 'Listening to automated flight boarding announcements and train platform schedule adjustments.',
          speaking: 'Asking for travel recommendations and buying round-trip train tickets at a service counter.',
          reading: 'Reading train schedules (Fahrpläne), track changes, and hotel booking confirmations.',
          writing: 'Writing an inquiry message to a hotel asking for a quiet room with breakfast included.',
        },
        suggestedActivities: ['Dative pronoun drills', 'Train ticket purchasing roleplay', 'Travel itinerary planning'],
      },
      {
        id: 'a2-mod-2',
        moduleNumber: 2,
        title: 'Narrating the Past: Das Perfekt',
        germanTitle: 'Modul 2: Vergangenheit erzählen',
        description: 'Mastery of conversational past tense (Perfekt) with auxiliary verbs haben and sein.',
        learningObjectives: [
          'Narrate weekend activities, vacations, and biographical milestones in the past.',
          'Distinguish when to use haben vs. sein in the Perfekt.',
          'Apply the simple past (Präteritum) of war, hatte, and modal verbs.',
        ],
        grammarTopics: [
          'Das Perfekt: Regular verbs with ge-...-t',
          'Das Perfekt: Irregular verbs with ge-...-en (strong verbs)',
          'Auxiliary selection: sein (verbs of movement & state change) vs. haben',
          'Präteritum of auxiliary verbs: sein (war) & haben (hatte)',
          'Präteritum of modal verbs: musste, konnte, wollte, durfte',
        ],
        vocabularyThemes: ['Vacations & Holiday Trips', 'Childhood & Biography', 'Celebrations & Milestones', 'Leisure Activities'],
        skillActivities: {
          listening: 'Comprehending an audio podcast interview where a traveler recounts their trip to Munich.',
          speaking: 'Pair discussion recounting your last weekend: what you did, visited, ate, and experienced.',
          reading: 'Reading personal blog entries and diary accounts of a cultural festival.',
          writing: 'Writing a personal email to a friend describing your recent vacation and past adventures.',
        },
        suggestedActivities: ['Past-tense memory card drills', 'Oral storytelling circle', 'Sentence Builder V2 bracket exercises'],
      },
      {
        id: 'a2-mod-3',
        moduleNumber: 3,
        title: 'Health, Body & Appointments',
        germanTitle: 'Modul 3: Gesundheit & Arztbesuche',
        description: 'Medical German fundamentals: making appointments, describing pain, and understanding pharmacist advice.',
        learningObjectives: [
          'Schedule, reschedule, and cancel appointments with medical clinics.',
          'Describe bodily symptoms, sicknesses, and pain accurately.',
          'Give advice using modal verbs and understand medical dosage instructions.',
        ],
        grammarTopics: [
          'The Imperative (du, ihr, Sie forms)',
          'Modal verbs in advice and obligation: sollen & müssen',
          'Reflexive verbs in accusative: sich fühlen, sich freuen, sich anziehen',
          'Subordinate clauses with connector: dass (that)',
        ],
        vocabularyThemes: ['Body Parts & Anatomy', 'Illnesses & Symptoms', 'Pharmacy & Medications', 'Doctor Clinic & Appointments'],
        skillActivities: {
          listening: 'Following phone dialogues booking an appointment with a general practitioner (Hausarzt).',
          speaking: 'Explaining a headache, fever, or sports injury to an emergency clinic doctor.',
          reading: 'Reading medication usage leaflets (Packungsbeilagen) and clinic intake forms.',
          writing: 'Drafting an official sick note email to an employer or university administration.',
        },
        suggestedActivities: ['Doctor-patient roleplay', 'Medication packaging reading exercise', 'Appointment phone simulation'],
      },
      {
        id: 'a2-mod-4',
        moduleNumber: 4,
        title: 'Living Spaces, Two-Way Prepositions & Subordinate Clauses',
        germanTitle: 'Modul 4: Wohnen & Wechselpräpositionen',
        description: 'Apartment hunting, furniture placement, two-way prepositions (Akkusativ vs. Dativ), and subordinate clauses with weil.',
        learningObjectives: [
          'Explain where objects are located and where they are being placed.',
          'Provide reasons for opinions and actions using the subordinate connector weil.',
          'Compare apartments, items, and qualities using comparative and superlative forms.',
        ],
        grammarTopics: [
          'Two-way prepositions (Wechselpräpositionen: an, auf, hinter, in, neben, über, unter, vor, zwischen)',
          'Location vs. Direction: Wo? + Dativ vs. Wohin? + Akkusativ',
          'Position verbs: stehen/stellen, liegen/legen, sitzen/setzen, hängen',
          'Subordinate clauses with weil (verb-final word order)',
          'Comparative and Superlative (gut &rarr; besser &rarr; am besten; viel &rarr; mehr &rarr; am meisten)',
        ],
        vocabularyThemes: ['Apartment & Housing Types', 'Furniture & Interior Design', 'City Quarters & Environment', 'Rental Contracts & Utilities'],
        skillActivities: {
          listening: 'Audio descriptions of furnished apartments and tenant reviews.',
          speaking: 'Giving reasons why you prefer city living over rural living using weil.',
          reading: 'Reading apartment classified ads, rental contracts, and deposit requirements.',
          writing: 'Writing an email responding to a flatshare (WG) listing introducing your habits and background.',
        },
        suggestedActivities: ['Furniture placement visual puzzle', 'Comparative sentence competition', 'Weil-clause grammar lab'],
      },
    ],
    grammarMap: [
      { topic: 'The Dative Case & Pronouns', description: 'Indirect object declension and dative personal pronouns (mir, dir).', moduleRef: 1, level: 'A2' },
      { topic: 'Dative Prepositions', description: 'Fixed prepositions always governing dative: aus, bei, mit, nach, seit, von, zu.', moduleRef: 1, level: 'A2' },
      { topic: 'Conversational Past (Das Perfekt)', description: 'Auxiliary haben/sein selection and past participle forms.', moduleRef: 2, level: 'A2' },
      { topic: 'Modal Past (Präteritum)', description: 'Simple past of modal verbs: musste, konnte, durfte, wollte.', moduleRef: 2, level: 'A2' },
      { topic: 'The Imperative (du, ihr, Sie)', description: 'Command forms and medical instructions.', moduleRef: 3, level: 'A2' },
      { topic: 'Reflexive Verbs', description: 'Verbs requiring reflexive pronouns (sich freuen, sich fühlen).', moduleRef: 3, level: 'A2' },
      { topic: 'Two-Way Prepositions (Wechselpräpositionen)', description: 'Dative for location (Wo?) vs. Accusative for movement (Wohin?).', moduleRef: 4, level: 'A2' },
      { topic: 'Subordinate Clauses with weil & dass', description: 'Conjunctions kicking the conjugated verb to the very end of the clause.', moduleRef: 4, level: 'A2' },
    ],
    vocabularyMap: [
      { theme: 'Travel & Mobility', exampleWords: ['Fahrkarte', 'Gleis', 'Abfahrt', 'Flughafen', 'Gepäck'], moduleRef: 1 },
      { theme: 'Time & Biography', exampleWords: ['Vergangenheit', 'Urlaub', 'Erfahrung', 'Geburtstag', 'Erinnerung'], moduleRef: 2 },
      { theme: 'Health & Well-being', exampleWords: ['Arzt', 'Schmerzen', 'Medikament', 'Rezept', 'Fieber'], moduleRef: 3 },
      { theme: 'Housing & Comparison', exampleWords: ['Miete', 'Wohnung', 'Möbel', 'Nachbar', 'Nebenkosten'], moduleRef: 4 },
    ],
    examPreparation: {
      applicableExams: ['Goethe-Zertifikat A2', 'telc Deutsch A2', 'ÖSD Zertifikat A2'],
      cefrBenchmark: 'CEFR A2 Waystage (Elementary European language competence)',
      examStructure: '4 Modules: Lesen (approx. 30 min), Hören (approx. 30 min), Schreiben (approx. 30 min), Sprechen (paired oral, approx. 15 min).',
      keyStrategies: [
        'Practice connecting sentences with "weil", "denn", and "aber" for the writing module.',
        'Be ready to ask and answer questions about past activities in the paired oral exam.',
        'Train keyword recognition in radio announcements and answer phone messages.',
        'Review two-way prepositions and dative endings thoroughly for the reading portion.',
      ],
      disclaimer: 'D9W German Language Institute is an independent language institute. Official exam registrations and certifications are conducted by accredited testing centers.',
    },
    progression: 'Prepares directly for B1 Intermediate Independence.',
    recommendedNextLevel: 'B1',
  },

  B1: {
    level: 'B1',
    title: 'B1 Intermediate German Independence',
    germanTitle: 'B1 — Selbstständige Sprachverwendung',
    subtitle: 'Threshold Language Competence (CEFR B1)',
    overview:
      'The B1 curriculum represents the watershed threshold of independent language usage. Learners develop the competence to participate unprepared in discussions, express opinions, handle travel across German-speaking countries, understand radio/TV news in standard dialect, and draft structured formal letters (complaints, applications). B1 is the prerequisite for German citizenship, vocational training (Ausbildung), and Studienkolleg.',
    prerequisites: [
      'Completion of CEFR A2 or equivalent elementary German competency',
      'Solid command of Perfekt, dative case, and two-way prepositions',
      'Active vocabulary of approximately 1,200–1,500 words',
    ],
    hoursTotal: 100,
    durationWeeks: 10,
    publishedDate: '2026-11-15',
    learningObjectives: [
      'Understand the main points of clear standard speech on familiar matters regularly encountered in work, school, and leisure.',
      'Deal with most situations likely to arise whilst travelling in German-speaking territories.',
      'Produce straightforward connected text on topics which are familiar or of personal interest.',
      'Describe experiences, events, dreams, hopes, and ambitions and briefly give reasons and explanations for opinions and plans.',
      'Pass all four modules of the official Goethe-Zertifikat B1 / telc B1 examinations.',
    ],
    skillOutcomes: {
      listening: {
        summary: 'Understand the main points of clear standard speech on work, school, and leisure topics, including radio broadcasts.',
        practicalTask: 'Following a 10-minute workplace orientation presentation or a radio interview on vocational apprenticeships.',
        benchmark: 'Can follow clear speech directed at them and catch the main points in broadcasts delivered at normal speed.',
      },
      speaking: {
        summary: 'Enter unprepared into conversations on familiar subjects, express opinions, and justify personal viewpoints.',
        practicalTask: 'Participating in a job interview debate or presenting a 3-minute oral talk on renewable energy.',
        benchmark: 'Can give reasons and explanations for opinions, plans, and actions with reasonable fluency.',
      },
      reading: {
        summary: 'Understand texts consisting mainly of everyday or job-related language and personal correspondence.',
        practicalTask: 'Reading official government notices, workplace safety guidelines, and consumer product reviews.',
        benchmark: 'Can scan longer texts to locate desired information and gather information from different parts of a text.',
      },
      writing: {
        summary: 'Write straightforward connected texts, formal letters of complaint, and motivational statements.',
        practicalTask: 'Drafting an official 150-word letter requesting a contract cancellation or an internship application.',
        benchmark: 'Can write well-structured informal and semi-formal letters adhering to standard German conventions.',
      },
    },
    modules: [
      {
        id: 'b1-mod-1',
        moduleNumber: 1,
        title: 'Work, Careers & The German Workplace',
        germanTitle: 'Modul 1: Beruf, Karriere & Arbeitswelt',
        description: 'Professional German basics, job applications, workplace communications, and comprehensive adjective declensions.',
        learningObjectives: [
          'Draft a German CV (Lebenslauf) and formal cover letter.',
          'Participate in professional workplace discussions and phone calls.',
          'Master adjective declension across all four cases (Nominativ, Akkusativ, Dativ, Genitiv).',
        ],
        grammarTopics: [
          'Adjective Declension with definite articles (weak declension)',
          'Adjective Declension with indefinite articles (mixed declension)',
          'Adjective Declension without articles (strong declension)',
          'Participles used as adjectives (basic intro)',
          'Infinitive with zu (um... zu, ohne... zu, anstatt... zu)',
        ],
        vocabularyThemes: ['Occupations & Qualifications', 'Job Applications & CV', 'Workplace Equipment & Meetings', 'Contracts & Working Hours'],
        skillActivities: {
          listening: 'Listening to workplace meeting recordings and phone inquiries about job requirements.',
          speaking: 'Roleplaying a job interview: answering questions about professional experience and strengths.',
          reading: 'Reading authentic German job postings (Stellenanzeigen) and company policy documents.',
          writing: 'Writing a formal email applying for an internship or job opening.',
        },
        suggestedActivities: ['CV writing workshop', 'Adjective ending quiz sprint', 'Mock job interview in pairs'],
      },
      {
        id: 'b1-mod-2',
        moduleNumber: 2,
        title: 'Opinions, Media & Society',
        germanTitle: 'Modul 2: Medien, Gesellschaft & Meinungen',
        description: 'Discussing contemporary social topics, media usage, environmental questions, and relative clauses.',
        learningObjectives: [
          'Express nuanced opinions and weigh advantages and disadvantages (Vor- und Nachteile).',
          'Formulate complex relative clauses to describe people, objects, and concepts.',
          'Connect thoughts using diverse subordinate conjunctions.',
        ],
        grammarTopics: [
          'Relative clauses in Nominative, Accusative, and Dative (der, die, das / den / dem)',
          'Relative clauses with prepositions (über den, mit dem, für die)',
          'Subordinate conjunctions: obwohl (although), damit (so that), während (while), falls (in case)',
          'Temporal conjunctions: wenn vs. als (repeated vs. one-time past events)',
        ],
        vocabularyThemes: ['Media, Internet & Social Networks', 'Environment, Climate & Nature', 'Society, Politics & Current Affairs', 'Consumerism & Ethics'],
        skillActivities: {
          listening: 'Comprehending a radio debate regarding social media regulations and youth habits.',
          speaking: 'Delivering a 3-minute presentation presenting the pros and cons of car-free city centers.',
          reading: 'Reading editorial articles in German news magazines (Der Spiegel / Zeit Online adapted).',
          writing: 'Writing a 120-word forum post expressing your opinion on environmental protection in daily life.',
        },
        suggestedActivities: ['Structured debate tournament', 'Relative clause dominoes', 'Presentation peer critique'],
      },
      {
        id: 'b1-mod-3',
        moduleNumber: 3,
        title: 'Culture, Travel Narratives & Historical Perspectives',
        germanTitle: 'Modul 3: Kultur, Reisen & Geschichte',
        description: 'Literary and historical narration, cultural heritage across DACH countries, the Präteritum, and the Genitive case.',
        learningObjectives: [
          'Narrate historical events and literary stories using the simple past (Präteritum).',
          'Understand past perfection (Plusquamperfekt) for actions preceding other past events.',
          'Identify and apply the Genitive case and genitive prepositions.',
        ],
        grammarTopics: [
          'Das Präteritum of regular and irregular verbs for written narratives',
          'Das Plusquamperfekt with war/hatte + Partizip II',
          'Temporal sequencing with nachdem (after) + Plusquamperfekt / Perfekt',
          'The Genitive case (des, der, des, der) and noun endings (-s/-es)',
          'Genitive Prepositions: wegen, trotz, während, anstatt',
        ],
        vocabularyThemes: ['History & Cultural Milestones', 'Art, Music & Literature', 'Geography & Regional Traditions in Germany, Austria, Switzerland', 'Travel Accounts & Memoirs'],
        skillActivities: {
          listening: 'Following an audio guide through a German museum or historical monument.',
          speaking: 'Presenting a cultural festival from your home country or a German city you admire.',
          reading: 'Reading short biographical sketches of German historical personalities (Goethe, Einstein, Bauhaus).',
          writing: 'Writing a 150-word report describing a memorable cultural experience or historical visit.',
        },
        suggestedActivities: ['Narrative writing challenge', 'Genitive puzzle matching', 'Audio guide transcription'],
      },
      {
        id: 'b1-mod-4',
        moduleNumber: 4,
        title: 'Hypotheticals, Passive Voice & Official Correspondence',
        germanTitle: 'Modul 4: Konjunktiv II & Das Passiv',
        description: 'Polite requests, dreams, hypothetical scenarios (Konjunktiv II), passive voice basics, and official complaint letters.',
        learningObjectives: [
          'Express hypothetical wishes, unreal conditions, and polite requests with Konjunktiv II.',
          'Understand and use the passive voice (Vorgangspassiv) in official and news contexts.',
          'Compose formal letters according to German DIN standards (complaints, cancellations).',
        ],
        grammarTopics: [
          'Konjunktiv II of auxiliary and modal verbs: wäre, hätte, würde, könnte, müsste, sollte',
          'Hypothetical conditional sentences with wenn + Konjunktiv II',
          'Das Vorgangspassiv (Präsens & Präteritum: wird gemacht / wurde gemacht)',
          'Agent marker in passive voice: von + Dativ vs. durch + Akkusativ',
          'Official letter formatting according to DIN 5008 standards',
        ],
        vocabularyThemes: ['Wishes, Dreams & Ambitions', 'Customer Complaints & Service Issues', 'Official Bureaucracy & Forms', 'Law & Consumer Rights'],
        skillActivities: {
          listening: 'Listening to customer service complaint phone calls and official bureau appointments.',
          speaking: 'Negotiating a solution with a customer representative for a damaged delivery.',
          reading: 'Reading official cancellation policies, consumer contracts, and municipal notices.',
          writing: 'Writing an official 150-word letter of complaint requesting a reimbursement or compensation.',
        },
        suggestedActivities: ['Formal letter writing workshop', 'Hypothetical "What would you do if..." speed dating', 'Passive voice transformation drills'],
      },
    ],
    grammarMap: [
      { topic: 'Adjective Declensions (Weak, Mixed, Strong)', description: 'Mastery of adjective endings across Nominative, Accusative, Dative, and Genitive.', moduleRef: 1, level: 'B1' },
      { topic: 'Infinitive with zu (um... zu, ohne... zu)', description: 'Infinitive clause construction and purposeful connectors.', moduleRef: 1, level: 'B1' },
      { topic: 'Relative Clauses (Relativsätze)', description: 'Embedding descriptive relative clauses in all cases and with prepositions.', moduleRef: 2, level: 'B1' },
      { topic: 'Subordinate Connectors (obwohl, damit, während)', description: 'Complex sentence logic and verb-final positioning.', moduleRef: 2, level: 'B1' },
      { topic: 'Narrative Past (Präteritum & Plusquamperfekt)', description: 'Written storytelling tense and preceding past actions with nachdem.', moduleRef: 3, level: 'B1' },
      { topic: 'The Genitive Case & Prepositions', description: 'Possession markers and prepositions: wegen, trotz, während, anstatt.', moduleRef: 3, level: 'B1' },
      { topic: 'Konjunktiv II (Wishes & Politeness)', description: 'Hypothetical subjunctive forms (wäre, hätte, würde, könnte).', moduleRef: 4, level: 'B1' },
      { topic: 'Passive Voice Basics (Vorgangspassiv)', description: 'Describing processes without an active subject using werden + Partizip II.', moduleRef: 4, level: 'B1' },
    ],
    vocabularyMap: [
      { theme: 'Work & Employment', exampleWords: ['Bewerbung', 'Vorstellungsgespräch', 'Arbeitsvertrag', 'Gehalt', 'Erfahrung'], moduleRef: 1 },
      { theme: 'Media & Environment', exampleWords: ['Nachhaltigkeit', 'Klimawandel', 'Netzwerk', 'Datenschutz', 'Meinung'], moduleRef: 2 },
      { theme: 'Culture & Narrative', exampleWords: ['Tradition', 'Jahrhundert', 'Ereignis', 'Bauwerk', 'Entwicklung'], moduleRef: 3 },
      { theme: 'Formal Bureaucracy', exampleWords: ['Kündigung', 'Reklamation', 'Behörde', 'Forderung', 'Bestätigung'], moduleRef: 4 },
    ],
    examPreparation: {
      applicableExams: ['Goethe-Zertifikat B1', 'telc Deutsch B1 (Zertifikat Deutsch)', 'ÖSD Zertifikat B1', 'DTZ (Deutsch-Test für Zuwanderer)'],
      cefrBenchmark: 'CEFR B1 Threshold (Crucial legal requirement for citizenship and apprenticeship entry)',
      examStructure: '4 Independent Modular Sections: Lesen (65 min), Hören (40 min), Schreiben (60 min), Sprechen (paired presentation and discussion, 15 min).',
      keyStrategies: [
        'Each of the 4 modules can be passed and certified independently in the Goethe/telc framework.',
        'Schreiben Module requires 3 tasks: informal email, forum comment, and formal letter/complaint.',
        'Sprechen Module requires a prepared 3-minute presentation following 5 structural slides.',
        'Time management in the 65-minute reading section is critical; practice skimming and scanning techniques.',
      ],
      disclaimer: 'D9W German Language Institute provides targeted exam preparation. Official examination registration must be made directly with certified testing centers.',
    },
    progression: 'Prepares directly for B2 Upper-Intermediate Professional.',
    recommendedNextLevel: 'B2',
  },

  B2: {
    level: 'B2',
    title: 'B2 Upper-Intermediate Professional German',
    germanTitle: 'B2 — Selbstständige Sprachbeherrschung',
    subtitle: 'Vantage Language Competence (CEFR B2)',
    overview:
      'The B2 curriculum transitions learners into professional and academic fluency. Tailored for international doctors, healthcare personnel, engineers, and university applicants, B2 trains spontaneous interaction, nuanced debate, complex passive structures, past counterfactuals, technical report writing, and critical analysis of contemporary German prose and media.',
    prerequisites: [
      'Completion of CEFR B1 or verified intermediate German language certificate',
      'Solid active grasp of subordinate clauses, adjective declensions, and basic passive voice',
      'Vocabulary bank of approximately 2,500–3,000 words',
    ],
    hoursTotal: 120,
    durationWeeks: 12,
    publishedDate: '2026-11-15',
    learningObjectives: [
      'Understand extended speech and lectures and follow complex lines of argument provided the topic is reasonably familiar.',
      'Interact with a degree of fluency and spontaneity that makes regular interaction with native speakers effortless.',
      'Write clear, detailed text on a wide range of subjects related to your field of interest or profession.',
      'Master the complete German passive system, passive substitutes, and Konjunktiv II in past counterfactuals.',
      'Prepare rigorously for the Goethe-Zertifikat B2, telc Deutsch B2, or TestDaF (TDN 3/4).',
    ],
    skillOutcomes: {
      listening: {
        summary: 'Understand complex technical lectures, panel discussions, and standard television news broadcasts.',
        practicalTask: 'Following an interdisciplinary medical handover or an engineering project retrospective in German.',
        benchmark: 'Can follow extended speech and complex lines of technical argument on contemporary problems.',
      },
      speaking: {
        summary: 'Express opinions spontaneously and fluently, synthesize diverse viewpoints, and defend arguments.',
        practicalTask: 'Presenting a project proposal in a corporate boardroom and responding to critical objections.',
        benchmark: 'Can construct reasoned arguments and evaluate the advantages and disadvantages of alternative strategies.',
      },
      reading: {
        summary: 'Comprehend technical articles, legal contracts, specialized reports, and contemporary literary prose.',
        practicalTask: 'Analyzing clinical trials, labor law statutes, or corporate balance sheet commentaries.',
        benchmark: 'Can read articles and reports concerned with contemporary problems where authors adopt specific stances.',
      },
      writing: {
        summary: 'Compose structured analytical essays, technical reports, and formal business correspondence.',
        practicalTask: 'Writing a 250-word argument essay evaluating artificial intelligence in clinical medicine.',
        benchmark: 'Can write clear, detailed texts synthesizing information and evaluating conflicting viewpoints.',
      },
    },
    modules: [
      {
        id: 'b2-mod-1',
        moduleNumber: 1,
        title: 'Professional Communication & Advanced Passive Systems',
        germanTitle: 'Modul 1: Fachsprache & Passivsysteme',
        description: 'Workplace interactions, technical presentations, the full passive voice system, and passive alternatives.',
        learningObjectives: [
          'Master Vorgangspassiv and Zustandspassiv across all tenses.',
          'Apply modal passive substitutes: lassen sich, sein zu + Infinitiv, -bar/-lich suffixes.',
          'Deliver structured technical presentations using professional transition phrases.',
        ],
        grammarTopics: [
          'Vorgangspassiv across all tenses (Präsens, Präteritum, Perfekt, Plusquamperfekt, Futur I)',
          'Zustandspassiv with sein (Der Bericht ist geschrieben)',
          'Passive substitutes: sein + zu + Infinitiv (Die Aufgabe ist zu lösen)',
          'Passive substitutes: sich lassen + Infinitiv (Das Problem lässt sich beheben)',
          'Adjective suffixes with passive meaning: -bar, -lich, -abel (machbar, verständlich)',
        ],
        vocabularyThemes: ['Corporate Structure & Management', 'Technical Innovations & Systems', 'Quality Assurance & Compliance', 'Project Roadmaps & Metrics'],
        skillActivities: {
          listening: 'Listening to executive meeting debates and engineering sprint reviews.',
          speaking: 'Presenting a workflow optimization proposal using formal transition connectors.',
          reading: 'Analyzing company annual reports and technical implementation specifications.',
          writing: 'Drafting an official incident evaluation report with corrective recommendations.',
        },
        suggestedActivities: ['Passive transformation speed drill', 'Corporate presentation simulation', 'Technical glossary compilation'],
      },
      {
        id: 'b2-mod-2',
        moduleNumber: 2,
        title: 'Society, Media & Counterfactuals (Konjunktiv II)',
        germanTitle: 'Modul 2: Gesellschaft & Konjunktiv II',
        description: 'Socio-political debates, media criticism, hypothetical past counterfactuals, and multi-part connectors.',
        learningObjectives: [
          'Express past counterfactual regrets and hypothetical outcomes (hätte gekonnt / wäre gewesen).',
          'Deploy two-part sentence connectors with stylistic precision.',
          'Lead a constructive debate on public health, housing, or educational policy.',
        ],
        grammarTopics: [
          'Konjunktiv II in the past: hätte / wäre + Partizip II',
          'Konjunktiv II with modal verbs in the past (hätte arbeiten müssen)',
          'Two-part connectors: sowohl... als auch, weder... noch, nicht nur... sondern auch',
          'Correlative comparative: je... desto / je... umso',
          'Concessive clauses with zwar... aber and einerseits... andererseits',
        ],
        vocabularyThemes: ['Societal Trends & Demographic Change', 'Media Ethics & Disinformation', 'Educational Systems & Lifelong Learning', 'Urban Planning & Housing'],
        skillActivities: {
          listening: 'Following a podcast debate on public education reform with multiple opposing speakers.',
          speaking: 'Moderating a panel discussion on ethical dilemmas in technology and medicine.',
          reading: 'Reading in-depth editorial articles from Die Zeit and Frankfurter Allgemeine Zeitung.',
          writing: 'Writing an argumentative essay taking a stance on mandatory remote work legislation.',
        },
        suggestedActivities: ['Past counterfactual crisis analysis', 'Debate moderation workshop', 'Two-part connector puzzle'],
      },
      {
        id: 'b2-mod-3',
        moduleNumber: 3,
        title: 'Science, Healthcare & Nominal Style',
        germanTitle: 'Modul 3: Wissenschaft, Medizin & Nominalstil',
        description: 'Academic registers, clinical case studies, medical documentation, and nominalisation style transformations.',
        learningObjectives: [
          'Transform complex verbal phrases into formal nominal style (Nominalstil).',
          'Understand participial attributes (Partizip I and Partizip II as descriptive adjectives).',
          'Interpret scientific summaries, clinical patient notes, and empirical research graphs.',
        ],
        grammarTopics: [
          'Nominalisation: Converting subordinate clauses into prepositional-noun phrases',
          'Prepositions with Genitive: anlässlich, infolge, mangels, hinsichtlich, zugunsten',
          'Partizip I as adjective (die steigende Tendenz)',
          'Partizip II as adjective (die durchgeführte Studie)',
          'Prepositional verbs with fixed prepositions (abhängen von, beitragen zu, resultieren aus)',
        ],
        vocabularyThemes: ['Clinical Medicine & Patient Care', 'Scientific Research & Methodology', 'Environmental Ecology & Climate Data', 'Empirical Statistics & Data Interpretation'],
        skillActivities: {
          listening: 'Comprehending medical grand rounds recordings and scientific lecture excerpts.',
          speaking: 'Explaining a statistical trend from an empirical chart to a scientific colleague.',
          reading: 'Reading peer-reviewed abstract summaries and German clinical protocol guidelines.',
          writing: 'Writing an academic summary converting an interview transcript into concise nominal style.',
        },
        suggestedActivities: ['Nominalstil transformation workshop', 'Clinical case study presentation', 'Scientific graph interpretation drill'],
      },
      {
        id: 'b2-mod-4',
        moduleNumber: 4,
        title: 'Rhetoric, Argumentation & Academic Writing',
        germanTitle: 'Modul 4: Rhetorik & Akademisches Schreiben',
        description: 'Persuasive argumentation, reported speech introduction (Konjunktiv I), and formal composition structuring.',
        learningObjectives: [
          'Cite third-party statements using indirect reported speech with Konjunktiv I.',
          'Structure a 300-word academic argument essay with thesis, antithesis, and synthesis.',
          'Deploy sophisticated rhetorical devices and transition markers.',
        ],
        grammarTopics: [
          'Introduction to Konjunktiv I for indirect quotations (er behaupte, sie seien)',
          'Substitutes for Konjunktiv I when identical to present tense (Konjunktiv II substitution)',
          'Extended adjective phrases with modifying adverbs',
          'Discourse markers of causality and consequence: folglich, demnach, insofern',
          'Academic paragraph structuring and thesis formulation',
        ],
        vocabularyThemes: ['Rhetorical Discourse & Debate', 'Research Ethics & Citations', 'Public Administration & Law', 'Academic Argumentation Terminology'],
        skillActivities: {
          listening: 'Following university lecture excerpts on German modern history and jurisprudence.',
          speaking: 'Defending an academic paper hypothesis against structured counterarguments.',
          reading: 'Reading legal tribunal summaries and university seminar reader excerpts.',
          writing: 'Composing a full 250-word formal argument essay adhering to Goethe/telc B2 criteria.',
        },
        suggestedActivities: ['Reported speech journalist exercise', 'Timed essay simulation', 'Rhetorical peer review'],
      },
    ],
    grammarMap: [
      { topic: 'The Complete Passive Voice System', description: 'Vorgangspassiv across all 6 tenses and Zustandspassiv with sein.', moduleRef: 1, level: 'B2' },
      { topic: 'Passive Substitutes (sein zu, sich lassen)', description: 'Modal passive alternative structures without werden.', moduleRef: 1, level: 'B2' },
      { topic: 'Past Counterfactuals with Konjunktiv II', description: 'Expressing unreal past events: hätte gemacht / wäre gewesen.', moduleRef: 2, level: 'B2' },
      { topic: 'Two-Part Correlative Connectors', description: 'je... desto, sowohl... als auch, weder... noch, nicht nur... sondern auch.', moduleRef: 2, level: 'B2' },
      { topic: 'Nominalisation Style (Nominalstil)', description: 'Transforming clauses into compact prepositional-noun constructions.', moduleRef: 3, level: 'B2' },
      { topic: 'Participial Attributes (Partizip I & II)', description: 'Adjectival participles describing ongoing and completed processes.', moduleRef: 3, level: 'B2' },
      { topic: 'Indirect Speech (Konjunktiv I Basics)', description: 'Quoting external statements in journalism and academic summaries.', moduleRef: 4, level: 'B2' },
      { topic: 'Discourse Markers & Causality', description: 'Advanced connective markers: folglich, demnach, insofern, infolgedessen.', moduleRef: 4, level: 'B2' },
    ],
    vocabularyMap: [
      { theme: 'Corporate & Engineering', exampleWords: ['Verfahren', 'Maßnahme', 'Optimierung', 'Schnittstelle', 'Implementierung'], moduleRef: 1 },
      { theme: 'Society & Media Politics', exampleWords: ['Wandel', 'Herausforderung', 'Diskurs', 'Polarisierung', 'Kompromiss'], moduleRef: 2 },
      { theme: 'Science & Clinical Medicine', exampleWords: ['Diagnose', 'Symptomatik', 'Erhebung', 'Forschung', 'Wirksamkeit'], moduleRef: 3 },
      { theme: 'Academic Rhetoric', exampleWords: ['These', 'Argumentation', 'Schlussfolgerung', 'Aspekt', 'Perspektive'], moduleRef: 4 },
    ],
    examPreparation: {
      applicableExams: ['Goethe-Zertifikat B2', 'telc Deutsch B2', 'telc Deutsch B2 Medizin / Pflege', 'TestDaF (TDN 3/4)'],
      cefrBenchmark: 'CEFR B2 Vantage (Official threshold for clinical licensure, corporate work, and engineering)',
      examStructure: '4 Sections: Lesen & Sprachbausteine (approx. 90 min), Hören (approx. 40 min), Schreiben (approx. 75 min), Sprechen (approx. 15 min paired debate).',
      keyStrategies: [
        'Master the "Sprachbausteine" section by training fixed prepositional verbs and connectors.',
        'In the writing module, ensure clean three-part structure: Einleitung, Vor-/Nachteile mit Beispielen, eigene Meinung.',
        'In the oral debate, actively invite your partner into the conversation using polite discourse phrases.',
        'Practice recognizing subtle speaker attitude and irony in the audio listening tracks.',
      ],
      disclaimer: 'D9W German Language Institute is an independent language institute. Official examination registration must be made directly with certified testing centers.',
    },
    progression: 'Prepares directly for C1 Advanced Professional Mastery.',
    recommendedNextLevel: 'C1',
  },

  C1: {
    level: 'C1',
    title: 'C1 Advanced German Professional Mastery',
    germanTitle: 'C1 — Fachkundige Sprachkenntnisse',
    subtitle: 'Effective Operational Proficiency (CEFR C1)',
    overview:
      'The C1 curriculum prepares students for unconditional German university degree matriculation, scientific publication, academic research, and executive-level corporate leadership. Students attain effortless spontaneity, idiomatic command, advanced nominal style, reported speech mastery (Konjunktiv I & II), and the ability to appreciate implicit nuances, register shifts, and stylistic irony in demanding literary and scientific discourse.',
    prerequisites: [
      'Completion of CEFR B2 course or verified upper-intermediate German certificate',
      'Fluent active command of complex syntax, passive voice, and participial constructions',
      'Active vocabulary bank of approximately 4,500–5,000 words',
    ],
    hoursTotal: 140,
    durationWeeks: 14,
    publishedDate: '2026-11-15',
    learningObjectives: [
      'Understand a wide range of demanding, longer texts and recognize implicit meaning and subtext.',
      'Express ideas fluently and spontaneously without much obvious searching for expressions.',
      'Use language flexibly and effectively for social, academic, and professional purposes.',
      'Produce clear, well-structured, detailed text on complex subjects, showing controlled use of organizational patterns.',
      'Achieve target scores on Goethe C1, TestDaF (TDN 4/5), or DSH-2/3 for direct university admission.',
    ],
    skillOutcomes: {
      listening: {
        summary: 'Follow extended speech on abstract topics with subtle idiomatic expressions and rapid colloquial register shifts.',
        practicalTask: 'Following university faculty lectures on jurisprudence, philosophy, or specialized biochemistry seminars.',
        benchmark: 'Can understand enough to follow extended speech on abstract and complex topics even when delivered rapidly.',
      },
      speaking: {
        summary: 'Formulate ideas and opinions with precision and relate contributions skillfully to those of other speakers.',
        practicalTask: 'Delivering an academic keynote address and defending research conclusions during a thesis defense.',
        benchmark: 'Can express themselves fluently and spontaneously, almost effortlessly, adapting register and tone.',
      },
      reading: {
        summary: 'Analyze long, complex factual and literary texts, appreciating stylistic distinctions and implicit irony.',
        practicalTask: 'Critically reviewing peer-reviewed academic papers, appellate judicial rulings, and literary essays.',
        benchmark: 'Can understand in detail a wide range of lengthy, complex texts likely to be encountered in academic and professional life.',
      },
      writing: {
        summary: 'Compose sophisticated academic compositions, executive policy papers, and publishable articles.',
        practicalTask: 'Writing an academic literature review or a corporate executive policy recommendation memo.',
        benchmark: 'Can write clear, well-structured texts on complex subjects, underlining the salient issues and expanding with supporting points.',
      },
    },
    modules: [
      {
        id: 'c1-mod-1',
        moduleNumber: 1,
        title: 'Academic Discourse & Extended Participles',
        germanTitle: 'Modul 1: Akademischer Diskurs & Partizipialattribute',
        description: 'Scientific university register, extended participial attributes (erweiterte Partizipien), and nominal style transformations.',
        learningObjectives: [
          'Deconstruct and formulate extended participial attributes common in academic literature.',
          'Transform complex multi-clause sentences into dense nominal scientific style.',
          'Summarize academic research articles with analytical precision.',
        ],
        grammarTopics: [
          'Erweiterte Partizipialattribute (z.B. "die von den Forschenden im Labor sorgfältig analysierte Probe")',
          'Translating extended participles into relative clauses and vice versa',
          'Advanced Nominalstil with genitive chains and prepositional compounds',
          'Nomen-Verb-Verbindungen (Funktionsverbgefüge: zur Verfügung stehen, in Betracht ziehen, Kritik üben)',
        ],
        vocabularyThemes: ['Academic Methodology & Research', 'Epistemology & Theory', 'Higher Education & Faculty Life', 'Scientific Terminology'],
        skillActivities: {
          listening: 'Following university lecture excerpts on constitutional law and scientific ethics.',
          speaking: 'Summarizing an academic monograph chapter and critiquing the methodology.',
          reading: 'Deconstructing academic articles from German scientific journals (Spektrum der Wissenschaft).',
          writing: 'Writing an academic summary converting narrative prose into dense, formal nominal style.',
        },
        suggestedActivities: ['Extended participle breakdown lab', 'Funktionsverbgefüge matching tournament', 'Academic abstract rewriting'],
      },
      {
        id: 'c1-mod-2',
        moduleNumber: 2,
        title: 'Reported Speech & Indirect Discourse (Konjunktiv I)',
        germanTitle: 'Modul 2: Indirekte Rede & Konjunktiv I',
        description: 'Journalistic citations, judicial reporting, complete Konjunktiv I paradigm, and diplomatic registers.',
        learningObjectives: [
          'Quote third-party statements, press releases, and witness testimonies using Konjunktiv I.',
          'Differentiate between confirmed facts, cited claims, and subjective conjectures.',
          'Adopt diplomatic, non-committal, or persuasive registers appropriately.',
        ],
        grammarTopics: [
          'Full Konjunktiv I conjugation across all persons and tenses (Präsens, Perfekt, Futur)',
          'Konjunktiv II substitution rules when Konjunktiv I matches indicative forms',
          'Indirect questions and indirect imperative constructions (er solle / möge tun)',
          'Modal verbs in subjective meaning (er will es getan haben / sie soll krank sein)',
        ],
        vocabularyThemes: ['Journalism & Press Releases', 'Jurisprudence & Legal Proceedings', 'Corporate Governance & Audits', 'Diplomatic Communication'],
        skillActivities: {
          listening: 'Listening to press conference recordings and parliamentary question periods (Bundestag).',
          speaking: 'Conducting a simulated press briefing reporting on an institutional policy update.',
          reading: 'Analyzing judicial rulings and journalistic reports from Der Spiegel and Süddeutsche Zeitung.',
          writing: 'Drafting an official press release reporting on corporate restructuring with strict indirect quotations.',
        },
        suggestedActivities: ['Press conference reporter simulation', 'Subjective modal verb deduction drill', 'Legal document synthesis'],
      },
      {
        id: 'c1-mod-3',
        moduleNumber: 3,
        title: 'Stylistic Nuance, Modal Particles & Idiom',
        germanTitle: 'Modul 3: Stilistik, Modalpartikeln & Idiomatik',
        description: 'Subtle conversational and literary coloring, German modal particles, metaphors, and cultural subtext.',
        learningObjectives: [
          'Use German modal particles (ja, doch, mal, wohl, eben, halt) to modulate tone naturally.',
          'Interpret metaphorical language, cultural idioms, and subtle irony in authentic literature.',
          'Modulate speech between elevated academic, formal business, and colloquial native registers.',
        ],
        grammarTopics: [
          'German modal particles and their pragmatic communicative functions (ja, doch, eben, wohl, bloß)',
          'Sentence rhythm, intonation emphasis, and focus particles (ausgerechnet, sogar, erst)',
          'Idiomatic phraseology and proverbial expressions in executive communication',
          'Stylistic registers: Hochsprache vs. Umgangssprache vs. Fachsprache',
        ],
        vocabularyThemes: ['Literary Prose & Philosophy', 'Cultural Subtext & Irony', 'Idiomatic Expressions & Metaphors', 'Nuanced Rhetorical Devices'],
        skillActivities: {
          listening: 'Listening to theatrical dialogues, podcasts, and subtle literary book reviews.',
          speaking: 'Rephrasing statements across three distinct registers (academic, business formal, colloquial).',
          reading: 'Reading contemporary German literary excerpts (Hermann Hesse, Thomas Mann, modern authors).',
          writing: 'Writing a 250-word literary critique analyzing author tone, metaphor, and subtext.',
        },
        suggestedActivities: ['Modal particle tone adjustment workshop', 'Idiom translation comparison', 'Register modulation roleplay'],
      },
      {
        id: 'c1-mod-4',
        moduleNumber: 4,
        title: 'Advanced Argumentation, Essay & Research Publication',
        germanTitle: 'Modul 4: Forschungsarbeit & Wissenschaftliches Schreiben',
        description: 'Mastery of long-form academic essays, empirical thesis defense, rhetorical eloquence, and TestDaF/DSH exam formats.',
        learningObjectives: [
          'Write a rigorous, 400-word academic argument essay demonstrating sophisticated cohesion.',
          'Deliver an extemporaneous oral defense of a complex research question.',
          'Execute targeted strategies for TestDaF TDN 5, DSH-3, and Goethe C1 examinations.',
        ],
        grammarTopics: [
          'Advanced syntactic cohesion markers: Demgegenüber steht, Daraus lässt sich folgern, Es liegt auf der Hand',
          'Ellipsis and rhetorical sentence inversion for stylistic emphasis',
          'Complex causal, concessive, and consecutive clause hierarchies',
          'Formal argumentation architecture: Einleitung, Forschungsstand, Diskursanalyse, Synthese',
        ],
        vocabularyThemes: ['Research Publications & Monographs', 'Conference Keynotes & Symposiums', 'Doctoral Defenses & Academic Review', 'Executive Strategic Vision'],
        skillActivities: {
          listening: 'Following rapid, unstructured panel debates with multiple overlapping expert speakers.',
          speaking: 'Defending a research thesis for 5 minutes and responding to probing academic counter-questions.',
          reading: 'Critically assessing methodology and sample bias in peer-reviewed scientific literature.',
          writing: 'Writing a full 350-word academic essay meeting Goethe-Zertifikat C1 / TestDaF TDN 5 criteria.',
        },
        suggestedActivities: ['Timed C1 exam simulation', 'Thesis defense simulation with faculty jury', 'Academic peer review workshop'],
      },
    ],
    grammarMap: [
      { topic: 'Extended Participial Attributes', description: 'Deconstructing and constructing complex multi-part participial attributes.', moduleRef: 1, level: 'C1' },
      { topic: 'Noun-Verb Collocations (Funktionsverbgefüge)', description: 'Mastering idiomatic collocations: in Erwägung ziehen, zur Geltung kommen.', moduleRef: 1, level: 'C1' },
      { topic: 'Indirect Speech with Konjunktiv I', description: 'Full paradigm of reported discourse in journalism, law, and academic research.', moduleRef: 2, level: 'C1' },
      { topic: 'Subjective Modal Verbs', description: 'Using modal verbs to express conjecture, hearsay, and claim attribution.', moduleRef: 2, level: 'C1' },
      { topic: 'German Modal Particles (Abtönungspartikeln)', description: 'Subtle tone modulation with ja, doch, wohl, eben, halt, bloß.', moduleRef: 3, level: 'C1' },
      { topic: 'Register & Stylistic Modulation', description: 'Shifting effortlessly between colloquial, professional, and elevated academic German.', moduleRef: 3, level: 'C1' },
      { topic: 'Advanced Syntactic Cohesion Markers', description: 'Cohesive discourse connectives: demnach, insofern, demgegenüber, infolgedessen.', moduleRef: 4, level: 'C1' },
      { topic: 'Rhetorical Inversions & Sentence Architecture', description: 'Stylistic word order variations for rhetorical emphasis and eloquence.', moduleRef: 4, level: 'C1' },
    ],
    vocabularyMap: [
      { theme: 'Academic Epistemology', exampleWords: ['Erkenntnis', 'Methodologie', 'Paradigma', 'Hypothese', 'Diskrepanz'], moduleRef: 1 },
      { theme: 'Jurisprudence & Governance', exampleWords: ['Rechtsprechung', 'Urteil', 'Zeugenaussage', 'Vorschrift', 'Gesetzesentwurf'], moduleRef: 2 },
      { theme: 'Stylistic Expressions', exampleWords: ['Nuance', 'Zweideutigkeit', 'Metapher', 'Subtext', 'Wortschatz'], moduleRef: 3 },
      { theme: 'Research & Strategic Vision', exampleWords: ['Publikation', 'Synthese', 'Implikation', 'Evidenz', 'Schlussfolgerung'], moduleRef: 4 },
    ],
    examPreparation: {
      applicableExams: ['Goethe-Zertifikat C1', 'TestDaF (TDN 4 & 5)', 'DSH-2 / DSH-3', 'telc Deutsch C1 Hochschule'],
      cefrBenchmark: 'CEFR C1 Effective Operational Proficiency (Direct unconditional university admission & executive licensure)',
      examStructure: '4 Sections: Lesen (approx. 70 min), Hören (approx. 40 min), Schreiben (approx. 80 min), Sprechen (individual presentation & paired debate, approx. 15 min).',
      keyStrategies: [
        'TestDaF and DSH require advanced chart/graph descriptions (Grafikbeschreibung) in the writing section.',
        'Master passive substitutes and nominal transformations for the grammar and reading sections.',
        'In the oral examination, formulate spontaneous counter-arguments using diplomatic German phrasing.',
        'Train rapid note-taking during native-speed academic lectures for the listening comprehension test.',
      ],
      disclaimer: 'D9W German Language Institute is an independent language institute. Official examination registration and certification must be conducted with certified university or Goethe/telc test centers.',
    },
    progression: 'Prepares directly for C2 Native Mastery or professional academic publication.',
    recommendedNextLevel: 'C1',
  },
}

export const ALL_SYLLABUS_LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1']

/**
 * Builds a contextual WhatsApp enquiry URL for a specific course syllabus.
 */
export function buildWhatsAppSyllabusEnquiryUrl(syllabus: SyllabusDocument): string {
  const message = [
    'Hello D9W Team,',
    '',
    `I am reviewing the official syllabus for the ${syllabus.level} German course (${syllabus.title}).`,
    '',
    `Level: ${syllabus.level} (${syllabus.subtitle})`,
    `Curriculum: ${syllabus.modules.length} Modules • ${syllabus.hoursTotal} Teaching Hours`,
    '',
    'Could you please share details regarding upcoming batch schedules, admissions, and course consultation?',
    '',
    'Thank you.',
  ].join('\n')

  return `https://wa.me/${D9W_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Generates the standardized official PDF download filename.
 */
export function getSyllabusPdfFilename(level: CefrLevel): string {
  return `D9W-German-Syllabus-${level.toUpperCase()}.pdf`
}
