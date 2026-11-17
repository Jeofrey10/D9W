import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { READING_PASSAGES } from '@/data/reading/passages'
import {
  ReadingHero,
  ReadingLevelSelector,
  ReadingCategoryFilters,
  ReadingPassageGrid,
  ReadingPassageWorkspace,
  ReadingProgressDashboard,
  ReadingEmptyState,
  useReadingFilters,
  useReadingProgress,
  useReadingVocabulary,
  ReadingSortOption,
} from '@/features/reading'
import { CefrLevel } from '@/types/learning'
import { Search, ArrowUpDown } from 'lucide-react'

export const ReadingPracticePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    progress,
    recordAttempt,
    totalCompleted,
    totalMinutes,
    averageScore,
    streakDays,
  } = useReadingProgress()

  const { totalSaved } = useReadingVocabulary()

  // Selected passage from query params: ?passage=...
  const activePassageId = searchParams.get('passage')
  const activePassage = useMemo(() => {
    if (!activePassageId) return null
    return READING_PASSAGES.find((p) => p.id === activePassageId) || null
  }, [activePassageId])

  // Filters hook
  const {
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedDifficulty: _selectedDifficulty,
    setSelectedDifficulty: _setSelectedDifficulty,
    completionFilter: _completionFilter,
    setCompletionFilter: _setCompletionFilter,
    sortBy,
    setSortBy,
    filteredPassages,
    totalCount,
    filteredCount,
    resetFilters,
  } = useReadingFilters(READING_PASSAGES, progress.completedPassageIds)

  // Sync level from URL query param on mount or change: ?level=B1
  const levelParam = searchParams.get('level') as CefrLevel | null
  React.useEffect(() => {
    if (levelParam && ['A1', 'A2', 'B1', 'B2', 'C1'].includes(levelParam)) {
      setSelectedLevel(levelParam)
    }
  }, [levelParam, setSelectedLevel])

  const handleSelectLevel = (level: CefrLevel | 'ALL') => {
    setSelectedLevel(level)
    const newParams = new URLSearchParams(searchParams)
    if (level === 'ALL') {
      newParams.delete('level')
    } else {
      newParams.set('level', level)
    }
    setSearchParams(newParams, { replace: true })
  }

  const handleSelectPassage = (passageId: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set('passage', passageId)
    setSearchParams(newParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToLibrary = () => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete('passage')
    setSearchParams(newParams)
  }

  // Next / Previous passage handlers in current list
  const activeIndex = activePassage
    ? READING_PASSAGES.findIndex((p) => p.id === activePassage.id)
    : -1

  const handleNextPassage =
    activeIndex >= 0 && activeIndex < READING_PASSAGES.length - 1
      ? () => handleSelectPassage(READING_PASSAGES[activeIndex + 1].id)
      : undefined

  const handlePrevPassage =
    activeIndex > 0
      ? () => handleSelectPassage(READING_PASSAGES[activeIndex - 1].id)
      : undefined

  // Level counts map
  const levelCounts = useMemo(() => {
    const counts: Record<CefrLevel, number> = {
      A1: 0,
      A2: 0,
      B1: 0,
      B2: 0,
      C1: 0,
    }
    for (const p of READING_PASSAGES) {
      counts[p.level]++
    }
    return counts
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F5F0] pb-24">
      {/* 1. HERO BANNER */}
      <ReadingHero />

      <Container size="xl" className="pt-8 sm:pt-10 space-y-8">
        {activePassage ? (
          /* 2. FOCUSED READING WORKSPACE */
          <ReadingPassageWorkspace
            key={activePassage.id}
            passage={activePassage}
            onBackToLibrary={handleBackToLibrary}
            onRecordAttempt={recordAttempt}
            onNextPassage={handleNextPassage}
            onPrevPassage={handlePrevPassage}
          />
        ) : (
          /* 3. READING LIBRARY BROWSER */
          <div className="space-y-8">
            {/* Progress Dashboard */}
            <ReadingProgressDashboard
              totalCompleted={totalCompleted}
              totalMinutes={totalMinutes}
              averageScore={averageScore}
              streakDays={streakDays}
              totalSavedVocab={totalSaved}
              totalPassages={READING_PASSAGES.length}
            />

            {/* Level Selector */}
            <ReadingLevelSelector
              selectedLevel={selectedLevel}
              onSelectLevel={handleSelectLevel}
              completedPassageIds={progress.completedPassageIds}
              levelCounts={levelCounts}
            />

            {/* Search & Sort Bar */}
            <div className="rounded-2xl border border-[#DEDAD1] bg-white p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#89857E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Lesetexte oder Vokabeln durchsuchen..."
                  className="w-full rounded-xl border border-[#DEDAD1] bg-[#FAF8F5] pl-10 pr-4 py-2 text-xs sm:text-sm text-[#171717] focus:border-[#171717] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex items-center gap-1.5 border border-[#DEDAD1] rounded-xl px-3 py-1.5 bg-[#FAF8F5] text-xs">
                  <ArrowUpDown className="h-3.5 w-3.5 text-[#89857E]" />
                  <span className="text-[#89857E] hidden md:inline">Sortieren:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as ReadingSortOption)}
                    className="bg-transparent font-medium text-[#171717] focus:outline-none cursor-pointer"
                  >
                    <option value="recommended">Empfohlen</option>
                    <option value="shortest">Kürzeste zuerst</option>
                    <option value="longest">Längste zuerst</option>
                    <option value="difficulty">Nach Schwierigkeit</option>
                    <option value="title">Alphabetisch (A–Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <ReadingCategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Results Counter & Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-[#89857E] px-1">
                <span>
                  Zeige <strong className="text-[#171717]">{filteredCount}</strong>{' '}
                  von {totalCount} Lesetexten
                </span>
                {filteredCount < totalCount && (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="font-semibold text-[#C83B32] hover:underline"
                  >
                    Filter zurücksetzen
                  </button>
                )}
              </div>

              {filteredPassages.length > 0 ? (
                <ReadingPassageGrid
                  passages={filteredPassages}
                  completedPassageIds={progress.completedPassageIds}
                  bestScores={progress.bestScores}
                  onSelectPassage={handleSelectPassage}
                />
              ) : (
                <ReadingEmptyState onResetFilters={resetFilters} />
              )}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
