import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from '@/i18n'
import { SUPPORTED_LANGUAGES } from '@/i18n/types'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile' | 'compact'
  className?: string
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'desktop',
  className = '',
}) => {
  const { language, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((lang) => lang.code === language) || SUPPORTED_LANGUAGES[1]

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // --- MOBILE PRESENTATION (Segmented Switch for Mobile Drawer) ---
  if (variant === 'mobile') {
    return (
      <div
        className={cn(
          'w-full p-1 rounded-[6px] bg-[#ECE8DF] border border-[#DEDAD1] grid grid-cols-2 gap-1 shadow-inner',
          className
        )}
        role="group"
        aria-label="Language selection"
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = lang.code === language
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={cn(
                'flex items-center justify-center gap-2 py-2 px-3 rounded-[4px] text-xs font-semibold transition-all min-h-[44px] cursor-pointer',
                isActive
                  ? 'bg-white text-[#171717] shadow-xs border border-[#D2CDC3] font-bold'
                  : 'text-[#66635C] hover:text-[#171717] hover:bg-white/40'
              )}
              aria-pressed={isActive}
              aria-label={lang.ariaLabel}
            >
              <span className="text-base" aria-hidden="true">
                {lang.flag}
              </span>
              <span>{lang.nativeLabel}</span>
              {isActive && <Check className="w-3.5 h-3.5 text-[#C83B32] ml-0.5" />}
            </button>
          )
        })}
      </div>
    )
  }

  // --- DESKTOP PRESENTATION (Compact Dropdown with Animation & Keyboard Support) ---
  return (
    <div className={cn('relative inline-block text-left', className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentLanguage.nativeLabel}. Click to change language.`}
        className={cn(
          'inline-flex items-center gap-2 px-2.5 py-1.5 text-xs font-semibold rounded-[5px] border transition-all cursor-pointer font-sans select-none',
          'bg-[#FFFFFF] border-[#D2CDC3] text-[#171717] shadow-[0_1px_2px_rgba(23,23,23,0.05),inset_0_1px_0_rgba(255,255,255,1)]',
          'hover:bg-[#FAF8F5] hover:border-[#B5B0A4] focus-visible:outline-2 focus-visible:outline-[#C83B32]',
          isOpen && 'border-[#C83B32] ring-1 ring-[#C83B32]/30'
        )}
      >
        <span className="text-sm leading-none" aria-hidden="true">
          {currentLanguage.flag}
        </span>
        <span className="font-heading tracking-tight">{currentLanguage.nativeLabel}</span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-[#89857E] transition-transform duration-200',
            isOpen && 'rotate-180 text-[#C83B32]'
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          aria-label="Select language"
          className={cn(
            'absolute right-0 mt-1.5 w-40 rounded-[6px] bg-[#FFFFFF] border border-[#DEDAD1] shadow-lg py-1 z-50',
            'animate-in fade-in slide-in-from-top-1 duration-150 ease-out'
          )}
        >
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = lang.code === language
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-[#FAF6E8] text-[#8C7225] font-bold'
                    : 'text-[#171717] hover:bg-[#F7F5F0]'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">
                    {lang.flag}
                  </span>
                  <span className="font-heading">{lang.nativeLabel}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#8C7225]" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
