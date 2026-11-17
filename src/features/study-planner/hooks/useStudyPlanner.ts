import { useState, useEffect, useCallback, useMemo } from 'react'
import {
  StudyPlan,
  StudyPreferences,
  StudyTask,
  MockExamRecord,
  FocusTimerState,
} from '../types/studyPlanner.types'
import {
  loadSavedStudyPlan,
  saveStudyPlan,
  clearSavedStudyPlan,
} from '../utils/storageUtils'
import { generateStudyPlan } from '../utils/scheduleGenerator'
import { getLocalTodayDateString, calculateExamCountdown } from '../utils/countdownUtils'

export function useStudyPlanner() {
  const [plan, setPlan] = useState<StudyPlan | null>(() => loadSavedStudyPlan())
  const [timerState, setTimerState] = useState<FocusTimerState>({
    isActive: false,
    isPaused: false,
    durationSeconds: 25 * 60,
    remainingSeconds: 25 * 60,
    associatedTaskId: null,
    startedAt: null,
  })

  // Synchronize LocalStorage on plan changes
  useEffect(() => {
    if (plan) {
      saveStudyPlan(plan)
    }
  }, [plan])

  // Derive live countdown dynamically to prevent cascading render effects
  const activePlan = useMemo(() => {
    if (!plan) return null
    const targetDate = plan.preferences.examConfig.isFlexibleGoal
      ? null
      : plan.preferences.examConfig.examDate
    const updatedCountdown = calculateExamCountdown(
      targetDate,
      plan.preferences.examConfig.isFlexibleGoal
    )
    return {
      ...plan,
      countdown: updatedCountdown,
    }
  }, [plan])

  // Timer interval with wall-clock drift protection
  useEffect(() => {
    if (!timerState.isActive || timerState.isPaused) return

    const interval = setInterval(() => {
      setTimerState((prev) => {
        if (!prev.isActive || prev.isPaused) return prev
        if (prev.remainingSeconds <= 1) {
          // Timer finished
          return {
            ...prev,
            isActive: false,
            isPaused: false,
            remainingSeconds: 0,
          }
        }
        return {
          ...prev,
          remainingSeconds: prev.remainingSeconds - 1,
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerState.isActive, timerState.isPaused])

  // 1. Plan creation
  const createPlan = useCallback((preferences: StudyPreferences) => {
    const newPlan = generateStudyPlan(preferences)
    setPlan(newPlan)
    saveStudyPlan(newPlan)
    return newPlan
  }, [])

  // Helper to recompute progress stats
  const recomputeProgress = (tasks: StudyTask[], prevPlan: StudyPlan): StudyPlan['progress'] => {
    const completedTasks = tasks.filter((t) => t.completed).length
    const skippedTasks = tasks.filter((t) => t.skipped).length
    const completedMinutes = tasks
      .filter((t) => t.completed)
      .reduce((sum, t) => sum + t.duration, 0)
    const plannedMinutes = tasks.reduce((sum, t) => sum + t.duration, 0)
    const completionPercentage =
      tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0

    const minutesBySkill: Record<string, number> = {}
    const tasksBySkill: Record<string, { total: number; completed: number }> = {}

    tasks.forEach((t) => {
      if (!tasksBySkill[t.skill]) {
        tasksBySkill[t.skill] = { total: 0, completed: 0 }
      }
      tasksBySkill[t.skill].total++
      if (t.completed) {
        tasksBySkill[t.skill].completed++
        minutesBySkill[t.skill] = (minutesBySkill[t.skill] || 0) + t.duration
      }
    })

    // Calculate weekly consistency (completed tasks this current week)
    const todayStr = getLocalTodayDateString()
    const today = new Date(todayStr + 'T00:00:00')
    const dayOfWeek = today.getDay()
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    const monday = new Date(today)
    monday.setDate(monday.getDate() + mondayOffset)
    const sunday = new Date(monday)
    sunday.setDate(sunday.getDate() + 6)
    const monStr = monday.toISOString().split('T')[0]
    const sunStr = sunday.toISOString().split('T')[0]

    const completedDaysSet = new Set<string>()
    tasks.forEach((t) => {
      if (t.completed && t.date >= monStr && t.date <= sunStr) {
        completedDaysSet.add(t.date)
      }
    })

    return {
      ...prevPlan.progress,
      totalTasks: tasks.length,
      completedTasks,
      skippedTasks,
      plannedMinutes,
      completedMinutes,
      completionPercentage,
      minutesBySkill,
      tasksBySkill,
      consistencyDaysThisWeek: completedDaysSet.size,
      lastActiveDate: todayStr,
      nextMilestone: prevPlan.milestones.find((m) => !m.completed) || null,
    }
  }

  // 2. Task completion toggle
  const toggleTaskComplete = useCallback((taskId: string) => {
    setPlan((prev) => {
      if (!prev) return null
      const nowStr = new Date().toISOString()
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? nowStr : undefined,
            skipped: false,
          }
        }
        return t
      })

      const updatedProgress = recomputeProgress(updatedTasks, prev)

      return {
        ...prev,
        updatedAt: nowStr,
        tasks: updatedTasks,
        progress: updatedProgress,
      }
    })
  }, [])

  // 3. Skip task
  const skipTask = useCallback((taskId: string, reason?: string) => {
    setPlan((prev) => {
      if (!prev) return null
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            skipped: true,
            completed: false,
            skippedReason: reason || 'Übersprungen',
          }
        }
        return t
      })
      const updatedProgress = recomputeProgress(updatedTasks, prev)
      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        tasks: updatedTasks,
        progress: updatedProgress,
      }
    })
  }, [])

  // 4. Reschedule task
  const rescheduleTask = useCallback((taskId: string, newDateStr: string) => {
    setPlan((prev) => {
      if (!prev) return null
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          const newDateObj = new Date(newDateStr + 'T00:00:00')
          return {
            ...t,
            date: newDateStr,
            dayOfWeek: newDateObj.getDay(),
            rescheduled: true,
            originalDate: t.originalDate || t.date,
            skipped: false,
          }
        }
        return t
      })
      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        tasks: updatedTasks,
      }
    })
  }, [])

  // 5. Edit task duration
  const editTaskDuration = useCallback((taskId: string, newDuration: number) => {
    setPlan((prev) => {
      if (!prev) return null
      const safeDuration = Math.max(5, Math.min(240, newDuration))
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          return { ...t, duration: safeDuration }
        }
        return t
      })
      const updatedProgress = recomputeProgress(updatedTasks, prev)
      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        tasks: updatedTasks,
        progress: updatedProgress,
      }
    })
  }, [])

  // 6. Add custom task
  const addCustomTask = useCallback(
    (
      taskData: Omit<
        StudyTask,
        'id' | 'completed' | 'skipped' | 'rescheduled' | 'isCustom' | 'orderIndex' | 'phase'
      >
    ) => {
      setPlan((prev) => {
        if (!prev) return null
        const id = `custom-${Date.now()}`
        const newTask: StudyTask = {
          ...taskData,
          id,
          completed: false,
          skipped: false,
          rescheduled: false,
          isCustom: true,
          phase: prev.progress.currentPhase,
          orderIndex: 99,
        }
        const updatedTasks = [...prev.tasks, newTask]
        const updatedCustom = [...prev.customTasks, newTask]
        const updatedProgress = recomputeProgress(updatedTasks, prev)
        return {
          ...prev,
          updatedAt: new Date().toISOString(),
          tasks: updatedTasks,
          customTasks: updatedCustom,
          progress: updatedProgress,
        }
      })
    },
    []
  )

  // 7. Delete custom task
  const deleteCustomTask = useCallback((taskId: string) => {
    setPlan((prev) => {
      if (!prev) return null
      const updatedTasks = prev.tasks.filter((t) => t.id !== taskId)
      const updatedCustom = prev.customTasks.filter((t) => t.id !== taskId)
      const updatedProgress = recomputeProgress(updatedTasks, prev)
      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        tasks: updatedTasks,
        customTasks: updatedCustom,
        progress: updatedProgress,
      }
    })
  }, [])

  // 8. Restore task
  const restoreTask = useCallback((taskId: string) => {
    setPlan((prev) => {
      if (!prev) return null
      const updatedTasks = prev.tasks.map((t) => {
        if (t.id === taskId) {
          return { ...t, skipped: false, completed: false }
        }
        return t
      })
      const updatedProgress = recomputeProgress(updatedTasks, prev)
      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        tasks: updatedTasks,
        progress: updatedProgress,
      }
    })
  }, [])

  // 9. Overdue / Missed Tasks Identification
  const overdueTasks = useMemo(() => {
    if (!plan) return []
    const todayStr = getLocalTodayDateString()
    return plan.tasks.filter((t) => t.date < todayStr && !t.completed && !t.skipped)
  }, [plan])

  // Move overdue tasks into upcoming available study days
  const moveOverdueTasksToNextAvailableDays = useCallback(() => {
    setPlan((prev) => {
      if (!prev || overdueTasks.length === 0) return prev
      const todayStr = getLocalTodayDateString()
      const today = new Date(todayStr + 'T00:00:00')

      // Find upcoming available study days
      const availableDays = prev.preferences.availableDays
      const futureDates: string[] = []
      let checkDate = new Date(today)

      // Look up to 14 days ahead
      for (let i = 0; i < 14; i++) {
        if (availableDays.includes(checkDate.getDay())) {
          futureDates.push(checkDate.toISOString().split('T')[0])
        }
        checkDate.setDate(checkDate.getDate() + 1)
      }

      if (futureDates.length === 0) return prev

      const overdueIds = new Set(overdueTasks.map((t) => t.id))
      let dateIndex = 0

      const updatedTasks = prev.tasks.map((t) => {
        if (overdueIds.has(t.id)) {
          const targetDateStr = futureDates[dateIndex % futureDates.length]
          dateIndex++
          const targetDay = new Date(targetDateStr + 'T00:00:00').getDay()
          return {
            ...t,
            date: targetDateStr,
            dayOfWeek: targetDay,
            rescheduled: true,
            originalDate: t.originalDate || t.date,
          }
        }
        return t
      })

      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        tasks: updatedTasks,
      }
    })
  }, [overdueTasks])

  // Skip all overdue tasks
  const skipAllOverdueTasks = useCallback(() => {
    setPlan((prev) => {
      if (!prev || overdueTasks.length === 0) return prev
      const overdueIds = new Set(overdueTasks.map((t) => t.id))
      const updatedTasks = prev.tasks.map((t) => {
        if (overdueIds.has(t.id)) {
          return { ...t, skipped: true, skippedReason: 'Verpasste Aufgabe' }
        }
        return t
      })
      const updatedProgress = recomputeProgress(updatedTasks, prev)
      return {
        ...prev,
        updatedAt: new Date().toISOString(),
        tasks: updatedTasks,
        progress: updatedProgress,
      }
    })
  }, [overdueTasks])

  // 10. Record Mock Exam Score
  const recordMockExamScores = useCallback(
    (mockId: string, scores: MockExamRecord['scores'], notes: string) => {
      setPlan((prev) => {
        if (!prev) return null
        const updatedMocks = prev.mockExams.map((m) => {
          if (m.id === mockId) {
            return {
              ...m,
              scores,
              notes,
              completed: true,
              completedAt: new Date().toISOString(),
            }
          }
          return m
        })

        // Also mark corresponding mock task as completed
        const updatedTasks = prev.tasks.map((t) => {
          if (t.id.includes(mockId) || (t.category === 'mock-exam' && t.date === mockId.replace('mock-', ''))) {
            return { ...t, completed: true, completedAt: new Date().toISOString() }
          }
          return t
        })

        const updatedProgress = recomputeProgress(updatedTasks, prev)

        return {
          ...prev,
          updatedAt: new Date().toISOString(),
          mockExams: updatedMocks,
          tasks: updatedTasks,
          progress: updatedProgress,
        }
      })
    },
    []
  )

  // 11. Timer controls
  const startTimer = useCallback((durationSeconds: number, taskId?: string) => {
    setTimerState({
      isActive: true,
      isPaused: false,
      durationSeconds,
      remainingSeconds: durationSeconds,
      associatedTaskId: taskId || null,
      startedAt: Date.now(),
    })
  }, [])

  const pauseTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isPaused: true }))
  }, [])

  const resumeTimer = useCallback(() => {
    setTimerState((prev) => ({ ...prev, isPaused: false }))
  }, [])

  const resetTimer = useCallback(() => {
    setTimerState((prev) => ({
      ...prev,
      isActive: false,
      isPaused: false,
      remainingSeconds: prev.durationSeconds,
    }))
  }, [])

  // 12. Reset Plan
  const resetPlan = useCallback(() => {
    clearSavedStudyPlan()
    setPlan(null)
  }, [])

  // 13. Import Plan
  const importPlan = useCallback((imported: StudyPlan) => {
    setPlan(imported)
    saveStudyPlan(imported)
  }, [])

  return {
    plan: activePlan,
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
  }
}
