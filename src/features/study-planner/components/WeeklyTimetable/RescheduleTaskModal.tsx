import React, { useState } from 'react'
import { StudyTask } from '../../types/studyPlanner.types'
import { X, Calendar } from 'lucide-react'

interface RescheduleTaskModalProps {
  task: StudyTask | null
  isOpen: boolean
  onClose: () => void
  onReschedule: (taskId: string, newDate: string) => void
}

export const RescheduleTaskModal: React.FC<RescheduleTaskModalProps> = ({
  task,
  isOpen,
  onClose,
  onReschedule,
}) => {
  const [newDate, setNewDate] = useState(task?.date || '')

  if (!isOpen || !task) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDate) return
    onReschedule(task.id, newDate)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="skeuo-paper w-full max-w-md rounded-2xl p-6 border border-[#DEDAD1] shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Terminanpassung
            </span>
            <h3 className="text-lg font-serif font-bold text-[#171717]">
              Aufgabe verschieben
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#EFECE6] text-[#89857E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-[#5A5751] space-y-1">
          <p className="font-bold text-[#171717]">{task.title}</p>
          <p>Ursprüngliches Datum: {task.date} ({task.duration} Min.)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#171717] mb-1">
              Neues Datum auswählen
            </label>
            <input
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EFECE6]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#DEDAD1] hover:bg-[#F9F8F5] text-[#171717] font-semibold"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#171717] hover:bg-[#2B2B2B] text-white font-semibold flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              Datum bestätigen
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
