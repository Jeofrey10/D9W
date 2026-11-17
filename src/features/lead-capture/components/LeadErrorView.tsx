import React from 'react'
import { AlertCircle, RotateCcw, MessageCircle, ShieldAlert } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { D9W_WHATSAPP_NUMBER } from '@/config/leadCapture'

interface LeadErrorViewProps {
  message: string | null
  onRetry: () => void
  onClose: () => void
  studentName?: string
}

export const LeadErrorView: React.FC<LeadErrorViewProps> = ({
  message,
  onRetry,
  onClose,
  studentName,
}) => {
  const directWhatsAppFallbackUrl = `https://wa.me/${D9W_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello D9W Team, I attempted to submit an admissions enquiry online${
      studentName ? ` for ${studentName}` : ''
    }, but encountered a connection error. Could you assist me directly?`
  )}`

  return (
    <div className="p-6 sm:p-8 space-y-6 text-center">
      <div className="space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#C83B32]/10 border-2 border-[#C83B32]/30 text-[#C83B32] mx-auto shadow-inner">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-[#C83B32] bg-[#C83B32]/10 px-2.5 py-0.5 rounded-full font-bold">
            SUBMISSION NOT COMPLETED
          </span>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#171717] mt-1.5">
            Unable to Record Enquiry
          </h3>
          <p className="text-xs text-[#55534F] max-w-md mx-auto mt-1">
            {message ||
              'We could not save your enquiry to the admissions workbook. Your entered data has been preserved so you do not need to re-type it.'}
          </p>
        </div>
      </div>

      <div className="p-4 rounded-[6px] bg-[#FAF8F5] border border-[#DCD7CD] text-left space-y-2 text-xs text-[#55534F]">
        <div className="flex items-center gap-2 text-[#171717] font-semibold">
          <ShieldAlert className="w-4 h-4 text-[#C83B32]" />
          <span>Why did this happen?</span>
        </div>
        <p className="text-[11px]">
          The admissions integration requires confirmation from our cloud database. If there is a temporary network latency, rate limit, or backend synchronization pause, the form safely halts rather than losing your request.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button onClick={onRetry} variant="primary" size="md" className="w-full sm:w-auto">
          <RotateCcw className="w-4 h-4 mr-1.5" />
          <span>Retry Submission</span>
        </Button>
        <a
          href={directWhatsAppFallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold shadow-sm transition-all active:translate-y-0.5"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Enquire Directly on WhatsApp</span>
        </a>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-[#89857E] hover:text-[#171717] underline transition-colors"
        >
          Dismiss & Return to Website
        </button>
      </div>
    </div>
  )
}
