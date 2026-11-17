import React from 'react'
import { CourseSkill } from '@/data/courseComparison'
import { Headphones, MessageSquare, BookOpen, PenTool } from 'lucide-react'

interface CourseSkillCardProps {
  skill: CourseSkill
  className?: string
}

export const CourseSkillCard: React.FC<CourseSkillCardProps> = ({
  skill,
  className = '',
}) => {
  const getIcon = () => {
    switch (skill.id) {
      case 'listening':
        return <Headphones className="w-5 h-5 text-[#1E4F8A]" />
      case 'speaking':
        return <MessageSquare className="w-5 h-5 text-[#C83B32]" />
      case 'reading':
        return <BookOpen className="w-5 h-5 text-[#2A684C]" />
      case 'writing':
        return <PenTool className="w-5 h-5 text-[#9A7D2C]" />
    }
  }

  const getBorderTopColor = () => {
    switch (skill.id) {
      case 'listening':
        return 'border-t-[#1E4F8A]' // Prussian Blue
      case 'speaking':
        return 'border-t-[#C83B32]' // Crimson Red
      case 'reading':
        return 'border-t-[#2A684C]' // Forest Moss Green
      case 'writing':
        return 'border-t-[#D7B95D]' // Muted Gold
    }
  }

  return (
    <div
      className={`skeuo-paper rounded-[6px] p-5 border border-[#DEDAD1] border-t-3 ${getBorderTopColor()} space-y-3 shadow-xs hover:-translate-y-0.5 transition-transform ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[5px] skeuo-recessed flex items-center justify-center shrink-0">
            {getIcon()}
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-base text-[#171717] leading-none">
              {skill.germanTitle}
            </h4>
            <span className="text-[11px] font-semibold text-[#89857E] uppercase tracking-wider">
              {skill.englishTitle}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[#E8E5DD] text-[#55534F] font-semibold">
          CEFR Core
        </span>
      </div>

      <p className="text-xs text-[#55534F] leading-relaxed">
        {skill.practicalCapability}
      </p>

      <div className="pt-2 border-t border-[#DEDAD1]/70">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#89857E] block mb-1">
          Example Mastery Task:
        </span>
        <p className="text-xs italic text-[#171717] font-serif bg-[#FAF8F5] p-2.5 rounded-[4px] border border-[#DEDAD1]/60">
          "{skill.exampleTask}"
        </p>
      </div>
    </div>
  )
}
