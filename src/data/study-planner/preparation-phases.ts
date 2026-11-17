export type PreparationPhaseId =
  | 'foundation'
  | 'development'
  | 'practice'
  | 'revision'
  | 'final'

export interface PhaseDefinition {
  id: PreparationPhaseId
  title: string
  germanTitle: string
  description: string
  focusAreas: string[]
  recommendedTaskEmphasis: {
    skillWeightAdjustment: Record<string, number> // multiplier for certain tasks
  }
}

export const PREPARATION_PHASES: Record<PreparationPhaseId, PhaseDefinition> = {
  foundation: {
    id: 'foundation',
    title: 'Foundation Building',
    germanTitle: 'Fundament & Basiswissen',
    description:
      'Consolidate core grammar rules, essential vocabulary, and phonetics required for the target CEFR level.',
    focusAreas: [
      'Core grammatical cases, verb tenses, and sentence connectors',
      'High-frequency vocabulary building with Wort des Tages',
      'Sentence structure discipline (V2, TeKaMoLo, subordinate clauses)',
      'Initial diagnostic self-checks',
    ],
    recommendedTaskEmphasis: {
      skillWeightAdjustment: {
        grammar: 1.4,
        vocabulary: 1.3,
        listening: 0.9,
        reading: 0.9,
        writing: 0.8,
        speaking: 0.7,
      },
    },
  },
  development: {
    id: 'development',
    title: 'Skill Development',
    germanTitle: 'Kompetenzaufbau',
    description:
      'Systematically build fluency across listening, reading, writing, and speaking with authentic materials.',
    focusAreas: [
      'Authentic listening comprehension passages at target speed',
      'Editorial reading texts with vocabulary building',
      'Structured text production (emails, blog responses, opinion texts)',
      'Oral shadowing and spontaneous speaking prompts',
    ],
    recommendedTaskEmphasis: {
      skillWeightAdjustment: {
        grammar: 1.0,
        vocabulary: 1.0,
        listening: 1.1,
        reading: 1.1,
        writing: 1.0,
        speaking: 1.0,
      },
    },
  },
  practice: {
    id: 'practice',
    title: 'Focused Practice',
    germanTitle: 'Gezielte Prüfungspraxis',
    description:
      'Master the specific task formats, timing constraints, and Redemittel of your target exam format.',
    focusAreas: [
      'Timed reading and listening section exercises',
      'Standardized Redemittel for oral presentations and discussions',
      'Argumentative writing structures under realistic time limits',
      'First section-specific mini-mock assessments',
    ],
    recommendedTaskEmphasis: {
      skillWeightAdjustment: {
        grammar: 0.8,
        vocabulary: 0.9,
        listening: 1.2,
        reading: 1.2,
        writing: 1.2,
        speaking: 1.2,
      },
    },
  },
  revision: {
    id: 'revision',
    title: 'Revision & Mock Examinations',
    germanTitle: 'Vertiefung & Modellprüfungen',
    description:
      'Full simulated practice examinations, deep error analysis, and targeted remediation of persistent weak spots.',
    focusAreas: [
      'Complete full-length mock examinations under exam conditions',
      'Rigorous error analysis and targeted grammar remediation',
      'Speaking fluency under timed exam conditions',
      'Refining writing coherence and connector variety',
    ],
    recommendedTaskEmphasis: {
      skillWeightAdjustment: {
        grammar: 0.9,
        vocabulary: 0.9,
        listening: 1.1,
        reading: 1.1,
        writing: 1.2,
        speaking: 1.2,
      },
    },
  },
  final: {
    id: 'final',
    title: 'Final Preparation & Mental Readiness',
    germanTitle: 'Endspurt & Prüfungstag-Check',
    description:
      'Light revision, key phrase memorization, stress management, and physical rest prior to the examination.',
    focusAreas: [
      'Review personal error log and high-value Redemittel cheat-sheets',
      'Light listening and speaking warm-ups without exhausting energy',
      'Logistical checklist for exam day (ID, confirmation, pens, transit)',
      'Rest and mental focus 24–48 hours before testing',
    ],
    recommendedTaskEmphasis: {
      skillWeightAdjustment: {
        grammar: 0.8,
        vocabulary: 1.0,
        listening: 0.9,
        reading: 0.8,
        writing: 0.6,
        speaking: 0.8,
      },
    },
  },
}

/**
 * Calculates phase distribution based on total preparation duration in days.
 */
export function calculatePhaseBoundaries(
  startDateStr: string,
  totalDays: number
): { phase: PreparationPhaseId; name: string; startDate: string; endDate: string; description: string }[] {
  const start = new Date(startDateStr + 'T00:00:00')

  // Helper to add days and format YYYY-MM-DD
  const addDays = (d: Date, n: number) => {
    const res = new Date(d)
    res.setDate(res.getDate() + n)
    return res.toISOString().split('T')[0]
  }

  // Handle very short preparation windows (< 14 days)
  if (totalDays <= 14) {
    const fDays = Math.max(2, Math.floor(totalDays * 0.3))
    const pDays = Math.max(2, Math.floor(totalDays * 0.4))

    const d0 = startDateStr
    const d1 = addDays(start, fDays - 1)
    const d2 = addDays(start, fDays)
    const d3 = addDays(start, fDays + pDays - 1)
    const d4 = addDays(start, fDays + pDays)
    const d5 = addDays(start, totalDays - 1)

    return [
      {
        phase: 'foundation',
        name: PREPARATION_PHASES.foundation.germanTitle,
        startDate: d0,
        endDate: d1,
        description: 'Compressed review of high-frequency grammar rules and essential vocabulary.',
      },
      {
        phase: 'practice',
        name: PREPARATION_PHASES.practice.germanTitle,
        startDate: d2,
        endDate: d3,
        description: 'Intensive practice of exam task formats and key Redemittel.',
      },
      {
        phase: 'final',
        name: PREPARATION_PHASES.final.germanTitle,
        startDate: d4,
        endDate: d5,
        description: 'Targeted error review and exam-day logistics preparation.',
      },
    ]
  }

  // Standard 5-phase distribution for regular periods
  // Foundation: 25%, Development: 35%, Practice: 20%, Revision: 12%, Final: 8%
  const fDays = Math.max(3, Math.round(totalDays * 0.25))
  const devDays = Math.max(4, Math.round(totalDays * 0.35))
  const pracDays = Math.max(3, Math.round(totalDays * 0.20))
  const revDays = Math.max(2, Math.round(totalDays * 0.12))
  const finalDays = Math.max(2, totalDays - fDays - devDays - pracDays - revDays)

  let cursor = new Date(start)

  const phases: { phase: PreparationPhaseId; name: string; startDate: string; endDate: string; description: string }[] = []

  const list: { id: PreparationPhaseId; days: number }[] = [
    { id: 'foundation', days: fDays },
    { id: 'development', days: devDays },
    { id: 'practice', days: pracDays },
    { id: 'revision', days: revDays },
    { id: 'final', days: finalDays },
  ]

  for (const item of list) {
    const pStartStr = cursor.toISOString().split('T')[0]
    cursor.setDate(cursor.getDate() + item.days - 1)
    const pEndStr = cursor.toISOString().split('T')[0]
    cursor.setDate(cursor.getDate() + 1)

    phases.push({
      phase: item.id,
      name: PREPARATION_PHASES[item.id].germanTitle,
      startDate: pStartStr,
      endDate: pEndStr,
      description: PREPARATION_PHASES[item.id].description,
    })
  }

  return phases
}
