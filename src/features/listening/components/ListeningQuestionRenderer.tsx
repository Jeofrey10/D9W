import React from 'react'
import {
  ListeningQuestion,
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  FillBlankQuestion,
  DictationQuestion,
} from '../types/listening.types'
import { CheckCircle2, XCircle, HelpCircle, PenTool } from 'lucide-react'

interface ListeningQuestionRendererProps {
  question: ListeningQuestion
  index: number
  givenAnswer: string | number | boolean | undefined
  onChangeAnswer: (questionId: string, value: string | number | boolean) => void
  isSubmitted: boolean
}

export const ListeningQuestionRenderer: React.FC<ListeningQuestionRendererProps> = ({
  question,
  index,
  givenAnswer,
  onChangeAnswer,
  isSubmitted,
}) => {
  return (
    <div className="skeuo-paper rounded-[6px] p-5 sm:p-6 border border-[#DEDAD1] shadow-xs space-y-4">
      {/* Question Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-full bg-[#171717] text-white text-xs font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <h4 className="text-sm sm:text-base font-heading font-bold text-[#171717]">
            {question.prompt || (question.type === 'true-false' ? 'Richtig oder Falsch?' : '')}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-[#89857E] bg-[#E8E5DD] px-2 py-0.5 rounded shrink-0">
          {question.points} Pkt.
        </span>
      </div>

      {/* Question Body by Type */}
      {question.type === 'multiple-choice' && (
        <MultipleChoiceField
          question={question}
          givenAnswer={givenAnswer as number | undefined}
          onChangeAnswer={(val) => onChangeAnswer(question.id, val)}
          isSubmitted={isSubmitted}
        />
      )}

      {question.type === 'true-false' && (
        <TrueFalseField
          question={question}
          givenAnswer={givenAnswer as boolean | undefined}
          onChangeAnswer={(val) => onChangeAnswer(question.id, val)}
          isSubmitted={isSubmitted}
        />
      )}

      {question.type === 'fill-blank' && (
        <FillBlankField
          question={question}
          givenAnswer={givenAnswer as string | undefined}
          onChangeAnswer={(val) => onChangeAnswer(question.id, val)}
          isSubmitted={isSubmitted}
        />
      )}

      {question.type === 'dictation' && (
        <DictationField
          question={question}
          givenAnswer={givenAnswer as string | undefined}
          onChangeAnswer={(val) => onChangeAnswer(question.id, val)}
          isSubmitted={isSubmitted}
        />
      )}

      {/* Feedback & Explanation (Displayed after submission) */}
      {isSubmitted && question.explanation && (
        <div className="pt-3 border-t border-[#ECE8E0] space-y-1 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#171717]">
            <HelpCircle className="w-3.5 h-3.5 text-[#D7B95D]" />
            <span>Erklärung / Explanation:</span>
          </div>
          <p className="text-[#55534F] leading-relaxed pl-5">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}

/**
 * Multiple Choice Selector
 */
const MultipleChoiceField: React.FC<{
  question: MultipleChoiceQuestion
  givenAnswer: number | undefined
  onChangeAnswer: (val: number) => void
  isSubmitted: boolean
}> = ({ question, givenAnswer, onChangeAnswer, isSubmitted }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
      {question.options.map((option, idx) => {
        const isSelected = givenAnswer === idx
        const isCorrectChoice = idx === question.correctAnswer

        let stateClass =
          'bg-white border-[#DCD7CD] text-[#55534F] hover:bg-[#FAF8F5] hover:border-[#171717]'

        if (isSubmitted) {
          if (isCorrectChoice) {
            stateClass = 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] font-semibold'
          } else if (isSelected && !isCorrectChoice) {
            stateClass = 'bg-[#C83B32]/10 border-[#C83B32] text-[#C83B32] line-through'
          } else {
            stateClass = 'opacity-50 border-[#E8E5DD]'
          }
        } else if (isSelected) {
          stateClass = 'bg-[#171717] text-white border-[#171717] shadow-inner translate-y-0.5'
        }

        return (
          <button
            type="button"
            key={idx}
            disabled={isSubmitted}
            onClick={() => onChangeAnswer(idx)}
            className={`p-3 rounded-[5px] text-xs font-medium text-left border transition-all flex items-center justify-between gap-2 ${stateClass} ${
              isSubmitted ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <span>{option}</span>
            {isSubmitted && isCorrectChoice && (
              <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
            )}
            {isSubmitted && isSelected && !isCorrectChoice && (
              <XCircle className="w-4 h-4 text-[#C83B32] shrink-0" />
            )}
          </button>
        )
      })}
    </div>
  )
}

/**
 * True/False (Richtig / Falsch) Selector
 */
const TrueFalseField: React.FC<{
  question: TrueFalseQuestion
  givenAnswer: boolean | undefined
  onChangeAnswer: (val: boolean) => void
  isSubmitted: boolean
}> = ({ question, givenAnswer, onChangeAnswer, isSubmitted }) => {
  return (
    <div className="space-y-3 pt-1">
      <div className="p-3.5 rounded-[5px] bg-[#FAF8F5] border border-[#DEDAD1] text-xs font-semibold text-[#171717]">
        &ldquo;{question.statement}&rdquo;
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Richtig (True)', val: true },
          { label: 'Falsch (False)', val: false },
        ].map((opt) => {
          const isSelected = givenAnswer === opt.val
          const isTarget = question.isCorrect === opt.val

          let stateClass =
            'bg-white border-[#DCD7CD] text-[#55534F] hover:bg-[#FAF8F5] hover:border-[#171717]'

          if (isSubmitted) {
            if (isTarget) {
              stateClass = 'bg-[#2E7D32]/10 border-[#2E7D32] text-[#2E7D32] font-semibold'
            } else if (isSelected && !isTarget) {
              stateClass = 'bg-[#C83B32]/10 border-[#C83B32] text-[#C83B32]'
            } else {
              stateClass = 'opacity-50 border-[#E8E5DD]'
            }
          } else if (isSelected) {
            stateClass = 'bg-[#171717] text-white border-[#171717] shadow-inner translate-y-0.5'
          }

          return (
            <button
              type="button"
              key={String(opt.val)}
              disabled={isSubmitted}
              onClick={() => onChangeAnswer(opt.val)}
              className={`py-3 px-4 rounded-[5px] text-xs font-bold text-center border transition-all flex items-center justify-center gap-2 ${stateClass} ${
                isSubmitted ? 'cursor-default' : 'cursor-pointer'
              }`}
            >
              <span>{opt.label}</span>
              {isSubmitted && isTarget && (
                <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Fill in the Blank Input
 */
const FillBlankField: React.FC<{
  question: FillBlankQuestion
  givenAnswer: string | undefined
  onChangeAnswer: (val: string) => void
  isSubmitted: boolean
}> = ({ question, givenAnswer = '', onChangeAnswer, isSubmitted }) => {
  return (
    <div className="space-y-2 pt-1">
      <div className="p-4 rounded-[5px] bg-[#FAF8F5] border border-[#DEDAD1] text-xs sm:text-sm text-[#171717] leading-relaxed flex flex-wrap items-center gap-2">
        <span>{question.sentencePrefix}</span>
        <input
          type="text"
          disabled={isSubmitted}
          value={givenAnswer}
          onChange={(e) => onChangeAnswer(e.target.value)}
          placeholder="Antwort eingeben..."
          className={`h-9 px-3 rounded-[4px] text-xs font-semibold border ${
            isSubmitted
              ? 'bg-[#E8E5DD] text-[#171717] border-[#C8C4B7]'
              : 'bg-white text-[#171717] border-[#DCD7CD] focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32]'
          } min-w-[140px]`}
        />
        <span>{question.sentenceSuffix}</span>
      </div>

      {isSubmitted && (
        <div className="text-xs text-[#55534F] pl-1">
          <span>Akzeptierte Antworten: </span>
          <strong className="text-[#2E7D32] font-mono">
            {question.acceptedAnswers.join(' / ')}
          </strong>
        </div>
      )}
    </div>
  )
}

/**
 * Dictation Typing Field
 */
const DictationField: React.FC<{
  question: DictationQuestion
  givenAnswer: string | undefined
  onChangeAnswer: (val: string) => void
  isSubmitted: boolean
}> = ({ question, givenAnswer = '', onChangeAnswer, isSubmitted }) => {
  return (
    <div className="space-y-3 pt-1">
      {question.hint && (
        <div className="flex items-center gap-1.5 text-xs text-[#89857E]">
          <PenTool className="w-3.5 h-3.5 text-[#D7B95D]" />
          <span>Hinweis: {question.hint}</span>
        </div>
      )}

      <textarea
        rows={3}
        disabled={isSubmitted}
        value={givenAnswer}
        onChange={(e) => onChangeAnswer(e.target.value)}
        placeholder="Hören Sie zu und tippen Sie den gesprochenen Satz hier ein..."
        className={`w-full p-3 rounded-[5px] text-xs sm:text-sm border ${
          isSubmitted
            ? 'bg-[#E8E5DD] text-[#171717] border-[#C8C4B7]'
            : 'bg-white text-[#171717] border-[#DCD7CD] focus:ring-1 focus:ring-[#C83B32] focus:border-[#C83B32]'
        } resize-y leading-relaxed`}
      />

      {isSubmitted && (
        <div className="p-3 rounded-[5px] bg-[#2E7D32]/10 border border-[#2E7D32]/30 text-xs space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-[#2E7D32] block">
            Originaltranskript (Lösung):
          </span>
          <p className="font-semibold text-[#171717] leading-relaxed">
            {question.fullText}
          </p>
        </div>
      )}
    </div>
  )
}
