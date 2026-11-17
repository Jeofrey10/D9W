import React from 'react'
import { BatchStatus } from '@/data/batches'

interface BatchStatusBadgeProps {
  status: BatchStatus
  size?: 'sm' | 'md'
  className?: string
}

export const BatchStatusBadge: React.FC<BatchStatusBadgeProps> = ({
  status,
  size = 'md',
  className = '',
}) => {
  const sizeClasses =
    size === 'sm'
      ? 'text-[10px] px-2 py-0.5'
      : 'text-[11px] px-2.5 py-1'

  const getStatusConfig = () => {
    switch (status) {
      case 'open':
        return {
          label: 'REGISTRATION OPEN',
          bg: 'bg-[#EDF6F1]',
          text: 'text-[#2A684C]',
          border: 'border-[#2A684C]/30',
          dot: 'bg-[#2A684C]',
          aria: 'Registration is currently open',
        }
      case 'filling-fast':
        return {
          label: 'FILLING FAST',
          bg: 'bg-[#FAF6E8]',
          text: 'text-[#9A7D2C]',
          border: 'border-[#D7B95D]/40',
          dot: 'bg-[#D7B95D]',
          aria: 'Batch is filling fast as announced by the institute',
        }
      case 'full':
        return {
          label: 'BATCH FULL',
          bg: 'bg-[#E8E5DD]',
          text: 'text-[#55534F]',
          border: 'border-[#DEDAD1]',
          dot: 'bg-[#89857E]',
          aria: 'Batch has reached capacity and is full',
        }
      case 'coming-soon':
        return {
          label: 'COMING SOON',
          bg: 'bg-[#FBEBEA]',
          text: 'text-[#C83B32]',
          border: 'border-[#C83B32]/30',
          dot: 'bg-[#C83B32]',
          aria: 'Cohort announced; registration opens soon',
        }
    }
  }

  const config = getStatusConfig()

  return (
    <span
      role="status"
      aria-label={config.aria}
      className={`inline-flex items-center gap-1.5 font-mono font-bold tracking-wider uppercase rounded-[4px] border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shrink-0`} aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  )
}
