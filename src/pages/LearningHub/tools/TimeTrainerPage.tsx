import React, { useState, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { getGermanTime, GermanTimeRepresentation } from '@/data/time/timeUtils'
import { useGermanSpeech } from '@/hooks/useGermanSpeech'
import { useLearningProgress } from '@/hooks/useLocalStorage'
import {
  ArrowLeft,
  Volume2,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react'

type TimeRegister = 'informal' | 'formal' | 'both'

export const TimeTrainerPage: React.FC = () => {
  const [hour, setHour] = useState<number>(14)
  const [minute, setMinute] = useState<number>(30)
  const [register, setRegister] = useState<TimeRegister>('informal')

  // Quiz state
  const [quizMode, setQuizMode] = useState<boolean>(true)
  const [options, setOptions] = useState<string[]>(() => [
    'Es ist halb drei.',
    'Es ist halb vier.',
    'Es ist Viertel nach zwei.',
    'Es ist Viertel vor drei.',
  ])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null)
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 })

  const { speak } = useGermanSpeech()
  const { updateQuizScore } = useLearningProgress()

  const timeData: GermanTimeRepresentation = useMemo(() => {
    return getGermanTime(hour, minute)
  }, [hour, minute])

  // Generate a random time for practice
  const randomizeTime = useCallback(
    (reg = register) => {
      setFeedback(null)
      setSelectedOption(null)

      const randomHour = Math.floor(Math.random() * 24)
      // Common minute increments: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
      const minuteMultiples = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
      const randomMinute = minuteMultiples[Math.floor(Math.random() * minuteMultiples.length)]

      setHour(randomHour)
      setMinute(randomMinute)

      // Generate multiple choice options
      const targetExpr =
        reg === 'formal'
          ? getGermanTime(randomHour, randomMinute).formal
          : getGermanTime(randomHour, randomMinute).informal

      const fakeOptions = new Set<string>()
      while (fakeOptions.size < 3) {
        const fakeH = (randomHour + Math.floor(Math.random() * 4) - 2 + 24) % 24
        const fakeM = minuteMultiples[Math.floor(Math.random() * minuteMultiples.length)]
        const fakeExpr =
          reg === 'formal'
            ? getGermanTime(fakeH, fakeM).formal
            : getGermanTime(fakeH, fakeM).informal

        if (fakeExpr !== targetExpr) {
          fakeOptions.add(fakeExpr)
        }
      }

      setOptions([...Array.from(fakeOptions), targetExpr].sort(() => Math.random() - 0.5))
    },
    [register]
  )

  const handleRegisterChange = (reg: TimeRegister) => {
    setRegister(reg)
    randomizeTime(reg)
  }

  // Answer validation
  const handleSelectOption = (opt: string) => {
    if (feedback) return

    setSelectedOption(opt)
    const expected = register === 'formal' ? timeData.formal : timeData.informal
    const isCorrect = opt.trim().toLowerCase() === expected.trim().toLowerCase()

    setScore((prev) => ({
      correct: isCorrect ? prev.correct + 1 : prev.correct,
      total: prev.total + 1,
    }))

    if (isCorrect) {
      setFeedback({
        isCorrect: true,
        text: `Richtig! ${expected}`,
      })
      updateQuizScore('timeTrainer', { correctDelta: 1, totalDelta: 1 })
    } else {
      setFeedback({
        isCorrect: false,
        text: `Falsch! Die richtige Zeit ist: "${expected}"`,
      })
      updateQuizScore('timeTrainer', { correctDelta: 0, totalDelta: 1 })
    }

    speak(expected)
  }

  // Clock Hand Angles
  // Minute hand: 360 deg / 60 mins = 6 deg per min
  const minuteAngle = minute * 6
  // Hour hand: 360 deg / 12 hours = 30 deg per hour + 0.5 deg per min
  const hour12 = hour % 12
  const hourAngle = hour12 * 30 + minute * 0.5

  // Manual Adjusters
  const adjustHours = (delta: number) => {
    setFeedback(null)
    setHour((prev) => (prev + delta + 24) % 24)
  }

  const adjustMinutes = (delta: number) => {
    setFeedback(null)
    setMinute((prev) => {
      const next = prev + delta
      if (next >= 60) {
        setHour((h) => (h + 1) % 24)
        return next % 60
      } else if (next < 0) {
        setHour((h) => (h - 1 + 24) % 24)
        return 60 + next
      }
      return next
    })
  }

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
            onClick={() => randomizeTime()}
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            New Random Time
          </Button>
        </div>

        {/* Header Block */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DEDAD1]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  Daily Routine Engine
                </span>
                <span className="text-[#DEDAD1]">&bull;</span>
                <Badge variant="stone" size="sm">Die Uhrzeit</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading tracking-tight">
                German Time Trainer
              </h1>
              <p className="text-xs sm:text-sm text-[#55534F] mt-1 font-sans">
                Master formal 24-hour German time alongside conversational idioms ("halb vier", "Viertel vor").
              </p>
            </div>

            {/* Score Tracker (Recessed Gauges) */}
            <div className="flex items-center gap-3">
              <div className="skeuo-recessed px-4 py-2 rounded-[5px] text-center min-w-[80px]">
                <span className="text-[10px] uppercase font-bold text-[#89857E] block">Accuracy</span>
                <span className="text-lg font-mono font-bold text-[#171717]">
                  {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
                </span>
              </div>
              <div className="skeuo-recessed px-4 py-2 rounded-[5px] text-center min-w-[80px]">
                <span className="text-[10px] uppercase font-bold text-[#9A7D2C] block">Completed</span>
                <span className="text-lg font-mono font-bold text-[#171717]">
                  {score.correct}/{score.total}
                </span>
              </div>
            </div>
          </div>

          {/* Settings & Mode Toolbar */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-[#89857E] font-medium mr-1">Time Register:</span>
              <button
                onClick={() => handleRegisterChange('informal')}
                className={`text-xs px-3 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                  register === 'informal'
                    ? 'skeuo-button-dark text-white font-semibold'
                    : 'skeuo-button-secondary text-[#55534F]'
                }`}
              >
                Informal / Conversational (halb, Viertel)
              </button>
              <button
                onClick={() => handleRegisterChange('formal')}
                className={`text-xs px-3 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                  register === 'formal'
                    ? 'skeuo-button-primary text-white font-semibold'
                    : 'skeuo-button-secondary text-[#55534F]'
                }`}
              >
                Formal (24-Hour Offiziell)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#89857E] font-medium mr-1">Mode:</span>
              <button
                onClick={() => setQuizMode(!quizMode)}
                className="text-xs px-3 py-1.5 rounded-[4px] skeuo-button-secondary text-[#171717] font-semibold cursor-pointer"
              >
                {quizMode ? 'Switch to Free Exploration' : 'Switch to Quiz Mode'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace (Clock + Controls) */}
        <div className="skeuo-paper rounded-[8px] p-6 sm:p-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Physical Skeuomorphic Analog Clock */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-5">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 skeuo-clock-rim rounded-full p-2.5">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full skeuo-clock-dial rounded-full select-none"
                  aria-label={`Analog clock showing ${hour}:${minute}`}
                >
                  {/* Subtle inner edge */}
                  <circle
                    cx="100"
                    cy="100"
                    r="98"
                    fill="none"
                    stroke="#DEDAD1"
                    strokeWidth="1.5"
                  />

                  {/* Minute tick marks */}
                  {Array.from({ length: 60 }).map((_, i) => {
                    if (i % 5 === 0) return null
                    const angle = i * 6
                    return (
                      <line
                        key={`tick-${i}`}
                        x1="100"
                        y1="10"
                        x2="100"
                        y2="14"
                        stroke="#BFB9AA"
                        strokeWidth="1"
                        transform={`rotate(${angle} 100 100)`}
                      />
                    )
                  })}

                  {/* 12 Hour Number Markers */}
                  {[
                    { n: 12, x: 100, y: 30 },
                    { n: 1, x: 140, y: 40 },
                    { n: 2, x: 168, y: 68 },
                    { n: 3, x: 178, y: 105 },
                    { n: 4, x: 168, y: 142 },
                    { n: 5, x: 140, y: 170 },
                    { n: 6, x: 100, y: 180 },
                    { n: 7, x: 60, y: 170 },
                    { n: 8, x: 32, y: 142 },
                    { n: 9, x: 22, y: 105 },
                    { n: 10, x: 32, y: 68 },
                    { n: 11, x: 60, y: 40 },
                  ].map((pos) => (
                    <text
                      key={pos.n}
                      x={pos.x}
                      y={pos.y}
                      fill="#171717"
                      fontSize="14"
                      fontWeight="800"
                      fontFamily="'Manrope Variable', sans-serif"
                      textAnchor="middle"
                    >
                      {pos.n}
                    </text>
                  ))}

                  {/* Hour Hand (Dimensional with shadow) */}
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="50"
                    stroke="#171717"
                    strokeWidth="5.5"
                    strokeLinecap="round"
                    transform={`rotate(${hourAngle} 100 100)`}
                    className="skeuo-clock-hand-hour transition-transform duration-300 ease-out"
                  />

                  {/* Minute Hand (German Red with shadow) */}
                  <line
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="26"
                    stroke="#C83B32"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    transform={`rotate(${minuteAngle} 100 100)`}
                    className="skeuo-clock-hand-minute transition-transform duration-300 ease-out"
                  />

                  {/* Center Brass Cap Pivot Point */}
                  <circle cx="100" cy="100" r="5" fill="#171717" />
                  <circle cx="100" cy="100" r="2.5" fill="#D7B95D" className="skeuo-clock-pin" />
                </svg>
              </div>

              {/* Recessed Digital Time Display & Audio */}
              <div className="flex items-center gap-3">
                <div className="px-5 py-2 skeuo-display-meter font-bold text-xl rounded-[6px]">
                  {timeData.digitalFormatted}
                </div>

                <button
                  onClick={() =>
                    speak(register === 'formal' ? timeData.formal : timeData.informal)
                  }
                  className="w-10 h-10 rounded-[6px] skeuo-audio-knob flex items-center justify-center text-[#171717] hover:text-[#C83B32] cursor-pointer"
                  title="Listen to German time"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Physical Steppers */}
              <div className="flex items-center gap-2 pt-1 text-xs">
                <div className="flex items-center gap-1.5 skeuo-recessed p-1.5 rounded-[5px]">
                  <span className="text-[#89857E] px-1 font-semibold">Hour:</span>
                  <button
                    onClick={() => adjustHours(-1)}
                    className="w-7 h-7 flex items-center justify-center rounded-[3px] skeuo-button-secondary cursor-pointer"
                    aria-label="Decrease hour"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => adjustHours(1)}
                    className="w-7 h-7 flex items-center justify-center rounded-[3px] skeuo-button-secondary cursor-pointer"
                    aria-label="Increase hour"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5 skeuo-recessed p-1.5 rounded-[5px]">
                  <span className="text-[#89857E] px-1 font-semibold">Min:</span>
                  <button
                    onClick={() => adjustMinutes(-5)}
                    className="w-7 h-7 flex items-center justify-center rounded-[3px] skeuo-button-secondary text-[11px] font-mono font-bold cursor-pointer"
                    aria-label="Decrease 5 minutes"
                  >
                    -5
                  </button>
                  <button
                    onClick={() => adjustMinutes(5)}
                    className="w-7 h-7 flex items-center justify-center rounded-[3px] skeuo-button-secondary text-[11px] font-mono font-bold cursor-pointer"
                    aria-label="Increase 5 minutes"
                  >
                    +5
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Quiz or Expression Inspector */}
            <div className="lg:col-span-7 space-y-6">
              {quizMode ? (
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C83B32] block mb-1">
                      Time Expression Quiz ({register === 'formal' ? 'Formal' : 'Informal'})
                    </span>
                    <h3 className="text-lg font-heading font-bold text-[#171717]">
                      Which German expression matches this clock?
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {options.map((opt) => {
                      const isSelected = selectedOption === opt
                      const expected =
                        register === 'formal' ? timeData.formal : timeData.informal
                      const isCorrect = opt.trim().toLowerCase() === expected.trim().toLowerCase()

                      let btnStyles =
                        'skeuo-word-tile'

                      if (feedback) {
                        if (isCorrect) {
                          btnStyles = 'bg-emerald-50 text-emerald-800 border-emerald-400 border-b-4 border-b-emerald-600 font-bold shadow-sm'
                        } else if (isSelected) {
                          btnStyles = 'bg-rose-50 text-rose-800 border-rose-400 border-b-4 border-b-rose-600 line-through opacity-75'
                        } else {
                          btnStyles = 'opacity-35 saturate-50'
                        }
                      }

                      return (
                        <button
                          key={opt}
                          onClick={() => handleSelectOption(opt)}
                          disabled={Boolean(feedback)}
                          className={`w-full p-4 rounded-[6px] text-left text-sm sm:text-base font-semibold cursor-pointer flex items-center justify-between ${btnStyles}`}
                        >
                          <span>{opt}</span>
                          {feedback && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-[#2A684C]" />
                          )}
                          {feedback && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-[#C83B32]" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {feedback && (
                    <div className="p-4 rounded-[6px] skeuo-paper border-t-3 border-t-[#D7B95D] space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        {feedback.isCorrect ? (
                          <span className="skeuo-stamp-correct text-xs py-1 px-2.5">RICHTIG!</span>
                        ) : (
                          <span className="skeuo-stamp-incorrect text-xs py-1 px-2.5">FALSCH!</span>
                        )}
                        <span className="font-bold text-[#171717]">{timeData.digitalFormatted}</span>
                      </div>
                      <p className="leading-relaxed text-[#55534F]">{timeData.explanation}</p>
                      <div className="pt-2 flex justify-end">
                        <Button
                          onClick={() => randomizeTime()}
                          variant="primary"
                          size="sm"
                          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                        >
                          Next Clock
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Free Exploration View */
                <div className="space-y-4">
                  <div className="p-5 bg-[#F7F5F0] rounded-[4px] border border-[#ECE8E0] space-y-3">
                    <span className="text-xs uppercase tracking-wider text-[#89857E] font-semibold block">
                      Conversational (Umgangssprachlich)
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-heading font-extrabold text-[#171717]">
                        {timeData.informal}
                      </h3>
                      <button
                        onClick={() => speak(timeData.informal)}
                        className="text-[#89857E] hover:text-[#C83B32]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#55534F]">{timeData.explanation}</p>
                  </div>

                  <div className="p-5 bg-[#F7F5F0] rounded-[4px] border border-[#ECE8E0] space-y-2">
                    <span className="text-xs uppercase tracking-wider text-[#89857E] font-semibold block">
                      Formal (24-Hour System)
                    </span>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-heading font-bold text-[#171717]">
                        {timeData.formal}
                      </h3>
                      <button
                        onClick={() => speak(timeData.formal)}
                        className="text-[#89857E] hover:text-[#C83B32]"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-[#89857E]">
                      Used in official train announcements (Deutsche Bahn), flights, radio broadcasts, and business meetings.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Essential German Time Cheatsheet */}
        <div className="mt-14 skeuo-paper-stacked rounded-[6px] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle className="w-5 h-5 text-[#C83B32]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              The Golden Rules of German Time
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#55534F]">
            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2 border-amber-300">
              <strong className="text-[#171717] block font-semibold text-sm">
                1. The "Halb" Principle (Crucial!)
              </strong>
              <p>
                In English, "half three" often colloquially means 3:30. In German, <strong>halb vier</strong> means halfway toward 4:00 (i.e. 3:30)!
              </p>
              <div className="font-mono text-[#9A7D2C] text-xs font-semibold">
                halb 2 = 1:30<br />
                halb 8 = 7:30
              </div>
            </div>

            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                2. Quarters: Vor & Nach
              </strong>
              <p>
                15 minutes past is <strong>Viertel nach</strong>. 15 minutes to is <strong>Viertel vor</strong>:
              </p>
              <div className="font-mono text-[#C83B32] text-xs font-semibold">
                04:15 = Viertel nach vier<br />
                04:45 = Viertel vor fünf
              </div>
            </div>

            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                3. Train Schedules (Offiziell)
              </strong>
              <p>
                At train stations, times are read as standard 24-hour integers with "Uhr" inserted between hour and minute:
              </p>
              <div className="font-mono text-[#171717] text-xs font-semibold">
                16:45 = sechzehn Uhr fünfundvierzig<br />
                20:15 = zwanzig Uhr fünfzehn
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
