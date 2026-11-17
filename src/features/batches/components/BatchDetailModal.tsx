import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Batch } from '@/data/batches'
import { BatchStatusBadge } from './BatchStatusBadge'
import { formatGermanDate } from '../utils/calendarUtils'
import { buildWhatsAppBatchEnquiryUrl } from '../utils/batchUtils'
import { useLeadCapture } from '@/features/lead-capture'
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Globe2,
  Hourglass,
  MessageCircle,
  BookOpen,
  ShieldCheck,
  FileCheck,
} from 'lucide-react'

interface BatchDetailModalProps {
  batch: Batch | null
  isOpen: boolean
  onClose: () => void
}

export const BatchDetailModal: React.FC<BatchDetailModalProps> = ({
  batch,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Escape key handler & scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    // Focus close button on open
    const focusTimer = setTimeout(() => {
      modalRef.current?.focus()
    }, 50)

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
      clearTimeout(focusTimer)
    }
  }, [isOpen, onClose])

  const { openLeadModal } = useLeadCapture()

  if (!isOpen || !batch) return null

  const isOnline = batch.mode === 'online'
  const whatsappUrl = buildWhatsAppBatchEnquiryUrl(batch)

  const handleRegisterBatch = () => {
    onClose()
    openLeadModal({
      courseLevel: batch.level,
      learningMode: batch.mode === 'online' ? 'Online' : 'Offline',
      enquiryType: 'Batch Availability',
      preferredBatch: `${batch.title} (${batch.id})`,
      source: 'Batch Calendar',
    })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="batch-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto skeuo-paper-stacked rounded-[8px] p-6 sm:p-8 border border-[#DEDAD1] shadow-2xl space-y-6 focus:outline-none"
      >
        {/* Top Flag Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 flex" aria-hidden="true">
          <div className="flex-1 bg-[#171717]" />
          <div className="flex-1 bg-[#C83B32]" />
          <div className="flex-1 bg-[#D7B95D]" />
        </div>

        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pt-1 pb-4 border-b border-[#DEDAD1]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-[4px] skeuo-button-dark text-[#FFFFFF] font-heading font-extrabold text-sm flex items-center justify-center">
                {batch.level}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-[4px] border ${
                  isOnline
                    ? 'bg-[#EBF3FC] text-[#1E4F8A] border-[#1E4F8A]/30'
                    : 'bg-[#F2EFE9] text-[#171717] border-[#DEDAD1]'
                }`}
              >
                {isOnline ? (
                  <>
                    <Globe2 className="w-3.5 h-3.5 text-[#1E4F8A]" />
                    <span>Online Live Interactive Studio</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3.5 h-3.5 text-[#C83B32]" />
                    <span>Offline Campus Batch</span>
                  </>
                )}
              </span>
            </div>

            <h2
              id="batch-modal-title"
              className="text-xl sm:text-2xl font-heading font-extrabold text-[#171717] pt-1"
            >
              {batch.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close batch details dialog"
            className="p-2 rounded-[5px] text-[#55534F] hover:text-[#171717] hover:bg-[#E8E5DD] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Callout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-[6px] skeuo-recessed bg-[#FAF8F5]">
          <div className="flex items-center gap-2 text-xs text-[#55534F]">
            <ShieldCheck className="w-4 h-4 text-[#2A684C] shrink-0" />
            <span>Official D9W Published Enrollment Status:</span>
          </div>
          <BatchStatusBadge status={batch.status} />
        </div>

        {/* Schedule Specifications */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-[6px] skeuo-recessed space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#89857E] font-bold block flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-[#C83B32]" />
              <span>Cohort Timeline</span>
            </span>
            <div className="text-sm font-bold text-[#171717]">
              {formatGermanDate(batch.startDate)}
              {batch.endDate ? ` – ${formatGermanDate(batch.endDate)}` : ''}
            </div>
            {batch.durationWeeks && (
              <span className="text-[#55534F] block">
                {batch.durationWeeks} Weeks • {batch.durationHours} Teaching Hours
              </span>
            )}
          </div>

          <div className="p-3.5 rounded-[6px] skeuo-recessed space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#89857E] font-bold block flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#D7B95D]" />
              <span>Timings & Timezone</span>
            </span>
            <div className="text-sm font-bold text-[#171717]">
              {batch.startTime && batch.endTime ? `${batch.startTime} – ${batch.endTime}` : 'Schedule on request'}
            </div>
            <span className="text-[#55534F] block">
              {batch.timezone || 'CET (Central European Time)'}
            </span>
          </div>

          <div className="p-3.5 rounded-[6px] skeuo-recessed space-y-1 sm:col-span-2">
            <span className="text-[10px] font-mono uppercase text-[#89857E] font-bold block flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-[#C83B32]" />
              <span>Delivery Format & Location</span>
            </span>
            <p className="text-xs font-semibold text-[#171717]">
              {batch.location || (isOnline ? 'Online via HD Digital Studio' : 'Main Institute Campus')}
            </p>
            <p className="text-[11px] text-[#55534F]">
              {isOnline
                ? 'Live interactive lectures, recorded archives, collaborative virtual breakout rooms.'
                : 'Spacious air-conditioned seminar halls, audio listening desks, and on-campus library access.'}
            </p>
          </div>
        </div>

        {/* Batch Description & Scope */}
        {batch.description && (
          <div className="space-y-2 text-xs">
            <h4 className="font-mono font-bold uppercase tracking-wider text-[#171717]">
              Academic Overview & Focus
            </h4>
            <p className="text-sm text-[#55534F] leading-relaxed bg-[#FFFFFF] p-4 rounded-[5px] border border-[#DEDAD1]">
              {batch.description}
            </p>
          </div>
        )}

        {/* Registration Deadline Notice */}
        {batch.registrationDeadline && (
          <div className="flex items-center gap-2 text-xs text-[#89857E] px-1">
            <Hourglass className="w-3.5 h-3.5 text-[#C83B32]" />
            <span>
              Published Registration Deadline:{' '}
              <strong className="text-[#171717]">{formatGermanDate(batch.registrationDeadline)}</strong>
            </span>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-4 border-t border-[#DEDAD1] flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to={`/syllabus?level=${batch.level.toLowerCase()}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-bold text-[#171717] skeuo-button-secondary hover:text-[#C83B32] cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>View Syllabus</span>
          </Link>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleRegisterBatch}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-bold text-white skeuo-button-primary hover:brightness-105 active:translate-y-0.5 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Register Enquiry</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-[4px] text-xs font-bold text-[#171717] bg-[#E8E5DD] hover:bg-[#DCD7CD] border border-[#C8C4B7] active:translate-y-0.5 cursor-pointer"
              title="Chat directly on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
