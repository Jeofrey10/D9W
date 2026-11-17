import React, { useState, useMemo } from 'react'
import { DailyWordItem, DailyWordQuizSubmission } from '../types/dailyWord.types'
import { generateDailyWordQuiz, scoreDailyQuiz } from '../utils/dailyWordQuizGenerator'
import { Check, X, Sparkles, RotateCcw, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DailyWordMiniQuizProps {
  item: DailyWordItem
  onRecordQuiz: (submission: DailyWordQuizSubmission) => void
  previousAttempts?: DailyWordQuizSubmission[]
}

export const DailyWordMiniQuiz: React.FC<DailyWordMiniQuizProps> = ({
  item,
  onRecordQuiz,
  previousAttempts = [],
}) => {
  const questions = useMemo(
    () => generateDailyWordQuiz(item.vocabulary),
    [item.vocabulary]
  )

  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentResult, setCurrentResult] = useState<DailyWordQuizSubmission | null>(
    null
  )

  const handleSelectAnswer = (qId: string, val: string | number) => {
    if (isSubmitted) return
    setAnswers((prev) => ({ ...prev, [qId]: val }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitted) return

    let correctCount = 0
    const pointsPerQuestion = 10

    for (const q of questions) {
      const given = answers[q.id]
      if (q.type === 'fill-blank') {
        if (
          String(given || '')
            .trim()
            .toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
        ) {
          correctCount++
        }
      } else {
        if (given === q.correctAnswer) {
          correctCount++
        }
      }
    }

    const evalResult = scoreDailyQuiz(correctCount, questions.length, pointsPerQuestion)

    const submission: DailyWordQuizSubmission = {
      dateKey: item.schedule.dateKey,
      vocabularyId: item.vocabulary.id,
      answers,
      earnedPoints: evalResult.earnedPoints,
      totalPoints: evalResult.totalPoints,
      scorePercent: evalResult.scorePercent,
      tier: evalResult.tier,
      submittedAt: new Date().toISOString(),
    }

    setCurrentResult(submission)
    setIsSubmitted(true)
    onRecordQuiz(submission)
  }

  const handleRetry = () => {
    setAnswers({})
    setIsSubmitted(false)
    setCurrentResult(null)
  }

  const getTierFeedback = (tier: DailyWordQuizSubmission['tier']) => {
    switch (tier) {
      case 'excellent':
        return {
          title: 'Ausgezeichnet!',
          color: 'text-[#15803D] bg-[#F0FDF4] border-[#BBF7D0]',
        }
      case 'very-good':
        return {
          title: 'Sehr gut!',
          color: 'text-[#1E3A8A] bg-[#EFF6FF] border-[#BFDBFE]',
        }
      case 'good':
        return {
          title: 'Gut gemacht!',
          color: 'text-[#D97706] bg-[#FFFBEB] border-[#FDE68A]',
        }
      default:
        return {
          title: 'Weiter üben!',
          color: 'text-[#C83B32] bg-[#FEF2F2] border-[#FECACA]',
        }
    }
  }

  return (
    <div className="rounded-2xl border border-[#DEDAD1] bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-[#D7B95D]" />
          Tages-Mini-Quiz ({questions.length} Fragen)
        </h3>
        {previousAttempts.length > 0 && (
          <span className="text-[11px] font-mono text-[#15803D] font-bold">
            Bestes Ergebnis: {Math.max(...previousAttempts.map((a) => a.scorePercent))}%
          </span>
        )}
      </div>

      {isSubmitted && currentResult ? (
        /* Result Display */
        <div className="rounded-xl border p-6 text-center space-y-4 animate-in fade-in">
          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-serif text-base font-bold uppercase tracking-wide border shadow-xs',
              getTierFeedback(currentResult.tier).color
            )}
          >
            <Trophy className="h-5 w-5" />
            <span>{getTierFeedback(currentResult.tier).title}</span>
          </div>

          <div className="text-3xl sm:text-4xl font-mono font-bold text-[#171717]">
            {currentResult.scorePercent}%
          </div>
          <p className="text-xs text-[#55534F]">
            Sie haben {currentResult.earnedPoints} von {currentResult.totalPoints} Punkten erreicht.
          </p>

          <button
            type="button"
            onClick={handleRetry}
            className="inline-flex items-center gap-2 rounded-xl border border-[#DEDAD1] bg-white px-4 py-2 text-xs font-semibold text-[#171717] hover:bg-[#FAF8F5] transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Quiz wiederholen
          </button>
        </div>
      ) : null}

      {/* Questions Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((q, idx) => {
          const userAnswer = answers[q.id]
          const isCorrect = isSubmitted
            ? q.type === 'fill-blank'
              ? String(userAnswer || '')
                  .trim()
                  .toLowerCase() === String(q.correctAnswer).trim().toLowerCase()
              : userAnswer === q.correctAnswer
            : null

          return (
            <div
              key={q.id}
              className={cn(
                'rounded-xl border p-4 sm:p-5 transition-all space-y-3',
                isSubmitted
                  ? isCorrect
                    ? 'border-[#BBF7D0] bg-[#F0FDF4]/60'
                    : 'border-[#FECACA] bg-[#FEF2F2]/60'
                  : 'border-[#DEDAD1] bg-[#FAF8F5]'
              )}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-[#89857E]">
                  Frage {idx + 1} von {questions.length}
                </span>
                {isSubmitted && (
                  <span
                    className={cn(
                      'font-bold inline-flex items-center gap-1',
                      isCorrect ? 'text-[#15803D]' : 'text-[#C83B32]'
                    )}
                  >
                    {isCorrect ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Richtig
                      </>
                    ) : (
                      <>
                        <X className="h-3.5 w-3.5" /> Falsch
                      </>
                    )}
                  </span>
                )}
              </div>

              <h4 className="text-sm font-semibold text-[#171717]">{q.prompt}</h4>

              {/* Format 1: Article selection */}
              {q.type === 'article-selection' && (
                <div className="grid grid-cols-3 gap-2">
                  {(q.options || ['der', 'die', 'das']).map((art) => (
                    <button
                      key={art}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelectAnswer(q.id, art)}
                      className={cn(
                        'rounded-lg border py-2 text-sm font-mono font-bold uppercase transition-all',
                        userAnswer === art
                          ? 'border-[#171717] bg-[#171717] text-white shadow-xs'
                          : 'border-[#DEDAD1] bg-white text-[#171717] hover:bg-[#FAF8F5]',
                        isSubmitted &&
                          art === q.correctAnswer &&
                          'border-[#15803D] bg-[#15803D] text-white font-bold'
                      )}
                    >
                      {art}
                    </button>
                  ))}
                </div>
              )}

              {/* Format 2: Meaning selection */}
              {q.type === 'meaning-selection' && (
                <div className="space-y-1.5">
                  {q.options?.map((opt, optIdx) => (
                    <label
                      key={optIdx}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border p-2.5 text-xs sm:text-sm transition-all cursor-pointer',
                        userAnswer === optIdx
                          ? 'border-[#171717] bg-white font-semibold shadow-xs'
                          : 'border-[#DEDAD1] bg-white hover:bg-[#FAF8F5]',
                        isSubmitted &&
                          optIdx === q.correctAnswer &&
                          'border-[#15803D] bg-[#F0FDF4] text-[#15803D] font-bold'
                      )}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        disabled={isSubmitted}
                        checked={userAnswer === optIdx}
                        onChange={() => handleSelectAnswer(q.id, optIdx)}
                        className="text-[#171717] focus:ring-[#C83B32]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Format 3: Fill in the blank */}
              {q.type === 'fill-blank' && (
                <div className="space-y-2">
                  <p className="text-xs font-serif italic text-[#55534F]">
                    „{q.options?.[0]}“
                  </p>
                  <input
                    type="text"
                    disabled={isSubmitted}
                    value={String(userAnswer || '')}
                    placeholder="Fehlendes Wort einfügen..."
                    onChange={(e) => handleSelectAnswer(q.id, e.target.value)}
                    className="w-full rounded-lg border border-[#DEDAD1] bg-white px-3 py-1.5 text-xs focus:border-[#171717] focus:outline-none"
                  />
                  {isSubmitted && (
                    <div className="text-[11px] text-[#55534F]">
                      Lösung:{' '}
                      <strong className="text-[#15803D]">{q.correctAnswer}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation after submission */}
              {isSubmitted && (
                <div className="pt-2 border-t border-[#EFECE6] text-[11px] text-[#55534F] leading-relaxed">
                  {q.explanation}
                </div>
              )}
            </div>
          )
        })}

        {!isSubmitted && (
          <button
            type="submit"
            className="w-full rounded-xl bg-[#171717] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[#333333] transition-colors"
          >
            Antworten prüfen
          </button>
        )}
      </form>
    </div>
  )
}
