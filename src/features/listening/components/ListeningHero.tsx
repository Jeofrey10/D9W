import React from 'react'
import { Headphones, Sparkles, Volume2, ShieldCheck } from 'lucide-react'

export const ListeningHero: React.FC = () => {
  return (
    <div className="relative pt-8 sm:pt-12 pb-8 border-b border-[#DEDAD1] bg-gradient-to-b from-white to-[#F7F5F0]">
      {/* Tricolor Indicator Line */}
      <div className="absolute top-0 left-0 right-0 h-1 flex" aria-hidden="true">
        <div className="flex-1 bg-[#171717]" />
        <div className="flex-1 bg-[#C83B32]" />
        <div className="flex-1 bg-[#D7B95D]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#FAF6E8] border border-[#D7B95D]/40 text-xs font-mono font-semibold text-[#8C7225]">
          <Headphones className="w-3.5 h-3.5 text-[#C83B32]" />
          <span>CEFR A1–C1 HÖRVERSTEHEN &bull; INTERACTIVE AUDIO LAB</span>
        </div>

        {/* Titles */}
        <div className="space-y-2 max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-[#171717] tracking-tight leading-[1.1]">
            German Listening Practice
          </h1>
          <p className="text-base sm:text-lg font-heading font-semibold text-[#C83B32]">
            Hörverstehen — Train Your German Listening Skills
          </p>
          <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed pt-1">
            Improve your German listening comprehension through realistic conversations, everyday situations, public announcements, and structured comprehension exercises from beginner to advanced.
          </p>
        </div>

        {/* Feature Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[#89857E]">
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-[#C83B32]" />
            <span>Variable Speed (0.75x–1.5x)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D7B95D]" />
            <span>36 Structured Exercises</span>
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
            <span>Official CEFR Aligned Curriculum</span>
          </span>
        </div>
      </div>
    </div>
  )
}
