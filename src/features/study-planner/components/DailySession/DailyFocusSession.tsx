import React from 'react'
import { Link } from 'react-router-dom'
import { StudyPlan, FocusTimerState } from '../../types/studyPlanner.types'
import { FocusTimer } from './FocusTimer'
import { getLocalTodayDateString } from '../../utils/countdownUtils'
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  Play,
  Coffee,
  Sparkles,
  Award,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface DailyFocusSessionProps {
  plan: StudyPlan
  onToggleComplete: (taskId: string) => void
  timerState: FocusTimerState
  onStartTimer: (durationSeconds: number, taskId?: string) => void
  onPauseTimer: () => void
  onResumeTimer: () => void
  onResetTimer: () => void
}

function getFormattedGermanDate(todayStr: string): string {
  const today = new Date(todayStr + 'T00:00:00')
  return today.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function getFormattedEnglishDate(todayStr: string): string {
  const today = new Date(todayStr + 'T00:00:00')
  return today.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const DailyFocusSession: React.FC<DailyFocusSessionProps> = ({
  plan,
  onToggleComplete,
  timerState,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onResetTimer,
}) => {
  const todayStr = getLocalTodayDateString()
  const todayDayOfWeek = new Date(todayStr + 'T00:00:00').getDay()

  const germanFormattedDate = getFormattedGermanDate(todayStr)
  const englishFormattedDate = getFormattedEnglishDate(todayStr)

  // Filter tasks for today
  const todayTasks = plan.tasks.filter((t) => t.date === todayStr)
  const isRestDay = !plan.preferences.availableDays.includes(todayDayOfWeek)

  const totalPlannedMinutes = todayTasks.reduce((sum, t) => sum + t.duration, 0)
  const completedMinutes = todayTasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.duration, 0)
  const completedCount = todayTasks.filter((t) => t.completed).length
  const remainingCount = todayTasks.length - completedCount
  const completionPercentage =
    todayTasks.length > 0 ? Math.round((completedCount / todayTasks.length) * 100) : 0

  const activeTask = plan.tasks.find((t) => t.id === timerState.associatedTaskId)

  return (
    <div className="space-y-6">
      {/* 1. Daily Progress Banner */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-7 border border-[#DEDAD1] shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Tagesansicht • Daily Study Session
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-0.5">
              {germanFormattedDate}
            </h3>
            <span className="text-xs text-[#89857E] font-medium block mt-0.5">
              {englishFormattedDate}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-[#171717] block">
                {completedMinutes} / {totalPlannedMinutes} Min.
              </span>
              <span className="text-[11px] text-[#89857E] block">
                {completedCount} von {todayTasks.length} erledigt
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-[#EFECE6] flex items-center justify-center font-bold text-xs text-[#171717] relative">
              <span>{completionPercentage}%</span>
            </div>
          </div>
        </div>

        {/* 2. Today's Motivational or Rest Status */}
        {isRestDay ? (
          <div className="skeuo-recessed p-4 rounded-xl border border-[#E5E1D8] flex items-center gap-3 bg-[#FAF8F5]">
            <Coffee className="w-6 h-6 text-[#89857E] shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-[#171717] block">
                Heute ist planmäßig ein Ruhetag
              </span>
              <p className="text-[#6B6760] mt-0.5">
                Regeneration ist entscheidend für die Festigung des Gelernten. Du kannst optional ein kurzes Wort des Tages ansehen oder neue Energie schöpfen.
              </p>
            </div>
          </div>
        ) : todayTasks.length > 0 && completionPercentage === 100 ? (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
            <Award className="w-6 h-6 text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold block">
                Ausgezeichnet! Alle heutigen Lerneinheiten abgeschlossen.
              </span>
              <p className="text-emerald-800 mt-0.5">
                Dein Tagespensum für heute ist erreicht. Deine Konsistenz zahlt sich direkt auf dein Prüfungsziel aus!
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* 3. Focus Timer & Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Today's Tasks Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-serif font-bold text-[#171717] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C83B32]" />
              Heutige Lernaufgaben ({todayTasks.length})
            </h4>
            {remainingCount > 0 && (
              <span className="text-xs font-mono text-[#89857E]">
                {remainingCount} ausstehend
              </span>
            )}
          </div>

          {todayTasks.length > 0 ? (
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    'skeuo-card p-4 rounded-xl border transition-all text-xs space-y-3',
                    task.completed
                      ? 'bg-[#F9F8F5] border-[#DEDAD1] opacity-75'
                      : 'bg-white border-[#DEDAD1] hover:border-[#171717] shadow-xs'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#FAF8F5] border border-[#E5E1D8] text-[#171717]">
                        {task.skill}
                      </span>
                      <span className="text-[10px] font-mono text-[#89857E] flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {task.duration} Min.
                      </span>
                    </div>

                    {!task.completed && (
                      <button
                        type="button"
                        onClick={() => onStartTimer(task.duration * 60, task.id)}
                        className="text-[11px] font-semibold text-[#C83B32] hover:text-[#A82B24] flex items-center gap-1 hover:underline"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Im Timer starten</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <h5
                      className={cn(
                        'font-bold text-sm leading-snug',
                        task.completed ? 'line-through text-[#89857E]' : 'text-[#171717]'
                      )}
                    >
                      {task.title}
                    </h5>
                    <p className="text-[#5A5751] text-[11px] leading-relaxed mt-1">
                      {task.instructions}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#EFECE6]">
                    <button
                      type="button"
                      onClick={() => onToggleComplete(task.id)}
                      className={cn(
                        'flex items-center gap-1.5 font-semibold text-xs transition-all',
                        task.completed
                          ? 'text-emerald-700 hover:text-emerald-800'
                          : 'text-[#171717] hover:text-[#C83B32]'
                      )}
                    >
                      {task.completed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Erledigt</span>
                        </>
                      ) : (
                        <>
                          <Circle className="w-4 h-4 text-[#89857E] shrink-0" />
                          <span>Als erledigt markieren</span>
                        </>
                      )}
                    </button>

                    {task.toolRoute && !task.completed && (
                      <Link
                        to={task.toolRoute}
                        className="text-[11px] font-mono font-bold text-[#C83B32] hover:text-[#A82B24] flex items-center gap-1 hover:underline"
                      >
                        <span>{task.toolName || 'Modul starten'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="skeuo-recessed p-8 rounded-2xl border border-[#E5E1D8] text-center text-xs text-[#89857E] space-y-2">
              <Calendar className="w-8 h-8 mx-auto text-[#C8C4BA]" />
              <p className="font-semibold text-[#171717]">
                Keine Aufgaben für heute angesetzt.
              </p>
              <p>
                Nutze den Tag zum Wiederholen oder öffne den Wochenplan, um Aufgaben vorzuziehen.
              </p>
            </div>
          )}
        </div>

        {/* Right: Focus Timer (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <FocusTimer
            timerState={timerState}
            onStart={onStartTimer}
            onPause={onPauseTimer}
            onResume={onResumeTimer}
            onReset={onResetTimer}
            onTaskCompleted={onToggleComplete}
            activeTaskTitle={activeTask?.title}
          />
        </div>
      </div>
    </div>
  )
}
