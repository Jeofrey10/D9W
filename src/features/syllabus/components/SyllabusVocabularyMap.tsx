import React from 'react'
import { Link } from 'react-router-dom'
import { VocabularyThemeItem } from '@/data/syllabus'
import { BookOpen, ArrowRight, Search } from 'lucide-react'

interface SyllabusVocabularyMapProps {
  vocabularyItems: VocabularyThemeItem[]
  className?: string
}

export const SyllabusVocabularyMap: React.FC<SyllabusVocabularyMapProps> = ({
  vocabularyItems,
  className = '',
}) => {
  return (
    <div className={`skeuo-paper rounded-[6px] p-5 sm:p-7 border border-[#DEDAD1] space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DEDAD1]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-[4px] skeuo-recessed flex items-center justify-center shrink-0">
            <BookOpen className="w-4 h-4 text-[#D7B95D]" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base text-[#171717]">
              Thematic Vocabulary Clusters
            </h3>
            <span className="text-[11px] font-semibold text-[#89857E]">
              Core Communicative Lexicon & Example Headwords
            </span>
          </div>
        </div>

        <Link
          to="/dictionary"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C83B32] hover:underline"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Explore in German Dictionary</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {vocabularyItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-[5px] skeuo-recessed bg-[#FAF8F5] space-y-2 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono font-bold text-[#D7B95D] uppercase block mb-1">
                Themenfeld • Modul {item.moduleRef}
              </span>
              <h4 className="font-heading font-bold text-xs text-[#171717]">
                {item.theme}
              </h4>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {item.exampleWords.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className="px-2 py-0.5 rounded-[3px] bg-[#FFFFFF] border border-[#DEDAD1] text-[10px] font-mono font-medium text-[#171717]"
                >
                  {word}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
