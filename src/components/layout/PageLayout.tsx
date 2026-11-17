import React from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { cn } from '@/lib/utils'

export interface PageLayoutProps {
  children: React.ReactNode
  className?: string
  showNavbar?: boolean
  showFooter?: boolean
  mainClassName?: string
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  showNavbar = true,
  showFooter = true,
  mainClassName,
}) => {
  return (
    <div className={cn('min-h-screen min-h-[100dvh] flex flex-col bg-[#F7F5F0] text-[#171717]', className)}>
      {/* Accessible skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#C83B32] focus:text-white focus:rounded-[4px] focus:shadow-md focus:text-xs focus:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#171717]"
      >
        Skip to main content
      </a>
      {showNavbar && <Navbar />}
      <main id="main-content" tabIndex={-1} className={cn('flex-1 focus:outline-none', mainClassName)}>
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}
