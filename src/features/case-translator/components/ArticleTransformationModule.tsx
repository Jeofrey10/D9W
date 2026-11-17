import React, { useState } from 'react'
import {
  DEFINITE_ARTICLES,
  INDEFINITE_ARTICLES,
  NEGATIVE_ARTICLES,
  NOUN_ENDINGS_RULES,
  POSSESSIVE_BASE_WORDS,
  getArticleForm,
} from '@/data/grammar/articles'
import {
  ArticleType,
  GrammaticalCase,
  GrammaticalGender,
} from '../types/caseTranslator.types'
import { getCaseColorStyles } from '../utils/caseColorTokens'
import {
  Sliders,
  Table as TableIcon,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const ArticleTransformationModule: React.FC = () => {
  const [selectedGender, setSelectedGender] =
    useState<GrammaticalGender>('masculine')
  const [selectedCase, setSelectedCase] = useState<GrammaticalCase>('Nominativ')
  const [selectedType, setSelectedType] = useState<ArticleType>('definite')
  const [possessiveStem, setPossessiveStem] = useState<string>('mein')
  const [activeTab, setActiveTab] = useState<'calculator' | 'tables' | 'endings'>('calculator')

  const cases: GrammaticalCase[] = ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv']
  const genders: { id: GrammaticalGender; label: string; example: string }[] = [
    { id: 'masculine', label: 'Maskulin (der)', example: 'Mann / Tisch' },
    { id: 'feminine', label: 'Feminin (die)', example: 'Frau / Lampe' },
    { id: 'neuter', label: 'Neutrum (das)', example: 'Kind / Buch' },
    { id: 'plural', label: 'Plural (die)', example: 'Kinder / Tische' },
  ]
  const types: { id: ArticleType; label: string }[] = [
    { id: 'definite', label: 'Bestimmt (der/die/das)' },
    { id: 'indefinite', label: 'Unbestimmt (ein/eine)' },
    { id: 'negative', label: 'Negation (kein/keine)' },
    { id: 'possessive', label: 'Possessiv (mein/dein...)' },
  ]

  const calculatedForm = getArticleForm(
    selectedType,
    selectedCase,
    selectedGender,
    possessiveStem
  )
  const caseColor = getCaseColorStyles(selectedCase)

  return (
    <div className="space-y-6">
      {/* 1. Module Header */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Modul C • Deklinationstrainer
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
              Artikel-Transformation &amp; Nomenendungen
            </h2>
          </div>

          {/* Sub-view switches */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#DEDAD1]">
            <button
              onClick={() => setActiveTab('calculator')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer',
                activeTab === 'calculator'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#89857E] hover:text-[#171717]'
              )}
            >
              <Sliders className="w-3.5 h-3.5 inline mr-1" />
              Interaktiver Rechner
            </button>
            <button
              onClick={() => setActiveTab('tables')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer',
                activeTab === 'tables'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#89857E] hover:text-[#171717]'
              )}
            >
              <TableIcon className="w-3.5 h-3.5 inline mr-1" />
              Übersichtstabellen
            </button>
            <button
              onClick={() => setActiveTab('endings')}
              className={cn(
                'text-xs px-3 py-1.5 rounded-lg font-sans font-medium transition-all cursor-pointer',
                activeTab === 'endings'
                  ? 'bg-white text-[#171717] shadow-xs font-semibold'
                  : 'text-[#89857E] hover:text-[#171717]'
              )}
            >
              <BookOpen className="w-3.5 h-3.5 inline mr-1" />
              Nomenendungen (-s / -n)
            </button>
          </div>
        </div>

        <p className="text-sm font-sans text-[#55534F] leading-relaxed">
          Wählen Sie Genus (Geschlecht), Kasus (Fall) und Artikeltyp, um die exakte Artikelform
          sowie die zugehörigen grammatikalischen Nomenendungen (z. B. Genitiv-Endungen <code>-s/-es</code> und Dativ-Plural <code>-n</code>) abzurufen.
        </p>
      </div>

      {/* VIEW 1: Interactive Transformation Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
          {/* Controls Column */}
          <div className="lg:col-span-2 skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6">
            {/* 1. Article Type Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] block">
                1. Artikeltyp wählen:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {types.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedType(t.id)}
                    className={cn(
                      'p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer text-center',
                      selectedType === t.id
                        ? 'bg-[#171717] text-white border-black shadow-xs font-semibold'
                        : 'bg-[#FAF8F5] text-[#55534F] border-[#E5E0D8] hover:bg-white'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Possessive stem selector (if possessive active) */}
            {selectedType === 'possessive' && (
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
                <span className="text-xs font-mono font-semibold text-[#89857E] uppercase block">
                  Besitzendes Pronomen wählen:
                </span>
                <div className="flex flex-wrap gap-2">
                  {POSSESSIVE_BASE_WORDS.map((p) => (
                    <button
                      key={p.stem}
                      onClick={() => setPossessiveStem(p.stem)}
                      className={cn(
                        'text-xs px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer',
                        possessiveStem === p.stem
                          ? 'bg-[#D7B95D] text-black font-bold border-amber-600 shadow-2xs'
                          : 'bg-white text-[#55534F] border-[#DEDAD1] hover:border-black'
                      )}
                    >
                      {p.stem}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Grammatical Gender Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] block">
                2. Genus (Geschlecht) wählen:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {genders.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGender(g.id)}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all cursor-pointer',
                      selectedGender === g.id
                        ? 'bg-white text-[#171717] border-[#171717] shadow-sm font-semibold'
                        : 'bg-[#FAF8F5] text-[#55534F] border-[#E5E0D8] hover:bg-white'
                    )}
                  >
                    <span className="text-xs font-serif font-bold block">
                      {g.label}
                    </span>
                    <span className="text-[10px] font-mono text-[#89857E] block mt-0.5">
                      z. B. {g.example}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Case Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E] block">
                3. Kasus (Fall) wählen:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {cases.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedCase(c)}
                    className={cn(
                      'p-3 rounded-xl border text-left transition-all cursor-pointer',
                      selectedCase === c
                        ? 'bg-white text-[#171717] border-[#171717] shadow-sm font-semibold'
                        : 'bg-[#FAF8F5] text-[#55534F] border-[#E5E0D8] hover:bg-white'
                    )}
                  >
                    <span className="text-xs font-mono font-bold uppercase block text-[#89857E]">
                      {c === 'Nominativ' && '1. Fall'}
                      {c === 'Genitiv' && '2. Fall'}
                      {c === 'Dativ' && '3. Fall'}
                      {c === 'Akkusativ' && '4. Fall'}
                    </span>
                    <span className="text-sm font-serif font-bold text-[#171717] block mt-0.5">
                      {c}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Display Card */}
          <div className={cn('skeuo-paper rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6', caseColor.pillBorder)}>
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#89857E]">
                Ergebnis-Vorschau:
              </span>

              <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E5E0D8] text-center space-y-3">
                <span className="text-[11px] font-mono uppercase text-[#89857E] block">
                  {selectedType} • {selectedGender} • {selectedCase}
                </span>

                <div className="text-4xl sm:text-5xl font-serif font-bold text-[#171717] py-2">
                  {calculatedForm}
                </div>

                {selectedGender === 'plural' && selectedCase === 'Dativ' && (
                  <div className="text-xs font-mono text-[#15803D] bg-white p-2 rounded-lg border border-[#BBF7D0]">
                    + Extra „-n“ am Nomen (z. B. den Kindern)
                  </div>
                )}

                {selectedCase === 'Genitiv' && (selectedGender === 'masculine' || selectedGender === 'neuter') && (
                  <div className="text-xs font-mono text-[#854D0E] bg-white p-2 rounded-lg border border-[#FEF08A]">
                    + Endung „-s“ oder „-es“ am Nomen (z. B. des Mannes)
                  </div>
                )}
              </div>

              {/* Contextual Explanation */}
              <div className="text-xs text-[#55534F] leading-relaxed space-y-2">
                <p>
                  <strong>Regel: </strong>
                  {selectedCase === 'Akkusativ' && selectedGender === 'masculine' && (
                    'Im Akkusativ maskulin ändert sich die Endung immer auf „-en“ (den, einen, keinen, meinen).'
                  )}
                  {selectedCase === 'Dativ' && (selectedGender === 'masculine' || selectedGender === 'neuter') && (
                    'Im Dativ maskulin und neutrum endet der Artikel immer auf „-em“ (dem, einem, keinem, meinem).'
                  )}
                  {selectedCase === 'Dativ' && selectedGender === 'feminine' && (
                    'Im Dativ feminin endet der Artikel auf „-er“ (der, einer, keiner, meiner).'
                  )}
                  {selectedCase === 'Genitiv' && (selectedGender === 'masculine' || selectedGender === 'neuter') && (
                    'Im Genitiv maskulin und neutrum lautet die Endung „-es“ (des, eines, keines, meines).'
                  )}
                  {selectedCase === 'Genitiv' && (selectedGender === 'feminine' || selectedGender === 'plural') && (
                    'Im Genitiv feminin und plural lautet die Endung „-er“ (der, keiner, meiner).'
                  )}
                  {selectedCase === 'Nominativ' && (
                    'Im Nominativ behält der Artikel seine Grundform als Subjekt des Satzes.'
                  )}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#EFECE6] text-[11px] text-[#89857E]">
              D9W Institut • Präzise Deklination nach CEFR-Standard
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Complete Reference Tables */}
      {activeTab === 'tables' && (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-8 animate-fadeIn">
          {/* Definite Articles Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-[#171717] flex items-center justify-between">
              <span>Bestimmte Artikel (der, die, das, die)</span>
              <span className="text-xs font-mono font-normal text-[#89857E]">Definite</span>
            </h3>
            <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm font-sans">
                <thead className="bg-[#FAF8F5] text-[#89857E] font-mono text-[11px] uppercase border-b border-[#E5E0D8]">
                  <tr>
                    <th className="py-3 px-4">Kasus</th>
                    <th className="py-3 px-4 text-[#1E3A8A]">Maskulin</th>
                    <th className="py-3 px-4 text-[#C83B32]">Feminin</th>
                    <th className="py-3 px-4 text-[#15803D]">Neutrum</th>
                    <th className="py-3 px-4 text-[#854D0E]">Plural</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {cases.map((c) => (
                    <tr key={c} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#171717]">{c}</td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#1E3A8A]">
                        {DEFINITE_ARTICLES.declension[c].masculine}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#C83B32]">
                        {DEFINITE_ARTICLES.declension[c].feminine}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#15803D]">
                        {DEFINITE_ARTICLES.declension[c].neuter}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#854D0E]">
                        {DEFINITE_ARTICLES.declension[c].plural}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Indefinite Articles Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-[#171717] flex items-center justify-between">
              <span>Unbestimmte Artikel (ein, eine, ein)</span>
              <span className="text-xs font-mono font-normal text-[#89857E]">Indefinite</span>
            </h3>
            <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm font-sans">
                <thead className="bg-[#FAF8F5] text-[#89857E] font-mono text-[11px] uppercase border-b border-[#E5E0D8]">
                  <tr>
                    <th className="py-3 px-4">Kasus</th>
                    <th className="py-3 px-4 text-[#1E3A8A]">Maskulin</th>
                    <th className="py-3 px-4 text-[#C83B32]">Feminin</th>
                    <th className="py-3 px-4 text-[#15803D]">Neutrum</th>
                    <th className="py-3 px-4 text-[#854D0E]">Plural</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {cases.map((c) => (
                    <tr key={c} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#171717]">{c}</td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#1E3A8A]">
                        {INDEFINITE_ARTICLES.declension[c].masculine}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#C83B32]">
                        {INDEFINITE_ARTICLES.declension[c].feminine}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#15803D]">
                        {INDEFINITE_ARTICLES.declension[c].neuter}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-sm text-[#89857E] italic">
                        {INDEFINITE_ARTICLES.declension[c].plural}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Negative Articles Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-serif font-bold text-[#171717] flex items-center justify-between">
              <span>Negationsartikel (kein, keine, kein, keine)</span>
              <span className="text-xs font-mono font-normal text-[#89857E]">Negative</span>
            </h3>
            <div className="overflow-x-auto border border-[#E5E0D8] rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm font-sans">
                <thead className="bg-[#FAF8F5] text-[#89857E] font-mono text-[11px] uppercase border-b border-[#E5E0D8]">
                  <tr>
                    <th className="py-3 px-4">Kasus</th>
                    <th className="py-3 px-4 text-[#1E3A8A]">Maskulin</th>
                    <th className="py-3 px-4 text-[#C83B32]">Feminin</th>
                    <th className="py-3 px-4 text-[#15803D]">Neutrum</th>
                    <th className="py-3 px-4 text-[#854D0E]">Plural</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {cases.map((c) => (
                    <tr key={c} className="hover:bg-[#FAF8F5]/60 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#171717]">{c}</td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#1E3A8A]">
                        {NEGATIVE_ARTICLES.declension[c].masculine}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#C83B32]">
                        {NEGATIVE_ARTICLES.declension[c].feminine}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#15803D]">
                        {NEGATIVE_ARTICLES.declension[c].neuter}
                      </td>
                      <td className="py-3 px-4 font-serif font-bold text-base text-[#854D0E]">
                        {NEGATIVE_ARTICLES.declension[c].plural}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Noun Endings Rules (-s/-es and Dative +n) */}
      {activeTab === 'endings' && (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          {/* Genitive masculine/neuter */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#171717]">
              {NOUN_ENDINGS_RULES.genitiveMasculineNeuter.title}
            </h3>
            <p className="text-sm text-[#55534F] leading-relaxed">
              {NOUN_ENDINGS_RULES.genitiveMasculineNeuter.explanation}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NOUN_ENDINGS_RULES.genitiveMasculineNeuter.rules.map((r, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-serif font-bold text-[#C83B32]">
                      Endung: {r.ending}
                    </span>
                  </div>
                  <p className="text-xs text-[#55534F]">{r.condition}</p>
                  <ul className="text-xs font-mono text-[#171717] space-y-1 pt-2 border-t border-[#E5E0D8]">
                    {r.examples.map((ex, j) => (
                      <li key={j}>• {ex}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Exceptions */}
            <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-2">
              <span className="text-xs font-mono font-bold uppercase text-[#C83B32]">
                Wichtige Ausnahme: N-Deklination (Schwache Maskulina)
              </span>
              <p className="text-xs text-[#55534F]">
                {NOUN_ENDINGS_RULES.genitiveMasculineNeuter.exceptions[0].description}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[#171717]">
                {NOUN_ENDINGS_RULES.genitiveMasculineNeuter.exceptions[0].examples.map((ex, k) => (
                  <span key={k} className="px-2 py-0.5 bg-white rounded border border-[#FECACA]">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dative Plural +n */}
          <div className="space-y-4 pt-6 border-t border-[#EFECE6]">
            <h3 className="text-xl font-serif font-bold text-[#171717]">
              {NOUN_ENDINGS_RULES.dativePlural.title}
            </h3>
            <p className="text-sm text-[#55534F] leading-relaxed">
              {NOUN_ENDINGS_RULES.dativePlural.explanation}
            </p>

            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] space-y-2">
              <div className="flex flex-wrap gap-3 font-mono text-xs text-[#171717]">
                {NOUN_ENDINGS_RULES.dativePlural.rules[0].examples.map((ex, m) => (
                  <span key={m} className="px-2.5 py-1 bg-white rounded-lg border border-[#E5E0D8]">
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
