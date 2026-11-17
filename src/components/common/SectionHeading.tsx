import React from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  badge?: React.ReactNode
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  className,
  eyebrow,
  title,
  description,
  align = 'left',
  badge,
  children,
  ...props
}) => {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'mb-10 sm:mb-14',
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl',
        className
      )}
      {...props}
    >
      <div className={cn('flex items-center gap-3 mb-3', isCenter && 'justify-center')}>
        {eyebrow && (
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32] font-sans">
            {eyebrow}
          </span>
        )}
        {badge}
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#171717] tracking-tight font-heading leading-tight mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-base sm:text-lg text-[#55534F] leading-relaxed font-sans font-normal">
          {description}
        </p>
      )}

      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
