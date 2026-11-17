import React from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { useTranslation } from '@/i18n'
import { ShieldCheck, Target, Globe, CheckCircle2, ArrowRight } from 'lucide-react'

export const AboutPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="py-12 sm:py-16">
      <Container size="lg">
        <SectionHeading
          eyebrow={t('about.eyebrow')}
          title={t('about.title')}
          description={t('about.subtitle')}
        />

        <div className="space-y-10">
          {/* ======================================================== */}
          {/* FOUNDER & GERMAN LANGUAGE TEACHER PROFILE               */}
          {/* ======================================================== */}
          <div className="skeuo-paper-stacked rounded-[8px] p-6 sm:p-10 border border-[#DEDAD1]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* LEFT SIDE: Refined Typographic Founder Plaque */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-8 sm:p-10 rounded-[6px] skeuo-recessed border border-[#D8D3C8] relative overflow-hidden space-y-5">
                {/* Micro flag strip on top of plaque */}
                <div className="absolute top-0 left-0 right-0 h-1 flex" aria-hidden="true">
                  <div className="h-full flex-1 bg-[#171717]" />
                  <div className="h-full flex-1 bg-[#C83B32]" />
                  <div className="h-full flex-1 bg-[#D7B95D]" />
                </div>

                {/* Monogram Medallion */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FFFFFF] border-2 border-[#D7B95D] shadow-sm flex items-center justify-center relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#FAF8F5] to-[#EFECE6] border border-[#DEDAD1] flex items-center justify-center shadow-inner">
                    <span className="font-heading font-black text-3xl sm:text-4xl text-[#171717] tracking-tight">
                      P
                    </span>
                  </div>
                  {/* Subtle red accent pip */}
                  <span className="absolute bottom-1 right-2 w-3.5 h-3.5 rounded-full bg-[#C83B32] border-2 border-white shadow-xs" />
                </div>

                {/* Founder Typographic Attribution */}
                <div className="space-y-1">
                  <h4 className="font-heading font-extrabold text-xl text-[#171717] tracking-tight">
                    {t('about.founderName')}
                  </h4>
                  <p className="text-xs font-semibold text-[#8C7225] uppercase tracking-wider">
                    {t('about.founderRole')}
                  </p>
                  <p className="text-[11px] text-[#89857E] font-medium pt-1">
                    {t('about.founderOrganization')}
                  </p>
                </div>

                {/* Official Logo Seal */}
                <div className="pt-2 border-t border-[#DEDAD1] w-full flex justify-center">
                  <img
                    src="/assets/d9w-institute-logo.png"
                    alt="D9W German Language Institute"
                    className="w-24 sm:w-28 h-auto object-contain opacity-85"
                    width={1024}
                    height={682}
                  />
                </div>
              </div>

              {/* RIGHT SIDE: Founder Story, Copy & Connection CTA */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#C83B32] block mb-2 font-mono">
                    {t('about.founderEyebrow')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#171717] tracking-tight">
                    {t('about.founderHeading')}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="stone" size="sm">
                      {t('about.founderRole')}
                    </Badge>
                    <span className="text-[#DEDAD1]">&bull;</span>
                    <span className="text-xs font-medium text-[#55534F]">
                      {t('about.founderOrganization')}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-sm sm:text-base text-[#55534F] leading-relaxed">
                  <p className="p-4 sm:p-5 rounded-[6px] bg-[#FFFFFF] border-l-3 border-l-[#C83B32] border border-[#ECE8E0] shadow-2xs italic">
                    "{t('about.founderBio')}"
                  </p>
                </div>

                {/* Interactive Contact & Consultation Action */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    to="/contact"
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    {t('about.founderCta')}
                  </Button>
                  <Button
                    to="/demo"
                    variant="outline"
                    size="md"
                  >
                    {t('about.demoBtn')}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Philosophy Card */}
          <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="gold">{t('about.philosophyBadge')}</Badge>
              <span className="text-xs text-[#89857E]">{t('about.standardsNote')}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#171717] mb-4">
              {t('about.philosophyTitle')}
            </h3>

            <p className="text-sm sm:text-base text-[#55534F] leading-relaxed mb-6">
              {t('about.philosophyDesc')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#ECE8E0]">
              <div className="p-4 skeuo-recessed rounded-[5px]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4 text-[#C83B32]" />
                  <span>{t('about.cefrAlignmentTitle')}</span>
                </div>
                <p className="text-xs text-[#55534F] leading-relaxed">
                  {t('about.cefrAlignmentDesc')}
                </p>
              </div>

              <div className="p-4 skeuo-recessed rounded-[5px]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
                  <Target className="w-4 h-4 text-[#C83B32]" />
                  <span>{t('about.practicalFluencyTitle')}</span>
                </div>
                <p className="text-xs text-[#55534F] leading-relaxed">
                  {t('about.practicalFluencyDesc')}
                </p>
              </div>

              <div className="p-4 skeuo-recessed rounded-[5px]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#171717] uppercase tracking-wider mb-2">
                  <Globe className="w-4 h-4 text-[#C83B32]" />
                  <span>{t('about.interactiveHubTitle')}</span>
                </div>
                <p className="text-xs text-[#55534F] leading-relaxed">
                  {t('about.interactiveHubDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* Academic Team Standards Notice */}
          <div className="skeuo-paper rounded-[6px] p-6 sm:p-8">
            <h3 className="text-lg font-heading font-bold text-[#171717] mb-2">
              {t('about.facultyTitle')}
            </h3>
            <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed mb-4">
              {t('about.facultyDesc')}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#55534F]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>{t('about.check1')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>{t('about.check2')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>{t('about.check3')}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>{t('about.check4')}</span>
              </li>
            </ul>
          </div>

          {/* CTA Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 skeuo-recessed-dark text-white rounded-[6px]">
            <div>
              <h4 className="text-lg font-heading font-bold text-white mb-1">
                {t('about.ctaTitle')}
              </h4>
              <p className="text-xs text-[#A09C94]">
                {t('about.ctaSubtitle')}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button to="/assessment" variant="outline" size="sm" className="text-white border-[#55534F] hover:bg-[#2A2A2A] hover:border-white">
                {t('about.assessmentBtn')}
              </Button>
              <Button to="/demo" variant="primary" size="sm">
                {t('about.demoBtn')}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
