import { useState, useMemo } from 'react'
import { CefrLevel } from '@/types'
import {
  ListeningExercise,
  ListeningCategoryKey,
  ListeningExerciseType,
} from '../types/listening.types'

export type FilterStatus = 'all' | 'completed' | 'not-started'
export type SortOption = 'recommended' | 'duration-asc' | 'difficulty'

interface UseListeningFiltersProps {
  exercises: ListeningExercise[]
  completedIds: string[]
  initialLevel?: CefrLevel | 'all'
}

export function useListeningFilters({
  exercises,
  completedIds,
  initialLevel = 'A1',
}: UseListeningFiltersProps) {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | 'all'>(initialLevel)
  const [selectedCategory, setSelectedCategory] = useState<ListeningCategoryKey | 'all'>('all')
  const [selectedType, setSelectedType] = useState<ListeningExerciseType | 'all'>('all')
  const [selectedStatus, setSelectedStatus] = useState<FilterStatus>('all')
  const [sortOption, setSortOption] = useState<SortOption>('recommended')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredExercises = useMemo(() => {
    return exercises
      .filter((ex) => {
        // Level
        if (selectedLevel !== 'all' && ex.level !== selectedLevel) return false

        // Category
        if (selectedCategory !== 'all' && ex.category !== selectedCategory) return false

        // Exercise Type
        if (selectedType !== 'all' && ex.exerciseType !== selectedType) return false

        // Status
        const isDone = completedIds.includes(ex.id)
        if (selectedStatus === 'completed' && !isDone) return false
        if (selectedStatus === 'not-started' && isDone) return false

        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const matchTitle = ex.title.toLowerCase().includes(q)
          const matchSub = ex.subtitleDe.toLowerCase().includes(q)
          const matchVoc = ex.vocabulary.some(
            (v) => v.german.toLowerCase().includes(q) || v.english.toLowerCase().includes(q)
          )
          if (!matchTitle && !matchSub && !matchVoc) return false
        }

        return true
      })
      .sort((a, b) => {
        if (sortOption === 'duration-asc') {
          return a.estimatedDurationMinutes - b.estimatedDurationMinutes
        }
        if (sortOption === 'difficulty') {
          const diffRank = { easy: 1, medium: 2, hard: 3 }
          return diffRank[a.difficulty] - diffRank[b.difficulty]
        }
        // Recommended: published/available audio first, then by ID
        if (a.published !== b.published) {
          return a.published ? -1 : 1
        }
        return a.id.localeCompare(b.id)
      })
  }, [
    exercises,
    selectedLevel,
    selectedCategory,
    selectedType,
    selectedStatus,
    searchQuery,
    sortOption,
    completedIds,
  ])

  const resetFilters = () => {
    setSelectedLevel('all')
    setSelectedCategory('all')
    setSelectedType('all')
    setSelectedStatus('all')
    setSearchQuery('')
    setSortOption('recommended')
  }

  const activeFilterCount =
    (selectedLevel !== 'all' ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedType !== 'all' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0)

  return {
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    selectedType,
    setSelectedType,
    selectedStatus,
    setSelectedStatus,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
    filteredExercises,
    resetFilters,
    activeFilterCount,
  }
}
