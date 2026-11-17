import React from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/common/Button'
import { useLeadCapture } from '@/features/lead-capture'
import { businessInfo, getGeneralEnquiryWhatsAppUrl } from '@/config/business'
import { useTranslation } from '@/i18n'
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  FileCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Navigation,
} from 'lucide-react'

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

export const ContactPage: React.FC = () => {
  const { openLeadModal } = useLeadCapture()
  const { t } = useTranslation()

  const handleOpenGeneralEnquiry = () => {
    openLeadModal({
      courseLevel: 'Undecided',
      learningMode: 'Undecided',
      enquiryType: 'General Consultation',
      source: 'Contact Page',
    })
  }

  const handleOpenDemoBooking = () => {
    openLeadModal({
      courseLevel: 'A1',
      learningMode: 'Online',
      enquiryType: 'Free Demo Class',
      source: 'Contact Page',
    })
  }

  const directWhatsAppUrl = getGeneralEnquiryWhatsAppUrl()

  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        <SectionHeading
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          description={t('contact.subtitle')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details Column */}
          <div className="space-y-6">
            <div className="skeuo-paper rounded-[6px] p-6 space-y-5">
              <div className="border-b border-[#ECE8E0] pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C83B32] font-bold block mb-1">
                  {t('contact.officialDesk')}
                </span>
                <h3 className="text-base font-heading font-bold text-[#171717]">
                  {businessInfo.name}
                </h3>
              </div>

              <div className="space-y-4 text-xs text-[#55534F]">
                {/* Physical Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C83B32] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block text-[#171717] font-semibold">{t('contact.campusTitle')}</strong>
                    <a
                      href={businessInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#55534F] hover:text-[#C83B32] hover:underline block leading-relaxed group"
                      title="Open D9W German Language Institute in Google Maps"
                    >
                      <span>{businessInfo.address.full}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#C83B32] font-semibold mt-1 group-hover:underline">
                        <span>{t('contact.viewMaps')}</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                    <div className="pt-1.5">
                      <a
                        href={businessInfo.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#171717] hover:bg-[#2A2A2A] text-white text-[11px] font-semibold shadow-xs transition-all active:translate-y-0.5"
                      >
                        <Navigation className="w-3 h-3 text-[#D7B95D]" />
                        <span>{t('contact.getDirections')}</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Call */}
                <div className="flex items-start gap-3 pt-1 border-t border-[#ECE8E0]">
                  <Phone className="w-4 h-4 text-[#1E4F8A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717] font-semibold">{t('contact.phoneTitle')}</strong>
                    <a
                      href={businessInfo.phoneHref}
                      className="font-mono text-sm font-bold text-[#171717] hover:text-[#C83B32] transition-colors inline-block"
                      title="Call D9W German Language Institute"
                    >
                      {businessInfo.phone}
                    </a>
                    <p className="text-[#89857E] text-[11px] mt-0.5">{t('contact.phoneSubtitle')}</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3 pt-1 border-t border-[#ECE8E0]">
                  <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717] font-semibold">{t('contact.whatsappTitle')}</strong>
                    <a
                      href={directWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs font-semibold text-[#171717] hover:text-[#25D366] transition-colors inline-flex items-center gap-1.5"
                      title="Chat with D9W German Language Institute on WhatsApp"
                    >
                      <span>{businessInfo.whatsapp}</span>
                      <ExternalLink className="w-3 h-3 text-[#25D366]" />
                    </a>
                    <p className="text-[#89857E] text-[11px] mt-0.5">{t('contact.whatsappSubtitle')}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 pt-1 border-t border-[#ECE8E0]">
                  <Mail className="w-4 h-4 text-[#D7B95D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717] font-semibold">{t('contact.emailTitle')}</strong>
                    <a
                      href={businessInfo.emailHref}
                      className="text-xs text-[#171717] font-medium hover:text-[#C83B32] transition-colors inline-block"
                      title="Send email to D9W German Language Institute"
                    >
                      {businessInfo.email}
                    </a>
                    <p className="text-[#89857E] text-[11px] mt-0.5">{t('contact.emailSubtitle')}</p>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3 pt-1 border-t border-[#ECE8E0]">
                  <div className="w-4 h-4 text-[#E1306C] shrink-0 mt-0.5 flex items-center justify-center">
                    <InstagramIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-[#171717] font-semibold">{t('contact.instagramTitle')}</strong>
                    {businessInfo.instagramUrl ? (
                      <a
                        href={businessInfo.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-medium text-[#171717] hover:text-[#E1306C] transition-colors inline-flex items-center gap-1"
                      >
                        <span>{businessInfo.instagramDisplay}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs font-mono font-medium text-[#171717] inline-block bg-[#F0EDE6] px-2 py-0.5 rounded-[3px] border border-[#DEDAD1]">
                        {businessInfo.instagramDisplay}
                      </span>
                    )}
                    <p className="text-[#89857E] text-[11px] mt-0.5">{t('contact.instagramSubtitle')}</p>
                  </div>
                </div>

                {/* Counselling Hours */}
                <div className="flex items-start gap-3 pt-1 border-t border-[#ECE8E0]">
                  <Clock className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#171717] font-semibold">{t('contact.counsellingTitle')}</strong>
                    <span>{t('contact.counsellingHours')}</span>
                    <p className="text-[#89857E] text-[11px] mt-0.5">{t('contact.counsellingSubtitle')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="skeuo-recessed rounded-[6px] p-6 text-xs space-y-2 border border-[#DEDAD1]">
              <div className="flex items-center gap-2 font-bold text-[#171717]">
                <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
                <span>{t('contact.zeroObligationTitle')}</span>
              </div>
              <p className="text-[#55534F] leading-relaxed">
                {t('contact.zeroObligationDesc')}
              </p>
            </div>
          </div>

          {/* Centralized Enquiry Action Column */}
          <div className="lg:col-span-2">
            <div className="skeuo-paper-stacked rounded-[8px] p-6 sm:p-10 border border-[#DCD7CD] space-y-8">
              <div className="border-b border-[#ECE8E0] pb-5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#C83B32] font-bold">
                  {t('contact.portalBadge')}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#171717] mt-1">
                  {t('contact.portalTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-[#55534F] mt-1.5 leading-relaxed">
                  {t('contact.portalDesc')}
                </p>
              </div>

              {/* Two Direct Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-[4px] bg-[#171717] text-[#D7B95D] flex items-center justify-center shadow-xs">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-heading font-bold text-[#171717]">
                      {t('contact.generalCardTitle')}
                    </h4>
                    <p className="text-xs text-[#55534F] leading-relaxed">
                      {t('contact.generalCardDesc')}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={handleOpenGeneralEnquiry}
                    variant="primary"
                    size="md"
                    className="w-full justify-center cursor-pointer"
                  >
                    <span>{t('contact.launchDesk')}</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>

                <div className="p-5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-9 h-9 rounded-[4px] bg-[#C83B32] text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-heading font-bold text-[#171717]">
                      {t('contact.demoCardTitle')}
                    </h4>
                    <p className="text-xs text-[#55534F] leading-relaxed">
                      {t('contact.demoCardDesc')}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={handleOpenDemoBooking}
                    variant="secondary"
                    size="md"
                    className="w-full justify-center cursor-pointer"
                  >
                    <span>{t('contact.bookDemo')}</span>
                    <Calendar className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>

              {/* WhatsApp Alternative */}
              <div className="p-4 rounded-[6px] bg-[#25D366]/10 border border-[#25D366]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#171717]">
                      {t('contact.preferWhatsAppTitle')}
                    </h5>
                    <p className="text-[11px] text-[#55534F]">
                      {t('contact.preferWhatsAppDesc', { phone: businessInfo.whatsapp })}
                    </p>
                  </div>
                </div>

                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 rounded-[4px] bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold shadow-xs transition-all active:translate-y-0.5 shrink-0 text-center"
                >
                  {t('contact.chatWhatsAppBtn')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
