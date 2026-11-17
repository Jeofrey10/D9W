import React from 'react'
import { CoreSkill } from '../../types/studyPlanner.types'
import { Headphones, FileText, PenTool, Volume2, BookOpen, Languages, Star, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WizardStep4Props {
  strongestSkill: CoreSkill
  weakestSkill: CoreSkill
  additionalAttentionSkills: CoreSkill[]
  includeGrammar: boolean
  includeVocabulary: boolean
  onStrongestSkillChange: (skill: CoreSkill) => void
  onWeakestSkillChange: (skill: CoreSkill) => void
  onToggleAttentionSkill: (skill: CoreSkill) => void
  onToggleGrammar: (include: boolean) => void
  onToggleVocabulary: (include: boolean) => void
}

const SKILLS_CONFIG: { id: CoreSkill; name: string; german: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  {
    id: 'listening',
    name: 'Listening',
    german: 'Hörverstehen',
    desc: 'Ansagen, Alltagsgespräche, Vorträge & Sprechgeschwindigkeit',
    icon: Headphones,
  },
  {
    id: 'reading',
    name: 'Reading',
    german: 'Leseverstehen',
    desc: 'Anzeigen, Artikel, Zeitungsberichte & Fachwortschatz',
    icon: FileText,
  },
  {
    id: 'writing',
    name: 'Writing',
    german: 'Schriftlicher Ausdruck',
    desc: 'E-Mails, Beschwerden, Forumsbeiträge & Satzkonnektoren',
    icon: PenTool,
  },
  {
    id: 'speaking',
    name: 'Speaking',
    german: 'Mündlicher Ausdruck',
    desc: 'Freies Sprechen, Vortrag strukturieren & Spontane Reaktionen',
    icon: Volume2,
  },
]

export const WizardStep4Priorities: React.FC<WizardStep4Props> = ({
  strongestSkill,
  weakestSkill,
  additionalAttentionSkills,
  includeGrammar,
  includeVocabulary,
  onStrongestSkillChange,
  onWeakestSkillChange,
  onToggleAttentionSkill,
  onToggleGrammar,
  onToggleVocabulary,
}) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="border-b border-[#EFECE6] pb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
          Schritt 04 von 05 • Lernschwerpunkte
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
          Stärken, Schwächen & Fertigkeiten
        </h3>
        <p className="text-sm text-[#5A5751] mt-1">
          Der Generator gewichtet deinen Plan automatisch: Schwächere Bereiche erhalten mehr Übungszeit, ohne dass Kernkompetenzen vernachlässigt werden.
        </p>
      </div>

      {/* 2. Weakest Skill Selection */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717] flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-[#C83B32]" />
          1. Welche Fertigkeit fällt dir am schwersten? (Größter Förderbedarf)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SKILLS_CONFIG.map((sk) => {
            const isSelected = weakestSkill === sk.id
            const Icon = sk.icon
            return (
              <button
                key={`weak-${sk.id}`}
                type="button"
                onClick={() => {
                  onWeakestSkillChange(sk.id)
                  if (strongestSkill === sk.id) {
                    // switch strongest to another
                    const other = SKILLS_CONFIG.find((s) => s.id !== sk.id)
                    if (other) onStrongestSkillChange(other.id)
                  }
                }}
                className={cn(
                  'p-3.5 rounded-xl border text-left transition-all text-xs flex items-start gap-3',
                  isSelected
                    ? 'bg-[#C83B32] text-white border-[#C83B32] shadow-sm'
                    : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', isSelected ? 'text-white' : 'text-[#C83B32]')} />
                <div className="flex-1">
                  <span className="font-bold text-sm block">{sk.german}</span>
                  <span className={cn('text-[11px] block mt-0.5', isSelected ? 'text-red-100' : 'text-[#6B6760]')}>
                    {sk.desc}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold mt-2 block text-red-200">
                      ★ +40% Übungszeit im Plan
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Strongest Skill Selection */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717] flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-[#D7B95D]" />
          2. Welche Fertigkeit gelingt dir bereits am besten? (Stärke)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SKILLS_CONFIG.map((sk) => {
            const isSelected = strongestSkill === sk.id
            const isWeak = weakestSkill === sk.id
            const Icon = sk.icon

            return (
              <button
                key={`strong-${sk.id}`}
                type="button"
                disabled={isWeak}
                onClick={() => onStrongestSkillChange(sk.id)}
                className={cn(
                  'p-3.5 rounded-xl border text-left transition-all text-xs flex items-start gap-3',
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                    : isWeak
                      ? 'bg-[#F5F3EF] opacity-40 border-[#E5E1D8] cursor-not-allowed text-[#9E9B93]'
                      : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <Icon className={cn('w-5 h-5 shrink-0 mt-0.5', isSelected ? 'text-[#D7B95D]' : 'text-[#89857E]')} />
                <div className="flex-1">
                  <span className="font-bold text-sm block">{sk.german}</span>
                  <span className={cn('text-[11px] block mt-0.5', isSelected ? 'text-gray-300' : 'text-[#6B6760]')}>
                    {sk.desc}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold mt-2 block text-[#D7B95D]">
                      ✓ Mindestpuffer gesichert (15%)
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Additional Attention Skills */}
      <div className="space-y-2">
        <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717]">
          3. Zusätzliche Schwerpunkte (Optional ankreuzen)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SKILLS_CONFIG.map((sk) => {
            const isChecked = additionalAttentionSkills.includes(sk.id)
            return (
              <label
                key={`att-${sk.id}`}
                className={cn(
                  'p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 select-none transition-all',
                  isChecked
                    ? 'bg-[#F7F5F0] border-[#171717] font-semibold text-[#171717]'
                    : 'bg-white border-[#DEDAD1] text-[#6B6760]'
                )}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onToggleAttentionSkill(sk.id)}
                  className="w-3.5 h-3.5 rounded border-[#C8C4BA] text-[#C83B32] focus:ring-[#C83B32]"
                />
                <span>{sk.german}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* 5. Grammar & Vocabulary Supplements */}
      <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] space-y-3">
        <span className="text-xs font-bold text-[#171717] block">
          Begleitende Bausteine (Ergänzend zu den 4 Grundfertigkeiten):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-white border border-[#E5E1D8]">
            <input
              type="checkbox"
              checked={includeGrammar}
              onChange={(e) => onToggleGrammar(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-[#C8C4BA] text-[#C83B32] focus:ring-[#C83B32]"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                <Languages className="w-4 h-4 text-[#C83B32]" />
                Grammatik-Training (Kasus, Verben, Satzbau)
              </div>
              <p className="text-[11px] text-[#6B6760] mt-0.5">
                Regelmäßige Einheiten mit dem D9W Case Translator und Sentence Builder.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-white border border-[#E5E1D8]">
            <input
              type="checkbox"
              checked={includeVocabulary}
              onChange={(e) => onToggleVocabulary(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded border-[#C8C4BA] text-[#C83B32] focus:ring-[#C83B32]"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                <BookOpen className="w-4 h-4 text-[#D7B95D]" />
                Wortschatz-Aufbau (Wort des Tages & Flashcards)
              </div>
              <p className="text-[11px] text-[#6B6760] mt-0.5">
                Tägliches Vokabeltraining und gezielte Wiederholungen in Mein Vokabelheft.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  )
}
