import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { StudyTask } from '../../types/studyPlanner.types'
import {
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  MoreVertical,
  Calendar,
  RotateCcw,
  Trash2,
  Edit2,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface TaskCardProps {
  task: StudyTask
  onToggleComplete: (taskId: string) => void
  onSkip: (taskId: string) => void
  onRestore: (taskId: string) => void
  onOpenReschedule: (task: StudyTask) => void
  onOpenEditDuration: (task: StudyTask) => void
  onDeleteCustom?: (taskId: string) => void
  onStartInTimer?: (task: StudyTask) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleComplete,
  onSkip,
  onRestore,
  onOpenReschedule,
  onOpenEditDuration,
  onDeleteCustom,
  onStartInTimer,
}) => {
  const [showMenu, setShowMenu] = useState(false)

  const getCategoryStyles = () => {
    switch (task.category) {
      case 'listening':
        return { bg: 'bg-blue-50 text-blue-800 border-blue-200', dot: 'bg-blue-600' }
      case 'reading':
        return { bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-600' }
      case 'writing':
        return { bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-600' }
      case 'speaking':
        return { bg: 'bg-rose-50 text-rose-800 border-rose-200', dot: 'bg-rose-600' }
      case 'grammar':
        return { bg: 'bg-slate-100 text-slate-800 border-slate-300', dot: 'bg-slate-600' }
      case 'vocabulary':
        return { bg: 'bg-yellow-50 text-yellow-800 border-yellow-200', dot: 'bg-yellow-600' }
      case 'mock-exam':
        return { bg: 'bg-purple-50 text-purple-800 border-purple-200', dot: 'bg-purple-600' }
      default:
        return { bg: 'bg-gray-50 text-gray-800 border-gray-200', dot: 'bg-gray-600' }
    }
  }

  const catStyle = getCategoryStyles()

  return (
    <div
      className={cn(
        'skeuo-card p-4 rounded-xl border transition-all text-xs relative flex flex-col justify-between space-y-3',
        task.completed
          ? 'bg-[#F9F8F5] border-[#DEDAD1] opacity-80'
          : task.skipped
            ? 'bg-[#F5F4F0] border-[#E5E1D8] opacity-60'
            : 'bg-white border-[#DEDAD1] hover:border-[#171717] shadow-sm'
      )}
    >
      {/* 1. Header Badges & Actions */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border flex items-center gap-1',
              catStyle.bg
            )}
          >
            <span className={cn('w-1.5 h-1.5 rounded-full', catStyle.dot)} />
            {task.skill}
          </span>

          <span className="text-[10px] font-mono text-[#89857E] flex items-center gap-1 bg-[#F5F4F0] px-1.5 py-0.5 rounded">
            <Clock className="w-2.5 h-2.5" />
            {task.duration}m
          </span>

          {task.rescheduled && (
            <span className="text-[9px] font-mono text-amber-700 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
              Verschoben
            </span>
          )}

          {task.isCustom && (
            <span className="text-[9px] font-mono text-purple-700 bg-purple-50 px-1 py-0.5 rounded border border-purple-200">
              Eigene Aufgabe
            </span>
          )}
        </div>

        {/* Action Menu Toggle */}
        <div className="relative">
          <button
            type="button"
            aria-label="Aufgabenoptionen"
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded hover:bg-[#EFECE6] text-[#89857E] transition-all"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-6 z-30 w-44 rounded-xl bg-white border border-[#DEDAD1] shadow-lg py-1 text-xs">
                {task.skipped ? (
                  <button
                    type="button"
                    onClick={() => {
                      onRestore(task.id)
                      setShowMenu(false)
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#F9F8F5] flex items-center gap-2 text-[#171717]"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#C83B32]" />
                    Wieder aktivieren
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onSkip(task.id)
                      setShowMenu(false)
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#F9F8F5] flex items-center gap-2 text-[#171717]"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-[#89857E]" />
                    Überspringen
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onOpenReschedule(task)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#F9F8F5] flex items-center gap-2 text-[#171717]"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#89857E]" />
                  Verschieben
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onOpenEditDuration(task)
                    setShowMenu(false)
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#F9F8F5] flex items-center gap-2 text-[#171717]"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#89857E]" />
                  Dauer anpassen
                </button>

                {onStartInTimer && !task.completed && (
                  <button
                    type="button"
                    onClick={() => {
                      onStartInTimer(task)
                      setShowMenu(false)
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#F9F8F5] flex items-center gap-2 text-[#C83B32] font-semibold"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    Im Timer starten
                  </button>
                )}

                {task.isCustom && onDeleteCustom && (
                  <button
                    type="button"
                    onClick={() => {
                      onDeleteCustom(task.id)
                      setShowMenu(false)
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-red-50 flex items-center gap-2 text-red-600 border-t border-[#EFECE6]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Löschen
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 2. Title & Instructions */}
      <div className="space-y-1">
        <h4
          className={cn(
            'font-bold text-sm leading-snug',
            task.completed ? 'line-through text-[#89857E]' : 'text-[#171717]'
          )}
        >
          {task.title}
        </h4>
        <p className="text-[#5A5751] text-[11px] leading-relaxed line-clamp-3">
          {task.instructions}
        </p>
      </div>

      {/* 3. Footer: Checkbox & Tool Route */}
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
          ) : task.skipped ? (
            <span className="text-[#89857E] italic">Übersprungen</span>
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
            className="text-[11px] font-mono font-bold text-[#C83B32] hover:text-[#A82B24] flex items-center gap-1 hover:underline shrink-0"
          >
            <span>{task.toolName || 'Modul öffnen'}</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  )
}
