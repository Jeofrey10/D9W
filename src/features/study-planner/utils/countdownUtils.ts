import { ExamCountdown, CountdownStatus } from '../types/studyPlanner.types'

/**
 * Returns today's local date string in YYYY-MM-DD format.
 */
export function getLocalTodayDateString(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Parses a YYYY-MM-DD string into a local Date object at midnight (00:00:00).
 * Prevents UTC timezone shift issues.
 */
export function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day, 0, 0, 0, 0)
}

/**
 * Computes exact exam countdown metrics safely.
 */
export function calculateExamCountdown(
  targetDateStr: string | null,
  isFlexible: boolean = false
): ExamCountdown {
  if (!targetDateStr || isFlexible) {
    return {
      targetDate: null,
      daysRemaining: 0,
      weeksRemaining: 0,
      status: 'preparation',
      isPast: false,
      isToday: false,
      statusLabel: 'Flexibles Lernziel',
      statusDescription:
        'Individuelle Vorbereitung ohne festen Prüfungstermin. Passe dein Tempo jederzeit flexibel an.',
    }
  }

  const todayStr = getLocalTodayDateString()
  const today = parseLocalDate(todayStr)
  const target = parseLocalDate(targetDateStr)

  const diffMs = target.getTime() - today.getTime()
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return {
      targetDate: targetDateStr,
      daysRemaining: 0,
      weeksRemaining: 0,
      status: 'completed',
      isPast: true,
      isToday: false,
      statusLabel: 'Prüfungstermin vorüber',
      statusDescription:
        'Der geplante Prüfungstermin liegt in der Vergangenheit. Trage deine Prüfungsergebnisse ein oder erstelle einen neuen Plan.',
    }
  }

  if (diffDays === 0) {
    return {
      targetDate: targetDateStr,
      daysRemaining: 0,
      weeksRemaining: 0,
      status: 'final-preparation',
      isPast: false,
      isToday: true,
      statusLabel: 'Heute ist Prüfungstag!',
      statusDescription:
        'Viel Erfolg bei deiner Prüfung! Bleib ruhig, achte auf dein Zeitmanagement und vertraue auf deine Vorbereitung.',
    }
  }

  const weeksRemaining = Math.max(1, Math.round(diffDays / 7))

  let status: CountdownStatus = 'preparation'
  let statusLabel = 'Laufende Vorbereitung'
  let statusDescription = 'Systematischer Kompetenzaufbau und Wortschatztraining.'

  if (diffDays > 84) {
    // > 12 weeks
    status = 'planning'
    statusLabel = 'Fundament & Grundlagen'
    statusDescription = 'Aufbau stabiler Grammatik- und Wortschatzfundamente.'
  } else if (diffDays > 28) {
    // 4 to 12 weeks
    status = 'preparation'
    statusLabel = 'Gezielte Prüfungspraxis'
    statusDescription = 'Vertiefung typischer Prüfungsaufgaben und standardisierter Redemittel.'
  } else if (diffDays > 14) {
    // 2 to 4 weeks
    status = 'revision'
    statusLabel = 'Intensive Wiederholung & Modelltests'
    statusDescription = 'Vollständige Prüfungssimulationen und Schließen letzter Lücken.'
  } else {
    // <= 14 days
    status = 'final-preparation'
    statusLabel = 'Endspurt vor der Prüfung'
    statusDescription = 'Entspannte Wiederholung wichtiger Redemittel und mentale Vorbereitung.'
  }

  return {
    targetDate: targetDateStr,
    daysRemaining: diffDays,
    weeksRemaining,
    status,
    isPast: false,
    isToday: false,
    statusLabel,
    statusDescription,
  }
}
