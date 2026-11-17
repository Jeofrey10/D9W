import React, { useState, useMemo } from 'react'
import { StudyPlan, StudyTask } from '../../types/studyPlanner.types'
import { TaskCard } from './TaskCard'
import { AddTaskModal } from './AddTaskModal'
import { RescheduleTaskModal } from './RescheduleTaskModal'
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  List,
  Plus,
  Coffee,
  Clock,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface WeeklyTimetableProps {
  plan: StudyPlan
  onToggleComplete: (taskId: string) => void
  onSkip: (taskId: string) => void
  onRestore: (taskId: string) => void
  onReschedule: (taskId: string, newDate: string) => void
  onEditDuration: (taskId: string, newDuration: number) => void
  onAddCustomTask: (taskData: Omit<StudyTask, 'id' | 'completed' | 'skipped' | 'rescheduled' | 'isCustom' | 'orderIndex' | 'phase'>) => void
  onDeleteCustomTask: (taskId: string) => void
  onStartInTimer?: (task: StudyTask) => void
}

function computeWeekDays(weekOffset: number) {
  const today = new Date()
  const day = today.getDay()
  const mondayOffset = day === 0 ? -6 : 1 - day // Sunday is 0, Monday is 1
  const baseMonday = new Date(today)
  baseMonday.setDate(today.getDate() + mondayOffset + weekOffset * 7)

  const days: { dateStr: string; dayOfWeek: number; label: string; full: string; isToday: boolean }[] = []
  const dayLabels = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
  const dayFull = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

  const todayStr = new Date().toISOString().split('T')[0]

  for (let i = 0; i < 7; i++) {
    const d = new Date(baseMonday)
    d.setDate(baseMonday.getDate() + i)
    const dateStr = d.toISOString().split('T')[0]
    const dow = d.getDay()
    days.push({
      dateStr,
      dayOfWeek: dow,
      label: dayLabels[i],
      full: dayFull[i],
      isToday: dateStr === todayStr,
    })
  }

  return days
}

export const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({
  plan,
  onToggleComplete,
  onSkip,
  onRestore,
  onReschedule,
  onEditDuration,
  onAddCustomTask,
  onDeleteCustomTask,
  onStartInTimer,
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')
  const [weekOffset, setWeekOffset] = useState(0) // 0 = current week, 1 = next week, -1 = last week
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [rescheduleTargetTask, setRescheduleTargetTask] = useState<StudyTask | null>(null)
  const [selectedDayForAdd, setSelectedDayForAdd] = useState<string>('')

  // Calculate Monday of current target week
  const currentWeekDays = useMemo(() => computeWeekDays(weekOffset), [weekOffset])

  const weekStartDateStr = currentWeekDays[0].dateStr
  const weekEndDateStr = currentWeekDays[6].dateStr

  // Filter tasks for this week
  const weekTasks = useMemo(() => {
    return plan.tasks.filter((t) => t.date >= weekStartDateStr && t.date <= weekEndDateStr)
  }, [plan.tasks, weekStartDateStr, weekEndDateStr])

  const weekPlannedMinutes = weekTasks.reduce((sum, t) => sum + t.duration, 0)
  const weekCompletedMinutes = weekTasks
    .filter((t) => t.completed)
    .reduce((sum, t) => sum + t.duration, 0)

  return (
    <div className="space-y-6">
      {/* 1. Header Toolbar: Week Nav & View Switcher */}
      <div className="skeuo-paper rounded-2xl p-4 sm:p-5 border border-[#DEDAD1] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Week navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Vorherige Woche"
            onClick={() => setWeekOffset((prev) => prev - 1)}
            className="p-2 rounded-xl border border-[#DEDAD1] bg-white hover:bg-[#F9F8F5] text-[#171717] transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center px-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C83B32] block">
              {weekOffset === 0
                ? 'Aktuelle Woche'
                : weekOffset > 0
                  ? `In ${weekOffset} Woche(n)`
                  : `Vor ${Math.abs(weekOffset)} Woche(n)`}
            </span>
            <span className="text-sm font-bold text-[#171717]">
              {weekStartDateStr} bis {weekEndDateStr}
            </span>
          </div>

          <button
            type="button"
            aria-label="Nächste Woche"
            onClick={() => setWeekOffset((prev) => prev + 1)}
            className="p-2 rounded-xl border border-[#DEDAD1] bg-white hover:bg-[#F9F8F5] text-[#171717] transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {weekOffset !== 0 && (
            <button
              type="button"
              onClick={() => setWeekOffset(0)}
              className="text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-[#FAF8F5] border border-[#DEDAD1] hover:border-[#171717] text-[#171717]"
            >
              Heute
            </button>
          )}
        </div>

        {/* View Switcher & Add Task CTA */}
        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <div className="flex items-center p-1 rounded-xl bg-[#EFECE6] text-xs">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={cn(
                'px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all',
                viewMode === 'calendar'
                  ? 'bg-white text-[#171717] shadow-xs'
                  : 'text-[#6B6760] hover:text-[#171717]'
              )}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all',
                viewMode === 'list'
                  ? 'bg-white text-[#171717] shadow-xs'
                  : 'text-[#6B6760] hover:text-[#171717]'
              )}
            >
              <List className="w-3.5 h-3.5" />
              <span>Listenansicht</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedDayForAdd(currentWeekDays[0].dateStr)
              setIsAddModalOpen(true)
            }}
            className="px-3.5 py-2 rounded-xl bg-[#171717] hover:bg-[#2B2B2B] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Aufgabe</span>
          </button>
        </div>
      </div>

      {/* 2. Weekly Summary Bar */}
      <div className="skeuo-recessed p-3.5 rounded-xl border border-[#E5E1D8] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C83B32]" />
          <span className="font-bold text-[#171717]">
            Wochenpensum: {Math.round(weekCompletedMinutes / 6) / 10} / {Math.round(weekPlannedMinutes / 6) / 10} Stunden absolviert
          </span>
          <span className="text-[#89857E]">
            ({weekTasks.filter((t) => t.completed).length} von {weekTasks.length} Aufgaben)
          </span>
        </div>

        <div className="w-32 bg-[#DEDAD1] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#15803D] h-full rounded-full transition-all"
            style={{
              width: `${weekPlannedMinutes > 0 ? Math.min(100, Math.round((weekCompletedMinutes / weekPlannedMinutes) * 100)) : 0}%`,
            }}
          />
        </div>
      </div>

      {/* 3. View Mode: Calendar vs List */}
      {viewMode === 'calendar' ? (
        /* Calendar View: 7 columns on desktop, vertical stacked on mobile */
        <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
          {currentWeekDays.map((day) => {
            const dayTasks = weekTasks.filter((t) => t.date === day.dateStr)
            const isRestDay = !plan.preferences.availableDays.includes(day.dayOfWeek)
            const dayPlannedMin = dayTasks.reduce((acc, t) => acc + t.duration, 0)

            return (
              <div
                key={day.dateStr}
                className={cn(
                  'skeuo-paper rounded-2xl p-3 border flex flex-col justify-between min-h-[220px]',
                  day.isToday
                    ? 'border-[#C83B32] ring-1 ring-[#C83B32]/30 bg-[#FFFDF9]'
                    : 'border-[#DEDAD1] bg-white'
                )}
              >
                {/* Day Header */}
                <div className="border-b border-[#EFECE6] pb-2 mb-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-[#89857E]">
                      {day.label}
                    </span>
                    <div className="text-sm font-bold text-[#171717] flex items-center gap-1">
                      <span>{day.dateStr.slice(8)}</span>
                      {day.isToday && (
                        <span className="text-[9px] font-mono uppercase px-1 py-0.2 bg-[#C83B32] text-white rounded">
                          Heute
                        </span>
                      )}
                    </div>
                  </div>

                  {dayPlannedMin > 0 && (
                    <span className="text-[10px] font-mono text-[#89857E]">
                      {dayPlannedMin}m
                    </span>
                  )}
                </div>

                {/* Day Tasks or Rest Day State */}
                <div className="space-y-2 flex-1">
                  {dayTasks.length > 0 ? (
                    dayTasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onToggleComplete={onToggleComplete}
                        onSkip={onSkip}
                        onRestore={onRestore}
                        onOpenReschedule={(t) => setRescheduleTargetTask(t)}
                        onOpenEditDuration={(t) => {
                          const next = window.prompt(`Neue Dauer für "${t.title}" in Minuten:`, String(t.duration))
                          if (next && !isNaN(Number(next))) {
                            onEditDuration(t.id, Number(next))
                          }
                        }}
                        onDeleteCustom={onDeleteCustomTask}
                        onStartInTimer={onStartInTimer}
                      />
                    ))
                  ) : isRestDay ? (
                    <div className="h-full flex flex-col items-center justify-center p-3 text-center text-[#89857E] rounded-xl bg-[#FAF8F5] border border-dashed border-[#E5E1D8]">
                      <Coffee className="w-5 h-5 mb-1 text-[#89857E]" />
                      <span className="text-[11px] font-bold text-[#6B6760]">Ruhetag</span>
                      <span className="text-[10px] text-[#89857E] mt-0.5">Erholung & Regeneration</span>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-3 text-center text-[#89857E] rounded-xl bg-[#FAF8F5] border border-dashed border-[#E5E1D8]">
                      <span className="text-[11px] text-[#6B6760]">Keine Einheiten</span>
                    </div>
                  )}
                </div>

                {/* Add task quick button at bottom of day */}
                <div className="pt-2 mt-2 border-t border-[#EFECE6]/50">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDayForAdd(day.dateStr)
                      setIsAddModalOpen(true)
                    }}
                    className="w-full py-1 text-[10px] font-semibold text-[#89857E] hover:text-[#171717] hover:bg-[#F9F8F5] rounded transition-all flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Aufgabe hinzufügen
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        /* List View */
        <div className="skeuo-paper rounded-2xl p-5 border border-[#DEDAD1] space-y-4">
          {weekTasks.length > 0 ? (
            <div className="space-y-3">
              {weekTasks.map((task) => (
                <div key={task.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-[#E5E1D8] bg-white">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-[#89857E] block">
                      {task.date} • {task.skill} ({task.duration} Min.)
                    </span>
                    <span className={cn('text-sm font-bold block', task.completed ? 'line-through text-[#89857E]' : 'text-[#171717]')}>
                      {task.title}
                    </span>
                    <span className="text-xs text-[#5A5751] block">{task.instructions}</span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => onToggleComplete(task.id)}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
                        task.completed
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-white text-[#171717] border-[#DEDAD1] hover:bg-[#F9F8F5]'
                      )}
                    >
                      {task.completed ? '✓ Erledigt' : 'Erledigen'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-xs text-[#89857E]">
              Keine Lerneinheiten in dieser Woche geplant.
            </div>
          )}
        </div>
      )}

      {/* 4. Modals */}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        defaultDate={selectedDayForAdd || currentWeekDays[0].dateStr}
        currentLevel={plan.preferences.targetLevel}
        onAdd={(taskData) => {
          onAddCustomTask({
            ...taskData,
            notes: '',
            toolRoute: undefined,
            toolName: undefined,
          })
        }}
      />

      <RescheduleTaskModal
        task={rescheduleTargetTask}
        isOpen={!!rescheduleTargetTask}
        onClose={() => setRescheduleTargetTask(null)}
        onReschedule={onReschedule}
      />
    </div>
  )
}
