import React from 'react'
import { CheckCircle2, MessageCircle, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Badge } from '@/components/common/Badge'
import { SubmittedSummary } from '../hooks/useLeadSubmission'
import { buildRegisteredLeadWhatsAppUrl } from '../services/leadPayload'

interface LeadSuccessViewProps {
  summary: SubmittedSummary
  onClose: () => void
}

export const LeadSuccessView: React.FC<LeadSuccessViewProps> = ({ summary, onClose }) => {
  const [copied, setCopied] = React.useState(false)

  const whatsappUrl = buildRegisteredLeadWhatsAppUrl({
    leadId: summary.leadId,
    fullName: summary.fullName,
    courseLevel: summary.courseLevel,
    learningMode: summary.learningMode,
    enquiryType: summary.enquiryType,
  })

  const copyLeadId = () => {
    navigator.clipboard.writeText(summary.leadId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 sm:p-8 space-y-6 text-center">
      {/* Tactile Ink Stamp / Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#2E7D32]/10 border-2 border-[#2E7D32]/30 text-[#2E7D32] mx-auto shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div>
          <span className="text-[10px] font-mono tracking-wider uppercase text-[#2E7D32] bg-[#2E7D32]/10 px-2.5 py-0.5 rounded-full font-bold">
            CONFIRMED &bull; RECORDED IN CRM
          </span>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#171717] mt-1.5">
            Enquiry Registered Successfully
          </h3>
          <p className="text-xs text-[#55534F] max-w-md mx-auto mt-1">
            Thank you, <strong className="text-[#171717]">{summary.fullName}</strong>. Your enquiry has been safely recorded in our admissions database. An academic counsellor will review your request.
          </p>
        </div>
      </div>

      {/* Physical Lead ID Ticket Card */}
      <div className="skeuo-paper-stacked rounded-[6px] p-4 text-left border border-[#DCD7CD] bg-[#FAF8F5] relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-3 mb-3">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#89857E] font-bold block">
              Official Lead Reference
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-lg font-mono font-bold text-[#C83B32] tracking-wide">
                {summary.leadId}
              </span>
              <button
                type="button"
                onClick={copyLeadId}
                title="Copy Lead ID"
                className="p-1 rounded text-[#89857E] hover:text-[#171717] hover:bg-[#E8E5DD] transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#2E7D32]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <Badge variant="das" size="sm">
            Status: New
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-[11px] text-[#89857E] block">Course Level:</span>
            <span className="font-semibold text-[#171717]">{summary.courseLevel}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#89857E] block">Learning Mode:</span>
            <span className="font-semibold text-[#171717]">{summary.learningMode}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#89857E] block">Enquiry Type:</span>
            <span className="font-semibold text-[#171717]">{summary.enquiryType}</span>
          </div>
          <div>
            <span className="text-[11px] text-[#89857E] block">Contact Number:</span>
            <span className="font-semibold text-[#171717] font-mono">{summary.phone}</span>
          </div>
          {summary.preferredBatch && (
            <div className="col-span-2">
              <span className="text-[11px] text-[#89857E] block">Preferred Batch:</span>
              <span className="font-semibold text-[#171717]">{summary.preferredBatch}</span>
            </div>
          )}
        </div>
      </div>

      {/* WhatsApp Optional Follow-Up CTA */}
      <div className="p-4 rounded-[6px] bg-[#25D366]/10 border border-[#25D366]/30 text-left space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#171717]">
              Want an instant response on WhatsApp?
            </h4>
            <p className="text-[11px] text-[#55534F] mt-0.5">
              Click below to initiate an official conversation with our admissions desk. Your Lead Reference and details are pre-filled automatically.
            </p>
          </div>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-[4px] bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold shadow-sm transition-all active:translate-y-0.5"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Continue on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Dialog Close & Trust Footer */}
      <div className="space-y-3">
        <Button onClick={onClose} variant="outline" size="sm" className="w-full">
          Close Window
        </Button>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#89857E]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
          <span>Record registered under D9W Admissions Reference Protocol &bull; No spam guaranteed</span>
        </div>
      </div>
    </div>
  )
}
