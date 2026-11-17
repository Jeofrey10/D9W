import React from 'react'
import { Link } from 'react-router-dom'
import { getBerlinTodayDateString, resolveDailyWord } from '../utils/dailyWordEngine'
import { getGenderStyles } from '@/features/reading/utils/vocabularyLookup'
import { Calendar, ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DailyWordWidgetProps {
  className?: string
}

export const DailyWordWidget: React.FC<DailyWordWidgetProps> = ({ className }) => {
  const todayKey = getBerlinTodayDateString()
  const dailyItem = resolveDailyWord(todayKey)
  const { vocab } = { vocab: dailyItem.vocabulary }
  const gender = vocab.article ? getGenderStyles(vocab.article) : getGenderStyles()

  return (
    <div
      className={cn(
        'rounded-2xl border bg-white p-5 sm:p-6 shadow-sm transition-all hover:shadow-md skeuo-paper',
        gender.borderAccent,
        'border-[#DEDAD1]',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3 text-xs">
        <span className="flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider text-[#89857E]">
          <Sparkles className="h-3.5 w-3.5 text-[#D7B95D]" />
          Wort des Tages
        </span>
        <span className="flex items-center gap-1 font-mono text-[#89857E]">
          <Calendar className="h-3 w-3" />
          {dailyItem.dateFormattedGerman}
        </span>
      </div>

      <div className="py-4 space-y-2">
        <div className="flex items-center gap-2">
          {vocab.article && (
            <span
              className={cn(
                'rounded px-2 py-0.5 font-mono text-xs font-bold uppercase',
                gender.badgeBg
              )}
            >
              {vocab.article}
            </span>
          )}
          <h3 className="text-2xl font-serif font-bold text-[#171717]">
            {vocab.word}
          </h3>
          <span className="rounded bg-[#FAF8F5] px-1.5 py-0.2 text-[10px] font-mono text-[#89857E] border border-[#DEDAD1]">
            {vocab.level}
          </span>
        </div>

        <p className="text-sm font-serif text-[#55534F]">{vocab.english}</p>

        {vocab.example?.german && (
          <p className="text-xs font-serif italic text-[#89857E] border-l-2 border-[#D7B95D] pl-2 line-clamp-1">
            „{vocab.example.german}“
          </p>
        )}
      </div>

      <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
        <span className="text-[11px] text-[#89857E]">
          Mit Audio, Mini-Quiz &amp; Kalender
        </span>
        <Link
          to="/word-of-the-day"
          className="inline-flex items-center gap-1 text-xs font-bold text-[#C83B32] hover:underline"
        >
          Heute entdecken
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
