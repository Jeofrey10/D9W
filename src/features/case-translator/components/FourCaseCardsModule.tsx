import React, { useState } from 'react'
import { GERMAN_CASE_DEFINITIONS } from '@/data/grammar/cases'
import { GrammaticalCase } from '../types/caseTranslator.types'
import { getCaseColorStyles } from '../utils/caseColorTokens'
import {
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface FourCaseCardsModuleProps {
  onStartQuizForCase?: (c: GrammaticalCase) => void
}

export const FourCaseCardsModule: React.FC<FourCaseCardsModuleProps> = ({
  onStartQuizForCase,
}) => {
  const [activeCase, setActiveCase] = useState<GrammaticalCase>('Nominativ')

  const cases: GrammaticalCase[] = [
    'Nominativ',
    'Akkusativ',
    'Dativ',
    'Genitiv',
  ]
  const currentDef = GERMAN_CASE_DEFINITIONS[activeCase]
  const activeColor = getCaseColorStyles(activeCase)

  return (
    <div className="space-y-6">
      {/* 1. Module Header */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
            Modul B • Die vier Fälle im Detail
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
            Die vier deutschen Fälle (Kasus-Karten)
          </h2>
        </div>
        <p className="text-sm font-sans text-[#55534F] leading-relaxed">
          Im Deutschen zeigen Artikel, Pronomina und Adjektivendungen an, welche Rolle ein Nomen im Satz spielt.
          Wählen Sie einen Fall aus, um Fragewörter, Artikeltransformationen, typische Verben, typische Fehler und kuratierte Beispielsätze zu erkunden.
        </p>

        {/* 4 Case Selector Tabs (Tactile Tabs) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2" role="tablist">
          {cases.map((c) => {
            const isSelected = activeCase === c
            const cColor = getCaseColorStyles(c)
            return (
              <button
                key={c}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveCase(c)}
                className={cn(
                  'p-3 sm:p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden',
                  isSelected
                    ? cn(
                        'bg-white border-[#171717] shadow-md',
                        cColor.pillBorder
                      )
                    : 'bg-[#FAF8F5] border-[#E5E0D8] hover:bg-white text-[#55534F]'
                )}
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-[#89857E]">
                  {c === 'Nominativ' && '1. Fall'}
                  {c === 'Genitiv' && '2. Fall'}
                  {c === 'Dativ' && '3. Fall'}
                  {c === 'Akkusativ' && '4. Fall'}
                </span>
                <span className="text-base sm:text-lg font-serif font-bold text-[#171717] block mt-0.5">
                  {c}
                </span>
                <span className="text-xs font-sans text-[#89857E] block mt-1 line-clamp-1">
                  {c === 'Nominativ' && 'Wer? Was? (Subjekt)'}
                  {c === 'Akkusativ' && 'Wen? Was? (Objekt)'}
                  {c === 'Dativ' && 'Wem? (Empfänger)'}
                  {c === 'Genitiv' && 'Wessen? (Besitz)'}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Focused Case Card Presentation */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-8 animate-fadeIn">
        {/* Card Header & Key Questions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EFECE6] pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-mono font-bold text-white',
                  activeColor.badgeClass
                )}
              >
                {currentDef.caseName}
              </span>
              <span className="text-xs font-mono text-[#89857E]">
                {currentDef.germanName}
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#171717]">
              {currentDef.englishLabel}
            </h3>
            <p className="text-sm text-[#55534F] max-w-2xl">
              {currentDef.roleDescription}
            </p>
          </div>

          {/* Question words callout */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#DEDAD1] space-y-1 shrink-0">
            <span className="text-[10px] font-mono font-bold uppercase text-[#89857E]">
              Zentrale Fragewörter:
            </span>
            <div className="flex items-center gap-2">
              {currentDef.questionWords.map((q, idx) => (
                <span
                  key={idx}
                  className="font-serif font-bold text-base text-[#C83B32] bg-white border border-[#DEDAD1] px-2.5 py-1 rounded-md shadow-2xs"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Core Articles & Pronouns Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Articles Table */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#D7B95D]" />
              Artikelformen im {currentDef.caseName}
            </span>
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5E0D8] space-y-3">
              <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="p-2 bg-white rounded border border-[#E5E0D8]">
                  <span className="text-[10px] text-[#89857E] block uppercase">Maskulin</span>
                  <strong className="text-sm text-[#1E3A8A]">
                    {currentDef.definiteArticles.masculine}
                  </strong>
                  <span className="text-[11px] text-[#55534F] block mt-0.5">
                    {currentDef.indefiniteArticles.masculine}
                  </span>
                </div>
                <div className="p-2 bg-white rounded border border-[#E5E0D8]">
                  <span className="text-[10px] text-[#89857E] block uppercase">Feminin</span>
                  <strong className="text-sm text-[#C83B32]">
                    {currentDef.definiteArticles.feminine}
                  </strong>
                  <span className="text-[11px] text-[#55534F] block mt-0.5">
                    {currentDef.indefiniteArticles.feminine}
                  </span>
                </div>
                <div className="p-2 bg-white rounded border border-[#E5E0D8]">
                  <span className="text-[10px] text-[#89857E] block uppercase">Neutrum</span>
                  <strong className="text-sm text-[#15803D]">
                    {currentDef.definiteArticles.neuter}
                  </strong>
                  <span className="text-[11px] text-[#55534F] block mt-0.5">
                    {currentDef.indefiniteArticles.neuter}
                  </span>
                </div>
                <div className="p-2 bg-white rounded border border-[#E5E0D8]">
                  <span className="text-[10px] text-[#89857E] block uppercase">Plural</span>
                  <strong className="text-sm text-[#854D0E]">
                    {currentDef.definiteArticles.plural}
                  </strong>
                  <span className="text-[11px] text-[#55534F] block mt-0.5">
                    {currentDef.indefiniteArticles.plural}
                  </span>
                </div>
              </div>
              <div className="text-[11px] text-[#89857E] border-t border-[#E5E0D8] pt-2">
                Format: <strong>Bestimmt (der/die/das)</strong> / Unbestimmt (ein/eine)
              </div>
            </div>
          </div>

          {/* Prepositions & Verbs */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#C83B32]" />
              Wichtige Signalwörter &amp; Verben
            </span>
            <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5E0D8] space-y-3">
              <div>
                <span className="text-[11px] font-mono text-[#89857E] uppercase block">
                  Typische Präpositionen:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {currentDef.keyPrepositions.map((p, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2 py-0.5 bg-white rounded border border-[#DEDAD1] text-[#171717]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-[#E5E0D8] pt-2">
                <span className="text-[11px] font-mono text-[#89857E] uppercase block">
                  Häufige Verben:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {currentDef.commonVerbs.slice(0, 6).map((v, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2 py-0.5 bg-white rounded border border-[#DEDAD1] text-[#171717]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Common Learner Mistakes */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-[#C83B32]" />
            Typische Stolpersteine &amp; Fehlerquellen
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentDef.commonMistakes.map((m, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono line-through text-[#C83B32]">
                    ✗ {m.wrong}
                  </div>
                  <div className="text-xs font-mono font-bold text-[#15803D]">
                    ✓ {m.correct}
                  </div>
                </div>
                <p className="text-[11px] text-[#55534F] leading-relaxed pt-1 border-t border-[#E5E0D8]">
                  {m.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Authentic Example Sentences */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E]">
            Musterbeispiele aus dem Institutscurriculum:
          </span>
          <div className="space-y-2.5">
            {currentDef.exampleSentences.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-[#EFECE6] hover:border-[#171717] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#FAF8F5] border border-[#DEDAD1] font-bold text-[#89857E]">
                      {ex.level}
                    </span>
                    <h4 className="text-base font-serif font-bold text-[#171717]">
                      {ex.german}
                    </h4>
                  </div>
                  <p className="text-xs font-serif italic text-[#55534F]">
                    „{ex.english}“
                  </p>
                  <p className="text-xs text-[#89857E] pt-1">
                    <strong className="text-[#171717] font-mono">Erklärung: </strong>
                    {ex.explanation}
                  </p>
                </div>

                <div className="shrink-0">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#DEDAD1] text-[#171717]">
                    {ex.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Footer Action */}
        <div className="pt-4 border-t border-[#EFECE6] flex items-center justify-between">
          <span className="text-xs text-[#89857E]">
            Möchten Sie Ihr Wissen zu {activeCase} testen?
          </span>
          <button
            onClick={() => onStartQuizForCase?.(activeCase)}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-bold text-[#C83B32] hover:underline cursor-pointer"
          >
            {activeCase}-Quiz jetzt starten
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
