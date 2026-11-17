import React from 'react'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { useTranslation } from '@/i18n'
import { Building2, Users2, BookOpen, Coffee, CheckCircle2 } from 'lucide-react'

export const OfflineClassesPage: React.FC = () => {
  const { t, isGerman } = useTranslation()

  return (
    <div className="py-12 sm:py-16">
      <Container size="xl">
        <SectionHeading
          eyebrow={isGerman ? 'PRÄSENZUNTERRICHT' : 'CAMPUS IMMERSION'}
          title={isGerman ? 'Präsenzkurse am Institut' : 'Offline Classroom German Batches'}
          description={
            isGerman
              ? 'Interaktiver Präsenzunterricht in einer authentischen deutschen Sprachumgebung. Erleben Sie volle Immersion, Gruppenprojekte und strukturierte Konversationsrunden.'
              : 'In-person interactive classroom learning in an authentic German linguistic environment. Experience full immersion, collaborative group projects, and regular speaking circles.'
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
            <Building2 className="w-8 h-8 text-[#C83B32]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              {isGerman ? 'Moderne Seminarräume' : 'Modern Smart Classrooms'}
            </h3>
            <p className="text-xs text-[#55534F] leading-relaxed">
              {isGerman
                ? 'Ausgestattet mit digitalen Präsentationssystemen, akustischer Simulation für Goethe-Hörprüfungen und ergonomischen Plätzen.'
                : 'Equipped with digital presentation boards, acoustic audio simulation for Goethe listening exams, and ergonomic seating.'}
            </p>
          </div>

          <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
            <Users2 className="w-8 h-8 text-[#D7B95D]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              {isGerman ? 'Praxisnahe Rollenspiele' : 'Face-to-Face Roleplay'}
            </h3>
            <p className="text-xs text-[#55534F] leading-relaxed">
              {isGerman
                ? 'Direkte Dialoge unter Gleichgesinnten: Simulationen von Bürgeramt, Markt, Arztpraxis und Vorstellungsgesprächen in Deutschland.'
                : "Direct peer-to-peer dialogues simulating German bureaucratic offices (Bürgeramt), grocery markets, doctors' clinics, and job interviews."}
            </p>
          </div>

          <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
            <BookOpen className="w-8 h-8 text-[#2A684C]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              {isGerman ? 'Deutsche Institutsbibliothek' : 'German Library & Media'}
            </h3>
            <p className="text-xs text-[#55534F] leading-relaxed">
              {isGerman
                ? 'Zugang zu kuratierter deutscher Literatur (A1–C1 Lesebücher), Zeitungen (Die Zeit, Spiegel) und Prüfungsvorbereitungsbüchern.'
                : 'Access to curated German books (graded readers from A1 to C1), authentic newspapers (Die Zeit, Der Spiegel), and exam practice books.'}
            </p>
          </div>

          <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
            <Coffee className="w-8 h-8 text-[#1E4F8A]" />
            <h3 className="text-base font-heading font-bold text-[#171717]">
              {isGerman ? 'Stammtisch & Kultur-Treff' : 'Stammtisch & Coffee Club'}
            </h3>
            <p className="text-xs text-[#55534F] leading-relaxed">
              {isGerman
                ? 'Wöchentliche Kultur- und Filmabende sowie Konversationsrunden, bei denen Deutschsprechen die einzige Hausregel ist.'
                : 'Weekly German cultural discussions, film screenings, and conversation clubs where speaking German is the only house rule.'}
            </p>
          </div>
        </div>

        {/* Classroom Batch Details */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DEDAD1]">
            <div>
              <Badge variant="stone">{isGerman ? 'Präsenzplan' : 'Campus Schedule'}</Badge>
              <h3 className="text-xl font-heading font-bold text-[#171717] mt-1">
                {isGerman ? 'Präsenzkurs-Anmeldung' : 'Classroom Cohort Enrollment'}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <Button to="/batches" variant="outline" size="sm">
                {t('common.viewBatches') || (isGerman ? 'Kurskalender ansehen' : 'View Batch Calendar')}
              </Button>
              <Button to="/demo" variant="primary" size="sm">
                {isGerman ? 'Campus besuchen / Probestunde buchen' : 'Schedule Campus Visit / Demo'}
              </Button>
            </div>
          </div>

          <div className="pt-6 space-y-4 text-xs text-[#55534F]">
            <p className="leading-relaxed">
              {isGerman
                ? 'Präsenzkohorten starten jeweils am ersten Montag des Monats. Eine strenge Obergrenze von maximal 16 Teilnehmenden sichert individuelle Betreuung.'
                : 'Offline cohorts start on the first Monday of every month. Strict limits of 16 participants per classroom ensure individual attention and optimal peer dynamics.'}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>
                  {isGerman
                    ? 'Vormittags-Intensivgruppen (Montag bis Freitag, 09:30 – 12:30)'
                    : 'Morning Intensive Cohorts (Monday to Friday, 09:30 – 12:30)'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>
                  {isGerman
                    ? 'Wochenendgruppen für Berufstätige (Samstag & Sonntag)'
                    : 'Weekend Working Professional Cohorts (Saturday & Sunday)'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>
                  {isGerman
                    ? 'Kostenloser Vollzugriff auf alle digitalen Lernportal-Tools'
                    : 'Complimentary access to digital Learning Hub tools'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2A684C]" />
                <span>
                  {isGerman
                    ? 'Prüfungssimulationen unter echten Goethe/telc-Klausurbedingungen'
                    : 'Mock exam simulations conducted in exam conditions'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  )
}
