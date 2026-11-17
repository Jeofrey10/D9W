import React from 'react'
import { ExamPreparationInfo } from '@/data/syllabus'
import { Award, ShieldCheck, AlertCircle, FileCheck } from 'lucide-react'

interface SyllabusExamPreparationProps {
  examInfo: ExamPreparationInfo
  className?: string
}

export const SyllabusExamPreparation: React.FC<SyllabusExamPreparationProps> = ({
  examInfo,
  className = '',
}) => {
  return (
    <div className={`skeuo-paper rounded-[6px] p-6 sm:p-8 border border-[#DEDAD1] space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DEDAD1]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[5px] skeuo-recessed flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 text-[#D7B95D]" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#171717]">
              Official Examination Preparation
            </h3>
            <span className="text-xs text-[#89857E] font-medium">
              {examInfo.cefrBenchmark}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center">
          {examInfo.applicableExams.map((exam, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-[4px] skeuo-badge font-mono text-[10px] font-bold text-[#171717]"
            >
              {exam}
            </span>
          ))}
        </div>
      </div>

      {/* Exam Structure & Strategies Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
        {/* Structure Breakdown */}
        <div className="p-4 rounded-[6px] skeuo-recessed space-y-2">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#171717] block flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-[#C83B32]" />
            <span>Standard Modular Exam Format:</span>
          </span>
          <p className="text-[#55534F] leading-relaxed">
            {examInfo.examStructure}
          </p>
        </div>

        {/* Strategies Checklist */}
        <div className="p-4 rounded-[6px] skeuo-recessed space-y-2">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#171717] block flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
            <span>Key Examination Strategies:</span>
          </span>
          <ul className="space-y-1.5 text-[#55534F]">
            {examInfo.keyStrategies.map((strat, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D7B95D] shrink-0 mt-1.5" />
                <span>{strat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mandatory Institutional Disclaimer */}
      <div className="p-3.5 rounded-[5px] bg-[#FAF8F5] border border-[#DEDAD1] flex items-start gap-2.5 text-[11px] text-[#55534F]">
        <AlertCircle className="w-4 h-4 text-[#89857E] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#171717]">Institutional Notice: </strong>
          {examInfo.disclaimer}
        </p>
      </div>
    </div>
  )
}
