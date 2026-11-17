import { CefrLevel } from '@/types'
import {
  StudyPreferences,
  StudyPlan,
  StudyTask,
  StudyMilestone,
  MockExamRecord,
  GlhEstimate,
  StudyProgress,
} from '../types/studyPlanner.types'
import { calculatePhaseBoundaries, PreparationPhaseId } from '@/data/study-planner/preparation-phases'
import { calculateSkillAllocation, AllSkills } from '@/data/study-planner/skill-allocation'
import {
  STUDY_ACTIVITY_TEMPLATES,
} from '@/data/study-planner/study-activities'
import {
  calculateExamCountdown,
  getLocalTodayDateString,
  parseLocalDate,
} from './countdownUtils'

// Standard CEFR Guided Learning Hours (GLH) requirements
const LEVEL_INDEX: Record<CefrLevel, number> = {
  A1: 1,
  A2: 2,
  B1: 3,
  B2: 4,
  C1: 5,
}

const GLH_PER_STEP: Record<string, number> = {
  'A1->A1': 40,
  'A1->A2': 150,
  'A1->B1': 350,
  'A1->B2': 550,
  'A1->C1': 800,
  'A2->A2': 50,
  'A2->B1': 200,
  'A2->B2': 400,
  'A2->C1': 650,
  'B1->B1': 60,
  'B1->B2': 200,
  'B1->C1': 450,
  'B2->B2': 80,
  'B2->C1': 250,
  'C1->C1': 100,
}

export function calculateGlhEstimate(
  currentLevel: CefrLevel,
  targetLevel: CefrLevel,
  daysPerWeek: number,
  dailyMinutes: number,
  totalWeeks: number
): GlhEstimate {
  const key = `${currentLevel}->${targetLevel}`
  const estimatedHoursNeeded = GLH_PER_STEP[key] || 150

  const hoursPerWeek = (daysPerWeek * dailyMinutes) / 60
  const totalPlannedHours = Math.round(hoursPerWeek * totalWeeks)

  const levelDifference = LEVEL_INDEX[targetLevel] - LEVEL_INDEX[currentLevel]
  const isLargeGapWarning = levelDifference >= 2 && totalWeeks <= 14
  const isShortWindowWarning = totalPlannedHours < estimatedHoursNeeded * 0.45

  let warningMessage: string | undefined = undefined

  if (isLargeGapWarning) {
    warningMessage = `Großer Niveausprung (${currentLevel} → ${targetLevel}) in einem kurzen Zeitraum (${totalWeeks} Wochen). Der Lehrplan konzentriert sich intensiv auf Kernkompetenzen. Zusätzliche Übungseinheiten werden empfohlen.`
  } else if (isShortWindowWarning) {
    warningMessage = `Geplante Lernzeit (${totalPlannedHours} Std.) liegt unter dem durchschnittlichen Richtwert (${estimatedHoursNeeded} Std.) für ${currentLevel} → ${targetLevel}. Wir empfehlen eine Erhöhung der täglichen Lernzeit oder eine Verlängerung des Zeitfensters.`
  }

  return {
    estimatedHoursNeeded,
    totalPlannedHours,
    hoursPerWeek: Math.round(hoursPerWeek * 10) / 10,
    isShortWindowWarning,
    isLargeGapWarning,
    warningMessage,
  }
}

/**
 * Deterministic study schedule generator.
 */
export function generateStudyPlan(preferences: StudyPreferences): StudyPlan {
  const todayStr = getLocalTodayDateString()
  const todayDate = parseLocalDate(todayStr)

  let examDateStr = preferences.examConfig.examDate
  let totalDays = 84 // default 12 weeks if flexible

  if (preferences.examConfig.isFlexibleGoal || !examDateStr) {
    const weeks = preferences.examConfig.flexibleWeeks || 12
    totalDays = weeks * 7
    const endDate = new Date(todayDate)
    endDate.setDate(endDate.getDate() + totalDays)
    examDateStr = endDate.toISOString().split('T')[0]
  } else {
    const targetDate = parseLocalDate(examDateStr)
    const diffMs = targetDate.getTime() - todayDate.getTime()
    totalDays = Math.max(7, Math.round(diffMs / (1000 * 60 * 60 * 24)))
  }

  const totalWeeks = Math.max(1, Math.round(totalDays / 7))
  const countdown = calculateExamCountdown(
    preferences.examConfig.isFlexibleGoal ? null : examDateStr,
    preferences.examConfig.isFlexibleGoal
  )

  const glhEstimate = calculateGlhEstimate(
    preferences.currentLevel,
    preferences.targetLevel,
    preferences.availableDays.length,
    preferences.dailyMinutes,
    totalWeeks
  )

  // 1. Calculate phases
  const phases = calculatePhaseBoundaries(todayStr, totalDays)

  // 2. Skill allocations
  const skillWeights = calculateSkillAllocation({
    strongestSkill: preferences.strongestSkill,
    weakestSkill: preferences.weakestSkill,
    additionalAttentionSkills: preferences.additionalAttentionSkills,
    includeGrammar: preferences.includeGrammar,
    includeVocabulary: preferences.includeVocabulary,
    customWeights: preferences.customWeights,
  })

  // 3. Generate daily tasks
  const tasks: StudyTask[] = []
  const milestones: StudyMilestone[] = []
  const mockExams: MockExamRecord[] = []

  // Add initial milestone
  milestones.push({
    id: 'milestone-start',
    date: todayStr,
    title: 'Start of Preparation',
    germanTitle: 'Start deiner Vorbereitung',
    type: 'phase-start',
    description: `Beginn der Vorbereitung von ${preferences.currentLevel} auf ${preferences.targetLevel}.`,
    completed: true,
    completedAt: new Date().toISOString(),
  })

  // Create skill rotation pool based on weights
  const skillPool: AllSkills[] = []
  ;(Object.keys(skillWeights) as AllSkills[]).forEach((skill) => {
    const count = Math.max(1, Math.round(skillWeights[skill] / 5))
    for (let i = 0; i < count; i++) {
      skillPool.push(skill)
    }
  })

  // Helper to find activities matching level & skill
  const getActivitiesFor = (skill: AllSkills, targetLevel: CefrLevel) => {
    const matched = STUDY_ACTIVITY_TEMPLATES.filter(
      (a) => a.skill === skill && a.supportedLevels.includes(targetLevel)
    )
    return matched.length > 0
      ? matched
      : STUDY_ACTIVITY_TEMPLATES.filter((a) => a.skill === skill)
  }

  // Pre-place mock exams across weeks
  const mockExamWeekIndices = new Set<number>()
  if (totalWeeks >= 3) {
    mockExamWeekIndices.add(Math.max(1, totalWeeks - 1)) // final review mock
  } else {
    mockExamWeekIndices.add(0)
  }
  if (totalWeeks >= 6) {
    mockExamWeekIndices.add(Math.floor(totalWeeks * 0.65))
  }
  if (totalWeeks >= 10) {
    mockExamWeekIndices.add(Math.floor(totalWeeks * 0.35))
  }

  let taskCounter = 1
  let poolIndex = 0

  // Iterate every day from today until target date
  for (let d = 0; d < totalDays; d++) {
    const currentDate = new Date(todayDate)
    currentDate.setDate(currentDate.getDate() + d)
    const dateStr = currentDate.toISOString().split('T')[0]
    const dayOfWeek = currentDate.getDay() // 0=Sun, 1=Mon...
    const weekIndex = Math.floor(d / 7)

    // Determine current phase
    let currentPhase: PreparationPhaseId = 'development'
    for (const ph of phases) {
      if (dateStr >= ph.startDate && dateStr <= ph.endDate) {
        currentPhase = ph.phase
        break
      }
    }

    // Is it an available study day?
    const isAvailable = preferences.availableDays.includes(dayOfWeek)
    if (!isAvailable) {
      continue // Rest day
    }

    // Check if this study day should host a mock exam
    const isPreferredMockDay = dayOfWeek === 6 || dayOfWeek === 0 || dayOfWeek === 5
    const remainingDaysInWeek = 6 - (d % 7)
    const isMockExamDay =
      mockExamWeekIndices.has(weekIndex) &&
      (isPreferredMockDay || remainingDaysInWeek <= 1 || d === totalDays - 1)
    if (isMockExamDay) {
      mockExamWeekIndices.delete(weekIndex) // place only once per designated week

      const mockId = `mock-${dateStr}`
      mockExams.push({
        id: mockId,
        date: dateStr,
        provider: preferences.examConfig.provider,
        level: preferences.targetLevel,
        title: `Modellprüfung ${mockExams.length + 1} (${preferences.targetLevel})`,
        scores: {},
        notes: '',
        completed: false,
      })

      milestones.push({
        id: `milestone-mock-${mockExams.length}`,
        date: dateStr,
        title: `Mock Exam #${mockExams.length}`,
        germanTitle: `Modellprüfung #${mockExams.length}`,
        type: 'mock-exam',
        description: `Vollständiger Modelltest für ${preferences.examConfig.provider} ${preferences.targetLevel}.`,
        completed: false,
      })

      tasks.push({
        id: `task-${dateStr}-mock`,
        date: dateStr,
        dayOfWeek,
        duration: Math.max(60, preferences.dailyMinutes),
        category: 'mock-exam',
        skill: 'Prüfungssimulation',
        level: preferences.targetLevel,
        title: `Modellprüfung #${mockExams.length} (${preferences.examConfig.provider})`,
        instructions:
          'Führe einen vollständigen Prüfungslauf unter realistischen Zeitbedingungen durch. Notiere deine Punktzahlen in Hören, Lesen und Schreiben.',
        completed: false,
        skipped: false,
        rescheduled: false,
        isCustom: false,
        phase: currentPhase,
        orderIndex: 0,
      })

      continue
    }

    // Daily study tasks generation
    // If daily study time is >= 45 min, generate 2 focused tasks
    const shouldSplit = preferences.dailyMinutes >= 45
    const numTasks = shouldSplit ? 2 : 1
    const minutesPerTask = shouldSplit
      ? [Math.ceil(preferences.dailyMinutes * 0.55), Math.floor(preferences.dailyMinutes * 0.45)]
      : [preferences.dailyMinutes]

    for (let t = 0; t < numTasks; t++) {
      const selectedSkill = skillPool[poolIndex % skillPool.length]
      poolIndex++

      const candidateActivities = getActivitiesFor(selectedSkill, preferences.targetLevel)
      const template =
        candidateActivities[(taskCounter + t) % candidateActivities.length] ||
        STUDY_ACTIVITY_TEMPLATES[0]

      const taskSkillLabel =
        selectedSkill === 'listening'
          ? 'Hören'
          : selectedSkill === 'reading'
            ? 'Lesen'
            : selectedSkill === 'writing'
              ? 'Schreiben'
              : selectedSkill === 'speaking'
                ? 'Sprechen'
                : selectedSkill === 'grammar'
                  ? 'Grammatik'
                  : 'Wortschatz'

      tasks.push({
        id: `task-${dateStr}-${taskCounter++}`,
        date: dateStr,
        dayOfWeek,
        duration: minutesPerTask[t],
        category: template.category,
        skill: taskSkillLabel,
        level: preferences.targetLevel,
        title: template.germanTitle,
        instructions: template.instructions,
        completed: false,
        skipped: false,
        rescheduled: false,
        isCustom: false,
        toolRoute: template.toolRoute,
        toolName: template.toolName,
        phase: currentPhase,
        orderIndex: t,
      })
    }
  }

  // Final exam day milestone
  if (!preferences.examConfig.isFlexibleGoal && preferences.examConfig.examDate) {
    milestones.push({
      id: 'milestone-exam-day',
      date: preferences.examConfig.examDate,
      title: 'Examination Day',
      germanTitle: 'Offizieller Prüfungstag',
      type: 'exam-day',
      description: `${preferences.examConfig.provider} ${preferences.targetLevel} Prüfung`,
      completed: false,
    })
  }

  // Initial Progress calculation
  const totalTasks = tasks.length
  const plannedMinutes = tasks.reduce((sum, t) => sum + t.duration, 0)

  const tasksBySkill: Record<string, { total: number; completed: number }> = {}
  tasks.forEach((t) => {
    if (!tasksBySkill[t.skill]) {
      tasksBySkill[t.skill] = { total: 0, completed: 0 }
    }
    tasksBySkill[t.skill].total++
  })

  const progress: StudyProgress = {
    totalTasks,
    completedTasks: 0,
    skippedTasks: 0,
    plannedMinutes,
    completedMinutes: 0,
    completionPercentage: 0,
    currentStreak: 1,
    lastActiveDate: null,
    minutesBySkill: {},
    tasksBySkill,
    consistencyDaysThisWeek: 0,
    targetDaysPerWeek: preferences.availableDays.length,
    currentPhase: phases[0]?.phase || 'foundation',
    nextMilestone: milestones.find((m) => !m.completed) || null,
  }

  return {
    id: `plan-${Date.now()}`,
    version: '1.0',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    preferences,
    countdown,
    glhEstimate,
    phases,
    milestones,
    tasks,
    mockExams,
    customTasks: [],
    progress,
  }
}
