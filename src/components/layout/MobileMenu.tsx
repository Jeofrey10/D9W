import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { X, ArrowRight, BookOpen, GraduationCap, Compass, PhoneCall, Calendar, Phone, MessageCircle } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { Logo } from '@/components/common/Logo'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { useTranslation } from '@/i18n'
import { businessInfo, getGeneralEnquiryWhatsAppUrl } from '@/config/business'
import { cn } from '@/lib/utils'

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const navLinks = [
    { label: t('common.nav.home'), path: '/', icon: Compass },
    { label: `${t('common.nav.courses')} (A1–C1)`, path: '/courses', icon: GraduationCap },
    { label: `${t('common.nav.syllabus')} (A1–C1)`, path: '/syllabus' },
    { label: t('common.nav.batches'), path: '/batches', icon: Calendar },
    { label: t('common.nav.learningHub'), path: '/learning-hub', icon: BookOpen },
    { label: t('common.nav.onlineClasses'), path: '/online-classes' },
    { label: t('common.nav.offlineClasses'), path: '/offline-classes' },
    { label: t('common.nav.assessment'), path: '/assessment', badge: t('common.nav.freeBadge') },
    { label: t('common.nav.about'), path: '/about' },
    { label: t('common.nav.contact'), path: '/contact', icon: PhoneCall },
  ]

  return (
    <div
      className="fixed inset-0 z-50 lg:hidden flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#171717]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div className="relative w-full max-w-sm ml-auto h-full bg-[#F7F5F0] border-l border-[#DEDAD1] shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DEDAD1] bg-[#FFFFFF]">
          <Logo variant="mobile-drawer" onClick={onClose} />

          <button
            onClick={onClose}
            className="p-2 text-[#55534F] hover:text-[#171717] rounded-[4px] hover:bg-[#E8E5DD] focus:outline-2 focus:outline-[#C83B32]"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Language Selector */}
        <div className="p-4 border-b border-[#DEDAD1] bg-[#FAF8F5]">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#89857E] block mb-2 font-mono">
            Language / Sprache
          </span>
          <LanguageSwitcher variant="mobile" />
        </div>

        {/* Links */}
        <nav className="p-5 flex-1 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex items-center justify-between px-3.5 py-3 rounded-[4px] text-sm font-medium transition-colors font-sans',
                    isActive
                      ? 'bg-[#FFFFFF] text-[#C83B32] font-semibold border-l-3 border-[#C83B32] shadow-xs'
                      : 'text-[#171717] hover:bg-[#E8E5DD]/70'
                  )
                }
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-4 h-4 text-[#89857E]" />}
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#FAF6E8] text-[#9A7D2C] border border-[#D7B95D]/30">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Action Bottom Section */}
        <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t border-[#DEDAD1] bg-[#FFFFFF] space-y-3">
          <Button
            to="/demo"
            variant="primary"
            size="lg"
            className="w-full justify-between"
            onClick={onClose}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t('common.buttons.bookFreeDemo')}
          </Button>

          <Button
            to="/courses"
            variant="outline"
            size="md"
            className="w-full"
            onClick={onClose}
          >
            {t('common.nav.exploreAllCourses')}
          </Button>

          {/* Quick Direct Actions for Mobile */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={businessInfo.phoneHref}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[4px] bg-[#FAF8F5] border border-[#DEDAD1] text-xs font-semibold text-[#171717] hover:bg-[#E8E5DD] transition-colors"
              aria-label={`Call D9W at ${businessInfo.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-[#1E4F8A]" />
              <span>{t('common.buttons.callUs')}</span>
            </a>
            <a
              href={getGeneralEnquiryWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[4px] bg-[#25D366]/10 border border-[#25D366]/30 text-xs font-semibold text-[#171717] hover:bg-[#25D366]/20 transition-colors"
              aria-label="Chat with D9W on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="pt-2 text-center">
            <p className="text-xs text-[#89857E]">
              {t('common.footer.taglineBadge')}: <span className="text-[#171717] font-medium">{t('common.nav.tagline')}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
