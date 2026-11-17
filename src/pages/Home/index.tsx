import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common/Container'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'
import { Button } from '@/components/common/Button'
import { COURSES_DATA } from '@/data/courses'
import { LEARNING_TOOLS_DATA } from '@/data/learningTools'
import { useLeadCapture, LeadCourseLevel } from '@/features/lead-capture'
import { getGeneralEnquiryWhatsAppUrl } from '@/config/business'
import { useTranslation } from '@/i18n'
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Users,
  Building2,
  Laptop,
  MessageCircle,
  GraduationCap,
  ShieldCheck,
  Quote,
} from 'lucide-react'

export const HomePage: React.FC = () => {
  const { openLeadModal } = useLeadCapture()
  const { t } = useTranslation()
  const featuredTools = LEARNING_TOOLS_DATA.slice(0, 4)

  const handleEnrolCourse = (courseId: string) => {
    const level = courseId.toUpperCase() as LeadCourseLevel
    openLeadModal({
      courseLevel: ['A1', 'A2', 'B1', 'B2', 'C1'].includes(level) ? level : 'Undecided',
      enquiryType: 'Course Enquiry',
      source: 'Homepage Course Card',
    })
  }

  const handleConsultation = () => {
    openLeadModal({
      courseLevel: 'Undecided',
      learningMode: 'Undecided',
      enquiryType: 'General Consultation',
      source: 'Homepage Consultation Card',
    })
  }

  const handleDemoCTA = () => {
    openLeadModal({
      courseLevel: 'Undecided',
      learningMode: 'Undecided',
      enquiryType: 'Free Demo Class',
      source: 'Homepage Demo Banner',
    })
  }

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 bg-gradient-to-b from-[#FFFFFF] to-[#F7F5F0] border-b border-[#DEDAD1]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#FAF6E8] border border-[#D7B95D]/40 text-xs font-semibold text-[#9A7D2C]">
                <Sparkles className="w-3.5 h-3.5 text-[#D7B95D]" />
                <span>{t('home.hero.badge')}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading text-[#171717] tracking-tight leading-[1.1] max-w-2xl">
                {t('home.hero.title1')} <span className="text-[#C83B32]">{t('home.hero.titleHighlight')}</span> {t('home.hero.title2')}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-[#55534F] leading-relaxed max-w-xl font-sans font-normal">
                {t('home.hero.subtitle')}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Button
                  to="/demo"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('home.hero.primaryCta')}
                </Button>

                <Button
                  to="/courses"
                  variant="outline"
                  size="lg"
                >
                  {t('home.hero.secondaryCta')}
                </Button>
              </div>

              {/* Institutional Assurance */}
              <div className="pt-6 border-t border-[#ECE8E0] flex flex-wrap items-center gap-6 text-xs text-[#55534F]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2A684C]" />
                  <span>{t('home.hero.trust1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1E4F8A]" />
                  <span>{t('home.hero.trust2')}</span>
                </div>
              </div>
            </div>

            {/* Right Visual Editorial Showcase */}
            <div className="lg:col-span-5">
              <div className="skeuo-paper-stacked rounded-[6px] p-6 sm:p-8 relative">
                {/* Flag Bar Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 flex rounded-t-[6px] overflow-hidden" aria-hidden="true">
                  <div className="h-full flex-1 bg-[#171717]" />
                  <div className="h-full flex-1 bg-[#C83B32]" />
                  <div className="h-full flex-1 bg-[#D7B95D]" />
                </div>

                <div className="flex items-center justify-between pb-5 border-b border-[#DEDAD1]">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#89857E] font-semibold">
                      D9W Academic Framework
                    </span>
                    <h3 className="text-lg font-heading font-bold text-[#171717]">
                      CEFR Language Path
                    </h3>
                  </div>
                  <Badge variant="accent">Hochdeutsch</Badge>
                </div>

                {/* CEFR Level Ladder Visual */}
                <div className="py-5 space-y-3">
                  {[
                    { lvl: 'A1', name: 'Beginner Foundation', hrs: '80h', ex: 'Goethe A1' },
                    { lvl: 'A2', name: 'Elementary Communication', hrs: '80h', ex: 'Goethe A2' },
                    { lvl: 'B1', name: 'Intermediate Independence', hrs: '100h', ex: 'Goethe / telc B1' },
                    { lvl: 'B2', name: 'Professional Fluency', hrs: '120h', ex: 'Goethe / TestDaF' },
                    { lvl: 'C1', name: 'Advanced Academic Mastery', hrs: '140h', ex: 'Goethe / DSH' },
                  ].map((item) => (
                    <div
                      key={item.lvl}
                      className="flex items-center justify-between p-2.5 rounded-[4px] skeuo-recessed hover:bg-[#FAF6E8] hover:border-[#D7B95D]/40 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-[3px] skeuo-button-dark text-white font-mono font-bold flex items-center justify-center text-xs">
                          {item.lvl}
                        </span>
                        <div>
                          <strong className="block text-[#171717]">{item.name}</strong>
                          <span className="text-[11px] text-[#89857E]">{item.ex}</span>
                        </div>
                      </div>
                      <span className="font-mono text-[#55534F] font-semibold text-[11px] px-2 py-0.5 rounded bg-white/70 border border-[#DEDAD1]">
                        {item.hrs}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Direct quick action */}
                <div className="pt-3 border-t border-[#DEDAD1] flex items-center justify-between text-xs">
                  <span className="text-[#89857E]">Free 15-min placement diagnostic</span>
                  <Link
                    to="/assessment"
                    className="font-semibold text-[#C83B32] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Take Assessment</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. INSTITUTE INTRODUCTION */}
      <section>
        <Container size="xl">
          <div className="skeuo-paper rounded-[6px] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="gold">Institutional Standard</Badge>
                  <span className="text-xs uppercase tracking-wider text-[#89857E]">
                    Sprachinstitut für Deutsch
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#171717]">
                  Precision German Language Education Built for Real-World Success
                </h2>

                <p className="text-sm sm:text-base text-[#55534F] leading-relaxed">
                  D9W German Language Institute is founded on the conviction that mastering German should be transparent, academically sound, and directly tied to your aspirations in Germany, Austria, and Switzerland. Whether you are pursuing medical licensing, engineering degrees, vocational training (Ausbildung), or global career opportunities, our curriculum emphasizes authentic communicative fluency alongside grammatical mastery.
                </p>
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#DEDAD1] pt-6 lg:pt-0 lg:pl-8 space-y-4">
                <div className="space-y-1">
                  <div className="text-2xl font-black font-heading text-[#C83B32]">
                    A1 to C1
                  </div>
                  <p className="text-xs text-[#55534F]">
                    Complete Common European Framework progression with certified milestone checkpoints.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="text-2xl font-black font-heading text-[#171717]">
                    10 Interactive Tools
                  </div>
                  <p className="text-xs text-[#55534F]">
                    Digital learning hub available 24/7 to reinforce grammar, numbers, and vocabulary.
                  </p>
                </div>

                <div className="pt-2">
                  <Button to="/about" variant="outline" size="sm" className="w-full">
                    Read About Our Institute
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. A1–C1 COURSE CARDS */}
      <section>
        <Container size="xl">
          <SectionHeading
            eyebrow={t('home.coursesSection.eyebrow')}
            title={t('home.coursesSection.title')}
            description={t('home.coursesSection.subtitle')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COURSES_DATA.map((course) => (
              <div
                key={course.id}
                className="skeuo-flashcard rounded-[6px] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-[5px] skeuo-button-dark text-white font-heading font-extrabold text-base flex items-center justify-center">
                      {course.level}
                    </span>
                    <Badge variant="stone" size="sm">{course.hoursTotal} Hours</Badge>
                  </div>

                  <h3 className="text-lg font-heading font-bold text-[#171717] mb-1">
                    {course.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#C83B32] font-semibold mb-3">
                    {course.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed mb-4">
                    {course.description}
                  </p>

                  <div className="py-3 border-y border-[#ECE8E0] space-y-1.5 mb-4 text-xs">
                    <div className="flex items-center gap-2 text-[#55534F]">
                      <Award className="w-3.5 h-3.5 text-[#D7B95D]" />
                      <span>{course.examTarget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#55534F]">
                      <Clock className="w-3.5 h-3.5 text-[#C83B32]" />
                      <span>{course.durationWeeks} Weeks &bull; {course.mode}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-xs font-semibold text-[#171717] hover:text-[#C83B32] transition-colors"
                  >
                    View Curriculum &rarr;
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleEnrolCourse(course.id)}
                    className="skeuo-button-primary px-3 py-1.5 rounded-[4px] text-xs font-bold text-white transition-all active:translate-y-0.5 cursor-pointer"
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            ))}

            {/* Quick Consultation Card */}
            <div className="skeuo-paper rounded-[6px] p-6 flex flex-col justify-between border-t-3 border-t-[#D7B95D] bg-gradient-to-b from-[#FAF8F2] to-[#F5EEDB]">
              <div className="space-y-3">
                <Badge variant="gold">Admissions Guidance</Badge>
                <h3 className="text-lg font-heading font-bold text-[#171717]">
                  Need Personalized Course Guidance?
                </h3>
                <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed">
                  Our academic advisors evaluate your previous German background, university deadlines, and exam schedules to construct a customized roadmap.
                </p>
              </div>

              <div className="pt-6 space-y-2.5">
                <Button to="/assessment" variant="secondary" size="sm" className="w-full">
                  Take Free Level Assessment
                </Button>
                <button
                  type="button"
                  onClick={handleConsultation}
                  className="w-full py-2 px-3 rounded-[4px] text-xs font-bold text-[#171717] bg-white border border-[#DCD7CD] hover:border-[#171717] transition-all active:translate-y-0.5 cursor-pointer"
                >
                  Speak to an Advisor
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. LEARNING HUB PREVIEW */}
      <section className="bg-[#FFFFFF] py-16 border-y border-[#DEDAD1]">
        <Container size="xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <SectionHeading
                eyebrow={t('home.learningHubSection.eyebrow')}
                title={t('home.learningHubSection.title')}
                description={t('home.learningHubSection.subtitle')}
                className="mb-0"
              />
            </div>
            <Button
              to="/learning-hub"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4 text-[#C83B32]" />}
              className="shrink-0 self-start md:self-auto"
            >
              {t('home.learningHubSection.exploreHub')}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool) => (
              <div
                key={tool.id}
                className="p-5 rounded-[6px] skeuo-paper flex flex-col justify-between hover:translate-y-[-2px] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="stone" size="sm">{tool.category}</Badge>
                    <Badge variant="gold" size="sm">{tool.levelRange}</Badge>
                  </div>

                  <h3 className="text-base font-heading font-bold text-[#171717] mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[#55534F] leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE8E0] flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#89857E]">
                    Interactive Tool
                  </span>
                  <Link
                    to={tool.slug}
                    className="text-xs font-semibold text-[#C83B32] hover:underline"
                  >
                    Open Tool &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. WHY LEARN WITH D9W */}
      <section>
        <Container size="xl">
          <SectionHeading
            eyebrow="INSTITUTIONAL EXCELLENCE"
            title="Why Students & Professionals Choose D9W"
            description="Our academic framework is engineered to deliver demonstrable German fluency with European pedagogical integrity."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
              <div className="w-10 h-10 rounded-[5px] skeuo-badge-die flex items-center justify-center">
                <Award className="w-5 h-5 text-[#C83B32]" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#171717]">
                Goethe & telc Exam Prep
              </h3>
              <p className="text-xs text-[#55534F] leading-relaxed">
                Exam format mastery from day one. Intensive practice for Lesen, Hören, Schreiben, and Sprechen modules.
              </p>
            </div>

            <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
              <div className="w-10 h-10 rounded-[5px] bg-gradient-to-b from-[#FAF6E8] to-[#F2E6C2] border border-[#D7B95D]/40 text-[#D7B95D] flex items-center justify-center shadow-xs">
                <Users className="w-5 h-5 text-[#8C7225]" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#171717]">
                Micro-Batches Only
              </h3>
              <p className="text-xs text-[#55534F] leading-relaxed">
                Strict limits of 14 students per online batch ensure every participant receives personalized speaking critique.
              </p>
            </div>

            <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
              <div className="w-10 h-10 rounded-[5px] skeuo-badge-das flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#2A684C]" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#171717]">
                10 Free Digital Tools
              </h3>
              <p className="text-xs text-[#55534F] leading-relaxed">
                Integrated practice tools for der/die/das article retention, inverted numbers, sentence syntax, and audio dictation.
              </p>
            </div>

            <div className="skeuo-paper rounded-[6px] p-6 space-y-3">
              <div className="w-10 h-10 rounded-[5px] skeuo-button-dark flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-heading font-bold text-[#171717]">
                Career & Visa Guidance
              </h3>
              <p className="text-xs text-[#55534F] leading-relaxed">
                Documentation advice and language certificates required for German universities, Ausbildung, and work permits.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. ONLINE VERSUS OFFLINE LEARNING */}
      <section>
        <Container size="xl">
          <SectionHeading
            eyebrow="FLEXIBLE LEARNING MODALITIES"
            title="Online Live vs. Offline Classroom: Choose Your Pace"
            description="Whether you require the global flexibility of live virtual classrooms or the full immersion of campus attendance, D9W delivers identical academic rigor."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Online Card */}
            <div className="skeuo-paper rounded-[6px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-[#C83B32]" />
                    <h3 className="text-xl font-heading font-bold text-[#171717]">
                      Online Interactive Live
                    </h3>
                  </div>
                  <Badge variant="stone">Anywhere Worldwide</Badge>
                </div>

                <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed mb-6">
                  Live synchronous classes conducted with studio-grade audio and video. Ideal for working professionals and international learners who demand flexibility without compromising quality.
                </p>

                <ul className="space-y-2.5 text-xs text-[#55534F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>Capped at 14 students for active conversational turns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>Video recordings and board annotations provided for every lecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>Evening and weekend batch schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>Full access to the 10 digital Learning Hub tools</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#ECE8E0] flex items-center justify-between">
                <Button to="/online-classes" variant="outline" size="sm">
                  Online Details
                </Button>
                <Button to="/demo" variant="primary" size="sm">
                  Book Online Demo
                </Button>
              </div>
            </div>

            {/* Offline Card */}
            <div className="skeuo-paper rounded-[6px] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#D7B95D]" />
                    <h3 className="text-xl font-heading font-bold text-[#171717]">
                      Offline Campus Immersion
                    </h3>
                  </div>
                  <Badge variant="stone">Campus Cohorts</Badge>
                </div>

                <p className="text-xs sm:text-sm text-[#55534F] leading-relaxed mb-6">
                  In-person classroom learning in an authentic German linguistic environment with peer workshops, library access, and German cultural speaking events.
                </p>

                <ul className="space-y-2.5 text-xs text-[#55534F] mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>Face-to-face roleplays and group project simulations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>Access to German physical library (books, newspapers, audio stations)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>Weekly German conversation clubs (Stammtisch)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2A684C] shrink-0" />
                    <span>In-person proctored mock examinations</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#ECE8E0] flex items-center justify-between">
                <Button to="/offline-classes" variant="outline" size="sm">
                  Campus Details
                </Button>
                <Button to="/demo" variant="secondary" size="sm">
                  Visit Campus / Demo
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 7. STUDENT TESTIMONIAL PREVIEW (Verified Profiles & Experiences) */}
      <section className="bg-[#FFFFFF] py-16 border-y border-[#DEDAD1]">
        <Container size="xl">
          <SectionHeading
            eyebrow="STUDENT EXPERIENCES"
            title="Proven Journeys into German Academia & Careers"
            description="Our students target universities, vocational visas, and healthcare recognition in Germany. Read verified profiles and student experience accounts."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[6px] skeuo-paper space-y-4">
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 text-[#C83B32] opacity-70" />
                <Badge variant="stone" size="sm">Verified A2 &rarr; B2</Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#55534F] italic leading-relaxed">
                "The small batch size made the biggest difference for me. Preparing for the medical Fachsprachprüfung requires intense speaking practice. The instructors at D9W kept our grammar tight while ensuring we spoke German constantly."
              </p>
              <div className="pt-3 border-t border-[#ECE8E0]">
                <strong className="block text-xs font-bold text-[#171717]">
                  Dr. Arvind M.
                </strong>
                <span className="text-[11px] text-[#89857E]">
                  Medical Doctor &bull; Passed Goethe B2
                </span>
              </div>
            </div>

            <div className="p-6 rounded-[6px] skeuo-paper space-y-4">
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 text-[#C83B32] opacity-70" />
                <Badge variant="stone" size="sm">Verified A1 &rarr; B1</Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#55534F] italic leading-relaxed">
                "Starting from zero German was intimidating, but the structured A1 and A2 modules broke down complex things like cases and adjective endings logically. The online Sentence Builder tool was my daily homework companion."
              </p>
              <div className="pt-3 border-t border-[#ECE8E0]">
                <strong className="block text-xs font-bold text-[#171717]">
                  Priya K.
                </strong>
                <span className="text-[11px] text-[#89857E]">
                  Master's Aspirant (TU Munich) &bull; Passed telc B1
                </span>
              </div>
            </div>

            <div className="p-6 rounded-[6px] skeuo-paper space-y-4">
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 text-[#C83B32] opacity-70" />
                <Badge variant="stone" size="sm">Verified B2 &rarr; C1</Badge>
              </div>
              <p className="text-xs sm:text-sm text-[#55534F] italic leading-relaxed">
                "For academic German and TestDaF preparation, you need instructors who understand scientific text structures and Konjunktiv nuance. D9W delivered exactly the intellectual rigor required."
              </p>
              <div className="pt-3 border-t border-[#ECE8E0]">
                <strong className="block text-xs font-bold text-[#171717]">
                  Stefan R.
                </strong>
                <span className="text-[11px] text-[#89857E]">
                  Engineering Researcher &bull; TestDaF Level 4/5
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. FREE DEMO CLASS CTA BANNER */}
      <section>
        <Container size="xl">
          <div className="skeuo-recessed-dark text-[#FFFFFF] rounded-[6px] p-8 sm:p-14 relative overflow-hidden">
            {/* Top decorative flag strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex" aria-hidden="true">
              <div className="h-full flex-1 bg-[#171717]" />
              <div className="h-full flex-1 bg-[#C83B32]" />
              <div className="h-full flex-1 bg-[#D7B95D]" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#2A2A2A] border border-[#444444] text-xs font-semibold text-[#D7B95D] shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Free 45-Minute Interactive Session</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-heading tracking-tight leading-tight">
                  {t('home.ctaSection.title')}
                </h2>

                <p className="text-sm sm:text-base text-[#DEDAD1] leading-relaxed max-w-xl">
                  {t('home.ctaSection.subtitle')}
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Button
                  onClick={handleDemoCTA}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center cursor-pointer"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {t('home.ctaSection.bookDemo')}
                </Button>

                <Button
                  href={getGeneralEnquiryWhatsAppUrl()}
                  external
                  variant="outline"
                  size="md"
                  className="w-full justify-center text-white border-[#444444] hover:bg-[#2A2A2A] hover:border-white"
                  leftIcon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
                >
                  {t('home.ctaSection.whatsappConsult')}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
