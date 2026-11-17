import React from 'react'
import { SyllabusDocument } from '@/data/syllabus'
import { businessInfo } from '@/config/business'

interface SyllabusPrintDocumentProps {
  syllabus: SyllabusDocument
}

export const SyllabusPrintDocument: React.FC<SyllabusPrintDocumentProps> = ({ syllabus }) => {
  return (
    <article className="print-document font-sans text-[#171717]">
      {/* ==================================================== */}
      {/* PAGE 1: COVER PAGE                                   */}
      {/* ==================================================== */}
      <section className="print-page-break pt-8 pb-12 flex flex-col justify-between min-h-[260mm]">
        {/* Top Flag Strip */}
        <div>
          <div className="h-2 w-full flex mb-6" aria-hidden="true">
            <div className="flex-1 bg-[#171717]" />
            <div className="flex-1 bg-[#C83B32]" />
            <div className="flex-1 bg-[#D7B95D]" />
          </div>

          <div className="flex items-center justify-between border-b-2 border-[#171717] pb-4">
            <div className="flex items-center gap-4">
              <img
                src="/assets/d9w-institute-logo.png"
                alt="D9W German Language Institute"
                className="w-[125px] h-auto object-contain"
                width={1024}
                height={682}
              />
              <div>
                <span className="font-heading font-extrabold text-lg tracking-tight block">
                  D9W German Language Institute
                </span>
                <span className="text-[10pt] uppercase tracking-widest text-[#55534F] font-bold block">
                  Sprachinstitut • Academic Curriculum Framework
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-heading font-extrabold text-[#C83B32] block">
                {syllabus.level}
              </span>
              <span className="text-[9pt] font-mono text-[#89857E] uppercase block">
                Official CEFR Syllabus
              </span>
            </div>
          </div>

          {/* Hero Title Block */}
          <div className="mt-16 space-y-4">
            <span className="text-[11pt] font-mono uppercase tracking-widest text-[#C83B32] font-bold block">
              Curriculum Specification & Learning Outcomes
            </span>
            <h1 className="text-3xl font-heading font-extrabold text-[#171717] leading-tight">
              {syllabus.title}
            </h1>
            <p className="text-lg font-heading font-semibold text-[#55534F]">
              {syllabus.subtitle}
            </p>

            <div className="mt-8 p-6 border-l-4 border-[#C83B32] bg-[#FAF8F5] space-y-2">
              <span className="text-[10pt] font-mono uppercase font-bold text-[#171717] block">
                Curriculum Executive Summary
              </span>
              <p className="text-[10.5pt] text-[#333333] leading-relaxed">
                {syllabus.overview}
              </p>
            </div>
          </div>
        </div>

        {/* Metadata Footer on Cover Page */}
        <div className="border-t border-[#DEDAD1] pt-6 space-y-4">
          <div className="grid grid-cols-3 gap-4 text-[9.5pt]">
            <div>
              <span className="text-[#89857E] font-mono uppercase text-[8pt] block">Total Duration</span>
              <strong className="text-[#171717]">{syllabus.durationWeeks} Weeks • {syllabus.hoursTotal} Teaching Hours</strong>
            </div>
            <div>
              <span className="text-[#89857E] font-mono uppercase text-[8pt] block">CEFR Target</span>
              <strong className="text-[#171717]">{syllabus.subtitle.split('(')[1]?.replace(')', '') || syllabus.level}</strong>
            </div>
            <div>
              <span className="text-[#89857E] font-mono uppercase text-[8pt] block">Publication Date</span>
              <strong className="text-[#171717]">{syllabus.publishedDate} (Version 1.0)</strong>
            </div>
          </div>

          <div className="pt-2 text-[8pt] text-[#89857E] flex justify-between border-t border-[#E8E5DD]">
            <span>D9W German Institute • Admissions & Academic Office</span>
            <span>Document ID: D9W-SYL-{syllabus.level}-2026</span>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* PAGE 2: OBJECTIVES & FOUR SKILL PILLARS              */}
      {/* ==================================================== */}
      <section className="print-page-break pt-4 pb-8 space-y-6">
        <div className="border-b border-[#171717] pb-2 flex justify-between items-baseline">
          <h2 className="text-xl font-heading font-extrabold uppercase tracking-wide">
            1. Course Objectives & Four Language Pillars
          </h2>
          <span className="text-[9pt] font-mono text-[#89857E]">
            CEFR {syllabus.level} Benchmark
          </span>
        </div>

        {/* Prerequisites */}
        <div className="space-y-2">
          <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#171717]">
            Prerequisites & Entry Profile
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-[9.5pt] text-[#333333]">
            {syllabus.prerequisites.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-2">
          <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#171717]">
            Core Competency Benchmarks
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-[9.5pt] text-[#333333]">
            {syllabus.learningObjectives.map((obj, idx) => (
              <li key={idx}>{obj}</li>
            ))}
          </ul>
        </div>

        {/* Four Skill Pillars Grid */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#171717]">
            Four-Pillar Communicative Competencies
          </h3>

          <div className="grid grid-cols-2 gap-3 text-[9pt]">
            {/* Hören */}
            <div className="p-3 border border-[#DEDAD1] border-t-2 border-t-[#1E4F8A] space-y-1">
              <strong className="text-[#1E4F8A] block uppercase text-[8.5pt]">
                HÖREN (Listening Comprehension)
              </strong>
              <p className="text-[#333333] leading-snug">{syllabus.skillOutcomes.listening.summary}</p>
              <div className="pt-1 text-[#666666] text-[8pt]">
                <em>Task: </em>{syllabus.skillOutcomes.listening.practicalTask}
              </div>
            </div>

            {/* Sprechen */}
            <div className="p-3 border border-[#DEDAD1] border-t-2 border-t-[#C83B32] space-y-1">
              <strong className="text-[#C83B32] block uppercase text-[8.5pt]">
                SPRECHEN (Oral Production & Fluency)
              </strong>
              <p className="text-[#333333] leading-snug">{syllabus.skillOutcomes.speaking.summary}</p>
              <div className="pt-1 text-[#666666] text-[8pt]">
                <em>Task: </em>{syllabus.skillOutcomes.speaking.practicalTask}
              </div>
            </div>

            {/* Lesen */}
            <div className="p-3 border border-[#DEDAD1] border-t-2 border-t-[#2A684C] space-y-1">
              <strong className="text-[#2A684C] block uppercase text-[8.5pt]">
                LESEN (Reading Comprehension)
              </strong>
              <p className="text-[#333333] leading-snug">{syllabus.skillOutcomes.reading.summary}</p>
              <div className="pt-1 text-[#666666] text-[8pt]">
                <em>Task: </em>{syllabus.skillOutcomes.reading.practicalTask}
              </div>
            </div>

            {/* Schreiben */}
            <div className="p-3 border border-[#DEDAD1] border-t-2 border-t-[#D7B95D] space-y-1">
              <strong className="text-[#9A7D2C] block uppercase text-[8.5pt]">
                SCHREIBEN (Written Composition)
              </strong>
              <p className="text-[#333333] leading-snug">{syllabus.skillOutcomes.writing.summary}</p>
              <div className="pt-1 text-[#666666] text-[8pt]">
                <em>Task: </em>{syllabus.skillOutcomes.writing.practicalTask}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E8E5DD] flex justify-between text-[8pt] text-[#89857E]">
          <span>D9W German Institute • Syllabus Specification</span>
          <span>Page 2 / 4</span>
        </div>
      </section>

      {/* ==================================================== */}
      {/* PAGE 3: MODULE PROGRESSION                           */}
      {/* ==================================================== */}
      <section className="print-page-break pt-4 pb-8 space-y-5">
        <div className="border-b border-[#171717] pb-2 flex justify-between items-baseline">
          <h2 className="text-xl font-heading font-extrabold uppercase tracking-wide">
            2. Modular Curriculum Architecture
          </h2>
          <span className="text-[9pt] font-mono text-[#89857E]">
            {syllabus.modules.length} Progressive Modules
          </span>
        </div>

        <div className="space-y-4">
          {syllabus.modules.map((mod) => (
            <div
              key={mod.id}
              className="print-avoid-break p-3.5 border border-[#DEDAD1] space-y-2 text-[9pt]"
            >
              <div className="flex items-center justify-between border-b border-[#E8E5DD] pb-1">
                <span className="font-heading font-bold text-[#171717] text-[10.5pt]">
                  {mod.germanTitle} ({mod.title})
                </span>
                <span className="text-[8pt] font-mono font-bold bg-[#E8E5DD] px-1.5 py-0.5 rounded text-[#171717]">
                  Module {mod.moduleNumber}
                </span>
              </div>

              <p className="text-[#55534F] italic text-[8.5pt] leading-snug">
                {mod.description}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1 text-[8.5pt]">
                <div>
                  <strong className="text-[#171717] block font-bold mb-0.5">Grammar Topics:</strong>
                  <ul className="list-disc pl-4 space-y-0.5 text-[#333333]">
                    {mod.grammarTopics.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <strong className="text-[#171717] block font-bold mb-0.5">Vocabulary Themes:</strong>
                  <ul className="list-disc pl-4 space-y-0.5 text-[#333333]">
                    {mod.vocabularyThemes.map((v, i) => (
                      <li key={i}>{v}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-1.5 border-t border-[#F0ECE4] text-[8pt] text-[#55534F] space-y-0.5">
                <div><strong>Oral & Audio Practice: </strong>{mod.skillActivities.speaking} • {mod.skillActivities.listening}</div>
                <div><strong>Text Practice: </strong>{mod.skillActivities.reading} • {mod.skillActivities.writing}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#E8E5DD] flex justify-between text-[8pt] text-[#89857E]">
          <span>D9W German Institute • Modular Structure</span>
          <span>Page 3 / 4</span>
        </div>
      </section>

      {/* ==================================================== */}
      {/* PAGE 4: EXAMINATION PREP & ADMISSIONS CONTACT        */}
      {/* ==================================================== */}
      <section className="pt-4 pb-8 space-y-6">
        <div className="border-b border-[#171717] pb-2 flex justify-between items-baseline">
          <h2 className="text-xl font-heading font-extrabold uppercase tracking-wide">
            3. Examination Readiness & Admissions
          </h2>
          <span className="text-[9pt] font-mono text-[#89857E]">
            Accredited Testing Alignment
          </span>
        </div>

        {/* Applicable Exams */}
        <div className="space-y-2">
          <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#171717]">
            Targeted International Examinations
          </h3>
          <div className="flex flex-wrap gap-2 text-[9pt]">
            {syllabus.examPreparation.applicableExams.map((exam, i) => (
              <span key={i} className="px-2.5 py-1 border border-[#171717] font-mono font-bold text-[#171717]">
                {exam}
              </span>
            ))}
          </div>
          <p className="text-[9pt] text-[#55534F] pt-1">
            <strong>Format: </strong>{syllabus.examPreparation.examStructure}
          </p>
        </div>

        {/* Key Strategies */}
        <div className="space-y-2">
          <h3 className="text-sm font-heading font-bold uppercase tracking-wider text-[#171717]">
            Pedagogical Strategies for Exam Success
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-[9pt] text-[#333333]">
            {syllabus.examPreparation.keyStrategies.map((strat, i) => (
              <li key={i}>{strat}</li>
            ))}
          </ul>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-4 border border-[#DEDAD1] bg-[#FAF8F5] text-[8.5pt] text-[#55534F] space-y-1">
          <strong className="text-[#171717] block uppercase font-bold">
            Institutional Regulatory Disclaimer:
          </strong>
          <p className="leading-relaxed">
            {syllabus.examPreparation.disclaimer}
          </p>
        </div>

        {/* Admissions Contact & Next Steps Box */}
        <div className="p-5 border-2 border-[#171717] space-y-3">
          <h3 className="text-sm font-heading font-extrabold uppercase tracking-wide text-[#171717]">
            Admissions Desk & Enrollment Inquiries
          </h3>
          <p className="text-[9pt] text-[#55534F] leading-relaxed">
            To register for upcoming cohorts of the {syllabus.level} German curriculum, enquire about scheduled batch times, or schedule a 1-on-1 language consultation:
          </p>

          <div className="grid grid-cols-2 gap-4 text-[9pt] pt-1">
            <div>
              <span className="font-bold text-[#171717] block">WhatsApp Admissions Desk:</span>
              <span>{businessInfo.whatsapp}</span>
            </div>
            <div>
              <span className="font-bold text-[#171717] block">Official Email:</span>
              <span>{businessInfo.email}</span>
            </div>
            <div>
              <span className="font-bold text-[#171717] block">Institute Campus:</span>
              <span>{businessInfo.address.full}</span>
            </div>
            <div>
              <span className="font-bold text-[#171717] block">Official Website & Tools:</span>
              <span>{businessInfo.website}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E8E5DD] flex justify-between text-[8pt] text-[#89857E]">
          <span>D9W German Language Institute • Official Syllabus Specification</span>
          <span>Page 4 / 4 (Final)</span>
        </div>
      </section>
    </article>
  )
}
