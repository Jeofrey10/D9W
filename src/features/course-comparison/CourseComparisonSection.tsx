import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CefrLevel } from '@/types'
import { COURSE_COMPARISON_LEVELS, ALL_CEFR_LEVELS } from '@/data/courseComparison'
import { CourseLevelSelector } from './CourseLevelSelector'
import { CourseComparisonTable } from './CourseComparisonTable'
import { CourseComparisonCard } from './CourseComparisonCard'
import { CourseSkillCard } from './CourseSkillCard'
import { CourseProgression } from './CourseProgression'
import { CourseEnquiryCTA } from './CourseEnquiryCTA'
import { Table, LayoutList, Award, BookCheck } from 'lucide-react'

interface CourseComparisonSectionProps {
  initialLevel?: CefrLevel
  className?: string
}

export const CourseComparisonSection: React.FC<CourseComparisonSectionProps> = ({
  initialLevel = 'A1',
  className = '',
}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const rawParam = searchParams.get('level')?.toUpperCase() as CefrLevel | undefined
  const selectedLevel: CefrLevel =
    rawParam && ALL_CEFR_LEVELS.includes(rawParam) ? rawParam : initialLevel

  const [desktopViewMode, setDesktopViewMode] = useState<'matrix' | 'card'>('matrix')

  const handleSelectLevel = (lvl: CefrLevel) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('level', lvl.toLowerCase())
      return next
    })
  }

  const currentCourse = COURSE_COMPARISON_LEVELS[selectedLevel]

  return (
    <section
      id="course-comparison"
      aria-label="Course Comparison Matrix"
      className={`space-y-12 sm:space-y-16 ${className}`}
    >
      {/* SECTION A — Editorial Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8E5DD] text-xs font-mono font-semibold uppercase tracking-widest text-[#171717] border border-[#DEDAD1]">
          <BookCheck className="w-3.5 h-3.5 text-[#C83B32]" />
          <span>D9W Course Pathway</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#171717] tracking-tight">
          Find Your German Level.
        </h2>

        <p className="text-base sm:text-lg text-[#55534F] leading-relaxed">
          From your first German words to advanced academic and professional communication, choose the level that moves you forward.
        </p>

        {/* Subtle Visual Stepper of Progression */}
        <div className="pt-2 flex items-center justify-center gap-2 sm:gap-4 text-xs font-mono font-bold text-[#89857E]">
          {ALL_CEFR_LEVELS.map((lvl, idx) => (
            <React.Fragment key={lvl}>
              <button
                type="button"
                onClick={() => handleSelectLevel(lvl)}
                className={`transition-colors cursor-pointer ${
                  selectedLevel === lvl
                    ? 'text-[#C83B32] underline underline-offset-4 font-extrabold'
                    : 'hover:text-[#171717]'
                }`}
              >
                {lvl}
              </button>
              {idx < ALL_CEFR_LEVELS.length - 1 && (
                <span className="text-[#DEDAD1]">&rarr;</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* SECTION B — Interactive Level Selector */}
      <div className="space-y-6">
        <CourseLevelSelector
          selectedLevel={selectedLevel}
          onSelectLevel={handleSelectLevel}
        />
      </div>

      {/* SECTION C — Detailed Course Comparison */}
      <div className="space-y-4">
        {/* View Switcher for Desktop */}
        <div className="hidden md:flex items-center justify-end gap-2 text-xs">
          <span className="text-[#89857E] font-medium mr-2">Presentation Mode:</span>
          <div className="p-1 rounded-[5px] skeuo-recessed inline-flex gap-1">
            <button
              type="button"
              onClick={() => setDesktopViewMode('matrix')}
              className={`px-3 py-1.5 rounded-[4px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                desktopViewMode === 'matrix'
                  ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
                  : 'text-[#55534F] hover:text-[#171717]'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Full 5-Level Matrix</span>
            </button>
            <button
              type="button"
              onClick={() => setDesktopViewMode('card')}
              className={`px-3 py-1.5 rounded-[4px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                desktopViewMode === 'card'
                  ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
                  : 'text-[#55534F] hover:text-[#171717]'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Focused Level Card</span>
            </button>
          </div>
        </div>

        {/* Desktop Presentation */}
        <div className="hidden md:block">
          {desktopViewMode === 'matrix' ? (
            <CourseComparisonTable
              selectedLevel={selectedLevel}
              onSelectLevel={handleSelectLevel}
            />
          ) : (
            <CourseComparisonCard
              selectedLevel={selectedLevel}
              onSelectLevel={handleSelectLevel}
            />
          )}
        </div>

        {/* Mobile Presentation (Always clean single-level card to avoid cramped table) */}
        <div className="block md:hidden">
          <CourseComparisonCard
            selectedLevel={selectedLevel}
            onSelectLevel={handleSelectLevel}
          />
        </div>
      </div>

      {/* SECTION D — Learning Outcomes for Selected Level */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#DEDAD1] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-[4px] skeuo-button-dark text-[#FFFFFF] font-heading font-extrabold text-xs flex items-center justify-center">
                {currentCourse.level}
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#C83B32] font-semibold">
                Competency Matrix
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#171717] mt-1">
              Expected Learning Outcomes for {currentCourse.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#55534F] mt-0.5">
              Practical capabilities defined by the official Common European Framework of Reference (CEFR).
            </p>
          </div>

          <div className="text-xs text-[#89857E] shrink-0 font-medium">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[4px] bg-[#E8E5DD]">
              <Award className="w-3.5 h-3.5 text-[#D7B95D]" />
              <span>{currentCourse.examTarget.split('/')[0]} Standard</span>
            </span>
          </div>
        </div>

        {/* 4 Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <CourseSkillCard skill={currentCourse.skills.listening} />
          <CourseSkillCard skill={currentCourse.skills.speaking} />
          <CourseSkillCard skill={currentCourse.skills.reading} />
          <CourseSkillCard skill={currentCourse.skills.writing} />
        </div>
      </div>

      {/* SECTION E — Course Progression */}
      <div className="pt-4">
        <CourseProgression
          selectedLevel={selectedLevel}
          onSelectLevel={handleSelectLevel}
        />
      </div>

      {/* SECTION F — Conversion CTA */}
      <div className="pt-2">
        <CourseEnquiryCTA selectedLevel={selectedLevel} />
      </div>
    </section>
  )
}
