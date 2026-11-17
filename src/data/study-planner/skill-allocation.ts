export type CoreSkill = 'listening' | 'reading' | 'writing' | 'speaking'
export type SupplementarySkill = 'grammar' | 'vocabulary'
export type AllSkills = CoreSkill | SupplementarySkill

export interface SkillWeight {
  skill: AllSkills
  name: string
  germanName: string
  percentage: number // 0-100
  isWeak?: boolean
  isStrong?: boolean
  isPriority?: boolean
}

export interface SkillAllocationInput {
  strongestSkill: CoreSkill
  weakestSkill: CoreSkill
  additionalAttentionSkills: CoreSkill[]
  includeGrammar: boolean
  includeVocabulary: boolean
  customWeights?: Partial<Record<AllSkills, number>>
}

export const BASELINE_WEIGHTS: Record<AllSkills, number> = {
  listening: 22,
  reading: 22,
  writing: 18,
  speaking: 18,
  grammar: 10,
  vocabulary: 10,
}

export const SKILL_METADATA: Record<
  AllSkills,
  { name: string; germanName: string; icon: string; color: string }
> = {
  listening: {
    name: 'Listening',
    germanName: 'Hörverstehen',
    icon: 'Headphones',
    color: '#1E3A8A', // Prussian Blue
  },
  reading: {
    name: 'Reading',
    germanName: 'Leseverstehen',
    icon: 'FileText',
    color: '#15803D', // Forest Green
  },
  writing: {
    name: 'Writing',
    germanName: 'Schriftlicher Ausdruck',
    icon: 'PenTool',
    color: '#854D0E', // Bronze / Amber
  },
  speaking: {
    name: 'Speaking',
    germanName: 'Mündlicher Ausdruck',
    icon: 'Volume2',
    color: '#C83B32', // German Red
  },
  grammar: {
    name: 'Grammar',
    germanName: 'Grammatik',
    icon: 'Languages',
    color: '#475569', // Slate
  },
  vocabulary: {
    name: 'Vocabulary',
    germanName: 'Wortschatz',
    icon: 'BookOpen',
    color: '#D7B95D', // Gold
  },
}

/**
 * Computes normalized percentage weights for all active skills based on user preferences.
 */
export function calculateSkillAllocation(input: SkillAllocationInput): Record<AllSkills, number> {
  if (input.customWeights) {
    const raw: Record<AllSkills, number> = {
      listening: input.customWeights.listening ?? BASELINE_WEIGHTS.listening,
      reading: input.customWeights.reading ?? BASELINE_WEIGHTS.reading,
      writing: input.customWeights.writing ?? BASELINE_WEIGHTS.writing,
      speaking: input.customWeights.speaking ?? BASELINE_WEIGHTS.speaking,
      grammar: input.includeGrammar ? (input.customWeights.grammar ?? BASELINE_WEIGHTS.grammar) : 0,
      vocabulary: input.includeVocabulary ? (input.customWeights.vocabulary ?? BASELINE_WEIGHTS.vocabulary) : 0,
    }
    return normalizeWeights(raw)
  }

  // Raw weight scoring
  const scores: Record<AllSkills, number> = {
    listening: BASELINE_WEIGHTS.listening,
    reading: BASELINE_WEIGHTS.reading,
    writing: BASELINE_WEIGHTS.writing,
    speaking: BASELINE_WEIGHTS.speaking,
    grammar: input.includeGrammar ? BASELINE_WEIGHTS.grammar : 0,
    vocabulary: input.includeVocabulary ? BASELINE_WEIGHTS.vocabulary : 0,
  }

  // 1. Weakest skill boost: +40%
  if (scores[input.weakestSkill] !== undefined) {
    scores[input.weakestSkill] *= 1.4
  }

  // 2. Additional attention skills: +20%
  for (const skill of input.additionalAttentionSkills) {
    if (skill !== input.weakestSkill && scores[skill] !== undefined) {
      scores[skill] *= 1.2
    }
  }

  // 3. Strongest skill: slight reduction (-20%), but maintaining reasonable floor
  if (scores[input.strongestSkill] !== undefined && input.strongestSkill !== input.weakestSkill) {
    scores[input.strongestSkill] *= 0.8
  }

  return normalizeWeights(scores)
}

/**
 * Helper to normalize weights to sum exactly to 100 with minimum floors
 */
function normalizeWeights(raw: Record<AllSkills, number>): Record<AllSkills, number> {
  const activeKeys = (Object.keys(raw) as AllSkills[]).filter((k) => raw[k] > 0)
  if (activeKeys.length === 0) {
    return { ...BASELINE_WEIGHTS }
  }

  const rawSum = activeKeys.reduce((acc, k) => acc + raw[k], 0)
  const normalized: Record<AllSkills, number> = {
    listening: 0,
    reading: 0,
    writing: 0,
    speaking: 0,
    grammar: 0,
    vocabulary: 0,
  }

  let totalAllocated = 0
  activeKeys.forEach((key) => {
    // Round to nearest integer percentage
    const rounded = Math.max(
      key === 'grammar' || key === 'vocabulary' ? 5 : 12, // Ensure core skills have minimum 12%
      Math.round((raw[key] / rawSum) * 100)
    )
    normalized[key] = rounded
    totalAllocated += rounded
  })

  // Rebalance discrepancy due to rounding to equal 100
  let diff = 100 - totalAllocated
  if (diff !== 0) {
    // Adjust largest or smallest active key
    const primaryKey = activeKeys[0]
    normalized[primaryKey] = Math.max(5, normalized[primaryKey] + diff)
  }

  return normalized
}
