import React from 'react'
import { CefrLevel } from '@/types'
import { CEFR_LISTENING_LEVELS, ALL_LISTENING_LEVELS } from '@/data/listening/levels'

interface ListeningLevelSelectorProps {
  selectedLevel: CefrLevel | 'all'
  onSelectLevel: (level: CefrLevel | 'all') => void
  completedCountByLevel?: Record<string, number>
}

export const ListeningLevelSelector: React.FC<ListeningLevelSelectorProps> = ({
  selectedLevel,
  onSelectLevel,
  completedCountByLevel = {},
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
          Wählen Sie Ihr Sprachniveau (CEFR Level)
        </label>
        {selectedLevel !== 'all' && (
          <button
            type="button"
            onClick={() => onSelectLevel('all')}
            className="text-xs text-[#C83B32] hover:underline font-semibold cursor-pointer"
          >
            Alle Niveaus anzeigen (Show All)
          </button>
        )}
      </div>

      <div
        role="tablist"
        aria-label="CEFR Listening Level Selector"
        className="grid grid-cols-2 sm:grid-cols-5 gap-3"
      >
        {ALL_LISTENING_LEVELS.map((level) => {
          const info = CEFR_LISTENING_LEVELS[level]
          const isSelected = selectedLevel === level
          const completedCount = completedCountByLevel[level] || 0

          return (
            <button
              type="button"
              role="tab"
              aria-selected={isSelected}
              key={level}
              onClick={() => onSelectLevel(level)}
              className={`p-3.5 rounded-[6px] text-left transition-all border relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#171717] text-white border-[#171717] shadow-md translate-y-0.5'
                  : 'bg-white text-[#55534F] border-[#DCD7CD] hover:border-[#171717] hover:bg-[#FAF8F5]'
              } cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`w-8 h-8 rounded-[4px] font-mono font-extrabold text-sm flex items-center justify-center ${
                    isSelected
                      ? 'bg-[#C83B32] text-white'
                      : 'bg-[#E8E5DD] text-[#171717]'
                  }`}
                >
                  {level}
                </span>

                <span
                  className={`text-[10px] font-mono ${
                    isSelected ? 'text-[#D7B95D]' : 'text-[#89857E]'
                  }`}
                >
                  {info.exerciseCount} Übungen
                </span>
              </div>

              <div>
                <h4
                  className={`text-xs font-heading font-bold ${
                    isSelected ? 'text-white' : 'text-[#171717]'
                  }`}
                >
                  {info.name}
                </h4>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    isSelected ? 'text-[#DEDAD1]' : 'text-[#89857E]'
                  }`}
                >
                  {info.recommendedSpeed}
                </p>
              </div>

              {completedCount > 0 && (
                <div className="mt-2 pt-2 border-t border-dashed border-white/20 text-[10px] text-[#4CAF50] font-semibold">
                  ✓ {completedCount} abgeschlossen
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
