import { useState, useMemo } from 'react'
import { Batch } from '@/data/batches'
import {
  CalendarCell,
  generateMonthGrid,
  MONTH_NAMES_DE,
  MONTH_NAMES_EN,
  formatIsoDate,
} from '../utils/calendarUtils'

export interface UseBatchCalendarResult {
  year: number
  monthIndex: number
  today: Date
  todayIso: string
  selectedDate: string | undefined
  calendarGrid: CalendarCell[]
  batchesByDate: Map<string, Batch[]>
  monthLabelDe: string
  monthLabelEn: string
  isViewingCurrentMonth: boolean
  goToPreviousMonth: () => void
  goToNextMonth: () => void
  goToToday: () => void
  selectDate: (isoDate: string | undefined) => void
}

export function useBatchCalendar(
  batches: Batch[],
  initialReferenceDate?: Date
): UseBatchCalendarResult {
  const [currentDate, setCurrentDate] = useState<Date>(() => initialReferenceDate ?? new Date())
  const [today] = useState<Date>(() => new Date())
  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined)

  const year = currentDate.getFullYear()
  const monthIndex = currentDate.getMonth()

  const todayIso = useMemo(() => formatIsoDate(today), [today])

  // Map batches by date for O(1) cell lookup
  const batchesByDate = useMemo(() => {
    const map = new Map<string, Batch[]>()
    for (const batch of batches) {
      if (!batch.published) continue
      const existing = map.get(batch.startDate) || []
      existing.push(batch)
      map.set(batch.startDate, existing)
    }
    return map
  }, [batches])

  // Generate complete calendar grid for current month
  const calendarGrid = useMemo(() => {
    return generateMonthGrid(year, monthIndex, today)
  }, [year, monthIndex, today])

  const goToPreviousMonth = () => {
    setCurrentDate((prev) => {
      const prevMonth = prev.getMonth() === 0 ? 11 : prev.getMonth() - 1
      const prevYear = prev.getMonth() === 0 ? prev.getFullYear() - 1 : prev.getFullYear()
      return new Date(prevYear, prevMonth, 1)
    })
  }

  const goToNextMonth = () => {
    setCurrentDate((prev) => {
      const nextMonth = prev.getMonth() === 11 ? 0 : prev.getMonth() + 1
      const nextYear = prev.getMonth() === 11 ? prev.getFullYear() + 1 : prev.getFullYear()
      return new Date(nextYear, nextMonth, 1)
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(todayIso)
  }

  const selectDate = (isoDate: string | undefined) => {
    setSelectedDate((prev) => (prev === isoDate ? undefined : isoDate))
  }

  const monthLabelDe = `${MONTH_NAMES_DE[monthIndex]} ${year}`
  const monthLabelEn = `${MONTH_NAMES_EN[monthIndex]} ${year}`

  const isViewingCurrentMonth =
    year === today.getFullYear() && monthIndex === today.getMonth()

  return {
    year,
    monthIndex,
    today,
    todayIso,
    selectedDate,
    calendarGrid,
    batchesByDate,
    monthLabelDe,
    monthLabelEn,
    isViewingCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
  }
}
