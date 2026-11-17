import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { COURSES_DATA } from '@/data/courses'
import { CourseComparisonSection } from '@/features/course-comparison'
import { useTranslation } from '@/i18n'
import { Clock, CheckCircle2, Award, ArrowRight, TableProperties, BookOpen, Calendar } from 'lucide-react'

export const CoursesPage: React.FC = () => {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState<'compare' | 'catalog'>(
    tabParam === 'catalog' ? 'catalog' : 'compare'
  )

  const handleTabChange = (tab: 'compare' | 'catalog') => {
    setActiveTab(tab)
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (tab === 'catalog') {
        next.set('tab', 'catalog')
      } else {
        next.delete('tab')
      }
      return next
    })
  }

  return (
    <div className="py-10 sm:py-16">
      <Container size="xl">
        {/* Navigation & Mode Toggle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 mb-8 border-b border-[#DEDAD1]">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[#C83B32] font-semibold block">
              {t('courses.hero.eyebrow')}
            </span>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#171717]">
              {t('courses.hero.title')}
            </h1>
          </div>

          {/* Segmented Rocker Tabs & Batches CTA */}
          <div className="flex flex-wrap items-center gap-3 self-start sm:self-center">
            <div className="p-1 rounded-[6px] skeuo-recessed inline-flex gap-1">
              <button
                type="button"
                onClick={() => handleTabChange('compare')}
                className={`px-4 py-2 rounded-[5px] text-xs font-heading font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'compare'
                    ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
                    : 'text-[#55534F] hover:text-[#171717]'
                }`}
              >
                <TableProperties className="w-4 h-4" />
                <span>{t('courses.matrix.title')}</span>
              </button>
              <button
                type="button"
                onClick={() => handleTabChange('catalog')}
                className={`px-4 py-2 rounded-[5px] text-xs font-heading font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'catalog'
                    ? 'skeuo-button-primary text-[#FFFFFF] shadow-2xs'
                    : 'text-[#55534F] hover:text-[#171717]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('courses.labels.viewDetails')}</span>
              </button>
            </div>

            <Button
              to="/batches"
              variant="outline"
              size="sm"
              leftIcon={<Calendar className="w-3.5 h-3.5 text-[#C83B32]" />}
            >
              {t('common.nav.batches')}
            </Button>
          </div>
        </div>

        {/* View Content */}
        {activeTab === 'compare' ? (
          <CourseComparisonSection />
        ) : (
          <div className="space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#171717]">
                Complete CEFR Course Catalog (A1–C1)
              </h2>
              <p className="text-sm text-[#55534F]">
                Structured classroom and online modules designed around the Common European Framework of Reference. Prepare thoroughly for Goethe-Zertifikat, telc, and TestDaF examinations.
              </p>
            </div>

            {/* Levels Grid */}
            <div className="space-y-8">
              {COURSES_DATA.map((course) => (
                <div
                  key={course.id}
                  className="skeuo-flashcard rounded-[6px] p-6 sm:p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#DEDAD1]">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-[5px] skeuo-button-dark text-[#FFFFFF] font-heading font-extrabold text-base flex items-center justify-center">
                          {course.level}
                        </span>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#171717]">
                            {course.title}
                          </h3>
                          <p className="text-xs uppercase tracking-wider text-[#C83B32] font-semibold">
                            {course.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-sm text-[#55534F] leading-relaxed pt-1">
                        {course.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 text-xs text-[#55534F] shrink-0">
                      <div className="flex items-center gap-1.5 skeuo-recessed px-3 py-1.5 rounded-[5px]">
                        <Clock className="w-4 h-4 text-[#C83B32]" />
                        <span className="font-semibold text-[#171717]">{course.hoursTotal} Hours</span>
                        <span className="text-[#89857E]">({course.durationWeeks} Weeks)</span>
                      </div>

                      <div className="flex items-center gap-1.5 skeuo-badge rounded-[5px] px-3 py-1.5 text-[#9A7D2C]">
                        <Award className="w-4 h-4 text-[#D7B95D]" />
                        <span className="font-medium">{course.examTarget}</span>
                      </div>

                      <Badge variant="stone" size="sm">
                        {course.mode} Delivery Available
                      </Badge>
                    </div>
                  </div>

                  {/* Highlights & CTA */}
                  <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#171717] mb-2">
                        Key Competencies & Syllabus Highlights
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#55534F]">
                        {course.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2A684C] shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <Link
                        to={`/courses/${course.id}`}
                        className="text-xs font-semibold text-[#171717] hover:text-[#C83B32] px-3 py-2 skeuo-button-secondary rounded-[5px]"
                      >
                        Level Details
                      </Link>
                      <Button
                        to="/demo"
                        variant="primary"
                        size="sm"
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        Enrol / Demo
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Informative Guidance */}
            <div className="mt-14 p-6 sm:p-8 bg-[#E8E5DD]/50 rounded-[4px] border border-[#DEDAD1] text-xs text-[#55534F] space-y-2">
              <h4 className="text-sm font-bold font-heading text-[#171717] uppercase tracking-wide">
                Not sure which level fits your current German proficiency?
              </h4>
              <p>
                Take our free, un-timed 15-minute diagnostic evaluation based on official CEFR standards to accurately pinpoint where to begin.
              </p>
              <div className="pt-2">
                <Button to="/assessment" variant="secondary" size="sm">
                  Take Free Level Assessment
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
