import React from 'react'
import type { CefrLevel } from '@/types'
import { BatchStatus, LearningMode } from '@/data/batches'
import { BatchFilterState } from '../utils/batchUtils'
import { RotateCcw, Filter, Check } from 'lucide-react'

interface BatchFiltersProps {
  filters: BatchFilterState
  onLevelChange: (level: 'all' | CefrLevel) => void
  onModeChange: (mode: 'all' | LearningMode) => void
  onStatusChange: (status: 'all' | BatchStatus) => void
  onDateRangeChange: (range: 'all' | 'this-month' | 'next-month') => void
  onResetFilters: () => void
  matchingCount: number
  activeFilterCount: number
  className?: string
}

const LEVELS: ('all' | CefrLevel)[] = ['all', 'A1', 'A2', 'B1', 'B2', 'C1']
const MODES: { value: 'all' | LearningMode; label: string }[] = [
  { value: 'all', label: 'All Modes' },
  { value: 'online', label: 'Online Live' },
  { value: 'offline', label: 'Offline Campus' },
]
const STATUSES: { value: 'all' | BatchStatus; label: string }[] = [
  { value: 'all', label: 'All Statuses' },
  { value: 'open', label: 'Open' },
  { value: 'filling-fast', label: 'Filling Fast' },
  { value: 'full', label: 'Full' },
  { value: 'coming-soon', label: 'Coming Soon' },
]
const DATES: { value: 'all' | 'this-month' | 'next-month'; label: string }[] = [
  { value: 'all', label: 'All Upcoming' },
  { value: 'this-month', label: 'This Month' },
  { value: 'next-month', label: 'Next Month' },
]

export const BatchFilters: React.FC<BatchFiltersProps> = ({
  filters,
  onLevelChange,
  onModeChange,
  onStatusChange,
  onDateRangeChange,
  onResetFilters,
  matchingCount,
  activeFilterCount,
  className = '',
}) => {
  return (
    <div
      className={`skeuo-paper rounded-[6px] p-5 sm:p-6 border border-[#DEDAD1] shadow-xs space-y-5 ${className}`}
    >
      {/* Top Filter Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DEDAD1]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[4px] skeuo-recessed flex items-center justify-center shrink-0">
            <Filter className="w-4 h-4 text-[#C83B32]" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-sm sm:text-base text-[#171717] leading-none">
              Filter Batch Schedule
            </h3>
            <span className="text-[11px] font-semibold text-[#89857E]">
              Showing {matchingCount} verified published {matchingCount === 1 ? 'batch' : 'batches'}
            </span>
          </div>
        </div>

        {/* Reset Filter Action */}
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[4px] bg-[#C83B32]/10 text-[#C83B32] border border-[#C83B32]/20">
              {activeFilterCount} Active
            </span>
          )}

          <button
            type="button"
            onClick={onResetFilters}
            disabled={activeFilterCount === 0}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-bold transition-all ${
              activeFilterCount > 0
                ? 'skeuo-button-secondary text-[#171717] hover:text-[#C83B32] cursor-pointer'
                : 'text-[#89857E] opacity-50 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Level Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] block">
            CEFR Level
          </label>
          <div className="flex flex-wrap gap-1 p-1 rounded-[5px] skeuo-recessed bg-[#FAF8F5]">
            {LEVELS.map((lvl) => {
              const isSelected = filters.level === lvl
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onLevelChange(lvl)}
                  className={`px-2.5 py-1 text-xs font-heading font-bold rounded-[3px] transition-all cursor-pointer ${
                    isSelected
                      ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
                      : 'text-[#55534F] hover:text-[#171717] hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Mode Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] block">
            Learning Mode
          </label>
          <div className="flex gap-1 p-1 rounded-[5px] skeuo-recessed bg-[#FAF8F5]">
            {MODES.map((mode) => {
              const isSelected = filters.mode === mode.value
              return (
                <button
                  key={mode.value}
                  type="button"
                  onClick={() => onModeChange(mode.value)}
                  className={`flex-1 py-1 px-1.5 text-center text-xs font-bold rounded-[3px] transition-all cursor-pointer truncate ${
                    isSelected
                      ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
                      : 'text-[#55534F] hover:text-[#171717] hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  {mode.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Status Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] block">
            Registration Status
          </label>
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => onStatusChange(e.target.value as 'all' | BatchStatus)}
              className="w-full text-xs font-semibold py-2 px-3 rounded-[5px] skeuo-input bg-[#FFFFFF] border border-[#DEDAD1] text-[#171717] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
            >
              {STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Date Range Filter */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717] block">
            Timeline
          </label>
          <div className="flex gap-1 p-1 rounded-[5px] skeuo-recessed bg-[#FAF8F5]">
            {DATES.map((date) => {
              const isSelected = filters.dateRange === date.value
              return (
                <button
                  key={date.value}
                  type="button"
                  onClick={() => onDateRangeChange(date.value)}
                  className={`flex-1 py-1 px-1.5 text-center text-xs font-bold rounded-[3px] transition-all cursor-pointer truncate ${
                    isSelected
                      ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
                      : 'text-[#55534F] hover:text-[#171717] hover:bg-[#FFFFFF]/70'
                  }`}
                >
                  {date.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Selected Specific Date Banner (when date is selected from calendar) */}
      {filters.selectedDate && (
        <div className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#C83B32]/5 border border-[#C83B32]/30 text-xs text-[#171717]">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-[#C83B32]" />
            <span>
              Filtering for date: <strong>{filters.selectedDate}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={() => onResetFilters()}
            className="text-[11px] font-bold text-[#C83B32] hover:underline cursor-pointer"
          >
            Clear Date Lock
          </button>
        </div>
      )}
    </div>
  )
}
