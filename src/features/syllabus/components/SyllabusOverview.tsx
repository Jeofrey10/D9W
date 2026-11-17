import React from 'react'
import { Link } from 'react-router-dom'
import { SyllabusDocument } from '@/data/syllabus'
import { CheckCircle2, Award, ShieldAlert, ArrowRight } from 'lucide-react'

interface SyllabusOverviewProps {
  syllabus: SyllabusDocument
  className?: string
}

export const SyllabusOverview: React.FC<SyllabusOverviewProps> = ({
  syllabus,
  className = '',
}) => {
  return (
    <div className={`skeuo-paper rounded-[6px] p-6 sm:p-8 border border-[#DEDAD1] space-y-6 ${className}`}>
      {/* Title & Overview Narrative */}
      <div className="space-y-3 pb-6 border-b border-[#DEDAD1]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-[#C83B32] font-semibold block">
              Curriculum Overview & Scope
            </span>
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-[#171717] mt-0.5">
              {syllabus.germanTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#89857E]">
            <span className="skeuo-recessed px-2.5 py-1 rounded-[4px] font-bold text-[#171717]">
              {syllabus.hoursTotal} Teaching Hours
            </span>
            <span className="skeuo-recessed px-2.5 py-1 rounded-[4px] font-bold text-[#171717]">
              {syllabus.durationWeeks} Weeks
            </span>
          </div>
        </div>

        <p className="text-sm text-[#55534F] leading-relaxed pt-1">
          {syllabus.overview}
        </p>
      </div>

      {/* Prerequisites & Objectives Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Prerequisites */}
        <div className="p-4 rounded-[6px] skeuo-recessed space-y-3">
          <div className="flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider text-[#171717]">
            <ShieldAlert className="w-4 h-4 text-[#C83B32]" />
            <span>Target Audience & Course Prerequisites</span>
          </div>

          <ul className="space-y-2 text-[#55534F]">
            {syllabus.prerequisites.map((p, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C83B32] shrink-0 mt-1.5" />
                <span className="leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Learning Objectives */}
        <div className="p-4 rounded-[6px] skeuo-recessed space-y-3">
          <div className="flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-wider text-[#171717]">
            <Award className="w-4 h-4 text-[#D7B95D]" />
            <span>Core Competency Benchmarks</span>
          </div>

          <ul className="space-y-2 text-[#55534F]">
            {syllabus.learningObjectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Progression & Route Cross-Link */}
      <div className="pt-4 border-t border-[#DEDAD1] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-[#55534F]">
          <span className="text-[#89857E] font-medium">Progression Milestone:</span>
          <strong className="text-[#171717]">{syllabus.progression}</strong>
        </div>

        <Link
          to={`/courses/${syllabus.level.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 font-bold text-[#C83B32] hover:underline"
        >
          <span>View Full {syllabus.level} Course Profile</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
