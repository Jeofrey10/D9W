import React, { useState } from 'react'
import {
  StudyPreferences,
  CefrLevel,
  CoreSkill,
  ExamConfiguration,
  PreferredTimeOfDay,
  StudyIntensity,
} from '../../types/studyPlanner.types'
import { STUDY_ARCHETYPE_TEMPLATES } from '@/data/study-planner/study-templates'
import { WizardStep1Level } from './WizardStep1Level'
import { WizardStep2Exam } from './WizardStep2Exam'
import { WizardStep3Availability } from './WizardStep3Availability'
import { WizardStep4Priorities } from './WizardStep4Priorities'
import { WizardStep5Review } from './WizardStep5Review'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

interface OnboardingWizardProps {
  onComplete: (preferences: StudyPreferences) => void
  initialPreferences?: StudyPreferences
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  onComplete,
  initialPreferences,
}) => {
  const [currentStep, setCurrentStep] = useState(1)

  // Default state initialization
  const [currentLevel, setCurrentLevel] = useState<CefrLevel>(
    initialPreferences?.currentLevel || 'A2'
  )
  const [targetLevel, setTargetLevel] = useState<CefrLevel>(
    initialPreferences?.targetLevel || 'B1'
  )
  const [hasDiagnosticResult, setHasDiagnosticResult] = useState<boolean>(
    initialPreferences?.hasDiagnosticResult || false
  )
  const [diagnosticScore, setDiagnosticScore] = useState<number | undefined>(
    initialPreferences?.diagnosticScore
  )

  const [examConfig, setExamConfig] = useState<ExamConfiguration>(
    initialPreferences?.examConfig || {
      provider: 'Goethe-Zertifikat',
      targetLevel: 'B1',
      examDate: null,
      isConfirmedDate: false,
      isFlexibleGoal: true,
      flexibleWeeks: 12,
    }
  )

  const [availableDays, setAvailableDays] = useState<number[]>(
    initialPreferences?.availableDays || [1, 2, 3, 4, 6] // Mon, Tue, Wed, Thu, Sat
  )
  const [dailyMinutes, setDailyMinutes] = useState<number>(
    initialPreferences?.dailyMinutes || 35
  )
  const [preferredTime, setPreferredTime] = useState<PreferredTimeOfDay>(
    initialPreferences?.preferredTime || 'evening'
  )
  const [intensity, setIntensity] = useState<StudyIntensity>(
    initialPreferences?.intensity || 'balanced'
  )

  const [strongestSkill, setStrongestSkill] = useState<CoreSkill>(
    initialPreferences?.strongestSkill || 'reading'
  )
  const [weakestSkill, setWeakestSkill] = useState<CoreSkill>(
    initialPreferences?.weakestSkill || 'speaking'
  )
  const [additionalAttentionSkills, setAdditionalAttentionSkills] = useState<CoreSkill[]>(
    initialPreferences?.additionalAttentionSkills || []
  )
  const [includeGrammar, setIncludeGrammar] = useState<boolean>(
    initialPreferences?.includeGrammar ?? true
  )
  const [includeVocabulary, setIncludeVocabulary] = useState<boolean>(
    initialPreferences?.includeVocabulary ?? true
  )

  // Archetype preset apply
  const handleApplyArchetype = (archetypeId: string) => {
    const arch = STUDY_ARCHETYPE_TEMPLATES.find((a) => a.id === archetypeId)
    if (!arch) return
    setCurrentLevel(arch.defaultCurrentLevel)
    setTargetLevel(arch.defaultTargetLevel)
    setExamConfig((prev) => ({
      ...prev,
      provider: arch.defaultProvider,
      isFlexibleGoal: true,
      flexibleWeeks: 12,
    }))
    setAvailableDays(arch.suggestedDays)
    setDailyMinutes(arch.suggestedMinutes)
    setIntensity(arch.intensity)
    setWeakestSkill(arch.weakestSkill)
    setStrongestSkill(arch.strongestSkill)
    setIncludeGrammar(arch.includeGrammar)
    setIncludeVocabulary(arch.includeVocabulary)
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleFinalConfirm = () => {
    const preferences: StudyPreferences = {
      currentLevel,
      targetLevel,
      hasDiagnosticResult,
      diagnosticScore,
      examConfig: {
        ...examConfig,
        targetLevel,
      },
      availableDays,
      dailyMinutes,
      preferredTime,
      intensity,
      strongestSkill,
      weakestSkill,
      additionalAttentionSkills,
      includeGrammar,
      includeVocabulary,
    }
    onComplete(preferences)
  }

  const stepLabels = [
    'Sprachniveau',
    'Prüfung & Termin',
    'Verfügbarkeit',
    'Schwerpunkte',
    'Bestätigung',
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 1. Archetype Quick Select Pills */}
      {currentStep === 1 && (
        <div className="skeuo-recessed p-4 rounded-2xl border border-[#E5E1D8] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#171717]">
            <Sparkles className="w-4 h-4 text-[#C83B32]" />
            Schnellstart mit bewährten Lernprofilen (Optional):
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {STUDY_ARCHETYPE_TEMPLATES.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => handleApplyArchetype(a.id)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white border border-[#DEDAD1] hover:border-[#171717] transition-all text-[#171717] font-medium"
              >
                {a.germanName} ({a.suggestedMinutes}m/Tag)
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Step Progress Bar */}
      <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1]">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-[#89857E] mb-2">
          <span>SCHRITT {currentStep} VON 5</span>
          <span className="text-[#171717]">{stepLabels[currentStep - 1]}</span>
        </div>
        <div className="w-full bg-[#EFECE6] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C83B32] h-full transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* 3. Step Content */}
      <div className="skeuo-paper p-6 sm:p-8 rounded-2xl border border-[#DEDAD1] shadow-sm">
        {currentStep === 1 && (
          <WizardStep1Level
            currentLevel={currentLevel}
            targetLevel={targetLevel}
            hasDiagnosticResult={hasDiagnosticResult}
            diagnosticScore={diagnosticScore}
            onCurrentLevelChange={setCurrentLevel}
            onTargetLevelChange={setTargetLevel}
            onDiagnosticToggle={(hasRes, score) => {
              setHasDiagnosticResult(hasRes)
              setDiagnosticScore(score)
            }}
          />
        )}

        {currentStep === 2 && (
          <WizardStep2Exam
            examConfig={examConfig}
            targetLevel={targetLevel}
            onChange={setExamConfig}
          />
        )}

        {currentStep === 3 && (
          <WizardStep3Availability
            availableDays={availableDays}
            dailyMinutes={dailyMinutes}
            preferredTime={preferredTime}
            intensity={intensity}
            onAvailableDaysChange={setAvailableDays}
            onDailyMinutesChange={setDailyMinutes}
            onPreferredTimeChange={setPreferredTime}
            onIntensityChange={setIntensity}
          />
        )}

        {currentStep === 4 && (
          <WizardStep4Priorities
            strongestSkill={strongestSkill}
            weakestSkill={weakestSkill}
            additionalAttentionSkills={additionalAttentionSkills}
            includeGrammar={includeGrammar}
            includeVocabulary={includeVocabulary}
            onStrongestSkillChange={setStrongestSkill}
            onWeakestSkillChange={setWeakestSkill}
            onToggleAttentionSkill={(sk) => {
              if (additionalAttentionSkills.includes(sk)) {
                setAdditionalAttentionSkills(additionalAttentionSkills.filter((s) => s !== sk))
              } else {
                setAdditionalAttentionSkills([...additionalAttentionSkills, sk])
              }
            }}
            onToggleGrammar={setIncludeGrammar}
            onToggleVocabulary={setIncludeVocabulary}
          />
        )}

        {currentStep === 5 && (
          <WizardStep5Review
            preferences={{
              currentLevel,
              targetLevel,
              hasDiagnosticResult,
              diagnosticScore,
              examConfig,
              availableDays,
              dailyMinutes,
              preferredTime,
              intensity,
              strongestSkill,
              weakestSkill,
              additionalAttentionSkills,
              includeGrammar,
              includeVocabulary,
            }}
            onConfirmGenerate={handleFinalConfirm}
            onEditStep={(step) => setCurrentStep(step)}
          />
        )}

        {/* 4. Wizard Step Navigation Controls */}
        <div className="flex items-center justify-between border-t border-[#EFECE6] pt-6 mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-[#DEDAD1] bg-white hover:bg-[#F9F8F5] text-xs font-bold text-[#171717] flex items-center gap-1.5 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Zurück
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 && (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#2B2B2B] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Weiter zu Schritt {currentStep + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
