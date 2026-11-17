import React from 'react'
import { CefrLevel } from '@/types/learning'
import { READING_LEVELS } from '@/data/reading/levels'
import { cn } from '@/lib/utils'

interface ReadingLevelSelectorProps {
  selectedLevel: CefrLevel | 'ALL'
  onSelectLevel: (level: CefrLevel | 'ALL') => void
  completedPassageIds: string[]
  levelCounts: Record<CefrLevel, number>
}

export const ReadingLevelSelector: React.FC<ReadingLevelSelectorProps> = ({
  selectedLevel,
  onSelectLevel,
  completedPassageIds: _completedPassageIds,
  levelCounts,
}) => {
  const levels: CefrLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1']

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E]">
          Sprachniveau auswählen (CEFR Level)
        </h2>
        {selectedLevel !== 'ALL' && (
          <button
            type="button"
            onClick={() => onSelectLevel('ALL')}
            className="text-xs font-semibold text-[#C83B32] hover:underline"
          >
            Alle Stufen anzeigen
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {/* ALL Option */}
        <button
          type="button"
          onClick={() => onSelectLevel('ALL')}
          className={cn(
            'flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all cursor-pointer',
            selectedLevel === 'ALL'
              ? 'border-[#171717] bg-[#171717] text-white shadow-md'
              : 'border-[#DEDAD1] bg-white text-[#55534F] hover:bg-[#FAF8F5] hover:border-[#89857E]'
          )}
        >
          <span className="font-mono text-base font-bold">ALLE</span>
          <span className="text-[11px] mt-0.5 opacity-80">Gesamt</span>
          <span
            className={cn(
              'mt-1 rounded-full px-1.5 py-0.25 text-[10px] font-mono',
              selectedLevel === 'ALL'
                ? 'bg-[#333333] text-white'
                : 'bg-[#F7F5F0] text-[#89857E]'
            )}
          >
            36 Texte
          </span>
        </button>

        {/* 5 CEFR Levels */}
        {levels.map((lvl) => {
          const info = READING_LEVELS[lvl]
          const isSelected = selectedLevel === lvl
          const count = levelCounts[lvl] || 0

          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onSelectLevel(lvl)}
              className={cn(
                'flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all cursor-pointer',
                isSelected
                  ? 'border-[#C83B32] bg-[#C83B32] text-white shadow-md'
                  : 'border-[#DEDAD1] bg-white text-[#55534F] hover:bg-[#FAF8F5] hover:border-[#89857E]'
              )}
            >
              <span className="font-mono text-base font-bold">{lvl}</span>
              <span className="text-[11px] mt-0.5 truncate max-w-full opacity-80">
                {info.nameEnglish}
              </span>
              <span
                className={cn(
                  'mt-1 rounded-full px-1.5 py-0.25 text-[10px] font-mono',
                  isSelected
                    ? 'bg-[#9E2A24] text-white'
                    : 'bg-[#F7F5F0] text-[#89857E]'
                )}
              >
                {count} Texte
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
