import React from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { useLeadCapture } from '@/features/lead-capture'
import {
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  Video,
  Users,
  MessageCircle,
} from 'lucide-react'
import { getDemoEnquiryWhatsAppUrl } from '@/config/business'
import { useTranslation } from '@/i18n'

export const DemoPage: React.FC = () => {
  const { openLeadModal } = useLeadCapture()
  const { isGerman } = useTranslation()

  const handleBookDemo = (level: 'A1' | 'A2' | 'B1' | 'B2' = 'A1', mode: 'Online' | 'Offline' = 'Online') => {
    openLeadModal({
      courseLevel: level,
      learningMode: mode,
      enquiryType: 'Free Demo Class',
      source: 'Demo Page',
    })
  }

  const directWhatsAppUrl = getDemoEnquiryWhatsAppUrl()

  return (
    <div className="py-12 sm:py-16">
      <Container size="lg">
        <SectionHeading
          eyebrow={isGerman ? 'D9W-UNTERRICHT ERLEBEN' : 'EXPERIENCE D9W TEACHING'}
          title={isGerman ? 'Kostenlose Deutsch-Probestunde buchen' : 'Book Your Free German Demo Class'}
          description={
            isGerman
              ? 'Nehmen Sie vor jeder finanziellen Entscheidung an einer interaktiven 45-minütigen Live-Einheit teil. Lernen Sie eine zertifizierte Lehrkraft kennen und stellen Sie Ihre Fragen.'
              : 'Attend a live 45-minute interactive class before making any financial commitment. Meet an accredited instructor, observe our teaching rhythm, and ask questions.'
          }
        />

        <div className="skeuo-paper-stacked rounded-[8px] p-6 sm:p-10 border border-[#DCD7CD]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Left Column: What happens in the demo */}
            <div className="lg:col-span-3 space-y-6">
              <div>
                <Badge variant="accent" size="sm">
                  45-Minute Free Live Session
                </Badge>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#171717] mt-2">
                  Experience Authentic German Instruction
                </h3>
                <p className="text-xs sm:text-sm text-[#55534F] mt-1 leading-relaxed">
                  Join certified Goethe-trained faculty for a real-time lesson. We evaluate phonetic habits, introduce core vocabulary architectures, and demonstrate our interactive learning desk tools.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171717]">
                    <Video className="w-4 h-4 text-[#C83B32]" />
                    <span>Live Interactive Video</span>
                  </div>
                  <p className="text-[11px] text-[#55534F]">
                    Direct vocal participation in small groups of max 8 attendees.
                  </p>
                </div>

                <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171717]">
                    <Users className="w-4 h-4 text-[#2E7D32]" />
                    <span>Faculty Q&amp;A</span>
                  </div>
                  <p className="text-[11px] text-[#55534F]">
                    Direct answers on visa timeline, exam formats (telc vs. Goethe).
                  </p>
                </div>

                <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171717]">
                    <Clock className="w-4 h-4 text-[#D7B95D]" />
                    <span>Flexible Schedules</span>
                  </div>
                  <p className="text-[11px] text-[#55534F]">
                    Weekday evenings and weekend morning options available.
                  </p>
                </div>

                <div className="p-3.5 rounded-[6px] bg-[#FAF8F5] border border-[#DEDAD1] space-y-1">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#171717]">
                    <ShieldCheck className="w-4 h-4 text-[#171717]" />
                    <span>100% Free Trial</span>
                  </div>
                  <p className="text-[11px] text-[#55534F]">
                    Zero payment details or long-term obligations required.
                  </p>
                </div>
              </div>

              <ul className="space-y-2.5 text-xs text-[#55534F] pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Receive complimentary A1 German pronunciation starter cheat sheet.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32] shrink-0" />
                  <span>Personalized CEFR level placement recommendation following the session.</span>
                </li>
              </ul>
            </div>

            {/* Right Column: Interactive Booking Action Card */}
            <div className="lg:col-span-2 skeuo-recessed rounded-[8px] p-6 border border-[#DCD7CD] space-y-5 text-center">
              <div className="w-12 h-12 rounded-full bg-[#171717] text-[#D7B95D] flex items-center justify-center mx-auto shadow-md">
                <Calendar className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-lg font-heading font-bold text-[#171717]">
                  Reserve Your Demo Seat
                </h4>
                <p className="text-xs text-[#55534F]">
                  Choose your target level and learning mode to secure your place in the next live cohort.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                <Button
                  type="button"
                  onClick={() => handleBookDemo('A1', 'Online')}
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Book Free Demo (A1 Beginner)</span>
                </Button>

                <Button
                  type="button"
                  onClick={() => handleBookDemo('B1', 'Online')}
                  variant="secondary"
                  size="md"
                  className="w-full justify-center"
                >
                  <span>Book Free Demo (Intermediate A2–C1)</span>
                </Button>
              </div>

              <div className="pt-2 border-t border-[#DEDAD1]">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#25D366] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Or ask about demo slots on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
