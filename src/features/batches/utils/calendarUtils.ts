/**
 * Calendar and date utility functions for D9W Batch Availability.
 * Enforces timezone-safe local date operations and ISO YYYY-MM-DD parsing.
 */

export const MONTH_NAMES_DE = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
]

export const MONTH_NAMES_EN = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const WEEKDAY_LABELS = [
  { short: 'Mo', fullDe: 'Montag', fullEn: 'Monday' },
  { short: 'Di', fullDe: 'Dienstag', fullEn: 'Tuesday' },
  { short: 'Mi', fullDe: 'Mittwoch', fullEn: 'Wednesday' },
  { short: 'Do', fullDe: 'Donnerstag', fullEn: 'Thursday' },
  { short: 'Fr', fullDe: 'Freitag', fullEn: 'Friday' },
  { short: 'Sa', fullDe: 'Samstag', fullEn: 'Saturday' },
  { short: 'So', fullDe: 'Sonntag', fullEn: 'Sunday' },
]

/**
 * Safely parses an ISO date string (YYYY-MM-DD) into local Date without UTC skew.
 */
export function parseIsoDateLocal(isoDate: string): Date {
  const parts = isoDate.split('-').map(Number)
  if (parts.length !== 3 || parts.some(isNaN)) {
    return new Date()
  }
  const [year, month, day] = parts
  return new Date(year, month - 1, day)
}

/**
 * Formats a Date object into an ISO YYYY-MM-DD string using local calendar parts.
 */
export function formatIsoDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Checks if two dates refer to the exact same calendar day.
 */
export function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  )
}

/**
 * Returns number of days in a given year and month (monthIndex: 0-11).
 * Automatically accounts for leap years in February (29 days).
 */
export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate()
}

/**
 * Returns the Monday-indexed day of week for the 1st day of the month:
 * 0 = Monday, 1 = Tuesday, ..., 6 = Sunday.
 */
export function getFirstWeekdayIndex(year: number, monthIndex: number): number {
  const jsDay = new Date(year, monthIndex, 1).getDay() // 0 = Sunday, 1 = Monday ...
  return jsDay === 0 ? 6 : jsDay - 1
}

export interface CalendarCell {
  date: Date
  isoDate: string
  dayOfMonth: number
  isCurrentMonth: boolean
  isToday: boolean
}

/**
 * Generates a complete 35- or 42-cell calendar grid for a given month,
 * including leading/trailing days from adjacent months, starting on Monday.
 */
export function generateMonthGrid(
  year: number,
  monthIndex: number,
  today: Date = new Date()
): CalendarCell[] {
  const daysInCurrentMonth = getDaysInMonth(year, monthIndex)
  const firstWeekday = getFirstWeekdayIndex(year, monthIndex)

  const previousMonthIndex = monthIndex === 0 ? 11 : monthIndex - 1
  const previousMonthYear = monthIndex === 0 ? year - 1 : year
  const daysInPreviousMonth = getDaysInMonth(previousMonthYear, previousMonthIndex)

  const cells: CalendarCell[] = []

  // 1. Leading days from previous month
  for (let i = firstWeekday - 1; i >= 0; i--) {
    const day = daysInPreviousMonth - i
    const date = new Date(previousMonthYear, previousMonthIndex, day)
    cells.push({
      date,
      isoDate: formatIsoDate(date),
      dayOfMonth: day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    })
  }

  // 2. Days of the current month
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const date = new Date(year, monthIndex, day)
    cells.push({
      date,
      isoDate: formatIsoDate(date),
      dayOfMonth: day,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
    })
  }

  // 3. Trailing days from next month to complete the row (multiples of 7)
  const remainingCells = (7 - (cells.length % 7)) % 7
  const nextMonthIndex = monthIndex === 11 ? 0 : monthIndex + 1
  const nextMonthYear = monthIndex === 11 ? year + 1 : year

  for (let day = 1; day <= remainingCells; day++) {
    const date = new Date(nextMonthYear, nextMonthIndex, day)
    cells.push({
      date,
      isoDate: formatIsoDate(date),
      dayOfMonth: day,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
    })
  }

  return cells
}

/**
 * Formats ISO date to German readable format: "23. November 2026"
 */
export function formatGermanDate(isoDate: string): string {
  const d = parseIsoDateLocal(isoDate)
  const day = d.getDate()
  const monthName = MONTH_NAMES_DE[d.getMonth()]
  const year = d.getFullYear()
  return `${day}. ${monthName} ${year}`
}

/**
 * Formats ISO date to short German format: "23. Nov 2026"
 */
export function formatShortDate(isoDate: string): string {
  const d = parseIsoDateLocal(isoDate)
  const day = d.getDate()
  const monthShort = MONTH_NAMES_DE[d.getMonth()].slice(0, 3)
  const year = d.getFullYear()
  return `${day}. ${monthShort} ${year}`
}
