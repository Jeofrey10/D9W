import React, { useState } from 'react'
import { BUILDER_EXERCISES } from '@/data/grammar/builder-exercises'
import { useCaseProgress } from '../hooks/useCaseProgress'
import { getCaseColorStyles } from '../utils/caseColorTokens'
import {
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  Eye,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const SentenceCaseBuilderModule: React.FC = () => {
  const { recordBuilderCompletion } = useCaseProgress()

  const [exerciseIndex, setExerciseIndex] = useState(0)
  const currentEx = BUILDER_EXERCISES[exerciseIndex]

  // Dynamic tiles
  const [availableTiles, setAvailableTiles] = useState<string[]>(() => [
    ...BUILDER_EXERCISES[0].scrambledTiles,
  ])
  const [placedTiles, setPlacedTiles] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showSolution, setShowSolution] = useState(false)

  const handleTileClick = (tile: string, fromAvailable: boolean) => {
    if (isSubmitted && isCorrect) return

    if (fromAvailable) {
      setAvailableTiles((prev) => {
        const idx = prev.indexOf(tile)
        if (idx === -1) return prev
        const next = [...prev]
        next.splice(idx, 1)
        return next
      })
      setPlacedTiles((prev) => [...prev, tile])
    } else {
      setPlacedTiles((prev) => {
        const idx = prev.indexOf(tile)
        if (idx === -1) return prev
        const next = [...prev]
        next.splice(idx, 1)
        return next
      })
      setAvailableTiles((prev) => [...prev, tile])
    }
  }

  const handleCheck = () => {
    const constructedSentence = placedTiles.join(' ')
    const matchesTarget = currentEx.acceptableOrders.some(
      (order) =>
        constructedSentence.trim().replace(/\.$/, '') ===
        order.trim().replace(/\.$/, '')
    )

    setIsCorrect(matchesTarget)
    setIsSubmitted(true)

    if (matchesTarget) {
      recordBuilderCompletion(currentEx.id)
    }
  }

  const handleResetCurrent = () => {
    setAvailableTiles([...currentEx.scrambledTiles])
    setPlacedTiles([])
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowSolution(false)
  }

  const handleNextExercise = () => {
    const nextIdx = (exerciseIndex + 1) % BUILDER_EXERCISES.length
    setExerciseIndex(nextIdx)
    setAvailableTiles([...BUILDER_EXERCISES[nextIdx].scrambledTiles])
    setPlacedTiles([])
    setIsSubmitted(false)
    setIsCorrect(false)
    setShowSolution(false)
  }

  return (
    <div className="space-y-6">
      {/* 1. Module Header */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Modul F • Kasus-Baukasten
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
              Satzbaukasten mit Kasus-Feedback
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#89857E]">
              Übung {exerciseIndex + 1} von {BUILDER_EXERCISES.length}
            </span>
          </div>
        </div>

        <p className="text-sm font-sans text-[#55534F] leading-relaxed">
          Bringen Sie die Wortkacheln in die korrekte Reihenfolge. Nach erfolgreicher Konstruktion
          erklärt der Baukasten im Detail, warum jeder Satzbestandteil in seinem spezifischen Fall steht.
        </p>
      </div>

      {/* 2. Interactive Construction Desk */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Exercise Prompt */}
        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#89857E] font-bold block">
            Ziel-Bedeutung (Englisch):
          </span>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#171717]">
            „{currentEx.englishPrompt}“
          </h3>
          <span className="text-xs font-mono text-[#C83B32]">
            Kategorie: {currentEx.category}
          </span>
        </div>

        {/* Construction Drop Tray */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-[#89857E]">
            Ihr Satz (Kacheln hier ablegen):
          </span>
          <div className="min-h-20 p-4 rounded-xl border-2 border-dashed border-[#D2CDC3] bg-white flex flex-wrap gap-2 items-center">
            {placedTiles.length === 0 ? (
              <span className="text-xs font-mono text-[#A09C94] italic">
                Klicken Sie unten auf die Kacheln, um Ihren Satz zu bauen...
              </span>
            ) : (
              placedTiles.map((tile, i) => (
                <button
                  key={i}
                  onClick={() => handleTileClick(tile, false)}
                  className="px-4 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#171717] font-serif text-base font-bold text-[#171717] shadow-xs hover:bg-[#FEF2F2] hover:border-[#C83B32] transition-all cursor-pointer"
                  title="Klicken zum Entfernen"
                >
                  {tile}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Source Tiles */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-[#89857E]">
            Verfügbare Wortkacheln:
          </span>
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] flex flex-wrap gap-2 items-center min-h-16">
            {availableTiles.length === 0 ? (
              <span className="text-xs font-mono text-[#89857E]">
                Alle Kacheln platziert. Prüfen Sie Ihren Satz!
              </span>
            ) : (
              availableTiles.map((tile, i) => (
                <button
                  key={i}
                  onClick={() => handleTileClick(tile, true)}
                  className="px-4 py-2.5 rounded-lg bg-white border border-[#DEDAD1] font-serif text-base font-bold text-[#171717] shadow-xs hover:border-[#171717] hover:shadow-sm active:translate-y-px transition-all cursor-pointer"
                >
                  {tile}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCurrent}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DEDAD1] bg-white text-xs font-sans text-[#55534F] hover:text-[#171717] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Zurücksetzen
            </button>
            <button
              onClick={() => setShowSolution((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#DEDAD1] bg-white text-xs font-sans text-[#55534F] hover:text-[#171717] cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              {showSolution ? 'Lösung verbergen' : 'Lösung anzeigen'}
            </button>
          </div>

          <button
            disabled={placedTiles.length === 0}
            onClick={handleCheck}
            className={cn(
              'px-6 py-2.5 rounded-lg text-xs font-sans font-bold shadow-sm transition-all',
              placedTiles.length > 0
                ? 'bg-[#C83B32] hover:bg-[#B3342C] text-white cursor-pointer active:translate-y-px'
                : 'bg-[#DEDAD1] text-[#89857E] cursor-not-allowed'
            )}
          >
            Satz überprüfen
          </button>
        </div>

        {/* Solution Reveal */}
        {showSolution && (
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#D7B95D] text-xs font-mono text-[#171717]">
            Musterlösung: <strong>{currentEx.targetGerman}</strong>
          </div>
        )}

        {/* Detailed Feedback & Educational Case Breakdown */}
        {isSubmitted && (
          <div
            className={cn(
              'p-6 rounded-2xl border space-y-4 animate-fadeIn',
              isCorrect
                ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                : 'bg-[#FEF2F2] border-[#FECACA]'
            )}
          >
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <span className="text-base font-serif font-bold text-[#15803D] flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" />
                  Hervorragend! Der Satz ist grammatikalisch perfekt.
                </span>
              ) : (
                <span className="text-base font-serif font-bold text-[#C83B32]">
                  Die Wortstellung oder die Kacheln passen noch nicht ganz.
                </span>
              )}
            </div>

            {/* Case Breakdown Cards */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-mono font-bold uppercase text-[#89857E]">
                Detaillierte Kasus-Begründung:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentEx.caseBreakdown.map((cb, idx) => {
                  const color = getCaseColorStyles(cb.caseName)
                  return (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-[#E5E0D8] space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-[#171717]">
                          {cb.word}
                        </span>
                        <span
                          className={cn(
                            'text-[9px] font-mono px-2 py-0.5 rounded-full font-bold',
                            color.badgeClass
                          )}
                        >
                          {cb.caseName}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#55534F] leading-relaxed pt-1">
                        {cb.explanation}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            <p className="text-xs text-[#55534F] leading-relaxed">
              <strong className="text-[#171717]">Satzbauregel: </strong>
              {currentEx.explanation}
            </p>

            <div className="pt-2 text-right">
              <button
                onClick={handleNextExercise}
                className="inline-flex items-center gap-2 px-5 py-2 bg-[#171717] hover:bg-black text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Nächste Satzbau-Übung
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
