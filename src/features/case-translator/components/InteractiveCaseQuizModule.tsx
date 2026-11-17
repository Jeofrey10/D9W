import React, { useState, useMemo } from 'react'
import { CASE_QUIZ_QUESTIONS } from '@/data/grammar/case-questions'
import {
  CaseQuizQuestion,
  CaseQuizSubmission,
  GrammaticalCase,
} from '../types/caseTranslator.types'
import { useCaseProgress } from '../hooks/useCaseProgress'
import {
  Check,
  X,
  RotateCcw,
  Trophy,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractiveCaseQuizModuleProps {
  initialCaseFilter?: GrammaticalCase
}

export const InteractiveCaseQuizModule: React.FC<
  InteractiveCaseQuizModuleProps
> = ({ initialCaseFilter }) => {
  const { recordQuizAnswer } = useCaseProgress()

  const [levelFilter, setLevelFilter] = useState<'All' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1'>('All')
  const [caseFilter, setCaseFilter] = useState<'All' | GrammaticalCase>(
    initialCaseFilter || 'All'
  )
  const [incorrectQuestionIds, setIncorrectQuestionIds] = useState<string[]>([])
  const [retryMode, setRetryMode] = useState(false)

  // Filter pool
  const questionsPool = useMemo(() => {
    let pool = CASE_QUIZ_QUESTIONS
    if (retryMode && incorrectQuestionIds.length > 0) {
      pool = pool.filter((q) => incorrectQuestionIds.includes(q.id))
    } else {
      if (levelFilter !== 'All') {
        pool = pool.filter((q) => q.level === levelFilter)
      }
      if (caseFilter !== 'All') {
        pool = pool.filter((q) => q.targetCase === caseFilter)
      }
    }
    return pool.length > 0 ? pool : CASE_QUIZ_QUESTIONS
  }, [levelFilter, caseFilter, retryMode, incorrectQuestionIds])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0)
  const [isSessionComplete, setIsSessionComplete] = useState(false)

  const currentQuestion: CaseQuizQuestion | undefined = questionsPool[currentIndex]

  const handleSelectOption = (index: number) => {
    if (isAnswered || !currentQuestion) return

    setSelectedOption(index)
    setIsAnswered(true)

    const isCorrect = index === currentQuestion.correctIndex
    if (isCorrect) {
      setSessionCorrectCount((prev) => prev + 1)
    } else {
      setIncorrectQuestionIds((prev) => [...prev, currentQuestion.id])
    }

    // Persist answer to progress
    const submission: CaseQuizSubmission = {
      questionId: currentQuestion.id,
      selectedIndex: index,
      isCorrect,
      targetCase: currentQuestion.targetCase,
      answeredAt: new Date().toISOString(),
    }
    recordQuizAnswer(submission)
  }

  const handleNext = () => {
    if (currentIndex + 1 < questionsPool.length) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setIsSessionComplete(true)
    }
  }

  const handleRestart = (onlyIncorrect = false) => {
    if (onlyIncorrect && incorrectQuestionIds.length > 0) {
      setRetryMode(true)
    } else {
      setRetryMode(false)
      setIncorrectQuestionIds([])
    }
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
    setSessionCorrectCount(0)
    setIsSessionComplete(false)
  }

  if (!currentQuestion) {
    return (
      <div className="skeuo-paper rounded-2xl p-8 text-center space-y-4">
        <p className="text-sm text-[#55534F]">Keine Fragen für diese Filterkombination gefunden.</p>
        <button
          onClick={() => {
            setLevelFilter('All')
            setCaseFilter('All')
          }}
          className="text-xs font-mono font-bold text-[#C83B32] hover:underline cursor-pointer"
        >
          Filter zurücksetzen
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* 1. Module Header & Filter Bar */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Modul E • Interaktiver Grammatiktest
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
              Kasus-Trainingsquiz
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#89857E]">
              Frage {currentIndex + 1} von {questionsPool.length}
            </span>
          </div>
        </div>

        {/* Filter controls */}
        {!isSessionComplete && (
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Level Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-mono text-[#89857E]">Niveau:</span>
              {(['All', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setLevelFilter(lvl)
                    handleRestart(false)
                  }}
                  className={cn(
                    'px-2 py-0.5 rounded font-mono text-xs transition-all cursor-pointer',
                    levelFilter === lvl
                      ? 'bg-[#171717] text-white font-bold'
                      : 'bg-[#FAF8F5] text-[#55534F] hover:bg-white border border-[#DEDAD1]'
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Case Filter */}
            <div className="flex items-center gap-1.5 text-xs ml-auto">
              <span className="font-mono text-[#89857E]">Kasus:</span>
              {(['All', 'Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setCaseFilter(c)
                    handleRestart(false)
                  }}
                  className={cn(
                    'px-2 py-0.5 rounded font-mono text-xs transition-all cursor-pointer',
                    caseFilter === c
                      ? 'bg-[#C83B32] text-white font-bold'
                      : 'bg-[#FAF8F5] text-[#55534F] hover:bg-white border border-[#DEDAD1]'
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Active Question View */}
      {!isSessionComplete ? (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          {/* Progress Bar */}
          <div className="w-full bg-[#FAF8F5] h-1.5 rounded-full overflow-hidden border border-[#E5E0D8]">
            <div
              className="bg-[#C83B32] h-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questionsPool.length) * 100}%`,
              }}
            />
          </div>

          {/* Meta & Prompt */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DEDAD1] font-bold text-[#89857E]">
                {currentQuestion.level}
              </span>
              <span className="text-xs font-mono text-[#89857E]">
                {currentQuestion.grammarConcept}
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-serif font-bold text-[#171717]">
              {currentQuestion.prompt}
            </h3>

            {currentQuestion.sentenceWithBlank && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-base sm:text-lg font-serif text-[#171717]">
                {currentQuestion.sentenceWithBlank}
              </div>
            )}
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx
              const isCorrectAnswer = idx === currentQuestion.correctIndex

              let optionStyle =
                'bg-white border-[#DEDAD1] text-[#171717] hover:border-[#171717]'

              if (isAnswered) {
                if (isCorrectAnswer) {
                  optionStyle =
                    'bg-[#F0FDF4] border-[#15803D] text-[#15803D] font-bold'
                } else if (isSelected) {
                  optionStyle =
                    'bg-[#FEF2F2] border-[#C83B32] text-[#C83B32] font-bold'
                } else {
                  optionStyle = 'opacity-50 border-[#E5E0D8] text-[#89857E]'
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left font-serif transition-all flex items-center justify-between shadow-2xs',
                    isAnswered ? 'cursor-default' : 'cursor-pointer active:translate-y-px',
                    optionStyle
                  )}
                >
                  <span className="text-sm sm:text-base">{opt}</span>
                  {isAnswered && isCorrectAnswer && (
                    <Check className="w-5 h-5 text-[#15803D] shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <X className="w-5 h-5 text-[#C83B32] shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Feedback & Explanation (revealed immediately on answer) */}
          {isAnswered && (
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                {selectedOption === currentQuestion.correctIndex ? (
                  <span className="text-xs font-mono font-bold text-[#15803D] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Richtig beantwortet!
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-[#C83B32] flex items-center gap-1">
                    <X className="w-4 h-4" />
                    Nicht ganz richtig
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-sans text-[#55534F] leading-relaxed">
                <strong className="text-[#171717] font-mono">Erklärung: </strong>
                {currentQuestion.explanation}
              </p>

              <div className="pt-2 text-right">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#171717] hover:bg-black text-white text-xs font-sans font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  {currentIndex + 1 < questionsPool.length ? 'Nächste Frage' : 'Quiz abschließen'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* 3. Session Complete Summary Screen */
        <div className="skeuo-paper rounded-2xl p-8 sm:p-10 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#FAF6E8] border border-[#D7B95D]/40 text-[#D7B95D] flex items-center justify-center mx-auto shadow-sm">
            <Trophy className="w-8 h-8 text-[#854D0E]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-[#89857E]">
              Quiz abgeschlossen
            </span>
            <h3 className="text-3xl font-serif font-bold text-[#171717]">
              {Math.round((sessionCorrectCount / questionsPool.length) * 100)}% Richtig
            </h3>
            <p className="text-sm font-sans text-[#55534F]">
              Sie haben <strong>{sessionCorrectCount}</strong> von{' '}
              <strong>{questionsPool.length}</strong> Fragen erfolgreich gelöst.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => handleRestart(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#DEDAD1] bg-white text-xs font-sans font-semibold text-[#171717] hover:bg-[#FAF8F5] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Quiz wiederholen
            </button>

            {incorrectQuestionIds.length > 0 && (
              <button
                onClick={() => handleRestart(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C83B32] text-white text-xs font-sans font-bold hover:bg-[#B3342C] shadow-sm cursor-pointer"
              >
                Nur falsche Fragen wiederholen ({incorrectQuestionIds.length})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
