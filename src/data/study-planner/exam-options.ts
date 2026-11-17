import { CefrLevel } from '@/types'

export type ExamProviderId =
  | 'Goethe-Zertifikat'
  | 'telc Deutsch'
  | 'TestDaF'
  | 'DSH'
  | 'General German'

export interface ExamModuleInfo {
  name: string
  germanName: string
  durationMinutes: number
  description: string
}

export interface ExamProviderOption {
  id: ExamProviderId
  name: string
  fullName: string
  organization: string
  supportedLevels: CefrLevel[]
  description: string
  typicalFormat: {
    modules: ExamModuleInfo[]
    totalMinutes: number
    passingCriteria: string
  }
  disclaimer: string
}

export const EXAM_PROVIDER_OPTIONS: ExamProviderOption[] = [
  {
    id: 'Goethe-Zertifikat',
    name: 'Goethe-Zertifikat',
    fullName: 'Goethe-Zertifikat (A1–C1)',
    organization: 'Goethe-Institut e.V.',
    supportedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    description:
      'The internationally recognized German language certificate from the Goethe-Institut, accepted globally for visa, university, and employment purposes.',
    typicalFormat: {
      modules: [
        { name: 'Reading', germanName: 'Lesen', durationMinutes: 65, description: '5 parts: blog posts, news, notices, opinions' },
        { name: 'Listening', germanName: 'Hören', durationMinutes: 40, description: '4 parts: announcements, informal dialogues, presentations' },
        { name: 'Writing', germanName: 'Schreiben', durationMinutes: 60, description: '3 parts: personal email, opinion post, formal message' },
        { name: 'Speaking', germanName: 'Sprechen', durationMinutes: 15, description: '3 parts: presentation, discussion, joint planning' },
      ],
      totalMinutes: 180,
      passingCriteria: 'Minimum 60% (60/100 points) in each module or overall according to exam level regulations.',
    },
    disclaimer:
      'D9W German Language Institute is an independent educational preparatory service and is not affiliated with, endorsed by, or an accredited testing center of Goethe-Institut e.V.',
  },
  {
    id: 'telc Deutsch',
    name: 'telc Deutsch',
    fullName: 'telc Deutsch (The European Language Certificates)',
    organization: 'telc gGmbH',
    supportedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    description:
      'Widely accepted standardized language certificates across Germany and Europe, frequently chosen for citizenship (B1) and vocational/academic recognition (B2/C1 Hochschule).',
    typicalFormat: {
      modules: [
        { name: 'Reading & Language Elements', germanName: 'Lesen & Sprachbausteine', durationMinutes: 90, description: 'Texts and grammar/vocabulary cloze tests' },
        { name: 'Listening', germanName: 'Hören', durationMinutes: 30, description: 'Short messages, announcements, interviews' },
        { name: 'Writing', germanName: 'Schreiben', durationMinutes: 30, description: 'Semi-formal or formal letter / email' },
        { name: 'Speaking', germanName: 'Sprechen', durationMinutes: 15, description: 'Introduction, picture prompt, discussion' },
      ],
      totalMinutes: 165,
      passingCriteria: 'Minimum 60% in both written and oral examinations.',
    },
    disclaimer:
      'D9W is an independent preparatory platform and is not affiliated with, endorsed by, or accredited by telc gGmbH.',
  },
  {
    id: 'TestDaF',
    name: 'TestDaF',
    fullName: 'Test Deutsch als Fremdsprache',
    organization: 'TestDaF-Institut / g.a.s.t. e.V.',
    supportedLevels: ['B2', 'C1'],
    description:
      'High-stakes standardized language test for international students seeking university admission in Germany. Results are graded in TestDaF-Niveaustufen (TDN 3, 4, 5).',
    typicalFormat: {
      modules: [
        { name: 'Reading', germanName: 'Leseverstehen', durationMinutes: 60, description: '3 academic texts: university life, science magazine, research paper' },
        { name: 'Listening', germanName: 'Hörverstehen', durationMinutes: 40, description: '3 audio texts: campus dialogue, radio report, lecture excerpt' },
        { name: 'Writing', germanName: 'Schriftlicher Ausdruck', durationMinutes: 60, description: 'Data/chart description and structured argumentation' },
        { name: 'Speaking', germanName: 'Mündlicher Ausdruck', durationMinutes: 35, description: '7 computer-recorded spoken scenarios' },
      ],
      totalMinutes: 195,
      passingCriteria: 'Most German universities require TDN 4 in all 4 examination sections (corresponds to solid B2.2–C1.1).',
    },
    disclaimer:
      'TestDaF is a registered trademark of g.a.s.t. e.V. D9W provides independent curriculum preparation only.',
  },
  {
    id: 'DSH',
    name: 'DSH',
    fullName: 'Deutsche Sprachprüfung für den Hochschulzugang',
    organization: 'German Universities (HRK-governed framework)',
    supportedLevels: ['B2', 'C1'],
    description:
      'Administered directly by individual German universities for incoming degree students. Graded as DSH-1 (>=57%), DSH-2 (>=67%), or DSH-3 (>=82%).',
    typicalFormat: {
      modules: [
        { name: 'Listening & Comprehension', germanName: 'Hörverstehen', durationMinutes: 80, description: 'Academic lecture with note-taking and structured questions' },
        { name: 'Reading & Scientific Language', germanName: 'Leseverstehen & Wiss. Strukturen', durationMinutes: 90, description: 'Academic text comprehension and grammar transformation' },
        { name: 'Text Production', germanName: 'Textproduktion', durationMinutes: 70, description: 'Guided scientific essay with graphic interpretation' },
        { name: 'Oral Exam', germanName: 'Mündliche Prüfung', durationMinutes: 20, description: 'Presentation and discussion of a short technical text/graphic' },
      ],
      totalMinutes: 260,
      passingCriteria: 'DSH-2 (minimum 67% overall) is standard admission requirement at most German public universities.',
    },
    disclaimer:
      'DSH exams are created and evaluated independently by individual universities. D9W provides general academic preparation.',
  },
  {
    id: 'General German',
    name: 'General German Learning',
    fullName: 'General Competency (No Specific Exam)',
    organization: 'CEFR Framework (Council of Europe)',
    supportedLevels: ['A1', 'A2', 'B1', 'B2', 'C1'],
    description:
      'Focus on practical communicative competence, workplace fluency, and cultural integration without the stress of an immediate exam deadline.',
    typicalFormat: {
      modules: [
        { name: 'Practical Listening', germanName: 'Hörverstehen im Alltag', durationMinutes: 30, description: 'Podcasts, videos, everyday conversations' },
        { name: 'Applied Reading', germanName: 'Lesen & Medien', durationMinutes: 30, description: 'Articles, books, professional emails' },
        { name: 'Active Speaking', germanName: 'Freies Sprechen', durationMinutes: 30, description: 'Monologues, shadowing, conversation' },
        { name: 'Grammar & Writing', germanName: 'Grammatik & Schreiben', durationMinutes: 30, description: 'Accuracy, sentence structure, correspondence' },
      ],
      totalMinutes: 120,
      passingCriteria: 'Self-paced milestone progression based on CEFR Can-Do descriptors.',
    },
    disclaimer:
      'Flexible goal tracks focus on real-world communicative proficiency and ongoing fluency development.',
  },
]
