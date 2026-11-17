import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react'

export interface PlaceholderFeature {
  title: string
  description: string
}

export interface PlaceholderPageProps {
  category?: string
  badgeText?: string
  badgeVariant?: 'default' | 'accent' | 'gold' | 'stone' | 'der' | 'die' | 'das'
  title: string
  germanTitle?: string
  description: string
  icon?: React.ReactNode
  plannedCapabilities?: string[]
  primaryAction?: {
    label: string
    to: string
  }
  secondaryAction?: {
    label: string
    to: string
  }
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  category = 'D9W Learning Tool',
  badgeText = 'Phase 01 Foundation',
  badgeVariant = 'accent',
  title,
  germanTitle,
  description,
  icon,
  plannedCapabilities = [
    'CEFR-aligned curriculum and vocabulary',
    'Interactive client-side practice state',
    'Native browser audio pronunciation engine',
    'Progressive difficulty levels (A1 to C1)',
  ],
  primaryAction = {
    label: 'Explore Learning Hub',
    to: '/learning-hub',
  },
  secondaryAction = {
    label: 'Back to Home',
    to: '/',
  },
}) => {
  return (
    <div className="py-12 sm:py-20">
      <Container size="md">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/learning-hub"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#89857E] hover:text-[#171717] transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Learning Hub Overview</span>
          </Link>
        </div>

        {/* Hero Card */}
        <div className="bg-[#FFFFFF] border border-[#DEDAD1] rounded-[4px] p-6 sm:p-10 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b border-[#DEDAD1]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C83B32]">
                  {category}
                </span>
                <span className="text-[#DEDAD1]">&bull;</span>
                <Badge variant={badgeVariant} size="sm">
                  {badgeText}
                </Badge>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-[#171717] font-heading tracking-tight">
                  {title}
                </h1>
                {germanTitle && (
                  <p className="text-sm sm:text-base font-serif italic text-[#89857E] mt-1">
                    Deutsche Bezeichnung: {germanTitle}
                  </p>
                )}
              </div>

              <p className="text-base text-[#55534F] leading-relaxed max-w-xl font-sans">
                {description}
              </p>
            </div>

            {icon && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F7F5F0] border border-[#DEDAD1] rounded-[4px] flex items-center justify-center text-[#C83B32] shrink-0 self-start">
                {icon}
              </div>
            )}
          </div>

          {/* Capabilities Roadmap */}
          <div className="py-8 border-b border-[#DEDAD1]">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#D7B95D]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                Architectural Blueprint & Planned Features
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {plannedCapabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-[4px] bg-[#F7F5F0]/60 border border-[#ECE8E0]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#55534F] font-medium leading-snug">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Context Notice */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#89857E] text-center sm:text-left">
              This module route is registered and architected for Phase 02 interactive implementation.
            </p>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {secondaryAction && (
                <Button
                  to={secondaryAction.to}
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  {secondaryAction.label}
                </Button>
              )}
              {primaryAction && (
                <Button
                  to={primaryAction.to}
                  variant="primary"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  {primaryAction.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
