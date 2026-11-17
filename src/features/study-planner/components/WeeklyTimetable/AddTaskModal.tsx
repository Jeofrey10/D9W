import React, { useState } from 'react'
import { CefrLevel } from '@/types'
import { ActivityCategory } from '@/data/study-planner/study-activities'
import { X, Plus } from 'lucide-react'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (taskData: {
    title: string
    instructions: string
    category: ActivityCategory
    skill: string
    level: CefrLevel
    duration: number
    date: string
    dayOfWeek: number
  }) => void
  defaultDate: string
  currentLevel: CefrLevel
}

export const AddTaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  defaultDate,
  currentLevel,
}) => {
  const [title, setTitle] = useState('')
  const [instructions, setInstructions] = useState('')
  const [category, setCategory] = useState<ActivityCategory>('grammar')
  const [skill, setSkill] = useState('Grammatik')
  const [duration, setDuration] = useState(30)
  const [date, setDate] = useState(defaultDate)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const dayOfWeek = new Date(date + 'T00:00:00').getDay()

    onAdd({
      title: title.trim(),
      instructions: instructions.trim() || 'Individuelle Lerneinheit.',
      category,
      skill,
      level: currentLevel,
      duration,
      date,
      dayOfWeek,
    })

    setTitle('')
    setInstructions('')
    onClose()
  }

  const handleCategoryChange = (cat: ActivityCategory) => {
    setCategory(cat)
    const skillMap: Record<ActivityCategory, string> = {
      listening: 'Hören',
      reading: 'Lesen',
      writing: 'Schreiben',
      speaking: 'Sprechen',
      grammar: 'Grammatik',
      vocabulary: 'Wortschatz',
      'mock-exam': 'Prüfungssimulation',
      revision: 'Wiederholung',
    }
    setSkill(skillMap[cat] || 'Sonstiges')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="skeuo-paper w-full max-w-lg rounded-2xl p-6 border border-[#DEDAD1] shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Eigene Aufgabe
            </span>
            <h3 className="text-lg font-serif font-bold text-[#171717]">
              Lerneinheit hinzufügen
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

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#171717] mb-1">
              Titel der Aufgabe *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="z.B. Vokabelliste Kapitel 4 wiederholen"
              className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-[#171717] mb-1">
                Kategorie & Fertigkeit
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as ActivityCategory)}
                className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
              >
                <option value="grammar">Grammatik</option>
                <option value="vocabulary">Wortschatz</option>
                <option value="listening">Hörverstehen</option>
                <option value="reading">Leseverstehen</option>
                <option value="writing">Schriftlicher Ausdruck</option>
                <option value="speaking">Mündlicher Ausdruck</option>
                <option value="revision">Wiederholung</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-[#171717] mb-1">
                Dauer (Minuten)
              </label>
              <input
                type="number"
                min={5}
                max={240}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#171717] mb-1">
              Datum
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#171717] mb-1">
              Hinweise / Notizen (Optional)
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Welche Seiten, welches Thema oder welche Übungen..."
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
              className="px-4 py-2 rounded-lg bg-[#C83B32] hover:bg-[#A82B24] text-white font-semibold flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Aufgabe speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
