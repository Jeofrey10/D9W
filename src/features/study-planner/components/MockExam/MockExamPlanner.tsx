import React, { useState } from 'react'
import { StudyPlan, MockExamRecord } from '../../types/studyPlanner.types'
import {
  Calendar,
  CheckCircle2,
  ShieldAlert,
  Edit2,
  Headphones,
  FileText,
  PenTool,
  Volume2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MockExamPlannerProps {
  plan: StudyPlan
  onRecordScores: (mockId: string, scores: MockExamRecord['scores'], notes: string) => void
}

export const MockExamPlanner: React.FC<MockExamPlannerProps> = ({
  plan,
  onRecordScores,
}) => {
  const [selectedMock, setSelectedMock] = useState<MockExamRecord | null>(null)
  const [listeningScore, setListeningScore] = useState<number | ''>('')
  const [readingScore, setReadingScore] = useState<number | ''>('')
  const [writingScore, setWritingScore] = useState<number | ''>('')
  const [speakingScore, setSpeakingScore] = useState<number | ''>('')
  const [notes, setNotes] = useState('')

  const handleOpenScoreModal = (mock: MockExamRecord) => {
    setSelectedMock(mock)
    setListeningScore(mock.scores.listening ?? '')
    setReadingScore(mock.scores.reading ?? '')
    setWritingScore(mock.scores.writing ?? '')
    setSpeakingScore(mock.scores.speaking ?? '')
    setNotes(mock.notes || '')
  }

  const handleSaveScores = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMock) return

    const l = typeof listeningScore === 'number' ? listeningScore : undefined
    const r = typeof readingScore === 'number' ? readingScore : undefined
    const w = typeof writingScore === 'number' ? writingScore : undefined
    const s = typeof speakingScore === 'number' ? speakingScore : undefined

    let total: number | undefined = undefined
    const scoredParts = [l, r, w, s].filter((v): v is number => v !== undefined)
    if (scoredParts.length > 0) {
      total = scoredParts.reduce((a, b) => a + b, 0)
    }

    onRecordScores(
      selectedMock.id,
      {
        listening: l,
        reading: r,
        writing: w,
        speaking: s,
        total,
      },
      notes
    )

    setSelectedMock(null)
  }

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-7 border border-[#DEDAD1] shadow-sm space-y-3">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
          Prüfungssimulationen • Mock Examination Planner
        </span>
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
          Geplante Modellprüfungen ({plan.mockExams.length})
        </h3>
        <p className="text-xs text-[#5A5751] leading-relaxed max-w-3xl">
          Modellprüfungen simulieren die echten Zeit- und Aufgabenbedingungen deines Zielinstituts ({plan.preferences.examConfig.provider}). Trage hier deine Übungsergebnisse ein, um Leistungsfortschritte sichtbar zu machen.
        </p>

        {/* Disclaimer */}
        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E1D8] flex items-start gap-2.5 text-[11px] text-[#6B6760]">
          <ShieldAlert className="w-4 h-4 text-[#89857E] shrink-0 mt-0.5" />
          <p>
            <strong>Wichtiger Hinweis:</strong> Diese Modellprüfungen sind didaktische Selbsttests zur Orientierung. Die Punktzahlen werden von dir selbst eingetragen und sagen kein amtliches Prüfungsergebnis voraus.
          </p>
        </div>
      </div>

      {/* 2. Mock Exams Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plan.mockExams.map((mock, index) => {
          const hasScores = mock.completed && mock.scores.total !== undefined

          return (
            <div
              key={mock.id}
              className={cn(
                'skeuo-paper rounded-2xl p-5 border transition-all text-xs flex flex-col justify-between space-y-4',
                mock.completed
                  ? 'bg-[#FAF9F6] border-[#DEDAD1]'
                  : 'bg-white border-[#DEDAD1] hover:border-[#171717] shadow-xs'
              )}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#EFECE6] text-[#171717]">
                    Simulation #{index + 1}
                  </span>
                  <span className="text-xs font-mono text-[#89857E] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C83B32]" />
                    {mock.date}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#171717]">
                  {mock.title}
                </h4>

                <span className="text-[11px] text-[#6B6760] block">
                  Format: {mock.provider} ({mock.level})
                </span>

                {/* Score breakdown if recorded */}
                {hasScores ? (
                  <div className="skeuo-recessed p-3 rounded-xl border border-[#E5E1D8] space-y-2 mt-2">
                    <div className="flex items-center justify-between font-bold text-xs text-[#171717]">
                      <span>Gesamtpunktzahl:</span>
                      <span className="text-sm text-[#C83B32]">{mock.scores.total} Punkte</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
                      <div className="p-1 rounded bg-white border border-[#E5E1D8]">
                        <span className="text-[#89857E] block">Hören</span>
                        <span className="font-bold text-[#171717]">{mock.scores.listening ?? '—'}</span>
                      </div>
                      <div className="p-1 rounded bg-white border border-[#E5E1D8]">
                        <span className="text-[#89857E] block">Lesen</span>
                        <span className="font-bold text-[#171717]">{mock.scores.reading ?? '—'}</span>
                      </div>
                      <div className="p-1 rounded bg-white border border-[#E5E1D8]">
                        <span className="text-[#89857E] block">Schreiben</span>
                        <span className="font-bold text-[#171717]">{mock.scores.writing ?? '—'}</span>
                      </div>
                      <div className="p-1 rounded bg-white border border-[#E5E1D8]">
                        <span className="text-[#89857E] block">Sprechen</span>
                        <span className="font-bold text-[#171717]">{mock.scores.speaking ?? '—'}</span>
                      </div>
                    </div>
                    {mock.notes && (
                      <p className="text-[10px] text-[#6B6760] italic border-t border-[#E5E1D8] pt-1 mt-1">
                        &quot;{mock.notes}&quot;
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-dashed border-[#E5E1D8] text-[11px] text-[#89857E] text-center">
                    Noch kein Ergebnis eingetragen
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => handleOpenScoreModal(mock)}
                className="w-full py-2 px-3 rounded-xl border border-[#DEDAD1] hover:border-[#171717] bg-white text-xs font-semibold text-[#171717] flex items-center justify-center gap-1.5 transition-all shadow-2xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{mock.completed ? 'Ergebnis bearbeiten' : 'Ergebnis eintragen'}</span>
              </button>
            </div>
          )
        })}
      </div>

      {/* 3. Record Scores Modal */}
      {selectedMock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="skeuo-paper w-full max-w-md rounded-2xl p-6 border border-[#DEDAD1] shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="border-b border-[#EFECE6] pb-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
                Modellprüfung eintragen
              </span>
              <h3 className="text-lg font-serif font-bold text-[#171717]">
                {selectedMock.title}
              </h3>
              <p className="text-xs text-[#6B6760]">
                Datum: {selectedMock.date} • {selectedMock.provider}
              </p>
            </div>

            <form onSubmit={handleSaveScores} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#171717] mb-1 flex items-center gap-1">
                    <Headphones className="w-3 h-3 text-[#1E3A8A]" />
                    Hören (Punkte)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={listeningScore}
                    onChange={(e) => setListeningScore(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="z.B. 22"
                    className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#171717] mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[#15803D]" />
                    Lesen (Punkte)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={readingScore}
                    onChange={(e) => setReadingScore(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="z.B. 24"
                    className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#171717] mb-1 flex items-center gap-1">
                    <PenTool className="w-3 h-3 text-[#854D0E]" />
                    Schreiben (Punkte)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={writingScore}
                    onChange={(e) => setWritingScore(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="z.B. 19"
                    className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#171717] mb-1 flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-[#C83B32]" />
                    Sprechen (Punkte)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={speakingScore}
                    onChange={(e) => setSpeakingScore(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="z.B. 21"
                    className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#171717] mb-1">
                  Eigene Reflexion & Schwachstellen-Notiz
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Wo lag die größte Schwierigkeit? (z.B. Zeitmangel bei Leseverstehen Teil 3)..."
                  className="w-full p-2.5 rounded-lg border border-[#DEDAD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C83B32]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#EFECE6]">
                <button
                  type="button"
                  onClick={() => setSelectedMock(null)}
                  className="px-4 py-2 rounded-lg border border-[#DEDAD1] hover:bg-[#F9F8F5] text-[#171717] font-semibold"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#C83B32] hover:bg-[#A82B24] text-white font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Ergebnis speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
