import React, { useState, useMemo } from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { LEARNING_TOOLS_DATA } from '@/data/learningTools'
import { LearningToolCategory, LearningToolItem } from '@/types'
import { DailyWordWidget } from '@/features/daily-word'
import { useTranslation } from '@/i18n'
import {
  BookMarked,
  Sparkles,
  Binary,
  Clock,
  Puzzle,
  Headphones,
  FileText,
  Calendar,
  Languages,
  CheckSquare,
  Search,
  ArrowRight,
  Filter,
} from 'lucide-react'

// Map icon strings to Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  BookMarked,
  Sparkles,
  Binary,
  Clock,
  Puzzle,
  Headphones,
  FileText,
  Calendar,
  Languages,
  CheckSquare,
}

export const LearningHubPage: React.FC = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories: Array<'All' | LearningToolCategory> = [
    'All',
    'Vocabulary',
    'Grammar',
    'Communication',
    'Personal Learning',
  ]

  const filteredTools = useMemo(() => {
    return LEARNING_TOOLS_DATA.filter((tool: LearningToolItem) => {
      const matchesSearch =
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === 'All' || tool.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        {/* Header */}
        <SectionHeading
          eyebrow={t('learning.hub.eyebrow')}
          title={t('learning.hub.title')}
          description={t('learning.hub.subtitle')}
        />

        {/* Featured Wort des Tages Preview */}
        <div className="mb-10 max-w-2xl">
          <DailyWordWidget />
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="skeuo-recessed rounded-[6px] p-4 sm:p-5 mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#89857E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search German tools (e.g., articles, numbers, syntax)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm skeuo-input rounded-[5px] text-[#171717] placeholder:text-[#89857E]"
                aria-label="Search learning tools"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#89857E] hover:text-[#171717] px-1.5 py-0.5 rounded hover:bg-stone-200"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills (Tactile Mechanical Switches) */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none skeuo-segmented-track rounded-[6px]" role="tablist">
              <span className="text-xs text-[#89857E] font-medium mr-1 hidden sm:inline-flex items-center gap-1 pl-1">
                <Filter className="w-3.5 h-3.5" />
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3 py-1.5 rounded-[4px] transition-all font-medium shrink-0 cursor-pointer ${
                    selectedCategory === cat
                      ? 'skeuo-segmented-thumb-active font-semibold shadow-xs'
                      : 'text-[#55534F] hover:text-[#171717] hover:bg-white/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#89857E] pt-2 border-t border-[#D2CDC3]">
            <span>
              Showing <strong className="text-[#171717]">{filteredTools.length}</strong> of{' '}
              {LEARNING_TOOLS_DATA.length} German tools
            </span>
            <span className="text-[11px] uppercase tracking-wider text-[#C83B32] font-semibold">
              Free & Open for all visitors
            </span>
          </div>
        </div>

        {/* Tools Card Grid */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFFFF] border border-[#DEDAD1] rounded-[4px] p-8">
            <p className="text-base font-heading font-bold text-[#171717] mb-2">
              No matching learning tools found
            </p>
            <p className="text-xs text-[#55534F] mb-4">
              Try adjusting your search keyword or clearing the category filter.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => {
              const IconComponent = ICON_MAP[tool.iconName] || BookMarked
              return (
                <div
                  key={tool.id}
                  className="skeuo-paper rounded-[6px] p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-all group"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-10 h-10 rounded-[5px] skeuo-recessed flex items-center justify-center text-[#C83B32] group-hover:bg-[#C83B32] group-hover:text-white transition-colors">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Badge variant="stone" size="sm">
                          {tool.category}
                        </Badge>
                        <Badge variant="gold" size="sm">
                          {tool.levelRange}
                        </Badge>
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-lg font-heading font-bold text-[#171717] mb-2 group-hover:text-[#C83B32] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  {/* Card Footer Action */}
                  <div className="pt-4 border-t border-[#ECE8E0] flex items-center justify-between">
                    {tool.status === 'Ready' ? (
                      <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Active Engine
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono uppercase text-[#89857E]">
                        Status: {tool.status}
                      </span>
                    )}
                    <Button
                      to={tool.slug}
                      variant={tool.status === 'Ready' ? 'primary' : 'outline'}
                      size="sm"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />}
                    >
                      {tool.status === 'Ready' ? 'Launch Tool' : 'Explore'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Phase 02 Active Interactive Suite Banner */}
        <div className="mt-14 p-6 skeuo-paper-stacked rounded-[6px] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C83B32]">
              Phase 02 Interactive Learning Suite
            </h4>
            <p className="text-xs text-[#55534F]">
              Five core engines (Dictionary, Article Explorer, Number Trainer, Time Trainer, Sentence Builder) plus the 30-Question CEFR Level Assessment are now fully operational with native German speech synthesis.
            </p>
          </div>
          <Button to="/assessment" variant="secondary" size="sm" className="shrink-0">
            Take Level Assessment
          </Button>
        </div>
      </Container>
    </div>
  )
}
