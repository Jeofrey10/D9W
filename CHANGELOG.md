# Changelog — D9W German Language Hub

All notable changes to the D9W German Language Institute platform are documented in this file.

## [Phase 03 — P03-09] - 2026-11-17

### Added
- **Personalized Study Schedule & Exam Countdown Generator (`src/features/study-planner/`, `/study-planner`, `/exam-planner`, `/study-schedule`)**:
  - `src/features/study-planner/types/studyPlanner.types.ts`: Strongly typed models for study plans, user preferences, exam configurations, countdowns, GLH estimations, phases, milestones, weekly schedules, study tasks, mock exam records, and progress metrics.
  - `src/data/study-planner/exam-options.ts`: Comprehensive specifications for 5 examination tracks (Goethe-Zertifikat, telc Deutsch, TestDaF, DSH, General German) with module breakdowns, durations, and non-affiliation disclaimers.
  - `src/data/study-planner/preparation-phases.ts`: 5 structured preparation phases (Foundation Building, Skill Development, Focused Practice, Revision & Mock Exams, Final Preparation) with dynamic duration boundary calculators.
  - `src/data/study-planner/skill-allocation.ts`: Weighted skill allocation algorithm with +40% boost for weakest skill, +20% for priority skills, and a hard minimum floor (>= 12%) for all four core language competencies.
  - `src/data/study-planner/study-activities.ts`: Curated catalog of level-appropriate study activities mapped directly to existing D9W learning tools (`/listening-practice`, `/reading-practice`, `/word-of-the-day`, `/case-translator`, `/sentence-builder`, `/article-explorer`, `/assessment`).
  - `src/data/study-planner/study-templates.ts`: Pre-configured archetypes (Working Professional, University Applicant Fast-Track, Steady Daily Routine, Weekend Scholar).
  - `src/features/study-planner/utils/countdownUtils.ts`: Timezone-safe countdown calculator computing exact days and weeks remaining without off-by-one errors or negative numbers.
  - `src/features/study-planner/utils/scheduleGenerator.ts`: 100% deterministic, offline schedule generation engine computing GLH comparisons and placing daily tasks and mock exam milestones.
  - `src/features/study-planner/utils/storageUtils.ts`: Safe LocalStorage management (`d9w-study-planner-v1`) with schema validation, JSON export, and JSON import.
  - `src/features/study-planner/hooks/useStudyPlanner.ts`: React hook managing plan lifecycle, task completions, skips, reschedules, duration edits, custom tasks, overdue recovery, mock exam scoring, and focus timers.
  - `src/features/study-planner/components/OnboardingWizard/`: 5-step onboarding wizard (Level, Exam & Date, Availability, Priorities, Review & Confirmation).
  - `src/features/study-planner/components/ExamCountdown/ExamCountdownCard.tsx`: Tactile countdown card with days/weeks, target provider/level, status badges, and planning notices.
  - `src/features/study-planner/components/WeeklyTimetable/WeeklyTimetable.tsx`: Interactive Monday-to-Sunday planner with Calendar and List views, rest-day indicators, and task management modals (`AddTaskModal.tsx`, `RescheduleTaskModal.tsx`).
  - `src/features/study-planner/components/DailySession/`: `DailyFocusSession.tsx` and `FocusTimer.tsx` (15/25/30/45 min focus timer with wall-clock drift protection).
  - `src/features/study-planner/components/MockExam/MockExamPlanner.tsx`: Milestone-based mock test recording for Hören, Lesen, Schreiben, and Sprechen with qualitative notes.
  - `src/features/study-planner/components/ProgressDashboard/ProgressDashboard.tsx`: Analytics dashboard with skill distribution, study hours, consistency bar, JSON export/import, and double-confirmation reset modal.
  - `src/features/study-planner/components/MissedTaskRecovery/MissedTaskBanner.tsx`: Overdue task recovery banner distributing missed items across future study slots.
  - `src/features/study-planner/components/PrintableSchedule/PrintableView.tsx`: A4 printable study roadmap with D9W letterhead and milestone checklists via `window.print()`.
  - `src/pages/LearningHub/tools/StudyPlannerPage.tsx`: Integrated route page with tabbed views (Today, Weekly, Mock Exams, Progress, Print, Settings).
- **Routing & Navigation**:
  - Registered `/study-planner`, `/exam-planner`, and `/study-schedule` in `src/routes/index.tsx`.
  - Updated `src/data/learningTools.ts`: Changed `tool-study-planner` from `status: 'Preview'` to `'Ready'`.
  - Updated `src/components/layout/Footer.tsx`: Enhanced footer link to `Study Planner & Exam Countdown`.
- **Automated Verification Suite**:
  - `scripts/test-study-planner.mjs`: 31 automated unit assertions verifying countdowns, GLH formulas, schedule determinism, rest-day handling, task actions, and schema validation via `npm run test:planner`.
- **Documentation**:
  - Created `docs/phase-03/P03-09-study-planner.md` and `docs/phase-03/P03-09-countdown-engine.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Phase 03 — P03-08] - 2026-11-17

### Added
- **Contextual Case Translator & German Grammar Engine (`src/features/case-translator/`, `/case-translator`, `/german-cases`, `/grammar-engine`, `/translator`)**:
  - `src/features/case-translator/types/caseTranslator.types.ts`: Strongly typed contracts for cases, genders, article types, declension sets, personal pronoun tables, preposition items, verb valencies, sentence analyses, quiz questions, submissions, and progress states.
  - `src/data/grammar/cases.ts`: Comprehensive definitions for Nominativ, Akkusativ, Dativ, and Genitiv with questions (*Wer?*, *Wen?*, *Wem?*, *Wessen?*), articles, common mistakes, verbs, and example sentences across CEFR A1 to C1.
  - `src/data/grammar/articles.ts`: Declension tables for Definite, Indefinite, Negative, and Possessive articles with stem logic, plus rules for genitive masculine/neuter `-s`/`-es` endings, N-Deklination exceptions, and dative plural `+n`.
  - `src/data/grammar/pronouns.ts`: Personal pronoun master chart across all 9 persons and 4 cases (*ich/mich/mir/meiner*, *Sie/Sie/Ihnen/Ihrer*, etc.).
  - `src/data/grammar/prepositions.ts`: Pure Accusative, pure Dative, pure Genitive, and 9 Two-Way (*Wechselpräpositionen*) with *Wo?* (Dativ) vs *Wohin?* (Akkusativ) rules and 11 universal contractions.
  - `src/data/grammar/verbs.ts`: Complete catalog of accusative, dative, dual-object, and genitive verbs with valency formulas.
  - `src/data/grammar/sentence-patterns.ts`: Declarative pattern definitions (`PAT-01` to `PAT-10`) recognized by the analyzer.
  - `src/data/grammar/case-examples.ts`: Verified corpus of annotated sentence examples with element decomposition.
  - `src/data/grammar/case-questions.ts`: Multi-level quiz question bank covering 7 question formats across A1 to C1.
  - `src/data/grammar/builder-exercises.ts`: Structured scrambled-sentence exercises for the Sentence Case Builder.
  - `src/features/case-translator/utils/caseAnalyzer.ts`: Deterministic sentence tokenizer, pattern matcher, and syntactic role assigner with transparent confidence and limitation disclosures.
  - `src/features/case-translator/utils/caseColorTokens.ts`: Authentic case color tokens (Nominativ: Slate, Akkusativ: Red, Dativ: Green, Genitiv: Gold).
  - `src/features/case-translator/hooks/useCaseProgress.ts`: LocalStorage persistence hook managing `d9w-case-grammar-progress-v1`.
  - `src/features/case-translator/components/CaseAnalyzerModule.tsx`: Module A — Interactive sentence analyzer with token highlights, syntactic breakdown table, and pattern inspector modal.
  - `src/features/case-translator/components/FourCaseCardsModule.tsx`: Module B — Interactive case cards with question words, articles, common mistakes, and quiz CTAs.
  - `src/features/case-translator/components/ArticleTransformationModule.tsx`: Module C — Interactive declension calculator and full reference matrices.
  - `src/features/case-translator/components/PrepositionTrainerModule.tsx`: Module D — Preposition explorer with interactive *Wo?* vs *Wohin?* switcher and contractions grid.
  - `src/features/case-translator/components/InteractiveCaseQuizModule.tsx`: Module E — Adaptive quiz with 7 question formats, instant explanations, and retry incorrect questions mode.
  - `src/features/case-translator/components/SentenceCaseBuilderModule.tsx`: Module F — Word tile construction with case breakdown cards.
  - `src/features/case-translator/components/ContextualCaseReferenceModule.tsx`: Module G — Searchable reference library for personal pronouns, verbs, and prepositions.
  - `src/features/case-translator/components/GrammarProgressDashboard.tsx`: Module H — Analytics dashboard with case accuracy breakdown and reset confirmation modal.
  - `src/pages/CaseTranslator/index.tsx`: Master route page with 8-module segmented navigation and URL query synchronization (`?tab=...`).
- **Routing & Site Integration**:
  - Registered `/case-translator`, `/german-cases`, `/grammar-engine`, and `/translator` in `src/routes/index.tsx`.
  - Updated `src/data/learningTools.ts`: Set `tool-translator` to `slug: '/case-translator'`, `name: 'Contextual Case Translator'`, and `status: 'Ready'`.
  - Updated `src/components/layout/Footer.tsx`: Updated link to `/case-translator`.
- **Automated Verification Suite**:
  - `scripts/test-case-translator.mjs`: 47 automated unit assertions verifying case definitions, article declensions, pronouns, prepositions, verbs, sentence analyzer, and quiz engine via `npm run test:cases`.
- **Documentation**:
  - Created `docs/phase-03/P03-08-case-translator.md` and `docs/phase-03/P03-08-grammar-matrix.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Phase 03 — P03-07] - 2026-11-17

### Added
- **Wort des Tages — Daily German Word Experience (`src/features/daily-word/`, `/word-of-the-day`, `/wort-des-tages`, `/daily-word`)**:
  - `src/features/daily-word/types/dailyWord.types.ts`: TypeScript contracts for 365-day schedule entries, daily word items, quiz questions, submissions, and streak states.
  - `src/data/daily-word/dailyWordConfig.ts`: Centralized configuration establishing `TIMEZONE: 'Europe/Berlin'`, `SCHEDULE_YEAR: 2026`, storage keys, and streak qualification rules.
  - `src/data/vocabulary/b2-vocabulary.json` & `c1-vocabulary.json`: Curated and verified CEFR B2 (14 words) and C1 (9 words) vocabulary datasets, expanding `ALL_VOCABULARY` to 145 canonical items.
  - `src/data/daily-word/dailyWordSchedule.ts`: Full 365-day deterministic vocabulary schedule for 2026 (334 published through Nov 30; 31 in review through Dec 31).
  - `src/features/daily-word/utils/dailyWordEngine.ts`: Deterministic date resolver using `Intl.DateTimeFormat` with `Europe/Berlin`, future date protection, and German/English date formatters.
  - `src/features/daily-word/utils/dailyWordQuizGenerator.ts`: Adaptive 3-part daily mini quiz generator (article selection, meaning selection, fill-in-the-blank) and pedagogical scoring tiers (*Ausgezeichnet!*, *Sehr gut!*, *Gut gemacht!*, *Weiter üben!*).
  - `src/features/daily-word/utils/dailyWordStreak.ts`: Consecutive daily streak calculator operating on Berlin calendar dates with midnight grace periods.
  - `src/features/daily-word/hooks/useDailyWordProgress.ts`: LocalStorage persistence hook managing `d9w-daily-word-progress-v1`.
  - `src/features/daily-word/hooks/useDailyWordCalendar.ts`: Monday-first monthly calendar grid generator with month navigation and learned status chips.
  - `src/features/daily-word/components/FeaturedWordCard.tsx`: Tactile hero desk card with German word, authentic gender colors (`der` Prussian Blue, `die` Crimson Red, `das` Forest Moss Green), IPA pronunciation, native speech synthesis, and action bar.
  - `src/features/daily-word/components/DailyWordExamples.tsx`: Example sentences with highlighted word typography, English translations, and individual speech playback.
  - `src/features/daily-word/components/DailyWordMiniQuiz.tsx`: Interactive mini quiz interface with score feedback, answer review, and retry capabilities.
  - `src/features/daily-word/components/DailyWordCalendar.tsx`: Monthly Monday-first calendar view with quick date jumps and learned status indicators.
  - `src/features/daily-word/components/DailyWordArchive.tsx`: Previous words archive with instant search, CEFR filters, and date sorting.
  - `src/features/daily-word/components/DailyWordStreakBadge.tsx`: Visual stats widget tracking current streak, longest streak, and total words learned.
  - `src/features/daily-word/components/DailyWordWidget.tsx`: Compact preview card embedded on the Learning Hub dashboard (`/learning-hub`).
  - `src/pages/WordOfTheDay/index.tsx`: Master page component with URL query parameter synchronization (`?date=YYYY-MM-DD`).
- **Routing & Site Integration**:
  - Registered `/word-of-the-day`, `/wort-des-tages`, and `/daily-word` in `src/routes/index.tsx`.
  - Updated `src/data/learningTools.ts`: Set `tool-daily-word` to `status: 'Ready'` with slug `/word-of-the-day`.
  - Updated `src/components/layout/Footer.tsx`: Updated Daily German Word link to `/word-of-the-day`.
  - Integrated `DailyWordWidget` into `src/pages/LearningHub/index.tsx`.
- **Automated Verification Suite**:
  - `scripts/test-daily-word-engine.mjs`: 37 unit tests verifying configuration, 365-day schedule continuity, editorial status, vocabulary lookup, determinism, mini quiz grading, streak math, and gender color tokens via `npm run test:daily-word`.
- **Documentation**:
  - Created `docs/phase-03/P03-07-word-of-the-day.md` and `docs/phase-03/P03-07-content-inventory.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Phase 03 — P03-06] - 2026-11-17

### Added
- **Interactive German Reading Practice Engine (Lesen) (`src/features/reading/`, `/reading-practice`, `/reading`, `/my-vocabulary`)**:
  - `src/features/reading/types/reading.types.ts`: Domain models for passages, paragraphs, word tokens, contextual explanations, questions, progress state, and saved vocabulary.
  - `src/data/reading/categories.ts`: All 12 standardized reading categories with bilingual titles and icons.
  - `src/data/reading/levels.ts`: CEFR level specifications with word counts, target reading speeds (WPM), and grammar benchmarks.
  - `src/data/reading/passages.ts`: 36 graded German reading texts (A1: 8, A2: 8, B1: 8, B2: 6, C1: 6) with paragraph structures and verified question sets.
  - `src/features/reading/utils/tokenizeGermanText.ts`: Non-destructive regex tokenizer preserving word casing, German characters (`ä`, `ö`, `ü`, `ß`), and trailing punctuation.
  - `src/features/reading/utils/vocabularyLookup.ts`: Contextual word lookup integrating passage key vocabulary, `GERMAN_MORPHOLOGY_MAP` inflection resolver, and the central `ALL_VOCABULARY` dictionary.
  - `src/features/reading/utils/readingScoring.ts`: Grading engine for Multiple Choice, True/False, Fill in Blank, and Short Answer questions with normalized tolerance matching and 4 score tiers.
  - `src/features/reading/utils/vocabularyExport.ts`: RFC 4180 CSV export generator with UTF-8 BOM (`\uFEFF`) and single-entry text copy formatter.
  - `src/features/reading/hooks/useReadingPreferences.ts`: Reader preferences hook managing font size, line spacing, and assistance modes under `d9w-reading-preferences-v1`.
  - `src/features/reading/hooks/useReadingProgress.ts`: LocalStorage progress tracking hook under `d9w-reading-progress-v1`.
  - `src/features/reading/hooks/useReadingVocabulary.ts`: Saved vocabulary collection hook under `d9w-reading-vocabulary-v1`.
  - `src/features/reading/hooks/useReadingFilters.ts`: Filter and sorting hook supporting search, CEFR levels, categories, difficulty, and completion filters.
  - `src/features/reading/components/InteractiveReadingText.tsx`: Tactile reading article with clickable word spans and noun gender dots.
  - `src/features/reading/components/VocabularyPopover.tsx`: Contextual vocabulary popover showing base lemma, gender badge, plural, meaning, grammar notes, and TTS pronunciation.
  - `src/features/reading/components/ReadingSettings.tsx`: Tactile control panel for text size, line height, and reading modes.
  - `src/features/reading/components/ReadingQuestionRenderer.tsx`: Question renderer supporting all 4 comprehension formats with model answers and review states.
  - `src/features/reading/components/ReadingResultPanel.tsx`: Results breakdown with skeuomorphic ink seals and retry triggers.
  - `src/features/reading/components/ReadingPassageWorkspace.tsx`: Focused reading desk with main text column, settings, key vocabulary drawer, and question tabs.
  - `src/features/reading/components/ReadingHero.tsx`: European editorial hero banner with tricolor accent.
  - `src/features/reading/components/ReadingLevelSelector.tsx`: Tactile 5-card CEFR selector with completion counts.
  - `src/features/reading/components/ReadingCategoryFilters.tsx`: Horizontal scrolling filter strip for all 12 categories.
  - `src/features/reading/components/ReadingPassageCard.tsx` & `ReadingPassageGrid.tsx`: Responsive passage cards and 1–3 column grid.
  - `src/features/reading/components/ReadingProgressDashboard.tsx`: Metric summary cards for completed passages, reading minutes, average score, and streaks.
  - `src/pages/ReadingPractice/index.tsx`: Main route view supporting deep linking (`?level=...`, `?passage=...`).
  - `src/pages/MyVocabulary/index.tsx`: Saved vocabulary manager with level/gender/type filters and CSV export.
- **Routing & Site Integration**:
  - Registered `/reading-practice`, `/reading` (alias), and `/my-vocabulary` in `src/routes/index.tsx`.
  - Updated `src/data/learningTools.ts`: Set `tool-reading` to `status: 'Ready'` with slug `/reading-practice`.
  - Updated `src/components/layout/Footer.tsx`: Added links for Reading Practice and My Saved Vocabulary.
- **Automated Verification Test Suite**:
  - `scripts/test-reading-engine.mjs`: 14 automated unit tests verifying curriculum inventory, tokenization, morphology resolution, scoring, and CSV export via `npm run test:reading`.
- **Documentation**:
  - Created `docs/phase-03/P03-06-reading-practice.md` and `docs/phase-03/P03-06-reading-content.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Phase 03 — P03-05] - 2026-11-17

### Added
- **German Listening Practice Engine (Hörverstehen) (`src/features/listening/`, `/listening-practice`, `/listening`)**:
  - `src/features/listening/types/listening.types.ts`: Strongly typed data contracts for exercises, levels, questions, transcripts, attempts, and progress states.
  - `src/data/listening/levels.ts`: All 5 CEFR levels (A1 to C1) with pedagogical descriptions, exercise counts, and recommended playback rates.
  - `src/data/listening/categories.ts`: All 10 thematic listening categories with German and English names, icons, and descriptions.
  - `src/data/listening/audioManifest.ts`: Comprehensive audio manifest documenting physical audio paths, sample rates, durations, speakers, and licenses.
  - `src/data/listening/exercises.ts`: 36 structured exercises (A1: 8, A2: 8, B1: 8, B2: 6, C1: 6) with 10 published native audio exercises and 26 pending studio audio specifications.
  - `scripts/generate_listening_audio.py`: Native PCM 16-bit WAV audio generator producing verified audio assets in `public/audio/listening/[level]/`.
  - `src/features/listening/hooks/useListeningPlayer.ts`: HTML5 Audio controller hook with global singleton playback exclusivity, progress scrubbing, and speed controls.
  - `src/features/listening/components/ListeningAudioPlayer.tsx`: Tactile skeuomorphic console with recessed scrubber well, Play/Pause, Replay (0:00), -5s/+5s skip, and 4-speed buttons (0.75x, 1.0x, 1.25x, 1.5x).
  - `src/features/listening/components/ListeningQuestionRenderer.tsx`: Question renderer supporting 6 question types (multiple-choice, true-false, fill-blank, conversation, announcement, dictation) with review states and correct answer indicators.
  - `src/features/listening/components/ListeningTranscriptPanel.tsx`: 3-mode transcript accordion (hidden, revealed, review) with vocabulary drawer, listening tips, and anti-cheat locks for dictation.
  - `src/features/listening/components/ListeningResultPanel.tsx`: Performance breakdown modal with score tiers (`excellent`, `very-good`, `good`, `needs-practice`), skeuomorphic ink seals, and next exercise navigation.
  - `src/features/listening/hooks/useListeningProgress.ts`: LocalStorage persistence hook for `d9w-listening-progress-v1` tracking completed exercises, scores, listening minutes, and streaks.
  - `src/features/listening/components/ListeningProgressDashboard.tsx`: Metric summary cards for completed exercises, total listening minutes, average score, and streaks.
  - `src/features/listening/hooks/useListeningFilters.ts`: Filter/sort state hook with search, level, category, and exercise type filtering.
  - `src/features/listening/components/ListeningHero.tsx`: European editorial hero with German flag tricolor bar and verified CEFR badges.
  - `src/features/listening/components/ListeningLevelSelector.tsx`: Tactile 5-card level selector with active elevations and completion counts.
  - `src/features/listening/components/ListeningCategoryFilters.tsx`: Horizontal scrolling filter pills for all 10 categories.
  - `src/features/listening/components/ListeningExerciseCard.tsx` & `ListeningExerciseGrid.tsx`: Responsive exercise cards with published/pending badges, audio duration chips, and difficulty indicators.
  - `src/features/listening/components/ListeningEmptyState.tsx`: Filter reset fallback state.
  - `src/features/listening/components/ListeningExerciseWorkspace.tsx`: Focused exercise screen with pinned player, question form, transcript drawer, and scoring evaluation.
  - `src/pages/ListeningPractice/index.tsx`: Main page component with URL sync (`?level=...`, `?exercise=...`).
- **Routing & Site Integration**:
  - Registered `/listening-practice` and aliased `/listening` in `src/routes/index.tsx`.
  - Updated `src/data/learningTools.ts` to set `tool-listening` to `slug: '/listening-practice'`, `status: 'Ready'`, `levelRange: 'A1–C1'`.
  - Updated `src/components/layout/Footer.tsx` listening link to `/listening-practice`.
- **Automated Verification Test Suite**:
  - `scripts/test-listening-engine.mjs`: Automated verification test suite running 14 unit assertions verifying dataset integrity, physical audio files, answer normalization, and grading algorithms via `npm run test:listening`.
- **Documentation**:
  - Created `docs/phase-03/P03-05-listening-practice.md`.
  - Created `docs/phase-03/P03-05-audio-sources.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Phase 03 — P03-04] - 2026-11-17

### Added
- **Centralized Lead Capture System (`src/features/lead-capture/`)**:
  - `LeadCaptureModal.tsx`: Global accessible dialog with escape key support, focus trap, and seamless transition states.
  - `LeadCaptureForm.tsx`: Skeuomorphic form with recessed inputs, physical CEFR level selectors, learning mode pills, honeypot field, and privacy consent toggle.
  - `LeadFormField.tsx`: Inset input wrapper with icons, character counter, and inline validation warnings.
  - `LeadSubmissionState.tsx`: Animated submission status display informing users that their registration is contacting the admissions desk.
  - `LeadSuccessView.tsx`: Confirmation ticket displaying the unique Lead Reference ID, enquiry summary, and a pre-filled "Continue on WhatsApp" button.
  - `LeadErrorView.tsx`: Non-destructive failure state preserving entered form data with a retry action and direct WhatsApp contact fallback.
  - `LeadCaptureContext.tsx` & `useLeadCapture.ts`: Global application context enabling any button to open the lead modal with contextual pre-selections.
  - `useLeadSubmission.ts`: State management hook handling validation, submission lifecycle, idempotency key generation, and error recovery.
- **Secure Vercel Serverless Function (`api/leads.ts`)**:
  - Route: `POST /api/leads`
  - Strict server-side validation for names, international telephone formats, emails, and CEFR levels.
  - Honeypot bot detection silently dropping spam traffic.
  - In-memory client IP rate limiter (5 req/min).
  - In-memory idempotency cache preventing duplicate submissions.
  - Collision-resistant Lead ID generator (`D9W-YYYY-XXXXXX`).
  - Upstream forwarder to Microsoft Power Automate (`POWER_AUTOMATE_LEAD_WEBHOOK_URL`).
  - Local development mock mode fallback.
- **OneDrive for Business & Excel Table CRM (`D9W-Leads.xlsx`)**:
  - `scripts/create_d9w_leads_workbook.py`: Python generator building `D9W-Leads.xlsx` with table `D9W_Enquiries` (15 Columns A–O) and live formula `Dashboard` sheet.
- **Automated Verification Test Suite**:
  - `scripts/test-leads-api.mjs`: Node test suite covering 8 test scenarios (HTTP methods, validation, honeypot, idempotency, rate limiting).
  - Added `npm run test:leads` and `npm run create:workbook` npm scripts.
- **Site-Wide Cross-CTA Integrations**:
  - Connected Course Comparison Matrix (`CourseEnquiryCTA`), Batch Calendar (`BatchDetailModal`), Syllabus Generator (`SyllabusActionBar`, `SyllabusConversionCTA`), Homepage, and Demo pages.
  - Reused official institute WhatsApp line `+49 1520 D9W-INFO` (`4915203994636`).
- **Documentation**:
  - Created `docs/phase-03/P03-04-lead-capture.md` and `docs/phase-03/P03-04-microsoft-setup.md`.

## [Phase 03 — P03-03] - 2026-11-16

### Added
- **Automated Syllabus Generator (`src/features/syllabus/`, `/syllabus`)**:
  - `src/data/syllabus.ts`: Centralized curriculum data source with verified A1–C1 syllabi, module breakdowns, grammar mappings, vocabulary clusters, and exam preparation frameworks.
  - `SyllabusHero.tsx`: Editorial hero with quick jump actions and PDF download triggers.
  - `SyllabusLevelSelector.tsx`: Tactile 5-card level selector with step indicators and URL synchronization.
  - `SyllabusActionBar.tsx`: Action bar offering PDF download, WhatsApp enquiry, and batch schedule links.
  - `SyllabusOverview.tsx`: Comprehensive level overview with prerequisites and core competency benchmarks.
  - `SyllabusSkillPillars.tsx`: Four-pillar cards for Hören, Sprechen, Lesen, and Schreiben with real-world tasks.
  - `SyllabusModuleAccordion.tsx`: Expandable/collapsible module progression detailing learning objectives, grammar, vocabulary, and skills.
  - `SyllabusGrammarMap.tsx` & `SyllabusVocabularyMap.tsx`: Structural progression maps cross-linked to interactive Learning Hub tools.
  - `SyllabusExamPreparation.tsx`: Accredited exam formats (Goethe, telc, TestDaF, DSH) with institutional disclaimers.
  - `SyllabusConversionCTA.tsx`: Course consultation callout with pre-filled WhatsApp enquiry and batch schedule routing.
  - `SyllabusPrintDocument.tsx`: Dedicated print-only vector document formatted across 4 pages for A4 printing.
  - `syllabus-print.css`: Dedicated print media stylesheet enforcing `@page { size: A4 portrait; margin: 14mm; }`, hiding screen-only UI, and ensuring clean page breaks.
  - `syllabusUtils.ts` & `useSyllabus.ts`: Dynamic filename generation (`D9W-German-Syllabus-[LEVEL].pdf`), level derivation, and print execution.
  - `src/pages/Syllabus/index.tsx`: Dedicated `/syllabus` page.
- **Navigation & Cross-Feature Integration**:
  - Registered `/syllabus` route in `src/routes/index.tsx`.
  - Added syllabus links to `CourseLevelDetail.tsx`, `CourseProgression.tsx`, `BatchDetailModal.tsx`, `MobileMenu.tsx`, and `Footer.tsx`.
- **Documentation**:
  - Created `docs/phase-03/P03-03-syllabus-generator.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Phase 03 — P03-02] - 2026-11-16

### Added
- **Batch Availability Calendar (`src/features/batches/`, `/batches`)**:
  - `src/data/batches.ts`: Centralized dataset with verified upcoming batches across A1–C1, online live and offline campus delivery, published registration statuses, and schedule timing metadata.
  - `calendarUtils.ts`: Timezone-safe local calendar arithmetic, leap-year support, month grid generation, and German date formatters (`formatGermanDate`, `formatShortDate`).
  - `batchUtils.ts`: Multi-criteria filtering, chronological sorting, past/unpublished exclusion, and contextual WhatsApp click-to-chat URL generator.
  - `useBatchFilters.ts` & `useBatchCalendar.ts`: Reusable, pure state hooks managing schedule queries, active filters, and interactive calendar navigation.
  - `BatchStatusBadge.tsx`: Restrained status badge system (`OPEN`, `FILLING FAST`, `FULL`, `COMING SOON`) avoiding fabricated seat counters.
  - `BatchFilters.tsx`: Tactile filter control desk with CEFR level, learning mode, status, and timeline selectors with active filter counters and reset triggers.
  - `BatchViewToggle.tsx`: Segmented rocker switch toggling between Monthly Calendar and Upcoming Batches List.
  - `BatchCard.tsx`: Physical schedule card with level badge, online/offline indicators, schedule days, timings, duration, and action triggers.
  - `BatchCalendar.tsx`: Interactive monthly calendar grid with weekday headers, day cells with batch count chips, legend, and selected-date drawer.
  - `BatchDetailModal.tsx`: Accessible dialog modal displaying complete verified schedule metadata, registration deadline, syllabus links, and pre-filled WhatsApp enquiry.
  - `BatchEmptyState.tsx`: Graceful empty state with filter reset and admissions consultation CTAs.
  - `src/pages/Batches/index.tsx`: Dedicated class schedule page with editorial hero and CEFR curriculum cross-links.
- **Navigation & Routing Updates**:
  - Registered `/batches` route in `src/routes/index.tsx`.
  - Added "Batches" link to `Navbar.tsx`, `MobileMenu.tsx`, and `Footer.tsx`.
  - Linked batch schedule from `CoursesPage`, `OnlineClassesPage`, and `OfflineClassesPage`.
- **Documentation**:
  - Created `docs/phase-03/P03-02-batch-availability.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Phase 03 — P03-01] - 2026-11-15

### Added
- **Interactive Course Comparison Matrix (`src/features/course-comparison/`)**:
  - `src/data/courseComparison.ts`: Strongly typed dataset covering 14 comparison dimensions across all five CEFR levels (A1, A2, B1, B2, C1).
  - `CourseLevelSelector.tsx`: Tactile 5-card level selector with step numbering, keyboard navigation (`role="tablist"`), and pressed elevation states.
  - `CourseComparisonTable.tsx`: Full 14-dimension desktop comparison table with grouped categories, sticky header/label columns, and active column highlighting.
  - `CourseComparisonCard.tsx`: Mobile-optimized inspection card presenting all 14 dimensions with quick-switch buttons, duration metrics, and real-world application scenarios.
  - `CourseSkillCard.tsx`: CEFR four-pillar outcome cards for Hören (Listening), Sprechen (Speaking), Lesen (Reading), and Schreiben (Writing) with practical capabilities and sample tasks.
  - `CourseProgression.tsx`: Visual sequential roadmap (A1 &rarr; A2 &rarr; B1 &rarr; B2 &rarr; C1) linking to verified level syllabus routes.
  - `CourseEnquiryCTA.tsx`: Conversion module generating pre-filled WhatsApp click-to-chat inquiries (`+49 1520 D9W-INFO`) with transparency disclosures.
  - `CourseComparisonSection.tsx`: Master orchestrator integrating Section A (Editorial Intro), B (Selector), C (Matrix/Card), D (Skills), E (Progression), and F (CTA).
- **Navigation & Routing Updates**:
  - Added `/course-comparison` route alias in `src/routes/index.tsx`.
  - Added segmented view mode switcher ("Interactive Comparison" vs "Detailed Course Catalog") on `/courses`.
- **Documentation**:
  - Created `docs/phase-03/P03-01-course-comparison.md`.
  - Updated `docs/TASKS.md` and `docs/IMPLEMENTATION.md`.

## [Design System Evolution — Modern Skeuomorphism] - 2026-11-14

### Added
- Centralized material abstraction (`src/styles/materials.css`) with zero 3D library dependencies.
- Physical affordances: Paper worksheets, beveled buttons (3px drop edge), recessed instrument consoles, analog educational clock, mechanical gender keys, cardstock word tokens, and elastic ink stamps.

## [Phase 02 — Interactive Learning Engines] - 2026-11-14

### Added
- 6 interactive learning tools: German Dictionary, Article Explorer (der/die/das), Number Trainer (0–1M), Time Trainer (analog clock), Sentence Builder, and 30-Question CEFR Assessment.
- Web Speech API integration (`useGermanSpeech`) with `de-DE` pronunciation and variable speed control.
- Resilient LocalStorage progress cache (`useLocalStorage`).

## [Phase 01 — Foundation & Design System] - 2026-11-14

### Added
- React 19 + TypeScript + Vite + Tailwind CSS v4 foundation.
- Central design tokens (`Warm Ivory`, `Deep Charcoal`, `German Red`, `Muted Gold`).
- Complete page layout, navigation, and editorial typography.
