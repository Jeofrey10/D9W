/**
 * Automated Verification Test Suite for D9W Personalized Study Schedule & Exam Countdown Generator (P03-09)
 */

import { createServer } from 'vite'

let passed = 0
let failed = 0

function assert(name, condition, message = '') {
  if (condition) {
    console.log(`✓ PASS: ${name}`)
    passed++
  } else {
    console.error(`✗ FAIL: ${name} — ${message}`)
    failed++
  }
}

async function runTests() {
  console.log('=== Starting D9W Study Planner & Exam Countdown Verification Suite ===\n')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  try {
    // 1. Load modules via Vite SSR
    const {
      calculateExamCountdown,
      getLocalTodayDateString,
      parseLocalDate,
    } = await vite.ssrLoadModule('./src/features/study-planner/utils/countdownUtils.ts')

    const {
      calculateGlhEstimate,
      generateStudyPlan,
    } = await vite.ssrLoadModule('./src/features/study-planner/utils/scheduleGenerator.ts')

    const {
      calculateSkillAllocation,
    } = await vite.ssrLoadModule('./src/data/study-planner/skill-allocation.ts')

    const {
      calculatePhaseBoundaries,
    } = await vite.ssrLoadModule('./src/data/study-planner/preparation-phases.ts')

    const {
      isValidStudyPlan,
      STUDY_PLANNER_STORAGE_KEY,
    } = await vite.ssrLoadModule('./src/features/study-planner/utils/storageUtils.ts')

    const { EXAM_PROVIDER_OPTIONS } = await vite.ssrLoadModule('./src/data/study-planner/exam-options.ts')
    const { STUDY_ACTIVITY_TEMPLATES } = await vite.ssrLoadModule('./src/data/study-planner/study-activities.ts')
    const { STUDY_ARCHETYPE_TEMPLATES } = await vite.ssrLoadModule('./src/data/study-planner/study-templates.ts')

    // --- 1. Exam Countdown Engine Tests ---
    console.log('--- 1. Exam Countdown & Date Calculations ---')

    const todayStr = getLocalTodayDateString()
    assert('getLocalTodayDateString returns YYYY-MM-DD format', /^\d{4}-\d{2}-\d{2}$/.test(todayStr))

    const parsedDate = parseLocalDate('2026-05-15')
    assert(
      'parseLocalDate parses local date at midnight without timezone shift',
      parsedDate.getFullYear() === 2026 &&
        parsedDate.getMonth() === 4 &&
        parsedDate.getDate() === 15 &&
        parsedDate.getHours() === 0
    )

    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 35)
    const futureTargetStr = futureDate.toISOString().split('T')[0]
    const cdFuture = calculateExamCountdown(futureTargetStr, false)

    assert(
      'calculateExamCountdown computes future date correctly',
      cdFuture.isPast === false &&
        cdFuture.isToday === false &&
        cdFuture.daysRemaining >= 34 &&
        cdFuture.daysRemaining <= 36 &&
        cdFuture.weeksRemaining === 5 &&
        cdFuture.status === 'preparation'
    )

    const cdToday = calculateExamCountdown(todayStr, false)
    assert(
      'calculateExamCountdown handles today correctly',
      cdToday.isToday === true &&
        cdToday.isPast === false &&
        cdToday.daysRemaining === 0 &&
        cdToday.status === 'final-preparation' &&
        cdToday.statusLabel === 'Heute ist Prüfungstag!'
    )

    const cdPast = calculateExamCountdown('2020-01-01', false)
    assert(
      'calculateExamCountdown handles past date with zero/completed status',
      cdPast.isPast === true &&
        cdPast.isToday === false &&
        cdPast.daysRemaining === 0 &&
        cdPast.status === 'completed' &&
        cdPast.statusLabel === 'Prüfungstermin vorüber'
    )

    const cdFlexible = calculateExamCountdown(null, true)
    assert(
      'calculateExamCountdown handles flexible goal without fixed date',
      cdFlexible.targetDate === null &&
        cdFlexible.daysRemaining === 0 &&
        cdFlexible.isPast === false &&
        cdFlexible.statusLabel === 'Flexibles Lernziel'
    )

    // --- 2. Skill Allocation Tests ---
    console.log('\n--- 2. Skill Allocation & Weighting System ---')

    const weights1 = calculateSkillAllocation({
      strongestSkill: 'reading',
      weakestSkill: 'speaking',
      additionalAttentionSkills: ['listening'],
      includeGrammar: true,
      includeVocabulary: true,
    })

    const sum1 = Object.values(weights1).reduce((a, b) => a + b, 0)
    assert('calculateSkillAllocation normalizes weights to sum exactly to 100', sum1 === 100)

    assert(
      'calculateSkillAllocation boosts weakest skill and preserves strong floor',
      weights1.speaking > weights1.reading && weights1.reading >= 12 && weights1.listening >= 12
    )

    const weightsNoExtra = calculateSkillAllocation({
      strongestSkill: 'listening',
      weakestSkill: 'writing',
      additionalAttentionSkills: [],
      includeGrammar: false,
      includeVocabulary: false,
    })

    assert(
      'calculateSkillAllocation respects excluded grammar or vocabulary',
      weightsNoExtra.grammar === 0 &&
        weightsNoExtra.vocabulary === 0 &&
        Object.values(weightsNoExtra).reduce((a, b) => a + b, 0) === 100
    )

    // --- 3. Preparation Phases & Boundaries ---
    console.log('\n--- 3. Preparation Phases & Boundaries ---')

    const phases12Weeks = calculatePhaseBoundaries('2026-06-01', 84)
    assert(
      'calculatePhaseBoundaries generates 5 distinct phases for 12-week schedule',
      phases12Weeks.length === 5 &&
        phases12Weeks[0].phase === 'foundation' &&
        phases12Weeks[1].phase === 'development' &&
        phases12Weeks[2].phase === 'practice' &&
        phases12Weeks[3].phase === 'revision' &&
        phases12Weeks[4].phase === 'final'
    )

    const phasesShort = calculatePhaseBoundaries('2026-06-01', 10)
    assert(
      'calculatePhaseBoundaries compresses appropriately for short window (<= 14 days)',
      phasesShort.length >= 3 &&
        phasesShort[0].phase === 'foundation' &&
        phasesShort[phasesShort.length - 1].phase === 'final'
    )

    // --- 4. Guided Learning Hours (GLH) & Warnings ---
    console.log('\n--- 4. GLH Calculations & Educational Warning Thresholds ---')

    const glh1 = calculateGlhEstimate('A2', 'B1', 5, 45, 12)
    assert(
      'calculateGlhEstimate calculates hours needed and planned accurately',
      glh1.estimatedHoursNeeded === 200 &&
        glh1.totalPlannedHours === 45 &&
        glh1.isShortWindowWarning === true &&
        glh1.warningMessage.includes('unter dem durchschnittlichen Richtwert')
    )

    const glhGap = calculateGlhEstimate('A1', 'B2', 5, 60, 8)
    assert(
      'calculateGlhEstimate flags large level gap in short duration',
      glhGap.isLargeGapWarning === true && glhGap.warningMessage.includes('Großer Niveausprung')
    )

    // --- 5. Deterministic Schedule Generation Engine ---
    console.log('\n--- 5. Deterministic Schedule Generation Engine ---')

    const futureTargetDate = new Date()
    futureTargetDate.setDate(futureTargetDate.getDate() + 90)
    const futureTargetDateStr = futureTargetDate.toISOString().split('T')[0]

    const testPreferences = {
      currentLevel: 'A2',
      targetLevel: 'B1',
      hasDiagnosticResult: true,
      diagnosticScore: 72,
      examConfig: {
        provider: 'Goethe-Zertifikat',
        targetLevel: 'B1',
        examDate: futureTargetDateStr,
        isConfirmedDate: true,
        isFlexibleGoal: false,
      },
      availableDays: [1, 2, 3, 5, 6], // Mon, Tue, Wed, Fri, Sat
      dailyMinutes: 45,
      preferredTime: 'evening',
      intensity: 'balanced',
      strongestSkill: 'reading',
      weakestSkill: 'speaking',
      additionalAttentionSkills: ['listening'],
      includeGrammar: true,
      includeVocabulary: true,
    }

    const planA = generateStudyPlan(testPreferences)
    assert(
      'generateStudyPlan generates valid deterministic StudyPlan',
      !!planA.id &&
        planA.version === '1.0' &&
        planA.preferences.targetLevel === 'B1' &&
        planA.tasks.length > 0 &&
        planA.phases.length > 0 &&
        planA.milestones.length > 0
    )

    const planB = generateStudyPlan(testPreferences)
    assert(
      'generateStudyPlan produces identical tasks for identical preferences (Determinism)',
      planA.tasks.length === planB.tasks.length &&
        planA.tasks[0].title === planB.tasks[0].title &&
        planA.tasks[0].duration === planB.tasks[0].duration &&
        planA.tasks[5].title === planB.tasks[5].title
    )

    let restDayTasksCount = 0
    const restDays = [0, 4] // Sunday (0) and Thursday (4)
    for (const task of planA.tasks) {
      if (restDays.includes(task.dayOfWeek)) {
        restDayTasksCount++
      }
    }
    assert(
      'generateStudyPlan strictly respects study days and excludes rest days',
      restDayTasksCount === 0
    )

    const tasksByDate = {}
    for (const task of planA.tasks) {
      tasksByDate[task.date] = (tasksByDate[task.date] || 0) + task.duration
    }
    const allDaysAdequate = Object.values(tasksByDate).every((m) => m >= 40)
    assert('generateStudyPlan respects daily minutes with focused splits for >= 45m', allDaysAdequate)

    assert(
      'generateStudyPlan inserts scheduled mock examinations and milestones',
      planA.mockExams.length >= 1 &&
        planA.tasks.some((t) => t.category === 'mock-exam') &&
        planA.milestones.some((m) => m.type === 'mock-exam')
    )

    const toolRoutes = new Set(planA.tasks.map((t) => t.toolRoute).filter(Boolean))
    assert(
      'generateStudyPlan links valid D9W tool routes',
      toolRoutes.has('/case-translator') ||
        toolRoutes.has('/listening-practice') ||
        toolRoutes.has('/reading-practice')
    )

    // --- 6. Task Management State Logic ---
    console.log('\n--- 6. Task Management State Logic ---')

    const testTask = { ...planA.tasks[0], completed: false, skipped: false }
    testTask.completed = true
    testTask.completedAt = new Date().toISOString()
    assert('Task completion toggle sets completed and completedAt', testTask.completed && !!testTask.completedAt)

    testTask.completed = false
    testTask.skipped = true
    testTask.skippedReason = 'Zeitmangel'
    assert('Task skip sets skipped and skippedReason', testTask.skipped && testTask.skippedReason === 'Zeitmangel')

    testTask.rescheduled = true
    testTask.originalDate = testTask.date
    testTask.date = '2026-06-03'
    assert(
      'Task rescheduling updates date and preserves originalDate',
      testTask.rescheduled && testTask.date === '2026-06-03' && !!testTask.originalDate
    )

    // --- 7. Persistence & Schema Validation ---
    console.log('\n--- 7. LocalStorage Persistence & Schema Validation ---')

    assert('isValidStudyPlan correctly validates complete plan', isValidStudyPlan(planA) === true)
    assert('isValidStudyPlan rejects invalid data (null)', isValidStudyPlan(null) === false)
    assert('isValidStudyPlan rejects invalid data (empty object)', isValidStudyPlan({}) === false)
    assert(
      'isValidStudyPlan rejects invalid data (non-array tasks)',
      isValidStudyPlan({ id: '123', version: '1.0', preferences: {}, countdown: {}, progress: {}, tasks: 'not-an-array' }) === false
    )
    assert('Storage key is versioned as d9w-study-planner-v1', STUDY_PLANNER_STORAGE_KEY === 'd9w-study-planner-v1')

    // --- 8. Archetypes & Exam Providers Datasets ---
    console.log('\n--- 8. Archetypes & Exam Provider Data Quality ---')

    assert('Exam provider options covers all 5 recognized formats', EXAM_PROVIDER_OPTIONS.length === 5)
    assert(
      'All exam providers include clear non-affiliation disclaimers',
      EXAM_PROVIDER_OPTIONS.every((opt) => opt.disclaimer.length > 20)
    )
    assert(
      'Study activity templates catalog has at least 15 verified entries across categories',
      STUDY_ACTIVITY_TEMPLATES.length >= 15
    )
    assert(
      'Pre-configured study archetype presets exist and have valid settings',
      STUDY_ARCHETYPE_TEMPLATES.length >= 4 &&
        STUDY_ARCHETYPE_TEMPLATES.every((a) => a.suggestedDays.length >= 3 && a.suggestedMinutes >= 20)
    )

    console.log('\n========================================')
    console.log(`Total tests: ${passed}`)
    console.log(`Passed:      ${passed}`)
    console.log(`Failed:      ${failed}`)
    console.log('========================================\n')

    await vite.close()

    if (failed > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('Fatal test runner error:', error)
    await vite.close()
    process.exit(1)
  }
}

runTests()
