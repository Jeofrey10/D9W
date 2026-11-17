import React from 'react'
import { ReadingPassage } from '../types/reading.types'
import { CATEGORY_MAP } from '@/data/reading/categories'
import { cn } from '@/lib/utils'
import {
  Clock,
  Layers,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react'

interface ReadingPassageCardProps {
  passage: ReadingPassage
  isCompleted: boolean
  bestScore?: number
  onSelectPassage: (passageId: string) => void
}

export const ReadingPassageCard: React.FC<ReadingPassageCardProps> = ({
  passage,
  isCompleted,
  bestScore,
  onSelectPassage,
}) => {
  const category = CATEGORY_MAP[passage.category]

  const difficultyBadge = {
    easy: { text: 'Leicht', color: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]' },
    moderate: { text: 'Mittel', color: 'bg-[#EFF6FF] text-[#1E3A8A] border-[#BFDBFE]' },
    challenging: { text: 'Anspruchsvoll', color: 'bg-[#FEF2F2] text-[#C83B32] border-[#FECACA]' },
  }[passage.difficulty]

  return (
    <div
      onClick={() => onSelectPassage(passage.id)}
      className={cn(
        'group flex flex-col justify-between rounded-2xl border bg-white p-5 sm:p-6 shadow-sm transition-all duration-200 cursor-pointer skeuo-paper',
        'hover:-translate-y-1 hover:shadow-lg hover:border-[#171717]',
        isCompleted ? 'border-[#BBF7D0]' : 'border-[#DEDAD1]'
      )}
    >
      <div className="space-y-3">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="rounded-md bg-[#171717] px-2 py-0.5 text-xs font-mono font-bold uppercase tracking-wider text-white">
              {passage.level}
            </span>
            <span className="rounded-md bg-[#FAF8F5] px-2 py-0.5 text-xs font-medium text-[#55534F] border border-[#DEDAD1]">
              {category?.titleGerman || passage.category}
            </span>
            <span
              className={cn(
                'rounded-md px-1.5 py-0.5 text-[10px] font-mono border',
                difficultyBadge.color
              )}
            >
              {difficultyBadge.text}
            </span>
          </div>

          {isCompleted ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-[#15803D]">
              <CheckCircle2 className="h-4 w-4" />
              {bestScore !== undefined ? `${bestScore}%` : 'Erledigt'}
            </span>
          ) : (
            passage.status === 'published' && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#89857E]">
                <Sparkles className="h-3 w-3 text-[#D7B95D]" />
                Verifiziert
              </span>
            )
          )}
        </div>

        {/* Titles */}
        <div className="space-y-0.5">
          <h3 className="text-lg font-serif font-bold text-[#171717] group-hover:text-[#C83B32] transition-colors leading-snug">
            {passage.titleGerman}
          </h3>
          {passage.titleEnglish && (
            <p className="text-xs text-[#89857E] italic">{passage.titleEnglish}</p>
          )}
        </div>

        {/* Short Description */}
        <p className="text-xs text-[#55534F] line-clamp-2 leading-relaxed">
          {passage.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="mt-5 pt-3 border-t border-[#EFECE6] flex items-center justify-between text-xs text-[#89857E]">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> ca. {passage.estimatedMinutes} Min.
          </span>
          <span className="inline-flex items-center gap-1">
            <Layers className="h-3.5 w-3.5" /> {passage.wordCount} Wörter
          </span>
        </div>

        <span className="inline-flex items-center gap-1 font-semibold text-[#171717] group-hover:text-[#C83B32] transition-colors">
          Text lesen
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </div>
  )
}
