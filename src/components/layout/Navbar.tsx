import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, BookOpen, Sparkles } from 'lucide-react'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { Logo } from '@/components/common/Logo'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  const navItems = [
    { label: t('common.nav.home'), path: '/' },
    { label: t('common.nav.courses'), path: '/courses' },
    { label: t('common.nav.batches'), path: '/batches' },
    { label: t('common.nav.learningHub'), path: '/learning-hub' },
    { label: t('common.nav.about'), path: '/about' },
    { label: t('common.nav.contact'), path: '/contact' },
  ]

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#F7F5F0]/95 backdrop-blur-md border-b border-[#DEDAD1]">
        {/* Top Flag Bar / Micro Bar */}
        <div className="h-1 w-full flex" aria-hidden="true">
          <div className="h-full flex-1 bg-[#171717]" />
          <div className="h-full flex-1 bg-[#C83B32]" />
          <div className="h-full flex-1 bg-[#D7B95D]" />
        </div>

        <Container size="xl">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* Official Logo */}
            <Logo variant="navbar" />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'px-3.5 py-2 text-sm font-medium transition-all rounded-[5px] font-sans relative inline-flex items-center justify-center',
                      isActive
                        ? 'text-[#C83B32] font-semibold bg-[#FFFFFF] border border-[#D2CDC3] shadow-[0_2px_4px_rgba(23,23,23,0.06),inset_0_1px_0_rgba(255,255,255,1)]'
                        : 'text-[#171717] hover:text-[#C83B32] hover:bg-[#E8E5DD]/60 hover:shadow-2xs'
                    )
                  }
                >
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-2.5 xl:gap-3">
              {/* Language Switcher */}
              <LanguageSwitcher variant="desktop" />

              <Button
                to="/learning-hub"
                variant="ghost"
                size="sm"
                leftIcon={<BookOpen className="w-4 h-4 text-[#C83B32]" />}
                className="hidden md:inline-flex"
              >
                {t('common.nav.freePractice')}
              </Button>

              <Button
                to="/demo"
                variant="outline"
                size="sm"
                className="hidden xl:inline-flex"
              >
                {t('common.nav.demoClass')}
              </Button>

              <Button
                to="/courses"
                variant="primary"
                size="md"
                rightIcon={<Sparkles className="w-3.5 h-3.5" />}
              >
                {t('common.nav.enrolNow')}
              </Button>
            </div>

            {/* Mobile Hamburger & Actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <LanguageSwitcher variant="compact" />
              <Button
                to="/courses"
                variant="primary"
                size="sm"
                className="sm:hidden text-xs px-2.5 py-1.5"
              >
                {t('common.nav.enrolShort')}
              </Button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 text-[#171717] rounded-[4px] hover:bg-[#E8E5DD] focus:outline-2 focus:outline-[#C83B32]"
                aria-label="Open mobile navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Component */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
