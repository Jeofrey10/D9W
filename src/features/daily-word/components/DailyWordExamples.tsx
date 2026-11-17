import React from 'react'
import { VocabularyItem } from '@/types/learning'
import { useGermanSpeech } from '@/hooks/useGermanSpeech'
import { Volume2, BookOpen } from 'lucide-react'

interface DailyWordExamplesProps {
  vocabulary: VocabularyItem
}

export const DailyWordExamples: React.FC<DailyWordExamplesProps> = ({
  vocabulary,
}) => {
  const { speak, isSupported } = useGermanSpeech()

  if (!vocabulary.example?.german) return null

  const renderHighlightedSentence = (sentence: string, targetWord: string) => {
    const regex = new RegExp(`(\\b${targetWord}\\b)`, 'gi')
    const parts = sentence.split(regex)

    return parts.map((part, idx) =>
      part.toLowerCase() === targetWord.toLowerCase() ? (
        <span
          key={idx}
          className="rounded bg-[#D7B95D]/30 px-1 font-bold text-[#171717] underline decoration-[#C83B32] decoration-2"
        >
          {part}
        </span>
      ) : (
        <span key={idx}>{part}</span>
      )
    )
  }

  return (
    <div className="rounded-2xl border border-[#DEDAD1] bg-white p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] flex items-center gap-1.5">
          <BookOpen className="h-3.5 w-3.5 text-[#C83B32]" />
          Beispielsatz im Kontext
        </h3>
        <span className="text-[11px] text-[#89857E]">Authentisches Hochdeutsch</span>
      </div>

      <div className="rounded-xl bg-[#FAF8F5] p-5 border border-[#EFECE6] space-y-3">
        <div className="flex items-start justify-between gap-3">
          <p className="font-serif text-lg sm:text-xl text-[#171717] leading-relaxed">
            „{renderHighlightedSentence(vocabulary.example.german, vocabulary.word)}“
          </p>
          <button
            type="button"
            onClick={() => speak(vocabulary.example.german)}
            disabled={!isSupported}
            className="shrink-0 rounded-full p-2 text-[#89857E] hover:bg-white hover:text-[#171717] transition-colors border border-[#DEDAD1]"
            title="Satz anhören"
            aria-label="Satz anhören"
          >
            <Volume2 className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-[#55534F] italic border-t border-[#EFECE6] pt-2">
          {vocabulary.example.english}
        </p>
      </div>
    </div>
  )
}
