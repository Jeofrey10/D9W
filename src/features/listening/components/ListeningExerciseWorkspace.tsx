import React, { useState, useEffect, useRef } from 'react'
import {
  ListeningExercise,
  ExerciseAttemptResult,
} from '../types/listening.types'
import { ListeningAudioPlayer } from './ListeningAudioPlayer'
import { ListeningQuestionRenderer } from './ListeningQuestionRenderer'
import { ListeningTranscriptPanel } from './ListeningTranscriptPanel'
import { ListeningResultPanel } from './ListeningResultPanel'
import { evaluateExerciseSubmission } from '../utils/listeningScoring'
import { Button } from '@/components/common/Button'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react'

interface ListeningExerciseWorkspaceProps {
  exercise: ListeningExercise
  onBackToLibrary: () => void
  onRecordAttempt: (result: ExerciseAttemptResult, durationSeconds: number) => void
  onNextExercise?: () => void
  onPrevExercise?: () => void
}

export const ListeningExerciseWorkspace: React.FC<ListeningExerciseWorkspaceProps> = ({
  exercise,
  onBackToLibrary,
  onRecordAttempt,
  onNextExercise,
  onPrevExercise,
}) => {
  const [givenAnswers, setGivenAnswers] = useState<Record<string, string | number | boolean>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptResult, setAttemptResult] = useState<ExerciseAttemptResult | null>(null)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = Date.now()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleAnswerChange = (questionId: string, val: string | number | boolean) => {
    if (isSubmitted) return
    setGivenAnswers((prev) => ({ ...prev, [questionId]: val }))
  }

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (isSubmitted) return

    const timeSpentSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000))
    const result = evaluateExerciseSubmission(exercise, givenAnswers, timeSpentSeconds)

    setAttemptResult(result)
    setIsSubmitted(true)
    onRecordAttempt(result, exercise.audioDurationSeconds)
  }

  const handleRetry = () => {
    setGivenAnswers({})
    setIsSubmitted(false)
    setAttemptResult(null)
    startTimeRef.current = Date.now()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalAnswered = Object.keys(givenAnswers).length
  const totalQuestions = exercise.questions.length
  const canSubmit = totalAnswered > 0

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECE8E0] pb-4">
        <button
          type="button"
          onClick={onBackToLibrary}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55534F] hover:text-[#171717] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Zurück zur Übungsübersicht</span>
        </button>

        <div className="flex items-center gap-2">
          {onPrevExercise && (
            <button
              type="button"
              onClick={onPrevExercise}
              className="px-2.5 py-1 rounded text-xs font-semibold text-[#55534F] hover:text-[#171717] bg-[#E8E5DD] hover:bg-[#DCD7CD] transition-colors cursor-pointer"
            >
              Vorherige
            </button>
          )}
          {onNextExercise && (
            <button
              type="button"
              onClick={onNextExercise}
              className="px-2.5 py-1 rounded text-xs font-semibold text-[#171717] bg-[#E8E5DD] hover:bg-[#DCD7CD] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Nächste</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Exercise Header */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-8 h-8 rounded-[4px] bg-[#171717] text-white font-mono font-bold text-sm flex items-center justify-center">
            {exercise.level}
          </span>
          <span className="text-xs font-semibold text-[#C83B32] uppercase tracking-wide">
            {exercise.category} &bull; {exercise.exerciseType}
          </span>
          <span className="text-[#89857E] text-xs flex items-center gap-1 ml-auto">
            <Clock className="w-3.5 h-3.5" />
            <span>ca. {exercise.estimatedDurationMinutes} Min.</span>
          </span>
        </div>

        <h2 className="text-xl sm:text-3xl font-heading font-extrabold text-[#171717] tracking-tight">
          {exercise.title}
        </h2>
        <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
          {exercise.subtitleDe}
        </p>
      </div>

      {/* Pinned Audio Player */}
      <ListeningAudioPlayer
        audioSrc={exercise.audioSrc}
        audioDurationSeconds={exercise.audioDurationSeconds}
        audioStatus={exercise.audioStatus}
        title={exercise.title}
      />

      {/* Instructions Card */}
      <div className="p-4 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[#171717]">
          <Sparkles className="w-3.5 h-3.5 text-[#C83B32]" />
          <span>Aufgabenstellung (Instructions):</span>
        </div>
        <p className="text-[#333333] font-medium leading-relaxed">
          {exercise.instructionsDe}
        </p>
        <p className="text-[#89857E] italic text-[11px]">
          {exercise.instructionsEn}
        </p>
      </div>

      {/* Main Grid: Left Questions / Right Transcript & Vocabulary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Questions or Final Result */}
        <div className="lg:col-span-7 space-y-6">
          {/* Result Panel if submitted */}
          {isSubmitted && attemptResult && (
            <ListeningResultPanel
              result={attemptResult}
              onRetry={handleRetry}
              onNextExercise={onNextExercise}
              onBackToLibrary={onBackToLibrary}
              onReviewAnswers={() => {
                const el = document.getElementById('questions-container')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            />
          )}

          {/* Question Cards */}
          <div id="questions-container" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-[#171717] uppercase tracking-wide">
                Verständnisfragen ({totalQuestions})
              </h3>
              <span className="text-xs text-[#89857E]">
                Beantwortet: {totalAnswered} / {totalQuestions}
              </span>
            </div>

            {exercise.questions.map((question, idx) => (
              <ListeningQuestionRenderer
                key={question.id}
                question={question}
                index={idx}
                givenAnswer={givenAnswers[question.id]}
                onChangeAnswer={handleAnswerChange}
                isSubmitted={isSubmitted}
              />
            ))}
          </div>

          {/* Submission Action Bar */}
          {!isSubmitted && (
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#ECE8E0]">
              <span className="text-xs text-[#55534F]">
                {totalAnswered < totalQuestions
                  ? `Sie haben ${totalAnswered} von ${totalQuestions} Fragen beantwortet.`
                  : 'Alle Fragen beantwortet! Bereit zur Auswertung.'}
              </span>

              <Button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                variant="primary"
                size="md"
                className="w-full sm:w-auto min-w-[200px]"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                <span>Antworten auswerten</span>
              </Button>
            </div>
          )}
        </div>

        {/* Right Column: Transcript, Vocabulary & Study Advice */}
        <div className="lg:col-span-5 space-y-6">
          <ListeningTranscriptPanel
            transcript={exercise.transcript}
            vocabulary={exercise.vocabulary}
            listeningTip={exercise.listeningTip}
            exerciseType={exercise.exerciseType}
            isSubmitted={isSubmitted}
          />
        </div>
      </div>
    </div>
  )
}
