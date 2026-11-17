import React, { useState, useRef, useEffect } from 'react'
import {
  ReadingPassage,
  ReadingWordToken,
  ContextualWordExplanation,
  ReadingAttemptResult,
} from '../types/reading.types'
import { useReadingPreferences } from '../hooks/useReadingPreferences'
import { useReadingVocabulary } from '../hooks/useReadingVocabulary'
import { InteractiveReadingText } from './InteractiveReadingText'
import { VocabularyPopover } from './VocabularyPopover'
import { ReadingSettings } from './ReadingSettings'
import { ReadingQuestionRenderer } from './ReadingQuestionRenderer'
import { ReadingResultPanel } from './ReadingResultPanel'
import { evaluateReadingSubmission } from '../utils/readingScoring'
import { CATEGORY_MAP } from '@/data/reading/categories'
import { getGenderStyles } from '../utils/vocabularyLookup'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
  Clock,
  Layers,
} from 'lucide-react'

interface ReadingPassageWorkspaceProps {
  passage: ReadingPassage
  onBackToLibrary: () => void
  onRecordAttempt: (result: ReadingAttemptResult, readingMinutes: number) => void
  onNextPassage?: () => void
  onPrevPassage?: () => void
}

export const ReadingPassageWorkspace: React.FC<ReadingPassageWorkspaceProps> = ({
  passage,
  onBackToLibrary,
  onRecordAttempt,
  onNextPassage,
  onPrevPassage,
}) => {
  const {
    preferences,
    setFontSize,
    setLineSpacing,
    setMode,
    toggleVocabularyAssistance,
  } = useReadingPreferences()

  const { savedWords, saveWord, removeWord, isWordSaved } = useReadingVocabulary()

  // Active word token & popover state
  const [activeToken, setActiveToken] = useState<ReadingWordToken | null>(null)
  const [activeExplanation, setActiveExplanation] =
    useState<ContextualWordExplanation | null>(null)
  const [popoverPos, setPopoverPos] = useState<{ top: number; left: number } | null>(
    null
  )

  // Questions and Submission state
  const [activeTab, setActiveTab] = useState<'text' | 'questions'>('text')
  const [userAnswers, setUserAnswers] = useState<
    Record<string, string | number | boolean>
  >({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submissionResult, setSubmissionResult] =
    useState<ReadingAttemptResult | null>(null)

  // Elapsed reading timer
  const startTimeRef = useRef<number>(0)
  useEffect(() => {
    startTimeRef.current = Date.now()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleWordClick = (
    token: ReadingWordToken,
    rect: DOMRect,
    explanation: ContextualWordExplanation | null
  ) => {
    setActiveToken(token)
    setActiveExplanation(explanation)
    setPopoverPos({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    })
  }

  const handleClosePopover = () => {
    setActiveToken(null)
    setActiveExplanation(null)
    setPopoverPos(null)
  }

  const handleToggleSaveActiveWord = () => {
    if (!activeExplanation) return
    if (isWordSaved(activeExplanation.word, activeExplanation.article)) {
      removeWord(activeExplanation.word, activeExplanation.article)
    } else {
      saveWord(activeExplanation, passage)
    }
  }

  const handleAnswerChange = (
    qId: string,
    val: string | number | boolean
  ) => {
    if (isSubmitted) return
    setUserAnswers((prev) => ({ ...prev, [qId]: val }))
  }

  const handleSubmitQuiz = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (isSubmitted) return

    const elapsedSeconds = Math.max(
      10,
      Math.round((Date.now() - startTimeRef.current) / 1000)
    )
    const result = evaluateReadingSubmission(passage, userAnswers, elapsedSeconds)
    setSubmissionResult(result)
    setIsSubmitted(true)
    onRecordAttempt(result, elapsedSeconds / 60)
  }

  const handleRetry = () => {
    setUserAnswers({})
    setIsSubmitted(false)
    setSubmissionResult(null)
    startTimeRef.current = Date.now()
    setActiveTab('questions')
  }

  const category = CATEGORY_MAP[passage.category]

  return (
    <div className="space-y-6">
      {/* 1. TOP BREADCRUMB & CONTROLS */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DEDAD1] pb-4">
        <div className="flex items-center gap-2 text-xs text-[#89857E]">
          <button
            type="button"
            onClick={onBackToLibrary}
            className="inline-flex items-center gap-1 font-semibold text-[#171717] hover:text-[#C83B32] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Lese-Bibliothek
          </button>
          <span>/</span>
          <span className="font-mono font-bold text-[#C83B32]">{passage.level}</span>
          <span>/</span>
          <span className="truncate max-w-[200px] text-[#55534F]">
            {passage.titleGerman}
          </span>
        </div>

        {/* Tab switch for mobile/tablet */}
        <div className="flex items-center rounded-lg bg-[#FAF8F5] p-1 border border-[#DEDAD1]">
          <button
            type="button"
            onClick={() => setActiveTab('text')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5',
              activeTab === 'text'
                ? 'bg-white text-[#171717] shadow-sm'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            <BookOpen className="h-3.5 w-3.5 text-[#C83B32]" />
            Text lesen
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('questions')}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-semibold transition-all flex items-center gap-1.5',
              activeTab === 'questions'
                ? 'bg-white text-[#171717] shadow-sm'
                : 'text-[#89857E] hover:text-[#171717]'
            )}
          >
            <HelpCircle className="h-3.5 w-3.5 text-[#D7B95D]" />
            Fragen ({passage.questions.length})
          </button>
        </div>
      </div>

      {/* 2. PASSAGE HEADER BANNER */}
      <div className="rounded-2xl border border-[#DEDAD1] bg-white p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-[#171717] px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-white">
            {passage.level}
          </span>
          <span className="rounded-md bg-[#F7F5F0] px-2.5 py-1 text-xs font-medium text-[#55534F] border border-[#DEDAD1]">
            {category?.titleGerman || passage.category}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#89857E]">
            <Clock className="h-3.5 w-3.5" /> ca. {passage.estimatedMinutes} Min.
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-[#89857E]">
            <Layers className="h-3.5 w-3.5" /> {passage.wordCount} Wörter
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
          {passage.titleGerman}
        </h1>
        {passage.titleEnglish && (
          <p className="text-sm text-[#89857E] italic">{passage.titleEnglish}</p>
        )}
        <p className="text-xs sm:text-sm text-[#55534F] max-w-2xl leading-relaxed">
          {passage.description}
        </p>
      </div>

      {/* 3. MAIN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Reading Paper or Questions */}
        <div className="lg:col-span-8 space-y-6">
          {activeTab === 'text' ? (
            /* Tactile Paper Reading Surface */
            <div className="rounded-2xl border border-[#DEDAD1] bg-white p-6 sm:p-10 shadow-md skeuo-paper-stacked space-y-8">
              {/* Reading mode badge */}
              <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3 text-xs text-[#89857E]">
                <span className="font-mono uppercase tracking-wider">
                  Klicken Sie auf ein Wort für Erklärung &amp; Grammatik
                </span>
                <span className="font-mono text-[#C83B32]">
                  Modus: {preferences.mode.toUpperCase()}
                </span>
              </div>

              {/* Interactive Text */}
              <InteractiveReadingText
                passage={passage}
                preferences={preferences}
                savedWords={savedWords}
                activeTokenId={activeToken?.id || null}
                onWordClick={handleWordClick}
              />

              {/* Bottom Jump to Quiz */}
              <div className="pt-6 border-t border-[#EFECE6] flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-[#89857E]">
                  Haben Sie den Text verstanden?
                </span>
                <button
                  type="button"
                  onClick={() => setActiveTab('questions')}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-5 py-2.5 text-xs font-semibold text-white shadow hover:bg-[#333333] transition-colors"
                >
                  <CheckCircle className="h-4 w-4 text-[#D7B95D]" />
                  Verständnisfragen beantworten ({passage.questions.length})
                </button>
              </div>
            </div>
          ) : (
            /* Question Paper Surface */
            <div className="rounded-2xl border border-[#DEDAD1] bg-white p-6 sm:p-8 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
                <h3 className="text-base font-bold text-[#171717]">
                  Verständnisfragen ({passage.questions.length})
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className="text-xs font-semibold text-[#C83B32] hover:underline"
                >
                  &larr; Zurück zum Text
                </button>
              </div>

              {/* Questions or Results */}
              {isSubmitted && submissionResult ? (
                <div className="space-y-6">
                  <ReadingResultPanel
                    result={submissionResult}
                    passage={passage}
                    onRetry={handleRetry}
                    onNextPassage={onNextPassage}
                    onBackToLibrary={onBackToLibrary}
                  />

                  {/* Question Review Breakdown */}
                  <div className="pt-6 border-t border-[#EFECE6] space-y-4">
                    <h4 className="text-sm font-bold text-[#171717]">
                      Fragenübersicht &amp; Erklärungen
                    </h4>
                    <ReadingQuestionRenderer
                      questions={passage.questions}
                      userAnswers={userAnswers}
                      isSubmitted={true}
                      onAnswerChange={handleAnswerChange}
                    />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitQuiz} className="space-y-6">
                  <ReadingQuestionRenderer
                    questions={passage.questions}
                    userAnswers={userAnswers}
                    isSubmitted={false}
                    onAnswerChange={handleAnswerChange}
                  />

                  <div className="flex items-center justify-between pt-4 border-t border-[#EFECE6]">
                    <span className="text-xs text-[#89857E]">
                      Beantwortet:{' '}
                      <strong className="text-[#171717]">
                        {Object.keys(userAnswers).length} /{' '}
                        {passage.questions.length}
                      </strong>
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#333333] transition-colors"
                    >
                      Antworten prüfen
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            {onPrevPassage ? (
              <button
                type="button"
                onClick={onPrevPassage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55534F] hover:text-[#171717]"
              >
                <ChevronLeft className="h-4 w-4" />
                Vorheriger Text
              </button>
            ) : (
              <span />
            )}

            {onNextPassage && (
              <button
                type="button"
                onClick={onNextPassage}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#55534F] hover:text-[#171717]"
              >
                Nächster Text
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right Sidebar: Settings & Key Vocabulary */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Reading Settings Box */}
          <ReadingSettings
            preferences={preferences}
            onFontSizeChange={setFontSize}
            onLineSpacingChange={setLineSpacing}
            onModeChange={setMode}
            onToggleAssistance={toggleVocabularyAssistance}
          />

          {/* 2. Key Vocabulary Card List */}
          {passage.keyVocabulary && passage.keyVocabulary.length > 0 && (
            <div className="rounded-xl border border-[#DEDAD1] bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#EFECE6] pb-2">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#D7B95D]" />
                  Schlüsselwörter ({passage.keyVocabulary.length})
                </h3>
                <span className="text-[11px] text-[#89857E]">Klickbar</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {passage.keyVocabulary.map((item, idx) => {
                  const isSaved = isWordSaved(item.word, item.article)
                  const genderStyles = item.article
                    ? getGenderStyles(item.article)
                    : getGenderStyles()

                  return (
                    <div
                      key={idx}
                      className={cn(
                        'rounded-lg p-2.5 border text-xs transition-all space-y-1',
                        genderStyles.colorClass
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                          {item.article && (
                            <span
                              className={cn(
                                'rounded px-1 text-[10px] uppercase font-mono',
                                genderStyles.badgeBg
                              )}
                            >
                              {item.article}
                            </span>
                          )}
                          <span>{item.word}</span>
                          {item.plural && (
                            <span className="text-[#89857E] font-normal">
                              ({item.plural})
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (isSaved) removeWord(item.word, item.article)
                            else saveWord(item, passage)
                          }}
                          className="text-[#89857E] hover:text-[#171717] p-0.5"
                          title={isSaved ? 'Gespeichert' : 'Speichern'}
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-4 w-4 text-[#15803D]" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] font-medium text-[#55534F]">
                        {item.englishMeaning}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 3. Provenance & Didactics */}
          <div className="rounded-xl border border-[#DEDAD1] bg-[#FAF8F5] p-4 text-xs text-[#89857E] space-y-1">
            <div className="font-semibold text-[#55534F]">
              Didaktische Quelle:
            </div>
            <div>{passage.provenance}</div>
            <div className="pt-2 border-t border-[#EFECE6] text-[11px]">
              Einstufung nach Gemeinsamem Europäischen Referenzrahmen (GER / CEFR).
            </div>
          </div>
        </div>
      </div>

      {/* 4. CONTEXTUAL VOCABULARY POPOVER */}
      {activeToken && (
        <VocabularyPopover
          explanation={activeExplanation}
          unlistedWord={activeToken.cleanWord}
          passage={passage}
          position={popoverPos || undefined}
          isSaved={
            activeExplanation
              ? isWordSaved(activeExplanation.word, activeExplanation.article)
              : false
          }
          onToggleSave={handleToggleSaveActiveWord}
          onClose={handleClosePopover}
        />
      )}
    </div>
  )
}
