import React from 'react'
import { cn } from '@/lib/utils'

interface LeadFormFieldProps {
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export const LeadFormField: React.FC<LeadFormFieldProps> = ({
  label,
  error,
  required,
  hint,
  children,
  className,
  icon,
}) => {
  return (
    <div className={cn('space-y-1.5 text-left', className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#171717] tracking-wide flex items-center gap-1.5">
          {icon && <span className="text-[#89857E]">{icon}</span>}
          <span>{label}</span>
          {required && <span className="text-[#C83B32] font-bold">*</span>}
        </label>
        {hint && !error && (
          <span className="text-[11px] text-[#89857E] font-medium">{hint}</span>
        )}
      </div>

      <div className="relative">{children}</div>

      {error && (
        <p className="text-[11px] text-[#C83B32] font-medium flex items-center gap-1 mt-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C83B32]" />
          {error}
        </p>
      )}
    </div>
  )
}
