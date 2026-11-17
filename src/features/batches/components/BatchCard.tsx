import React from 'react'
import { Link } from 'react-router-dom'
import { Batch } from '@/data/batches'
import { BatchStatusBadge } from './BatchStatusBadge'
import { formatGermanDate } from '../utils/calendarUtils'
import { buildWhatsAppBatchEnquiryUrl } from '../utils/batchUtils'
import {
  Calendar,
  Clock,
  MapPin,
  Globe2,
  MessageCircle,
  Eye,
  BookOpen,
} from 'lucide-react'

interface BatchCardProps {
  batch: Batch
  onViewDetails: (batch: Batch) => void
  className?: string
}

export const BatchCard: React.FC<BatchCardProps> = ({
  batch,
  onViewDetails,
  className = '',
}) => {
  const whatsappUrl = buildWhatsAppBatchEnquiryUrl(batch)
  const isOnline = batch.mode === 'online'

  return (
    <article
      aria-label={`${batch.level} ${batch.title}`}
      className={`skeuo-flashcard rounded-[6px] p-5 sm:p-6 flex flex-col justify-between space-y-4 transition-all duration-150 hover:-translate-y-0.5 border border-[#DEDAD1] ${className}`}
    >
      <div className="space-y-3.5">
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-[5px] skeuo-button-dark text-[#FFFFFF] font-heading font-extrabold text-sm flex items-center justify-center shrink-0">
              {batch.level}
            </span>

            <span
              className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-[4px] border ${
                isOnline
                  ? 'bg-[#EBF3FC] text-[#1E4F8A] border-[#1E4F8A]/30'
                  : 'bg-[#F2EFE9] text-[#171717] border-[#DEDAD1]'
              }`}
            >
              {isOnline ? (
                <>
                  <Globe2 className="w-3 h-3 text-[#1E4F8A]" />
                  <span>Online Live</span>
                </>
              ) : (
                <>
                  <MapPin className="w-3 h-3 text-[#C83B32]" />
                  <span>Offline Campus</span>
                </>
              )}
            </span>
          </div>

          <BatchStatusBadge status={batch.status} size="sm" />
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="font-heading font-extrabold text-base sm:text-lg text-[#171717] leading-snug">
            {batch.title}
          </h3>
          {batch.description && (
            <p className="text-xs text-[#55534F] leading-relaxed mt-1 line-clamp-2">
              {batch.description}
            </p>
          )}
        </div>

        {/* Schedule Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
          <div className="flex items-center gap-2 text-[#55534F]">
            <Calendar className="w-3.5 h-3.5 text-[#C83B32] shrink-0" />
            <span>
              Starts: <strong className="text-[#171717]">{formatGermanDate(batch.startDate)}</strong>
            </span>
          </div>

          {batch.startTime && batch.endTime && (
            <div className="flex items-center gap-2 text-[#55534F]">
              <Clock className="w-3.5 h-3.5 text-[#D7B95D] shrink-0" />
              <span>
                {batch.startTime} – {batch.endTime} {batch.timezone ? `(${batch.timezone.split(' ')[0]})` : ''}
              </span>
            </div>
          )}

          <div className="flex items-center gap-2 text-[#55534F] sm:col-span-2">
            <span className="font-mono text-[10px] uppercase font-bold text-[#89857E]">
              Schedule:
            </span>
            <span className="text-[#171717] font-medium">
              {batch.days.join(', ')}
              {batch.durationWeeks ? ` • ${batch.durationWeeks} Weeks (${batch.durationHours}h)` : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-[#DEDAD1] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onViewDetails(batch)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] text-xs font-bold text-[#171717] skeuo-button-secondary hover:text-[#C83B32] cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          <Link
            to={`/courses/${batch.level.toLowerCase()}`}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#89857E] hover:text-[#171717] hover:underline"
          >
            <BookOpen className="w-3 h-3" />
            <span>Syllabus</span>
          </Link>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-bold text-[#FFFFFF] skeuo-button-primary hover:brightness-105 active:translate-y-0.5 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Enquire on WhatsApp</span>
        </a>
      </div>
    </article>
  )
}
