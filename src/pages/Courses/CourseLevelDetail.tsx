import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Button } from '@/components/common/Button'
import { COURSES_DATA } from '@/data/courses'
import { useLeadCapture, LeadCourseLevel } from '@/features/lead-capture'
import { useTranslation } from '@/i18n'
import { ArrowLeft, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react'

export const CourseLevelDetailPage: React.FC = () => {
  const { isGerman } = useTranslation()
  const { level } = useParams<{ level: string }>()
  const { openLeadModal } = useLeadCapture()
  const normalizedLevel = (level || 'a1').toLowerCase()
  const course = COURSES_DATA.find((c) => c.id.toLowerCase() === normalizedLevel)

  const handleRegisterEnquiry = () => {
    if (!course) return
    const cefrLevel = course.level as LeadCourseLevel
    openLeadModal({
      courseLevel: ['A1', 'A2', 'B1', 'B2', 'C1'].includes(cefrLevel) ? cefrLevel : 'Undecided',
      enquiryType: 'Course Enquiry',
      learningMode: 'Undecided',
      source: 'Course Level Detail',
    })
  }

  if (!course) {
    return (
      <div className="py-20">
        <Container size="md" className="text-center">
          <h1 className="text-3xl font-heading font-extrabold text-[#171717] mb-4">
            {isGerman ? 'Kursniveau nicht gefunden' : 'Course Level Not Found'}
          </h1>
          <p className="text-[#55534F] text-sm mb-6">
            {isGerman
              ? `Das angeforderte GER-Kursniveau „${level}“ existiert derzeit nicht im Verzeichnis.`
              : `The requested CEFR course level "${level}" is not currently in the curriculum registry.`}
          </p>
          <Button to="/courses" variant="primary">
            {isGerman ? 'Alle Kurse ansehen (A1–C1)' : 'View All Courses (A1–C1)'}
          </Button>
        </Container>
      </div>
    )
  }

  return (
    <div className="py-12 sm:py-20">
      <Container size="lg">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#89857E] hover:text-[#171717] uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{isGerman ? 'Zurück zur Kursübersicht' : 'Back to All Courses'}</span>
          </Link>
        </div>

        {/* Header Block */}
        <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-8 border-b border-[#DEDAD1]">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-[5px] skeuo-button-dark text-[#FFFFFF] font-heading font-extrabold text-xl flex items-center justify-center">
                  {course.level}
                </span>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717]">
                    {course.title}
                  </h1>
                  <p className="text-xs uppercase tracking-wider text-[#C83B32] font-semibold">
                    {course.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-base text-[#55534F] leading-relaxed">
                {course.description}
              </p>

              <div className="pt-2 text-xs text-[#55534F] skeuo-recessed p-4 rounded-[5px]">
                <strong className="text-[#171717] block mb-1">
                  {isGerman ? 'Zielgruppe & Profil:' : 'Target Audience & Profile:'}
                </strong>
                {course.targetAudience}
              </div>
            </div>

            {/* Quick Specs Column */}
            <div className="w-full md:w-64 skeuo-recessed rounded-[6px] p-5 space-y-4 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171717]">
                <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
                <span>{isGerman ? 'Kursdaten' : 'Course Metadata'}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-[#D2CDC3]">
                  <span className="text-[#89857E]">{isGerman ? 'Zielprüfung:' : 'Target Exam:'}</span>
                  <span className="font-semibold text-[#171717]">{course.examTarget}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#D2CDC3]">
                  <span className="text-[#89857E]">{isGerman ? 'Gesamtstunden:' : 'Total Hours:'}</span>
                  <span className="font-semibold text-[#171717]">
                    {course.hoursTotal} {isGerman ? 'Stunden' : 'Hours'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#D2CDC3]">
                  <span className="text-[#89857E]">{isGerman ? 'Dauer:' : 'Duration:'}</span>
                  <span className="font-semibold text-[#171717]">
                    {course.durationWeeks} {isGerman ? 'Wochen' : 'Weeks'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#D2CDC3]">
                  <span className="text-[#89857E]">{isGerman ? 'Unterrichtsform:' : 'Delivery Mode:'}</span>
                  <span className="font-semibold text-[#171717]">{course.mode}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  onClick={handleRegisterEnquiry}
                  variant="primary"
                  size="md"
                  className="w-full cursor-pointer"
                  leftIcon={<FileCheck className="w-4 h-4" />}
                >
                  {isGerman ? `Für ${course.level} anmelden` : `Register for ${course.level}`}
                </Button>
                <Button
                  to={`/syllabus?level=${normalizedLevel}`}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  {isGerman ? `${course.level}-Lehrplan (PDF) laden` : `Download ${course.level} Syllabus (PDF)`}
                </Button>
              </div>
            </div>
          </div>

          {/* Detailed Syllabus Grid */}
          <div className="pt-8">
            <h2 className="text-base font-bold font-heading uppercase tracking-wide text-[#171717] mb-4">
              {isGerman ? 'Kernkompetenzen & Lernmodule' : 'Core Competencies & Learning Modules'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#F7F5F0]/60 rounded-[4px] border border-[#ECE8E0]">
                  <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#55534F] font-medium leading-relaxed">{h}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
