import { useState, useMemo } from 'react'
import {
  ReadingPassage,
  ReadingCategoryKey,
  ReadingDifficulty,
} from '../types/reading.types'
import { CefrLevel } from '@/types/learning'

export type CompletionFilter = 'ALL' | 'not-started' | 'completed'
export type ReadingSortOption = 'recommended' | 'shortest' | 'longest' | 'difficulty' | 'title'

export function useReadingFilters(
  passages: ReadingPassage[],
  completedPassageIds: string[] = []
) {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | 'ALL'>('ALL')
  const [selectedCategory, setSelectedCategory] = useState<ReadingCategoryKey | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<ReadingDifficulty | 'ALL'>('ALL')
  const [completionFilter, setCompletionFilter] = useState<CompletionFilter>('ALL')
  const [sortBy, setSortBy] = useState<ReadingSortOption>('recommended')

  const completedSet = useMemo(() => new Set(completedPassageIds), [completedPassageIds])

  const filteredPassages = useMemo(() => {
    return passages
      .filter((passage) => {
        // Level filter
        if (selectedLevel !== 'ALL' && passage.level !== selectedLevel) {
          return false
        }

        // Category filter
        if (selectedCategory !== 'ALL' && passage.category !== selectedCategory) {
          return false
        }

        // Difficulty filter
        if (selectedDifficulty !== 'ALL' && passage.difficulty !== selectedDifficulty) {
          return false
        }

        // Completion status filter
        if (completionFilter === 'completed' && !completedSet.has(passage.id)) {
          return false
        }
        if (completionFilter === 'not-started' && completedSet.has(passage.id)) {
          return false
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const titleMatch =
            passage.titleGerman.toLowerCase().includes(q) ||
            passage.titleEnglish.toLowerCase().includes(q)
          const descMatch = passage.description.toLowerCase().includes(q)
          const vocabMatch = passage.keyVocabulary?.some(
            (v) =>
              v.word.toLowerCase().includes(q) ||
              v.englishMeaning.toLowerCase().includes(q)
          )
          if (!titleMatch && !descMatch && !vocabMatch) {
            return false
          }
        }

        return true
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'shortest':
            return a.wordCount - b.wordCount
          case 'longest':
            return b.wordCount - a.wordCount
          case 'difficulty': {
            const diffRank: Record<ReadingDifficulty, number> = {
              easy: 1,
              moderate: 2,
              challenging: 3,
            }
            return diffRank[a.difficulty] - diffRank[b.difficulty]
          }
          case 'title':
            return a.titleGerman.localeCompare(b.titleGerman)
          case 'recommended':
          default: {
            // Published first, then by CEFR level order
            if (a.status === 'published' && b.status !== 'published') return -1
            if (b.status === 'published' && a.status !== 'published') return 1
            const levelOrder = ['A1', 'A2', 'B1', 'B2', 'C1']
            return levelOrder.indexOf(a.level) - levelOrder.indexOf(b.level)
          }
        }
      })
  }, [
    passages,
    selectedLevel,
    selectedCategory,
    selectedDifficulty,
    completionFilter,
    searchQuery,
    sortBy,
    completedSet,
  ])

  const resetFilters = () => {
    setSelectedLevel('ALL')
    setSelectedCategory('ALL')
    setSearchQuery('')
    setSelectedDifficulty('ALL')
    setCompletionFilter('ALL')
    setSortBy('recommended')
  }

  return {
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    selectedDifficulty,
    setSelectedDifficulty,
    completionFilter,
    setCompletionFilter,
    sortBy,
    setSortBy,
    filteredPassages,
    totalCount: passages.length,
    filteredCount: filteredPassages.length,
    resetFilters,
  }
}
