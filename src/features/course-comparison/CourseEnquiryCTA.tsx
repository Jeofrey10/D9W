import React from 'react'
import { Link } from 'react-router-dom'
import { CefrLevel } from '@/types'
import {
  COURSE_COMPARISON_LEVELS,
  buildWhatsAppCourseEnquiryUrl,
} from '@/data/courseComparison'
import { useLeadCapture } from '@/features/lead-capture'
import { MessageCircle, ArrowRight, ShieldCheck, HelpCircle, FileCheck } from 'lucide-react'

interface CourseEnquiryCTAProps {
  selectedLevel: CefrLevel
  className?: string
}

export const CourseEnquiryCTA: React.FC<CourseEnquiryCTAProps> = ({
  selectedLevel,
  className = '',
}) => {
  const course = COURSE_COMPARISON_LEVELS[selectedLevel]
  const whatsappUrl = buildWhatsAppCourseEnquiryUrl(selectedLevel)
  const { openLeadModal } = useLeadCapture()

  const handleOpenLeadModal = () => {
    openLeadModal({
      courseLevel: selectedLevel,
      enquiryType: 'Course Enquiry',
      learningMode: 'Undecided',
      source: 'Course Comparison',
    })
  }

  return (
    <div
      className={`skeuo-recessed-dark rounded-[8px] p-6 sm:p-10 text-[#F7F5F0] border border-[#333333] relative overflow-hidden ${className}`}
    >
      {/* Decorative top tricolor indicator */}
      <div className="absolute top-0 left-0 right-0 h-1 flex" aria-hidden="true">
        <div className="flex-1 bg-[#171717]" />
        <div className="flex-1 bg-[#C83B32]" />
        <div className="flex-1 bg-[#D7B95D]" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-[4px] bg-[#2A2A2A] text-xs font-mono font-semibold text-[#D7B95D] border border-[#3D3D3D]">
            <span>Active Inquiry Focus:</span>
            <strong className="text-[#FFFFFF]">
              {course.level} — {course.name}
            </strong>
          </div>

          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#FFFFFF] tracking-tight">
            Ready to Start Your German Journey?
          </h3>

          <p className="text-sm text-[#A09C94] leading-relaxed">
            Talk to our team and find the right learning path. Whether you are aiming for visa certification, university admission, healthcare licensure, or personal enrichment, our academic advisors are ready to guide you.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#89857E]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
              <span>Free 1-on-1 Academic Consultation</span>
            </span>
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#D7B95D]" />
              <span>Unbiased CEFR Level Recommendation</span>
            </span>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            type="button"
            onClick={handleOpenLeadModal}
            className="skeuo-button-primary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] text-xs font-bold text-[#FFFFFF] transition-all hover:brightness-105 active:translate-y-0.5 cursor-pointer"
          >
            <FileCheck className="w-4 h-4 text-[#FFFFFF]" />
            <span>Register Enquiry ({course.level})</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="skeuo-button-secondary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] text-xs font-bold text-[#171717] transition-all hover:text-[#25D366] active:translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>Direct WhatsApp ({course.level})</span>
          </a>

          <Link
            to="/demo"
            className="inline-flex items-center justify-center gap-1.5 text-xs text-[#D7B95D] hover:underline pt-1"
          >
            <span>Book Free Live Demo Class</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
