import React from 'react'
import { CalendarX, RotateCcw, MessageCircle } from 'lucide-react'
import { D9W_WHATSAPP_NUMBER } from '@/data/batches'

interface BatchEmptyStateProps {
  onResetFilters: () => void
  className?: string
}

export const BatchEmptyState: React.FC<BatchEmptyStateProps> = ({
  onResetFilters,
  className = '',
}) => {
  const genericWhatsAppUrl = `https://wa.me/${D9W_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello D9W Team,\n\nI checked the batch schedule, but none of the current upcoming dates match my availability. Could you inform me about upcoming cohort releases or custom weekend schedules?\n\nThank you.'
  )}`

  return (
    <div
      className={`skeuo-paper rounded-[6px] p-8 sm:p-12 text-center border border-[#DEDAD1] space-y-4 max-w-xl mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full skeuo-recessed flex items-center justify-center mx-auto text-[#C83B32]">
        <CalendarX className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h3 className="font-heading font-extrabold text-lg sm:text-xl text-[#171717]">
          No Published Batches Found
        </h3>
        <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
          No upcoming cohorts match the selected filters. Please adjust your criteria, reset your search, or speak directly with our academic admissions desk.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onResetFilters}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-bold text-[#171717] skeuo-button-secondary hover:text-[#C83B32] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>

        <a
          href={genericWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] text-xs font-bold text-[#FFFFFF] skeuo-button-primary hover:brightness-105 active:translate-y-0.5 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Request Custom Batch Info</span>
        </a>
      </div>
    </div>
  )
}
