import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { ALL_VOCABULARY, searchVocabulary } from '@/data/vocabulary'
import { VocabularyItem } from '@/types/learning'
import { useGermanSpeech } from '@/hooks/useGermanSpeech'
import { useLearningProgress } from '@/hooks/useLocalStorage'
import {
  Search,
  Volume2,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  History,
  X,
  VolumeX,
  ArrowRight,
} from 'lucide-react'

export const DictionaryPage: React.FC = () => {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedLevel, setSelectedLevel] = useState<string>('All')
  const [activeTab, setActiveTab] = useState<'search' | 'favorites'>('search')

  const { speak, isPlaying, isSupported, speed, setSpeed } = useGermanSpeech()
  const { progress, toggleFavorite, isFavorite, addRecentSearch } = useLearningProgress()

  // Handle Search Input & History
  const handleSearchChange = (val: string) => {
    setQuery(val)
  }

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (query.trim()) {
      addRecentSearch(query.trim())
    }
  }

  // Filter items
  const filteredItems = useMemo(() => {
    let list: VocabularyItem[] = []

    if (activeTab === 'favorites') {
      list = ALL_VOCABULARY.filter((item) => progress.favorites.includes(item.id))
      if (query.trim()) {
        const q = query.toLowerCase()
        list = list.filter(
          (item) =>
            item.word.toLowerCase().includes(q) ||
            item.english.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q)
        )
      }
    } else if (query.trim()) {
      list = searchVocabulary(query)
    } else {
      list = ALL_VOCABULARY
    }

    // Category filter
    if (selectedCategory !== 'All') {
      list = list.filter(
        (item) => item.type === selectedCategory.toLowerCase() || item.category === selectedCategory
      )
    }

    // Level filter
    if (selectedLevel !== 'All') {
      list = list.filter((item) => item.level === selectedLevel)
    }

    return list
  }, [activeTab, query, progress.favorites, selectedCategory, selectedLevel])

  // Get article badge variant
  const getArticleBadgeVariant = (article?: string) => {
    if (article === 'der') return 'der'
    if (article === 'die') return 'die'
    if (article === 'das') return 'das'
    return 'stone'
  }

  return (
    <div className="py-10 sm:py-16">
      <Container size="xl">
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/learning-hub"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#89857E] hover:text-[#171717] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Learning Hub Overview</span>
          </Link>

          {/* Pronunciation Speed Selector */}
          {isSupported && (
            <div className="flex items-center gap-2 text-xs skeuo-recessed px-2.5 py-1 rounded-[5px]">
              <span className="text-[#89857E]">Audio Speed:</span>
              {([0.75, 1.0, 1.25] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-mono font-medium transition-all cursor-pointer ${
                    speed === s
                      ? 'skeuo-button-dark text-white shadow-xs'
                      : 'text-[#55534F] hover:bg-white/60'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Header Block */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#DEDAD1]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  Vocabulary & Lexicon Engine
                </span>
                <span className="text-[#DEDAD1]">&bull;</span>
                <Badge variant="accent" size="sm">CEFR A1–B1</Badge>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
                German Dictionary & Lexicon
              </h1>
              <p className="text-xs sm:text-sm text-[#55534F] mt-1 font-sans">
                Search verified German vocabulary with grammatical gender tags, plural inflections, IPA phonetics, and native audio.
              </p>
            </div>

            {/* Tab Toggle: Search vs. Favourites */}
            <div className="flex items-center p-1 skeuo-segmented-track rounded-[6px] self-start md:self-auto">
              <button
                onClick={() => setActiveTab('search')}
                className={`px-4 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'search'
                    ? 'skeuo-segmented-thumb-active shadow-xs'
                    : 'text-[#89857E] hover:text-[#171717]'
                }`}
              >
                All Lexicon ({ALL_VOCABULARY.length})
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 rounded-[4px] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'favorites'
                    ? 'skeuo-segmented-thumb-active text-[#C83B32] shadow-xs'
                    : 'text-[#89857E] hover:text-[#171717]'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Saved Favourites ({progress.favorites.length})</span>
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <form onSubmit={handleSearchSubmit} className="pt-6">
            <div className="relative">
              <Search className="w-5 h-5 text-[#89857E] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={
                  activeTab === 'favorites'
                    ? 'Filter your saved vocabulary words...'
                    : 'Type German or English (e.g., "Haus", "table", "der Zug", "lernen")...'
                }
                className="w-full pl-12 pr-12 py-3.5 skeuo-input rounded-[5px] text-sm sm:text-base text-[#171717] placeholder:text-[#89857E]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#89857E] hover:text-[#171717] p-1 rounded hover:bg-stone-200"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>

          {/* Recent Search Pills */}
          {activeTab === 'search' && progress.recentSearches.length > 0 && !query && (
            <div className="flex items-center gap-2 flex-wrap pt-3 text-xs text-[#89857E]">
              <span className="flex items-center gap-1">
                <History className="w-3.5 h-3.5" />
                Recent:
              </span>
              {progress.recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-2.5 py-0.5 rounded-[4px] bg-[#FFFFFF] border border-[#D2CDC3] shadow-xs text-[#55534F] hover:border-[#171717] hover:text-[#171717] cursor-pointer transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          )}

          {/* Filter Bar (Level & Category) */}
          <div className="pt-6 border-t border-[#ECE8E0] mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Level filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-[#89857E] font-medium mr-1">Level:</span>
              {['All', 'A1', 'A2', 'B1'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`text-xs px-2.5 py-1 rounded-[4px] font-medium transition-all cursor-pointer ${
                    selectedLevel === lvl
                      ? 'skeuo-button-dark text-white font-semibold'
                      : 'skeuo-button-secondary text-[#55534F]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Type filters */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs text-[#89857E] font-medium mr-1">Type:</span>
              {['All', 'Noun', 'Verb', 'Adjective', 'Phrase'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedCategory(type)}
                  className={`text-xs px-2.5 py-1 rounded-[4px] font-medium transition-all cursor-pointer ${
                    selectedCategory === type
                      ? 'skeuo-button-primary text-white font-semibold'
                      : 'skeuo-button-secondary text-[#55534F]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-4 px-1 text-xs text-[#89857E]">
          <span>
            Found <strong className="text-[#171717]">{filteredItems.length}</strong> vocabulary entries
          </span>
          {activeTab === 'favorites' && (
            <span className="text-[#C83B32] font-semibold">Saved in browser LocalStorage</span>
          )}
        </div>

        {/* Vocabulary Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#DEDAD1] rounded-[4px] p-12 text-center space-y-4">
            <p className="text-lg font-heading font-bold text-[#171717]">
              {activeTab === 'favorites'
                ? 'No favourite words saved yet'
                : 'No matching vocabulary found'}
            </p>
            <p className="text-xs text-[#55534F] max-w-md mx-auto">
              {activeTab === 'favorites'
                ? 'Click the bookmark icon on any dictionary word card to save it here for quick daily study.'
                : 'Try adjusting your search query, clearing umlauts, or resetting the level and category filters.'}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery('')
                setSelectedCategory('All')
                setSelectedLevel('All')
              }}
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const fav = isFavorite(item.id)
              const audioText = item.article ? `${item.article} ${item.word}` : item.word

              return (
                <div
                  key={item.id}
                  className="skeuo-flashcard rounded-[6px] p-5 sm:p-6 flex flex-col justify-between"
                  style={{
                    borderTopColor:
                      item.article === 'der'
                        ? '#1E4F8A'
                        : item.article === 'die'
                        ? '#C83B32'
                        : item.article === 'das'
                        ? '#2A684C'
                        : '#C83B32',
                  }}
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.article && (
                          <Badge variant={getArticleBadgeVariant(item.article)} size="sm">
                            {item.article}
                          </Badge>
                        )}
                        <Badge variant="stone" size="sm">
                          {item.level}
                        </Badge>
                        <span className="text-[11px] text-[#89857E] font-medium capitalize">
                          {item.type}
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(item.id)}
                        className={`p-1.5 rounded-[5px] transition-all cursor-pointer ${
                          fav
                            ? 'text-[#C83B32] skeuo-badge-die'
                            : 'text-[#89857E] hover:text-[#171717] hover:bg-[#F7F5F0]'
                        }`}
                        aria-label={fav ? 'Remove from favorites' : 'Save to favorites'}
                        title={fav ? 'Saved in favorites' : 'Save to favorites'}
                      >
                        {fav ? (
                          <BookmarkCheck className="w-4 h-4 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* German Word & Audio */}
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#171717] tracking-tight">
                          {item.word}
                        </h3>
                        {item.pronunciation?.ipa && (
                          <span className="text-xs font-mono text-[#89857E]">
                            [{item.pronunciation.ipa}]
                          </span>
                        )}
                      </div>

                      {/* Audio Playback Button (Tactile Knob) */}
                      <button
                        onClick={() => speak(audioText)}
                        disabled={!isSupported}
                        className={`w-9 h-9 rounded-[6px] skeuo-audio-knob flex items-center justify-center cursor-pointer ${
                          isPlaying ? 'text-[#C83B32]' : 'text-[#171717]'
                        }`}
                        title="Pronounce in German"
                        aria-label={`Listen to ${audioText}`}
                      >
                        {isSupported ? (
                          <Volume2 className="w-4 h-4" />
                        ) : (
                          <VolumeX className="w-4 h-4 text-[#89857E]" />
                        )}
                      </button>
                    </div>

                    {/* Plural Form (for Nouns) */}
                    {item.plural && (
                      <div className="text-xs text-[#55534F] mb-3">
                        <span className="text-[#89857E]">Plural:</span>{' '}
                        <strong className="text-[#171717]">die {item.plural}</strong>
                      </div>
                    )}

                    {/* Verb Details */}
                    {item.verbDetails && (
                      <div className="text-xs text-[#55534F] mb-3 skeuo-recessed p-2.5 rounded-[4px] space-y-1">
                        <div>
                          <span className="text-[#89857E]">Präsens:</span>{' '}
                          <strong className="text-[#171717]">{item.verbDetails.present3rd}</strong>
                        </div>
                        <div>
                          <span className="text-[#89857E]">Perfekt:</span>{' '}
                          <strong className="text-[#171717]">{item.verbDetails.pastPerfekt}</strong>
                        </div>
                      </div>
                    )}

                    {/* English Meaning */}
                    <div className="pt-2 border-t border-[#ECE8E0] mb-3">
                      <span className="text-xs text-[#89857E] uppercase tracking-wider block font-medium mb-0.5">
                        English
                      </span>
                      <p className="text-sm font-semibold text-[#171717]">{item.english}</p>
                    </div>

                    {/* Example Sentence (Notebook strip) */}
                    {item.example && (
                      <div className="skeuo-recessed p-3 rounded-[4px] text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-[#171717]">{item.example.german}</p>
                          <button
                            onClick={() => speak(item.example.german)}
                            className="text-[#89857E] hover:text-[#C83B32] p-0.5 cursor-pointer"
                            title="Listen to example sentence"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[#89857E] italic">{item.example.english}</p>
                      </div>
                    )}
                  </div>

                  {/* Card Footer Category */}
                  <div className="pt-4 border-t border-[#ECE8E0] mt-4 flex items-center justify-between text-[11px] text-[#89857E]">
                    <span>Category: {item.category}</span>
                    {item.suffixHint && (
                      <span className="font-mono text-[#C83B32] bg-[#FBEBEA] px-1.5 py-0.5 rounded border border-[#C83B32]/20">
                        Suffix: {item.suffixHint}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Contextual Course Recommendation */}
        <div className="mt-14 skeuo-paper-stacked rounded-[6px] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[5px] skeuo-button-gold flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-[#2D2305]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D7B95D]" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  Structured Goethe A1 Course
                </span>
              </div>
              <h4 className="text-base font-heading font-bold text-[#171717]">
                Master 500+ A1 German words with certified faculty guidance
              </h4>
              <p className="text-xs text-[#55534F] mt-1 max-w-xl">
                Self-study with tools is a great start. Join a D9W small-batch cohort (max 14 students) to speak German actively every day.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <Button to="/demo" variant="primary" size="sm" className="w-full md:w-auto" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Book Free Demo Class
            </Button>
            <Button to="/courses/a1" variant="outline" size="sm" className="w-full md:w-auto">
              View A1 Syllabus
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}
