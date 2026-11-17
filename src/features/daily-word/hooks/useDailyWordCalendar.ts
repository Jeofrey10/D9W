import { useState, useMemo } from 'react'
import {
  parseIsoDateLocal,
  formatIsoDate,
  MONTH_NAMES_DE,
} from '@/features/batches/utils/calendarUtils'
import { getBerlinTodayDateString } from '../utils/dailyWordEngine'
import { DAILY_WORD_SCHEDULE_MAP } from '@/data/daily-word/dailyWordSchedule'

export interface CalendarDayCell {
  dateKey: string
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  isPast: boolean
  isFuture: boolean
  isPublished: boolean
  isLearned: boolean
  isCompleted: boolean
  hasQuizAttempt: boolean
}

export function useDailyWordCalendar(
  completedDates: string[] = [],
  learnedWordIds: string[] = []
) {
  const todayKey = getBerlinTodayDateString()
  const todayDate = parseIsoDateLocal(todayKey)

  const [activeYear, setActiveYear] = useState<number>(todayDate.getFullYear())
  const [activeMonth, setActiveMonth] = useState<number>(todayDate.getMonth()) // 0-indexed

  const completedSet = useMemo(() => new Set(completedDates), [completedDates])
  const learnedSet = useMemo(() => new Set(learnedWordIds), [learnedWordIds])

  // Monday-first days grid generator
  const daysGrid = useMemo<CalendarDayCell[]>(() => {
    const firstDayOfMonth = new Date(activeYear, activeMonth, 1)
    const daysInMonth = new Date(activeYear, activeMonth + 1, 0).getDate()

    // Weekday of 1st day (0 = Sun, 1 = Mon ... 6 = Sat)
    // Shift to Monday-first: Mon=0, Tue=1, ... Sun=6
    let startDayOffset = firstDayOfMonth.getDay() - 1
    if (startDayOffset === -1) startDayOffset = 6

    const grid: CalendarDayCell[] = []

    // 1. Previous month trailing days
    const prevMonthDays = new Date(activeYear, activeMonth, 0).getDate()
    for (let i = startDayOffset - 1; i >= 0; i--) {
      const dayNum = prevMonthDays - i
      const prevDate = new Date(activeYear, activeMonth - 1, dayNum)
      const dateKey = formatIsoDate(prevDate)
      const scheduleEntry = DAILY_WORD_SCHEDULE_MAP[dateKey]

      grid.push({
        dateKey,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: dateKey === todayKey,
        isPast: dateKey < todayKey,
        isFuture: dateKey > todayKey,
        isPublished: Boolean(scheduleEntry?.published),
        isLearned: Boolean(
          scheduleEntry && learnedSet.has(scheduleEntry.vocabularyId)
        ),
        isCompleted: completedSet.has(dateKey),
        hasQuizAttempt: false,
      })
    }

    // 2. Current month days
    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const currDate = new Date(activeYear, activeMonth, dayNum)
      const dateKey = formatIsoDate(currDate)
      const scheduleEntry = DAILY_WORD_SCHEDULE_MAP[dateKey]

      grid.push({
        dateKey,
        dayNumber: dayNum,
        isCurrentMonth: true,
        isToday: dateKey === todayKey,
        isPast: dateKey < todayKey,
        isFuture: dateKey > todayKey,
        isPublished: Boolean(scheduleEntry?.published),
        isLearned: Boolean(
          scheduleEntry && learnedSet.has(scheduleEntry.vocabularyId)
        ),
        isCompleted: completedSet.has(dateKey),
        hasQuizAttempt: false,
      })
    }

    // 3. Next month leading days to complete the full 35 or 42 grid cells
    const remainingCells = (7 - (grid.length % 7)) % 7
    for (let dayNum = 1; dayNum <= remainingCells; dayNum++) {
      const nextDate = new Date(activeYear, activeMonth + 1, dayNum)
      const dateKey = formatIsoDate(nextDate)
      const scheduleEntry = DAILY_WORD_SCHEDULE_MAP[dateKey]

      grid.push({
        dateKey,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday: dateKey === todayKey,
        isPast: dateKey < todayKey,
        isFuture: dateKey > todayKey,
        isPublished: Boolean(scheduleEntry?.published),
        isLearned: Boolean(
          scheduleEntry && learnedSet.has(scheduleEntry.vocabularyId)
        ),
        isCompleted: completedSet.has(dateKey),
        hasQuizAttempt: false,
      })
    }

    return grid
  }, [activeYear, activeMonth, todayKey, completedSet, learnedSet])

  const nextMonth = () => {
    if (activeMonth === 11) {
      setActiveMonth(0)
      setActiveYear((y) => y + 1)
    } else {
      setActiveMonth((m) => m + 1)
    }
  }

  const prevMonth = () => {
    if (activeMonth === 0) {
      setActiveMonth(11)
      setActiveYear((y) => y - 1)
    } else {
      setActiveMonth((m) => m - 1)
    }
  }

  const goToToday = () => {
    setActiveYear(todayDate.getFullYear())
    setActiveMonth(todayDate.getMonth())
  }

  const monthLabel = `${MONTH_NAMES_DE[activeMonth]} ${activeYear}`

  return {
    activeYear,
    activeMonth,
    monthLabel,
    daysGrid,
    nextMonth,
    prevMonth,
    goToToday,
  }
}
