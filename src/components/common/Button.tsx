import React, { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  to?: string
  href?: string
  external?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      to,
      href,
      external,
      leftIcon,
      rightIcon,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium font-sans select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-brand-accent focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed text-center transition-all duration-150'

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        'skeuo-button-primary rounded-[5px]',
      secondary:
        'skeuo-button-dark rounded-[5px]',
      outline:
        'skeuo-button-secondary rounded-[5px]',
      ghost:
        'bg-transparent text-[#171717] hover:bg-[#E8E5DD]/70 active:bg-[#E8E5DD] active:translate-y-[1px] rounded-[5px]',
      gold:
        'skeuo-button-gold rounded-[5px]',
      danger:
        'bg-gradient-to-b from-red-600 to-red-700 text-white border border-red-900 shadow-[0_3px_0_#7f1d1d,0_4px_8px_rgba(185,28,28,0.3)] active:translate-y-[2px] active:shadow-[0_1px_0_#7f1d1d] rounded-[5px]',
    }

    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[32px]',
      md: 'text-sm px-4 py-2 gap-2 min-h-[40px]',
      lg: 'text-base px-6 py-2.5 gap-2.5 min-h-[48px]',
    }

    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    )

    if (to) {
      return (
        <Link to={to} className={classes}>
          {content}
        </Link>
      )
    }

    if (href) {
      return (
        <a
          href={href}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {content}
        </a>
      )
    }

    return (
      <button ref={ref} disabled={disabled || isLoading} className={classes} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
