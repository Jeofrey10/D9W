import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import a1Sentences from '@/data/sentences/a1-sentences.json'
import a2Sentences from '@/data/sentences/a2-sentences.json'
import { SentenceExercise } from '@/types/learning'
import { useGermanSpeech } from '@/hooks/useGermanSpeech'
import { useLearningProgress } from '@/hooks/useLocalStorage'
import {
  ArrowLeft,
  Volume2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react'

const ALL_SENTENCES: SentenceExercise[] = [
  ...(a1Sentences as SentenceExercise[]),
  ...(a2Sentences as SentenceExercise[]),
]

export const SentenceBuilderPage: React.FC = () => {
  // Shuffle helper
  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5)

  const [levelFilter, setLevelFilter] = useState<'All' | 'A1' | 'A2' | 'B1'>('A1')
  const [currentPool, setCurrentPool] = useState<SentenceExercise[]>(() =>
    [...ALL_SENTENCES.filter((s) => s.level === 'A1')].sort(() => Math.random() - 0.5)
  )
  const [currentIndex, setCurrentIndex] = useState(0)

  // Current problem tokens
  const [availableTokens, setAvailableTokens] = useState<string[]>(() => {
    const first = ALL_SENTENCES.filter((s) => s.level === 'A1')[0]
    return first ? [...first.tokens].sort(() => Math.random() - 0.5) : []
  })
  const [constructedTokens, setConstructedTokens] = useState<string[]>([])

  // State
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null)
  const [showSolution, setShowSolution] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const { speak } = useGermanSpeech()
  const { updateQuizScore } = useLearningProgress()

  // Initialize tokens for a given exercise
  const loadExerciseTokens = useCallback((exercise: SentenceExercise) => {
    setAvailableTokens(shuffle(exercise.tokens))
    setConstructedTokens([])
    setFeedback(null)
    setShowSolution(false)
  }, [])

  const handleLevelChange = (lvl: 'All' | 'A1' | 'A2' | 'B1') => {
    setLevelFilter(lvl)
    const filtered =
      lvl === 'All' ? ALL_SENTENCES : ALL_SENTENCES.filter((s) => s.level === lvl)
    const randomized = shuffle(filtered)
    setCurrentPool(randomized)
    setCurrentIndex(0)
    setCorrectCount(0)
    setAttempts(0)
    if (randomized[0]) {
      loadExerciseTokens(randomized[0])
    }
  }

  const currentExercise = currentPool[currentIndex] as SentenceExercise | undefined

  // Move token from available pool to constructed line
  const handleSelectToken = (token: string, index: number) => {
    if (feedback?.isCorrect) return
    setConstructedTokens((prev) => [...prev, token])
    setAvailableTokens((prev) => prev.filter((_, i) => i !== index))
    setFeedback(null)
  }

  // Move token back from constructed line to pool
  const handleRemoveToken = (token: string, index: number) => {
    if (feedback?.isCorrect) return
    setAvailableTokens((prev) => [...prev, token])
    setConstructedTokens((prev) => prev.filter((_, i) => i !== index))
    setFeedback(null)
  }

  // Reset current sentence
  const handleResetTokens = () => {
    if (currentExercise) {
      loadExerciseTokens(currentExercise)
    }
  }

  // Check answer
  const handleCheckAnswer = () => {
    if (!currentExercise || constructedTokens.length === 0) return

    const constructedSentence = constructedTokens.join(' ').trim()
    const target = currentExercise.germanTarget.trim()
    const validAlternatives = currentExercise.acceptableOrders || []

    const isMatch =
      constructedSentence.toLowerCase() === target.toLowerCase() ||
      validAlternatives.some((alt) => alt.toLowerCase() === constructedSentence.toLowerCase())

    setAttempts((prev) => prev + 1)

    if (isMatch) {
      setCorrectCount((prev) => prev + 1)
      setFeedback({
        isCorrect: true,
        message: 'Hervorragend! (Outstanding!) Correct sentence structure.',
      })
      updateQuizScore('sentenceBuilder', { correctDelta: 1, totalDelta: 1 })
      speak(constructedSentence)
    } else {
      setFeedback({
        isCorrect: false,
        message: `Nicht ganz! Beachten Sie die deutsche Syntaxregel: "${currentExercise.grammarRule}"`,
      })
      updateQuizScore('sentenceBuilder', { correctDelta: 0, totalDelta: 1 })
    }
  }

  // Next exercise
  const handleNextExercise = () => {
    const nextIdx = currentIndex + 1 < currentPool.length ? currentIndex + 1 : 0
    setCurrentIndex(nextIdx)
    if (currentPool[nextIdx]) {
      loadExerciseTokens(currentPool[nextIdx])
    }
  }

  const accuracy = attempts > 0 ? Math.round((correctCount / attempts) * 100) : 0

  return (
    <div className="py-10 sm:py-16">
      <Container size="lg">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/learning-hub"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#89857E] hover:text-[#171717] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Learning Hub Overview</span>
          </Link>

          <Button
            onClick={handleResetTokens}
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Tiles
          </Button>
        </div>

        {/* Header Block */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DEDAD1]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  Syntax & Topology Engine
                </span>
                <span className="text-[#DEDAD1]">&bull;</span>
                <Badge variant="der" size="sm">V2 &bull; TeKaMoLo</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading tracking-tight">
                German Sentence Builder
              </h1>
              <p className="text-xs sm:text-sm text-[#55534F] mt-1 font-sans">
                Arrange scrambled words to build grammatically correct sentences according to Verb-Second, bracket, and subordinate clause rules.
              </p>
            </div>

            {/* Score Stats (Recessed Counters) */}
            <div className="flex items-center gap-3">
              <div className="skeuo-recessed px-4 py-2 rounded-[5px] text-center min-w-[80px]">
                <span className="text-[10px] uppercase font-bold text-[#89857E] block">Accuracy</span>
                <span className="text-lg font-mono font-bold text-[#171717]">{accuracy}%</span>
              </div>
              <div className="skeuo-recessed px-4 py-2 rounded-[5px] text-center min-w-[80px]">
                <span className="text-[10px] uppercase font-bold text-[#9A7D2C] block">Solved</span>
                <span className="text-lg font-mono font-bold text-[#171717]">
                  {correctCount}/{attempts}
                </span>
              </div>
            </div>
          </div>

          {/* Level Filter Bar */}
          <div className="pt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#89857E] font-medium mr-1">Difficulty Level:</span>
              {(['A1', 'A2', 'B1', 'All'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleLevelChange(lvl)}
                  className={`text-xs px-3 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                    levelFilter === lvl
                      ? 'skeuo-button-dark text-white font-semibold'
                      : 'skeuo-button-secondary text-[#55534F]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {currentExercise && (
              <span className="text-xs text-[#89857E] font-mono">
                Exercise {currentIndex + 1} of {currentPool.length}
              </span>
            )}
          </div>
        </div>

        {/* Main Interactive Construction Stage */}
        {currentExercise ? (
          <div className="skeuo-paper rounded-[8px] p-6 sm:p-10 space-y-8">
            {/* English Target Prompt */}
            <div className="p-6 skeuo-paper rounded-[6px] space-y-2 border-l-4 border-l-[#C83B32]">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-[#89857E] font-semibold">
                  English Target Meaning:
                </span>
                <Badge variant="stone" size="sm">
                  {currentExercise.category}
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#171717]">
                "{currentExercise.english}"
              </h2>
            </div>

            {/* Sentence Construction Drop Area (Recessed Tray) */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#89857E] font-semibold block mb-2">
                Your German Sentence (Click word tiles to place or remove):
              </span>

              <div className="min-h-[84px] p-4 skeuo-tile-slot rounded-[6px] flex flex-wrap items-center gap-3">
                {constructedTokens.length === 0 ? (
                  <span className="text-xs text-[#89857E] italic select-none">
                    Click the word tiles below to assemble the German sentence in correct grammatical order...
                  </span>
                ) : (
                  constructedTokens.map((token, idx) => (
                    <button
                      key={`${token}-${idx}`}
                      onClick={() => handleRemoveToken(token, idx)}
                      className="px-4 py-2 rounded-[5px] skeuo-word-tile-placed font-semibold text-sm sm:text-base font-sans cursor-pointer animate-fade-in"
                      title="Click to return to pool"
                    >
                      {token}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Available Word Bank (Recessed Tile Tray) */}
            <div>
              <span className="text-xs uppercase tracking-wider text-[#89857E] font-semibold block mb-2">
                Available Word Tiles:
              </span>

              <div className="flex flex-wrap items-center gap-3 p-5 skeuo-recessed rounded-[6px] min-h-[72px]">
                {availableTokens.length === 0 ? (
                  <span className="text-xs text-[#89857E] font-medium">All word tiles placed. Click "Check Sentence" below.</span>
                ) : (
                  availableTokens.map((token, idx) => (
                    <button
                      key={`${token}-${idx}`}
                      onClick={() => handleSelectToken(token, idx)}
                      className="px-4 py-2.5 rounded-[5px] skeuo-word-tile text-sm sm:text-base font-sans cursor-pointer"
                    >
                      {token}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#ECE8E0]">
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setShowSolution(!showSolution)}
                  variant="ghost"
                  size="sm"
                  leftIcon={<Eye className="w-4 h-4 text-[#89857E]" />}
                >
                  {showSolution ? 'Hide Solution' : 'Show Hint / Solution'}
                </Button>
                <Button onClick={handleResetTokens} variant="outline" size="sm">
                  Clear All
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleCheckAnswer}
                  variant="primary"
                  size="md"
                  disabled={constructedTokens.length === 0 || Boolean(feedback?.isCorrect)}
                >
                  Check Sentence
                </Button>
              </div>
            </div>

            {/* Revealed Solution Hint */}
            {showSolution && (
              <div className="p-4 skeuo-paper border-t-3 border-t-[#D7B95D] rounded-[6px] text-xs space-y-1">
                <strong className="block text-[#171717] font-semibold">Canonical Target Sentence:</strong>
                <p className="font-mono text-sm text-[#171717] font-bold">{currentExercise.germanTarget}</p>
                <p className="text-[11px] text-[#89857E] mt-1">{currentExercise.explanation}</p>
              </div>
            )}

            {/* Answer Feedback Card */}
            {feedback && (
              <div
                className={`animate-fade-in p-5 rounded-[6px] border space-y-3 skeuo-paper ${
                  feedback.isCorrect
                    ? 'border-emerald-300'
                    : 'border-rose-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-0.5">
                    {feedback.isCorrect ? (
                      <span className="skeuo-stamp-correct">RICHTIG!</span>
                    ) : (
                      <span className="skeuo-stamp-incorrect">FALSCH!</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sm text-[#171717]">{feedback.message}</p>
                    <p className="text-xs text-[#55534F] leading-relaxed">
                      {currentExercise.explanation}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-black/10">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speak(currentExercise.germanTarget)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#171717] font-semibold hover:text-[#C83B32] cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Listen to correct German audio</span>
                    </button>
                  </div>

                  {feedback.isCorrect && (
                    <Button
                      onClick={handleNextExercise}
                      variant="primary"
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Next Sentence
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No sentences found for this level.</p>
          </div>
        )}

        {/* Word Order Guide */}
        <div className="mt-14 skeuo-paper-stacked rounded-[6px] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#D7B95D]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              The Rules of German Word Order
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#55534F]">
            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                1. Verb-Second (V2 Rule)
              </strong>
              <p>
                In main clauses, the conjugated verb ALWAYS occupies Position 2:
              </p>
              <div className="font-mono text-[#C83B32] text-xs font-semibold">
                [Ich] <strong>lerne</strong> [heute Deutsch].<br />
                [Heute] <strong>lerne</strong> [ich Deutsch].
              </div>
            </div>

            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                2. Sentence Bracket (Satzklammer)
              </strong>
              <p>
                Modal verbs and separable prefixes frame the sentence by pushing the infinitive or prefix to the very end:
              </p>
              <div className="font-mono text-[#171717] text-xs font-semibold">
                Ich <strong>kann</strong> gut Deutsch <strong>sprechen</strong>.<br />
                Er <strong>steht</strong> um 7 Uhr <strong>auf</strong>.
              </div>
            </div>

            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                3. Verb-Final in Sub-Clauses
              </strong>
              <p>
                Subordinating conjunctions (weil, dass, wenn, obwohl) kick the conjugated verb to the end:
              </p>
              <div className="font-mono text-[#2A684C] text-xs font-semibold">
                ...weil ich in Deutschland <strong>studiere</strong>.
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
