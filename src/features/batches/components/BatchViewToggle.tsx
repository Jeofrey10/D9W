import React from 'react'
import { Calendar, LayoutList } from 'lucide-react'

export type BatchViewMode = 'calendar' | 'list'

interface BatchViewToggleProps {
  viewMode: BatchViewMode
  onChangeView: (mode: BatchViewMode) => void
  upcomingCount: number
  className?: string
}

export const BatchViewToggle: React.FC<BatchViewToggleProps> = ({
  viewMode,
  onChangeView,
  upcomingCount,
  className = '',
}) => {
  return (
    <div
      role="group"
      aria-label="Schedule Presentation Format"
      className={`p-1 rounded-[6px] skeuo-recessed inline-flex items-center gap-1 ${className}`}
    >
      <button
        type="button"
        aria-pressed={viewMode === 'calendar'}
        onClick={() => onChangeView('calendar')}
        className={`px-3.5 py-1.5 rounded-[5px] text-xs font-heading font-bold flex items-center gap-2 transition-all cursor-pointer ${
          viewMode === 'calendar'
            ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
            : 'text-[#55534F] hover:text-[#171717] hover:bg-[#FFFFFF]/50'
        }`}
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Monthly Calendar</span>
      </button>

      <button
        type="button"
        aria-pressed={viewMode === 'list'}
        onClick={() => onChangeView('list')}
        className={`px-3.5 py-1.5 rounded-[5px] text-xs font-heading font-bold flex items-center gap-2 transition-all cursor-pointer ${
          viewMode === 'list'
            ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
            : 'text-[#55534F] hover:text-[#171717] hover:bg-[#FFFFFF]/50'
        }`}
      >
        <LayoutList className="w-3.5 h-3.5" />
        <span>Upcoming Batches ({upcomingCount})</span>
      </button>
    </div>
  )
}
