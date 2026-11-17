import React, { useState } from 'react'
import {
  Trophy,
  Clock,
  Flame,
  CheckCircle2,
  RotateCcw,
  BarChart2,
  Sparkles,
} from 'lucide-react'

interface ListeningProgressDashboardProps {
  totalCompleted: number
  totalMinutes: number
  averageScore: number
  streakDays: number
  totalExercises: number
  onResetProgress: () => void
}

export const ListeningProgressDashboard: React.FC<ListeningProgressDashboardProps> = ({
  totalCompleted,
  totalMinutes,
  averageScore,
  streakDays,
  totalExercises,
  onResetProgress,
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const completionPercent =
    totalExercises > 0 ? Math.round((totalCompleted / totalExercises) * 100) : 0

  return (
    <div className="skeuo-paper-stacked rounded-[8px] p-5 sm:p-6 border border-[#DCD7CD] space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#ECE8E0] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#171717] text-[#D7B95D] flex items-center justify-center">
            <BarChart2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-heading font-bold text-[#171717]">
              Ihr Hörverständnis-Fortschritt (Listening Tracker)
            </h4>
            <span className="text-[10px] text-[#89857E] font-mono">
              Gespeichert im Browser &bull; d9w-listening-progress-v1
            </span>
          </div>
        </div>

        <div>
          {showConfirmReset ? (
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#C83B32] font-semibold">Wirklich löschen?</span>
              <button
                type="button"
                onClick={() => {
                  onResetProgress()
                  setShowConfirmReset(false)
                }}
                className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#C83B32] text-white cursor-pointer"
              >
                Ja
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="px-2 py-0.5 rounded text-[10px] bg-[#E8E5DD] text-[#55534F] cursor-pointer"
              >
                Nein
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowConfirmReset(true)}
              title="Reset listening progress"
              className="inline-flex items-center gap-1 text-[11px] text-[#89857E] hover:text-[#C83B32] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Zurücksetzen</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        {/* Completed */}
        <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[#89857E]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            <span>Abgeschlossen</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-[#171717]">
            {totalCompleted}{' '}
            <span className="text-xs text-[#89857E] font-normal">/ {totalExercises}</span>
          </div>
          <div className="text-[10px] text-[#2E7D32] font-semibold">
            {completionPercent}% des Curriculums
          </div>
        </div>

        {/* Listening Time */}
        <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[#89857E]">
            <Clock className="w-3.5 h-3.5 text-[#D7B95D]" />
            <span>Hörzeit</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-[#171717]">
            {totalMinutes}{' '}
            <span className="text-xs text-[#89857E] font-normal">Min.</span>
          </div>
          <div className="text-[10px] text-[#89857E]">Aktives Hörverstehen</div>
        </div>

        {/* Average Score */}
        <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[#89857E]">
            <Trophy className="w-3.5 h-3.5 text-[#1E4F8A]" />
            <span>Durchschnitt</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-[#171717]">
            {averageScore}%
          </div>
          <div className="text-[10px] text-[#1E4F8A] font-semibold">
            {averageScore >= 80 ? 'Sehr gutes Niveau' : 'Regelmäßig üben'}
          </div>
        </div>

        {/* Streak */}
        <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[#89857E]">
            <Flame className="w-3.5 h-3.5 text-[#C83B32]" />
            <span>Übungs-Streak</span>
          </div>
          <div className="text-xl font-mono font-extrabold text-[#C83B32]">
            {streakDays}{' '}
            <span className="text-xs text-[#89857E] font-normal">Tage</span>
          </div>
          <div className="text-[10px] text-[#C83B32] font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Aktiv am Ball bleiben</span>
          </div>
        </div>
      </div>
    </div>
  )
}
