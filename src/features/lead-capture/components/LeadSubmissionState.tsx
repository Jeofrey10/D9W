import React from 'react'
import { Loader2, ShieldCheck } from 'lucide-react'

interface LeadSubmissionStateProps {
  status: 'validating' | 'submitting'
}

export const LeadSubmissionState: React.FC<LeadSubmissionStateProps> = ({ status }) => {
  return (
    <div className="py-12 px-6 text-center space-y-4">
      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#C83B32]/10 animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-[#171717] flex items-center justify-center text-white shadow-md">
          <Loader2 className="w-7 h-7 animate-spin text-[#D7B95D]" />
        </div>
      </div>

      <div className="space-y-1.5 max-w-sm mx-auto">
        <h4 className="text-base font-heading font-bold text-[#171717]">
          {status === 'validating'
            ? 'Validating Enquiry Details...'
            : 'Registering with D9W Admissions CRM...'}
        </h4>
        <p className="text-xs text-[#55534F]">
          Securing your reservation slot and updating the central institute schedule. Please do not close this window.
        </p>
      </div>

      <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#89857E]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
        <span>Encrypted 256-bit TLS connection to D9W Academic Server</span>
      </div>
    </div>
  )
}
