import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface LogoProps {
  variant?: 'navbar' | 'mobile-header' | 'mobile-drawer' | 'footer' | 'print' | 'custom'
  className?: string
  linkToHome?: boolean
  priority?: boolean
  alt?: string
  onClick?: () => void
}

const OFFICIAL_LOGO_SRC = '/assets/d9w-institute-logo.png'
const DEFAULT_ALT = 'D9W German Language Institute'

export const Logo: React.FC<LogoProps> = ({
  variant = 'navbar',
  className = '',
  linkToHome = true,
  priority = false,
  alt = DEFAULT_ALT,
  onClick,
}) => {
  const isEager = priority || variant === 'navbar' || variant === 'mobile-header'

  const sizeClasses = {
    navbar: 'w-[90px] sm:w-[105px] lg:w-[118px] max-h-[54px] sm:max-h-[58px]',
    'mobile-header': 'w-[88px] sm:w-[98px] max-h-[48px]',
    'mobile-drawer': 'w-[96px] sm:w-[108px] max-h-[54px]',
    footer: 'w-[165px] sm:w-[190px] max-h-[105px]',
    print: 'w-[125px] sm:w-[135px] max-h-[75px]',
    custom: '',
  }[variant]

  const imgElement = (
    <img
      src={OFFICIAL_LOGO_SRC}
      alt={alt}
      width={1024}
      height={682}
      loading={isEager ? 'eager' : 'lazy'}
      decoding={isEager ? 'sync' : 'async'}
      fetchPriority={isEager ? 'high' : 'auto'}
      className={cn(
        'aspect-[1024/682] h-auto object-contain transition-transform duration-200 select-none',
        sizeClasses,
        className
      )}
    />
  )

  if (!linkToHome) {
    return (
      <div className="inline-flex items-center" onClick={onClick}>
        {imgElement}
      </div>
    )
  }

  return (
    <Link
      to="/"
      onClick={onClick}
      className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[#C83B32] focus-visible:outline-offset-4 rounded-[4px] py-1 transition-opacity hover:opacity-95"
      aria-label="D9W German Language Institute Home"
    >
      {imgElement}
    </Link>
  )
}
