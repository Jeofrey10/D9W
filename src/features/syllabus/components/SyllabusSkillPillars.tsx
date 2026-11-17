import React from 'react'
import { SyllabusSkillOutcomes } from '@/data/syllabus'
import { Headphones, MessageSquare, BookOpen, PenTool, CheckCircle } from 'lucide-react'

interface SyllabusSkillPillarsProps {
  skills: SyllabusSkillOutcomes
  className?: string
}

export const SyllabusSkillPillars: React.FC<SyllabusSkillPillarsProps> = ({
  skills,
  className = '',
}) => {
  const cards = [
    {
      id: 'listening',
      germanTitle: 'HÖREN',
      englishTitle: 'Listening Comprehension',
      icon: Headphones,
      borderColor: 'border-t-[#1E4F8A]',
      iconColor: 'text-[#1E4F8A]',
      badgeColor: 'bg-[#EDF3FA] text-[#1E4F8A]',
      data: skills.listening,
    },
    {
      id: 'speaking',
      germanTitle: 'SPRECHEN',
      englishTitle: 'Oral Production & Fluency',
      icon: MessageSquare,
      borderColor: 'border-t-[#C83B32]',
      iconColor: 'text-[#C83B32]',
      badgeColor: 'bg-[#FBEBEA] text-[#C83B32]',
      data: skills.speaking,
    },
    {
      id: 'reading',
      germanTitle: 'LESEN',
      englishTitle: 'Reading Comprehension',
      icon: BookOpen,
      borderColor: 'border-t-[#2A684C]',
      iconColor: 'text-[#2A684C]',
      badgeColor: 'bg-[#EDF6F1] text-[#2A684C]',
      data: skills.reading,
    },
    {
      id: 'writing',
      germanTitle: 'SCHREIBEN',
      englishTitle: 'Written Composition',
      icon: PenTool,
      borderColor: 'border-t-[#D7B95D]',
      iconColor: 'text-[#9A7D2C]',
      badgeColor: 'bg-[#FAF6E8] text-[#9A7D2C]',
      data: skills.writing,
    },
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 px-1">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-[#C83B32] font-semibold block">
            CEFR Core Linguistic Competencies
          </span>
          <h3 className="text-lg sm:text-xl font-heading font-extrabold text-[#171717]">
            The Four Language Skill Pillars
          </h3>
        </div>
        <span className="text-xs text-[#89857E]">
          Target Outcomes Across Audio, Spoken & Written German
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <div
              key={c.id}
              className={`skeuo-paper rounded-[6px] p-5 border border-[#DEDAD1] border-t-3 ${c.borderColor} space-y-3.5 flex flex-col justify-between shadow-xs transition-transform hover:-translate-y-0.5`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-[4px] skeuo-recessed flex items-center justify-center shrink-0">
                      <Icon className={`w-4 h-4 ${c.iconColor}`} />
                    </div>
                    <div>
                      <h4 className="font-heading font-extrabold text-sm text-[#171717] leading-none">
                        {c.germanTitle}
                      </h4>
                      <span className="text-[10px] font-semibold text-[#89857E] uppercase tracking-wider">
                        {c.englishTitle}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-[3px] ${c.badgeColor}`}>
                    CEFR
                  </span>
                </div>

                <p className="text-xs text-[#55534F] leading-relaxed">
                  {c.data.summary}
                </p>

                <div className="p-2.5 rounded-[4px] bg-[#FAF8F5] border border-[#DEDAD1]/70 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#89857E] block">
                    Practical Application:
                  </span>
                  <p className="text-[11px] text-[#171717] leading-normal font-medium">
                    {c.data.practicalTask}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DEDAD1]/70 flex items-start gap-1.5 text-[10px] text-[#55534F]">
                <CheckCircle className="w-3 h-3 text-[#2A684C] shrink-0 mt-0.5" />
                <span>{c.data.benchmark}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
