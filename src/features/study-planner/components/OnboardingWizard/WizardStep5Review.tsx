import React from 'react'
import { StudyPreferences } from '../../types/studyPlanner.types'
import { calculateGlhEstimate } from '../../utils/scheduleGenerator'
import {
  Clock,
  Sparkles,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'

interface WizardStep5Props {
  preferences: StudyPreferences
  onConfirmGenerate: () => void
  onEditStep: (stepNumber: number) => void
}

function calculateReviewWeeks(
  examDate: string | null,
  isFlexible: boolean,
  flexibleWeeks?: number
): number {
  if (isFlexible || !examDate) {
    return flexibleWeeks || 12
  }
  const today = new Date()
  const target = new Date(examDate + 'T00:00:00')
  const diffDays = Math.max(7, Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
  return Math.max(1, Math.round(diffDays / 7))
}

export const WizardStep5Review: React.FC<WizardStep5Props> = ({
  preferences,
  onConfirmGenerate,
  onEditStep,
}) => {
  const totalWeeks = calculateReviewWeeks(
    preferences.examConfig.examDate,
    preferences.examConfig.isFlexibleGoal,
    preferences.examConfig.flexibleWeeks
  )

  const glh = calculateGlhEstimate(
    preferences.currentLevel,
    preferences.targetLevel,
    preferences.availableDays.length,
    preferences.dailyMinutes,
    totalWeeks
  )

  const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
  const sortedDays = [...preferences.availableDays].sort((a, b) => {
    const aNorm = a === 0 ? 7 : a
    const bNorm = b === 0 ? 7 : b
    return aNorm - bNorm
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="border-b border-[#EFECE6] pb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
          Schritt 05 von 05 • Zusammenfassung & Bestätigung
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
          Dein personalisierter Lernplan im Überblick
        </h3>
        <p className="text-sm text-[#5A5751] mt-1">
          Überprüfe deine Angaben, bevor der deterministische Stundenplan generiert wird.
        </p>
      </div>

      {/* 2. Key Metrics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-[#89857E]">Niveaupfad</span>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-[10px] text-[#C83B32] font-semibold hover:underline"
            >
              Ändern
            </button>
          </div>
          <div className="text-lg font-bold text-[#171717] flex items-center gap-1.5">
            <span>{preferences.currentLevel}</span>
            <span className="text-[#C83B32]">→</span>
            <span className="text-[#C83B32]">{preferences.targetLevel}</span>
          </div>
          <span className="text-[11px] text-[#6B6760] block">
            {preferences.hasDiagnosticResult ? 'Mit Vorerfahrung' : 'Reguläre Einstufung'}
          </span>
        </div>

        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-[#89857E]">Zielprüfung</span>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-[10px] text-[#C83B32] font-semibold hover:underline"
            >
              Ändern
            </button>
          </div>
          <div className="text-base font-bold text-[#171717] truncate">
            {preferences.examConfig.provider}
          </div>
          <span className="text-[11px] text-[#6B6760] block">
            {preferences.examConfig.isFlexibleGoal
              ? `${preferences.examConfig.flexibleWeeks || 12} Wochen (flexibel)`
              : preferences.examConfig.examDate || 'Termin offen'}
          </span>
        </div>

        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-[#89857E]">Wochenpensum</span>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-[10px] text-[#C83B32] font-semibold hover:underline"
            >
              Ändern
            </button>
          </div>
          <div className="text-base font-bold text-[#171717]">
            {glh.hoursPerWeek} Std. / Woche
          </div>
          <span className="text-[11px] text-[#6B6760] block">
            {preferences.availableDays.length} Tage à {preferences.dailyMinutes} Min ({sortedDays.map((d) => dayNames[d]).join(', ')})
          </span>
        </div>

        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase text-[#89857E]">Schwerpunkt</span>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-[10px] text-[#C83B32] font-semibold hover:underline"
            >
              Ändern
            </button>
          </div>
          <div className="text-sm font-bold text-[#C83B32] capitalize">
            Fokus: {preferences.weakestSkill === 'listening' ? 'Hören' : preferences.weakestSkill === 'reading' ? 'Lesen' : preferences.weakestSkill === 'writing' ? 'Schreiben' : 'Sprechen'}
          </div>
          <span className="text-[11px] text-[#6B6760] block">
            Stärke: {preferences.strongestSkill === 'listening' ? 'Hören' : preferences.strongestSkill === 'reading' ? 'Lesen' : preferences.strongestSkill === 'writing' ? 'Schreiben' : 'Sprechen'}
          </span>
        </div>
      </div>

      {/* 3. GLH (Guided Learning Hours) Calculation Card */}
      <div className="skeuo-recessed p-5 rounded-2xl border border-[#E5E1D8] space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-[#171717]">
          <Clock className="w-4 h-4 text-[#C83B32]" />
          Lernzeit-Orientierung (Pädagogische Richtwerte nach GLH-Modell)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-white rounded-xl border border-[#E5E1D8]">
            <span className="text-[#89857E] block text-[11px]">Didaktischer Richtwert ({preferences.currentLevel}→{preferences.targetLevel}):</span>
            <span className="text-base font-bold text-[#171717]">ca. {glh.estimatedHoursNeeded} Stunden</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E5E1D8]">
            <span className="text-[#89857E] block text-[11px]">Geplante Lernzeit im Plan:</span>
            <span className="text-base font-bold text-[#171717]">{glh.totalPlannedHours} Stunden</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#E5E1D8]">
            <span className="text-[#89857E] block text-[11px]">Wöchentlicher Lernaufwand:</span>
            <span className="text-base font-bold text-[#171717]">{glh.hoursPerWeek} Std. / Woche</span>
          </div>
        </div>
        <p className="text-[10px] text-[#89857E] italic pt-1">
          Hinweis: Die angegebenen Lernstunden sind didaktische Orientierungs- und Erfahrungswerte (Richtwerte des Europarats / Goethe-Instituts) und keine verbindlichen Prüfungszulassungsvoraussetzungen. Der individuelle Zeitbedarf variiert je nach Vorkenntnissen, Muttersprache und Lernintensität.
        </p>

        {/* Realistic warning if timeline is tight or gap is large */}
        {glh.warningMessage && (
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 mt-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold block">Hinweis zur realistischen Zielerreichung:</span>
              <p className="leading-relaxed">{glh.warningMessage}</p>
            </div>
          </div>
        )}
      </div>

      {/* 4. Generation Confirmation Banner */}
      <div className="skeuo-paper p-6 rounded-2xl border-2 border-[#171717] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono font-bold text-[#C83B32] uppercase tracking-wider block">
            Bereit zur Erstellung
          </span>
          <h4 className="text-lg font-serif font-bold text-[#171717] mt-0.5">
            Individuellen Lernplan jetzt verbindlich generieren
          </h4>
          <p className="text-xs text-[#5A5751] mt-0.5">
            Erstellt deinen detaillierten Wochenstundenplan mit Tagesaufgaben, Wiederholungen und Modellprüfungen.
          </p>
        </div>

        <button
          type="button"
          onClick={onConfirmGenerate}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#C83B32] hover:bg-[#A82B24] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>Lernplan generieren</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
