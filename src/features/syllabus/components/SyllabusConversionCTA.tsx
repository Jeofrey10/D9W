import React from 'react'
import { Link } from 'react-router-dom'
import { SyllabusDocument, buildWhatsAppSyllabusEnquiryUrl } from '@/data/syllabus'
import { useLeadCapture } from '@/features/lead-capture'
import { MessageCircle, Calendar, Printer, ShieldCheck, HelpCircle, FileCheck } from 'lucide-react'

interface SyllabusConversionCTAProps {
  syllabus: SyllabusDocument
  onDownloadPdf: () => void
  className?: string
}

export const SyllabusConversionCTA: React.FC<SyllabusConversionCTAProps> = ({
  syllabus,
  onDownloadPdf,
  className = '',
}) => {
  const whatsappUrl = buildWhatsAppSyllabusEnquiryUrl(syllabus)
  const { openLeadModal } = useLeadCapture()

  const handleRegisterEnquiry = () => {
    openLeadModal({
      courseLevel: syllabus.level,
      enquiryType: 'Syllabus Request',
      learningMode: 'Undecided',
      source: 'Syllabus Generator',
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
            <span>Active Curriculum Roadmap:</span>
            <strong className="text-[#FFFFFF]">
              {syllabus.level} — {syllabus.title}
            </strong>
          </div>

          <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#FFFFFF] tracking-tight">
            Ready to Take the Next Step?
          </h3>

          <p className="text-sm text-[#A09C94] leading-relaxed">
            Begin your journey with the {syllabus.level} German curriculum. Whether preparing for university matriculation, healthcare licensure, or personal fluency, our academic team is here to guide your enrollment.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-[#89857E]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
              <span>Full CEFR Alignment</span>
            </span>
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#D7B95D]" />
              <span>Free 1-on-1 Academic Counseling</span>
            </span>
          </div>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
          <button
            type="button"
            onClick={handleRegisterEnquiry}
            className="skeuo-button-primary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] text-xs font-bold text-[#FFFFFF] transition-all hover:brightness-105 active:translate-y-0.5 cursor-pointer shadow-xs"
          >
            <FileCheck className="w-4 h-4 text-[#FFFFFF]" />
            <span>Register Course Enquiry ({syllabus.level})</span>
          </button>

          <button
            type="button"
            onClick={onDownloadPdf}
            className="skeuo-button-secondary inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[5px] text-xs font-bold text-[#171717] transition-all hover:text-[#C83B32] active:translate-y-0.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF Syllabus</span>
          </button>

          <div className="flex items-center gap-3 justify-center lg:justify-start pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#25D366] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Direct WhatsApp</span>
            </a>
            <span className="text-[#55534F]">&bull;</span>
            <Link
              to={`/batches?level=${syllabus.level.toLowerCase()}`}
              className="inline-flex items-center gap-1 text-xs text-[#D7B95D] hover:underline"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Batch Schedule</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
