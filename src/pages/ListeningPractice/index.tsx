import React, { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { CefrLevel } from '@/types'
import { LISTENING_EXERCISES } from '@/data/listening/exercises'
import {
  ListeningHero,
  ListeningLevelSelector,
  ListeningCategoryFilters,
  ListeningExerciseGrid,
  ListeningExerciseWorkspace,
  ListeningProgressDashboard,
  useListeningProgress,
  useListeningFilters,
  ListeningExerciseType,
  SortOption,
} from '@/features/listening'
import { Search, SlidersHorizontal } from 'lucide-react'

export const ListeningPracticePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    progress,
    recordAttempt,
    resetProgress,
    totalCompleted,
    totalMinutes,
    averageScore,
    streakDays,
  } = useListeningProgress()

  // Read URL parameters
  const exerciseParam = searchParams.get('exercise')
  const levelParam = (searchParams.get('level')?.toUpperCase() as CefrLevel) || undefined

  // Active exercise lookup
  const activeExercise = useMemo(() => {
    if (!exerciseParam) return null
    return LISTENING_EXERCISES.find((ex) => ex.id === exerciseParam) || null
  }, [exerciseParam])

  // Filters hook
  const {
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
    filteredExercises,
    resetFilters,
  } = useListeningFilters({
    exercises: LISTENING_EXERCISES,
    completedIds: progress.completedExerciseIds,
    initialLevel: levelParam && ['A1', 'A2', 'B1', 'B2', 'C1'].includes(levelParam) ? levelParam : 'all',
  })

  // Level selector handlers
  const handleSelectLevel = (level: CefrLevel | 'all') => {
    setSelectedLevel(level)
    const nextParams = new URLSearchParams(searchParams)
    if (level === 'all') {
      nextParams.delete('level')
    } else {
      nextParams.set('level', level.toLowerCase())
    }
    setSearchParams(nextParams, { replace: true })
  }

  // Exercise selection handler
  const handleSelectExercise = (exercise: (typeof LISTENING_EXERCISES)[0]) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('exercise', exercise.id)
    setSearchParams(nextParams)
  }

  // Back to library
  const handleBackToLibrary = () => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.delete('exercise')
    setSearchParams(nextParams)
  }

  // Next / Previous exercise navigation in current filtered list
  const activeIndex = activeExercise
    ? LISTENING_EXERCISES.findIndex((ex) => ex.id === activeExercise.id)
    : -1

  const handleNextExercise =
    activeIndex >= 0 && activeIndex < LISTENING_EXERCISES.length - 1
      ? () => handleSelectExercise(LISTENING_EXERCISES[activeIndex + 1])
      : undefined

  const handlePrevExercise =
    activeIndex > 0
      ? () => handleSelectExercise(LISTENING_EXERCISES[activeIndex - 1])
      : undefined

  // Level completed counts
  const completedCountByLevel = useMemo(() => {
    const counts: Record<string, number> = {}
    progress.completedExerciseIds.forEach((id) => {
      const ex = LISTENING_EXERCISES.find((e) => e.id === id)
      if (ex) {
        counts[ex.level] = (counts[ex.level] || 0) + 1
      }
    })
    return counts
  }, [progress.completedExerciseIds])

  return (
    <div className="min-h-screen bg-[#F7F5F0] pb-20">
      {/* 1. HERO BANNER */}
      <ListeningHero />

      <Container size="xl" className="pt-8 sm:pt-10 space-y-8">
        {activeExercise ? (
          /* 2. FOCUSED EXERCISE WORKSPACE */
          <ListeningExerciseWorkspace
            key={activeExercise.id}
            exercise={activeExercise}
            onBackToLibrary={handleBackToLibrary}
            onRecordAttempt={recordAttempt}
            onNextExercise={handleNextExercise}
            onPrevExercise={handlePrevExercise}
          />
        ) : (
          /* 3. EXERCISE LIBRARY BROWSER */
          <div className="space-y-8">
            {/* Progress Dashboard */}
            <ListeningProgressDashboard
              totalCompleted={totalCompleted}
              totalMinutes={totalMinutes}
              averageScore={averageScore}
              streakDays={streakDays}
              totalExercises={LISTENING_EXERCISES.length}
              onResetProgress={resetProgress}
            />

            {/* CEFR Level Selector */}
            <ListeningLevelSelector
              selectedLevel={selectedLevel}
              onSelectLevel={handleSelectLevel}
              completedCountByLevel={completedCountByLevel}
            />

            {/* Category Filter Pills */}
            <ListeningCategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

            {/* Search and Secondary Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-[6px] bg-white border border-[#DCD7CD] shadow-xs">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#89857E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Thema, Vokabel oder Stichwort suchen (z.B. Bahnhof, Kaffee, Arzt)..."
                  className="w-full h-9 pl-9 pr-3 text-xs text-[#171717] bg-[#FAF8F5] border border-[#DEDAD1] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32] placeholder:text-[#A09D95]"
                />
              </div>

              {/* Sort & Type Filter Dropdowns */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5 text-xs text-[#55534F]">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#89857E]" />
                  <span className="hidden sm:inline">Übungstyp:</span>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value as ListeningExerciseType | 'all')}
                    className="h-9 px-2 text-xs text-[#171717] bg-[#FAF8F5] border border-[#DEDAD1] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#C83B32]"
                  >
                    <option value="all">Alle Typen</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">Richtig/Falsch</option>
                    <option value="fill-blank">Lückentext</option>
                    <option value="conversation">Dialogverständnis</option>
                    <option value="announcement">Durchsage</option>
                    <option value="dictation">Diktat</option>
                  </select>
                </div>

                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="h-9 px-2 text-xs text-[#171717] bg-[#FAF8F5] border border-[#DEDAD1] rounded-[4px] focus:outline-none focus:ring-1 focus:ring-[#C83B32]"
                >
                  <option value="recommended">Empfohlen (Audio zuerst)</option>
                  <option value="duration-asc">Kürzeste Dauer</option>
                  <option value="difficulty">Nach Schwierigkeit</option>
                </select>
              </div>
            </div>

            {/* Exercise Results Header */}
            <div className="flex items-center justify-between text-xs text-[#55534F] px-1">
              <span>
                Zeige <strong>{filteredExercises.length}</strong> von {LISTENING_EXERCISES.length} Übungen
              </span>
              <span className="text-[11px] text-[#89857E]">
                10 spielbare Audio-Module &bull; 26 Lehrplan-Module in Studioproduktion
              </span>
            </div>

            {/* Exercise Grid */}
            <ListeningExerciseGrid
              exercises={filteredExercises}
              bestScores={progress.bestScores}
              completedIds={progress.completedExerciseIds}
              onSelectExercise={handleSelectExercise}
              onResetFilters={resetFilters}
            />
          </div>
        )}
      </Container>
    </div>
  )
}
