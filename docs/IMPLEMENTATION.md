# D9W German Language Institute — Implementation Guide

## 1. Engineering Principles

1. **Strict Modular Architecture:** Every UI element belongs to a distinct tier:
   - `src/components/common/`: Foundational atomic elements (Button, Container, SectionHeading, Badge, ScrollToTop).
   - `src/components/layout/`: Global structural components (Navbar, MobileMenu, Footer, PageLayout).
   - `src/pages/`: Route-level views with lazy loading via React `Suspense`.
   - `src/data/`: Static, verified datasets and domain schemas.
   - `src/hooks/`: Reusable browser API abstractions (`useGermanSpeech`, `useLocalStorage`).
   - `src/styles/`: Central design tokens and global resets.
2. **Type Safety Without Compromise:** Every data entity, component prop, and route parameter is strictly typed using TypeScript interfaces in `src/types/index.ts` and `src/types/learning.ts`. No `any` types permitted.
3. **DRY Class Merging:** All conditional CSS classes are unified using the `cn()` helper (`clsx` + `tailwind-merge`).
4. **Accessible HTML Semantics:** Strict usage of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, and explicit ARIA attributes (`aria-label`, `aria-expanded`, `aria-selected`, `aria-hidden`).

---

## 2. Shared Learning Infrastructure (Phase 02)

### A. Normalized Vocabulary Schema (`src/types/learning.ts`)
```typescript
export interface VocabularyItem {
  id: string
  word: string
  type: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrase'
  article?: 'der' | 'die' | 'das' // ONLY for nouns!
  plural?: string
  pluralEnglish?: string
  english: string
  level: CefrLevel
  category: string
  example: { german: string; english: string }
  pronunciation?: { ipa?: string }
  tags: string[]
  verbDetails?: {
    infinitive: string
    present3rd: string
    pastPerfekt: string
    isSeparable?: boolean
    isIrregular?: boolean
  }
  adjectiveDetails?: {
    comparative?: string
    superlative?: string
    opposite?: string
  }
  suffixHint?: string
}
```

### B. German Speech Synthesis Hook (`src/hooks/useGermanSpeech.ts`)
- Leverages the native browser `window.speechSynthesis` API without external dependencies or cloud charges.
- Targets `de-DE` locale with automatic voice discovery fallback (`de-AT`, `de-CH`).
- Provides dynamic playback speed options (`0.75x`, `1.0x`, `1.25x`), instant cancellation, and replay capabilities.
- Handles unsupported browsers and muted states gracefully.

### C. Client-Side Persistence (`src/hooks/useLocalStorage.ts`)
- Version-tagged storage (`d9w_learning_progress_v1`).
- Safely tracks user favorites, search history, quiz accuracy, daily streaks, and CEFR diagnostic attempts.
- Safeguarded with try-catch blocks against private browsing restrictions.

---

## 3. Learning Engines Implementation

### 01. German Dictionary (`/dictionary`)
- **Bidirectional Search:** German-to-English and English-to-German matching with article awareness.
- **Phonetics & Audio:** IPA phonetic guides and native speech synthesis.
- **Favorites System:** Persistent bookmarking across page sessions.
- **Contextual Course Path:** Direct link to D9W Goethe A1 course enrollment.

### 02. Article Explorer (`/article-explorer`)
- **Game Modes:** Practice, 10 Questions, 20 Questions, 60s Timed Challenge, and Review Incorrect Mistakes.
- **Grammar Suffix Hints:** Explains why a word takes `die` (`-ung`, `-heit`, `-keit`, `-schaft`, `-tät`), `das` (`-chen`, `-ment`, `-um`), or `der` (`-ling`, `-ismus`, `-er`), highlighting notable exceptions.
- **Streak & Scoring:** Real-time mathematical scoring and accuracy tracking.

### 03. Number Trainer (`/number-trainer`)
- **Range:** 0 to 1,000,000 with algorithmic German spelling generation (`numberToGermanWord`).
- **Linguistic Rules:** Enforces inverted ones-and-tens (`einundzwanzig`, `fünfunddreißig`), compound word rules, Euro price phrasing, and ordinal numbers (`erste`, `dritte`, `siebte`).
- **Interactive Modes:** Number to Word Quiz, Word to Number, Audio Dictation, and Typing Drill with German special character helpers.

### 04. Time Trainer (`/time-trainer`)
- **Interactive SVG Clock:** Mathematical hand positioning (360°/12h and 360°/60m) with live hour and minute adjustment steppers.
- **Formal vs. Informal:**
  - Formal (24h): `14:30` &rarr; *"Es ist vierzehn Uhr dreißig."*
  - Informal (12h): `14:30` &rarr; *"Es ist halb drei."* (Crucial German rule: *halb* counts halfway toward the NEXT hour).

### 05. Sentence Builder (`/sentence-builder`)
- **Syntax Arranger:** Touch and click tile-based sentence construction.
- **Grammar Concepts:** Validates Verb-Second (V2) in main clauses, separable prefix brackets (`Er steht um 7 Uhr auf`), modal verb infinitives, and verb-final positioning in subordinate clauses (`weil`, `dass`, `obwohl`).

### 06. German Level Assessment (`/assessment`)
- **Format:** 30 comprehensive diagnostic questions spanning A1 to C1 across Vocabulary, Grammar, Sentence Structure, Reading Comprehension, and Functional Language.
- **Navigation:** Sequential progression with answer retention and previous/next review.
- **Scoring & Placement:**
  - 0–7 &rarr; **A1** (Beginner Foundation)
  - 8–14 &rarr; **A2** (Elementary German)
  - 15–21 &rarr; **B1** (Intermediate Independence)
  - 22–26 &rarr; **B2** (Upper-Intermediate Professional)
  - 27–30 &rarr; **C1** (Advanced Professional Mastery)
- **Marketing CTAs:** Direct routing to recommended D9W CEFR course, free live demo booking, and instant WhatsApp consultation.

---

## 4. Modern Skeuomorphic Architecture (Design System Evolution)

### Centralized Material Abstraction (`src/styles/materials.css`)
- **Zero-Dependency Skeuomorphism:** Achieved exclusively through standard CSS3 box-shadow layers, radial and linear gradients, and hardware-accelerated transforms without requiring heavy WebGL or 3D canvas libraries.
- **Surface Token Integration:**
  - `.skeuo-paper` / `.skeuo-paper-stacked`: Mimics layered physical German flashcards, study notebooks, and exercise folders.
  - `.skeuo-button-primary` / `.skeuo-button-secondary` / `.skeuo-button-gold` / `.skeuo-button-dark`: 3px beveled lower edge shadows, top specular highlights, and active 1–2px physical depression.
  - `.skeuo-recessed` / `.skeuo-input` / `.skeuo-display-meter`: Inset shadows simulating reading desks, instrument consoles, and LED status panels.
  - `.skeuo-key-der` / `.skeuo-key-die` / `.skeuo-key-das`: Mechanical rocker buttons with authentic grammatical gender color palettes.
  - `.skeuo-word-tile` / `.skeuo-tile-slot`: Physical cardstock tokens with raised bevels and recessed snap-in tray.
  - `.skeuo-stamp-correct` / `.skeuo-stamp-incorrect`: Tilted ink stamp seals (`RICHTIG!` / `FALSCH!`) with elastic scale entry.
  - `.skeuo-clock-rim` / `.skeuo-clock-dial` / `.skeuo-clock-hand-*`: High-fidelity analog clock face with dimensional shadows and brass pin.
- **Accessibility & Motion Guardrails:** Fully responsive across all viewports (320px–1440px), respects `prefers-reduced-motion`, and preserves clear `:focus-visible` keyboard outlines.


---

## 5. Phase 03 — Marketing & Conversion Implementations

### P03-01: Interactive Course Comparison Matrix (`/courses`, `/course-comparison`)
- **Module Path:** `src/features/course-comparison/`
- **Data Source:** `src/data/courseComparison.ts`
- **Architectural Highlights:**
  - **Single Source of Truth:** Centralized `COURSE_COMPARISON_LEVELS` and `COMPARISON_CATEGORIES` storing 14 verified dimensions across all 5 CEFR levels (A1, A2, B1, B2, C1).
  - **Tactile Level Selector:** `CourseLevelSelector` provides physical card buttons displaying CEFR code, level title, badge label, progression step, and active pressed elevation.
  - **14-Dimension Comparison Matrix:** Covers CEFR Level, Learning Stage, Main Focus, Speaking, Listening, Reading, Writing, Grammar Coverage, Vocabulary Development, Real-World Communication, Exam Preparation, Available Learning Modes, Course Duration, and Recommended Next Level.
  - **Responsive Duality:** Complete 5-level desktop comparison table (`CourseComparisonTable`) with sticky category labels and focused level highlights, paired with a dedicated single-level inspection card (`CourseComparisonCard`) on mobile to guarantee zero cramped text.
  - **CEFR Four-Pillar Learning Outcomes:** `CourseSkillCard` displays Hören, Sprechen, Lesen, and Schreiben competencies with practical capabilities and concrete example tasks.
  - **Curriculum Progression Roadmap:** `CourseProgression` visualizes sequential milestones (A1 &rarr; A2 &rarr; B1 &rarr; B2 &rarr; C1) with direct links to individual course detail routes.
  - **WhatsApp Lead Capture:** `CourseEnquiryCTA` dynamically generates click-to-chat links with pre-filled inquiries containing the selected course level, opening directly in WhatsApp without automated false claims.


### P03-02: Batch Availability Calendar (`/batches`)
- **Module Path:** `src/features/batches/`
- **Data Source:** `src/data/batches.ts`
- **Architectural Highlights:**
  - **Single Source of Truth:** Centralized `BATCHES_DATA` with ISO `YYYY-MM-DD` start/end dates, schedule days, timings, duration, status, and publication flags.
  - **Zero Fabrication Ethics:** Prohibits artificial urgency counters, fake remaining seats, or simulated bookings. Uses four verified status states: `OPEN`, `FILLING FAST`, `FULL`, and `COMING SOON`.
  - **Interactive Dual Presentation:** Segmented rocker switch (`BatchViewToggle`) between a full **Monthly Calendar** (`BatchCalendar`) and a chronological **Upcoming Batches List** (`BatchList`).
  - **Timezone-Safe Calendar Engine:** Native calendar math in `calendarUtils.ts` with local parsing (preventing UTC shift bugs), leap year calculation, and Monday-indexed European weekday alignment (DIN 1355).
  - **Tactile Filter Control Desk:** Multi-dimensional filtering by CEFR Level (A1–C1), Learning Mode (Online Live vs Offline Campus), Registration Status, and Date Range (This Month, Next Month, All Upcoming).
  - **Responsive Detail Drawer:** Accessible dialog modal (`BatchDetailModal`) supporting keyboard Escape closure, focus management, and mobile-friendly scrolling.
  - **Contextual WhatsApp Enquiry:** Encodes a pre-filled inquiry using the verified D9W WhatsApp line (`+49 1520 D9W-INFO`), injecting the batch title, CEFR level, mode, and start date.


### P03-03: Automated Syllabus Generator (`/syllabus`)
- **Module Path:** `src/features/syllabus/`
- **Data Source:** `src/data/syllabus.ts`
- **Print Stylesheet:** `src/features/syllabus/styles/syllabus-print.css`
- **Architectural Highlights:**
  - **Single Source of Truth:** Centralized `SYLLABUS_DATA` repository defining authentic, CEFR-aligned curricula across all five levels (A1 Breakthrough, A2 Waystage, B1 Threshold, B2 Vantage, C1 Operational Proficiency).
  - **Tactile Level Selector:** `SyllabusLevelSelector` enables seamless switching between A1 and C1 with URL query synchronization (`/syllabus?level=b1`), step badges, and tactile pressed states.
  - **Four Skill Pillars:** `SyllabusSkillPillars` details Hören (Listening), Sprechen (Speaking), Lesen (Reading), and Schreiben (Writing) with practical application scenarios and CEFR benchmarks.
  - **Module-by-Module Progression:** `SyllabusModuleAccordion` provides an expandable, keyboard-accessible accordion organizing learning competencies, grammar rules, vocabulary clusters, and class/studio activities.
  - **Grammar & Vocabulary Maps:** `SyllabusGrammarMap` and `SyllabusVocabularyMap` structure lexical and syntactic topics with cross-links to interactive Learning Hub tools.
  - **Official Examination Alignment:** `SyllabusExamPreparation` details formats and strategies for Goethe-Zertifikat, telc, TestDaF, and DSH with mandatory institutional disclaimers.
  - **Zero-Dependency Vector PDF Generation:** Uses a dedicated print CSS layout (`@page { size: A4 portrait; margin: 14mm; }`) and dynamic title switching (`document.title = getSyllabusPdfFilename(level)`) so students can print or Save as PDF with exact vector typography, multi-page page breaks, and clean margins.

### P03-04: Centralized WhatsApp Lead Capture + OneDrive Excel CRM
- **Module Path:** `src/features/lead-capture/`
- **Serverless Endpoint:** `api/leads.ts` (`POST /api/leads`)
- **Excel Schema:** `D9W-Leads.xlsx` (Worksheet: `Leads`, Table: `D9W_Enquiries`)
- **Integration Layer:** Microsoft Power Automate (`D9W Website Lead Capture`)
- **Architectural Highlights:**
  - **Shared Lead Capture Modal (`LeadCaptureModal`):** Global accessible dialog accessible anywhere across the site via `useLeadCapture().openLeadModal()`. Pre-populates contextual defaults from Course Comparison, Batch Calendar, Syllabus Generator, Homepage, and Demo pages.
  - **Zero Frontend Secrets:** No direct client-to-Excel calls and no Power Automate webhooks exposed in browser bundles.
  - **Secure Serverless API (`api/leads.ts`):** Enforces payload size checks, strict sanitization, international phone regex, CEFR level validation, and IP rate limiting (5 req/min).
  - **Anti-Bot Honeypot:** Off-screen trap field `instituteReferralCode` silences automated submission spam without creating database entries.
  - **Idempotency Guarantee:** Client-generated idempotency keys ensure network retries or repeated clicks acknowledge the original Lead ID rather than duplicating Excel rows.
  - **OneDrive Excel Schema:** Standardized 15-column table (`D9W_Enquiries`) with bold headers, text-formatted phone numbers and Lead IDs, and live metric formulas in a dedicated `Dashboard` worksheet.
  - **Official WhatsApp Post-Registration Handoff:** Reuses the verified `+49 1520 D9W-INFO` (`4915203994636`) number with a pre-filled click-to-chat message referencing the confirmed Lead ID and enquiry metadata.

### P03-05: German Listening Practice Engine (Hörverstehen) (`/listening-practice`, `/listening`)
- **Module Path:** `src/features/listening/`
- **Data Source:** `src/data/listening/exercises.ts`, `src/data/listening/levels.ts`, `src/data/listening/categories.ts`, `src/data/listening/audioManifest.ts`
- **Audio Assets:** Native 16-bit PCM WAV assets in `public/audio/listening/[level]/[filename].wav`
- **Architectural Highlights:**
  - **Authentic Audio Focus:** Completely rejects synthetic robotic browser speech synthesis in favor of bundled native German audio recordings and structured pending audio placeholders for future studio recordings.
  - **CEFR Multi-Level Coverage:** 36 structured exercises across A1, A2, B1, B2, and C1 with recommended playback speeds (0.85x–1.50x).
  - **Skeuomorphic Audio Player (`ListeningAudioPlayer.tsx`):** Analog console styling with recessed track well, seekable scrubber, transport controls (Play/Pause, Replay, -5s/+5s skip), and 4 discrete speed rates (0.75x, 1.0x, 1.25x, 1.5x) with global singleton playback exclusivity.
  - **Comprehensive Question Formats (`ListeningQuestionRenderer.tsx`):** Renders Multiple Choice, True/False, Fill in the Blank, Conversation Comprehension, Short Announcement, and Dictation Practice with real-time input tracking.
  - **Pedagogical 3-Mode Transcript (`ListeningTranscriptPanel.tsx`):** Hidden by default to train ear comprehension, manually revealable, and auto-unlocked upon submission. Strict anti-cheat lock for dictation exercises.
  - **Answer Normalization & Dictation Engine (`answerNormalization.ts`):** Strips punctuation, trims whitespace, supports umlaut transliteration (`ä` <-> `ae`), and computes word-by-word similarity scoring for dictation typing.
  - **Client-Side Progress Persistence (`useListeningProgress.ts`):** Schema `d9w-listening-progress-v1` tracking completed exercise IDs, question attempts, total listening minutes, and continuous streak calculations.
  - **Automated Verification Suite:** 14 automated unit tests in `scripts/test-listening-engine.mjs` verifying exercise counts, level distributions, physical audio file validity, and grading algorithms via `npm run test:listening`.

### P03-06: Interactive German Reading Practice Engine (Lesen) (`/reading-practice`, `/reading`, `/my-vocabulary`)
- **Module Path:** `src/features/reading/`
- **Data Source:** `src/data/reading/passages.ts`, `src/data/reading/categories.ts`, `src/data/reading/levels.ts`, `src/data/vocabulary/index.ts`
- **Storage Keys:** `d9w-reading-progress-v1`, `d9w-reading-vocabulary-v1`, `d9w-reading-preferences-v1`
- **Architectural Highlights:**
  - **Clickable German Vocabulary Engine:** Custom non-destructive tokenizer (`tokenizeGermanText.ts`) separating punctuation while keeping words interactive. Clicking any word opens an accessible popover (`VocabularyPopover.tsx`) on desktop or bottom sheet on mobile displaying German word, base lemma, authentic gender color tags (`der` Prussian Blue, `die` Crimson Red, `das` Forest Green), plural forms, English meanings, and example sentences.
  - **Morphology & Inflection Mapping Layer (`vocabularyLookup.ts`):** Resolves common irregular verbs (*ging* &rarr; *gehen*, *stehe* &rarr; *aufstehen*) and case-inflected nouns (*Häusern* &rarr; *Haus*) to dictionary lemmas without heavyweight NLP dependencies.
  - **Customizable Reader Controls (`ReadingSettings.tsx`):** Localized preferences for font size (sm/md/lg), line spacing (compact/comfortable/relaxed), and reading assistance modes (Reading, Learning, Review).
  - **Comprehension Engine (`ReadingQuestionRenderer.tsx`, `readingScoring.ts`):** Supports 4 question types (Multiple Choice, True/False, Fill in Blank, Short Answer) with umlaut-tolerant string comparison, explanations, and skeuomorphic performance ink seals.
  - **My Vocabulary Collection & Export (`/my-vocabulary`, `vocabularyExport.ts`):** Complete student vocabulary manager with level/gender/word-type filtering, clipboard copy, and RFC 4180 CSV export with UTF-8 BOM for spreadsheet and flashcard imports.
  - **Automated Verification Suite:** 14 unit assertions via `npm run test:reading` (`scripts/test-reading-engine.mjs`) verifying dataset integrity, tokenization, morphology mappings, scoring algorithms, and CSV formatting.

### P03-07: Wort des Tages — Daily German Word Experience (`/word-of-the-day`, `/wort-des-tages`, `/daily-word`)
- **Module Path:** `src/features/daily-word/`
- **Data Source:** `src/data/daily-word/dailyWordSchedule.ts`, `src/data/daily-word/dailyWordConfig.ts`, `src/data/vocabulary/index.ts`
- **Storage Keys:** `d9w-daily-word-progress-v1` (progress, streaks, quiz attempts), `d9w-reading-vocabulary-v1` (unified student saved words)
- **Architectural Highlights:**
  - **Deterministic Berlin Timezone Engine (`dailyWordEngine.ts`):** Enforces official timezone `Europe/Berlin` (`DAILY_WORD_CONFIG.TIMEZONE`) using native `Intl.DateTimeFormat`. Ensures that all learners across different continents see identical daily words without date drift, timezone skips, or client clock tampering.
  - **365-Day Schedule for Year 2026:** Complete continuous daily schedule from `2026-01-01` to `2026-12-31`. 334 days are fully verified and published (`published: true`); 31 days in December are explicitly designated with `published: false` and `editorialReviewStatus: 'under-review'`.
  - **CEFR Vocabulary Expansion (B2 & C1):** Expanded the central `ALL_VOCABULARY` dataset with 14 B2 words and 9 C1 words, reaching 145 canonical entries across all 5 CEFR levels (A1–C1).
  - **Skeuomorphic Hero Word Card (`FeaturedWordCard.tsx`):** Tactile paper desk card displaying the German word, grammatical gender badge (`der` Prussian Blue `#1E3A8A`, `die` Crimson Red `#C83B32`, `das` Forest Moss Green `#15803D`), IPA phonetic guide, CEFR level tag, native speech audio synthesis, and one-click actions ("Save to My Vocabulary", "Mark as Learned", "Share Word", "Open in Dictionary", "Article Explorer").
  - **Contextual Example Sentences (`DailyWordExamples.tsx`):** Natural example sentences featuring the target word with highlighted typography, English translations, and separate sentence-level speech playback.
  - **Interactive Daily Mini Quiz (`DailyWordMiniQuiz.tsx`, `dailyWordQuizGenerator.ts`):** 3-question adaptive quiz format (Article Selection, Meaning Comprehension, Contextual Fill-in-the-Blank) with deterministic distractors, score evaluation, and German feedback tiers (*Ausgezeichnet!*, *Sehr gut!*, *Gut gemacht!*, *Weiter üben!*).
  - **Monday-First Monthly Calendar (`DailyWordCalendar.tsx`, `useDailyWordCalendar.ts`):** Authentic German Monday-first calendar grid with month navigation, today marker, learned status dots, and locked future dates.
  - **Filterable Archive (`DailyWordArchive.tsx`):** Allows reviewing past daily words with keyword search, CEFR level filters, and direct deep-linking via URL query params (`?date=YYYY-MM-DD`).
  - **Daily Streak Habit Engine (`dailyWordStreak.ts`, `useDailyWordProgress.ts`):** Calculates active consecutive streaks based on Berlin dates, qualifying days when a student marks a word as learned or passes the quiz ($\ge 60\%$). Missing two consecutive days safely resets the streak.
  - **Cross-Engine Integration:** Direct jumps to `/dictionary` and `/article-explorer`. Saved words sync automatically to `d9w-reading-vocabulary-v1` for unified CSV export via `/my-vocabulary`.
  - **Embedded Preview Widget (`DailyWordWidget.tsx`):** Compact tactile preview card integrated into the Learning Hub dashboard (`/learning-hub`).
  - **Automated Verification Suite:** 37 unit tests in `scripts/test-daily-word-engine.mjs` verifying schedule integrity, timezone determinism, vocabulary lookups, quiz grading, streak math, and gender color tokens via `npm run test:daily-word`.

### P03-08: Contextual Case Translator & German Grammar Engine (`/case-translator`, `/german-cases`, `/grammar-engine`, `/translator`)
- **Module Path:** `src/features/case-translator/`
- **Data Source:** `src/data/grammar/cases.ts`, `src/data/grammar/articles.ts`, `src/data/grammar/pronouns.ts`, `src/data/grammar/prepositions.ts`, `src/data/grammar/verbs.ts`, `src/data/grammar/case-examples.ts`, `src/data/grammar/case-questions.ts`, `src/data/grammar/sentence-patterns.ts`, `src/data/grammar/builder-exercises.ts`
- **Storage Keys:** `d9w-case-grammar-progress-v1` (question attempts, accuracy per case, builder exercises completed, streak tracking)
- **Architectural Highlights:**
  - **Educational Rule-Based Case Analyzer (`caseAnalyzer.ts`):** Deterministic tokenizer and pattern parser identifying syntactic elements (Subject, Direct Object, Indirect Object, Prepositional Object, Genitive Attribute) with explicit confidence scoring. Features 10 verified sentence patterns (`PAT-01` to `PAT-10`), built-in reference sentences with 100% precision, and honest limitation disclosures for unsupported complex syntax without fabricating AI hallucinations.
  - **Four Comprehensive Case Cards (`FourCaseCardsModule.tsx`):** In-depth guides for Nominativ, Akkusativ, Dativ, and Genitiv with authentic question words (*Wer? Was?*, *Wen? Was?*, *Wem?*, *Wessen?*), article/pronoun summaries, common errors, CEFR example sentences, and direct quiz deep-links.
  - **Article & Noun Ending Trainer (`ArticleTransformationModule.tsx`):** Interactive calculator selecting gender (masc/fem/neut/plur), case (Nom/Akk/Dat/Gen), and article type (definite, indefinite, negative, possessive with stem selectors). Includes full reference matrices and comprehensive rules for masculine/neuter genitive `-s`/`-es` endings, N-Deklination exceptions, and dative plural `+n`.
  - **Preposition Rection & Two-Way Laboratory (`PrepositionTrainerModule.tsx`):** Categorizes prepositions into pure Accusative (DOGFU), pure Dative, pure Genitive, and the 9 Two-Way (*Wechselpräpositionen*). Features an interactive *Wo?* (Dativ) vs *Wohin?* (Akkusativ) switcher and explains why movement within a bounded location remains Dativ. Includes a reference table for 11 universal contractions (*im, ins, am, ans, beim, vom, zum, zur, aufs, fürs, ums*).
  - **Adaptive Case Quiz Engine (`InteractiveCaseQuizModule.tsx`):** One-question-at-a-time test interface supporting 7 question formats across CEFR A1–C1. Features immediate correctness feedback with pedagogical explanations, progress tracking, and a "Retry Incorrect Only" mode.
  - **Sentence Case Builder (`SentenceCaseBuilderModule.tsx`):** Scrambled word tile workbench where students construct sentences with real-time word-order verification and detailed constituent case explanations.
  - **Searchable Reference Library (`ContextualCaseReferenceModule.tsx`):** Searchable reference tables for all personal pronouns across 4 cases, verb valency (accusative, dative, dual-object, genitive), and prepositions.
  - **Grammar Progress Dashboard (`GrammarProgressDashboard.tsx`):** LocalStorage analytics tracking total questions, accuracy, case-by-case strengths/weaknesses, and a modal reset confirmation.
  - **Automated Verification Suite:** 47 automated assertions in `scripts/test-case-translator.mjs` verifying declension tables, pronoun charts, preposition rections, verb valencies, sentence analysis, and quiz scoring via `npm run test:cases`.

### P03-09: Personalized Study Schedule & Exam Countdown Generator (`/study-planner`, `/exam-planner`, `/study-schedule`)
- **Module Path:** `src/features/study-planner/`
- **Data Source:** `src/data/study-planner/exam-options.ts`, `src/data/study-planner/preparation-phases.ts`, `src/data/study-planner/skill-allocation.ts`, `src/data/study-planner/study-activities.ts`, `src/data/study-planner/study-templates.ts`
- **Storage Key:** `d9w-study-planner-v1`
- **Architectural Highlights:**
  - **Multi-Step Onboarding Wizard (`OnboardingWizard.tsx`):** 5-step guided planner setup collecting current & target CEFR levels (with automatic diagnostic assessment score integration), exam provider (Goethe, telc, TestDaF, DSH, General German), confirmed/estimated target exam dates, weekly availability (study days + daily minutes), and language skill priorities.
  - **Deterministic Schedule Generator (`scheduleGenerator.ts`):** 100% offline, deterministic engine producing daily tasks, weekly schedules, preparation phase boundaries, and mock exam milestones based on input parameters.
  - **CEFR Guided Learning Hours (GLH) Calculation:** Compares student's planned hours against official CEFR progression standards (40–800 hrs) and issues realistic educational caution warnings for compressed timelines or multi-level jumps without guaranteeing exam success.
  - **Weighted Skill Allocation (`skillAllocation.ts`):** Boosts practice allocation for self-identified weak skills (+40%) while ensuring a strict minimum floor (>= 12%) for all four core language competencies (Hören, Lesen, Schreiben, Sprechen).
  - **Exam Countdown Engine (`countdownUtils.ts`, `ExamCountdownCard.tsx`):** Computes days and weeks remaining using local midnight calculations to avoid timezone drift and negative countdowns. Displays phase-based planning badges (Planning, Preparation, Revision, Final Preparation, Completed).
  - **Weekly Timetable (`WeeklyTimetable.tsx`):** Interactive Monday-to-Sunday planner supporting Calendar and List views, week navigation, rest-day cards, task status toggling (complete/skip/reschedule), duration adjustments, and custom user tasks.
  - **Daily Focus Session & Timer (`DailyFocusSession.tsx`, `FocusTimer.tsx`):** Today's prioritized tasks queue with an integrated wall-clock focus timer (15/25/30/45 min) that handles tab switching gracefully and enables instant completion marking.
  - **Mock Exam Simulation Planner (`MockExamPlanner.tsx`):** Milestone tracking for scheduled mock exams with multi-skill score recording (Hören, Lesen, Schreiben, Sprechen) and qualitative learner reflection notes.
  - **Missed Task Recovery Engine (`MissedTaskBanner.tsx`):** Identifies overdue incomplete tasks and redistributes them across upcoming active study days without overloading daily limits or invading designated rest days.
  - **Native A4 Print Engine (`PrintableView.tsx`):** Formats complete personalized study roadmaps with institutional letterhead and phase checklists for physical study binders via `window.print()`.
  - **Automated Verification Suite:** 31 automated assertions in `scripts/test-study-planner.mjs` verifying countdown math, GLH formulas, schedule determinism, rest-day exclusion, task state management, and schema validation via `npm run test:planner`.
