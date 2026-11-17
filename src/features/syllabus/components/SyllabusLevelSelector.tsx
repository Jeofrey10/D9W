import React from 'react'
import type { CefrLevel } from '@/types'
import { ALL_SYLLABUS_LEVELS, SYLLABUS_DATA } from '@/data/syllabus'
import { Sparkles, ArrowRight } from 'lucide-react'

interface SyllabusLevelSelectorProps {
  selectedLevel: CefrLevel
  onSelectLevel: (level: CefrLevel) => void
  className?: string
}

export const SyllabusLevelSelector: React.FC<SyllabusLevelSelectorProps> = ({
  selectedLevel,
  onSelectLevel,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-[#89857E] uppercase tracking-wider px-1">
        <span>Select CEFR Course Level</span>
        <span className="font-mono text-[11px] text-[#C83B32]">5 Modular Curricula</span>
      </div>

      <div
        role="tablist"
        aria-label="CEFR Course Levels for Syllabus Generation"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
      >
        {ALL_SYLLABUS_LEVELS.map((lvl, index) => {
          const item = SYLLABUS_DATA[lvl]
          const isSelected = selectedLevel === lvl

          return (
            <button
              key={lvl}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`syllabus-content-${lvl}`}
              id={`syllabus-tab-${lvl}`}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectLevel(lvl)}
              className={`text-left p-4 rounded-[6px] transition-all duration-150 cursor-pointer relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83B32] ${
                isSelected
                  ? 'skeuo-paper-stacked border-2 border-[#C83B32] shadow-md -translate-y-1'
                  : 'skeuo-flashcard hover:-translate-y-0.5 hover:border-[#C83B32]/40'
              }`}
            >
              {/* Top Accent Ledger Indicator for Selected Level */}
              {isSelected && (
                <div
                  className="absolute -top-1.5 left-4 right-4 h-1 bg-[#C83B32] rounded-full"
                  aria-hidden="true"
                />
              )}

              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`w-9 h-9 rounded-[5px] font-heading font-extrabold text-base flex items-center justify-center shrink-0 transition-transform ${
                    isSelected
                      ? 'skeuo-button-primary text-[#FFFFFF] shadow-sm scale-105'
                      : 'skeuo-button-dark text-[#FFFFFF]'
                  }`}
                >
                  {item.level}
                </span>

                <span
                  className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded-[4px] ${
                    isSelected
                      ? 'bg-[#C83B32]/10 text-[#C83B32] border border-[#C83B32]/30'
                      : 'bg-[#E8E5DD] text-[#55534F]'
                  }`}
                >
                  Step {index + 1} / 5
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold text-sm text-[#171717] leading-snug">
                  {item.title.split(' ')[0]} {item.title.split(' ')[1]}
                </h3>
                <p className="text-[11px] font-semibold text-[#89857E] mt-0.5 truncate">
                  {item.durationWeeks} Wks • {item.hoursTotal} Hours
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#DEDAD1] flex items-center justify-between text-[11px]">
                <span className="font-semibold text-[#55534F]">
                  {item.modules.length} Modules
                </span>
                <span
                  className={`flex items-center gap-1 font-bold ${
                    isSelected ? 'text-[#C83B32]' : 'text-[#89857E]'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span>Active</span>
                      <Sparkles className="w-3 h-3 text-[#C83B32] animate-pulse" />
                    </>
                  ) : (
                    <>
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
