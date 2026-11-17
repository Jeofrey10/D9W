import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  useStudyPlanner,
  OnboardingWizard,
  ExamCountdownCard,
  WeeklyTimetable,
  DailyFocusSession,
  MockExamPlanner,
  ProgressDashboard,
  MissedTaskBanner,
  PrintableView,
} from '@/features/study-planner'
import {
  Clock,
  Award,
  ListTodo,
  CheckCircle2,
  PieChart,
  Printer,
  Settings,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PlannerTab = 'today' | 'weekly' | 'exam' | 'mock' | 'progress' | 'print'

export const StudyPlannerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTabParam = searchParams.get('tab') as PlannerTab | null
  const [activeTab, setActiveTab] = useState<PlannerTab>(
    activeTabParam && ['today', 'weekly', 'exam', 'mock', 'progress', 'print'].includes(activeTabParam)
      ? activeTabParam
      : 'today'
  )
  const [isEditingPreferences, setIsEditingPreferences] = useState(false)

  const {
    plan,
    createPlan,
    toggleTaskComplete,
    skipTask,
    rescheduleTask,
    editTaskDuration,
    addCustomTask,
    deleteCustomTask,
    restoreTask,
    overdueTasks,
    moveOverdueTasksToNextAvailableDays,
    skipAllOverdueTasks,
    recordMockExamScores,
    timerState,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    resetPlan,
    importPlan,
  } = useStudyPlanner()

  const handleTabChange = (tab: PlannerTab) => {
    setActiveTab(tab)
    setSearchParams({ tab })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // If no plan exists or user wants to reconfigure preferences
  if (!plan || isEditingPreferences) {
    return (
      <div className="py-8 sm:py-12 bg-[#F7F5F0] min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          {/* Hero Banner */}
          <div className="skeuo-paper rounded-3xl p-6 sm:p-10 border border-[#DEDAD1] shadow-sm text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              D9W Sprachinstitut • Phase 03.09
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] tracking-tight">
              Personalisierter Lernplan & Prüfungs-Countdown
            </h1>
            <p className="text-sm sm:text-base text-[#5A5751] leading-relaxed">
              Erstelle deinen maßgeschneiderten A1–C1 Stundenplan basierend auf deinem Zieltermin (Goethe, telc, TestDaF, DSH), deinen verfügbaren Lerntagen und individuellen Schwächen.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-[#89857E]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C83B32]" />
                100% Deterministisch & Client-Side
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C83B32]" />
                Keine bezahlten Übersetzungs-APIs
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C83B32]" />
                Direkte Anbindung an alle D9W-Module
              </span>
            </div>

            {plan && isEditingPreferences && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingPreferences(false)}
                  className="text-xs font-semibold text-[#89857E] hover:text-[#171717] underline"
                >
                  Abbrechen und zum bestehenden Plan zurückkehren
                </button>
              </div>
            )}
          </div>

          {/* Onboarding Wizard */}
          <OnboardingWizard
            initialPreferences={plan?.preferences}
            onComplete={(prefs) => {
              createPlan(prefs)
              setIsEditingPreferences(false)
              handleTabChange('today')
            }}
          />
        </div>
      </div>
    )
  }

  // If activeTab is 'print', render printable view
  if (activeTab === 'print') {
    return (
      <div className="py-8 bg-[#F7F5F0] min-h-screen">
        <div className="max-w-5xl mx-auto px-4">
          <PrintableView
            plan={plan}
            onBackToDashboard={() => handleTabChange('today')}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="py-8 sm:py-12 bg-[#F7F5F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        {/* 1. Missed Task Recovery Banner */}
        <MissedTaskBanner
          overdueTasks={overdueTasks}
          onMoveToNextDays={moveOverdueTasksToNextAvailableDays}
          onSkipAll={skipAllOverdueTasks}
        />

        {/* 2. Exam Countdown Card (Always visible at top) */}
        <ExamCountdownCard
          countdown={plan.countdown}
          examConfig={plan.preferences.examConfig}
          targetLevel={plan.preferences.targetLevel}
          onAdjustPlanClick={() => setIsEditingPreferences(true)}
        />

        {/* 3. Segmented Navigation Tabs */}
        <div className="skeuo-paper rounded-2xl p-2 border border-[#DEDAD1] flex items-center gap-1 overflow-x-auto text-xs font-semibold shadow-2xs">
          {[
            { id: 'today', label: 'Tagesansicht', icon: Clock },
            { id: 'weekly', label: 'Wochenplan', icon: ListTodo },
            { id: 'mock', label: 'Modellprüfungen', icon: Award },
            { id: 'progress', label: 'Fortschritt', icon: PieChart },
            { id: 'print', label: 'Drucken (A4)', icon: Printer },
          ].map((tab) => {
            const isSelected = activeTab === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id as PlannerTab)}
                className={cn(
                  'px-3.5 py-2.5 rounded-xl flex items-center gap-2 transition-all whitespace-nowrap',
                  isSelected
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#6B6760] hover:text-[#171717] hover:bg-[#EFECE6]/60'
                )}
              >
                <Icon className={cn('w-4 h-4', isSelected ? 'text-[#D7B95D]' : 'text-[#89857E]')} />
                <span>{tab.label}</span>
              </button>
            )
          })}

          <div className="ml-auto pr-1">
            <button
              type="button"
              onClick={() => setIsEditingPreferences(true)}
              className="px-3 py-2 rounded-xl text-[#89857E] hover:text-[#171717] hover:bg-[#EFECE6]/60 flex items-center gap-1.5 transition-all text-xs"
              title="Plan anpassen oder neu berechnen"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Konfiguration</span>
            </button>
          </div>
        </div>

        {/* 4. Active Tab Content */}
        {activeTab === 'today' && (
          <DailyFocusSession
            plan={plan}
            onToggleComplete={toggleTaskComplete}
            timerState={timerState}
            onStartTimer={startTimer}
            onPauseTimer={pauseTimer}
            onResumeTimer={resumeTimer}
            onResetTimer={resetTimer}
          />
        )}

        {activeTab === 'weekly' && (
          <WeeklyTimetable
            plan={plan}
            onToggleComplete={toggleTaskComplete}
            onSkip={skipTask}
            onRestore={restoreTask}
            onReschedule={rescheduleTask}
            onEditDuration={editTaskDuration}
            onAddCustomTask={addCustomTask}
            onDeleteCustomTask={deleteCustomTask}
            onStartInTimer={(t) => {
              startTimer(t.duration * 60, t.id)
              handleTabChange('today')
            }}
          />
        )}

        {activeTab === 'mock' && (
          <MockExamPlanner
            plan={plan}
            onRecordScores={recordMockExamScores}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            plan={plan}
            onResetPlan={resetPlan}
            onImportPlan={importPlan}
          />
        )}
      </div>
    </div>
  )
}
