import React, { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import {
  getBerlinTodayDateString,
  resolveDailyWord,
  FeaturedWordCard,
  DailyWordExamples,
  DailyWordMiniQuiz,
  DailyWordCalendar,
  DailyWordArchive,
  DailyWordStreakBadge,
  useDailyWordProgress,
} from '@/features/daily-word'
import {
  Sparkles,
  BookmarkCheck,
  BookOpen,
  ArrowRight,
} from 'lucide-react'

export const WordOfTheDayPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const todayKey = getBerlinTodayDateString()

  // Selected date from ?date=YYYY-MM-DD, or fallback to today in Berlin time
  const dateParam = searchParams.get('date')
  const activeDateKey = useMemo(() => {
    if (dateParam && dateParam <= todayKey) {
      return dateParam
    }
    return todayKey
  }, [dateParam, todayKey])

  // Resolve daily word item
  const dailyItem = useMemo(
    () => resolveDailyWord(activeDateKey),
    [activeDateKey]
  )

  const {
    currentStreak,
    longestStreak,
    totalLearned,
    completedDates,
    learnedWordIds,
    markWordLearned,
    unmarkWordLearned,
    recordQuizAttempt,
    isWordLearned,
    recordWordView,
    getQuizAttemptsForDate,
  } = useDailyWordProgress()

  // Record word view on load
  React.useEffect(() => {
    recordWordView(dailyItem.vocabulary.id)
  }, [dailyItem.vocabulary.id, recordWordView])

  const isLearned = isWordLearned(dailyItem.vocabulary.id)

  const handleToggleLearned = () => {
    if (isLearned) {
      unmarkWordLearned(activeDateKey, dailyItem.vocabulary.id)
    } else {
      markWordLearned(activeDateKey, dailyItem.vocabulary.id)
    }
  }

  const handleSelectDate = (newDateKey: string) => {
    const params = new URLSearchParams(searchParams)
    if (newDateKey === todayKey) {
      params.delete('date')
    } else {
      params.set('date', newDateKey)
    }
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quizAttempts = getQuizAttemptsForDate(activeDateKey)

  return (
    <div className="min-h-screen bg-[#F7F5F0] pb-24">
      {/* Top Accent Bar */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-[#171717]" />
        <div className="flex-1 bg-[#C83B32]" />
        <div className="flex-1 bg-[#D7B95D]" />
      </div>

      {/* Hero Header */}
      <div className="border-b border-[#DEDAD1] bg-white pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Container size="xl" className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DEDAD1] bg-[#FAF8F5] px-3.5 py-1 text-xs font-semibold text-[#55534F] shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-[#D7B95D]" />
            <span>Täglicher Wortschatz &bull; CEFR A1–C1</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#171717] tracking-tight">
                Wort des Tages
              </h1>
              <p className="text-lg sm:text-xl font-serif italic text-[#C83B32]">
                German Word of the Day
              </p>
              <p className="text-sm sm:text-base text-[#55534F] leading-relaxed pt-1">
                Discover a new German word every day. Learn its meaning, pronunciation, grammatical details, and practical usage through examples and short interactive exercises.
              </p>
            </div>

            <Link
              to="/my-vocabulary"
              className="inline-flex items-center gap-2 rounded-xl border border-[#DEDAD1] bg-[#FAF8F5] px-4 py-2 text-xs font-bold text-[#171717] shadow-xs hover:bg-white hover:border-[#C83B32] transition-colors"
            >
              <BookmarkCheck className="h-4 w-4 text-[#C83B32]" />
              Mein Wortschatz ansehen
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Content Area */}
      <Container size="xl" className="pt-8 sm:pt-10 space-y-8">
        {/* Streak & Stats Row */}
        <DailyWordStreakBadge
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          totalLearned={totalLearned}
        />

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Featured Card, Examples, Quiz */}
          <div className="lg:col-span-7 space-y-6">
            <FeaturedWordCard
              item={dailyItem}
              isLearned={isLearned}
              onToggleLearned={handleToggleLearned}
            />

            <DailyWordExamples vocabulary={dailyItem.vocabulary} />

            <DailyWordMiniQuiz
              item={dailyItem}
              onRecordQuiz={recordQuizAttempt}
              previousAttempts={quizAttempts}
            />
          </div>

          {/* Right Column: Calendar, Archive, Related Tools */}
          <div className="lg:col-span-5 space-y-6">
            <DailyWordCalendar
              selectedDateKey={activeDateKey}
              onSelectDate={handleSelectDate}
              completedDates={completedDates}
              learnedWordIds={learnedWordIds}
            />

            <DailyWordArchive
              onSelectDate={handleSelectDate}
              learnedWordIds={learnedWordIds}
              currentDateKey={activeDateKey}
            />

            {/* Cross-Tool Pathways */}
            <div className="rounded-2xl border border-[#DEDAD1] bg-white p-5 shadow-xs space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E]">
                Passende Lernmodule
              </h4>
              <div className="space-y-2">
                <Link
                  to="/reading-practice"
                  className="flex items-center justify-between rounded-xl border border-[#EFECE6] p-3 text-xs font-medium text-[#171717] hover:border-[#DEDAD1] hover:bg-[#FAF8F5] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#C83B32]" />
                    <span>Lese-Praxis (36 Texte mit Klick-Vokabeln)</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#89857E]" />
                </Link>

                <Link
                  to="/dictionary"
                  className="flex items-center justify-between rounded-xl border border-[#EFECE6] p-3 text-xs font-medium text-[#171717] hover:border-[#DEDAD1] hover:bg-[#FAF8F5] transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#D7B95D]" />
                    <span>Deutsches Wörterbuch (Volltext-Suche)</span>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#89857E]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
