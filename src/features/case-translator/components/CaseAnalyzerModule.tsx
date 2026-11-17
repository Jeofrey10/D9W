import React, { useState } from 'react'
import { analyzeSentence } from '../utils/caseAnalyzer'
import { SentenceAnalysisResult } from '../types/caseTranslator.types'
import { VERIFIED_CASE_EXAMPLES } from '@/data/grammar/case-examples'
import { SUPPORTED_GRAMMAR_PATTERNS } from '@/data/grammar/sentence-patterns'
import { getCaseColorStyles } from '../utils/caseColorTokens'
import {
  Search,
  Sparkles,
  Info,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export const CaseAnalyzerModule: React.FC = () => {
  const [inputText, setInputText] = useState(
    'Der Mann gibt dem Kind einen Apfel.'
  )
  const [analysis, setAnalysis] = useState<SentenceAnalysisResult>(() =>
    analyzeSentence('Der Mann gibt dem Kind einen Apfel.')
  )
  const [showPatternsModal, setShowPatternsModal] = useState(false)

  const handleAnalyze = () => {
    const result = analyzeSentence(inputText)
    setAnalysis(result)
  }

  const handleSelectExample = (germanText: string) => {
    setInputText(germanText)
    const result = analyzeSentence(germanText)
    setAnalysis(result)
  }

  const handleClear = () => {
    setInputText('')
    setAnalysis(analyzeSentence(''))
  }

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Overview */}
      <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
          <div>
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C83B32]">
              Modul A • Satzanalyse &amp; Kasuszerlegung
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#171717] mt-1">
              Kontextueller Kasus-Analyzer
            </h2>
          </div>
          <button
            onClick={() => setShowPatternsModal(true)}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-[#55534F] hover:text-[#171717] bg-[#FAF8F5] border border-[#DEDAD1] rounded-lg px-3 py-1.5 hover:shadow-xs transition-all cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D7B95D]" />
            Unterstützte Muster ansehen
          </button>
        </div>

        <p className="text-sm font-sans text-[#55534F] leading-relaxed">
          Geben Sie einen deutschen Satz ein oder wählen Sie ein kuratiertes Referenzbeispiel.
          Die regelbasierte Grammatikengine analysiert syntaktische Rollen (Subjekt, direktes/indirektes Objekt, Genitivattribut)
          und erklärt transparent, warum welcher der vier Fälle gewählt wurde.
        </p>

        {/* Built-in example pills */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-mono font-semibold text-[#89857E] uppercase tracking-wider">
            Kurierte Beispielsätze (A1–C1):
          </span>
          <div className="flex flex-wrap gap-2">
            {VERIFIED_CASE_EXAMPLES.slice(0, 6).map((ex) => (
              <button
                key={ex.id}
                onClick={() => handleSelectExample(ex.german)}
                className={cn(
                  'text-xs px-3 py-1.5 rounded-lg border font-serif transition-all cursor-pointer text-left',
                  inputText === ex.german
                    ? 'bg-[#171717] text-white border-black shadow-xs font-medium'
                    : 'bg-[#FAF8F5] text-[#55534F] border-[#DEDAD1] hover:bg-white hover:border-[#171717]'
                )}
              >
                <span className="font-mono text-[10px] text-[#D7B95D] mr-1.5 font-bold">
                  [{ex.level}]
                </span>
                {ex.german}
              </button>
            ))}
          </div>
        </div>

        {/* Input area */}
        <div className="pt-4 space-y-3">
          <div className="relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
              placeholder="z. B. Der Mann gibt dem Kind einen Apfel..."
              className="w-full text-base sm:text-lg font-serif px-4 py-3.5 bg-white border border-[#DEDAD1] rounded-xl focus:border-[#C83B32] focus:ring-2 focus:ring-[#C83B32]/10 outline-none transition-all placeholder:text-[#A09C94] shadow-xs"
            />
            {inputText && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#89857E] hover:text-[#171717] p-1 cursor-pointer"
                title="Eingabe leeren"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-[#89857E]">
              Tipp: Drücken Sie <strong>Enter</strong> oder klicken Sie auf „Satz analysieren“.
            </span>
            <button
              onClick={handleAnalyze}
              className="inline-flex items-center gap-2 bg-[#C83B32] hover:bg-[#B3342C] text-white font-sans font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md active:translate-y-px transition-all cursor-pointer"
            >
              <Search className="w-4 h-4" />
              Satz analysieren
            </button>
          </div>
        </div>
      </div>

      {/* 2. Analysis Results Card */}
      {analysis.status !== 'empty' && (
        <div className="skeuo-paper rounded-2xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          {/* Status & Confidence Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFECE6] pb-4">
            <div className="flex items-center gap-2">
              {analysis.status === 'supported' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verifiziertes Muster ({analysis.confidence}% Konfidenz)
                </span>
              ) : analysis.status === 'partial' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A]">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Teilweise erkannt ({analysis.confidence}% Konfidenz)
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FAF8F5] text-[#55534F] border border-[#DEDAD1]">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Nicht im Regelsatz ({analysis.confidence}%)
                </span>
              )}
              {analysis.patternName && (
                <span className="text-xs font-mono text-[#89857E]">
                  • {analysis.patternName}
                </span>
              )}
            </div>

            {analysis.translationGermanToEnglish && (
              <span className="text-xs font-serif italic text-[#55534F]">
                „{analysis.translationGermanToEnglish}“
              </span>
            )}
          </div>

          {/* Interactive Tokenized Visualizer */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#89857E] uppercase tracking-wider">
              Interaktive Kasus-Visualisierung:
            </span>
            <div className="p-4 sm:p-5 bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl flex flex-wrap gap-2 items-center">
              {analysis.tokens.map((token) => {
                const color = getCaseColorStyles(token.grammaticalCase)
                return (
                  <div
                    key={token.index}
                    className={cn(
                      'px-3 py-2 rounded-lg border text-sm font-serif transition-all group relative',
                      token.grammaticalCase
                        ? cn(color.bgLightClass, color.borderClass, color.textClass, 'shadow-2xs font-semibold')
                        : 'bg-white border-[#DEDAD1] text-[#171717]'
                    )}
                  >
                    <span>{token.rawToken}</span>
                    {token.grammaticalCase && (
                      <span
                        className={cn(
                          'block text-[9px] font-mono uppercase tracking-wider mt-0.5 font-bold',
                          color.textClass
                        )}
                      >
                        {token.grammaticalCase}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detailed Syntactic Breakdown Table */}
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-[#89857E] uppercase tracking-wider">
              Grammatikalische Rollenzerlegung:
            </span>
            <div className="overflow-x-auto border border-[#EFECE6] rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#FAF8F5] text-[#89857E] font-mono text-[11px] uppercase border-b border-[#EFECE6]">
                  <tr>
                    <th className="py-3 px-4">Satzglied</th>
                    <th className="py-3 px-4">Wortlaut</th>
                    <th className="py-3 px-4">Kasus</th>
                    <th className="py-3 px-4">Grammatikalische Erklärung</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6] font-sans">
                  {analysis.elements.map((el, i) => {
                    const color = getCaseColorStyles(el.caseName)
                    return (
                      <tr key={i} className="hover:bg-[#FAF8F5]/60 transition-colors">
                        <td className="py-3 px-4 font-semibold text-[#171717]">
                          {el.roleName}
                        </td>
                        <td className="py-3 px-4 font-serif font-bold text-base text-[#171717]">
                          {el.text}
                        </td>
                        <td className="py-3 px-4">
                          {el.caseName ? (
                            <span
                              className={cn(
                                'inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold',
                                color.badgeClass
                              )}
                            >
                              {el.caseName}
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-[#89857E]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs leading-relaxed text-[#55534F]">
                          {el.explanation}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Overall Summary & Educational Notes */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFECE6] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717]">
              <Sparkles className="w-4 h-4 text-[#D7B95D]" />
              Zusammenfassung der Kasuslogik
            </div>
            <p className="text-xs sm:text-sm font-sans text-[#55534F] leading-relaxed">
              {analysis.overallExplanation}
            </p>
            {analysis.limitationsNote && (
              <div className="flex items-start gap-1.5 text-[11px] text-[#89857E] pt-2 border-t border-[#EFECE6]">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#C83B32]" />
                <span>{analysis.limitationsNote}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Supported Patterns Modal */}
      {showPatternsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-xl border border-[#DEDAD1]">
            <div className="flex items-center justify-between border-b border-[#EFECE6] pb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#C83B32]">
                  D9W Grammatik-Referenz
                </span>
                <h3 className="text-xl font-serif font-bold text-[#171717]">
                  Unterstützte Satzmuster
                </h3>
              </div>
              <button
                onClick={() => setShowPatternsModal(false)}
                className="text-sm font-mono text-[#89857E] hover:text-[#171717] px-2 py-1 rounded cursor-pointer"
              >
                ✕ Schließen
              </button>
            </div>

            <div className="space-y-4">
              {SUPPORTED_GRAMMAR_PATTERNS.map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EFECE6] space-y-2 hover:border-[#171717] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#171717]">
                      {p.id} • {p.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#DEDAD1] text-[#89857E]">
                      {p.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#55534F] leading-relaxed">
                    {p.description}
                  </p>
                  <div className="p-2.5 rounded bg-white border border-[#E5E0D8] text-xs font-mono text-[#C83B32]">
                    {p.patternRegexTemplate}
                  </div>
                  <div className="text-xs font-serif italic text-[#171717]">
                    Beispiel: „{p.exampleSentence}“ ({p.exampleTranslation})
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowPatternsModal(false)}
                className="px-4 py-2 bg-[#171717] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Verstanden
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
