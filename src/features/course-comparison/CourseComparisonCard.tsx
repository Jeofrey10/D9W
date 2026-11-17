import React from 'react'
import { CefrLevel } from '@/types'
import {
  COURSE_COMPARISON_LEVELS,
  COMPARISON_CATEGORIES,
  ALL_CEFR_LEVELS,
} from '@/data/courseComparison'
import { Clock, Award, ArrowRight, ShieldCheck, BookOpen, Layers } from 'lucide-react'

interface CourseComparisonCardProps {
  selectedLevel: CefrLevel
  onSelectLevel: (level: CefrLevel) => void
  className?: string
}

export const CourseComparisonCard: React.FC<CourseComparisonCardProps> = ({
  selectedLevel,
  onSelectLevel,
  className = '',
}) => {
  const course = COURSE_COMPARISON_LEVELS[selectedLevel]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Mobile Quick Level Switcher */}
      <div className="flex items-center justify-between gap-1.5 p-1.5 skeuo-recessed rounded-[6px]">
        {ALL_CEFR_LEVELS.map((lvl) => {
          const isSelected = selectedLevel === lvl
          return (
            <button
              key={lvl}
              type="button"
              onClick={() => onSelectLevel(lvl)}
              className={`flex-1 py-2 px-1 text-center rounded-[4px] text-xs font-heading font-extrabold transition-all cursor-pointer ${
                isSelected
                  ? 'skeuo-button-primary text-[#FFFFFF] shadow-sm'
                  : 'text-[#55534F] hover:text-[#171717] hover:bg-[#FFFFFF]/60'
              }`}
            >
              {lvl}
            </button>
          )
        })}
      </div>

      {/* Main Single-Level Cardstock */}
      <div className="skeuo-paper-stacked rounded-[6px] p-5 sm:p-6 space-y-6 border border-[#DEDAD1]">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#DEDAD1]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-[4px] skeuo-button-dark text-[#FFFFFF] font-heading font-extrabold text-sm flex items-center justify-center">
                {course.level}
              </span>
              <span className="text-xs font-mono font-semibold text-[#C83B32] uppercase tracking-wider">
                {course.stage}
              </span>
            </div>
            <h3 className="text-xl font-heading font-extrabold text-[#171717] pt-1">
              {course.name}
            </h3>
            <p className="text-xs text-[#55534F] leading-relaxed">
              {course.tagline}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="inline-block skeuo-badge px-2.5 py-1 text-xs font-bold text-[#171717] rounded-[4px]">
              {course.badgeLabel}
            </span>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="skeuo-recessed p-3 rounded-[5px] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C83B32] shrink-0" />
            <div>
              <span className="text-[10px] text-[#89857E] block uppercase font-mono">Duration</span>
              <strong className="text-[#171717] font-semibold">
                {course.durationWeeks} Wks ({course.hoursTotal}h)
              </strong>
            </div>
          </div>

          <div className="skeuo-recessed p-3 rounded-[5px] flex items-center gap-2">
            <Award className="w-4 h-4 text-[#D7B95D] shrink-0" />
            <div>
              <span className="text-[10px] text-[#89857E] block uppercase font-mono">Target Exam</span>
              <strong className="text-[#171717] font-semibold truncate block">
                {course.examTarget.split('/')[0]}
              </strong>
            </div>
          </div>
        </div>

        {/* 14 Dimension Breakdown List */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-heading font-bold text-[#171717] uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#C83B32]" />
            <span>Complete 14-Dimension Profile</span>
          </h4>

          <div className="divide-y divide-[#DEDAD1]/70 border border-[#DEDAD1] rounded-[5px] overflow-hidden bg-[#FFFFFF]">
            {COMPARISON_CATEGORIES.map((cat) => {
              const val = cat.values[selectedLevel]
              return (
                <div key={cat.id} className="p-3 text-xs flex flex-col sm:flex-row sm:items-start justify-between gap-1 sm:gap-4 hover:bg-[#FAF8F5]">
                  <span className="font-heading font-bold text-[#171717] shrink-0 sm:w-1/3">
                    {cat.label}
                  </span>
                  <span className="text-[#55534F] sm:w-2/3 leading-relaxed">
                    {val}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Real-World Scenario Spotlight */}
        <div className="skeuo-recessed p-4 rounded-[5px] space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-heading font-bold text-[#171717] uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#2A684C]" />
            <span>Real-World Application Scenario</span>
          </div>
          <p className="text-[#55534F] leading-relaxed">
            {course.realWorldScenario}
          </p>
        </div>

        {/* Milestone Progression Footer */}
        <div className="pt-3 border-t border-[#DEDAD1] flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-[#55534F]">
            <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
            <span>Prepares for <strong>{course.nextLevel}</strong></span>
          </div>

          <button
            type="button"
            onClick={() => {
              const nextIdx = (course.progressionOrder % 5)
              onSelectLevel(ALL_CEFR_LEVELS[nextIdx])
            }}
            className="inline-flex items-center gap-1 font-bold text-[#C83B32] hover:underline cursor-pointer"
          >
            <span>Next Level</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
