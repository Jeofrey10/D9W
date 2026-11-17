import React from 'react'
import { Link } from 'react-router-dom'
import { GrammarMapItem } from '@/data/syllabus'
import { Layers, ArrowRight, Sparkles } from 'lucide-react'

interface SyllabusGrammarMapProps {
  grammarItems: GrammarMapItem[]
  className?: string
}

export const SyllabusGrammarMap: React.FC<SyllabusGrammarMapProps> = ({
  grammarItems,
  className = '',
}) => {
  return (
    <div className={`skeuo-paper rounded-[6px] p-5 sm:p-7 border border-[#DEDAD1] space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DEDAD1]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[4px] skeuo-recessed flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4 text-[#C83B32]" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base text-[#171717]">
              Grammar Progression Map
            </h3>
            <span className="text-[11px] font-semibold text-[#89857E]">
              {grammarItems.length} Key Structural Pillars
            </span>
          </div>
        </div>

        <Link
          to="/sentence-builder"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C83B32] hover:underline"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Practice on Sentence Builder</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {grammarItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-[5px] skeuo-recessed bg-[#FAF8F5] space-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] font-mono font-bold text-[#C83B32] uppercase">
                  Modul {item.moduleRef}
                </span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#E8E5DD] text-[#55534F]">
                  {item.level}
                </span>
              </div>
              <h4 className="font-heading font-bold text-xs text-[#171717]">
                {item.topic}
              </h4>
            </div>
            <p className="text-[11px] text-[#55534F] leading-normal">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
