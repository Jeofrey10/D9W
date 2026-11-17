import React from 'react'
import { Flame, Trophy, BookCheck } from 'lucide-react'

interface DailyWordStreakBadgeProps {
  currentStreak: number
  longestStreak: number
  totalLearned: number
}

export const DailyWordStreakBadge: React.FC<DailyWordStreakBadgeProps> = ({
  currentStreak,
  longestStreak,
  totalLearned,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {/* Current Streak */}
      <div className="rounded-xl border border-[#DEDAD1] bg-white p-3.5 shadow-xs flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF2F2] text-[#C83B32]">
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-[#89857E]">Aktuelle Streak</div>
          <div className="text-xl font-mono font-bold text-[#171717]">
            {currentStreak}{' '}
            <span className="text-xs font-normal text-[#89857E]">Tage</span>
          </div>
        </div>
      </div>

      {/* Longest Streak */}
      <div className="rounded-xl border border-[#DEDAD1] bg-white p-3.5 shadow-xs flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFFBEB] text-[#D7B95D]">
          <Trophy className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-[#89857E]">Längste Streak</div>
          <div className="text-xl font-mono font-bold text-[#171717]">
            {longestStreak}{' '}
            <span className="text-xs font-normal text-[#89857E]">Tage</span>
          </div>
        </div>
      </div>

      {/* Total Words Learned */}
      <div className="rounded-xl border border-[#DEDAD1] bg-white p-3.5 shadow-xs flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D]">
          <BookCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-[#89857E]">Gelernt</div>
          <div className="text-xl font-mono font-bold text-[#171717]">
            {totalLearned}{' '}
            <span className="text-xs font-normal text-[#89857E]">Wörter</span>
          </div>
        </div>
      </div>
    </div>
  )
}
