import React from 'react'
import { StudyTask } from '../../types/studyPlanner.types'
import { AlertCircle } from 'lucide-react'

interface MissedTaskBannerProps {
  overdueTasks: StudyTask[]
  onMoveToNextDays: () => void
  onSkipAll: () => void
}

export const MissedTaskBanner: React.FC<MissedTaskBannerProps> = ({
  overdueTasks,
  onMoveToNextDays,
  onSkipAll,
}) => {
  if (overdueTasks.length === 0) return null

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-300/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold text-amber-950 block">
            {overdueTasks.length} verpasste Lerneinheit(en) erkannt
          </span>
          <p className="text-amber-800 leading-relaxed">
            Aufgaben aus vergangenen Tagen wurden weder als erledigt noch als übersprungen markiert. Du kannst sie automatisch auf deine nächsten Lerntage verteilen lassen.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <button
          type="button"
          onClick={onSkipAll}
          className="px-3 py-1.5 rounded-lg border border-amber-300 hover:bg-amber-100/70 text-xs font-semibold text-amber-900 transition-all"
        >
          Alle als übersprungen markieren
        </button>

        <button
          type="button"
          onClick={onMoveToNextDays}
          className="px-3.5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-2xs"
        >
          <span>Auf Folgetage verteilen</span>
        </button>
      </div>
    </div>
  )
}
