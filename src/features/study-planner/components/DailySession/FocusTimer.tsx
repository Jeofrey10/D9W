import React, { useState } from 'react'
import { FocusTimerState } from '../../types/studyPlanner.types'
import { Play, Pause, RotateCcw, Clock, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FocusTimerProps {
  timerState: FocusTimerState
  onStart: (durationSeconds: number, taskId?: string) => void
  onPause: () => void
  onResume: () => void
  onReset: () => void
  onTaskCompleted?: (taskId: string) => void
  activeTaskTitle?: string
}

export const FocusTimer: React.FC<FocusTimerProps> = ({
  timerState,
  onStart,
  onPause,
  onResume,
  onReset,
  onTaskCompleted,
  activeTaskTitle,
}) => {
  const [selectedMinutes, setSelectedMinutes] = useState(25)

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60)
    const secs = totalSecs % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  const progressPercent =
    timerState.durationSeconds > 0
      ? Math.round(((timerState.durationSeconds - timerState.remainingSeconds) / timerState.durationSeconds) * 100)
      : 0

  const isFinished = timerState.remainingSeconds === 0 && timerState.durationSeconds > 0

  return (
    <div className="skeuo-paper rounded-2xl p-5 border border-[#DEDAD1] space-y-4">
      {/* 1. Header */}
      <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C83B32]" />
          <span className="font-bold text-sm text-[#171717]">
            Fokus-Timer (Lerneinheit)
          </span>
        </div>
        {activeTaskTitle && (
          <span className="text-xs text-[#89857E] truncate max-w-[200px] font-mono">
            {activeTaskTitle}
          </span>
        )}
      </div>

      {/* 2. Timer Display & Progress Bar */}
      <div className="text-center py-2 space-y-2">
        <div className="text-4xl sm:text-5xl font-mono font-bold text-[#171717] tracking-tight">
          {formatTime(timerState.remainingSeconds)}
        </div>

        <div className="w-full bg-[#EFECE6] h-2 rounded-full overflow-hidden max-w-xs mx-auto">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isFinished ? 'bg-emerald-600' : 'bg-[#C83B32]'
            )}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {isFinished && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Klasse gemacht! Fokuszeit erfolgreich beendet.</span>
          </div>
        )}
      </div>

      {/* 3. Duration Selector (when idle) */}
      {!timerState.isActive && !timerState.isPaused && (
        <div className="flex items-center justify-center gap-2">
          {[15, 25, 30, 45].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setSelectedMinutes(m)
                onStart(m * 60, timerState.associatedTaskId || undefined)
              }}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                selectedMinutes === m
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
              )}
            >
              {m} Min
            </button>
          ))}
        </div>
      )}

      {/* 4. Controls */}
      <div className="flex items-center justify-center gap-3 pt-1">
        {!timerState.isActive && !timerState.isPaused ? (
          <button
            type="button"
            onClick={() => onStart(selectedMinutes * 60, timerState.associatedTaskId || undefined)}
            className="px-5 py-2.5 rounded-xl bg-[#C83B32] hover:bg-[#A82B24] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Play className="w-4 h-4" />
            <span>Fokus-Session starten</span>
          </button>
        ) : timerState.isActive && !timerState.isPaused ? (
          <button
            type="button"
            onClick={onPause}
            className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#2B2B2B] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Pause className="w-4 h-4" />
            <span>Pausieren</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onResume}
            className="px-5 py-2.5 rounded-xl bg-[#C83B32] hover:bg-[#A82B24] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Play className="w-4 h-4" />
            <span>Fortsetzen</span>
          </button>
        )}

        {(timerState.isActive || timerState.isPaused || isFinished) && (
          <button
            type="button"
            onClick={onReset}
            className="p-2.5 rounded-xl border border-[#DEDAD1] bg-white hover:bg-[#F9F8F5] text-[#89857E] hover:text-[#171717] transition-all"
            title="Zurücksetzen"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}

        {isFinished && timerState.associatedTaskId && onTaskCompleted && (
          <button
            type="button"
            onClick={() => onTaskCompleted(timerState.associatedTaskId!)}
            className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Aufgabe als erledigt markieren</span>
          </button>
        )}
      </div>
    </div>
  )
}
