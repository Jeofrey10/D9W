import React from 'react'
import { Link } from 'react-router-dom'
import { CefrLevel } from '@/types'
import { ALL_CEFR_LEVELS, COURSE_COMPARISON_LEVELS } from '@/data/courseComparison'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

interface CourseProgressionProps {
  selectedLevel: CefrLevel
  onSelectLevel: (level: CefrLevel) => void
  className?: string
}

export const CourseProgression: React.FC<CourseProgressionProps> = ({
  selectedLevel,
  onSelectLevel,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#C83B32] font-semibold block">
            Systematic Curriculum Architecture
          </span>
          <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#171717]">
            The D9W Learning Progression (A1 &rarr; C1)
          </h3>
        </div>
        <span className="text-xs text-[#89857E]">
          Sequential Mastery Aligned with CEFR
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {ALL_CEFR_LEVELS.map((lvl, index) => {
          const item = COURSE_COMPARISON_LEVELS[lvl]
          const isSelected = selectedLevel === lvl
          const isLast = index === ALL_CEFR_LEVELS.length - 1

          return (
            <div
              key={lvl}
              className={`rounded-[6px] p-4 flex flex-col justify-between transition-all relative ${
                isSelected
                  ? 'skeuo-paper-stacked border-2 border-[#C83B32] shadow-sm'
                  : 'skeuo-paper border border-[#DEDAD1] hover:border-[#171717]/40'
              }`}
            >
              {/* Connector Arrow on Desktop */}
              {!isLast && (
                <div
                  className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#FFFFFF] border border-[#DEDAD1] items-center justify-center text-[#89857E] shadow-2xs"
                  aria-hidden="true"
                >
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectLevel(lvl)}
                    className="flex items-center gap-2 group cursor-pointer text-left"
                  >
                    <span
                      className={`w-8 h-8 rounded-[4px] font-heading font-extrabold text-sm flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isSelected
                          ? 'skeuo-button-primary text-[#FFFFFF]'
                          : 'skeuo-button-dark text-[#FFFFFF]'
                      }`}
                    >
                      {item.level}
                    </span>
                    <div>
                      <h4 className="font-heading font-bold text-xs text-[#171717] group-hover:text-[#C83B32]">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-[#89857E] font-medium block">
                        Step {item.progressionOrder}
                      </span>
                    </div>
                  </button>

                  {isSelected && (
                    <span className="text-[10px] font-mono font-bold text-[#C83B32] uppercase px-1.5 py-0.5 rounded-[3px] bg-[#C83B32]/10">
                      Active
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#55534F] leading-relaxed pt-1 min-h-[48px]">
                  {item.milestone}
                </p>
              </div>

              {/* Link to Level-Specific Course Detail Page */}
              <div className="pt-3 mt-3 border-t border-[#DEDAD1] flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-[#89857E]">
                  {item.hoursTotal} Hours
                </span>
                <Link
                  to={`/syllabus?level=${item.id}`}
                  className="inline-flex items-center gap-1 font-bold text-[#171717] hover:text-[#C83B32] text-[11px] underline-offset-2 hover:underline"
                >
                  <span>Syllabus PDF</span>
                  <CheckCircle2 className="w-3 h-3 text-[#2A684C]" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
