import React from 'react'
import { ReadingAttemptResult, ReadingPassage } from '../types/reading.types'
import { getReadingScoreTier } from '../utils/readingScoring'
import { cn } from '@/lib/utils'
import { Trophy, RotateCcw, ArrowRight, BookOpen, Clock } from 'lucide-react'

interface ReadingResultPanelProps {
  result: ReadingAttemptResult
  passage: ReadingPassage
  onRetry: () => void
  onNextPassage?: () => void
  onBackToLibrary: () => void
}

export const ReadingResultPanel: React.FC<ReadingResultPanelProps> = ({
  result,
  passage: _passage,
  onRetry,
  onNextPassage,
  onBackToLibrary,
}) => {
  const tierInfo = getReadingScoreTier(result.scorePercent)

  const formatMinutes = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`
  }

  return (
    <div className="rounded-2xl border border-[#DEDAD1] bg-white p-6 sm:p-8 shadow-xl text-center space-y-6 animate-in fade-in zoom-in-95">
      {/* Top Ink Seal Stamp */}
      <div className="inline-flex flex-col items-center justify-center">
        <div
          className={cn(
            'inline-flex items-center gap-2 rounded-2xl px-6 py-3 border-2 font-serif text-lg font-bold uppercase tracking-wider shadow-sm transform -rotate-1',
            tierInfo.colorClass
          )}
        >
          <Trophy className="h-6 w-6" />
          <span>{tierInfo.titleGerman}</span>
        </div>
        <p className="mt-2 text-xs text-[#89857E]">{tierInfo.titleEnglish}</p>
      </div>

      {/* Main Score Metrics */}
      <div className="space-y-2">
        <div className="text-4xl sm:text-5xl font-mono font-bold text-[#171717]">
          {result.scorePercent}%
        </div>
        <p className="text-sm text-[#55534F] max-w-md mx-auto">
          {tierInfo.description}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto py-4 border-y border-[#EFECE6]">
        <div className="rounded-xl bg-[#FAF8F5] p-3 text-center border border-[#DEDAD1]">
          <div className="text-xs font-mono text-[#89857E] uppercase">Richtig</div>
          <div className="text-lg font-bold text-[#15803D]">
            {result.correctQuestions} / {result.totalQuestions}
          </div>
        </div>
        <div className="rounded-xl bg-[#FAF8F5] p-3 text-center border border-[#DEDAD1]">
          <div className="text-xs font-mono text-[#89857E] uppercase">Punkte</div>
          <div className="text-lg font-bold text-[#171717]">
            {result.earnedPoints} / {result.totalPoints}
          </div>
        </div>
        <div className="rounded-xl bg-[#FAF8F5] p-3 text-center border border-[#DEDAD1]">
          <div className="text-xs font-mono text-[#89857E] uppercase flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" /> Zeit
          </div>
          <div className="text-lg font-bold text-[#55534F]">
            {formatMinutes(result.timeSpentSeconds)}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl border border-[#DEDAD1] bg-white px-5 py-2.5 text-sm font-semibold text-[#171717] hover:bg-[#F7F5F0] transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          Noch einmal üben
        </button>

        <button
          type="button"
          onClick={onBackToLibrary}
          className="inline-flex items-center gap-2 rounded-xl border border-[#DEDAD1] bg-[#F7F5F0] px-5 py-2.5 text-sm font-semibold text-[#55534F] hover:bg-[#EFECE6] transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Zur Lese-Bibliothek
        </button>

        {onNextPassage && (
          <button
            type="button"
            onClick={onNextPassage}
            className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#333333] transition-colors"
          >
            Nächster Text
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
