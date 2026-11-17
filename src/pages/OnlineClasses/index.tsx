import React from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { useTranslation } from '@/i18n'
import { Video, Users, Calendar, Sparkles } from 'lucide-react'

export const OnlineClassesPage: React.FC = () => {
  const { t, isGerman } = useTranslation()
  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        <SectionHeading
          eyebrow={isGerman ? 'FLEXIBLES WELTWEITES LERNEN' : 'FLEXIBLE GLOBAL LEARNING'}
          title={isGerman ? 'Online Live Interaktiver Deutschunterricht' : 'Online Live Interactive German Classes'}
          description={
            isGerman
              ? 'Nehmen Sie von überall auf der Welt an interaktiven Live-Sitzungen mit zertifizierten Deutschlehrkräften teil. Hochauflösende digitale Seminarräume mit direktem Dozentenkontakt.'
              : 'Attend live, instructor-led sessions from anywhere in the world. High-definition interactive video classrooms with certified native-fluent German instructors.'
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="skeuo-paper rounded-[6px] p-6 space-y-4">
            <div className="w-12 h-12 skeuo-badge-die rounded-[5px] flex items-center justify-center">
              <Users className="w-6 h-6 text-[#C83B32]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#171717]">
              {isGerman ? 'Mikro-Gruppen (Max. 14 Teilnehmende)' : 'Micro-Batches (Max 14 Students)'}
            </h3>
            <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
              {isGerman
                ? 'Im Gegensatz zu anonymen Massen-Webinaren sind D9W-Online-Kurse strikt auf 14 Teilnehmende limitiert. So spricht jeder Teilnehmende in jeder Einheit aktiv Deutsch.'
                : 'Unlike massive webinar lectures, D9W online classes are strictly capped at 14 students. This ensures that every student speaks German actively in every single session.'}
            </p>
          </div>

          <div className="skeuo-paper rounded-[6px] p-6 space-y-4">
            <div className="w-12 h-12 skeuo-badge rounded-[5px] flex items-center justify-center text-[#D7B95D]">
              <Video className="w-6 h-6 text-[#8C7225]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#171717]">
              {isGerman ? 'Live-Studioqualität & Aufzeichnungen' : 'Live Studio Quality & Recordings'}
            </h3>
            <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
              {isGerman
                ? 'Alle Einheiten werden aus spezialisierten Lehrstudios mit exzellenter Audioqualität übertragen. Aufzeichnungen und Whiteboard-Notizen stehen binnen 2 Stunden im Portal bereit.'
                : 'All sessions are broadcast from dedicated teaching studios with high-fidelity audio. Full video replays and annotated whiteboard notes are uploaded to the student portal within 2 hours.'}
            </p>
          </div>

          <div className="skeuo-paper rounded-[6px] p-6 space-y-4">
            <div className="w-12 h-12 skeuo-badge-das rounded-[5px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#2A684C]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#171717]">
              {isGerman ? 'Integriertes digitales Lernportal' : 'Integrated Digital Learning Hub'}
            </h3>
            <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
              {isGerman
                ? 'Direkter Zugriff auf unsere 10 interaktiven Deutsch-Tools (Satzbau-Trainer, Artikel-Explorer, Hörverstehen) für Hausaufgaben und Spaced-Repetition-Wiederholungen.'
                : 'Direct access to our 10 interactive German tools (Sentence Builder, Article Explorer, Listening Practice) for homework assignments and spaced repetition between live classes.'}
            </p>
          </div>
        </div>

        {/* Schedule & Timing Overview */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DEDAD1]">
            <div>
              <Badge variant="stone">{isGerman ? 'Flexible Zeitfenster' : 'Flexible Time Slots'}</Badge>
              <h3 className="text-xl font-heading font-bold text-[#171717] mt-1">
                {isGerman ? 'Kommende Online-Kursoptionen' : 'Upcoming Online Batch Options'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button to="/batches" variant="outline" size="sm">
                {t('common.viewBatches') || (isGerman ? 'Kurskalender ansehen' : 'View Batch Calendar')}
              </Button>
              <Button to="/demo" variant="primary" size="sm">
                {t('common.bookDemo') || (isGerman ? 'Kostenlose Probestunde buchen' : 'Book a Free Online Demo')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="p-5 skeuo-recessed rounded-[6px] space-y-2">
              <h4 className="text-sm font-bold text-[#171717] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#C83B32]" />
                {isGerman ? 'Abendkurse unter der Woche' : 'Weekday Evening Batches'}
              </h4>
              <p className="text-xs text-[#55534F]">
                {isGerman
                  ? 'Ideal für Berufstätige und Studierende. Montag bis Donnerstag, 2 Stunden pro Abend.'
                  : 'Ideal for working professionals and university students. Monday to Thursday, 2 hours per evening.'}
              </p>
              <div className="text-[11px] text-[#89857E] pt-1">
                {isGerman
                  ? 'Typische Zeiten: 18:30 – 20:30 MEZ / 19:00 – 21:00 IST'
                  : 'Typical slots: 18:30 – 20:30 CET / 19:00 – 21:00 IST'}
              </div>
            </div>

            <div className="p-5 skeuo-recessed rounded-[6px] space-y-2">
              <h4 className="text-sm font-bold text-[#171717] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D7B95D]" />
                {isGerman ? 'Wochenend-Intensivkurse' : 'Weekend Intensive Batches'}
              </h4>
              <p className="text-xs text-[#55534F]">
                {isGerman
                  ? 'Kompakte 3,5-Stunden-Blöcke samstags und sonntags für schnellen Fortschritt ohne Terminkonflikte unter der Woche.'
                  : 'Focused 3.5-hour Saturday and Sunday blocks designed for fast-track progression without weekday time conflicts.'}
              </p>
              <div className="text-[11px] text-[#89857E] pt-1">
                {isGerman
                  ? 'Typische Zeiten: Samstag- und Sonntagmorgen'
                  : 'Typical slots: Saturday & Sunday mornings'}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
