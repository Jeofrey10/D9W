import { CefrLevel } from '@/types'
import { ExamProviderId } from '@/data/study-planner/exam-options'
import { PreparationPhaseId } from '@/data/study-planner/preparation-phases'
import { AllSkills, CoreSkill } from '@/data/study-planner/skill-allocation'
import { ActivityCategory } from '@/data/study-planner/study-activities'

export type { CefrLevel }
export type { ExamProviderId }
export type { PreparationPhaseId }
export type { AllSkills, CoreSkill }
export type { ActivityCategory }

export type PreferredTimeOfDay = 'morning' | 'afternoon' | 'evening' | 'flexible'
export type StudyIntensity = 'relaxed' | 'balanced' | 'intensive'
export type CountdownStatus =
  | 'planning'
  | 'preparation'
  | 'revision'
  | 'final-preparation'
  | 'completed'

export interface ExamConfiguration {
  provider: ExamProviderId
  targetLevel: CefrLevel
  examDate: string | null // 'YYYY-MM-DD' or null if flexible
  isConfirmedDate: boolean
  isFlexibleGoal: boolean
  flexibleWeeks?: number
}

export interface StudyPreferences {
  currentLevel: CefrLevel
  targetLevel: CefrLevel
  hasDiagnosticResult: boolean
  diagnosticScore?: number
  examConfig: ExamConfiguration
  availableDays: number[] // 0=Sun, 1=Mon, ..., 6=Sat
  dailyMinutes: number
  preferredTime: PreferredTimeOfDay
  intensity: StudyIntensity
  strongestSkill: CoreSkill
  weakestSkill: CoreSkill
  additionalAttentionSkills: CoreSkill[]
  includeGrammar: boolean
  includeVocabulary: boolean
  customWeights?: Partial<Record<AllSkills, number>>
}

export interface StudyTask {
  id: string
  date: string // 'YYYY-MM-DD'
  dayOfWeek: number // 0-6
  duration: number // minutes
  category: ActivityCategory
  skill: string // 'Hören', 'Lesen', etc.
  level: CefrLevel
  title: string
  instructions: string
  completed: boolean
  completedAt?: string
  skipped: boolean
  skippedReason?: string
  rescheduled: boolean
  originalDate?: string
  isCustom: boolean
  notes?: string
  toolRoute?: string
  toolName?: string
  phase: PreparationPhaseId
  orderIndex: number
}

export interface StudyMilestone {
  id: string
  date: string
  title: string
  germanTitle: string
  type: 'phase-start' | 'mock-exam' | 'midterm-review' | 'final-review' | 'exam-day'
  description: string
  completed: boolean
  completedAt?: string
}

export interface MockExamRecord {
  id: string
  date: string
  provider: ExamProviderId
  level: CefrLevel
  title: string
  scores: {
    listening?: number
    reading?: number
    writing?: number
    speaking?: number
    total?: number
  }
  notes: string
  completed: boolean
  completedAt?: string
}

export interface ExamCountdown {
  targetDate: string | null
  daysRemaining: number
  weeksRemaining: number
  status: CountdownStatus
  isPast: boolean
  isToday: boolean
  statusLabel: string
  statusDescription: string
}

export interface WeeklySchedule {
  weekNumber: number
  startDate: string // 'YYYY-MM-DD'
  endDate: string // 'YYYY-MM-DD'
  phase: PreparationPhaseId
  phaseTitle: string
  weeklyGoal: string
  plannedMinutes: number
  completedMinutes: number
  tasks: StudyTask[]
}

export interface StudyProgress {
  totalTasks: number
  completedTasks: number
  skippedTasks: number
  plannedMinutes: number
  completedMinutes: number
  completionPercentage: number
  currentStreak: number
  lastActiveDate: string | null
  minutesBySkill: Record<string, number>
  tasksBySkill: Record<string, { total: number; completed: number }>
  consistencyDaysThisWeek: number
  targetDaysPerWeek: number
  currentPhase: PreparationPhaseId
  nextMilestone: StudyMilestone | null
}

export interface GlhEstimate {
  estimatedHoursNeeded: number
  totalPlannedHours: number
  hoursPerWeek: number
  isShortWindowWarning: boolean
  isLargeGapWarning: boolean
  warningMessage?: string
}

export interface StudyPlan {
  id: string
  version: string
  createdAt: string
  updatedAt: string
  preferences: StudyPreferences
  countdown: ExamCountdown
  glhEstimate: GlhEstimate
  phases: {
    phase: PreparationPhaseId
    name: string
    startDate: string
    endDate: string
    description: string
  }[]
  milestones: StudyMilestone[]
  tasks: StudyTask[]
  mockExams: MockExamRecord[]
  customTasks: StudyTask[]
  progress: StudyProgress
}

export interface FocusTimerState {
  isActive: boolean
  isPaused: boolean
  durationSeconds: number
  remainingSeconds: number
  associatedTaskId: string | null
  startedAt: number | null
}
