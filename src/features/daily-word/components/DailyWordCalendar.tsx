import React from 'react'
import { useDailyWordCalendar } from '../hooks/useDailyWordCalendar'
import { WEEKDAY_LABELS } from '@/features/batches/utils/calendarUtils'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DailyWordCalendarProps {
  selectedDateKey: string
  onSelectDate: (dateKey: string) => void
  completedDates: string[]
  learnedWordIds: string[]
}

export const DailyWordCalendar: React.FC<DailyWordCalendarProps> = ({
  selectedDateKey,
  onSelectDate,
  completedDates,
  learnedWordIds,
}) => {
  const {
    monthLabel,
    daysGrid,
    nextMonth,
    prevMonth,
    goToToday,
  } = useDailyWordCalendar(completedDates, learnedWordIds)

  return (
    <div className="rounded-2xl border border-[#DEDAD1] bg-white p-5 sm:p-6 shadow-sm space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-[#C83B32]" />
          <h3 className="font-serif text-base font-bold text-[#171717]">
            {monthLabel}
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={goToToday}
            className="rounded-lg border border-[#DEDAD1] px-2.5 py-1 text-xs font-semibold text-[#55534F] hover:bg-[#FAF8F5]"
          >
            Heute
          </button>
          <button
            type="button"
            onClick={prevMonth}
            className="rounded-lg border border-[#DEDAD1] p-1 text-[#55534F] hover:bg-[#FAF8F5]"
            title="Vorheriger Monat"
            aria-label="Vorheriger Monat"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="rounded-lg border border-[#DEDAD1] p-1 text-[#55534F] hover:bg-[#FAF8F5]"
            title="Nächster Monat"
            aria-label="Nächster Monat"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekday Row (Monday first) */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAY_LABELS.map((w) => (
          <span
            key={w.short}
            className="text-[11px] font-mono font-bold uppercase text-[#89857E] py-1"
          >
            {w.short}
          </span>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {daysGrid.map((day) => {
          const isSelected = selectedDateKey === day.dateKey
          const isClickable = !day.isFuture && day.isPublished

          return (
            <button
              key={day.dateKey}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onSelectDate(day.dateKey)}
              className={cn(
                'relative flex flex-col items-center justify-center rounded-xl p-2 text-xs transition-all min-h-[46px]',
                !day.isCurrentMonth && 'opacity-30',
                day.isFuture && 'cursor-not-allowed opacity-40 bg-[#FAF8F5]',
                isSelected
                  ? 'border-2 border-[#171717] bg-[#171717] text-white shadow-sm font-bold'
                  : day.isToday
                  ? 'border border-[#C83B32] bg-[#FEF2F2] font-bold text-[#C83B32]'
                  : isClickable
                  ? 'border border-transparent hover:bg-[#FAF8F5] text-[#171717]'
                  : 'text-[#89857E]'
              )}
            >
              <span className="font-mono text-xs">{day.dayNumber}</span>

              {/* Status indicators */}
              <div className="flex items-center gap-0.5 mt-0.5">
                {day.isLearned && (
                  <Check
                    className={cn(
                      'h-3 w-3',
                      isSelected ? 'text-white' : 'text-[#15803D]'
                    )}
                  />
                )}
                {day.isCompleted && !day.isLearned && (
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      isSelected ? 'bg-white' : 'bg-[#D7B95D]'
                    )}
                  />
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#EFECE6] pt-3 text-[11px] text-[#89857E]">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full border border-[#C83B32] bg-[#FEF2F2]" />
          <span>Heute</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Check className="h-3 w-3 text-[#15803D]" />
          <span>Gelernt</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#D7B95D]" />
          <span>Quiz bestanden</span>
        </div>
      </div>
    </div>
  )
}
