import React from 'react'
import { ExerciseAttemptResult } from '../types/listening.types'
import { getScoreTier, formatAudioTime } from '../utils/listeningScoring'
import { Button } from '@/components/common/Button'
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  Library,
} from 'lucide-react'

interface ListeningResultPanelProps {
  result: ExerciseAttemptResult
  onRetry: () => void
  onNextExercise?: () => void
  onBackToLibrary: () => void
  onReviewAnswers: () => void
}

export const ListeningResultPanel: React.FC<ListeningResultPanelProps> = ({
  result,
  onRetry,
  onNextExercise,
  onBackToLibrary,
  onReviewAnswers,
}) => {
  const tierInfo = getScoreTier(result.scorePercent)

  const correctCount = result.answers.filter((a) => a.isCorrect).length
  const totalCount = result.answers.length

  return (
    <div className="skeuo-paper-stacked rounded-[8px] p-6 sm:p-8 border border-[#DCD7CD] space-y-6 text-center">
      {/* Ink Stamp / Score Badge */}
      <div className="space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#171717] text-[#D7B95D] flex items-center justify-center mx-auto shadow-md">
          <Award className="w-8 h-8" />
        </div>

        <div>
          <span
            className={`inline-block px-3 py-0.5 rounded-full text-xs font-mono font-bold border uppercase tracking-wider ${tierInfo.colorBadgeClass}`}
          >
            {tierInfo.labelDe} &bull; {tierInfo.labelEn}
          </span>
          <div className="text-4xl sm:text-5xl font-mono font-extrabold text-[#171717] tracking-tight mt-2">
            {result.scorePercent}%
          </div>
          <p className="text-xs sm:text-sm text-[#55534F] max-w-md mx-auto mt-2 leading-relaxed">
            {tierInfo.feedbackText}
          </p>
        </div>
      </div>

      {/* Metrics Flashcard */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] text-xs">
        <div className="space-y-1">
          <span className="text-[#89857E] text-[11px] block flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
            Richtig
          </span>
          <strong className="text-base font-mono font-bold text-[#2E7D32]">
            {correctCount} / {totalCount}
          </strong>
        </div>

        <div className="space-y-1 border-x border-[#E8E5DD]">
          <span className="text-[#89857E] text-[11px] block flex items-center justify-center gap-1">
            <XCircle className="w-3.5 h-3.5 text-[#C83B32]" />
            Punkte
          </span>
          <strong className="text-base font-mono font-bold text-[#171717]">
            {result.earnedPoints} / {result.totalPoints}
          </strong>
        </div>

        <div className="space-y-1">
          <span className="text-[#89857E] text-[11px] block flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#D7B95D]" />
            Zeit
          </span>
          <strong className="text-base font-mono font-bold text-[#171717]">
            {formatAudioTime(result.timeSpentSeconds)}
          </strong>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Button
          type="button"
          onClick={onReviewAnswers}
          variant="outline"
          size="md"
          className="w-full sm:w-auto"
        >
          <span>Antworten prüfen</span>
        </Button>

        <Button
          type="button"
          onClick={onRetry}
          variant="secondary"
          size="md"
          className="w-full sm:w-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
          <span>Übung wiederholen</span>
        </Button>

        {onNextExercise && (
          <Button
            type="button"
            onClick={onNextExercise}
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
          >
            <span>Nächste Übung</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        )}

        <Button
          type="button"
          onClick={onBackToLibrary}
          variant="ghost"
          size="md"
          className="w-full sm:w-auto text-[#55534F] hover:text-[#171717]"
        >
          <Library className="w-3.5 h-3.5 mr-1.5" />
          <span>Zurück zur Übersicht</span>
        </Button>
      </div>
    </div>
  )
}
