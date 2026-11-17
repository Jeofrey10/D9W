import React from 'react'
import { ReadingQuestion } from '../types/reading.types'
import { isQuestionAnswerCorrect } from '../utils/readingScoring'
import { cn } from '@/lib/utils'
import { Check, X, HelpCircle, Eye } from 'lucide-react'

interface ReadingQuestionRendererProps {
  questions: ReadingQuestion[]
  userAnswers: Record<string, string | number | boolean>
  isSubmitted: boolean
  onAnswerChange: (questionId: string, val: string | number | boolean) => void
}

export const ReadingQuestionRenderer: React.FC<ReadingQuestionRendererProps> = ({
  questions,
  userAnswers,
  isSubmitted,
  onAnswerChange,
}) => {
  const [showModelAnswer, setShowModelAnswer] = React.useState<Record<string, boolean>>({})

  const toggleModelAnswer = (qId: string) => {
    setShowModelAnswer((prev) => ({ ...prev, [qId]: !prev[qId] }))
  }

  return (
    <div className="space-y-6">
      {questions.map((question, qIdx) => {
        const userAnswer = userAnswers[question.id]
        const isCorrect = isSubmitted
          ? isQuestionAnswerCorrect(question, userAnswer)
          : null

        return (
          <div
            key={question.id}
            className={cn(
              'rounded-xl border p-5 transition-all',
              isSubmitted
                ? isCorrect
                  ? 'border-[#BBF7D0] bg-[#F0FDF4]/50'
                  : 'border-[#FECACA] bg-[#FEF2F2]/50'
                : 'border-[#DEDAD1] bg-white'
            )}
          >
            {/* Question Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F7F5F0] text-xs font-mono font-bold text-[#171717] border border-[#DEDAD1]">
                  {qIdx + 1}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#89857E]">
                  {question.type === 'multiple-choice' && 'Multiple Choice'}
                  {question.type === 'true-false' && 'Richtig oder Falsch'}
                  {question.type === 'fill-blank' && 'Lückentext'}
                  {question.type === 'short-answer' && 'Freie Textantwort'}
                </span>
              </div>

              {isSubmitted && (
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-[#15803D]">
                      <Check className="h-4 w-4" /> Richtig (+10 Pkt)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[#C83B32]">
                      <X className="h-4 w-4" /> Falsch
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Prompt */}
            <h4 className="text-base font-semibold text-[#171717] mb-4">
              {question.prompt}
            </h4>

            {/* Question Content by Type */}
            {question.type === 'multiple-choice' && (
              <div className="space-y-2">
                {question.options.map((option, optIdx) => {
                  const isSelected = userAnswer === optIdx
                  const isTarget = isSubmitted && question.correctIndex === optIdx

                  return (
                    <label
                      key={optIdx}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border p-3 text-sm transition-all cursor-pointer',
                        isSelected
                          ? 'border-[#171717] bg-[#F7F5F0] font-medium'
                          : 'border-[#DEDAD1] hover:bg-[#FAF8F5]',
                        isSubmitted &&
                          isTarget &&
                          'border-[#15803D] bg-[#F0FDF4] font-semibold text-[#15803D]',
                        isSubmitted &&
                          isSelected &&
                          !isCorrect &&
                          'border-[#C83B32] bg-[#FEF2F2] text-[#C83B32]'
                      )}
                    >
                      <input
                        type="radio"
                        name={`q-${question.id}`}
                        disabled={isSubmitted}
                        checked={isSelected}
                        onChange={() => onAnswerChange(question.id, optIdx)}
                        className="h-4 w-4 text-[#171717] focus:ring-[#C83B32]"
                      />
                      <span>{option}</span>
                    </label>
                  )
                })}
              </div>
            )}

            {question.type === 'true-false' && (
              <div className="space-y-3">
                <div className="italic text-sm text-[#55534F] bg-[#FAF8F5] p-3 rounded-lg border border-[#EFECE6]">
                  "{question.statement}"
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => onAnswerChange(question.id, true)}
                    className={cn(
                      'flex-1 rounded-lg border py-2.5 text-sm font-semibold transition-all',
                      userAnswer === true
                        ? 'border-[#171717] bg-[#171717] text-white shadow-sm'
                        : 'border-[#DEDAD1] bg-white text-[#171717] hover:bg-[#F7F5F0]',
                      isSubmitted &&
                        question.correctAnswer === true &&
                        'border-[#15803D] bg-[#15803D] text-white'
                    )}
                  >
                    Richtig
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => onAnswerChange(question.id, false)}
                    className={cn(
                      'flex-1 rounded-lg border py-2.5 text-sm font-semibold transition-all',
                      userAnswer === false
                        ? 'border-[#171717] bg-[#171717] text-white shadow-sm'
                        : 'border-[#DEDAD1] bg-white text-[#171717] hover:bg-[#F7F5F0]',
                      isSubmitted &&
                        question.correctAnswer === false &&
                        'border-[#15803D] bg-[#15803D] text-white'
                    )}
                  >
                    Falsch
                  </button>
                </div>
              </div>
            )}

            {question.type === 'fill-blank' && (
              <div className="space-y-2">
                <div className="text-sm font-serif text-[#171717] mb-2">
                  {question.sentenceWithBlank}
                </div>
                <input
                  type="text"
                  disabled={isSubmitted}
                  value={String(userAnswer || '')}
                  placeholder="Ihre Antwort eingeben..."
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  className="w-full rounded-lg border border-[#DEDAD1] bg-[#FAF8F5] px-3.5 py-2 text-sm focus:border-[#171717] focus:bg-white focus:outline-none"
                />
                {isSubmitted && (
                  <div className="text-xs text-[#55534F]">
                    Akzeptierte Antworten:{' '}
                    <strong className="text-[#15803D]">
                      {question.acceptedAnswers.join(', ')}
                    </strong>
                  </div>
                )}
              </div>
            )}

            {question.type === 'short-answer' && (
              <div className="space-y-3">
                <textarea
                  rows={2}
                  disabled={isSubmitted}
                  value={String(userAnswer || '')}
                  placeholder="Formulieren Sie eine kurze Antwort auf Deutsch..."
                  onChange={(e) => onAnswerChange(question.id, e.target.value)}
                  className="w-full rounded-lg border border-[#DEDAD1] bg-[#FAF8F5] p-3 text-sm focus:border-[#171717] focus:bg-white focus:outline-none"
                />

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleModelAnswer(question.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#89857E] hover:text-[#171717]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    {showModelAnswer[question.id]
                      ? 'Musterlösung ausblenden'
                      : 'Musterlösung ansehen'}
                  </button>
                </div>

                {showModelAnswer[question.id] && (
                  <div className="rounded-lg bg-[#FAF8F5] p-3 border border-[#EFECE6] text-xs space-y-1">
                    <div className="font-semibold text-[#171717]">
                      Musterlösung:
                    </div>
                    <div className="italic text-[#55534F]">
                      "{question.modelAnswer}"
                    </div>
                    <div className="text-[11px] text-[#89857E] pt-1 border-t border-[#EFECE6]">
                      Leitfaden: {question.gradingGuidance}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Explanation Drawer on Submission */}
            {isSubmitted && question.explanation && (
              <div className="mt-4 rounded-lg bg-[#F7F5F0] p-3 text-xs text-[#55534F] border border-[#EFECE6] flex items-start gap-2">
                <HelpCircle className="h-4 w-4 shrink-0 text-[#C83B32] mt-0.5" />
                <div>
                  <strong className="text-[#171717]">Erklärung: </strong>
                  {question.explanation}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
