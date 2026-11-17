import React from 'react'
import { BookCheck, Clock, Award, Flame, BookmarkCheck } from 'lucide-react'

interface ReadingProgressDashboardProps {
  totalCompleted: number
  totalMinutes: number
  averageScore: number
  streakDays: number
  totalSavedVocab: number
  totalPassages: number
}

export const ReadingProgressDashboard: React.FC<ReadingProgressDashboardProps> = ({
  totalCompleted,
  totalMinutes,
  averageScore,
  streakDays,
  totalSavedVocab,
  totalPassages,
}) => {
  return (
    <div className="rounded-2xl border border-[#DEDAD1] bg-white p-5 sm:p-6 shadow-sm skeuo-recessed space-y-4">
      <div className="flex items-center justify-between border-b border-[#D2CDC3] pb-2">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#55534F]">
          Persönlicher Lesefortschritt
        </h3>
        <span className="text-[11px] font-mono text-[#89857E]">
          Browser-Speicher aktiv
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {/* Metric 1: Completed */}
        <div className="rounded-xl bg-white p-3 border border-[#DEDAD1] shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#89857E] mb-1">
            <BookCheck className="h-3.5 w-3.5 text-[#15803D]" />
            <span>Gelesen</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#171717]">
            {totalCompleted}{' '}
            <span className="text-xs font-normal text-[#89857E]">
              / {totalPassages}
            </span>
          </div>
        </div>

        {/* Metric 2: Minutes */}
        <div className="rounded-xl bg-white p-3 border border-[#DEDAD1] shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#89857E] mb-1">
            <Clock className="h-3.5 w-3.5 text-[#1E3A8A]" />
            <span>Lesezeit</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#171717]">
            {totalMinutes}{' '}
            <span className="text-xs font-normal text-[#89857E]">Min.</span>
          </div>
        </div>

        {/* Metric 3: Average Score */}
        <div className="rounded-xl bg-white p-3 border border-[#DEDAD1] shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#89857E] mb-1">
            <Award className="h-3.5 w-3.5 text-[#D7B95D]" />
            <span>&Oslash; Ergebnis</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#171717]">
            {averageScore}%
          </div>
        </div>

        {/* Metric 4: Saved Words */}
        <div className="rounded-xl bg-white p-3 border border-[#DEDAD1] shadow-xs">
          <div className="flex items-center gap-1.5 text-xs text-[#89857E] mb-1">
            <BookmarkCheck className="h-3.5 w-3.5 text-[#C83B32]" />
            <span>Wortschatz</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#171717]">
            {totalSavedVocab}{' '}
            <span className="text-xs font-normal text-[#89857E]">Wörter</span>
          </div>
        </div>

        {/* Metric 5: Streak */}
        <div className="rounded-xl bg-white p-3 border border-[#DEDAD1] shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1.5 text-xs text-[#89857E] mb-1">
            <Flame className="h-3.5 w-3.5 text-[#EA580C]" />
            <span>Lesestreak</span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#171717]">
            {streakDays}{' '}
            <span className="text-xs font-normal text-[#89857E]">Tage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
