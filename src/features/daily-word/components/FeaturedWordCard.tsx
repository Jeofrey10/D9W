import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DailyWordItem } from '../types/dailyWord.types'
import { getGenderStyles } from '@/features/reading/utils/vocabularyLookup'
import { useGermanSpeech } from '@/hooks/useGermanSpeech'
import { useReadingVocabulary } from '@/features/reading/hooks/useReadingVocabulary'
import {
  Volume2,
  VolumeX,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Share2,
  ExternalLink,
  Sparkles,
  Calendar,
  Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FeaturedWordCardProps {
  item: DailyWordItem
  isLearned: boolean
  onToggleLearned: () => void
}

export const FeaturedWordCard: React.FC<FeaturedWordCardProps> = ({
  item,
  isLearned,
  onToggleLearned,
}) => {
  const { vocab } = { vocab: item.vocabulary }
  const gender = vocab.article ? getGenderStyles(vocab.article) : getGenderStyles()

  const { speak, isPlaying, isSupported } = useGermanSpeech()
  const { isWordSaved, saveWord, removeWord } = useReadingVocabulary()

  const [shareFeedback, setShareFeedback] = useState<string | null>(null)

  const isSaved = isWordSaved(vocab.word, vocab.article)

  const handleToggleSave = () => {
    if (isSaved) {
      removeWord(vocab.word, vocab.article)
    } else {
      saveWord(
        {
          word: vocab.word,
          baseForm: vocab.word,
          article: vocab.article,
          plural: vocab.plural,
          wordType: vocab.type,
          level: vocab.level,
          contextMeaning: vocab.english,
          englishMeaning: vocab.english,
          exampleSentence: vocab.example?.german,
          exampleTranslation: vocab.example?.english,
        },
        {
          id: `daily-${item.schedule.dateKey}`,
          titleGerman: 'Wort des Tages',
          titleEnglish: 'Word of the Day',
          level: vocab.level,
          category: 'alltag',
          difficulty: 'moderate',
          estimatedMinutes: 2,
          wordCount: 1,
          paragraphs: [],
          description: 'Wort des Tages',
          provenance: 'D9W Wort des Tages',
          status: 'published',
          keyVocabulary: [],
          questions: [],
        }
      )
    }
  }

  const handleSpeak = () => {
    if (!isSupported) return
    const textToSpeak = vocab.article ? `${vocab.article} ${vocab.word}` : vocab.word
    speak(textToSpeak)
  }

  const handleShare = async () => {
    const textToShare = `${vocab.article ? `${vocab.article} ` : ''}${vocab.word} [${vocab.level}] — ${vocab.english}\nBeispiel: „${vocab.example?.german}“\nD9W Wort des Tages`

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `D9W Wort des Tages: ${vocab.word}`,
          text: textToShare,
          url: window.location.href,
        })
        return
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return
      }
    }

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare)
      setShareFeedback('In die Zwischenablage kopiert!')
      setTimeout(() => setShareFeedback(null), 2500)
    }
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl border bg-white p-6 sm:p-10 shadow-lg skeuo-paper-stacked transition-all',
        gender.borderAccent,
        'border-[#DEDAD1]'
      )}
    >
      {/* 1. Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-[#FAF8F5] px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-[#55534F] border border-[#DEDAD1]">
            WORT DES TAGES
          </span>
          {item.isToday && (
            <span className="rounded-md bg-[#C83B32] px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              HEUTE
            </span>
          )}
          {item.isPast && (
            <span className="rounded-md bg-[#F7F5F0] px-2 py-0.5 text-[11px] font-mono text-[#89857E] border border-[#DEDAD1]">
              ARCHIV
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#89857E]">
          <Calendar className="h-3.5 w-3.5" />
          <span>{item.dateFormattedGerman}</span>
        </div>
      </div>

      {/* 2. Main Word Display */}
      <div className="py-6 sm:py-8 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {vocab.article && (
            <span
              className={cn(
                'rounded-lg px-3 py-1 font-mono text-sm sm:text-base font-bold uppercase tracking-wider shadow-xs',
                gender.badgeBg
              )}
            >
              {vocab.article}
            </span>
          )}
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#171717] tracking-tight">
            {vocab.word}
          </h2>

          <button
            type="button"
            onClick={handleSpeak}
            disabled={!isSupported}
            className={cn(
              'rounded-full p-2.5 transition-all cursor-pointer',
              isPlaying
                ? 'bg-[#C83B32] text-white shadow-md'
                : 'bg-[#F7F5F0] text-[#171717] hover:bg-[#EFECE6] border border-[#DEDAD1]'
            )}
            title="Aussprache anhören"
            aria-label="Aussprache anhören"
          >
            {isSupported ? (
              <Volume2 className="h-5 w-5" />
            ) : (
              <VolumeX className="h-5 w-5 text-[#89857E]" />
            )}
          </button>
        </div>

        {/* English Meaning & Metas */}
        <div className="space-y-2">
          <div className="text-xl sm:text-2xl font-serif text-[#55534F]">
            {vocab.english}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded bg-[#FAF8F5] px-2.5 py-1 font-mono font-bold text-[#171717] border border-[#DEDAD1]">
              CEFR {vocab.level}
            </span>
            <span className="rounded bg-[#FAF8F5] px-2.5 py-1 font-medium text-[#55534F] border border-[#DEDAD1]">
              {vocab.type.toUpperCase()}
            </span>
            {vocab.plural && (
              <span className="rounded bg-[#FAF8F5] px-2.5 py-1 text-[#55534F] border border-[#DEDAD1]">
                Plural: <strong className="text-[#171717]">{vocab.plural}</strong>
              </span>
            )}
            {vocab.pronunciation?.ipa && (
              <span className="rounded bg-[#FAF8F5] px-2.5 py-1 font-mono text-[#89857E] border border-[#DEDAD1]">
                [{vocab.pronunciation.ipa}]
              </span>
            )}
          </div>
        </div>

        {/* Verb / Adjective Specific Info */}
        {vocab.verbDetails && (
          <div className="rounded-xl bg-[#FAF8F5] p-3 border border-[#EFECE6] text-xs font-mono text-[#55534F] space-y-0.5">
            <div>
              <strong className="text-[#171717]">Konjugation:</strong>{' '}
              {vocab.verbDetails.present3rd} | {vocab.verbDetails.pastPerfekt}
            </div>
            {vocab.verbDetails.isSeparable && (
              <div className="text-[#89857E]">Trennbares Verb</div>
            )}
          </div>
        )}
      </div>

      {/* 3. Action Toolbar */}
      <div className="pt-4 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Save to My Vocabulary */}
          <button
            type="button"
            onClick={handleToggleSave}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all shadow-xs',
              isSaved
                ? 'bg-[#15803D] text-white'
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
                <Bookmark className="h-3.5 w-3.5 text-[#D7B95D]" />
                In Wortschatz speichern
              </>
            )}
          </button>

          {/* Mark as Learned */}
          <button
            type="button"
            onClick={onToggleLearned}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all',
              isLearned
                ? 'border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]'
                : 'border-[#DEDAD1] bg-white text-[#55534F] hover:bg-[#FAF8F5]'
            )}
          >
            <CheckCircle2
              className={cn('h-3.5 w-3.5', isLearned && 'text-[#15803D]')}
            />
            {isLearned ? 'Gelernt!' : 'Als gelernt markieren'}
          </button>
        </div>

        {/* Share and Tool Links */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="rounded-xl border border-[#DEDAD1] bg-white p-2 text-[#55534F] hover:bg-[#FAF8F5] transition-colors relative"
            title="Wort teilen oder kopieren"
            aria-label="Wort teilen oder kopieren"
          >
            {shareFeedback ? (
              <Check className="h-4 w-4 text-[#15803D]" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </button>

          {vocab.article && (
            <Link
              to="/article-explorer"
              className="rounded-xl border border-[#DEDAD1] bg-white p-2 text-[#55534F] hover:bg-[#FAF8F5] hover:text-[#C83B32] transition-colors"
              title="Artikel im Explorer üben"
              aria-label="Artikel im Explorer üben"
            >
              <Sparkles className="h-4 w-4" />
            </Link>
          )}

          <Link
            to={`/dictionary?q=${encodeURIComponent(vocab.word)}`}
            className="rounded-xl border border-[#DEDAD1] bg-white p-2 text-[#55534F] hover:bg-[#FAF8F5] hover:text-[#171717] transition-colors"
            title="Im Wörterbuch öffnen"
            aria-label="Im Wörterbuch öffnen"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Share Toast */}
      {shareFeedback && (
        <div className="absolute top-3 right-3 rounded-lg bg-[#171717] text-white px-3 py-1.5 text-xs shadow-lg animate-in fade-in">
          {shareFeedback}
        </div>
      )}
    </div>
  )
}
