import React from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'

interface BatchCalendarHeaderProps {
  monthLabelDe: string
  isViewingCurrentMonth: boolean
  onPreviousMonth: () => void
  onNextMonth: () => void
  onGoToToday: () => void
  className?: string
}

export const BatchCalendarHeader: React.FC<BatchCalendarHeaderProps> = ({
  monthLabelDe,
  isViewingCurrentMonth,
  onPreviousMonth,
  onNextMonth,
  onGoToToday,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DEDAD1] ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[5px] skeuo-recessed flex items-center justify-center shrink-0">
          <CalendarIcon className="w-4 h-4 text-[#C83B32]" />
        </div>
        <div>
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#171717] tracking-tight">
            {monthLabelDe}
          </h3>
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#89857E] block">
            D9W Published Schedule
          </span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center gap-2 self-start sm:self-center">
        {!isViewingCurrentMonth && (
          <button
            type="button"
            onClick={onGoToToday}
            className="px-2.5 py-1 text-xs font-bold rounded-[4px] skeuo-button-secondary text-[#171717] hover:text-[#C83B32] cursor-pointer"
          >
            Current Month
          </button>
        )}

        <div className="p-0.5 rounded-[5px] skeuo-recessed inline-flex items-center gap-1">
          <button
            type="button"
            onClick={onPreviousMonth}
            aria-label="Previous Month"
            className="p-1.5 rounded-[4px] text-[#171717] hover:bg-[#FFFFFF] hover:text-[#C83B32] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onNextMonth}
            aria-label="Next Month"
            className="p-1.5 rounded-[4px] text-[#171717] hover:bg-[#FFFFFF] hover:text-[#C83B32] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
