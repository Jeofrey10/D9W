import React from 'react'
import { CefrLevel } from '@/types'
import {
  EXAM_PROVIDER_OPTIONS,
  ExamProviderId,
} from '@/data/study-planner/exam-options'
import { ExamConfiguration } from '../../types/studyPlanner.types'
import { Calendar, ShieldAlert, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WizardStep2Props {
  examConfig: ExamConfiguration
  targetLevel: CefrLevel
  onChange: (config: ExamConfiguration) => void
}

function getTomorrowDateString(): string {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

export const WizardStep2Exam: React.FC<WizardStep2Props> = ({
  examConfig,
  targetLevel,
  onChange,
}) => {
  const selectedProvider =
    EXAM_PROVIDER_OPTIONS.find((p) => p.id === examConfig.provider) ||
    EXAM_PROVIDER_OPTIONS[0]

  const minDateStr = getTomorrowDateString()

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="border-b border-[#EFECE6] pb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
          Schritt 02 von 05 • Prüfung & Zieltermin
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
          Prüfungsformat & Geplanter Termin
        </h3>
        <p className="text-sm text-[#5A5751] mt-1">
          Wähle dein Zielprüfungsformat oder erstelle einen flexiblen Lernplan ohne Prüfungsdruck.
        </p>
      </div>

      {/* 2. Provider Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider font-bold text-[#171717]">
          Prüfungsinstitut / Zielformat
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {EXAM_PROVIDER_OPTIONS.map((opt) => {
            const isSelected = examConfig.provider === opt.id
            const isGeneral = opt.id === 'General German'

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  onChange({
                    ...examConfig,
                    provider: opt.id as ExamProviderId,
                    isFlexibleGoal: isGeneral ? true : examConfig.isFlexibleGoal,
                  })
                }}
                className={cn(
                  'p-4 rounded-xl text-left border transition-all text-xs flex flex-col justify-between space-y-3',
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                    : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm block">{opt.name}</span>
                    {isGeneral && (
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-900/30 text-emerald-400">
                        Ohne Prüfung
                      </span>
                    )}
                  </div>
                  <span className={cn('text-[11px] block mt-1 leading-snug', isSelected ? 'text-gray-300' : 'text-[#6B6760]')}>
                    {opt.description}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-gray-400' : 'text-[#89857E]'}>
                    Levels: {opt.supportedLevels.join(', ')}
                  </span>
                  {isSelected && (
                    <span className="text-[#D7B95D] font-mono font-bold">
                      ✓ Aktiv
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Flexible Goal Toggle vs Fixed Exam Date */}
      <div className="skeuo-paper p-5 rounded-2xl border border-[#DEDAD1] space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717]">
            Terminplanung
          </label>
          <label className="flex items-center gap-2 text-xs cursor-pointer select-none">
            <input
              type="checkbox"
              checked={examConfig.isFlexibleGoal}
              onChange={(e) =>
                onChange({
                  ...examConfig,
                  isFlexibleGoal: e.target.checked,
                  examDate: e.target.checked ? null : examConfig.examDate,
                })
              }
              className="w-4 h-4 rounded border-[#C8C4BA] text-[#C83B32] focus:ring-[#C83B32]"
            />
            <span className="font-semibold text-[#171717]">Flexibles Lernziel ohne festen Prüfungstermin</span>
          </label>
        </div>

        {examConfig.isFlexibleGoal ? (
          <div className="space-y-3 pt-2 border-t border-[#EFECE6]">
            <p className="text-xs text-[#5A5751]">
              Wähle den angestrebten Vorbereitungszeitraum in Wochen:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[8, 12, 16, 24].map((w) => {
                const isSelected = (examConfig.flexibleWeeks || 12) === w
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => onChange({ ...examConfig, flexibleWeeks: w })}
                    className={cn(
                      'py-3 px-4 rounded-xl border text-center text-xs font-semibold transition-all',
                      isSelected
                        ? 'bg-[#171717] text-white border-[#171717]'
                        : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                    )}
                  >
                    <span className="block text-sm font-bold">{w} Wochen</span>
                    <span className={cn('text-[10px] block mt-0.5', isSelected ? 'text-gray-300' : 'text-[#89857E]')}>
                      ca. {Math.round(w / 4.3)} Monate
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#EFECE6]">
            <div>
              <label htmlFor="exam-date-input" className="block text-xs font-medium text-[#4A4741] mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#C83B32]" />
                Geplantes Prüfungsdatum (YYYY-MM-DD)
              </label>
              <input
                id="exam-date-input"
                type="date"
                min={minDateStr}
                value={examConfig.examDate || ''}
                onChange={(e) =>
                  onChange({
                    ...examConfig,
                    examDate: e.target.value,
                  })
                }
                className="w-full text-xs font-mono p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A4741] mb-1.5">
                Verbindlichkeit des Termins
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onChange({ ...examConfig, isConfirmedDate: true })}
                  className={cn(
                    'py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all',
                    examConfig.isConfirmedDate
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                  )}
                >
                  ✓ Bestätigt
                </button>
                <button
                  type="button"
                  onClick={() => onChange({ ...examConfig, isConfirmedDate: false })}
                  className={cn(
                    'py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all',
                    !examConfig.isConfirmedDate
                      ? 'bg-[#171717] text-white border-[#171717]'
                      : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                  )}
                >
                  ~ Geschätzt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Exam Format Quick Breakdown & Disclaimer */}
      {selectedProvider && selectedProvider.id !== 'General German' && (
        <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] space-y-2.5 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#171717]">
            <Sparkles className="w-4 h-4 text-[#D7B95D]" />
            Typischer Prüfungsaufbau: {selectedProvider.name} ({targetLevel})
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {selectedProvider.typicalFormat.modules.map((m) => (
              <div key={m.germanName} className="p-2 rounded bg-white border border-[#E5E1D8]">
                <span className="font-bold block text-[#171717]">{m.germanName}</span>
                <span className="text-[11px] text-[#89857E] block">{m.durationMinutes} Minuten</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#6B6760] pt-1">
            <strong>Bestehenskriterium:</strong> {selectedProvider.typicalFormat.passingCriteria}
          </p>
        </div>
      )}

      {/* 5. Non-Affiliation Disclaimer */}
      <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E1D8] flex items-start gap-2.5 text-xs text-[#6B6760]">
        <ShieldAlert className="w-4 h-4 text-[#89857E] shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          {selectedProvider.disclaimer} Offizielle Prüfungsanmeldungen, Gebühren und Prüfungstermine müssen direkt über das jeweilige Institut erfolgen.
        </p>
      </div>
    </div>
  )
}
