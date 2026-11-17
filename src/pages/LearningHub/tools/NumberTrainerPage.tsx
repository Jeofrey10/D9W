import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import {
  numberToGermanWord,
  validateGermanSpelling,
} from '@/data/numbers/numberUtils'
import ordinalData from '@/data/numbers/ordinal-numbers.json'
import { useGermanSpeech } from '@/hooks/useGermanSpeech'
import { useLearningProgress } from '@/hooks/useLocalStorage'
import {
  ArrowLeft,
  Volume2,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

type NumberCategory = '0-20' | '21-100' | 'hundreds' | 'thousands' | 'large' | 'ordinals' | 'prices'
type PracticeMode = 'multipleChoice' | 'typeSpelling' | 'wordToNumber' | 'listenIdentify'

export const NumberTrainerPage: React.FC = () => {
  const [category, setCategory] = useState<NumberCategory>('21-100')
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('multipleChoice')

  // Current problem
  const [currentNumber, setCurrentNumber] = useState<number>(21)
  const [currentWord, setCurrentWord] = useState<string>('einundzwanzig')
  const [currentOrdinal, setCurrentOrdinal] = useState<{ number: number; ordinal: string; english: string } | null>(null)
  const [priceFormatted, setPriceFormatted] = useState<string>('')

  // Multiple choice options
  const [mcOptions, setMcOptions] = useState<string[]>(() => [
    'einundzwanzig',
    'zweiundzwanzig',
    'fünfunddreißig',
    'zwanzig',
  ])
  const [userChoice, setUserChoice] = useState<string | null>(null)

  // Typing state
  const [typedInput, setTypedInput] = useState<string>('')
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null)

  // Scores
  const [correct, setCorrect] = useState(0)
  const [attempts, setAttempts] = useState(0)

  const { speak } = useGermanSpeech()
  const { updateQuizScore } = useLearningProgress()

  // Generate random problem based on category
  const generateProblem = useCallback((cat = category, mode = practiceMode) => {
    setFeedback(null)
    setUserChoice(null)
    setTypedInput('')

    let num = 0

    if (cat === '0-20') {
      num = Math.floor(Math.random() * 21) // 0 to 20
      setCurrentOrdinal(null)
    } else if (cat === '21-100') {
      num = Math.floor(Math.random() * 80) + 21 // 21 to 100
      setCurrentOrdinal(null)
    } else if (cat === 'hundreds') {
      const h = Math.floor(Math.random() * 9) + 1
      const rem = Math.floor(Math.random() * 100)
      num = h * 100 + rem
      setCurrentOrdinal(null)
    } else if (cat === 'thousands') {
      const th = Math.floor(Math.random() * 50) + 1
      const rem = Math.floor(Math.random() * 1000)
      num = th * 1000 + rem
      setCurrentOrdinal(null)
    } else if (cat === 'large') {
      const choices = [100000, 250000, 500000, 750000, 1000000]
      num = choices[Math.floor(Math.random() * choices.length)]
      setCurrentOrdinal(null)
    } else if (cat === 'ordinals') {
      const randOrd = ordinalData[Math.floor(Math.random() * ordinalData.length)]
      setCurrentOrdinal(randOrd)
      num = randOrd.number
      setCurrentWord(`der ${randOrd.ordinal}`)
      // Prepare multiple choice for ordinals
      const falseOptions = ordinalData
        .filter((o) => o.number !== randOrd.number)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((o) => `der ${o.ordinal}`)

      const options = [...falseOptions, `der ${randOrd.ordinal}`].sort(() => Math.random() - 0.5)
      setMcOptions(options)
      return
    } else if (cat === 'prices') {
      const euros = Math.floor(Math.random() * 90) + 1
      const cents = [0, 50, 95, 99, 20, 45][Math.floor(Math.random() * 6)]
      num = euros
      setPriceFormatted(`€${euros},${cents.toString().padStart(2, '0')}`)
      const euroWord = numberToGermanWord(euros)
      const centWord = cents > 0 ? ` und ${numberToGermanWord(cents)} Cent` : ''
      const priceWord = `${euroWord} Euro${centWord}`
      setCurrentWord(priceWord)
      setCurrentOrdinal(null)

      // Generate false options for price
      const falsePrices = [
        `${numberToGermanWord(euros + 10)} Euro${centWord}`,
        `${numberToGermanWord(Math.max(1, euros - 5))} Euro${centWord}`,
        `${numberToGermanWord(euros)} Euro`,
      ]
      setMcOptions([...falsePrices, priceWord].sort(() => Math.random() - 0.5))
      return
    }

    const word = numberToGermanWord(num)
    setCurrentNumber(num)
    setCurrentWord(word)

    // Generate 3 plausible distractors for multiple choice
    const distractors = new Set<string>()
    while (distractors.size < 3) {
      let offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1)
      if (cat === '21-100') {
        offset = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1)
      } else if (cat === 'hundreds') {
        offset = (Math.floor(Math.random() * 50) + 1) * (Math.random() > 0.5 ? 1 : -1)
      }
      const fakeNum = Math.max(0, num + offset)
      if (fakeNum !== num) {
        distractors.add(
          mode === 'wordToNumber' ? fakeNum.toString() : numberToGermanWord(fakeNum)
        )
      }
    }

    const correctChoice = mode === 'wordToNumber' ? num.toString() : word
    const allOptions = [...Array.from(distractors), correctChoice].sort(() => Math.random() - 0.5)
    setMcOptions(allOptions)

    // If listenIdentify mode, automatically speak the word
    if (mode === 'listenIdentify') {
      speak(word)
    }
  }, [category, practiceMode, speak])

  const handleCategoryChange = (cat: NumberCategory) => {
    setCategory(cat)
    generateProblem(cat, practiceMode)
  }

  const handlePracticeModeChange = (mode: PracticeMode) => {
    setPracticeMode(mode)
    generateProblem(category, mode)
  }

  // Multiple Choice validation
  const handleChoice = (option: string) => {
    if (feedback) return

    setUserChoice(option)
    const isCorrect =
      practiceMode === 'wordToNumber'
        ? option === currentNumber.toString()
        : option.toLowerCase() === currentWord.toLowerCase()

    setAttempts((prev) => prev + 1)
    if (isCorrect) {
      setCorrect((prev) => prev + 1)
      setFeedback({ isCorrect: true, message: `Richtig! ${currentWord} = ${currentNumber}` })
      updateQuizScore('numberTrainer', { correctDelta: 1, totalDelta: 1 })
    } else {
      setFeedback({
        isCorrect: false,
        message: `Nicht ganz! Das richtige Wort ist: "${currentWord}"`,
      })
      updateQuizScore('numberTrainer', { correctDelta: 0, totalDelta: 1 })
    }

    speak(currentWord)
  }

  // Typed spelling validation
  const handleSpellingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!typedInput.trim() || feedback) return

    const isCorrect = validateGermanSpelling(typedInput, currentWord)
    setAttempts((prev) => prev + 1)

    if (isCorrect) {
      setCorrect((prev) => prev + 1)
      setFeedback({
        isCorrect: true,
        message: `Ausgezeichnet! Korrekte Schreibung: "${currentWord}"`,
      })
      updateQuizScore('numberTrainer', { correctDelta: 1, totalDelta: 1 })
    } else {
      setFeedback({
        isCorrect: false,
        message: `Fehler! Korrekte deutsche Schreibung: "${currentWord}"`,
      })
      updateQuizScore('numberTrainer', { correctDelta: 0, totalDelta: 1 })
    }

    speak(currentWord)
  }

  const accuracy = attempts > 0 ? Math.round((correct / attempts) * 100) : 0

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
            onClick={() => {
              setCorrect(0)
              setAttempts(0)
              generateProblem()
            }}
            variant="outline"
            size="sm"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset Scores
          </Button>
        </div>

        {/* Header Block */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DEDAD1]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  Linguistic Reflex Engine
                </span>
                <span className="text-[#DEDAD1]">&bull;</span>
                <Badge variant="stone" size="sm">Zahlen 0 – 1.000.000</Badge>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] font-heading tracking-tight">
                German Number Trainer
              </h1>
              <p className="text-xs sm:text-sm text-[#55534F] mt-1 font-sans">
                Master inverted numbers (einundzwanzig), euro pricing, ordinals, and audio dictation.
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
                  {correct}/{attempts}
                </span>
              </div>
            </div>
          </div>

          {/* Mode & Category Toolbar */}
          <div className="pt-6 space-y-4">
            {/* Category selection */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-[#89857E] font-medium mr-1">Range:</span>
              {[
                { id: '0-20', label: '0–20' },
                { id: '21-100', label: '21–100 (Inverted)' },
                { id: 'hundreds', label: 'Hundreds' },
                { id: 'thousands', label: 'Thousands' },
                { id: 'large', label: 'Millions' },
                { id: 'ordinals', label: 'Ordinals (1st, 2nd)' },
                { id: 'prices', label: 'Euro Prices' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleCategoryChange(c.id as NumberCategory)}
                  className={`text-xs px-2.5 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                    category === c.id
                      ? 'skeuo-button-dark text-white font-semibold'
                      : 'skeuo-button-secondary text-[#55534F]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Exercise mode selection */}
            <div className="flex items-center gap-1.5 flex-wrap border-t border-[#ECE8E0] pt-3">
              <span className="text-xs text-[#89857E] font-medium mr-1">Exercise:</span>
              {[
                { id: 'multipleChoice', label: 'Number to Word (Quiz)' },
                { id: 'typeSpelling', label: 'Type German Spelling' },
                { id: 'wordToNumber', label: 'Word to Number' },
                { id: 'listenIdentify', label: 'Listen & Identify' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handlePracticeModeChange(m.id as PracticeMode)}
                  className={`text-xs px-2.5 py-1.5 rounded-[4px] font-medium transition-all cursor-pointer ${
                    practiceMode === m.id
                      ? 'skeuo-button-primary text-white font-semibold'
                      : 'skeuo-button-secondary text-[#55534F]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Workspace */}
        <div className="skeuo-paper rounded-[8px] p-6 sm:p-10 space-y-8">
          {/* Main Prompt Card (Recessed Instrument Console) */}
          <div className="text-center py-8 skeuo-recessed rounded-[6px] space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#89857E] font-semibold">
              {practiceMode === 'listenIdentify'
                ? 'Listen to the audio and select the matching German number'
                : practiceMode === 'wordToNumber'
                  ? 'Read the German word and identify the numeric value'
                  : 'Convert this number into German'}
            </span>

            {/* Big Prominent Number or Word */}
            {practiceMode === 'listenIdentify' ? (
              <div className="py-4">
                <Button
                  onClick={() => speak(currentWord)}
                  variant="primary"
                  size="lg"
                  leftIcon={<Volume2 className="w-5 h-5" />}
                >
                  Replay Audio Dictation
                </Button>
              </div>
            ) : practiceMode === 'wordToNumber' ? (
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-2xl sm:text-4xl font-black font-heading text-[#171717]">
                  {currentWord}
                </h2>
                <button
                  onClick={() => speak(currentWord)}
                  className="w-10 h-10 rounded-[6px] skeuo-audio-knob flex items-center justify-center text-[#55534F] hover:text-[#C83B32] cursor-pointer"
                  title="Pronounce"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <h2 className="text-4xl sm:text-6xl font-black font-mono text-[#171717] tracking-tight">
                  {category === 'prices'
                    ? priceFormatted
                    : category === 'ordinals' && currentOrdinal
                      ? `${currentOrdinal.number}.`
                      : currentNumber.toLocaleString('de-DE')}
                </h2>

                <button
                  onClick={() => speak(currentWord)}
                  className="w-10 h-10 rounded-[6px] skeuo-audio-knob flex items-center justify-center text-[#55534F] hover:text-[#C83B32] cursor-pointer"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            )}

            {category === 'ordinals' && currentOrdinal && (
              <p className="text-xs text-[#89857E]">
                English: <strong>{currentOrdinal.english}</strong> (e.g., der {currentOrdinal.ordinal} Mai)
              </p>
            )}
          </div>

          {/* Answer Input Area */}
          {practiceMode === 'typeSpelling' ? (
            <form onSubmit={handleSpellingSubmit} className="space-y-4 max-w-xl mx-auto">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] text-center">
                Type the German spelling (use correct umlauts and ß):
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  disabled={Boolean(feedback)}
                  placeholder="e.g. einundzwanzig"
                  className="w-full px-4 py-3 skeuo-input rounded-[5px] text-base font-mono text-[#171717]"
                  autoFocus
                />
                <Button type="submit" variant="primary" size="lg" disabled={Boolean(feedback)}>
                  Check
                </Button>
              </div>

              {/* Special character helpers */}
              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#89857E]">
                <span>German special characters:</span>
                {['ä', 'ö', 'ü', 'ß'].map((char) => (
                  <button
                    key={char}
                    type="button"
                    onClick={() => setTypedInput((prev) => prev + char)}
                    className="w-8 h-8 skeuo-button-secondary rounded-[4px] text-[#171717] font-mono font-bold cursor-pointer"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </form>
          ) : (
            /* Multiple Choice Options */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {mcOptions.map((opt) => {
                const isSelected = userChoice === opt
                const isCorrectOpt =
                  practiceMode === 'wordToNumber'
                    ? opt === currentNumber.toString()
                    : opt.toLowerCase() === currentWord.toLowerCase()

                let btnStyles =
                  'skeuo-word-tile'

                if (feedback) {
                  if (isCorrectOpt) {
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
                    onClick={() => handleChoice(opt)}
                    disabled={Boolean(feedback)}
                    className={`p-4 rounded-[6px] text-left font-mono text-sm sm:text-base font-semibold cursor-pointer ${btnStyles}`}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {/* Feedback & Next Problem Button */}
          {feedback && (
            <div className="animate-fade-in p-5 rounded-[6px] border space-y-3 skeuo-paper">
              <div
                className={`flex items-start gap-4 ${feedback.isCorrect ? 'text-[#2A684C]' : 'text-[#C83B32]'
                  }`}
              >
                <div className="shrink-0 mt-0.5">
                  {feedback.isCorrect ? (
                    <span className="skeuo-stamp-correct">RICHTIG!</span>
                  ) : (
                    <span className="skeuo-stamp-incorrect">FALSCH!</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-sm">{feedback.message}</p>
                  <p className="text-xs text-[#55534F] mt-0.5">
                    Spelling Breakdown: <strong className="font-mono text-[#171717]">{currentWord}</strong>
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => generateProblem()}
                  variant="primary"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Next Number
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* German Inverted Numbers Rule Guide */}
        <div className="mt-14 skeuo-paper-stacked rounded-[6px] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#D7B95D]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              German Number Rules Demystified
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#55534F]">
            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                1. The Inverted Order Rule
              </strong>
              <p>
                Between 21 and 99, Germans say the single digit first, connected by "und", followed by the tens:
              </p>
              <div className="font-mono text-[#C83B32] text-xs font-semibold">
                21 = ein + und + zwanzig (einundzwanzig)<br />
                54 = vier + und + fünfzig (vierundfünfzig)
              </div>
            </div>

            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                2. Compound Words
              </strong>
              <p>
                In German, numbers under one million are written as one continuous word without spaces or hyphens:
              </p>
              <div className="font-mono text-[#171717] text-xs font-semibold">
                348 = dreihundertachtundvierzig<br />
                2024 = zweitausendvierundzwanzig
              </div>
            </div>

            <div className="p-4 skeuo-recessed rounded-[6px] space-y-2">
              <strong className="text-[#171717] block font-semibold text-sm">
                3. Die Million (Feminine Noun)
              </strong>
              <p>
                Unlike hundred and thousand, "Million" is a capitalized feminine noun written separately:
              </p>
              <div className="font-mono text-[#2A684C] text-xs font-semibold">
                1.000.000 = eine Million<br />
                2.000.000 = zwei Millionen
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
