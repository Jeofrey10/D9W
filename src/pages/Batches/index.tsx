import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { BATCHES_DATA, Batch, BatchStatus, LearningMode } from '@/data/batches'
import type { CefrLevel } from '@/types'
import { useTranslation } from '@/i18n'
import {
  BatchFilters,
  BatchViewToggle,
  BatchViewMode,
  BatchCalendar,
  BatchList,
  BatchDetailModal,
  useBatchFilters,
  useBatchCalendar,
} from '@/features/batches'
import {
  CalendarDays,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  TableProperties,
} from 'lucide-react'

export const BatchesPage: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()

  // Initialize view mode from URL param or default to 'calendar'
  const viewParam = searchParams.get('view')
  const [viewMode, setViewMode] = useState<BatchViewMode>(
    viewParam === 'list' ? 'list' : 'calendar'
  )

  // Modal inspection state
  const [activeModalBatch, setActiveModalBatch] = useState<Batch | null>(null)

  // Batch filtering hook
  const {
    filters,
    setLevel,
    setMode,
    setStatus,
    setDateRange,
    setSelectedDate,
    resetFilters,
    filteredBatches,
    upcomingBatches,
    activeFilterCount,
  } = useBatchFilters(BATCHES_DATA)

  // Interactive calendar hook
  const {
    selectedDate,
    calendarGrid,
    batchesByDate,
    monthLabelDe,
    isViewingCurrentMonth,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    selectDate,
  } = useBatchCalendar(filteredBatches)

  const handleViewChange = (mode: BatchViewMode) => {
    setViewMode(mode)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (mode === 'list') {
        next.set('view', 'list')
      } else {
        next.delete('view')
      }
      return next
    })
  }

  return (
    <div className="py-10 sm:py-16 space-y-12">
      <Container size="xl">
        {/* SECTION A — Editorial Hero */}
        <div className="skeuo-paper-stacked rounded-[8px] p-6 sm:p-12 border border-[#DEDAD1] relative overflow-hidden">
          {/* Top Tricolor Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 flex" aria-hidden="true">
            <div className="flex-1 bg-[#171717]" />
            <div className="flex-1 bg-[#C83B32]" />
            <div className="flex-1 bg-[#D7B95D]" />
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8E5DD] text-xs font-mono font-semibold uppercase tracking-widest text-[#171717] border border-[#DEDAD1]">
              <CalendarDays className="w-3.5 h-3.5 text-[#C83B32]" />
              <span>{t('batches.hero.eyebrow')}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#171717] tracking-tight">
              {t('batches.hero.title')}
            </h1>

            <p className="text-base sm:text-lg text-[#55534F] leading-relaxed">
              {t('batches.hero.subtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#55534F]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
                <span>{t('batches.hero.badge1')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D7B95D]" />
                <span>{t('batches.hero.badge2')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-[#1E4F8A]" />
                <span>{t('batches.hero.badge3')}</span>
              </span>
            </div>
          </div>
        </div>

        {/* SECTION B — Filter Control Desk & View Switcher */}
        <div className="mt-8 space-y-6">
          <BatchFilters
            filters={filters}
            onLevelChange={(lvl: 'all' | CefrLevel) => setLevel(lvl)}
            onModeChange={(m: 'all' | LearningMode) => setMode(m)}
            onStatusChange={(s: 'all' | BatchStatus) => setStatus(s)}
            onDateRangeChange={(r: 'all' | 'this-month' | 'next-month') => setDateRange(r)}
            onResetFilters={resetFilters}
            matchingCount={viewMode === 'calendar' ? filteredBatches.length : upcomingBatches.length}
            activeFilterCount={activeFilterCount}
          />

          {/* Presentation Toggle & Context Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="text-xs text-[#89857E] font-medium">
              <span>Displaying </span>
              <strong className="text-[#171717]">
                {viewMode === 'calendar' ? `${filteredBatches.length} Batches in View` : `${upcomingBatches.length} Upcoming Batches`}
              </strong>
            </div>

            <BatchViewToggle
              viewMode={viewMode}
              onChangeView={handleViewChange}
              upcomingCount={upcomingBatches.length}
            />
          </div>

          {/* SECTION C — Calendar or List View */}
          <div className="pt-2">
            {viewMode === 'calendar' ? (
              <BatchCalendar
                monthLabelDe={monthLabelDe}
                isViewingCurrentMonth={isViewingCurrentMonth}
                calendarGrid={calendarGrid}
                batchesByDate={batchesByDate}
                selectedDate={selectedDate}
                onPreviousMonth={goToPreviousMonth}
                onNextMonth={goToNextMonth}
                onGoToToday={goToToday}
                onSelectDate={(isoDate) => {
                  selectDate(isoDate)
                  setSelectedDate(isoDate)
                }}
                onViewDetails={(batch) => setActiveModalBatch(batch)}
              />
            ) : (
              <BatchList
                batches={upcomingBatches}
                onViewDetails={(batch) => setActiveModalBatch(batch)}
                onResetFilters={resetFilters}
              />
            )}
          </div>
        </div>

        {/* SECTION G — Course Connection & Curriculum Support Banner */}
        <div className="mt-16 p-6 sm:p-8 skeuo-paper rounded-[6px] border border-[#DEDAD1] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="font-heading font-extrabold text-lg text-[#171717]">
              Need Help Choosing the Right CEFR Level?
            </h3>
            <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
              Compare German curriculum levels side-by-side or take our 15-minute diagnostic evaluation based on official European standards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Button
              to="/courses"
              variant="secondary"
              size="sm"
              leftIcon={<TableProperties className="w-4 h-4 text-[#C83B32]" />}
            >
              Compare Levels (A1–C1)
            </Button>

            <Button
              to="/assessment"
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Free Assessment
            </Button>
          </div>
        </div>
      </Container>

      {/* SECTION D — Batch Detail Modal */}
      <BatchDetailModal
        batch={activeModalBatch}
        isOpen={Boolean(activeModalBatch)}
        onClose={() => setActiveModalBatch(null)}
      />
    </div>
  )
}
