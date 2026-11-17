import React, { useState } from 'react'
import { useCaseProgress } from '../hooks/useCaseProgress'
import { GrammaticalCase } from '../types/caseTranslator.types'
import { getCaseColorStyles } from '../utils/caseColorTokens'
import { RotateCcw, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

export const GrammarProgressDashboard: React.FC = () => {
  const {
    progress,
    totalAttempts,
    totalCorrect,
    accuracyPercent,
    strongestCase,
    weakestCase,
    resetProgress,
  } = useCaseProgress()

  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const cases: GrammaticalCase[] = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv']

  const handleConfirmReset = () => {
    resetProgress()
    setShowResetConfirm(false)
  }

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Modul H • Persönlicher Lernfortschritt
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
              Grammatik-Lernfortschritt &amp; Kasus-Beherrschung
            </h2>
          </div>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="inline-flex items-center gap-1.5 text-xs font-sans text-[#89857E] hover:text-[#C83B32] border border-[#DEDAD1] bg-white rounded-lg px-3 py-1.5 hover:bg-[#FEF2F2] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Fortschritt zurücksetzen
          </button>
        </div>

        <p className="text-sm font-sans text-[#55534F] leading-relaxed">
          Ihre Lernergebnisse werden lokal in Ihrem Browser (<code>d9w-case-grammar-progress-v1</code>) gespeichert.
          Erkennen Sie sofort, in welchen Fällen Sie bereits sicher sind und wo gezielte Wiederholungen sinnvoll sind.
        </p>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Total Questions */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#89857E] block">
              Beantwortete Fragen
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
              {totalAttempts}
            </div>
            <span className="text-[11px] text-[#55534F] block">
              {totalCorrect} richtig gelöst
            </span>
          </div>

          {/* Accuracy */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#89857E] block">
              Erfolgsquote
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C83B32]">
              {accuracyPercent}%
            </div>
            <span className="text-[11px] text-[#55534F] block">
              Gesamtgenauigkeit
            </span>
          </div>

          {/* Strongest Case */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#89857E] block">
              Stärkster Fall
            </span>
            <div className="text-lg sm:text-xl font-serif font-bold text-[#15803D] truncate">
              {strongestCase ? strongestCase.caseName : '—'}
            </div>
            <span className="text-[11px] text-[#55534F] block">
              {strongestCase ? `${strongestCase.rate}% Genauigkeit` : (weakestCase ? `Üben: ${weakestCase.caseName}` : 'Noch zu wenig Daten')}
            </span>
          </div>

          {/* Builder Exercises */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#89857E] block">
              Satzbaukasten
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-[#854D0E]">
              {progress.builderCompletedIds.length}
            </div>
            <span className="text-[11px] text-[#55534F] block">
              Gelöste Sätze
            </span>
          </div>
        </div>
      </div>

      {/* 2. Case-by-Case Breakdown Cards */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#171717]">
          Genauigkeit nach grammatikalischem Fall
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((c) => {
            const data = progress.caseAccuracy[c]
            const rate = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0
            const color = getCaseColorStyles(c)

            return (
              <div
                key={c}
                className={cn(
                  'p-4 rounded-xl border bg-white space-y-3',
                  color.pillBorder
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-base text-[#171717]">
                    {c}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#89857E]">
                    {data.correct}/{data.attempted}
                  </span>
                </div>

                <div className="w-full bg-[#FAF8F5] h-2 rounded-full overflow-hidden border border-[#E5E0D8]">
                  <div
                    className={cn('h-full transition-all duration-300', color.dotClass)}
                    style={{ width: `${rate}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#89857E] font-mono">Erfolgsrate:</span>
                  <strong className={cn('font-mono font-bold', color.textClass)}>
                    {rate}%
                  </strong>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 space-y-5 shadow-xl border border-[#DEDAD1]">
            <div className="flex items-center gap-3 text-[#C83B32]">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-lg font-serif font-bold text-[#171717]">
                Fortschritt zurücksetzen?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
              Möchten Sie Ihren gesamten lokalen Kasus-Lernfortschritt (Statistiken, gelöste Quizfragen, Satzbaukasten-Erfolge) wirklich unwiderruflich löschen?
            </p>
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EFECE6]">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg border border-[#DEDAD1] text-xs font-medium text-[#55534F] hover:bg-[#FAF8F5] cursor-pointer"
              >
                Abbrechen
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 rounded-lg bg-[#C83B32] text-white text-xs font-bold hover:bg-[#B3342C] shadow-sm cursor-pointer"
              >
                Ja, Fortschritt leeren
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
