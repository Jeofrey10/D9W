import React from 'react'
import { SyllabusModule } from '@/data/syllabus'
import {
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen,
  Headphones,
  MessageSquare,
  PenTool,
  CheckCircle2,
} from 'lucide-react'

interface SyllabusModuleAccordionProps {
  modules: SyllabusModule[]
  expandedModules: Set<string>
  onToggleModule: (id: string) => void
  onExpandAll: () => void
  onCollapseAll: () => void
  className?: string
}

export const SyllabusModuleAccordion: React.FC<SyllabusModuleAccordionProps> = ({
  modules,
  expandedModules,
  onToggleModule,
  onExpandAll,
  onCollapseAll,
  className = '',
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header Bar with Expand/Collapse Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#C83B32] font-semibold block">
            Systematic Learning Progression
          </span>
          <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#171717]">
            Module-by-Module Curriculum
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center text-xs">
          <button
            type="button"
            onClick={onExpandAll}
            className="px-2.5 py-1 rounded-[4px] skeuo-button-secondary text-[#171717] hover:text-[#C83B32] font-bold cursor-pointer"
          >
            Expand All
          </button>
          <button
            type="button"
            onClick={onCollapseAll}
            className="px-2.5 py-1 rounded-[4px] skeuo-button-secondary text-[#171717] hover:text-[#C83B32] font-bold cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-3">
        {modules.map((mod) => {
          const isExpanded = expandedModules.has(mod.id)

          return (
            <div
              key={mod.id}
              className={`rounded-[6px] border transition-all duration-150 overflow-hidden ${
                isExpanded
                  ? 'skeuo-paper-stacked border-[#DEDAD1] shadow-xs'
                  : 'skeuo-flashcard border-[#DEDAD1] hover:border-[#C83B32]/40'
              }`}
            >
              {/* Accordion Header / Trigger */}
              <button
                type="button"
                onClick={() => onToggleModule(mod.id)}
                aria-expanded={isExpanded}
                aria-controls={`module-content-${mod.id}`}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C83B32]"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-[4px] skeuo-button-dark text-[#FFFFFF] font-heading font-extrabold text-xs flex items-center justify-center shrink-0">
                    M{mod.moduleNumber}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-sm sm:text-base text-[#171717] leading-snug">
                      {mod.germanTitle}
                    </h4>
                    <p className="text-xs text-[#89857E] font-medium">
                      {mod.title} • {mod.grammarTopics.length} Grammar Topics • {mod.vocabularyThemes.length} Vocabulary Themes
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-[#89857E]">
                    {isExpanded ? 'Hide Details' : 'View Module'}
                  </span>
                  <div className="w-7 h-7 rounded-[4px] skeuo-recessed flex items-center justify-center text-[#171717]">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#C83B32]" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Accordion Expanded Content */}
              {isExpanded && (
                <div
                  id={`module-content-${mod.id}`}
                  className="p-5 sm:p-6 border-t border-[#DEDAD1] bg-[#FFFFFF] space-y-5 text-xs"
                >
                  {/* Module Summary */}
                  <p className="text-sm text-[#55534F] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-[5px] border border-[#DEDAD1]/70">
                    {mod.description}
                  </p>

                  {/* Learning Objectives */}
                  <div className="space-y-2">
                    <span className="font-mono font-bold uppercase tracking-wider text-[#171717] block">
                      Target Learning Competencies:
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[#55534F]">
                      {mod.learningObjectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2A684C] shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Grammar Topics & Vocabulary Themes Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {/* Grammar Topics */}
                    <div className="p-3.5 rounded-[5px] skeuo-recessed space-y-2">
                      <span className="font-mono font-bold uppercase tracking-wider text-[#171717] text-[11px] block flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#C83B32]" />
                        <span>Grammar Coverage:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {mod.grammarTopics.map((g, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-[3px] bg-[#FFFFFF] border border-[#DEDAD1] text-[11px] text-[#171717] font-medium"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Vocabulary Themes */}
                    <div className="p-3.5 rounded-[5px] skeuo-recessed space-y-2">
                      <span className="font-mono font-bold uppercase tracking-wider text-[#171717] text-[11px] block flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#D7B95D]" />
                        <span>Vocabulary Themes:</span>
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {mod.vocabularyThemes.map((v, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-[3px] bg-[#FFFFFF] border border-[#DEDAD1] text-[11px] text-[#55534F] font-medium"
                          >
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Four-Skill Practical Activities */}
                  <div className="space-y-2 pt-2">
                    <span className="font-mono font-bold uppercase tracking-wider text-[#171717] block">
                      Skill Activities in Class & Studio:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-2.5 rounded-[4px] border border-[#DEDAD1] bg-[#FAF8F5] space-y-1">
                        <span className="font-bold text-[#1E4F8A] flex items-center gap-1 text-[11px]">
                          <Headphones className="w-3 h-3" />
                          <span>Hören (Listening):</span>
                        </span>
                        <p className="text-[11px] text-[#55534F] leading-normal">{mod.skillActivities.listening}</p>
                      </div>

                      <div className="p-2.5 rounded-[4px] border border-[#DEDAD1] bg-[#FAF8F5] space-y-1">
                        <span className="font-bold text-[#C83B32] flex items-center gap-1 text-[11px]">
                          <MessageSquare className="w-3 h-3" />
                          <span>Sprechen (Speaking):</span>
                        </span>
                        <p className="text-[11px] text-[#55534F] leading-normal">{mod.skillActivities.speaking}</p>
                      </div>

                      <div className="p-2.5 rounded-[4px] border border-[#DEDAD1] bg-[#FAF8F5] space-y-1">
                        <span className="font-bold text-[#2A684C] flex items-center gap-1 text-[11px]">
                          <BookOpen className="w-3 h-3" />
                          <span>Lesen (Reading):</span>
                        </span>
                        <p className="text-[11px] text-[#55534F] leading-normal">{mod.skillActivities.reading}</p>
                      </div>

                      <div className="p-2.5 rounded-[4px] border border-[#DEDAD1] bg-[#FAF8F5] space-y-1">
                        <span className="font-bold text-[#9A7D2C] flex items-center gap-1 text-[11px]">
                          <PenTool className="w-3 h-3" />
                          <span>Schreiben (Writing):</span>
                        </span>
                        <p className="text-[11px] text-[#55534F] leading-normal">{mod.skillActivities.writing}</p>
                      </div>
                    </div>
                  </div>

                  {/* Suggested Activities */}
                  {mod.suggestedActivities.length > 0 && (
                    <div className="pt-2 border-t border-[#DEDAD1]/70 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#89857E]">
                        Recommended Practice:
                      </span>
                      {mod.suggestedActivities.map((act, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-[3px] bg-[#E8E5DD] text-[#171717] text-[10px] font-semibold"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
