import React from 'react'
import { CefrLevel } from '@/types'
import {
  COMPARISON_CATEGORIES,
  ALL_CEFR_LEVELS,
  COURSE_COMPARISON_LEVELS,
  ComparisonCategoryItem,
} from '@/data/courseComparison'
import { Check, Sparkles } from 'lucide-react'

interface CourseComparisonTableProps {
  selectedLevel: CefrLevel
  onSelectLevel: (level: CefrLevel) => void
  className?: string
}

const GROUP_LABELS: Record<ComparisonCategoryItem['categoryGroup'], string> = {
  overview: 'Curriculum Foundations & Overview',
  skills: 'CEFR Four-Pillar Language Capabilities',
  linguistics: 'Linguistic Coverage & Lexical Breadth',
  logistics: 'Academic Logistics, Duration & Certification',
}

export const CourseComparisonTable: React.FC<CourseComparisonTableProps> = ({
  selectedLevel,
  onSelectLevel,
  className = '',
}) => {
  // Group categories
  const groups: ComparisonCategoryItem['categoryGroup'][] = [
    'overview',
    'skills',
    'linguistics',
    'logistics',
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between text-xs text-[#89857E] px-1">
        <span>Desktop Comparison Matrix (14 Dimensions)</span>
        <span className="hidden sm:inline-block">Click any column header to focus that level</span>
      </div>

      <div className="overflow-x-auto rounded-[6px] border border-[#DEDAD1] shadow-sm skeuo-paper">
        <table className="w-full text-left text-xs border-collapse min-w-[840px]">
          <caption className="sr-only">
            D9W A1 to C1 German Course Comparison Matrix across 14 dimensions
          </caption>
          <thead>
            <tr className="border-b-2 border-[#DEDAD1] bg-[#E8E5DD]/70">
              <th
                scope="col"
                className="p-4 font-heading font-extrabold text-[#171717] uppercase tracking-wider text-[11px] w-[220px] sticky left-0 bg-[#E8E5DD] z-10 border-r border-[#DEDAD1]"
              >
                Comparison Dimension
              </th>
              {ALL_CEFR_LEVELS.map((lvl) => {
                const info = COURSE_COMPARISON_LEVELS[lvl]
                const isSelected = selectedLevel === lvl
                return (
                  <th
                    key={lvl}
                    scope="col"
                    onClick={() => onSelectLevel(lvl)}
                    className={`p-3.5 text-center cursor-pointer transition-colors border-r border-[#DEDAD1] last:border-r-0 ${
                      isSelected
                        ? 'bg-[#C83B32]/10 relative'
                        : 'hover:bg-[#E8E5DD]'
                    }`}
                  >
                    {isSelected && (
                      <div
                        className="absolute top-0 left-0 right-0 h-1 bg-[#C83B32]"
                        aria-hidden="true"
                      />
                    )}
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`w-7 h-7 rounded-[4px] font-heading font-extrabold text-xs flex items-center justify-center ${
                          isSelected
                            ? 'skeuo-button-primary text-[#FFFFFF]'
                            : 'skeuo-button-dark text-[#FFFFFF]'
                        }`}
                      >
                        {lvl}
                      </span>
                      <span className="font-heading font-bold text-xs text-[#171717]">
                        {info.badgeLabel}
                      </span>
                      <span className="text-[10px] text-[#89857E] font-medium">
                        {info.durationWeeks} Wks • {info.hoursTotal}h
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#C83B32] mt-0.5">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>Focused</span>
                        </span>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {groups.map((groupKey) => {
              const groupCategories = COMPARISON_CATEGORIES.filter(
                (c) => c.categoryGroup === groupKey
              )

              return (
                <React.Fragment key={groupKey}>
                  {/* Category Section Group Header */}
                  <tr className="bg-[#E8E5DD]/40 border-y border-[#DEDAD1]">
                    <td
                      colSpan={6}
                      className="px-4 py-2 text-[11px] font-mono font-bold uppercase tracking-wider text-[#171717]"
                    >
                      {GROUP_LABELS[groupKey]}
                    </td>
                  </tr>

                  {/* Dimension Rows */}
                  {groupCategories.map((cat, rowIdx) => {
                    const isEven = rowIdx % 2 === 0
                    return (
                      <tr
                        key={cat.id}
                        className={`border-b border-[#DEDAD1]/70 transition-colors ${
                          isEven ? 'bg-[#FFFFFF]' : 'bg-[#FAF8F5]'
                        }`}
                      >
                        {/* Row Header */}
                        <th
                          scope="row"
                          className="p-3.5 font-heading font-bold text-[#171717] text-xs sticky left-0 bg-inherit border-r border-[#DEDAD1] z-10"
                        >
                          <div>{cat.label}</div>
                          {cat.description && (
                            <div className="text-[10px] font-normal text-[#89857E] mt-0.5">
                              {cat.description}
                            </div>
                          )}
                        </th>

                        {/* Level Columns */}
                        {ALL_CEFR_LEVELS.map((lvl) => {
                          const isSelected = selectedLevel === lvl
                          const val = cat.values[lvl]

                          return (
                            <td
                              key={lvl}
                              onClick={() => onSelectLevel(lvl)}
                              className={`p-3.5 align-top text-xs leading-relaxed border-r border-[#DEDAD1] last:border-r-0 cursor-pointer transition-colors ${
                                isSelected
                                  ? 'bg-[#C83B32]/5 font-medium text-[#171717]'
                                  : 'text-[#55534F] hover:bg-[#E8E5DD]/20'
                              }`}
                            >
                              <div className="flex items-start gap-1.5">
                                {isSelected && (
                                  <Check className="w-3.5 h-3.5 text-[#C83B32] shrink-0 mt-0.5" />
                                )}
                                <span>{val}</span>
                              </div>
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
