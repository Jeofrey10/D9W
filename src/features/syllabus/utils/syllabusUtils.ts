import type { CefrLevel } from '@/types'
import {
  SYLLABUS_DATA,
  SyllabusDocument,
  ALL_SYLLABUS_LEVELS,
  getSyllabusPdfFilename,
} from '@/data/syllabus'

/**
 * Safely resolves a string or undefined to a valid CEFR level, defaulting to 'A1'.
 */
export function resolveCefrLevel(levelStr?: string | null): CefrLevel {
  if (!levelStr) return 'A1'
  const normalized = levelStr.toUpperCase() as CefrLevel
  return ALL_SYLLABUS_LEVELS.includes(normalized) ? normalized : 'A1'
}

/**
 * Retrieves the complete syllabus document for a given CEFR level.
 */
export function getSyllabusByLevel(level: CefrLevel): SyllabusDocument {
  return SYLLABUS_DATA[level] || SYLLABUS_DATA.A1
}

/**
 * Triggers the browser's native print/PDF generator for the selected syllabus.
 * Dynamically adjusts document.title to produce clean PDF filenames like:
 * 'D9W-German-Syllabus-A1.pdf'
 */
export function triggerSyllabusPrint(level: CefrLevel): void {
  const previousTitle = document.title
  const targetFilename = getSyllabusPdfFilename(level)

  // 1. Set dynamic title before printing
  document.title = targetFilename.replace('.pdf', '')

  // 2. Small delay to ensure title registers before system print dialog captures it
  setTimeout(() => {
    window.print()

    // 3. Restore document title after print dialog closes
    setTimeout(() => {
      document.title = previousTitle
    }, 500)
  }, 50)
}
