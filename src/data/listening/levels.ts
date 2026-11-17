import { CefrLevel } from '@/types'
import { CEFRLevelInfo } from '@/features/listening/types/listening.types'

export const CEFR_LISTENING_LEVELS: Record<CefrLevel, CEFRLevelInfo> = {
  A1: {
    level: 'A1',
    name: 'Beginner',
    subtitle: 'Grundstufe 1 (Breakthrough)',
    description:
      'Short, distinct spoken German with familiar words and basic phrases concerning oneself, family, and immediate concrete surroundings.',
    difficulty: 'easy',
    exerciseCount: 8,
    targetDurationMinutes: 25,
    skillsFocus: ['Alphabet & numbers', 'Introductions', 'Supermarket prices', 'Train arrival times'],
    recommendedSpeed: '0.75x–1.0x',
  },
  A2: {
    level: 'A2',
    name: 'Elementary',
    subtitle: 'Grundstufe 2 (Waystage)',
    description:
      'Phrases and high-frequency vocabulary related to areas of most immediate personal relevance (shopping, local geography, employment, routine directions).',
    difficulty: 'easy',
    exerciseCount: 8,
    targetDurationMinutes: 35,
    skillsFocus: ['Directions in town', 'Doctor appointments', 'Routine weather forecasts', 'Short voicemail messages'],
    recommendedSpeed: '0.75x–1.0x',
  },
  B1: {
    level: 'B1',
    name: 'Intermediate',
    subtitle: 'Mittelstufe 1 (Threshold)',
    description:
      'Main points of clear standard speech on familiar matters regularly encountered in work, school, and leisure, including short radio reports and narratives.',
    difficulty: 'medium',
    exerciseCount: 8,
    targetDurationMinutes: 45,
    skillsFocus: ['Workplace discussions', 'Travel itineraries', 'Radio interviews', 'Multi-speaker problem solving'],
    recommendedSpeed: '1.0x',
  },
  B2: {
    level: 'B2',
    name: 'Upper Intermediate',
    subtitle: 'Mittelstufe 2 (Vantage)',
    description:
      'Extended speech and lectures, complex lines of argument provided the topic is reasonably familiar, and standard television news and current affairs broadcasts.',
    difficulty: 'hard',
    exerciseCount: 6,
    targetDurationMinutes: 50,
    skillsFocus: ['Complex debates', 'Panel discussions', 'Formal presentations', 'Nuanced point of view'],
    recommendedSpeed: '1.0x–1.25x',
  },
  C1: {
    level: 'C1',
    name: 'Advanced',
    subtitle: 'Oberstufe 1 (Effective Operational Proficiency)',
    description:
      'Extended speech even when not clearly structured and when relationships are only implied. Television programmes and films without too much effort.',
    difficulty: 'hard',
    exerciseCount: 6,
    targetDurationMinutes: 60,
    skillsFocus: ['Academic lectures', 'Cultural discourse', 'Spoken idiomatic nuances', 'Rapid colloquial registers'],
    recommendedSpeed: '1.0x–1.25x',
  },
}

export const ALL_LISTENING_LEVELS: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1']
