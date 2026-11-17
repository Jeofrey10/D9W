import React, { useState } from 'react'
import {
  ListeningTranscript,
  VocabularyItem,
  ListeningExerciseType,
} from '../types/listening.types'
import {
  FileText,
  Eye,
  EyeOff,
  BookOpen,
  Sparkles,
  Lock,
} from 'lucide-react'

interface ListeningTranscriptPanelProps {
  transcript: ListeningTranscript
  vocabulary: VocabularyItem[]
  listeningTip?: string
  exerciseType: ListeningExerciseType
  isSubmitted: boolean
  className?: string
}

export const ListeningTranscriptPanel: React.FC<ListeningTranscriptPanelProps> = ({
  transcript,
  vocabulary,
  listeningTip,
  exerciseType,
  isSubmitted,
  className = '',
}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const isDictation = exerciseType === 'dictation'

  // Dictation requires submission before reveal
  const canReveal = !isDictation || isSubmitted

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 1. Transcript Accordion / Card */}
      <div className="skeuo-paper rounded-[6px] border border-[#DEDAD1] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#ECE8E0] pb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C83B32]" />
            <h4 className="text-xs sm:text-sm font-heading font-bold text-[#171717]">
              Transkript (Hörtext)
            </h4>
          </div>

          {canReveal ? (
            <button
              type="button"
              onClick={() => setIsRevealed(!isRevealed)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold text-[#55534F] hover:text-[#171717] bg-[#E8E5DD] hover:bg-[#DCD7CD] transition-colors cursor-pointer"
            >
              {isRevealed ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#89857E]" />
                  <span>Ausblenden</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#C83B32]" />
                  <span>Transkript anzeigen</span>
                </>
              )}
            </button>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-[#89857E]">
              <Lock className="w-3 h-3" />
              <span>Nach Abgabe sichtbar</span>
            </span>
          )}
        </div>

        {/* Transcript Content */}
        {isRevealed && canReveal ? (
          <div className="space-y-3 text-xs text-[#171717] leading-relaxed pt-1 bg-[#FAF8F5] p-3.5 rounded-[4px] border border-[#E8E5DD]">
            {transcript.dialogue && transcript.dialogue.length > 0 ? (
              <div className="space-y-2.5">
                {transcript.dialogue.map((turn, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <strong className="text-[#C83B32] font-semibold shrink-0 min-w-[110px]">
                      {turn.speaker}:
                    </strong>
                    <span className="text-[#333333]">{turn.text}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[#333333] italic whitespace-pre-line">
                {transcript.fullText || transcript.summary}
              </p>
            )}
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-[#89857E] bg-[#FAF8F5] rounded border border-dashed border-[#DCD7CD]">
            <p>
              {isDictation
                ? 'Das Transkript ist während des Diktats ausgeblendet, um Ihr Hörverstehen objektiv zu prüfen.'
                : 'Versuchen Sie zuerst, die Fragen ohne Transkript allein über das Audio zu lösen.'}
            </p>
          </div>
        )}
      </div>

      {/* 2. Vocabulary Assistance Card */}
      {vocabulary && vocabulary.length > 0 && (
        <div className="skeuo-paper rounded-[6px] border border-[#DEDAD1] p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 border-b border-[#ECE8E0] pb-2">
            <BookOpen className="w-4 h-4 text-[#D7B95D]" />
            <h4 className="text-xs sm:text-sm font-heading font-bold text-[#171717]">
              Wortschatz-Hilfe (Vocabulary)
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {vocabulary.map((voc, idx) => (
              <div
                key={idx}
                className="p-2 rounded-[4px] bg-[#FAF8F5] border border-[#E8E5DD] flex items-baseline justify-between gap-2"
              >
                <strong className="text-[#171717] font-semibold">{voc.german}</strong>
                <span className="text-[#55534F] text-[11px] text-right">{voc.english}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Listening Strategy Tip */}
      {listeningTip && (
        <div className="p-3.5 rounded-[6px] bg-[#FAF8F2] border border-[#D7B95D]/40 text-xs text-[#55534F] flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-[#D7B95D] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <strong className="text-[#171717] block font-semibold">Hörtipp von D9W:</strong>
            <p className="text-[11px] leading-relaxed">{listeningTip}</p>
          </div>
        </div>
      )}
    </div>
  )
}
