import React, { useState } from 'react'
import { PERSONAL_PRONOUNS, PRONOUN_CASE_EXPLANATION } from '@/data/grammar/pronouns'
import { ALL_VERBS } from '@/data/grammar/verbs'
import { ALL_PREPOSITIONS } from '@/data/grammar/prepositions'
import { Search, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

export const ContextualCaseReferenceModule: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState<'pronouns' | 'verbs' | 'prepositions'>('pronouns')

  const filteredVerbs = ALL_VERBS.filter(
    (v) =>
      v.verb.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.governedCase.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPrepositions = ALL_PREPOSITIONS.filter(
    (p) =>
      p.preposition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.caseTriggered.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* 1. Module Header & Sub-Nav */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Modul G • Durchsuchbare Grammatik-Bibliothek
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
              Kasus-Referenzbibliothek
            </h2>
          </div>

          {/* Section pills */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DEDAD1]">
            <button
              onClick={() => setActiveSection('pronouns')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer',
                activeSection === 'pronouns'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#89857E] hover:text-[#171717]'
              )}
            >
              Personalpronomen
            </button>
            <button
              onClick={() => setActiveSection('verbs')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer',
                activeSection === 'verbs'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#89857E] hover:text-[#171717]'
              )}
            >
              Verbrektion
            </button>
            <button
              onClick={() => setActiveSection('prepositions')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer',
                activeSection === 'prepositions'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#89857E] hover:text-[#171717]'
              )}
            >
              Präpositionen
            </button>
          </div>
        </div>

        {/* Search bar for verbs / prepositions */}
        {activeSection !== 'pronouns' && (
          <div className="relative max-w-md pt-2">
            <Search className="w-4 h-4 text-[#89857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                activeSection === 'verbs'
                  ? 'Verb oder Bedeutung suchen (z. B. helfen, Dativ)...'
                  : 'Präposition suchen (z. B. mit, wegen, in)...'
              }
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#DEDAD1] rounded-lg text-[#171717] placeholder:text-[#89857E] outline-none focus:border-[#C83B32]"
            />
          </div>
        )}
      </div>

      {/* SECTION 1: Personal Pronouns Table across all 4 cases */}
      {activeSection === 'pronouns' && (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#171717]">
              Personalpronomen in allen vier Fällen
            </h3>
            <p className="text-xs text-[#55534F] mt-1">
              Im Deutschen dekliniert jedes Personalpronomen durch Nominativ (Subjekt), Akkusativ (direktes Objekt), Dativ (indirektes Objekt) und Genitiv (Besitz).
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-[#FAF8F5] text-[#89857E] font-mono text-[11px] uppercase border-b border-[#E5E0D8]">
                <tr>
                  <th className="py-3 px-4">Person</th>
                  <th className="py-3 px-4 text-[#1E293B]">Nominativ (Wer?)</th>
                  <th className="py-3 px-4 text-[#C83B32]">Akkusativ (Wen?)</th>
                  <th className="py-3 px-4 text-[#15803D]">Dativ (Wem?)</th>
                  <th className="py-3 px-4 text-[#854D0E]">Genitiv (Wessen?)</th>
                  <th className="py-3 px-4">Bedeutung (Englisch)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {PERSONAL_PRONOUNS.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3 px-4 font-mono font-semibold text-[#171717]">
                      {p.person}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-base text-[#1E293B]">
                      {p.nominativ}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-base text-[#C83B32]">
                      {p.akkusativ}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-base text-[#15803D]">
                      {p.dativ}
                    </td>
                    <td className="py-3 px-4 font-serif font-bold text-base text-[#854D0E]">
                      {p.genitiv}
                    </td>
                    <td className="py-3 px-4 text-xs text-[#55534F] italic">
                      {p.english}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Key pedagogical notes */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-[#89857E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D7B95D]" />
              Wichtige didaktische Merkmale:
            </span>
            <ul className="text-xs text-[#55534F] space-y-1">
              {PRONOUN_CASE_EXPLANATION.keyTakeaways.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SECTION 2: Verb Valency Table */}
      {activeSection === 'verbs' && (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#171717]">
              Verbrektion: Welches Verb fordert welchen Fall?
            </h3>
            <p className="text-xs text-[#55534F] mt-1">
              Deutsche Verben bestimmen maßgeblich, in welchem Kasus ihre Ergänzungen stehen müssen.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-[#FAF8F5] text-[#89857E] font-mono text-[11px] uppercase border-b border-[#E5E0D8]">
                <tr>
                  <th className="py-3 px-4">Verb</th>
                  <th className="py-3 px-4">Geforderter Kasus</th>
                  <th className="py-3 px-4">Valenzmuster</th>
                  <th className="py-3 px-4">Beispielsatz</th>
                  <th className="py-3 px-4">Niveau</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {filteredVerbs.map((v) => (
                  <tr key={v.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3 px-4">
                      <strong className="text-base font-serif font-bold text-[#171717] block">
                        {v.verb}
                      </strong>
                      <span className="text-[11px] text-[#89857E]">{v.meaning}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          'inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-white',
                          v.governedCase === 'Akkusativ'
                            ? 'bg-[#C83B32]'
                            : v.governedCase === 'Dativ'
                            ? 'bg-[#15803D]'
                            : v.governedCase === 'Genitiv'
                            ? 'bg-[#854D0E]'
                            : 'bg-[#1E293B]'
                        )}
                      >
                        {v.governedCase}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#55534F]">
                      {v.valencyPattern}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <div className="font-serif font-medium text-[#171717]">
                        {v.exampleGerman}
                      </div>
                      <div className="text-[11px] italic text-[#89857E]">
                        {v.exampleEnglish}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#89857E]">
                      {v.level}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: Prepositions Master Reference */}
      {activeSection === 'prepositions' && (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#171717]">
              Präpositionen-Gesamtindex
            </h3>
            <p className="text-xs text-[#55534F] mt-1">
              Alphabetische Übersicht aller reinen und wechselbaren Präpositionen mit Fallsteuerung.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl">
            <table className="w-full text-left text-xs sm:text-sm font-sans">
              <thead className="bg-[#FAF8F5] text-[#89857E] font-mono text-[11px] uppercase border-b border-[#E5E0D8]">
                <tr>
                  <th className="py-3 px-4">Präposition</th>
                  <th className="py-3 px-4">Kategorie</th>
                  <th className="py-3 px-4">Gesteuerter Kasus</th>
                  <th className="py-3 px-4">Bedeutung</th>
                  <th className="py-3 px-4">Musterbeispiel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6]">
                {filteredPrepositions.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="py-3 px-4 font-serif font-bold text-base text-[#171717]">
                      {p.preposition}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-[#89857E] capitalize">
                      {p.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-mono font-bold text-[#171717]">
                        {p.caseTriggered}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-[#55534F]">
                      {p.meaning}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      <span className="font-serif italic text-[#171717]">
                        „{p.exampleGerman}“
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
