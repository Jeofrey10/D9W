import React, { useRef } from 'react'
import { Container } from '@/components/common/Container'
import {
  SyllabusHero,
  SyllabusLevelSelector,
  SyllabusActionBar,
  SyllabusOverview,
  SyllabusSkillPillars,
  SyllabusModuleAccordion,
  SyllabusGrammarMap,
  SyllabusVocabularyMap,
  SyllabusExamPreparation,
  SyllabusConversionCTA,
  SyllabusPrintDocument,
  useSyllabus,
} from '@/features/syllabus'

export const SyllabusPage: React.FC = () => {
  const curriculumRef = useRef<HTMLDivElement>(null)

  const {
    selectedLevel,
    syllabus,
    expandedModules,
    selectLevel,
    toggleModule,
    expandAllModules,
    collapseAllModules,
    downloadPdf,
  } = useSyllabus('A1')

  const handleScrollToCurriculum = () => {
    curriculumRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ========================================================= */}
      {/* SCREEN INTERACTION VIEW                                   */}
      {/* ========================================================= */}
      <div className="py-10 sm:py-16 space-y-10 sm:space-y-14 screen-only">
        <Container size="xl">
          {/* SECTION A — Editorial Hero */}
          <SyllabusHero
            onScrollToCurriculum={handleScrollToCurriculum}
            onDownloadPdf={downloadPdf}
          />

          {/* SECTION B — Interactive Level Selector */}
          <div ref={curriculumRef} className="mt-10 pt-2 scroll-mt-24 space-y-6">
            <SyllabusLevelSelector
              selectedLevel={selectedLevel}
              onSelectLevel={selectLevel}
            />

            {/* Action Bar (Download PDF / WhatsApp / Batch Schedule) */}
            <SyllabusActionBar
              syllabus={syllabus}
              onDownloadPdf={downloadPdf}
            />
          </div>

          {/* Main Syllabus Body Container */}
          <div
            id={`syllabus-content-${selectedLevel}`}
            role="tabpanel"
            aria-labelledby={`syllabus-tab-${selectedLevel}`}
            className="mt-8 space-y-10"
          >
            {/* SECTION C — Syllabus Overview */}
            <SyllabusOverview syllabus={syllabus} />

            {/* SECTION D — Four Skill Pillars */}
            <SyllabusSkillPillars skills={syllabus.skillOutcomes} />

            {/* SECTION E — Module-by-Module Progression Accordion */}
            <SyllabusModuleAccordion
              modules={syllabus.modules}
              expandedModules={expandedModules}
              onToggleModule={toggleModule}
              onExpandAll={expandAllModules}
              onCollapseAll={collapseAllModules}
            />

            {/* SECTION F — Grammar & Vocabulary Maps */}
            <div className="grid grid-cols-1 gap-8">
              <SyllabusGrammarMap grammarItems={syllabus.grammarMap} />
              <SyllabusVocabularyMap vocabularyItems={syllabus.vocabularyMap} />
            </div>

            {/* SECTION G — Exam Preparation */}
            <SyllabusExamPreparation examInfo={syllabus.examPreparation} />

            {/* SECTION H — Final Conversion CTA */}
            <SyllabusConversionCTA
              syllabus={syllabus}
              onDownloadPdf={downloadPdf}
            />
          </div>
        </Container>
      </div>

      {/* ========================================================= */}
      {/* PRINT-ONLY VECTOR DOCUMENT (Visible when printing / PDF)  */}
      {/* ========================================================= */}
      <SyllabusPrintDocument syllabus={syllabus} />
    </>
  )
}
