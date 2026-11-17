import React from 'react'
import { cn } from '@/lib/utils'

export type BadgeVariant =
  | 'default'
  | 'accent'
  | 'gold'
  | 'stone'
  | 'der'
  | 'die'
  | 'das'
  | 'outline'
  | 'success'

export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  size = 'md',
  icon,
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center font-medium font-sans border rounded-[4px] tracking-wide uppercase transition-all select-none'

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }

  const variantStyles: Record<BadgeVariant, string> = {
    default: 'skeuo-button-dark text-white border-[#0D0D0D] py-0.5',
    accent: 'skeuo-badge-die font-semibold',
    gold: 'bg-gradient-to-b from-[#FAF6E8] to-[#F2E6C2] text-[#8C7225] border-[#D7B95D]/50 shadow-[0_1px_2px_rgba(215,185,93,0.15)] font-semibold',
    stone: 'skeuo-badge text-[#55534F]',
    der: 'skeuo-badge-der lowercase font-mono font-bold tracking-normal',
    die: 'skeuo-badge-die lowercase font-mono font-bold tracking-normal',
    das: 'skeuo-badge-das lowercase font-mono font-bold tracking-normal',
    outline: 'bg-transparent text-[#55534F] border-[#BFB9AA] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
    success: 'bg-gradient-to-b from-emerald-50 to-emerald-100 text-emerald-800 border-emerald-300 shadow-[0_1px_2px_rgba(16,185,129,0.1)]',
  }

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)} {...props}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  )
}
