import React from 'react'
import { ReadingCategoryKey } from '../types/reading.types'
import { READING_CATEGORIES } from '@/data/reading/categories'
import { cn } from '@/lib/utils'

interface ReadingCategoryFiltersProps {
  selectedCategory: ReadingCategoryKey | 'ALL'
  onSelectCategory: (category: ReadingCategoryKey | 'ALL') => void
}

export const ReadingCategoryFilters: React.FC<ReadingCategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E]">
          Themenbereich filtern
        </h3>
        {selectedCategory !== 'ALL' && (
          <button
            type="button"
            onClick={() => onSelectCategory('ALL')}
            className="text-xs font-semibold text-[#C83B32] hover:underline"
          >
            Alle Themen
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {/* ALL Option */}
        <button
          type="button"
          onClick={() => onSelectCategory('ALL')}
          className={cn(
            'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all',
            selectedCategory === 'ALL'
              ? 'border-[#171717] bg-[#171717] text-white shadow-sm'
              : 'border-[#DEDAD1] bg-white text-[#55534F] hover:bg-[#FAF8F5]'
          )}
        >
          Alle Themen (12)
        </button>

        {/* 12 Categories */}
        {READING_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.key

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onSelectCategory(cat.key)}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all',
                isSelected
                  ? 'border-[#C83B32] bg-[#C83B32] text-white shadow-sm'
                  : 'border-[#DEDAD1] bg-white text-[#55534F] hover:bg-[#FAF8F5]'
              )}
            >
              {cat.titleGerman}
            </button>
          )
        })}
      </div>
    </div>
  )
}
