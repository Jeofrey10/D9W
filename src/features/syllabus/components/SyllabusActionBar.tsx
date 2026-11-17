import React from 'react'
import { Link } from 'react-router-dom'
import { SyllabusDocument, buildWhatsAppSyllabusEnquiryUrl } from '@/data/syllabus'
import { useLeadCapture } from '@/features/lead-capture'
import { useTranslation } from '@/i18n'
import { Printer, MessageCircle, Calendar, FileCheck } from 'lucide-react'

interface SyllabusActionBarProps {
  syllabus: SyllabusDocument
  onDownloadPdf: () => void
  className?: string
}

export const SyllabusActionBar: React.FC<SyllabusActionBarProps> = ({
  syllabus,
  onDownloadPdf,
  className = '',
}) => {
  const { isGerman } = useTranslation()
  const whatsappUrl = buildWhatsAppSyllabusEnquiryUrl(syllabus)
  const { openLeadModal } = useLeadCapture()

  const handleRequestSyllabus = () => {
    openLeadModal({
      courseLevel: syllabus.level,
      enquiryType: 'Syllabus Request',
      learningMode: 'Undecided',
      source: 'Syllabus Generator',
    })
  }

  return (
    <div
      className={`skeuo-paper rounded-[6px] p-4 sm:p-5 border border-[#DEDAD1] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 ${className}`}
    >
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-[5px] skeuo-button-primary text-[#FFFFFF] font-heading font-extrabold text-base flex items-center justify-center shrink-0">
          {syllabus.level}
        </span>
        <div>
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#171717] leading-tight">
            {syllabus.title}
          </h3>
          <p className="text-xs text-[#55534F] font-mono mt-0.5">
            {syllabus.subtitle} • {syllabus.hoursTotal}{' '}
            {isGerman
              ? `Unterrichtsstunden (${syllabus.durationWeeks} Wochen)`
              : `Teaching Hours (${syllabus.durationWeeks} Weeks)`}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onDownloadPdf}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-[5px] text-xs font-bold text-[#FFFFFF] skeuo-button-primary hover:brightness-105 active:translate-y-0.5 cursor-pointer shadow-xs"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>{isGerman ? 'Lehrplan herunterladen (PDF)' : 'Download Syllabus (PDF)'}</span>
        </button>

        <button
          type="button"
          onClick={handleRequestSyllabus}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[5px] text-xs font-bold text-[#171717] bg-[#E8E5DD] hover:bg-[#DCD7CD] border border-[#C8C4B7] active:translate-y-0.5 cursor-pointer"
        >
          <FileCheck className="w-3.5 h-3.5 text-[#C83B32]" />
          <span>{isGerman ? 'Beratung anfordern' : 'Request Consultation'}</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[5px] text-xs font-bold text-[#171717] skeuo-button-secondary hover:text-[#25D366] active:translate-y-0.5 cursor-pointer"
          title="Direct WhatsApp chat"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
          <span>WhatsApp</span>
        </a>

        <Link
          to={`/batches?level=${syllabus.level.toLowerCase()}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[5px] text-xs font-bold text-[#171717] skeuo-button-secondary hover:text-[#C83B32] active:translate-y-0.5"
        >
          <Calendar className="w-3.5 h-3.5 text-[#D7B95D]" />
          <span>{isGerman ? 'Kurskalender' : 'Batch Schedule'}</span>
        </Link>
      </div>
    </div>
  )
}
