import { StudyPlan } from '../types/studyPlanner.types'

export const STUDY_PLANNER_STORAGE_KEY = 'd9w-study-planner-v1'

/**
 * Validates whether an unknown object fits the required StudyPlan shape.
 */
export function isValidStudyPlan(obj: unknown): obj is StudyPlan {
  if (!obj || typeof obj !== 'object') return false
  const p = obj as Record<string, unknown>
  return (
    typeof p.id === 'string' &&
    typeof p.version === 'string' &&
    typeof p.preferences === 'object' &&
    p.preferences !== null &&
    Array.isArray(p.tasks) &&
    typeof p.countdown === 'object' &&
    typeof p.progress === 'object'
  )
}

/**
 * Safely loads the study plan from LocalStorage.
 */
export function loadSavedStudyPlan(): StudyPlan | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STUDY_PLANNER_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (isValidStudyPlan(parsed)) {
      return parsed
    }
    console.warn('Stored study plan failed schema validation:', parsed)
    return null
  } catch (err) {
    console.error('Error loading study plan from LocalStorage:', err)
    return null
  }
}

/**
 * Safely saves the study plan to LocalStorage.
 */
export function saveStudyPlan(plan: StudyPlan): boolean {
  if (typeof window === 'undefined') return false
  try {
    const serialized = JSON.stringify(plan)
    window.localStorage.setItem(STUDY_PLANNER_STORAGE_KEY, serialized)
    return true
  } catch (err) {
    console.error('Error saving study plan to LocalStorage:', err)
    return false
  }
}

/**
 * Clears the study plan from LocalStorage.
 */
export function clearSavedStudyPlan(): boolean {
  if (typeof window === 'undefined') return false
  try {
    window.localStorage.removeItem(STUDY_PLANNER_STORAGE_KEY)
    return true
  } catch (err) {
    console.error('Error clearing study plan from LocalStorage:', err)
    return false
  }
}

/**
 * Exports plan as a downloadable JSON file.
 */
export function exportStudyPlanToFile(plan: StudyPlan): void {
  try {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(plan, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    const dateStr = new Date().toISOString().split('T')[0]
    downloadAnchor.setAttribute('download', `d9w-study-plan-${plan.preferences.targetLevel}-${dateStr}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  } catch (err) {
    console.error('Failed to export study plan:', err)
  }
}
