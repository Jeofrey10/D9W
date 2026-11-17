import React, { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import {
  CaseAnalyzerModule,
  FourCaseCardsModule,
  ArticleTransformationModule,
  PrepositionTrainerModule,
  InteractiveCaseQuizModule,
  SentenceCaseBuilderModule,
  ContextualCaseReferenceModule,
  GrammarProgressDashboard,
  GrammaticalCase,
} from '@/features/case-translator'
import {
  Search,
  BookOpen,
  Sliders,
  Compass,
  HelpCircle,
  Puzzle,
  FileText,
  BarChart3,
  Sparkles,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type ModuleTabId =
  | 'analyzer'
  | 'cases'
  | 'articles'
  | 'prepositions'
  | 'quiz'
  | 'builder'
  | 'reference'
  | 'progress'

interface ModuleTab {
  id: ModuleTabId
  label: string
  germanLabel: string
  icon: React.ElementType
  badge?: string
}

const MODULE_TABS: ModuleTab[] = [
  {
    id: 'analyzer',
    label: 'Sentence Analyzer',
    germanLabel: 'Satz-Analyzer',
    icon: Search,
    badge: 'Modul A',
  },
  {
    id: 'cases',
    label: '4 Cases Cards',
    germanLabel: 'Die 4 Fälle',
    icon: BookOpen,
    badge: 'Modul B',
  },
  {
    id: 'articles',
    label: 'Article Trainer',
    germanLabel: 'Deklination',
    icon: Sliders,
    badge: 'Modul C',
  },
  {
    id: 'prepositions',
    label: 'Prepositions',
    germanLabel: 'Präpositionen',
    icon: Compass,
    badge: 'Modul D',
  },
  {
    id: 'quiz',
    label: 'Case Quiz',
    germanLabel: 'Kasus-Quiz',
    icon: HelpCircle,
    badge: 'Modul E',
  },
  {
    id: 'builder',
    label: 'Sentence Builder',
    germanLabel: 'Satzbaukasten',
    icon: Puzzle,
    badge: 'Modul F',
  },
  {
    id: 'reference',
    label: 'Reference Library',
    germanLabel: 'Bibliothek',
    icon: FileText,
    badge: 'Modul G',
  },
  {
    id: 'progress',
    label: 'My Progress',
    germanLabel: 'Lernfortschritt',
    icon: BarChart3,
    badge: 'Modul H',
  },
]

export const CaseTranslatorPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab: ModuleTabId = useMemo(() => {
    const tabParam = searchParams.get('tab') as ModuleTabId
    if (tabParam && MODULE_TABS.some((t) => t.id === tabParam)) {
      return tabParam
    }
    return 'analyzer'
  }, [searchParams])

  const handleTabChange = (tabId: ModuleTabId) => {
    setSearchParams({ tab: tabId })
  }

  const handleLaunchQuizForCase = (c: GrammaticalCase) => {
    setSearchParams({ tab: 'quiz', case: c })
  }

  return (
    <div className="py-10 sm:py-16 space-y-10">
      <Container size="xl">
        {/* Breadcrumb & Institutional Header */}
        <div className="space-y-6">
          <nav className="flex items-center gap-2 text-xs font-mono text-[#89857E]" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-[#171717] transition-colors">
              Institut
            </Link>
            <span>/</span>
            <Link to="/learning-hub" className="hover:text-[#171717] transition-colors">
              Learning Hub
            </Link>
            <span>/</span>
            <span className="text-[#171717] font-semibold">Kasus-Übersetzer &amp; Grammatik</span>
          </nav>

          {/* Hero Presentation */}
          <div className="skeuo-paper rounded-2xl p-6 sm:p-10 border-t-4 border-t-[#C83B32] space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#FEF2F2] text-[#C83B32] border border-[#FECACA]">
                <Sparkles className="w-3.5 h-3.5" />
                P03-08 • Deutsche Grammatik-Engine
              </span>
              <span className="text-xs font-mono text-[#89857E]">
                Nominativ • Akkusativ • Dativ • Genitiv
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#DEDAD1] text-[#171717]">
                A1–C1 CEFR
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#171717] tracking-tight">
              Kontextueller Kasus-Übersetzer &amp; Grammatik-Engine
            </h1>

            <p className="text-base sm:text-lg font-sans text-[#55534F] max-w-3xl leading-relaxed">
              Verstehen, deklinieren und meistern Sie die vier deutschen Fälle.
              Erkennen Sie syntaktische Rollen (Subjekt, direktes Objekt, indirektes Objekt, Genitivattribut),
              erforschen Sie die Präpositionsrektion und trainieren Sie mit interaktiven Satzbaukasten- und Quizübungen.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#89857E]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1E293B]" />
                <span>1. Fall: Nominativ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C83B32]" />
                <span>4. Fall: Akkusativ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#15803D]" />
                <span>3. Fall: Dativ</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#854D0E]" />
                <span>2. Fall: Genitiv</span>
              </div>
            </div>
          </div>
        </div>

        {/* 8 Module Navigation Bar (Tactile Segmented Strip) */}
        <div className="sticky top-20 z-30 bg-[#F7F5F0]/95 backdrop-blur-md py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div
            className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none skeuo-segmented-track rounded-xl p-1.5 border border-[#DEDAD1]"
            role="tablist"
            aria-label="Grammatik-Module"
          >
            {MODULE_TABS.map((tab) => {
              const Icon = tab.icon
              const isSelected = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    'px-3.5 py-2 rounded-lg text-xs font-sans font-medium shrink-0 transition-all cursor-pointer flex items-center gap-2',
                    isSelected
                      ? 'bg-white text-[#171717] font-bold shadow-xs border border-[#171717]'
                      : 'text-[#55534F] hover:text-[#171717] hover:bg-white/60'
                  )}
                >
                  <Icon className={cn('w-4 h-4', isSelected ? 'text-[#C83B32]' : 'text-[#89857E]')} />
                  <span>{tab.germanLabel}</span>
                  {tab.badge && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-[#FAF8F5] border border-[#DEDAD1] text-[#89857E]">
                      {tab.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Module Renderer */}
        <div className="pt-2">
          {activeTab === 'analyzer' && <CaseAnalyzerModule />}
          {activeTab === 'cases' && (
            <FourCaseCardsModule onStartQuizForCase={handleLaunchQuizForCase} />
          )}
          {activeTab === 'articles' && <ArticleTransformationModule />}
          {activeTab === 'prepositions' && <PrepositionTrainerModule />}
          {activeTab === 'quiz' && <InteractiveCaseQuizModule />}
          {activeTab === 'builder' && <SentenceCaseBuilderModule />}
          {activeTab === 'reference' && <ContextualCaseReferenceModule />}
          {activeTab === 'progress' && <GrammarProgressDashboard />}
        </div>
      </Container>
    </div>
  )
}
