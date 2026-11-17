import React from 'react'
import { StudyPlan } from '../../types/studyPlanner.types'
import { Printer, ArrowLeft } from 'lucide-react'

interface PrintableViewProps {
  plan: StudyPlan
  onBackToDashboard: () => void
}

export const PrintableView: React.FC<PrintableViewProps> = ({
  plan,
  onBackToDashboard,
}) => {
  const { preferences, countdown, glhEstimate, phases, tasks, mockExams } = plan

  const handlePrint = () => {
    window.print()
  }

  // Group tasks by week
  const sortedTasks = [...tasks].sort((a, b) => a.date.localeCompare(b.date))
  const first14Days = sortedTasks.slice(0, 28) // Preview first few weeks in print

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 1. Interactive Control Toolbar (Hidden in Print) */}
      <div className="print:hidden skeuo-paper p-4 rounded-2xl border border-[#DEDAD1] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBackToDashboard}
          className="px-3.5 py-2 rounded-xl border border-[#DEDAD1] hover:bg-[#F9F8F5] text-xs font-semibold text-[#171717] flex items-center gap-1.5 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Übersicht</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-[#C83B32] hover:bg-[#A82B24] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Plan drucken (A4 / PDF)</span>
          </button>
        </div>
      </div>

      {/* 2. Printable Paper Container */}
      <div className="bg-white p-8 sm:p-12 border border-[#DEDAD1] rounded-2xl shadow-sm text-black print:p-0 print:border-none print:shadow-none print:m-0">
        {/* Header / Letterhead */}
        <div className="border-b-2 border-black pb-4 mb-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/assets/d9w-institute-logo.png"
              alt="D9W German Language Institute"
              className="w-[115px] h-auto object-contain"
              width={1024}
              height={682}
            />
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-red-700 uppercase block">
                D9W DEUTSCH-SPRACHINSTITUT • LEHRPLAN
              </span>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-black mt-1">
                Personalisierter Lern- & Prüfungsfahrplan
              </h1>
              <p className="text-xs text-gray-700 mt-1">
                Zielniveau: {preferences.targetLevel} ({preferences.examConfig.provider}) • Ausgangsniveau: {preferences.currentLevel}
              </p>
            </div>
          </div>

          <div className="text-right text-xs font-mono">
            <span className="block font-bold">Erstellt am:</span>
            <span className="text-gray-700">{new Date(plan.createdAt).toLocaleDateString('de-DE')}</span>
            <span className="block text-[10px] text-gray-500 mt-1">D9W-HUB-V1</span>
          </div>
        </div>

        {/* Overview Grid */}
        <div className="grid grid-cols-3 gap-4 border border-gray-300 p-4 rounded-lg mb-6 text-xs">
          <div>
            <span className="text-gray-500 uppercase font-mono block text-[10px]">Prüfungstermin:</span>
            <span className="font-bold text-sm">
              {preferences.examConfig.isFlexibleGoal
                ? `Flexibel (${preferences.examConfig.flexibleWeeks || 12} Wochen)`
                : preferences.examConfig.examDate || 'Nicht festgelegt'}
            </span>
            <span className="text-gray-600 block text-[11px]">
              {countdown.targetDate ? `${countdown.daysRemaining} Tage verbleibend` : 'Eigenes Tempo'}
            </span>
          </div>

          <div>
            <span className="text-gray-500 uppercase font-mono block text-[10px]">Wochenpensum:</span>
            <span className="font-bold text-sm">{glhEstimate.hoursPerWeek} Std. pro Woche</span>
            <span className="text-gray-600 block text-[11px]">
              {preferences.availableDays.length} Lerntage à {preferences.dailyMinutes} Minuten
            </span>
          </div>

          <div>
            <span className="text-gray-500 uppercase font-mono block text-[10px]">Lernschwerpunkte:</span>
            <span className="font-bold text-sm">Fokus: {preferences.weakestSkill}</span>
            <span className="text-gray-600 block text-[11px]">Stärke: {preferences.strongestSkill}</span>
          </div>
        </div>

        {/* Preparation Phases */}
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider font-bold border-b border-gray-300 pb-1 mb-2 text-black">
            1. Vorbereitungsphasen & Meilensteine
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {phases.map((ph) => (
              <div key={ph.phase} className="p-2.5 rounded border border-gray-200">
                <span className="font-bold block text-black">{ph.name}</span>
                <span className="text-[10px] text-gray-600 block font-mono">
                  {ph.startDate} bis {ph.endDate}
                </span>
                <p className="text-[10px] text-gray-700 mt-1 leading-snug">{ph.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Mock Exams */}
        {mockExams.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-mono uppercase tracking-wider font-bold border-b border-gray-300 pb-1 mb-2 text-black">
              2. Modellprüfungstermine (Selbsttests)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {mockExams.map((m, idx) => (
                <div key={m.id} className="p-2.5 rounded border border-gray-200">
                  <span className="font-bold block">Simulation #{idx + 1}: {m.title}</span>
                  <span className="text-[11px] font-mono text-gray-700">Datum: {m.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Schedule Excerpt */}
        <div className="mb-6">
          <h2 className="text-xs font-mono uppercase tracking-wider font-bold border-b border-gray-300 pb-1 mb-2 text-black">
            3. Auszug aus dem Tagesplan (Erste Wochen)
          </h2>
          <div className="space-y-1.5 text-xs">
            {first14Days.map((t) => (
              <div key={t.id} className="flex items-start justify-between py-1.5 border-b border-gray-100">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded border border-gray-400 mt-0.5 inline-block shrink-0" />
                  <div>
                    <span className="font-mono text-[10px] text-gray-600 font-bold mr-2">{t.date}</span>
                    <span className="font-bold text-black">{t.title}</span>
                    <span className="text-gray-600 ml-2">({t.skill}, {t.duration}m)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Disclaimer in Print */}
        <div className="border-t border-gray-300 pt-3 text-[10px] text-gray-600 leading-relaxed font-mono">
          D9W German Language Institute • Unverbindlicher didaktischer Studienplan • Keine amtliche Prüfungszulassung • © 2026 D9W Hub
        </div>
      </div>
    </div>
  )
}
