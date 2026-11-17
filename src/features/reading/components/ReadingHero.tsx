import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { BookOpen, BookmarkCheck, Sparkles, CheckCircle2 } from 'lucide-react'

export const ReadingHero: React.FC = () => {
  return (
    <div className="relative border-b border-[#DEDAD1] bg-white pt-12 pb-14 sm:pt-16 sm:pb-20 overflow-hidden">
      {/* German flag subtle tricolor accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 flex">
        <div className="flex-1 bg-[#171717]" />
        <div className="flex-1 bg-[#C83B32]" />
        <div className="flex-1 bg-[#D7B95D]" />
      </div>

      <Container size="xl" className="relative z-10 space-y-6">
        {/* Editorial Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DEDAD1] bg-[#FAF8F5] px-3.5 py-1 text-xs font-semibold text-[#55534F] shadow-sm">
          <BookOpen className="h-3.5 w-3.5 text-[#C83B32]" />
          <span>D9W Leseverstehen-Trainer &bull; CEFR A1–C1</span>
        </div>

        {/* Headlines */}
        <div className="space-y-2 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#171717] tracking-tight leading-tight">
            German Reading Practice
          </h1>
          <p className="text-lg sm:text-xl font-serif italic text-[#C83B32]">
            Lesen — Discover German Through Reading
          </p>
          <p className="text-sm sm:text-base text-[#55534F] leading-relaxed pt-1">
            Improve your German reading comprehension with carefully structured passages, interactive vocabulary explanations, grammar insights, and comprehension exercises.
          </p>
        </div>

        {/* Feature Highlights Row & Quick Link to My Vocabulary */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#55534F]">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-[#15803D]" />
              <span>36 Graded Passages</span>
            </div>
            <span className="text-[#DEDAD1]">&bull;</span>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#D7B95D]" />
              <span>Click-to-Translate German Words</span>
            </div>
            <span className="text-[#DEDAD1]">&bull;</span>
            <div className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 text-[#171717]" />
              <span>Noun Gender Colors &amp; Plurals</span>
            </div>
          </div>

          <Link
            to="/my-vocabulary"
            className="inline-flex items-center gap-2 rounded-xl border border-[#DEDAD1] bg-[#FAF8F5] px-4 py-2 text-xs font-bold text-[#171717] shadow-sm hover:bg-white hover:border-[#C83B32] transition-colors"
          >
            <BookmarkCheck className="h-4 w-4 text-[#C83B32]" />
            Mein Wortschatz (Saved Words)
          </Link>
        </div>
      </Container>
    </div>
  )
}
