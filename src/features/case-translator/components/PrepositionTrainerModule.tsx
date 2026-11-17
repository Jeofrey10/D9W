import React, { useState } from 'react'
import {
  ACCUSATIVE_PREPOSITIONS,
  DATIVE_PREPOSITIONS,
  GENITIVE_PREPOSITIONS,
  PREPOSITION_CONTRACTIONS,
  TWO_WAY_PREPOSITIONS,
} from '@/data/grammar/prepositions'
import { PrepositionCategory, PrepositionItem } from '../types/caseTranslator.types'
import { cn } from '@/lib/utils'

export const PrepositionTrainerModule: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<PrepositionCategory>('two-way')
  const [twoWayMode, setTwoWayMode] = useState<'wo' | 'wohin'>('wo')
  const [selectedPrep, setSelectedPrep] = useState<PrepositionItem>(
    TWO_WAY_PREPOSITIONS[0] // 'in'
  )

  const categories: {
    id: PrepositionCategory
    label: string
    caseBadge: string
    caseColor: string
    count: number
  }[] = [
    {
      id: 'two-way',
      label: 'Wechselpräpositionen',
      caseBadge: 'Wo? (Dativ) vs Wohin? (Akk)',
      caseColor: 'bg-[#1E293B] text-white',
      count: TWO_WAY_PREPOSITIONS.length,
    },
    {
      id: 'accusative',
      label: 'Akkusativ-Präpositionen',
      caseBadge: 'Immer Akkusativ',
      caseColor: 'bg-[#C83B32] text-white',
      count: ACCUSATIVE_PREPOSITIONS.length,
    },
    {
      id: 'dative',
      label: 'Dativ-Präpositionen',
      caseBadge: 'Immer Dativ',
      caseColor: 'bg-[#15803D] text-white',
      count: DATIVE_PREPOSITIONS.length,
    },
    {
      id: 'genitive',
      label: 'Genitiv-Präpositionen',
      caseBadge: 'Immer Genitiv',
      caseColor: 'bg-[#854D0E] text-white',
      count: GENITIVE_PREPOSITIONS.length,
    },
  ]

  const currentPrepositionList: PrepositionItem[] =
    activeCategory === 'two-way'
      ? TWO_WAY_PREPOSITIONS
      : activeCategory === 'accusative'
      ? ACCUSATIVE_PREPOSITIONS
      : activeCategory === 'dative'
      ? DATIVE_PREPOSITIONS
      : GENITIVE_PREPOSITIONS

  return (
    <div className="space-y-6">
      {/* 1. Module Header */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
            Modul D • Präpositionen &amp; Rektion
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
            Präpositionen &amp; Kasussteuerung
          </h2>
        </div>
        <p className="text-sm font-sans text-[#55534F] leading-relaxed">
          Präpositionen steuern im Deutschen den Fall des folgenden Nomens. Während reine Akkusativ-, Dativ- und Genitivpräpositionen unveränderlich sind,
          entscheidet bei den <strong>neun Wechselpräpositionen</strong> die Frage <em>Wo?</em> (Ort / Dativ) oder <em>Wohin?</em> (Richtung / Akkusativ).
        </p>

        {/* 4 Category Switcher Pills */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                const list =
                  cat.id === 'two-way'
                    ? TWO_WAY_PREPOSITIONS
                    : cat.id === 'accusative'
                    ? ACCUSATIVE_PREPOSITIONS
                    : cat.id === 'dative'
                    ? DATIVE_PREPOSITIONS
                    : GENITIVE_PREPOSITIONS
                setSelectedPrep(list[0])
              }}
              className={cn(
                'p-3 rounded-xl border text-left transition-all cursor-pointer',
                activeCategory === cat.id
                  ? 'bg-white text-[#171717] border-[#171717] shadow-sm font-semibold'
                  : 'bg-[#FAF8F5] text-[#55534F] border-[#E5E0D8] hover:bg-white'
              )}
            >
              <span className="text-xs font-serif font-bold block">
                {cat.label}
              </span>
              <span
                className={cn(
                  'inline-block text-[9px] font-mono px-2 py-0.5 rounded-full mt-1.5 font-bold',
                  cat.caseColor
                )}
              >
                {cat.caseBadge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Wechselpräpositionen Interactive Deep-Dive (if two-way selected) */}
      {activeCategory === 'two-way' && (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white to-[#FAF8F5] animate-fadeIn border-l-4 border-l-[#1E293B]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EFECE6] pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#89857E]">
                Wechselpräpositionen-Labor
              </span>
              <h3 className="text-lg font-serif font-bold text-[#171717]">
                Wo? (Ort/Dativ) versus Wohin? (Richtung/Akkusativ)
              </h3>
            </div>

            {/* Wo vs Wohin Switch */}
            <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DEDAD1]">
              <button
                onClick={() => setTwoWayMode('wo')}
                className={cn(
                  'text-xs px-3.5 py-1.5 rounded-lg font-mono font-bold transition-all cursor-pointer',
                  twoWayMode === 'wo'
                    ? 'bg-[#15803D] text-white shadow-xs'
                    : 'text-[#55534F] hover:text-[#171717]'
                )}
              >
                Wo? • Dativ (Lage / Statisch)
              </button>
              <button
                onClick={() => setTwoWayMode('wohin')}
                className={cn(
                  'text-xs px-3.5 py-1.5 rounded-lg font-mono font-bold transition-all cursor-pointer',
                  twoWayMode === 'wohin'
                    ? 'bg-[#C83B32] text-white shadow-xs'
                    : 'text-[#55534F] hover:text-[#171717]'
                )}
              >
                Wohin? • Akkusativ (Ziel / Richtung)
              </button>
            </div>
          </div>

          {/* Dynamic Example Pair */}
          <div className="p-6 rounded-2xl bg-white border border-[#E5E0D8] space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'px-2.5 py-0.5 rounded-full text-xs font-mono font-bold text-white',
                  twoWayMode === 'wo' ? 'bg-[#15803D]' : 'bg-[#C83B32]'
                )}
              >
                {twoWayMode === 'wo' ? 'Dativ (Ort)' : 'Akkusativ (Richtung)'}
              </span>
              <span className="text-xs font-mono text-[#89857E]">
                Präposition: „{selectedPrep.preposition}“
              </span>
            </div>

            <div className="text-xl sm:text-2xl font-serif font-bold text-[#171717]">
              {twoWayMode === 'wo' ? (
                <span>
                  Ich bin{' '}
                  <span className="text-[#15803D] underline decoration-2">
                    in dem Haus
                  </span>{' '}
                  (im Haus).
                </span>
              ) : (
                <span>
                  Ich gehe{' '}
                  <span className="text-[#C83B32] underline decoration-2">
                    in das Haus
                  </span>{' '}
                  (ins Haus).
                </span>
              )}
            </div>

            <p className="text-xs font-serif italic text-[#55534F]">
              {twoWayMode === 'wo'
                ? '„I am in the house.“ — stationary location, answers Wo? -> Dativ.'
                : '„I walk into the house.“ — crossing boundary into a new destination, answers Wohin? -> Akkusativ.'}
            </p>

            <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EFECE6] text-xs text-[#55534F] leading-relaxed">
              <strong>Häufiger Irrtum vermieden: </strong>
              Nicht jede Bewegung ist Akkusativ! Wenn jemand <em>innerhalb</em> eines Ortes joggt (z. B. „Der Hund läuft im Garten herum“),
              bleibt es <strong>Dativ</strong>, da kein neues Ziel angesteuert wird.
            </div>
          </div>
        </div>
      )}

      {/* 3. Preposition Grid & Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preposition List Grid */}
        <div className="lg:col-span-2 skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E]">
            Verfügbare Präpositionen:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {currentPrepositionList.map((p) => {
              const isSelected = selectedPrep.id === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPrep(p)}
                  className={cn(
                    'p-3 rounded-xl border text-left transition-all cursor-pointer',
                    isSelected
                      ? 'bg-white text-[#171717] border-[#171717] shadow-sm font-semibold'
                      : 'bg-[#FAF8F5] text-[#55534F] border-[#E5E0D8] hover:bg-white'
                  )}
                >
                  <span className="text-base font-serif font-bold text-[#171717] block">
                    {p.preposition}
                  </span>
                  <span className="text-[11px] font-sans text-[#89857E] block mt-0.5 line-clamp-1">
                    {p.meaning}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Preposition Detail Card */}
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[#89857E]">
                Präpositions-Steckbrief
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DEDAD1] text-[#171717]">
                {selectedPrep.caseTriggered}
              </span>
            </div>

            <div>
              <h3 className="text-3xl font-serif font-bold text-[#171717]">
                {selectedPrep.preposition}
              </h3>
              <p className="text-xs font-sans text-[#55534F] mt-1">
                Bedeutung: <strong>{selectedPrep.meaning}</strong>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase text-[#89857E] block">
                Beispielsatz:
              </span>
              <p className="text-sm font-serif font-bold text-[#171717]">
                „{selectedPrep.exampleGerman}“
              </p>
              <p className="text-xs font-serif italic text-[#55534F]">
                {selectedPrep.exampleEnglish}
              </p>
            </div>

            {selectedPrep.contraction && (
              <div className="p-3 rounded-lg bg-white border border-[#DEDAD1] space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-[#C83B32] block">
                  Verschmelzung (Kontraktion):
                </span>
                <span className="text-sm font-mono font-bold text-[#171717]">
                  {selectedPrep.contraction}
                </span>
                <p className="text-[11px] text-[#89857E]">
                  {selectedPrep.contractionExplanation}
                </p>
              </div>
            )}

            {selectedPrep.tip && (
              <p className="text-xs text-[#55534F] leading-relaxed pt-2 border-t border-[#EFECE6]">
                <strong className="text-[#171717]">Lerntipp: </strong>
                {selectedPrep.tip}
              </p>
            )}
          </div>

          <div className="text-[11px] font-mono text-[#89857E] pt-2 border-t border-[#EFECE6]">
            Kategorie: {selectedPrep.category}
          </div>
        </div>
      </div>

      {/* 4. Preposition + Article Contractions Reference Table */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#171717] flex items-center justify-between">
          <span>Häufige Präposition-Artikel-Verschmelzungen</span>
          <span className="text-xs font-mono font-normal text-[#89857E]">11 Contractions</span>
        </h3>
        <p className="text-xs text-[#55534F]">
          Im Deutschen verschmelzen Präpositionen und bestimmte Artikel zu festen Kurzformen.
          Im Alltag und in Prüfungen sind Formen wie <em>im</em>, <em>ins</em>, <em>zum</em>, <em>zur</em> obligatorisch.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
          {PREPOSITION_CONTRACTIONS.map((c, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-1 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#89857E] text-[10px]">{c.full}</span>
                <span className="text-[9px] font-mono px-1 rounded bg-white border border-[#DEDAD1] font-bold">
                  {c.caseName}
                </span>
              </div>
              <div className="text-lg font-serif font-bold text-[#C83B32]">
                &rarr; {c.contracted}
              </div>
              <span className="text-[10px] text-[#55534F] block">
                {c.gender}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
