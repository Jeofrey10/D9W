import React from 'react'
import { ListeningCategoryKey } from '../types/listening.types'
import { LISTENING_CATEGORIES, ALL_CATEGORY_KEYS } from '@/data/listening/categories'

interface ListeningCategoryFiltersProps {
  selectedCategory: ListeningCategoryKey | 'all'
  onSelectCategory: (cat: ListeningCategoryKey | 'all') => void
}

export const ListeningCategoryFilters: React.FC<ListeningCategoryFiltersProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
          Themenfelder &amp; Alltagssituationen (Categories)
        </label>
        {selectedCategory !== 'all' && (
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className="text-[11px] text-[#C83B32] hover:underline cursor-pointer"
          >
            Alle Themen (Show All)
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all border ${
            selectedCategory === 'all'
              ? 'bg-[#171717] text-white border-[#171717] shadow-xs'
              : 'bg-white text-[#55534F] border-[#DCD7CD] hover:border-[#171717]'
          } cursor-pointer`}
        >
          Alle Kategorien
        </button>

        {ALL_CATEGORY_KEYS.map((catKey) => {
          const cat = LISTENING_CATEGORIES[catKey]
          const isSelected = selectedCategory === catKey

          return (
            <button
              type="button"
              key={catKey}
              onClick={() => onSelectCategory(catKey)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#C83B32] text-white border-[#C83B32] font-semibold shadow-xs'
                  : 'bg-white text-[#55534F] border-[#DCD7CD] hover:border-[#C83B32] hover:text-[#171717]'
              } cursor-pointer`}
            >
              <span>{cat.titleDe}</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">
                ({cat.titleEn})
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
