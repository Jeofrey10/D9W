import React, { useState } from 'react'
import {
  PreferredTimeOfDay,
  StudyIntensity,
} from '../../types/studyPlanner.types'
import { Clock, CalendarDays, Moon, Sun, Sunrise, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

interface WizardStep3Props {
  availableDays: number[]
  dailyMinutes: number
  preferredTime: PreferredTimeOfDay
  intensity: StudyIntensity
  onAvailableDaysChange: (days: number[]) => void
  onDailyMinutesChange: (mins: number) => void
  onPreferredTimeChange: (time: PreferredTimeOfDay) => void
  onIntensityChange: (intensity: StudyIntensity) => void
}

const DAYS_OF_WEEK = [
  { day: 1, label: 'Mo', full: 'Montag' },
  { day: 2, label: 'Di', full: 'Dienstag' },
  { day: 3, label: 'Mi', full: 'Mittwoch' },
  { day: 4, label: 'Do', full: 'Donnerstag' },
  { day: 5, label: 'Fr', full: 'Freitag' },
  { day: 6, label: 'Sa', full: 'Samstag' },
  { day: 0, label: 'So', full: 'Sonntag' },
]

const STANDARD_MINUTES = [15, 30, 45, 60, 90]

export const WizardStep3Availability: React.FC<WizardStep3Props> = ({
  availableDays,
  dailyMinutes,
  preferredTime,
  intensity,
  onAvailableDaysChange,
  onDailyMinutesChange,
  onPreferredTimeChange,
  onIntensityChange,
}) => {
  const [isCustomMin, setIsCustomMin] = useState(!STANDARD_MINUTES.includes(dailyMinutes))

  const toggleDay = (day: number) => {
    if (availableDays.includes(day)) {
      if (availableDays.length === 1) return // Keep at least one study day
      onAvailableDaysChange(availableDays.filter((d) => d !== day))
    } else {
      onAvailableDaysChange([...availableDays, day].sort())
    }
  }

  const restDays = DAYS_OF_WEEK.filter((d) => !availableDays.includes(d.day))

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header */}
      <div className="border-b border-[#EFECE6] pb-4">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
          Schritt 03 von 05 • Verfügbarkeit & Rhythmus
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
          Lernzeiten, Wochentage & Intensität
        </h3>
        <p className="text-sm text-[#5A5751] mt-1">
          Definiere, an welchen Tagen und wie viele Minuten du pro Einheit konzentriert lernen kannst.
        </p>
      </div>

      {/* 2. Study Days Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717] flex items-center gap-1.5">
            <CalendarDays className="w-3.5 h-3.5 text-[#C83B32]" />
            Verfügbare Lerntage (Montag–Sonntag)
          </label>
          <span className="text-xs font-semibold text-[#89857E]">
            {availableDays.length} von 7 Tagen aktiv
          </span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
          {DAYS_OF_WEEK.map((d) => {
            const isSelected = availableDays.includes(d.day)
            return (
              <button
                key={d.day}
                type="button"
                onClick={() => toggleDay(d.day)}
                className={cn(
                  'py-3 sm:py-4 px-1 rounded-xl text-center border transition-all text-xs flex flex-col items-center justify-center',
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717] shadow-sm'
                    : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <span className="font-bold text-sm sm:text-base block">{d.label}</span>
                <span className={cn('text-[10px] hidden sm:block mt-0.5', isSelected ? 'text-gray-300' : 'text-[#89857E]')}>
                  {d.full}
                </span>
                <span className={cn('text-[9px] font-mono mt-1', isSelected ? 'text-[#D7B95D]' : 'text-transparent')}>
                  ●
                </span>
              </button>
            )
          })}
        </div>
        {restDays.length > 0 && (
          <p className="text-[11px] text-[#6B6760] italic">
            Geplante Ruhetage: {restDays.map((r) => r.full).join(', ')}
          </p>
        )}
      </div>

      {/* 3. Daily Duration */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717] flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#C83B32]" />
          Verfügbare Lernzeit pro Tag
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {STANDARD_MINUTES.map((mins) => {
            const isSelected = !isCustomMin && dailyMinutes === mins
            return (
              <button
                key={mins}
                type="button"
                onClick={() => {
                  setIsCustomMin(false)
                  onDailyMinutesChange(mins)
                }}
                className={cn(
                  'py-3 px-2 rounded-xl text-center border transition-all text-xs font-semibold',
                  isSelected
                    ? 'bg-[#C83B32] text-white border-[#C83B32] shadow-sm'
                    : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <span className="block text-sm font-bold">{mins} Min</span>
                <span className={cn('text-[10px] block mt-0.5', isSelected ? 'text-red-100' : 'text-[#89857E]')}>
                  {mins === 15 ? 'Bisschen' : mins === 45 ? 'Ausgewogen' : mins >= 60 ? 'Intensiv' : 'Standard'}
                </span>
              </button>
            )
          })}
          <button
            type="button"
            onClick={() => setIsCustomMin(true)}
            className={cn(
              'py-3 px-2 rounded-xl text-center border transition-all text-xs font-semibold',
              isCustomMin
                ? 'bg-[#171717] text-white border-[#171717]'
                : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
            )}
          >
            <span className="block text-sm font-bold">Individuell</span>
            <span className={cn('text-[10px] block mt-0.5', isCustomMin ? 'text-gray-300' : 'text-[#89857E]')}>
              Freie Eingabe
            </span>
          </button>
        </div>

        {isCustomMin && (
          <div className="pt-2 flex items-center gap-3">
            <input
              type="range"
              min={10}
              max={180}
              step={5}
              value={dailyMinutes}
              onChange={(e) => onDailyMinutesChange(Number(e.target.value))}
              className="flex-1 accent-[#C83B32]"
            />
            <span className="font-mono font-bold text-sm text-[#171717] w-16 text-right">
              {dailyMinutes} Min
            </span>
          </div>
        )}
      </div>

      {/* 4. Preferred Time of Day */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717]">
          Bevorzugte Tageszeit
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'morning', label: 'Morgens', desc: 'Vor der Arbeit / Uni', icon: Sunrise },
            { id: 'afternoon', label: 'Nachmittags', desc: 'Nachmittagspause', icon: Sun },
            { id: 'evening', label: 'Abends', desc: 'Am Feierabend', icon: Moon },
            { id: 'flexible', label: 'Flexibel', desc: 'Je nach Tag', icon: Compass },
          ].map((t) => {
            const isSelected = preferredTime === t.id
            const Icon = t.icon
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onPreferredTimeChange(t.id as PreferredTimeOfDay)}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all text-xs flex items-center gap-2.5',
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717]'
                    : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <Icon className={cn('w-4 h-4 shrink-0', isSelected ? 'text-[#D7B95D]' : 'text-[#C83B32]')} />
                <div>
                  <span className="font-bold block">{t.label}</span>
                  <span className={cn('text-[10px] block', isSelected ? 'text-gray-300' : 'text-[#89857E]')}>
                    {t.desc}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. Study Intensity */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider font-bold text-[#171717]">
          Lernintensität (Study Intensity)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: 'relaxed',
              title: 'Entspannt (Relaxed)',
              desc: 'Fokus auf Konsistenz, mehr Wiederholungen, keine Überlastung.',
            },
            {
              id: 'balanced',
              title: 'Ausgewogen (Balanced)',
              desc: 'Gleichmäßige Verteilung aller vier Fertigkeiten, regelmäßige Wiederholung.',
            },
            {
              id: 'intensive',
              title: 'Intensiv (Intensive)',
              desc: 'Höhere Aufgabendichte, frühere Modellprüfungen, gezielter Endspurt.',
            },
          ].map((int) => {
            const isSelected = intensity === int.id
            return (
              <button
                key={int.id}
                type="button"
                onClick={() => onIntensityChange(int.id as StudyIntensity)}
                className={cn(
                  'p-3.5 rounded-xl border text-left transition-all text-xs space-y-1',
                  isSelected
                    ? 'bg-[#171717] text-white border-[#171717]'
                    : 'bg-white hover:bg-[#F9F8F5] border-[#DEDAD1] text-[#171717]'
                )}
              >
                <span className="font-bold text-sm block">{int.title}</span>
                <span className={cn('text-[11px] block leading-relaxed', isSelected ? 'text-gray-300' : 'text-[#6B6760]')}>
                  {int.desc}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
