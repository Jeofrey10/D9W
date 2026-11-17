import type { CefrLevel } from '@/types'
import { Batch, BatchStatus, LearningMode, D9W_WHATSAPP_NUMBER } from '@/data/batches'
import { parseIsoDateLocal, formatGermanDate } from './calendarUtils'

export interface BatchFilterState {
  level: 'all' | CefrLevel
  mode: 'all' | LearningMode
  status: 'all' | BatchStatus
  dateRange: 'all' | 'this-month' | 'next-month'
  selectedDate?: string // YYYY-MM-DD
}

export const INITIAL_BATCH_FILTERS: BatchFilterState = {
  level: 'all',
  mode: 'all',
  status: 'all',
  dateRange: 'all',
}

/**
 * Checks whether a batch start date is today or in the future.
 */
export function isBatchUpcoming(batch: Batch, referenceDate: Date = new Date()): boolean {
  const start = parseIsoDateLocal(batch.startDate)
  // Compare by start of reference day
  const refStart = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  )
  return start >= refStart
}

/**
 * Filters a list of batches according to the active filter state.
 * Always excludes unpublished batches (`published: false`).
 */
export function filterBatches(
  batches: Batch[],
  filters: BatchFilterState,
  referenceDate: Date = new Date()
): Batch[] {
  const currentYear = referenceDate.getFullYear()
  const currentMonth = referenceDate.getMonth() // 0-indexed

  return batches.filter((batch) => {
    // 1. Never show unpublished records
    if (!batch.published) return false

    // 2. Filter by Level
    if (filters.level !== 'all' && batch.level !== filters.level) {
      return false
    }

    // 3. Filter by Mode
    if (filters.mode !== 'all' && batch.mode !== filters.mode) {
      return false
    }

    // 4. Filter by Status
    if (filters.status !== 'all' && batch.status !== filters.status) {
      return false
    }

    // 5. Filter by Date Range
    const batchStart = parseIsoDateLocal(batch.startDate)
    const batchYear = batchStart.getFullYear()
    const batchMonth = batchStart.getMonth()

    if (filters.dateRange === 'this-month') {
      if (batchYear !== currentYear || batchMonth !== currentMonth) {
        return false
      }
    } else if (filters.dateRange === 'next-month') {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear
      if (batchYear !== nextMonthYear || batchMonth !== nextMonth) {
        return false
      }
    }

    // 6. Filter by Selected Specific Date (from calendar click)
    if (filters.selectedDate && batch.startDate !== filters.selectedDate) {
      return false
    }

    return true
  })
}

/**
 * Sorts batches chronologically by startDate.
 */
export function sortBatchesByStartDate(batches: Batch[], ascending = true): Batch[] {
  return [...batches].sort((a, b) => {
    const timeA = parseIsoDateLocal(a.startDate).getTime()
    const timeB = parseIsoDateLocal(b.startDate).getTime()
    return ascending ? timeA - timeB : timeB - timeA
  })
}

/**
 * Retrieves all published batches that start on a specific ISO date.
 */
export function getBatchesForDate(batches: Batch[], isoDate: string): Batch[] {
  return batches.filter((b) => b.published && b.startDate === isoDate)
}

/**
 * Generates an official contextual WhatsApp enquiry URL for a specific batch.
 */
export function buildWhatsAppBatchEnquiryUrl(batch: Batch): string {
  const modeText = batch.mode === 'online' ? 'Online' : 'Offline'
  const formattedDate = formatGermanDate(batch.startDate)

  const message = [
    'Hello D9W Team,',
    '',
    `I am interested in the ${batch.level} German course.`,
    '',
    `Batch: ${batch.title}`,
    `Learning Mode: ${modeText}`,
    `Start Date: ${formattedDate}`,
    '',
    'Please share the registration details and further information.',
    '',
    'Thank you.',
  ].join('\n')

  return `https://wa.me/${D9W_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

/**
 * Counts how many non-default filters are currently applied.
 */
export function countActiveFilters(filters: BatchFilterState): number {
  let count = 0
  if (filters.level !== 'all') count++
  if (filters.mode !== 'all') count++
  if (filters.status !== 'all') count++
  if (filters.dateRange !== 'all') count++
  if (filters.selectedDate) count++
  return count
}
