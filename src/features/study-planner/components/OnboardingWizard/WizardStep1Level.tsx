import React from 'react'
import { CefrLevel } from '@/types'
import { useLearningProgress } from '@/hooks/useLocalStorage'
import { Award, CheckCircle2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WizardStep1Props {
  currentLevel: CefrLevel
  targetLevel: CefrLevel
  hasDiagnosticResult: boolean
  diagnosticScore?: number
  onCurrentLevelChange: (lvl: CefrLevel) => void
  onTargetLevelChange: (lvl: CefrLevel) => void
  onDiagnosticToggle: (hasResult: boolean, score?: number) => void
}

const CEFR_LEVELS: { id: CefrLevel; label: string; germanDesc: string; englishDesc: string }[] = [
  { id: 'A1', label: 'A1: Beginner', germanDesc: 'Erste Alltagssätze & Begrüßung', englishDesc: 'Basic everyday expressions and basic interactions' },
  { id: 'A2', label: 'A2: Elementary', germanDesc: 'Einfache Routinegespräche & Familie', englishDesc: 'Routine conversations, shopping, and work' },
  { id: 'B1', label: 'B1: Intermediate', germanDesc: 'Selbstständige Sprachverwendung', englishDesc: 'Independent communication, travel, and personal interests' },
  { id: 'B2', label: 'B2: Upper Intermediate', germanDesc: 'Fließende berufl. Kommunikation', englishDesc: 'Complex technical texts and spontaneous fluency' },
  { id: 'C1', label: 'C1: Advanced', germanDesc: 'Wissenschaftssprache & Nuancen', englishDesc: 'Academic discourse, flexible and structured expression' },
]

export const WizardStep1Level: React.FC<WizardStep1Props> = ({
  currentLevel,
  targetLevel,
  hasDiagnosticResult,
  diagnosticScore,
  onCurrentLevelChange,
  onTargetLevelChange,
  onDiagnosticToggle,
}) => {
  const { progress } = useLearningProgress()
  const recentAssessment = progress.assessmentHistory && progress.assessmentHistory[0]

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="border-b border-[#EFECE6] pb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
          Schritt 01 von 05 • Sprachniveau
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
          Aktuelles & Angestrebtes Sprachniveau (CEFR)
        </h3>
        <p className="text-sm text-[#5A5751] mt-1">
          Wähle dein derzeitiges Sprachniveau und dein angestrebtes Lernziel nach dem Gemeinsamen Europäischen Referenzrahmen.
        </p>
      </div>

      {/* 2. D9W Diagnostic Result Detection */}
      {recentAssessment && (
        <div className="skeuo-recessed p-4 rounded-xl flex items-start gap-3 bg-[#FBF9F5] border border-[#E5E1D8]">
          <Award className="w-5 h-5 text-[#C83B32] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <span className="font-bold text-[#171717]">
              Vorheriges D9W Einstufungsergebnis gefunden: {recentAssessment.recommendedLevel} ({recentAssessment.percentage}%)
            </span>
            <p className="text-[#6B6760] mt-0.5">
              Du hast am {new Date(recentAssessment.completedAt).toLocaleDateString()} einen D9W Einstufungstest abgelegt.
              (Hinweis: Dies ist eine diagnostische Orientierung, kein amtliches CEFR-Zertifikat).
            </p>
            <button
              type="button"
              onClick={() => {
                onCurrentLevelChange(recentAssessment.recommendedLevel)
                onDiagnosticToggle(true, recentAssessment.percentage)
              }}
              className="mt-2 text-xs font-semibold text-[#C83B32] hover:underline inline-flex items-center gap-1"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Als aktuelles Niveau übernehmen
            </button>
          </div>
        </div>
      )}

      {/* 3. Current Level Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider font-bold text-[#171717]">
          1. Wo stehst du aktuell? (Current Level)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {CEFR_LEVELS.map((lvl) => {
            const isSelected = currentLevel === lvl.id
            return (
              <button
                key={`current-${lvl.id}`}
                type="button"
                onClick={() => {
                  onCurrentLevelChange(lvl.id)
                  // Auto-adjust target level if current > target
                  const levels = ['A1', 'A2', 'B1', 'B2', 'C1']
                  if (levels.indexOf(lvl.id) > levels.indexOf(targetLevel)) {
                    onTargetLevelChange(lvl.id)
                  }
                }}
                className={cn(
                  'p-3.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between min-h-[90px]',
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                    : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <div>
                  <span className="font-bold text-sm block">{lvl.id}</span>
                  <span className={cn('text-[11px] block mt-0.5', isSelected ? 'text-gray-300' : 'text-[#6B6760]')}>
                    {lvl.germanDesc}
                  </span>
                </div>
                {isSelected && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#D7B95D] font-bold mt-2">
                    ✓ Ausgewählt
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Target Level Selection */}
      <div className="space-y-3">
        <label className="block text-xs font-mono uppercase tracking-wider font-bold text-[#171717]">
          2. Welches Zielniveau strebst du an? (Target Level)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
          {CEFR_LEVELS.map((lvl) => {
            const isSelected = targetLevel === lvl.id
            const levels = ['A1', 'A2', 'B1', 'B2', 'C1']
            const isLower = levels.indexOf(lvl.id) < levels.indexOf(currentLevel)

            return (
              <button
                key={`target-${lvl.id}`}
                type="button"
                disabled={isLower}
                onClick={() => onTargetLevelChange(lvl.id)}
                className={cn(
                  'p-3.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between min-h-[90px]',
                  isSelected
                    ? 'bg-[#C83B32] text-white border-[#C83B32] shadow-sm'
                    : isLower
                      ? 'bg-[#F5F3EF] opacity-40 border-[#E5E1D8] cursor-not-allowed text-[#9E9B93]'
                      : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <div>
                  <span className="font-bold text-sm block">{lvl.id}</span>
                  <span className={cn('text-[11px] block mt-0.5', isSelected ? 'text-red-100' : 'text-[#6B6760]')}>
                    {lvl.germanDesc}
                  </span>
                </div>
                {isSelected && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white font-bold mt-2">
                    ★ Zielniveau
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. Diagnostic Assessment Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer text-xs">
          <input
            type="checkbox"
            checked={hasDiagnosticResult}
            onChange={(e) => onDiagnosticToggle(e.target.checked, diagnosticScore)}
            className="w-4 h-4 mt-0.5 rounded border-[#C8C4BA] text-[#C83B32] focus:ring-[#C83B32]"
          />
          <span className="text-[#4A4741] leading-relaxed">
            Ich habe bereits einen Einstufungstest oder Vorkurs absolviert und kenne meine sprachlichen Stärken und Schwächen.
          </span>
        </label>
      </div>

      {/* 6. Honest Educational Disclaimer Note */}
      <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#E5E1D8] flex items-start gap-2.5 text-xs text-[#6B6760]">
        <Info className="w-4 h-4 text-[#89857E] shrink-0 mt-0.5" />
        <p>
          <strong>Wichtiger Hinweis:</strong> Die Einstufung dient der realistischen Lehrplanerstellung. D9W stellt keine amtlichen Sprachdiplome aus; offizielle Prüfungen müssen bei lizenzierten Prüfungszentren (z.B. Goethe-Institut, telc gGmbH, TestDaF) abgelegt werden.
        </p>
      </div>
    </div>
  )
}
