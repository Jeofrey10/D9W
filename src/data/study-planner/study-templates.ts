import { CefrLevel } from '@/types'
import { ExamProviderId } from './exam-options'
import { CoreSkill } from './skill-allocation'

export interface StudyArchetypeTemplate {
  id: string
  name: string
  germanName: string
  tagline: string
  description: string
  defaultCurrentLevel: CefrLevel
  defaultTargetLevel: CefrLevel
  defaultProvider: ExamProviderId
  suggestedDays: number[] // 1=Mon, ..., 7=Sun (or 0=Sun, 1=Mon)
  suggestedMinutes: number
  intensity: 'relaxed' | 'balanced' | 'intensive'
  weakestSkill: CoreSkill
  strongestSkill: CoreSkill
  includeGrammar: boolean
  includeVocabulary: boolean
}

export const STUDY_ARCHETYPE_TEMPLATES: StudyArchetypeTemplate[] = [
  {
    id: 'archetype-professional',
    name: 'Working Professional Evening Learner',
    germanName: 'Berufstätige(r) am Feierabend',
    tagline: '30–45 min/day • 5 days/week • Balanced progression',
    description:
      'Designed for individuals balancing full-time employment with evening German study. Focuses on consistency and high-yield communication.',
    defaultCurrentLevel: 'A2',
    defaultTargetLevel: 'B1',
    defaultProvider: 'Goethe-Zertifikat',
    suggestedDays: [1, 2, 3, 4, 6], // Mon, Tue, Wed, Thu, Sat
    suggestedMinutes: 35,
    intensity: 'balanced',
    weakestSkill: 'speaking',
    strongestSkill: 'reading',
    includeGrammar: true,
    includeVocabulary: true,
  },
  {
    id: 'archetype-university',
    name: 'University Applicant Fast-Track',
    germanName: 'Studienbewerber Intensivkurs',
    tagline: '60–90 min/day • 6 days/week • Intensive academic focus',
    description:
      'For international applicants preparing for TestDaF, DSH, or telc C1 Hochschule. Emphasizes academic reading, lecture comprehension, and scientific text production.',
    defaultCurrentLevel: 'B1',
    defaultTargetLevel: 'B2',
    defaultProvider: 'TestDaF',
    suggestedDays: [1, 2, 3, 4, 5, 6], // Mon-Sat
    suggestedMinutes: 60,
    intensity: 'intensive',
    weakestSkill: 'writing',
    strongestSkill: 'listening',
    includeGrammar: true,
    includeVocabulary: true,
  },
  {
    id: 'archetype-steady-daily',
    name: 'Steady Daily Routine',
    germanName: 'Tägliche Lernroutine',
    tagline: '20–25 min/day • 7 days/week • Habit building',
    description:
      'Short, bite-sized daily sessions designed to build an unbreakable German learning streak without cognitive exhaustion.',
    defaultCurrentLevel: 'A1',
    defaultTargetLevel: 'A2',
    defaultProvider: 'General German',
    suggestedDays: [0, 1, 2, 3, 4, 5, 6], // Every day
    suggestedMinutes: 25,
    intensity: 'relaxed',
    weakestSkill: 'speaking',
    strongestSkill: 'reading',
    includeGrammar: true,
    includeVocabulary: true,
  },
  {
    id: 'archetype-weekend-scholar',
    name: 'Weekend Dedicated Scholar',
    germanName: 'Wochenend-Schwerpunkt',
    tagline: '60 min/day • Fri–Sun • Focused deep work',
    description:
      'Ideal for those with busy weekday schedules who prefer deep, uninterrupted study blocks on Friday evenings and weekends.',
    defaultCurrentLevel: 'A2',
    defaultTargetLevel: 'B1',
    defaultProvider: 'telc Deutsch',
    suggestedDays: [5, 6, 0], // Fri, Sat, Sun
    suggestedMinutes: 60,
    intensity: 'balanced',
    weakestSkill: 'listening',
    strongestSkill: 'reading',
    includeGrammar: true,
    includeVocabulary: true,
  },
]
