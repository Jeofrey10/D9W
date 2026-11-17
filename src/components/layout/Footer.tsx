import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Logo } from '@/components/common/Logo'
import { businessInfo, getGeneralEnquiryWhatsAppUrl } from '@/config/business'
import { useTranslation } from '@/i18n'
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
  Globe2,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

export const Footer: React.FC = () => {
  const { t } = useTranslation()

  const courseLinks = [
    { label: 'A1 — Beginner Foundation', to: '/courses/a1' },
    { label: 'A2 — Elementary Proficiency', to: '/courses/a2' },
    { label: 'B1 — Intermediate Independence', to: '/courses/b1' },
    { label: 'B2 — Upper-Intermediate Professional', to: '/courses/b2' },
    { label: 'C1 — Advanced Mastery', to: '/courses/c1' },
  ]

  const toolLinks = [
    { label: 'German Dictionary', to: '/dictionary' },
    { label: 'Article Explorer (der/die/das)', to: '/article-explorer' },
    { label: 'Number Trainer', to: '/number-trainer' },
    { label: 'Time Trainer', to: '/time-trainer' },
    { label: 'Sentence Builder', to: '/sentence-builder' },
    { label: 'Listening Practice (A1–C1)', to: '/listening-practice' },
    { label: 'Reading Practice (A1–C1)', to: '/reading-practice' },
    { label: 'My Saved Vocabulary', to: '/my-vocabulary' },
    { label: 'Daily German Word (Wort des Tages)', to: '/word-of-the-day' },
    { label: 'Contextual Case Translator', to: '/case-translator' },
    { label: 'Study Planner & Exam Countdown', to: '/study-planner' },
  ]

  const instituteLinks = [
    { label: 'About D9W Institute', to: '/about' },
    { label: 'Course Syllabus (A1–C1)', to: '/syllabus' },
    { label: 'Upcoming Batch Schedule', to: '/batches' },
    { label: 'Online Live Classes', to: '/online-classes' },
    { label: 'Offline Classroom Batches', to: '/offline-classes' },
    { label: 'Level Assessment Test', to: '/assessment' },
    { label: 'Book a Free Demo Class', to: '/demo' },
    { label: 'Contact Admissions', to: '/contact' },
  ]

  return (
    <footer className="bg-[#171717] text-[#F7F5F0] border-t border-[#2A2A2A] font-sans">
      {/* Top Banner Bar with Germany Flag Colors */}
      <div className="h-1.5 w-full flex" aria-hidden="true">
        <div className="h-full flex-1 bg-[#171717]" />
        <div className="h-full flex-1 bg-[#C83B32]" />
        <div className="h-full flex-1 bg-[#D7B95D]" />
      </div>

      <Container size="xl" className="pt-16 pb-[max(3rem,calc(env(safe-area-inset-bottom)+2rem))]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#2A2A2A]">
          {/* Brand & Verified Official Contact Column */}
          <div className="lg:col-span-2 space-y-5">
            <Logo variant="footer" className="mb-2" />

            <p className="text-sm text-[#A09C94] leading-relaxed max-w-sm">
              {t('common.footer.cefrDescription')}
            </p>

            <div className="p-4 rounded-[4px] bg-[#222222] border border-[#333333] space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="gold" size="sm">{t('common.footer.taglineBadge')}</Badge>
                <span className="text-xs font-heading font-bold text-[#FFFFFF] tracking-tight">
                  {t('common.footer.tagline')}
                </span>
              </div>
              <p className="text-xs text-[#89857E]">
                {t('common.footer.cefrNote')}
              </p>
            </div>

            {/* Official Contact Details */}
            <div className="pt-1 space-y-2.5 text-xs text-[#A09C94]">
              {/* Address with Google Maps link */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C83B32] shrink-0 mt-0.5" />
                <a
                  href={businessInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFFFF] transition-colors leading-relaxed group"
                  title="View D9W German Language Institute in Madurai on Google Maps"
                >
                  <span>{businessInfo.address.full}</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#D7B95D] font-medium ml-1 group-hover:underline">
                    <span>({t('common.footer.directions')})</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D7B95D] shrink-0" />
                <a
                  href={businessInfo.phoneHref}
                  className="hover:text-[#FFFFFF] transition-colors font-mono font-medium"
                  title="Call D9W Admissions Desk"
                >
                  {businessInfo.phone}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={getGeneralEnquiryWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1 font-mono font-medium"
                  title="Chat with D9W on WhatsApp"
                >
                  <span>WhatsApp: {businessInfo.whatsapp}</span>
                  <ExternalLink className="w-2.5 h-2.5 text-[#25D366]" />
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D7B95D] shrink-0" />
                <a
                  href={businessInfo.emailHref}
                  className="hover:text-[#FFFFFF] transition-colors"
                  title="Email D9W German Language Institute"
                >
                  {businessInfo.email}
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-2.5">
                <InstagramIcon className="w-4 h-4 text-[#E1306C] shrink-0" />
                {businessInfo.instagramUrl ? (
                  <a
                    href={businessInfo.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FFFFFF] transition-colors font-mono text-[11px]"
                  >
                    Instagram: {businessInfo.instagramDisplay}
                  </a>
                ) : (
                  <span className="font-mono text-[11px]">
                    Instagram: <span className="text-[#F7F5F0] font-medium">{businessInfo.instagramDisplay}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Courses Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#FFFFFF] font-sans">
              {t('common.footer.cefrLevelsTitle')}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A09C94]">
              {courseLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C83B32]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Tools Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#FFFFFF] font-sans flex items-center gap-1.5">
              <span>{t('common.footer.learningHubTitle')}</span>
              <span className="text-[10px] bg-[#C83B32] text-white px-1.5 py-0.2 rounded font-sans">
                {t('common.footer.toolsCountBadge')}
              </span>
            </h3>
            <ul className="space-y-2 text-xs text-[#A09C94]">
              {toolLinks.slice(0, 7).map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#D7B95D]" />
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/learning-hub"
                  className="text-[#D7B95D] hover:underline font-medium inline-block mt-1"
                >
                  {t('common.footer.viewAllTools')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Institute Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#FFFFFF] font-sans">
              {t('common.footer.instituteTitle')}
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A09C94]">
              {instituteLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736F68]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
            <span>&copy; {CURRENT_YEAR} {businessInfo.name}. {t('common.footer.allRightsReserved')}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5" />
              <span>{t('common.footer.standardGerman')}</span>
            </span>
            <span>&bull;</span>
            <Link to="/about" className="hover:text-white transition-colors">
              {t('common.footer.academicStandards')}
            </Link>
            <span>&bull;</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              {t('common.footer.imprintPrivacy')}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
