import React, { useState } from 'react'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import questionsData from '@/data/assessment/questions.json'
import { AssessmentQuestion, AssessmentResult, CefrLevel } from '@/types/learning'
import { useLearningProgress } from '@/hooks/useLocalStorage'
import { useTranslation } from '@/i18n'
import { getWhatsAppUrl } from '@/config/business'
import {
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  MessageCircle,
  GraduationCap,
  AlertCircle,
  BookOpen,
} from 'lucide-react'

const QUESTIONS: AssessmentQuestion[] = questionsData as AssessmentQuestion[]

export const AssessmentPage: React.FC = () => {
  const { isGerman } = useTranslation()
  // Test State: 'intro' | 'testing' | 'result'
  const [stage, setStage] = useState<'intro' | 'testing' | 'result'>('intro')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)

  const { saveAssessmentResult, progress } = useLearningProgress()

  const currentQ = QUESTIONS[currentIndex]

  // Start test
  const handleStart = () => {
    setSelectedAnswers({})
    setCurrentIndex(0)
    setResult(null)
    setStage('testing')
  }

  // Answer selection
  const handleSelectAnswer = (optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIdx,
    }))
  }

  // Calculate results
  const handleSubmitAssessment = () => {
    let score = 0
    const categoryScores: Record<string, { correct: number; total: number }> = {}

    QUESTIONS.forEach((q, idx) => {
      const userChoice = selectedAnswers[idx]
      const isCorrect = userChoice === q.correctIndex

      if (isCorrect) score += 1

      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { correct: 0, total: 0 }
      }
      categoryScores[q.category].total += 1
      if (isCorrect) {
        categoryScores[q.category].correct += 1
      }
    })

    const percentage = Math.round((score / QUESTIONS.length) * 100)

    // Determine recommended CEFR starting level based on score thresholds
    let recommendedLevel: CefrLevel = 'A1'
    if (score >= 27) {
      recommendedLevel = 'C1'
    } else if (score >= 22) {
      recommendedLevel = 'B2'
    } else if (score >= 15) {
      recommendedLevel = 'B1'
    } else if (score >= 8) {
      recommendedLevel = 'A2'
    } else {
      recommendedLevel = 'A1'
    }

    const calculatedResult: AssessmentResult = {
      totalQuestions: QUESTIONS.length,
      score,
      percentage,
      recommendedLevel,
      categoryScores,
      completedAt: new Date().toLocaleDateString('de-DE'),
    }

    setResult(calculatedResult)
    saveAssessmentResult(calculatedResult)
    setStage('result')
  }

  // Level display recommendations
  const getLevelCoursePath = (lvl: CefrLevel) => `/courses/${lvl.toLowerCase()}`

  return (
    <div className="py-12 sm:py-16">
      <Container size="lg">
        {/* ================= STAGE 1: INTRO ================= */}
        {stage === 'intro' && (
          <div className="space-y-8">
            <div className="skeuo-paper-stacked rounded-[8px] p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  {isGerman ? 'Diagnostischer Einstufungstest' : 'Diagnostic Evaluation Engine'}
                </span>
                <span className="text-[#DEDAD1]">&bull;</span>
                <Badge variant="stone" size="sm">{isGerman ? 'GER A1–C1 Standards' : 'CEFR A1–C1 Standards'}</Badge>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
                  {isGerman ? 'Kostenloser Deutsch-Einstufungstest' : 'Free German Level Assessment'}
                </h1>
                <p className="text-sm sm:text-base text-[#55534F] mt-2 max-w-2xl leading-relaxed font-sans">
                  {isGerman
                    ? 'Ermitteln Sie Ihr präzises GER-Sprachniveau vor der Kursanmeldung. Dieser 30-Fragen-Test orientiert sich an den Goethe- und telc-Prüfungsstandards.'
                    : 'Determine your accurate German CEFR starting level before enrolling in a course. This 30-question diagnostic evaluation maps directly to Goethe-Institut and telc proficiency rubrics.'}
                </p>
              </div>

              {/* Assessment Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#ECE8E0]">
                <div className="p-4 skeuo-recessed rounded-[6px] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171717] uppercase tracking-wider">
                    <Clock className="w-4 h-4 text-[#C83B32]" />
                    <span>{isGerman ? 'Dauer' : 'Duration'}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#171717]">{isGerman ? '15–20 Minuten' : '15–20 Minutes'}</p>
                  <p className="text-[11px] text-[#89857E]">{isGerman ? 'Im eigenen Tempo' : 'Self-paced, un-timed'}</p>
                </div>

                <div className="p-4 skeuo-recessed rounded-[6px] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171717] uppercase tracking-wider">
                    <Award className="w-4 h-4 text-[#D7B95D]" />
                    <span>{isGerman ? 'Format' : 'Format'}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#171717]">{isGerman ? '30 Fragen' : '30 Questions'}</p>
                  <p className="text-[11px] text-[#89857E]">{isGerman ? 'A1 bis C1 Progression' : 'A1 through C1 progression'}</p>
                </div>

                <div className="p-4 skeuo-recessed rounded-[6px] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171717] uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-[#2A684C]" />
                    <span>{isGerman ? 'Umfang' : 'Scope'}</span>
                  </div>
                  <p className="text-sm font-semibold text-[#171717]">{isGerman ? '5 Kompetenzbereiche' : '5 Key Competencies'}</p>
                  <p className="text-[11px] text-[#89857E]">{isGerman ? 'Grammatik, Lesen, Wortschatz' : 'Grammar, Reading, Vocab'}</p>
                </div>
              </div>

              {/* Instructions List */}
              <div className="skeuo-paper border-t-3 border-t-[#D7B95D] p-5 rounded-[6px] text-xs space-y-2">
                <strong className="block text-sm font-heading font-bold text-[#171717]">
                  {isGerman ? 'Hinweise zum Einstufungstest:' : 'Assessment Guidelines:'}
                </strong>
                <ul className="space-y-1.5 text-xs text-[#55534F] list-disc list-inside">
                  <li>
                    {isGerman
                      ? 'Antworten Sie spontan ohne Wörterbücher oder externe Hilfsmittel.'
                      : 'Answer spontaneously without dictionaries, translators, or external assistance.'}
                  </li>
                  <li>
                    {isGerman
                      ? 'Wenn Sie eine Antwort nicht wissen, raten Sie oder gehen Sie weiter.'
                      : 'If you do not know an answer, make your best guess or move ahead.'}
                  </li>
                  <li>
                    {isGerman
                      ? 'Sie können frei zwischen den Fragen vor- und zurückwechseln.'
                      : 'You can freely navigate backward and forward between questions before submitting.'}
                  </li>
                  <li>
                    {isGerman
                      ? 'Ihre Kursempfehlung wird nach dem Absenden sofort angezeigt.'
                      : 'Your recommended starting course level will be revealed instantly upon submission.'}
                  </li>
                </ul>
              </div>

              {/* Legal / Academic Disclaimer */}
              <div className="flex items-start gap-2.5 p-3 rounded-[5px] skeuo-recessed text-[11px] text-[#89857E]">
                <AlertCircle className="w-4 h-4 text-[#89857E] shrink-0 mt-0.5" />
                <span>
                  <strong>{isGerman ? 'Wichtiger Hinweis:' : 'Important Notice:'}</strong>{' '}
                  {isGerman
                    ? 'Dies ist ein indikativer Online-Einstufungstest zur Kurswahl. Er ersetzt kein offizielles Goethe-Zertifikat oder telc-Zertifikat.'
                    : 'This is an indicative online placement evaluation designed to assist in batch selection. It does not constitute an official Goethe-Zertifikat, telc, or TestDaF legal certification.'}
                </span>
              </div>

              {/* Start Action */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#DEDAD1]">
                <span className="text-xs text-[#89857E]">
                  {isGerman
                    ? 'Kostenlos • Keine Registrierung erforderlich • Sofortiges Ergebnis'
                    : 'Free • No registration required • Instant results'}
                </span>
                <Button
                  onClick={handleStart}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isGerman ? 'Einstufungstest starten' : 'Start Assessment Now'}
                </Button>
              </div>
            </div>

            {/* Past History if available */}
            {progress.assessmentHistory.length > 0 && (
              <div className="bg-[#FFFFFF] border border-[#DEDAD1] rounded-[4px] p-6 shadow-subtle space-y-4">
                <h3 className="text-sm font-heading font-bold text-[#171717] uppercase tracking-wider">
                  Your Previous Diagnostic Attempts
                </h3>
                <div className="space-y-2 text-xs">
                  {progress.assessmentHistory.map((hist, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-[4px] bg-[#F7F5F0] border border-[#ECE8E0]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-[3px] bg-[#171717] text-white font-mono font-bold flex items-center justify-center text-xs">
                          {hist.recommendedLevel}
                        </span>
                        <div>
                          <strong className="block text-[#171717]">
                            Recommended: {hist.recommendedLevel} Course
                          </strong>
                          <span className="text-[#89857E]">Taken on {hist.completedAt}</span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-sm text-[#C83B32]">
                        {hist.score} / {hist.totalQuestions} ({hist.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= STAGE 2: TESTING ================= */}
        {stage === 'testing' && currentQ && (
          <div className="skeuo-paper rounded-[8px] p-6 sm:p-10 space-y-8">
            {/* Top Progress Bar */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#171717]">
                    {isGerman
                      ? `Frage ${currentIndex + 1} von ${QUESTIONS.length}`
                      : `Question ${currentIndex + 1} of ${QUESTIONS.length}`}
                  </span>
                  <span className="text-[#DEDAD1]">&bull;</span>
                  <Badge variant="stone" size="sm">{currentQ.level}</Badge>
                  <span className="text-[#89857E] hidden sm:inline">{currentQ.category}</span>
                </div>
                <span className="font-mono text-[#89857E]">
                  {Math.round(((currentIndex + 1) / QUESTIONS.length) * 100)}%{' '}
                  {isGerman ? 'Abgeschlossen' : 'Complete'}
                </span>
              </div>

              {/* Progress Bar Track (Recessed Groove) */}
              <div className="h-2 w-full skeuo-recessed rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#D4443B] to-[#C83B32] rounded-full transition-all duration-300 shadow-xs"
                  style={{ width: `${((currentIndex + 1) / QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Reading Passage if present (Parchment Paper Card) */}
            {currentQ.passage && (
              <div className="p-4 sm:p-5 skeuo-paper-stacked rounded-[6px] border-l-4 border-l-[#C83B32] text-xs sm:text-sm text-[#171717] leading-relaxed italic">
                <strong className="not-italic block text-xs uppercase tracking-wider text-[#C83B32] mb-1 font-sans">
                  Reading Excerpt (Lesetext):
                </strong>
                "{currentQ.passage}"
              </div>
            )}

            {/* Question Heading */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#171717] leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* 4 Multiple Choice Options (Tactile Examination Cards) */}
            <div className="space-y-3">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectAnswer(optIdx)}
                    className={`w-full p-4 rounded-[6px] border-2 text-left text-sm sm:text-base font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#FFFFFF] border-[#C83B32] text-[#C83B32] shadow-[0_2px_4px_rgba(200,59,50,0.15)] font-semibold scale-[1.005]'
                        : 'skeuo-word-tile'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-[3px] border flex items-center justify-center text-xs font-mono shrink-0 ${
                          isSelected
                            ? 'bg-[#C83B32] text-white border-[#C83B32] shadow-xs'
                            : 'bg-white border-[#D2CDC3] text-[#55534F]'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{option}</span>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-[#C83B32] shrink-0" />}
                  </button>
                )
              })}
            </div>

            {/* Navigation Bottom Controls */}
            <div className="pt-6 border-t border-[#ECE8E0] flex items-center justify-between">
              <Button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                variant="outline"
                size="md"
                disabled={currentIndex === 0}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {isGerman ? 'Zurück' : 'Previous'}
              </Button>

              {currentIndex + 1 < QUESTIONS.length ? (
                <Button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isGerman ? 'Nächste Frage' : 'Next Question'}
                </Button>
              ) : (
                <Button
                  onClick={handleSubmitAssessment}
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-b from-[#347B5B] to-[#2A684C] border-[#163B2B] shadow-[0_3px_0_#0F2A1E,0_4px_8px_rgba(42,104,76,0.3)]"
                  rightIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {isGerman ? 'Test abgeben & Ergebnis ansehen' : 'Submit & View Results'}
                </Button>
              )}
            </div>
          </div>
        )}

        {/* ================= STAGE 3: RESULTS & RECOMMENDATIONS ================= */}
        {stage === 'result' && result && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Score Banner */}
            <div className="skeuo-paper-stacked rounded-[8px] p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DEDAD1]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#D7B95D]" />
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                      {isGerman ? 'Ergebnis der Einstufung' : 'Diagnostic Placement Outcome'}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717]">
                    {isGerman ? 'Ihr Testergebnis' : 'Your Assessment Results'}
                  </h2>
                </div>

                <Button
                  onClick={handleStart}
                  variant="outline"
                  size="sm"
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  {isGerman ? 'Test wiederholen' : 'Retake Test'}
                </Button>
              </div>

              {/* Main Score Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 skeuo-paper border-t-4 border-t-[#C83B32] p-6 rounded-[6px] text-center space-y-3">
                  <span className="text-xs uppercase tracking-wider text-[#89857E] font-bold block">
                    {isGerman ? 'Empfohlenes GER-Einstiegsniveau' : 'Recommended CEFR Entry Level'}
                  </span>
                  <div className="w-20 h-20 rounded-[6px] skeuo-button-dark text-white font-heading font-black text-4xl flex items-center justify-center mx-auto shadow-md">
                    {result.recommendedLevel}
                  </div>
                  <strong className="text-base font-bold text-[#171717] block">
                    {result.recommendedLevel === 'A1'
                      ? (isGerman ? 'A1: Anfänger-Grundstufe' : 'A1: Beginner Foundation')
                      : result.recommendedLevel === 'A2'
                      ? (isGerman ? 'A2: Grundlegende Kenntnisse' : 'A2: Elementary German')
                      : result.recommendedLevel === 'B1'
                      ? (isGerman ? 'B1: Selbstständige Sprachverwendung' : 'B1: Intermediate Independence')
                      : result.recommendedLevel === 'B2'
                      ? (isGerman ? 'B2: Fortgeschrittene Sprachverwendung' : 'B2: Upper-Intermediate Professional')
                      : (isGerman ? 'C1: Fachkundige Sprachkenntnisse' : 'C1: Advanced Professional Mastery')}
                  </strong>
                  <p className="text-xs text-[#55534F]">
                    {isGerman ? (
                      <>
                        Basierend auf Ihrer Punktzahl von <strong>{result.score}</strong> / {result.totalQuestions} ({result.percentage}%).
                      </>
                    ) : (
                      <>
                        Based on your raw score of <strong>{result.score}</strong> / {result.totalQuestions} ({result.percentage}%).
                      </>
                    )}
                  </p>
                </div>

                {/* Category Competency Breakdown */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    {isGerman ? 'Kompetenzanalyse nach Fachbereich:' : 'Competency Breakdown by Skill Area:'}
                  </h3>

                  <div className="space-y-2.5">
                    {Object.entries(result.categoryScores).map(([cat, scoreObj]) => {
                      const catPct = Math.round((scoreObj.correct / scoreObj.total) * 100)
                      return (
                        <div key={cat} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium text-[#171717]">{cat}</span>
                            <span className="font-mono text-[#89857E]">
                              {scoreObj.correct}/{scoreObj.total} ({catPct}%)
                            </span>
                          </div>
                          <div className="h-2 w-full skeuo-recessed rounded-full overflow-hidden p-0.5">
                            <div
                              className={`h-full rounded-full ${
                                catPct >= 70
                                  ? 'bg-[#2A684C]'
                                  : catPct >= 40
                                  ? 'bg-[#D7B95D]'
                                  : 'bg-[#C83B32]'
                              }`}
                              style={{ width: `${catPct}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Guidance & Contextual Course CTA */}
            <div className="skeuo-recessed-dark text-white rounded-[8px] p-6 sm:p-10 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#2A2A2A] text-xs font-semibold text-[#D7B95D] border border-[#3A3A3A]">
                  <GraduationCap className="w-4 h-4" />
                  <span>{isGerman ? 'Nächster Schritt auf Ihrem Deutsch-Weg' : 'Next Step in Your German Journey'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold font-heading">
                  {isGerman
                    ? `Möchten Sie ${result.recommendedLevel}-Deutsch mit strukturierter Anleitung meistern?`
                    : `Want to master ${result.recommendedLevel} German with structured guidance?`}
                </h3>
                <p className="text-xs sm:text-sm text-[#DEDAD1] max-w-2xl leading-relaxed">
                  {isGerman
                    ? 'Treten Sie einer D9W-Gruppe bei: Maximal 14 Teilnehmende, interaktive Live-Studios, zertifizierte Goethe-Prüfer und gezielte Klausurvorbereitung.'
                    : 'Join a verified D9W cohort. Micro-batches capped at 14 students, live interactive studios, certified Goethe examiners, and comprehensive exam preparation.'}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Button
                  to={getLevelCoursePath(result.recommendedLevel)}
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isGerman
                    ? `Details zum ${result.recommendedLevel}-Kurs erkunden`
                    : `Explore ${result.recommendedLevel} Course Details`}
                </Button>

                <Button
                  to="/demo"
                  variant="outline"
                  size="lg"
                  className="text-white border-[#55534F] hover:bg-[#2A2A2A] hover:border-white"
                >
                  {isGerman ? 'Kostenlose Probestunde buchen' : 'Book Free Live Demo Class'}
                </Button>

                <Button
                  href={getWhatsAppUrl(`Hello D9W! I completed the online level assessment and scored ${result.score}/30 (Recommended: ${result.recommendedLevel}). Please share upcoming batch dates and admission details.`)}
                  external
                  variant="secondary"
                  size="lg"
                  className="bg-[#25D366] text-white hover:bg-[#20b858] border-transparent"
                  leftIcon={<MessageCircle className="w-4 h-4" />}
                >
                  {isGerman ? 'WhatsApp-Studienberatung' : 'WhatsApp Academic Advisor'}
                </Button>
              </div>
            </div>

            {/* Detailed Question Review Accordion */}
            <div className="skeuo-paper rounded-[8px] p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-heading font-bold text-[#171717] uppercase tracking-wider">
                {isGerman
                  ? `Detaillierte Fragenüberprüfung (${QUESTIONS.length} Fragen)`
                  : `Detailed Question Review (${QUESTIONS.length} Questions)`}
              </h3>

              <div className="space-y-3 pt-2">
                {QUESTIONS.map((q, idx) => {
                  const userChoice = selectedAnswers[idx]
                  const isCorrect = userChoice === q.correctIndex

                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-[6px] border text-xs space-y-2 ${
                        isCorrect
                          ? 'bg-[#EDF6F1]/50 border-emerald-200'
                          : 'bg-[#FBEBEA]/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-4 h-4 text-[#C83B32] shrink-0 mt-0.5" />
                          )}
                          <strong className="text-[#171717]">
                            Q{idx + 1}. {q.question}
                          </strong>
                        </div>
                        <Badge variant="stone" size="sm">{q.level}</Badge>
                      </div>

                      <div className="pl-6 space-y-1 text-[#55534F]">
                        <div>
                          {isGerman ? 'Ihre Antwort: ' : 'Your Answer: '}
                          <span className={isCorrect ? 'text-[#2A684C] font-semibold' : 'text-[#C83B32] font-semibold'}>
                            {userChoice !== undefined ? q.options[userChoice] : (isGerman ? '(Nicht beantwortet)' : '(Unanswered)')}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div>
                            {isGerman ? 'Richtige Antwort: ' : 'Correct Answer: '}
                            <strong className="text-[#2A684C]">{q.options[q.correctIndex]}</strong>
                          </div>
                        )}
                        <p className="text-[#89857E] italic pt-1">{q.explanation}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
