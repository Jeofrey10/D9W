import React, { useState } from 'react'
import { StudyPlan } from '../../types/studyPlanner.types'
import { exportStudyPlanToFile } from '../../utils/storageUtils'
import {
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  Flame,
  PieChart,
} from 'lucide-react'

interface ProgressDashboardProps {
  plan: StudyPlan
  onResetPlan: () => void
  onImportPlan: (plan: StudyPlan) => void
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  plan,
  onResetPlan,
  onImportPlan,
}) => {
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [importJsonText, setImportJsonText] = useState('')
  const [importError, setImportError] = useState<string | null>(null)

  const { progress, countdown, glhEstimate } = plan

  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setImportError(null)
    try {
      const parsed = JSON.parse(importJsonText)
      if (!parsed || !parsed.preferences || !Array.isArray(parsed.tasks)) {
        throw new Error('Ungültiges D9W Lernplan-Format.')
      }
      onImportPlan(parsed)
      setShowImportModal(false)
    } catch (err: unknown) {
      setImportError((err as Error).message || 'Fehler beim Parsen der JSON-Datei.')
    }
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Actions */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-7 border border-[#DEDAD1] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
            Lernfortschritt & Kennzahlen • Progress Dashboard
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-0.5">
            Dein Lernfortschritt im Detail
          </h3>
          <p className="text-xs text-[#5A5751] mt-0.5">
            Basiert auf tatsächlich absolvierten Lerneinheiten und selbst eingetragenen Zeiten.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => exportStudyPlanToFile(plan)}
            className="px-3 py-1.5 rounded-xl border border-[#DEDAD1] hover:border-[#171717] bg-white text-xs font-semibold text-[#171717] flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#89857E]" />
            <span>Plan exportieren (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowImportModal(true)}
            className="px-3 py-1.5 rounded-xl border border-[#DEDAD1] hover:border-[#171717] bg-white text-xs font-semibold text-[#171717] flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5 text-[#89857E]" />
            <span>Importieren</span>
          </button>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-3 py-1.5 rounded-xl border border-red-200 hover:bg-red-50 text-xs font-semibold text-red-700 flex items-center gap-1.5 transition-all shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-red-600" />
            <span>Plan zurücksetzen</span>
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Overall Completion */}
        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#89857E] block">
            Gesamtfortschritt
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            {progress.completionPercentage}%
          </div>
          <span className="text-[11px] text-[#6B6760] block">
            {progress.completedTasks} von {progress.totalTasks} Aufgaben
          </span>
        </div>

        {/* Study Hours */}
        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#89857E] block">
            Lernzeit absolviert
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#C83B32]">
            {Math.round(progress.completedMinutes / 6) / 10} Std.
          </div>
          <span className="text-[11px] text-[#6B6760] block">
            von {glhEstimate.totalPlannedHours} Std. geplant
          </span>
        </div>

        {/* Weekly Consistency */}
        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#89857E] block">
            Wochen-Konsistenz
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#15803D] flex items-center gap-1">
            <Flame className="w-5 h-5 text-amber-500 shrink-0" />
            <span>{progress.consistencyDaysThisWeek} / {progress.targetDaysPerWeek}</span>
          </div>
          <span className="text-[11px] text-[#6B6760] block">
            Lerntage diese Woche aktiv
          </span>
        </div>

        {/* Countdown */}
        <div className="skeuo-paper p-4 rounded-xl border border-[#DEDAD1] space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#89857E] block">
            Countdown zum Test
          </span>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#171717]">
            {countdown.targetDate ? `${countdown.daysRemaining} Tage` : 'Flexibel'}
          </div>
          <span className="text-[11px] text-[#6B6760] block truncate">
            {countdown.statusLabel}
          </span>
        </div>
      </div>

      {/* 3. Skill-Wise Breakdown Table */}
      <div className="skeuo-paper rounded-2xl p-6 border border-[#DEDAD1] space-y-4">
        <h4 className="text-sm font-serif font-bold text-[#171717] flex items-center gap-2">
          <PieChart className="w-4 h-4 text-[#C83B32]" />
          Verteilung nach Fertigkeiten & Lernstunden
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[#EFECE6] text-[11px] font-mono uppercase text-[#89857E]">
                <th className="py-2.5 font-bold">Fertigkeit</th>
                <th className="py-2.5 font-bold">Aufgaben erledigt</th>
                <th className="py-2.5 font-bold">Lernminuten</th>
                <th className="py-2.5 font-bold">Fortschritt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE6]">
              {Object.entries(progress.tasksBySkill).map(([skill, stat]) => {
                const percent = stat.total > 0 ? Math.round((stat.completed / stat.total) * 100) : 0
                const minutes = progress.minutesBySkill[skill] || 0

                return (
                  <tr key={skill} className="hover:bg-[#FAF8F5]">
                    <td className="py-2.5 font-bold text-[#171717]">{skill}</td>
                    <td className="py-2.5 text-[#5A5751]">
                      {stat.completed} / {stat.total}
                    </td>
                    <td className="py-2.5 font-mono text-[#171717]">
                      {minutes} Min. ({Math.round(minutes / 6) / 10} Std.)
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-[#EFECE6] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#C83B32] h-full rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-[#89857E]">{percent}%</span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Reset Double-Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="skeuo-paper w-full max-w-md rounded-2xl p-6 border border-[#DEDAD1] shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-[#171717]">
                  Lernplan wirklich zurücksetzen?
                </h3>
                <p className="text-xs text-[#5A5751] mt-1 leading-relaxed">
                  Dadurch werden alle gespeicherten Aufgaben, Notizen und Modellprüfungsergebnisse aus deinem lokalen Browser-Speicher gelöscht. Dies kann nicht rückgängig gemacht werden.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EFECE6]">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg border border-[#DEDAD1] hover:bg-[#F9F8F5] text-xs font-semibold text-[#171717]"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetPlan()
                  setShowResetConfirm(false)
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
              >
                Ja, alles löschen & neu starten
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="skeuo-paper w-full max-w-lg rounded-2xl p-6 border border-[#DEDAD1] shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-[#171717]">
              Lernplan aus JSON-Backup importieren
            </h3>
            <p className="text-xs text-[#5A5751]">
              Füge den Inhalt deiner zuvor exportierten D9W-Lernplan-Datei hier ein:
            </p>

            <form onSubmit={handleImportSubmit} className="space-y-3">
              <textarea
                rows={6}
                required
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder='{"id":"plan-...", "version":"1.0", ...}'
                className="w-full font-mono text-[11px] p-3 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
              />

              {importError && (
                <div className="p-2 rounded bg-red-50 border border-red-200 text-red-700 text-xs">
                  {importError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EFECE6]">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 rounded-lg border border-[#DEDAD1] hover:bg-[#F9F8F5] text-xs font-semibold text-[#171717]"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#171717] hover:bg-[#2B2B2B] text-white text-xs font-semibold"
                >
                  Lernplan wiederherstellen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
