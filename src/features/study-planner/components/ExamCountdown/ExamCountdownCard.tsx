import React from 'react'
import { ExamCountdown, ExamConfiguration, CefrLevel } from '../../types/studyPlanner.types'
import { Calendar, ShieldAlert, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExamCountdownCardProps {
  countdown: ExamCountdown
  examConfig: ExamConfiguration
  targetLevel: CefrLevel
  onAdjustPlanClick?: () => void
}

export const ExamCountdownCard: React.FC<ExamCountdownCardProps> = ({
  countdown,
  examConfig,
  targetLevel,
  onAdjustPlanClick,
}) => {
  const getStatusBadge = () => {
    switch (countdown.status) {
      case 'planning':
        return {
          label: 'Phase: Fundament & Basis',
          className: 'bg-blue-50 text-blue-800 border-blue-200',
        }
      case 'preparation':
        return {
          label: 'Phase: Gezielte Vorbereitung',
          className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        }
      case 'revision':
        return {
          label: 'Phase: Intensiv-Wiederholung',
          className: 'bg-amber-50 text-amber-800 border-amber-200',
        }
      case 'final-preparation':
        return {
          label: 'Phase: Endspurt vor der Prüfung',
          className: 'bg-rose-50 text-rose-800 border-rose-200',
        }
      case 'completed':
        return {
          label: 'Prüfungszeitraum abgeschlossen',
          className: 'bg-gray-100 text-gray-800 border-gray-300',
        }
    }
  }

  const badge = getStatusBadge()

  return (
    <div className="skeuo-paper rounded-2xl p-6 sm:p-7 border border-[#DEDAD1] shadow-sm space-y-4">
      {/* 1. Header with Badge & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Prüfungs-Countdown & Status
            </span>
            <span className={cn('text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border', badge.className)}>
              {badge.label}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-0.5">
            {examConfig.provider} • Niveau {targetLevel}
          </h3>
        </div>

        {onAdjustPlanClick && (
          <button
            type="button"
            onClick={onAdjustPlanClick}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#DEDAD1] hover:bg-[#F9F8F5] text-[#171717] transition-all self-start sm:self-auto"
          >
            Termin anpassen
          </button>
        )}
      </div>

      {/* 2. Main Countdown Displays */}
      {countdown.targetDate ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Days */}
          <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] text-center">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] block">
              {countdown.daysRemaining}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#89857E] mt-1 block">
              Tage verbleibend
            </span>
          </div>

          {/* Weeks */}
          <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] text-center">
            <span className="text-3xl sm:text-4xl font-serif font-bold text-[#C83B32] block">
              {countdown.weeksRemaining}
            </span>
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#89857E] mt-1 block">
              Wochen bis zum Test
            </span>
          </div>

          {/* Date */}
          <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] text-center flex flex-col justify-center">
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#171717]">
              <Calendar className="w-3.5 h-3.5 text-[#C83B32]" />
              <span>{countdown.targetDate}</span>
            </div>
            <span className="text-[10px] font-mono uppercase text-[#89857E] mt-1">
              {examConfig.isConfirmedDate ? 'Termin bestätigt' : 'Geschätzter Termin'}
            </span>
          </div>

          {/* Status Label */}
          <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] text-center flex flex-col justify-center">
            <span className="text-xs font-bold text-[#171717] block truncate">
              {countdown.statusLabel}
            </span>
            <span className="text-[10px] text-[#6B6760] block mt-0.5 line-clamp-1">
              {countdown.statusDescription}
            </span>
          </div>
        </div>
      ) : (
        <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[#D7B95D] shrink-0" />
            <div>
              <span className="font-bold text-sm text-[#171717] block">
                Flexibles Lernziel ohne festen Stichtag ({examConfig.flexibleWeeks || 12} Wochen)
              </span>
              <p className="text-xs text-[#6B6760] mt-0.5">
                Du lernst in deinem eigenen Rhythmus. Der Stundenplan unterstützt dich bei kontinuierlicher Vorbereitung.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. Planning Indicator Note */}
      <div className="pt-1 flex items-start gap-2 text-[11px] text-[#89857E]">
        <ShieldAlert className="w-3.5 h-3.5 text-[#89857E] shrink-0 mt-0.5" />
        <p>
          <strong>Planungshinweis:</strong> Countdown-Metriken und Phasen sind didaktische Orientierungshilfen zur Strukturierung deiner Lernzeit und stellen keine Erfolgsgarantie dar.
        </p>
      </div>
    </div>
  )
}
