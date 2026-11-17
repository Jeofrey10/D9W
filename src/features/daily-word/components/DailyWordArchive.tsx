import React, { useState, useMemo } from 'react'
import { DAILY_WORD_SCHEDULE } from '@/data/daily-word/dailyWordSchedule'
import { findVocabularyById } from '@/data/vocabulary'
import { getBerlinTodayDateString } from '../utils/dailyWordEngine'
import { CefrLevel } from '@/types/learning'
import { Search, Calendar, Check, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DailyWordArchiveProps {
  onSelectDate: (dateKey: string) => void
  learnedWordIds: string[]
  currentDateKey: string
}

export const DailyWordArchive: React.FC<DailyWordArchiveProps> = ({
  onSelectDate,
  learnedWordIds,
  currentDateKey,
}) => {
  const todayKey = getBerlinTodayDateString()
  const learnedSet = useMemo(() => new Set(learnedWordIds), [learnedWordIds])

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | 'ALL'>('ALL')

  // Filter past & today schedule entries with resolved vocabulary
  const archiveItems = useMemo(() => {
    return DAILY_WORD_SCHEDULE.filter((entry) => entry.dateKey <= todayKey)
      .map((entry) => {
        const vocab = findVocabularyById(entry.vocabularyId)
        return {
          entry,
          vocab,
          isLearned: learnedSet.has(entry.vocabularyId),
        }
      })
      .filter((item) => {
        if (!item.vocab) return false
        if (selectedLevel !== 'ALL' && item.vocab.level !== selectedLevel) {
          return false
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const wordMatch = item.vocab.word.toLowerCase().includes(q)
          const englishMatch = item.vocab.english.toLowerCase().includes(q)
          if (!wordMatch && !englishMatch) return false
        }
        return true
      })
      .reverse() // Most recent first
  }, [todayKey, learnedSet, selectedLevel, searchQuery])

  return (
    <div className="rounded-2xl border border-[#DEDAD1] bg-white p-6 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
        <div>
          <h3 className="font-serif text-lg font-bold text-[#171717]">
            Archiv vergangener Wörter
          </h3>
          <p className="text-xs text-[#89857E]">
            Wiederholen Sie Wörter aus den letzten Tagen und Wochen.
          </p>
        </div>

        {/* Level filter pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setSelectedLevel(lvl)}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition-all',
                selectedLevel === lvl
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#FAF8F5] text-[#55534F] hover:bg-[#EFECE6]'
              )}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#89857E]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Wort oder deutsche Bedeutung suchen..."
          className="w-full rounded-xl border border-[#DEDAD1] bg-[#FAF8F5] pl-10 pr-4 py-2 text-xs sm:text-sm text-[#171717] focus:border-[#171717] focus:bg-white focus:outline-none"
        />
      </div>

      {/* Archive Items List */}
      <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
        {archiveItems.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#89857E]">
            Keine Wörter für diese Suche gefunden.
          </div>
        ) : (
          archiveItems.map(({ entry, vocab, isLearned }) => {
            if (!vocab) return null
            const isSelected = entry.dateKey === currentDateKey

            return (
              <div
                key={entry.dateKey}
                onClick={() => onSelectDate(entry.dateKey)}
                className={cn(
                  'flex items-center justify-between rounded-xl border p-3 text-xs transition-all cursor-pointer',
                  isSelected
                    ? 'border-[#171717] bg-[#FAF8F5] shadow-xs'
                    : 'border-[#EFECE6] bg-white hover:border-[#DEDAD1] hover:bg-[#FAF8F5]'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#89857E] min-w-[75px] flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {entry.dateKey.slice(5)}
                  </span>

                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                      {vocab.article && (
                        <span className="font-mono text-[10px] text-[#89857E] uppercase">
                          {vocab.article}
                        </span>
                      )}
                      <span>{vocab.word}</span>
                      <span className="rounded bg-[#F7F5F0] px-1.5 py-0.2 text-[9px] font-mono text-[#89857E] border border-[#DEDAD1]">
                        {vocab.level}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#55534F] truncate max-w-[200px] sm:max-w-[320px]">
                      {vocab.english}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isLearned && (
                    <span className="inline-flex items-center gap-1 rounded bg-[#F0FDF4] px-2 py-0.5 text-[10px] font-bold text-[#15803D]">
                      <Check className="h-3 w-3" /> Gelernt
                    </span>
                  )}
                  <ArrowRight className="h-3.5 w-3.5 text-[#89857E]" />
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
