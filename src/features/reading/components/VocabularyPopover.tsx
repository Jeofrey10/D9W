import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Sparkles,
  X,
  Volume2,
} from 'lucide-react'
import {
  ContextualWordExplanation,
  ReadingPassage,
} from '../types/reading.types'
import { getGenderStyles } from '../utils/vocabularyLookup'
import { cn } from '@/lib/utils'

interface VocabularyPopoverProps {
  explanation: ContextualWordExplanation | null
  unlistedWord?: string | null
  passage: ReadingPassage
  position?: { top: number; left: number }
  isSaved: boolean
  onToggleSave: () => void
  onClose: () => void
}

export const VocabularyPopover: React.FC<VocabularyPopoverProps> = ({
  explanation,
  unlistedWord,
  passage: _passage,
  position,
  isSaved,
  onToggleSave,
  onClose,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!explanation && !unlistedWord) return null

  const gender = explanation?.article
    ? getGenderStyles(explanation.article)
    : getGenderStyles()

  const handleSpeak = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'de-DE'
      utterance.rate = 0.9
      window.speechSynthesis.speak(utterance)
    }
  }

  const popoverWidth = typeof window !== 'undefined' ? Math.min(340, window.innerWidth - 32) : 320

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Vocabulary explanation"
      style={
        position && typeof window !== 'undefined'
          ? {
              top: `${Math.max(16, Math.min(position.top + 34, window.innerHeight - 360))}px`,
              left: `${Math.max(16, Math.min(position.left - 120, window.innerWidth - popoverWidth - 16))}px`,
            }
          : undefined
      }
      className={cn(
        'fixed z-50 w-[calc(100vw-32px)] max-w-[340px] sm:max-w-[360px] rounded-xl border border-[#DEDAD1] bg-white p-4 sm:p-5 shadow-2xl transition-all duration-150',
        'animate-in fade-in zoom-in-95',
        gender.borderAccent
      )}
    >
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {explanation?.article && (
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-xs font-mono font-bold uppercase tracking-wider',
                gender.badgeBg
              )}
            >
              {explanation.article}
            </span>
          )}
          <h4 className="text-xl font-serif font-bold text-[#171717]">
            {explanation ? explanation.word : unlistedWord}
          </h4>
          <button
            type="button"
            onClick={() => handleSpeak(explanation ? explanation.word : unlistedWord || '')}
            className="rounded p-1 text-[#89857E] hover:bg-[#F7F5F0] hover:text-[#171717] transition-colors"
            title="Aussprache anhören"
            aria-label="Aussprache anhören"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-[#89857E] hover:bg-[#F7F5F0] hover:text-[#171717] transition-colors"
          aria-label="Schließen"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {explanation ? (
        <div className="mt-3 space-y-3">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="rounded bg-[#F7F5F0] px-2 py-0.5 font-medium text-[#55534F] border border-[#DEDAD1]">
              {explanation.wordType.toUpperCase()}
            </span>
            <span className="rounded bg-[#F7F5F0] px-2 py-0.5 font-medium text-[#55534F] border border-[#DEDAD1]">
              {explanation.level}
            </span>
            {explanation.plural && (
              <span className="rounded bg-[#F7F5F0] px-2 py-0.5 text-[#55534F] border border-[#DEDAD1]">
                Plural: <strong className="text-[#171717]">{explanation.plural}</strong>
              </span>
            )}
          </div>

          {/* Context Meaning & English Translation */}
          <div className="rounded-lg bg-[#FAF8F5] p-3 border border-[#EFECE6] space-y-1">
            <div className="text-sm font-semibold text-[#171717]">
              {explanation.englishMeaning}
            </div>
            {explanation.contextMeaning &&
              explanation.contextMeaning !== explanation.englishMeaning && (
                <div className="text-xs text-[#55534F]">
                  <span className="font-medium text-[#89857E]">Im Kontext: </span>
                  {explanation.contextMeaning}
                </div>
              )}
          </div>

          {/* Grammar Notes / Verb details */}
          {explanation.grammarNotes && (
            <div className="rounded bg-[#F7F5F0] px-2.5 py-1.5 text-[11px] font-mono text-[#55534F] border border-[#EFECE6]">
              {explanation.grammarNotes}
            </div>
          )}

          {/* Example Sentence */}
          {explanation.exampleSentence && (
            <div className="border-l-2 border-[#D7B95D] pl-2.5 py-0.5 text-xs space-y-0.5">
              <div className="italic text-[#171717]">
                "{explanation.exampleSentence}"
              </div>
              {explanation.exampleTranslation && (
                <div className="text-[11px] text-[#89857E]">
                  {explanation.exampleTranslation}
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="pt-2 border-t border-[#EFECE6] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onToggleSave}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all',
                isSaved
                  ? 'bg-[#15803D] text-white shadow-sm'
                  : 'bg-[#171717] text-white hover:bg-[#333333]'
              )}
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="h-3.5 w-3.5" />
                  Gespeichert
                </>
              ) : (
                <>
                  <Bookmark className="h-3.5 w-3.5" />
                  Wort speichern
                </>
              )}
            </button>

            <div className="flex items-center gap-1.5">
              {explanation.article && (
                <Link
                  to="/article-explorer"
                  className="rounded-lg p-1.5 text-[#55534F] hover:bg-[#F7F5F0] hover:text-[#C83B32] transition-colors"
                  title="Im Artikel-Explorer üben"
                >
                  <Sparkles className="h-4 w-4" />
                </Link>
              )}
              <Link
                to={`/dictionary?q=${encodeURIComponent(explanation.baseForm || explanation.word)}`}
                className="rounded-lg p-1.5 text-[#55534F] hover:bg-[#F7F5F0] hover:text-[#171717] transition-colors"
                title="Im Wörterbuch öffnen"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback for words without an official dictionary entry */
        <div className="mt-3 space-y-3">
          <p className="text-xs text-[#55534F] leading-relaxed">
            Für dieses Wort liegt noch kein vollständiger Lexikoneintrag vor. Sie können das Wort im Wörterbuch suchen oder für später vormerken.
          </p>
          <div className="pt-2 border-t border-[#EFECE6] flex items-center justify-between">
            <Link
              to={`/dictionary?q=${encodeURIComponent(unlistedWord || '')}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C83B32] hover:underline"
            >
              Im Wörterbuch nachschlagen
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
