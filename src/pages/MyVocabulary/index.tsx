import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { useReadingVocabulary } from '@/features/reading/hooks/useReadingVocabulary'
import {
  downloadVocabularyCsv,
  formatVocabularyItemForCopy,
} from '@/features/reading/utils/vocabularyExport'
import { getGenderStyles } from '@/features/reading/utils/vocabularyLookup'
import { CefrLevel } from '@/types/learning'
import { cn } from '@/lib/utils'
import {
  Download,
  Search,
  BookOpen,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  BookmarkX,
} from 'lucide-react'

export const MyVocabularyPage: React.FC = () => {
  const { savedWords, removeWord, clearAllVocabulary, totalSaved } =
    useReadingVocabulary()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel | 'ALL'>('ALL')
  const [selectedGender, setSelectedGender] = useState<'der' | 'die' | 'das' | 'ALL'>('ALL')
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  // Filter and sort saved words
  const filteredWords = useMemo(() => {
    return savedWords.filter((item) => {
      if (selectedLevel !== 'ALL' && item.level !== selectedLevel) {
        return false
      }
      if (selectedGender !== 'ALL' && item.article !== selectedGender) {
        return false
      }
      if (selectedType !== 'ALL' && item.wordType !== selectedType) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const wordMatch = item.word.toLowerCase().includes(q)
        const englishMatch = item.englishMeaning.toLowerCase().includes(q)
        const contextMatch = item.contextMeaning.toLowerCase().includes(q)
        if (!wordMatch && !englishMatch && !contextMatch) return false
      }
      return true
    })
  }, [savedWords, selectedLevel, selectedGender, selectedType, searchQuery])

  const handleCopyWord = (item: typeof savedWords[0]) => {
    const text = formatVocabularyItemForCopy(item)
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  const handleExportCsv = () => {
    downloadVocabularyCsv(filteredWords.length > 0 ? filteredWords : savedWords)
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] pb-24">
      {/* Top Accent Bar */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-[#171717]" />
        <div className="flex-1 bg-[#C83B32]" />
        <div className="flex-1 bg-[#D7B95D]" />
      </div>

      <Container size="xl" className="pt-8 sm:pt-12 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DEDAD1] pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#89857E]">
              <Link
                to="/reading-practice"
                className="inline-flex items-center gap-1 font-semibold text-[#171717] hover:text-[#C83B32] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Lese-Praxis
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717]">
              Mein Wortschatz
            </h1>
            <p className="text-sm text-[#55534F] max-w-xl">
              Ihre persönliche Sammlung unbekannter Wörter aus den Lesetexten.
              Exportieren Sie Ihre Liste für Karteikarten (Anki / Quizlet) oder
              vertiefen Sie die Grammatik.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={savedWords.length === 0}
              onClick={handleExportCsv}
              className={cn(
                'inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold shadow-sm transition-all',
                savedWords.length > 0
                  ? 'bg-[#171717] text-white hover:bg-[#333333]'
                  : 'bg-[#E8E5DD] text-[#89857E] cursor-not-allowed'
              )}
            >
              <Download className="h-4 w-4 text-[#D7B95D]" />
              Als CSV exportieren
            </button>

            {savedWords.length > 0 && (
              <button
                type="button"
                onClick={() => setShowClearConfirm(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-[#DEDAD1] bg-white px-3.5 py-2.5 text-xs font-semibold text-[#C83B32] hover:bg-[#FEF2F2] transition-colors"
              >
                <Trash2 className="h-4 w-4" />
                Alle löschen
              </button>
            )}
          </div>
        </div>

        {/* Clear Confirmation Modal / Bar */}
        {showClearConfirm && (
          <div className="rounded-xl border border-[#FECACA] bg-[#FEF2F2] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-[#C83B32]">
              Möchten Sie wirklich alle {totalSaved} gespeicherten Wörter unwiderruflich löschen?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="rounded-lg bg-white px-3 py-1.5 font-medium text-[#55534F] border border-[#DEDAD1]"
              >
                Abbrechen
              </button>
              <button
                type="button"
                onClick={() => {
                  clearAllVocabulary()
                  setShowClearConfirm(false)
                }}
                className="rounded-lg bg-[#C83B32] px-3 py-1.5 font-bold text-white shadow-sm"
              >
                Ja, alle löschen
              </button>
            </div>
          </div>
        )}

        {/* Search & Filter Toolbar */}
        {savedWords.length > 0 && (
          <div className="rounded-2xl border border-[#DEDAD1] bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#89857E]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Gespeicherte Wörter oder Bedeutungen suchen..."
                  className="w-full rounded-xl border border-[#DEDAD1] bg-[#FAF8F5] pl-10 pr-4 py-2 text-xs sm:text-sm text-[#171717] focus:border-[#171717] focus:bg-white focus:outline-none"
                />
              </div>

              {/* CEFR Level Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
                {(['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSelectedLevel(lvl)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-mono font-bold transition-all',
                      selectedLevel === lvl
                        ? 'bg-[#171717] text-white'
                        : 'bg-[#FAF8F5] text-[#55534F] hover:bg-[#EFECE6]'
                    )}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Gender Filter */}
              <div className="flex items-center gap-1 border-l border-[#DEDAD1] pl-3">
                {(['ALL', 'der', 'die', 'das'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-mono font-bold uppercase transition-all',
                      selectedGender === g
                        ? 'bg-[#C83B32] text-white'
                        : 'bg-[#FAF8F5] text-[#55534F] hover:bg-[#EFECE6]'
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>

              {/* Word Type Filter */}
              <div className="flex items-center gap-1 border-l border-[#DEDAD1] pl-3">
                {[
                  { key: 'ALL', label: 'Alle Typen' },
                  { key: 'noun', label: 'Nomen' },
                  { key: 'verb', label: 'Verben' },
                  { key: 'adjective', label: 'Adjektive' },
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setSelectedType(t.key)}
                    className={cn(
                      'rounded-lg px-2.5 py-1 text-xs font-medium transition-all',
                      selectedType === t.key
                        ? 'bg-[#171717] text-white font-semibold'
                        : 'bg-[#FAF8F5] text-[#55534F] hover:bg-[#EFECE6]'
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Vocabulary Grid */}
        {savedWords.length === 0 ? (
          /* Empty State: No words saved yet */
          <div className="rounded-2xl border border-dashed border-[#DEDAD1] bg-white p-12 sm:p-16 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FAF8F5] text-[#89857E] border border-[#DEDAD1]">
              <BookmarkX className="h-8 w-8 text-[#89857E]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-serif font-bold text-[#171717]">
                Noch keine Wörter gespeichert
              </h3>
              <p className="text-sm text-[#55534F] max-w-md mx-auto leading-relaxed">
                Klicken Sie während des Lesens auf ein deutsches Wort und wählen Sie
                "Wort speichern", um Vokabeln hier dauerhaft zu sichern.
              </p>
            </div>

            <Link
              to="/reading-practice"
              className="inline-flex items-center gap-2 rounded-xl bg-[#171717] px-6 py-3 text-xs font-semibold text-white shadow-sm hover:bg-[#333333] transition-colors"
            >
              <BookOpen className="h-4 w-4" />
              Jetzt Texte lesen &amp; Wörter sammeln
            </Link>
          </div>
        ) : filteredWords.length === 0 ? (
          /* Empty State for current filter */
          <div className="rounded-xl border border-[#DEDAD1] bg-white p-8 text-center text-xs text-[#89857E]">
            Keine Wörter für die gewählte Filterkombination gefunden.
          </div>
        ) : (
          /* Word Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredWords.map((item) => {
              const gender = item.article
                ? getGenderStyles(item.article)
                : getGenderStyles()

              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex flex-col justify-between rounded-xl border bg-white p-5 shadow-xs transition-all hover:shadow-md',
                    gender.borderAccent
                  )}
                >
                  <div className="space-y-3">
                    {/* Header: Word & Actions */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.article && (
                          <span
                            className={cn(
                              'rounded px-1.5 py-0.5 text-xs font-mono font-bold uppercase',
                              gender.badgeBg
                            )}
                          >
                            {item.article}
                          </span>
                        )}
                        <h3 className="text-lg font-serif font-bold text-[#171717]">
                          {item.word}
                        </h3>
                        <span className="rounded bg-[#F7F5F0] px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#89857E] border border-[#DEDAD1]">
                          {item.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopyWord(item)}
                          className="rounded p-1 text-[#89857E] hover:bg-[#F7F5F0] hover:text-[#171717] transition-colors"
                          title="Eintrag kopieren"
                        >
                          {copiedId === item.id ? (
                            <Check className="h-4 w-4 text-[#15803D]" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => removeWord(item.word, item.article)}
                          className="rounded p-1 text-[#89857E] hover:bg-[#FEF2F2] hover:text-[#C83B32] transition-colors"
                          title="Aus Sammlung entfernen"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Plural info if noun */}
                    {item.plural && (
                      <div className="text-xs text-[#55534F]">
                        Plural:{' '}
                        <strong className="text-[#171717]">{item.plural}</strong>
                      </div>
                    )}

                    {/* Meanings */}
                    <div className="rounded-lg bg-[#FAF8F5] p-2.5 border border-[#EFECE6] space-y-1">
                      <div className="text-xs font-semibold text-[#171717]">
                        {item.englishMeaning}
                      </div>
                      {item.contextMeaning &&
                        item.contextMeaning !== item.englishMeaning && (
                          <div className="text-[11px] text-[#55534F]">
                            <span className="text-[#89857E]">Kontext: </span>
                            {item.contextMeaning}
                          </div>
                        )}
                    </div>

                    {/* Example Sentence */}
                    {item.exampleSentence && (
                      <div className="text-xs italic text-[#55534F] border-l-2 border-[#D7B95D] pl-2">
                        "{item.exampleSentence}"
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-[#EFECE6] flex items-center justify-between text-[11px] text-[#89857E]">
                    <span className="truncate max-w-[140px]" title={item.sourcePassageTitle}>
                      Aus: {item.sourcePassageTitle}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {item.article && (
                        <Link
                          to="/article-explorer"
                          className="text-[#55534F] hover:text-[#C83B32] p-1"
                          title="Artikel üben"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                        </Link>
                      )}
                      <Link
                        to={`/dictionary?q=${encodeURIComponent(item.baseForm || item.word)}`}
                        className="text-[#55534F] hover:text-[#171717] p-1"
                        title="Im Wörterbuch öffnen"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}
