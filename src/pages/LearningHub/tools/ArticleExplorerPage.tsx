import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { NOUNS_BY_LEVEL, ALL_NOUNS } from '@/data/vocabulary'
import articlesGrammar from '@/data/grammar/articles.json'
import { VocabularyItem, GermanArticle } from '@/types/learning'
import { useGermanSpeech } from '@/hooks/useGermanSpeech'
import { useLearningProgress } from '@/hooks/useLocalStorage'
import {
  Sparkles,
  ArrowLeft,
  Volume2,
  RotateCcw,
  HelpCircle,
  Trophy,
  Flame,
  ArrowRight,
} from 'lucide-react'

type GameMode = 'practice' | 'quiz10' | 'quiz20' | 'timed' | 'review'
type Difficulty = 'A1' | 'A2' | 'B1' | 'All'

export const ArticleExplorerPage: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('A1')
  const [gameMode, setGameMode] = useState<GameMode>('practice')

  // Shuffle helper
  const shuffleArray = <T,>(arr: T[]): T[] => {
    return [...arr].sort(() => Math.random() - 0.5)
  }

  const [currentPool, setCurrentPool] = useState<typeof ALL_NOUNS>(() =>
    [...NOUNS_BY_LEVEL.A1].sort(() => Math.random() - 0.5).slice(0, 10)
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState<GermanArticle | null>(null)
  const [answeredState, setAnsweredState] = useState<boolean>(false)

  // Tracking
  const [correctCount, setCorrectCount] = useState(0)
  const [incorrectCount, setIncorrectCount] = useState(0)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [incorrectList, setIncorrectList] = useState<typeof ALL_NOUNS>([])
  const [timeLeft, setTimeLeft] = useState(60)
  const [isGameOver, setIsGameOver] = useState(false)

  const { speak, isSupported } = useGermanSpeech()
  const { updateQuizScore } = useLearningProgress()

  // Initialize questions
  const initializeRound = useCallback(
    (diff = difficulty, mode = gameMode) => {
      let baseList: typeof ALL_NOUNS = []

      if (mode === 'review') {
        baseList = [...incorrectList]
      } else if (diff === 'All') {
        baseList = [...ALL_NOUNS]
      } else {
        baseList = [...NOUNS_BY_LEVEL[diff]]
      }

      const shuffled = shuffleArray(baseList)
      const limit = mode === 'quiz10' ? 10 : mode === 'quiz20' ? 20 : shuffled.length

      setCurrentPool(shuffled.slice(0, limit))
      setCurrentIndex(0)
      setUserAnswer(null)
      setAnsweredState(false)
      setCorrectCount(0)
      setIncorrectCount(0)
      setCurrentStreak(0)
      setIsGameOver(false)
      setTimeLeft(60)
    },
    [difficulty, gameMode, incorrectList]
  )

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode)
    initializeRound(difficulty, mode)
  }

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff)
    initializeRound(diff, gameMode)
  }

  // Timed challenge timer
  useEffect(() => {
    if (gameMode !== 'timed' || isGameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setIsGameOver(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameMode, isGameOver])

  const currentItem = currentPool[currentIndex] as (VocabularyItem & { article: GermanArticle }) | undefined

  // Find suffix explanation rule
  const suffixRule = useMemo(() => {
    if (!currentItem?.word) return null
    return (
      articlesGrammar.rules.find((r) =>
        currentItem.word.toLowerCase().endsWith(r.suffix.replace('-', ''))
      ) || null
    )
  }, [currentItem])

  // Answer handler
  const handleAnswer = (chosenArticle: GermanArticle) => {
    if (answeredState || !currentItem || isGameOver) return

    setUserAnswer(chosenArticle)
    setAnsweredState(true)

    const isCorrect = chosenArticle === currentItem.article
    const fullWordAudio = `${currentItem.article} ${currentItem.word}`

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1)
      const nextStreak = currentStreak + 1
      setCurrentStreak(nextStreak)
      if (nextStreak > bestStreak) setBestStreak(nextStreak)
      updateQuizScore('articleExplorer', { correctDelta: 1, totalDelta: 1, streak: nextStreak })
    } else {
      setIncorrectCount((prev) => prev + 1)
      setCurrentStreak(0)
      if (!incorrectList.some((item) => item.id === currentItem.id)) {
        setIncorrectList((prev) => [...prev, currentItem])
      }
      updateQuizScore('articleExplorer', { correctDelta: 0, totalDelta: 1 })
    }

    // Audio feedback
    speak(fullWordAudio)
  }

  // Next question
  const handleNext = () => {
    if (currentIndex + 1 >= currentPool.length) {
      setIsGameOver(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
      setUserAnswer(null)
      setAnsweredState(false)
    }
  }

  const accuracy =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0

  return (
    <div className="py-10 sm:py-16">
      <Container size="lg">
        {/* Breadcrumb & Navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/learning-hub"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#89857E] hover:text-[#171717] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Learning Hub Overview</span>
          </Link>

          <Button
            onClick={() => initializeRound()}
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Restart Session
          </Button>
        </div>

        {/* Hero Banner / Options */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DEDAD1]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  Grammar Master Drill
                </span>
                <span className="text-[#DEDAD1]">&bull;</span>
                <Badge variant="stone" size="sm">Der &bull; Die &bull; Das</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading tracking-tight">
                Article Explorer
              </h1>
              <p className="text-xs sm:text-sm text-[#55534F] mt-1 font-sans">
                Train your instincts for German grammatical genders with rule-based pattern recognition and rapid feedback.
              </p>
            </div>

            {/* Score & Streak Counters (Recessed Tactile Gauges) */}
            <div className="flex items-center gap-3">
              <div className="skeuo-recessed px-4 py-2 rounded-[5px] text-center min-w-[80px]">
                <span className="text-[10px] uppercase font-bold text-[#89857E] block">Accuracy</span>
                <span className="text-lg font-mono font-bold text-[#171717]">{accuracy}%</span>
              </div>

              <div className="skeuo-recessed px-4 py-2 rounded-[5px] text-center min-w-[80px] border-amber-300">
                <span className="text-[10px] uppercase font-bold text-[#9A7D2C] flex items-center justify-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-[#D7B95D]" />
                  Streak
                </span>
                <span className="text-lg font-mono font-bold text-[#C83B32]">{currentStreak}</span>
              </div>
            </div>
          </div>

          {/* Mode & Difficulty Toolbar */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Mode Selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-[#89857E] font-medium mr-1">Mode:</span>
              {[
                { id: 'practice', label: 'Practice' },
                { id: 'quiz10', label: '10 Questions' },
                { id: 'quiz20', label: '20 Questions' },
                { id: 'timed', label: '60s Challenge' },
                ...(incorrectList.length > 0 ? [{ id: 'review', label: `Review Incorrect (${incorrectList.length})` }] : []),
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleModeChange(m.id as GameMode)}
                  className={`text-xs px-3 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                    gameMode === m.id
                      ? 'skeuo-button-dark text-white font-semibold'
                      : 'skeuo-button-secondary text-[#55534F]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Difficulty Selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-[#89857E] font-medium mr-1">Level:</span>
              {(['A1', 'A2', 'B1', 'All'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleDifficultyChange(lvl)}
                  disabled={gameMode === 'review'}
                  className={`text-xs px-2.5 py-1 rounded-[4px] font-medium transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                    difficulty === lvl
                      ? 'skeuo-button-primary text-white font-semibold'
                      : 'skeuo-button-secondary text-[#55534F]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timed Mode Bar */}
        {gameMode === 'timed' && !isGameOver && (
          <div className="mb-6 skeuo-recessed p-3 rounded-[5px] flex items-center justify-between">
            <span className="text-xs text-[#89857E] font-medium">Time Remaining:</span>
            <span
              className={`text-base font-mono font-bold px-2 py-0.5 rounded ${
                timeLeft <= 10 ? 'text-white bg-[#C83B32] animate-pulse' : 'text-[#171717] bg-white border border-[#D2CDC3]'
              }`}
            >
              00:{timeLeft.toString().padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Main Interactive Workspace */}
        {isGameOver ? (
          <div className="bg-[#FFFFFF] border border-[#DEDAD1] rounded-[4px] p-8 sm:p-12 text-center shadow-card space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#FAF6E8] text-[#D7B95D] flex items-center justify-center mx-auto border border-[#D7B95D]/40">
              <Trophy className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717]">
                Round Complete!
              </h2>
              <p className="text-xs sm:text-sm text-[#55534F] mt-1">
                You tested <strong className="text-[#171717]">{correctCount + incorrectCount}</strong> German nouns with an accuracy of <strong className="text-[#C83B32]">{accuracy}%</strong>.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4 border-y border-[#ECE8E0] text-center">
              <div>
                <span className="text-xs text-[#89857E] block">Correct</span>
                <span className="text-xl font-mono font-bold text-[#2A684C]">{correctCount}</span>
              </div>
              <div>
                <span className="text-xs text-[#89857E] block">Incorrect</span>
                <span className="text-xl font-mono font-bold text-[#C83B32]">{incorrectCount}</span>
              </div>
              <div>
                <span className="text-xs text-[#89857E] block">Best Streak</span>
                <span className="text-xl font-mono font-bold text-[#D7B95D]">{bestStreak}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button onClick={() => initializeRound()} variant="primary" size="md">
                Play Again
              </Button>
              {incorrectList.length > 0 && (
                <Button
                  onClick={() => {
                    setGameMode('review')
                    initializeRound()
                  }}
                  variant="outline"
                  size="md"
                >
                  Review {incorrectList.length} Mistakes
                </Button>
              )}
            </div>
          </div>
        ) : currentItem ? (
          <div className="skeuo-paper rounded-[8px] p-6 sm:p-10 space-y-8">
            {/* Progress Counter in Quiz Mode */}
            {gameMode !== 'practice' && (
              <div className="flex items-center justify-between text-xs text-[#89857E]">
                <span>
                  Question <strong className="text-[#171717]">{currentIndex + 1}</strong> of{' '}
                  {currentPool.length}
                </span>
                <span>{accuracy}% accuracy</span>
              </div>
            )}

            {/* Word Prompt Stage (Desk Flashcard) */}
            <div className="text-center py-8 sm:py-12 skeuo-paper-stacked rounded-[6px] space-y-3 relative overflow-hidden">
              <span className="text-xs uppercase tracking-widest text-[#89857E] font-semibold">
                What is the grammatical article for:
              </span>

              <div className="flex items-center justify-center gap-3">
                <h2 className="text-4xl sm:text-6xl font-black font-heading text-[#171717] tracking-tight">
                  {currentItem.word}
                </h2>

                <button
                  onClick={() => speak(currentItem.word)}
                  disabled={!isSupported}
                  className="w-10 h-10 rounded-[6px] skeuo-audio-knob flex items-center justify-center text-[#55534F] hover:text-[#171717] transition-all cursor-pointer"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#55534F] font-sans">
                Meaning: <strong className="text-[#171717]">{currentItem.english}</strong>
              </p>
            </div>

            {/* The 3 Physical Mechanical Article Keys */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {(['der', 'die', 'das'] as const).map((art) => {
                const isSelected = userAnswer === art
                const isActualCorrect = currentItem.article === art

                let keyClass =
                  art === 'der'
                    ? 'skeuo-key-der'
                    : art === 'die'
                    ? 'skeuo-key-die'
                    : 'skeuo-key-das'

                if (answeredState) {
                  if (isActualCorrect) {
                    keyClass = `${keyClass} ring-4 ring-emerald-400 ring-offset-2 scale-102`
                  } else if (isSelected) {
                    keyClass = 'bg-stone-300 text-stone-500 border-stone-400 opacity-60 line-through'
                  } else {
                    keyClass = 'opacity-35 saturate-50'
                  }
                }

                return (
                  <button
                    key={art}
                    onClick={() => handleAnswer(art)}
                    disabled={answeredState}
                    className={`py-4 sm:py-6 rounded-[6px] text-xl sm:text-3xl font-heading font-extrabold uppercase cursor-pointer select-none ${keyClass}`}
                  >
                    {art}
                  </button>
                )
              })}
            </div>

            {/* Answer Feedback & Educational Suffix Hint */}
            {answeredState && (
              <div className="animate-fade-in space-y-4 pt-4 border-t border-[#ECE8E0]">
                <div
                  className={`p-4 rounded-[6px] border flex items-start gap-4 ${
                    userAnswer === currentItem.article
                      ? 'bg-[#EDF6F1] border-emerald-300 text-[#2A684C]'
                      : 'bg-[#FBEBEA] border-rose-300 text-[#C83B32]'
                  }`}
                >
                  <div className="shrink-0 mt-0.5">
                    {userAnswer === currentItem.article ? (
                      <span className="skeuo-stamp-correct">RICHTIG!</span>
                    ) : (
                      <span className="skeuo-stamp-incorrect">FALSCH!</span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold">
                      {userAnswer === currentItem.article ? 'Ausgezeichnet! (Excellent)' : 'Nicht ganz! (Not quite)'}
                    </p>
                    <p className="text-xs sm:text-sm font-sans">
                      The correct article is <strong className="uppercase">{currentItem.article}</strong> &rarr;{' '}
                      <strong>
                        {currentItem.article} {currentItem.word}
                      </strong>{' '}
                      (Plural: <em>die {currentItem.plural || '–'}</em>).
                    </p>
                  </div>
                </div>

                {/* Suffix Rule Explanation if present */}
                {suffixRule && (
                  <div className="skeuo-paper border-t-3 border-t-[#D7B95D] p-4 rounded-[6px] text-xs space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-[#171717]">
                      <Sparkles className="w-4 h-4 text-[#D7B95D]" />
                      <span>Grammar Suffix Rule: {suffixRule.suffix}</span>
                    </div>
                    <p className="leading-relaxed text-[#55534F]">{suffixRule.ruleDescription}</p>
                    <p className="text-[11px] text-[#89857E]">
                      Reliability: {suffixRule.reliability}. (Exceptions occur in German).
                    </p>
                  </div>
                )}

                {/* Example in context */}
                {currentItem.example && (
                  <div className="p-3 skeuo-recessed rounded-[5px] text-xs text-[#55534F]">
                    <span className="text-[#89857E] block mb-0.5">Example in context:</span>
                    <strong className="text-[#171717]">{currentItem.example.german}</strong>
                    <p className="text-[#89857E] italic">{currentItem.example.english}</p>
                  </div>
                )}

                {/* Next Button */}
                <div className="pt-2 flex justify-end">
                  <Button
                    onClick={handleNext}
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {currentIndex + 1 >= currentPool.length ? 'Finish Session' : 'Next Word'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>No questions available for this filter.</p>
          </div>
        )}

        {/* Bottom Educational Rules Cheatsheet */}
        <div className="mt-14 skeuo-paper-stacked rounded-[6px] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-[#C83B32]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              German Article Rules & Reliability Guidelines
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#55534F]">
            <div className="p-4 skeuo-badge-der rounded-[6px] space-y-2">
              <strong className="text-[#1E4F8A] font-heading block text-sm">
                der (Maskulin)
              </strong>
              <p>Male persons, days, months, seasons, compass points, car makes.</p>
              <div className="font-mono text-[#1E4F8A] text-[11px]">
                Suffixes: -ling, -ismus, -or, -er (most male agents)
              </div>
            </div>

            <div className="p-4 skeuo-badge-die rounded-[6px] space-y-2">
              <strong className="text-[#C83B32] font-heading block text-sm">
                die (Feminin)
              </strong>
              <p>Female persons, cardinal numbers, motorcycle names, tree & flower species.</p>
              <div className="font-mono text-[#C83B32] text-[11px]">
                Suffixes: -ung, -heit, -keit, -schaft, -tät, -in, -ei, -ie
              </div>
            </div>

            <div className="p-4 skeuo-badge-das rounded-[6px] space-y-2">
              <strong className="text-[#2A684C] font-heading block text-sm">
                das (Neutral)
              </strong>
              <p>Letters, fractions, nominalized infinitives (das Essen), metals, chemical elements.</p>
              <div className="font-mono text-[#2A684C] text-[11px]">
                Suffixes: -chen, -lein, -ment, -um, -nis
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
