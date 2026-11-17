import { CourseSummary } from '@/types'

export const COURSES_DATA: CourseSummary[] = [
  {
    id: 'a1',
    level: 'A1',
    title: 'A1: Beginner Foundation',
    subtitle: 'Absolute beginners & foundational German communication',
    targetAudience: 'Students with zero prior German knowledge targeting travel, study, or family reunion visas.',
    description:
      'Master essential phonetics, daily greetings, basic vocabulary (articles, numbers, everyday nouns), and simple present-tense sentences according to the official Goethe-Zertifikat A1 exam framework.',
    durationWeeks: 8,
    hoursTotal: 80,
    examTarget: 'Goethe-Zertifikat A1 / Start Deutsch 1',
    highlights: [
      'Pronunciation and phonetic clarity',
      'Definite and indefinite articles (der, die, das)',
      'Basic everyday dialogues and self-introductions',
      'Beginner reading comprehension & listening exercises',
    ],
    mode: 'Hybrid',
  },
  {
    id: 'a2',
    level: 'A2',
    title: 'A2: Elementary German',
    subtitle: 'Daily routine, social interactions & past tense structures',
    targetAudience: 'Learners who completed A1 wanting to engage in routine social and workplace situations.',
    description:
      'Expand conversational fluency with modal verbs, accusative/dative cases, separable verbs, and conversational past (Perfekt). Prepares candidates for the Goethe-Zertifikat A2.',
    durationWeeks: 8,
    hoursTotal: 80,
    examTarget: 'Goethe-Zertifikat A2 / telc Deutsch A2',
    highlights: [
      'Two-way prepositions (Wechselpräpositionen)',
      'Narrating past events using Perfekt and Präteritum',
      'Shopping, public transport, directions and appointments',
      'Structured informal emails and messages',
    ],
    mode: 'Hybrid',
  },
  {
    id: 'b1',
    level: 'B1',
    title: 'B1: Intermediate Independence',
    subtitle: 'Independent communication, travel & employment foundation',
    targetAudience: 'Intermediate learners seeking German citizenship, Studienkolleg entry, or vocational apprenticeship (Ausbildung).',
    description:
      'Attain independent language competence. Discuss opinions, professional aspirations, abstract topics, subordinate clauses (weil, dass, obwohl), and pass the official 4-module B1 examination.',
    durationWeeks: 10,
    hoursTotal: 100,
    examTarget: 'Goethe-Zertifikat B1 / telc Deutsch B1 / ÖSD B1',
    highlights: [
      'Subordinate clauses and complex sentence connectors',
      'Adjective declensions across all four cases',
      'Writing formal letters, complaints, and applications',
      'Active oral debate and presentation techniques',
    ],
    mode: 'Hybrid',
  },
  {
    id: 'b2',
    level: 'B2',
    title: 'B2: Upper-Intermediate Professional',
    subtitle: 'Advanced academic, healthcare & career German',
    targetAudience: 'Doctors, engineers, nurses, and university applicants needing professional-level working proficiency.',
    description:
      'Achieve advanced German fluency required in German hospitals, engineering firms, and universities. Master passive voice, subjunctive II (Konjunktiv II), and nuanced idiomatic discourse.',
    durationWeeks: 12,
    hoursTotal: 120,
    examTarget: 'Goethe-Zertifikat B2 / telc Deutsch B2 / TestDaF (TDN 3/4)',
    highlights: [
      'Passive voice and passive substitutes',
      'Hypothetical and polite speech (Konjunktiv II)',
      'Complex academic and technical texts',
      'Spontaneous fluent debate on contemporary topics',
    ],
    mode: 'Hybrid',
  },
  {
    id: 'c1',
    level: 'C1',
    title: 'C1: Advanced Professional Mastery',
    subtitle: 'Academic university admission & high-level fluency',
    targetAudience: 'Direct university degree matriculation, academic research, and executive-level corporate communication.',
    description:
      'Express ideas fluently and spontaneously without searching for words. Comprehend demanding long texts, recognize implicit meanings, and write clear, well-structured scientific compositions.',
    durationWeeks: 14,
    hoursTotal: 140,
    examTarget: 'Goethe-Zertifikat C1 / TestDaF (TDN 4/5) / DSH-2/3',
    highlights: [
      'Reported speech (Konjunktiv I) & scientific registers',
      'Nominalization style (Nominalstil)',
      'In-depth rhetorical arguments and academic essays',
      'Native-speed listening and specialized lectures',
    ],
    mode: 'Hybrid',
  },
]
