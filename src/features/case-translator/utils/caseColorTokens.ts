import { GrammaticalCase } from '../types/caseTranslator.types'

export interface CaseColorConfig {
  caseName: GrammaticalCase
  displayName: string
  badgeClass: string
  textClass: string
  bgLightClass: string
  borderClass: string
  dotClass: string
  pillBorder: string
  hex: string
}

export const CASE_COLOR_TOKENS: Record<GrammaticalCase, CaseColorConfig> = {
  Nominativ: {
    caseName: 'Nominativ',
    displayName: '1. Fall • Nominativ (Subjekt / Wer-Fall)',
    badgeClass: 'bg-[#1E293B] text-white',
    textClass: 'text-[#1E293B]',
    bgLightClass: 'bg-[#F1F5F9]',
    borderClass: 'border-[#CBD5E1]',
    dotClass: 'bg-[#1E293B]',
    pillBorder: 'border-l-4 border-l-[#1E293B]',
    hex: '#1E293B',
  },
  Akkusativ: {
    caseName: 'Akkusativ',
    displayName: '4. Fall • Akkusativ (Direktes Objekt / Wen-Fall)',
    badgeClass: 'bg-[#C83B32] text-white',
    textClass: 'text-[#C83B32]',
    bgLightClass: 'bg-[#FEF2F2]',
    borderClass: 'border-[#FECACA]',
    dotClass: 'bg-[#C83B32]',
    pillBorder: 'border-l-4 border-l-[#C83B32]',
    hex: '#C83B32',
  },
  Dativ: {
    caseName: 'Dativ',
    displayName: '3. Fall • Dativ (Indirektes Objekt / Wem-Fall)',
    badgeClass: 'bg-[#15803D] text-white',
    textClass: 'text-[#15803D]',
    bgLightClass: 'bg-[#F0FDF4]',
    borderClass: 'border-[#BBF7D0]',
    dotClass: 'bg-[#15803D]',
    pillBorder: 'border-l-4 border-l-[#15803D]',
    hex: '#15803D',
  },
  Genitiv: {
    caseName: 'Genitiv',
    displayName: '2. Fall • Genitiv (Besitz & Relation / Wessen-Fall)',
    badgeClass: 'bg-[#854D0E] text-white',
    textClass: 'text-[#854D0E]',
    bgLightClass: 'bg-[#FEFCE8]',
    borderClass: 'border-[#FEF08A]',
    dotClass: 'bg-[#854D0E]',
    pillBorder: 'border-l-4 border-l-[#854D0E]',
    hex: '#854D0E',
  },
}

export function getCaseColorStyles(caseName?: GrammaticalCase): CaseColorConfig {
  if (caseName && CASE_COLOR_TOKENS[caseName]) {
    return CASE_COLOR_TOKENS[caseName]
  }
  return {
    caseName: 'Nominativ',
    displayName: 'Unbestimmter Fall',
    badgeClass: 'bg-[#55534F] text-white',
    textClass: 'text-[#55534F]',
    bgLightClass: 'bg-[#F7F5F0]',
    borderClass: 'border-[#DEDAD1]',
    dotClass: 'bg-[#89857E]',
    pillBorder: 'border-l-4 border-l-[#89857E]',
    hex: '#55534F',
  }
}
