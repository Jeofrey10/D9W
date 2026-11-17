import { useState, useMemo } from 'react'
import type { CefrLevel } from '@/types'
import {
  Batch,
  BatchStatus,
  LearningMode,
  BATCHES_DATA,
} from '@/data/batches'
import {
  BatchFilterState,
  INITIAL_BATCH_FILTERS,
  filterBatches,
  sortBatchesByStartDate,
  countActiveFilters,
  isBatchUpcoming,
} from '../utils/batchUtils'

export interface UseBatchFiltersResult {
  filters: BatchFilterState
  setLevel: (level: 'all' | CefrLevel) => void
  setMode: (mode: 'all' | LearningMode) => void
  setStatus: (status: 'all' | BatchStatus) => void
  setDateRange: (range: 'all' | 'this-month' | 'next-month') => void
  setSelectedDate: (date: string | undefined) => void
  resetFilters: () => void
  filteredBatches: Batch[]
  upcomingBatches: Batch[]
  totalPublishedCount: number
  activeFilterCount: number
}

export function useBatchFilters(
  initialBatches: Batch[] = BATCHES_DATA,
  referenceDate?: Date
): UseBatchFiltersResult {
  const [filters, setFilters] = useState<BatchFilterState>(INITIAL_BATCH_FILTERS)
  const [effectiveRefDate] = useState<Date>(() => referenceDate ?? new Date())

  const setLevel = (level: 'all' | CefrLevel) => {
    setFilters((prev) => ({ ...prev, level }))
  }

  const setMode = (mode: 'all' | LearningMode) => {
    setFilters((prev) => ({ ...prev, mode }))
  }

  const setStatus = (status: 'all' | BatchStatus) => {
    setFilters((prev) => ({ ...prev, status }))
  }

  const setDateRange = (dateRange: 'all' | 'this-month' | 'next-month') => {
    setFilters((prev) => ({ ...prev, dateRange }))
  }

  const setSelectedDate = (selectedDate: string | undefined) => {
    setFilters((prev) => ({ ...prev, selectedDate }))
  }

  const resetFilters = () => {
    setFilters(INITIAL_BATCH_FILTERS)
  }

  // All published batches
  const publishedBatches = useMemo(() => {
    return initialBatches.filter((b) => b.published)
  }, [initialBatches])

  // Filtered batches according to active filters
  const filteredBatches = useMemo(() => {
    const res = filterBatches(publishedBatches, filters, effectiveRefDate)
    return sortBatchesByStartDate(res, true)
  }, [publishedBatches, filters, effectiveRefDate])

  // Filtered batches that are strictly upcoming (today or future) for the list view
  const upcomingBatches = useMemo(() => {
    const upcoming = filteredBatches.filter((b) => isBatchUpcoming(b, effectiveRefDate))
    return sortBatchesByStartDate(upcoming, true)
  }, [filteredBatches, effectiveRefDate])

  const activeFilterCount = useMemo(() => {
    return countActiveFilters(filters)
  }, [filters])

  return {
    filters,
    setLevel,
    setMode,
    setStatus,
    setDateRange,
    setSelectedDate,
    resetFilters,
    filteredBatches,
    upcomingBatches,
    totalPublishedCount: publishedBatches.length,
    activeFilterCount,
  }
}
