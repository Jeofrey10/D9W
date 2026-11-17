import { parseIsoDateLocal, formatIsoDate } from '@/features/batches/utils/calendarUtils'

/**
 * Calculates current and longest daily learning streaks based on completed date keys.
 * A day qualifies when the user marks the daily word as learned OR completes the daily mini quiz.
 */
export function calculateDailyStreak(
  completedDates: string[],
  todayKey: string
): { currentStreak: number; longestStreak: number } {
  if (!completedDates || completedDates.length === 0) {
    return { currentStreak: 0, longestStreak: 0 }
  }

  const dateSet = new Set(completedDates)

  // 1. Calculate current streak
  // Check if today is completed, or if yesterday was completed (streak still active)
  const todayDate = parseIsoDateLocal(todayKey)
  const yesterdayDate = new Date(todayDate)
  yesterdayDate.setDate(yesterdayDate.getDate() - 1)
  const yesterdayKey = formatIsoDate(yesterdayDate)

  let currentStreak = 0
  let checkDate = dateSet.has(todayKey) ? todayDate : dateSet.has(yesterdayKey) ? yesterdayDate : null

  if (checkDate) {
    const iterDate = new Date(checkDate)
    while (true) {
      const iterKey = formatIsoDate(iterDate)
      if (dateSet.has(iterKey)) {
        currentStreak++
        iterDate.setDate(iterDate.getDate() - 1)
      } else {
        break
      }
    }
  }

  // 2. Calculate longest streak in history
  const sortedDates = Array.from(dateSet).sort()
  let longestStreak = 0
  let tempStreak = 0
  let prevDateObj: Date | null = null

  for (const dateStr of sortedDates) {
    const currDateObj = parseIsoDateLocal(dateStr)
    if (!prevDateObj) {
      tempStreak = 1
    } else {
      const diffTime = currDateObj.getTime() - prevDateObj.getTime()
      const diffDays = Math.round(diffTime / (1000 * 3600 * 24))
      if (diffDays === 1) {
        tempStreak++
      } else if (diffDays > 1) {
        tempStreak = 1
      }
    }
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak
    }
    prevDateObj = currDateObj
  }

  return {
    currentStreak,
    longestStreak: Math.max(longestStreak, currentStreak),
  }
}
