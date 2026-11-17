import React from 'react'
import { BookOpen, Sparkles, Printer, ArrowRight } from 'lucide-react'

interface SyllabusHeroProps {
  onScrollToCurriculum: () => void
  onDownloadPdf: () => void
  className?: string
}

export const SyllabusHero: React.FC<SyllabusHeroProps> = ({
  onScrollToCurriculum,
  onDownloadPdf,
  className = '',
}) => {
  return (
    <div
      className={`skeuo-paper-stacked rounded-[8px] p-6 sm:p-12 border border-[#DEDAD1] relative overflow-hidden ${className}`}
    >
      {/* Top Tricolor Strip */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex" aria-hidden="true">
        <div className="flex-1 bg-[#171717]" />
        <div className="flex-1 bg-[#C83B32]" />
        <div className="flex-1 bg-[#D7B95D]" />
      </div>

      <div className="max-w-3xl space-y-4 pt-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E8E5DD] text-xs font-mono font-semibold uppercase tracking-widest text-[#171717] border border-[#DEDAD1]">
          <BookOpen className="w-3.5 h-3.5 text-[#C83B32]" />
          <span>D9W Learning Curriculum</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#171717] tracking-tight">
          Your German Learning Roadmap.
        </h1>

        <p className="text-base sm:text-lg text-[#55534F] leading-relaxed">
          Explore the skills, grammar and learning milestones that shape your journey from A1 to C1. Structured module-by-module academic plans aligned with the Common European Framework of Reference (CEFR).
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            type="button"
            onClick={onScrollToCurriculum}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] text-xs font-bold text-[#FFFFFF] skeuo-button-primary hover:brightness-105 active:translate-y-0.5 cursor-pointer"
          >
            <span>Explore Syllabus</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[5px] text-xs font-bold text-[#171717] skeuo-button-secondary hover:text-[#C83B32] active:translate-y-0.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#C83B32]" />
            <span>Download Official PDF</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#89857E]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#2A684C]" />
            <span>CEFR-Aligned Modular Architecture</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D7B95D]" />
            <span>Official Examination Preparation</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1E4F8A]" />
            <span>Hören, Sprechen, Lesen, Schreiben</span>
          </span>
        </div>
      </div>
    </div>
  )
}
