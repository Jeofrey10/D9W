import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { PageLayout } from '@/components/layout/PageLayout'
import { ScrollToTop } from '@/components/common/ScrollToTop'

// Main Pages (Lazy loaded for optimal performance & code-splitting)
const HomePage = lazy(() => import('@/pages/Home').then((m) => ({ default: m.HomePage })))
const CoursesPage = lazy(() => import('@/pages/Courses').then((m) => ({ default: m.CoursesPage })))
const CourseLevelDetailPage = lazy(() =>
  import('@/pages/Courses/CourseLevelDetail').then((m) => ({ default: m.CourseLevelDetailPage }))
)
const LearningHubPage = lazy(() =>
  import('@/pages/LearningHub').then((m) => ({ default: m.LearningHubPage }))
)
const AboutPage = lazy(() => import('@/pages/About').then((m) => ({ default: m.AboutPage })))
const ContactPage = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.ContactPage })))
const AssessmentPage = lazy(() =>
  import('@/pages/Assessment').then((m) => ({ default: m.AssessmentPage }))
)
const OnlineClassesPage = lazy(() =>
  import('@/pages/OnlineClasses').then((m) => ({ default: m.OnlineClassesPage }))
)
const OfflineClassesPage = lazy(() =>
  import('@/pages/OfflineClasses').then((m) => ({ default: m.OfflineClassesPage }))
)
const DemoPage = lazy(() => import('@/pages/Demo').then((m) => ({ default: m.DemoPage })))
const BatchesPage = lazy(() => import('@/pages/Batches').then((m) => ({ default: m.BatchesPage })))
const SyllabusPage = lazy(() => import('@/pages/Syllabus').then((m) => ({ default: m.SyllabusPage })))
const NotFoundPage = lazy(() =>
  import('@/pages/NotFound').then((m) => ({ default: m.NotFoundPage }))
)

// Learning Hub Interactive Tool Pages
const DictionaryPage = lazy(() =>
  import('@/pages/LearningHub/tools/DictionaryPage').then((m) => ({ default: m.DictionaryPage }))
)
const ArticleExplorerPage = lazy(() =>
  import('@/pages/LearningHub/tools/ArticleExplorerPage').then((m) => ({
    default: m.ArticleExplorerPage,
  }))
)
const NumberTrainerPage = lazy(() =>
  import('@/pages/LearningHub/tools/NumberTrainerPage').then((m) => ({
    default: m.NumberTrainerPage,
  }))
)
const TimeTrainerPage = lazy(() =>
  import('@/pages/LearningHub/tools/TimeTrainerPage').then((m) => ({ default: m.TimeTrainerPage }))
)
const SentenceBuilderPage = lazy(() =>
  import('@/pages/LearningHub/tools/SentenceBuilderPage').then((m) => ({
    default: m.SentenceBuilderPage,
  }))
)
const ListeningPracticePage = lazy(() =>
  import('@/pages/ListeningPractice').then((m) => ({ default: m.ListeningPracticePage }))
)
const ReadingPracticePage = lazy(() =>
  import('@/pages/ReadingPractice').then((m) => ({ default: m.ReadingPracticePage }))
)
const MyVocabularyPage = lazy(() =>
  import('@/pages/MyVocabulary').then((m) => ({ default: m.MyVocabularyPage }))
)
const WordOfTheDayPage = lazy(() =>
  import('@/pages/WordOfTheDay').then((m) => ({ default: m.WordOfTheDayPage }))
)
const CaseTranslatorPage = lazy(() =>
  import('@/pages/CaseTranslator').then((m) => ({ default: m.CaseTranslatorPage }))
)
const StudyPlannerPage = lazy(() =>
  import('@/pages/LearningHub/tools/StudyPlannerPage').then((m) => ({
    default: m.StudyPlannerPage,
  }))
)

// Subtle Editorial Loading Indicator
const PageLoadingFallback: React.FC = () => (
  <div className="py-24 sm:py-36 flex flex-col items-center justify-center space-y-4">
    <img
      src="/assets/d9w-institute-logo.png"
      alt="D9W German Language Institute"
      className="w-[95px] h-auto object-contain animate-pulse"
      width={1024}
      height={682}
    />
    <div className="w-6 h-6 border-2 border-[#DEDAD1] border-t-[#C83B32] rounded-full animate-spin" />
    <span className="text-xs font-mono uppercase tracking-widest text-[#89857E]">
      D9W Sprachinstitut &bull; Lade Modul...
    </span>
  </div>
)

export const AppRoutes: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <PageLayout>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            {/* Main Institution Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/course-comparison" element={<CoursesPage />} />
            <Route path="/courses/:level" element={<CourseLevelDetailPage />} />
            <Route path="/learning-hub" element={<LearningHubPage />} />
            <Route path="/online-classes" element={<OnlineClassesPage />} />
            <Route path="/offline-classes" element={<OfflineClassesPage />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/syllabus" element={<SyllabusPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/demo" element={<DemoPage />} />

            {/* 10 Interactive Learning Tools Routes */}
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/article-explorer" element={<ArticleExplorerPage />} />
            <Route path="/number-trainer" element={<NumberTrainerPage />} />
            <Route path="/time-trainer" element={<TimeTrainerPage />} />
            <Route path="/sentence-builder" element={<SentenceBuilderPage />} />
            <Route path="/listening-practice" element={<ListeningPracticePage />} />
            <Route path="/listening" element={<ListeningPracticePage />} />
            <Route path="/reading-practice" element={<ReadingPracticePage />} />
            <Route path="/reading" element={<ReadingPracticePage />} />
            <Route path="/my-vocabulary" element={<MyVocabularyPage />} />
            <Route path="/word-of-the-day" element={<WordOfTheDayPage />} />
            <Route path="/wort-des-tages" element={<WordOfTheDayPage />} />
            <Route path="/daily-word" element={<WordOfTheDayPage />} />
            <Route path="/case-translator" element={<CaseTranslatorPage />} />
            <Route path="/german-cases" element={<CaseTranslatorPage />} />
            <Route path="/grammar-engine" element={<CaseTranslatorPage />} />
            <Route path="/translator" element={<CaseTranslatorPage />} />
            <Route path="/study-planner" element={<StudyPlannerPage />} />
            <Route path="/exam-planner" element={<StudyPlannerPage />} />
            <Route path="/study-schedule" element={<StudyPlannerPage />} />

            {/* 404 Catch-All */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageLayout>
    </>
  )
}
