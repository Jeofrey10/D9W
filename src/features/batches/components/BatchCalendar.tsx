import React from 'react'
import { Batch } from '@/data/batches'
import {
  WEEKDAY_LABELS,
  CalendarCell,
  formatGermanDate,
} from '../utils/calendarUtils'
import { BatchCalendarHeader } from './BatchCalendarHeader'
import { BatchCard } from './BatchCard'
import { CalendarCheck } from 'lucide-react'

interface BatchCalendarProps {
  monthLabelDe: string
  isViewingCurrentMonth: boolean
  calendarGrid: CalendarCell[]
  batchesByDate: Map<string, Batch[]>
  selectedDate: string | undefined
  onPreviousMonth: () => void
  onNextMonth: () => void
  onGoToToday: () => void
  onSelectDate: (isoDate: string | undefined) => void
  onViewDetails: (batch: Batch) => void
  className?: string
}

export const BatchCalendar: React.FC<BatchCalendarProps> = ({
  monthLabelDe,
  isViewingCurrentMonth,
  calendarGrid,
  batchesByDate,
  selectedDate,
  onPreviousMonth,
  onNextMonth,
  onGoToToday,
  onSelectDate,
  onViewDetails,
  className = '',
}) => {
  // Batches for the currently selected date
  const selectedDateBatches = selectedDate ? batchesByDate.get(selectedDate) || [] : []

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Main Calendar Paper Card */}
      <div className="skeuo-paper rounded-[6px] p-5 sm:p-7 border border-[#DEDAD1] shadow-xs space-y-4">
        {/* Calendar Header */}
        <BatchCalendarHeader
          monthLabelDe={monthLabelDe}
          isViewingCurrentMonth={isViewingCurrentMonth}
          onPreviousMonth={onPreviousMonth}
          onNextMonth={onNextMonth}
          onGoToToday={onGoToToday}
        />

        {/* 7-Column Grid */}
        <div>
          {/* Weekday Row Header */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {WEEKDAY_LABELS.map((w) => (
              <div
                key={w.short}
                className="text-center py-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] bg-[#E8E5DD]/50 rounded-[3px]"
                title={`${w.fullDe} / ${w.fullEn}`}
              >
                <span>{w.short}</span>
              </div>
            ))}
          </div>

          {/* Date Cells Grid */}
          <div
            role="grid"
            aria-label={`Calendar grid for ${monthLabelDe}`}
            className="grid grid-cols-7 gap-1 sm:gap-2"
          >
            {calendarGrid.map((cell) => {
              const dayBatches = batchesByDate.get(cell.isoDate) || []
              const hasBatches = dayBatches.length > 0
              const isSelected = selectedDate === cell.isoDate

              return (
                <button
                  key={cell.isoDate}
                  type="button"
                  role="gridcell"
                  aria-selected={isSelected}
                  aria-label={`${cell.isoDate}: ${
                    hasBatches
                      ? `${dayBatches.length} batch starting`
                      : 'No batches'
                  }`}
                  onClick={() => onSelectDate(cell.isoDate)}
                  className={`min-h-[64px] sm:min-h-[82px] p-1.5 sm:p-2 rounded-[5px] text-left flex flex-col justify-between transition-all cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83B32] ${
                    isSelected
                      ? 'skeuo-paper-stacked border-2 border-[#C83B32] shadow-sm -translate-y-0.5 z-10'
                      : cell.isCurrentMonth
                      ? 'skeuo-recessed bg-[#FAF8F5] hover:bg-[#FFFFFF] hover:border-[#C83B32]/40'
                      : 'bg-[#F2EFEA]/40 text-[#A09C94] border border-transparent opacity-60'
                  }`}
                >
                  {/* Top Day Number Row */}
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected
                          ? 'text-[#C83B32]'
                          : cell.isToday
                          ? 'w-5 h-5 rounded-full bg-[#171717] text-[#FFFFFF] flex items-center justify-center text-[10px]'
                          : cell.isCurrentMonth
                          ? 'text-[#171717]'
                          : 'text-[#89857E]'
                      }`}
                    >
                      {cell.dayOfMonth}
                    </span>

                    {/* Today indicator label on desktop */}
                    {cell.isToday && (
                      <span className="hidden sm:inline-block text-[9px] font-mono uppercase font-bold text-[#C83B32]">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Batch Markers */}
                  {hasBatches && (
                    <div className="w-full mt-1 space-y-1">
                      {/* Compact dot on mobile */}
                      <div className="sm:hidden flex items-center gap-1 justify-center">
                        <span className="w-2 h-2 rounded-full bg-[#C83B32]" />
                        {dayBatches.length > 1 && (
                          <span className="text-[9px] font-bold text-[#C83B32]">
                            +{dayBatches.length - 1}
                          </span>
                        )}
                      </div>

                      {/* Desktop Chips */}
                      <div className="hidden sm:flex flex-col gap-1 w-full">
                        {dayBatches.slice(0, 2).map((b) => (
                          <div
                            key={b.id}
                            className={`text-[10px] font-mono font-bold px-1 py-0.5 rounded-[3px] truncate border ${
                              b.status === 'open'
                                ? 'bg-[#EDF6F1] text-[#2A684C] border-[#2A684C]/30'
                                : b.status === 'filling-fast'
                                ? 'bg-[#FAF6E8] text-[#9A7D2C] border-[#D7B95D]/40'
                                : b.status === 'full'
                                ? 'bg-[#E8E5DD] text-[#55534F] border-[#DEDAD1]'
                                : 'bg-[#FBEBEA] text-[#C83B32] border-[#C83B32]/30'
                            }`}
                          >
                            {b.level} • {b.title.split(' ')[0]}
                          </div>
                        ))}
                        {dayBatches.length > 2 && (
                          <span className="text-[9px] font-semibold text-[#89857E] pl-1">
                            +{dayBatches.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="pt-3 border-t border-[#DEDAD1] flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#55534F]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2A684C]" />
              <span>Open</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D7B95D]" />
              <span>Filling Fast</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#89857E]" />
              <span>Full</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C83B32]" />
              <span>Coming Soon</span>
            </span>
          </div>

          <span className="text-[#89857E] italic">
            Click any date cell to inspect matching cohorts
          </span>
        </div>
      </div>

      {/* Selected Date Inspector Panel */}
      {selectedDate && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#C83B32]" />
              <h4 className="font-heading font-extrabold text-base text-[#171717]">
                Batches Starting on {formatGermanDate(selectedDate)}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => onSelectDate(undefined)}
              className="text-xs font-bold text-[#89857E] hover:text-[#C83B32] cursor-pointer"
            >
              Clear Date Filter
            </button>
          </div>

          {selectedDateBatches.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {selectedDateBatches.map((batch) => (
                <BatchCard
                  key={batch.id}
                  batch={batch}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-[6px] skeuo-recessed text-center text-xs text-[#55534F] space-y-1">
              <p className="font-semibold text-[#171717]">
                No batches scheduled to begin on {formatGermanDate(selectedDate)}.
              </p>
              <p className="text-[#89857E]">
                Select another highlighted date on the calendar, or switch to the Upcoming Batches view.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
