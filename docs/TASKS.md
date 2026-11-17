# D9W German Language Institute — Task Matrix

## Phase 01: Project Initialization & Design System
*(Completed & Verified)*

| Stage | Task Description | Status | Verification Check |
| :--- | :--- | :--- | :--- |
| **STAGE 01** | Initialize Vite + React 19 + TypeScript | [x] Completed | Base bundle starts and compiles clean |
| **STAGE 02** | Install dependencies & configure Tailwind v4 | [x] Completed | Tailwind CSS v4, fonts, and icons installed |
| **STAGE 03** | Establish scalable folder architecture | [x] Completed | All directories (public, src, docs) structured |
| **STAGE 04** | Implement centralized design tokens & typography | [x] Completed | `tokens.css`, `animations.css`, `globals.css` loaded |
| **STAGE 05** | Build reusable UI components | [x] Completed | Button, Container, SectionHeading, Badge, Navbar, Footer |
| **STAGE 06** | Implement routing & shared layouts | [x] Completed | React Router DOM with lazy-loaded route chunks |
| **STAGE 07** | Build temporary homepage | [x] Completed | 8 required sections with verified data |
| **STAGE 08** | Build Learning Hub preview dashboard | [x] Completed | 10 tool cards, real-time search, category tab filter |
| **STAGE 09** | Create project documentation suite | [x] Completed | 8 documentation files in `docs/` and root `README.md` |
| **STAGE 10** | Perform responsive testing & production verification | [x] Completed | `tsc -b && vite build` succeeds with zero errors |

---

## Phase 02: Interactive Learning Engines
*(Completed & Verified)*

| Task ID | Feature Description | Status | Verification Check |
| :--- | :--- | :--- | :--- |
| **P02-01** | Normalized German Vocabulary Datasets | [x] Completed | 200+ verified records across A1/A2/B1 nouns, verbs, adjectives, and phrases |
| **P02-02** | Reusable Web Speech Synthesis Hook (`useGermanSpeech`) | [x] Completed | Native `de-DE` synthesis, 0.75x–1.25x speeds, replay, fallback |
| **P02-03** | LocalStorage Persistence Hook (`useLearningProgress`) | [x] Completed | Favourites, recent searches, quiz scores, streaks, assessments |
| **P02-04** | German Dictionary & Lexicon (`/dictionary`) | [x] Completed | Dual search, IPA, audio, favourites, CEFR filters, course recommendation |
| **P02-05** | Article Explorer (`/article-explorer`) | [x] Completed | `der`/`die`/`das` practice, 10Q/20Q/timed/review modes, suffix rules |
| **P02-06** | German Number Trainer (`/number-trainer`) | [x] Completed | 0–1,000,000 algorithmic generator, inverted rules, typing & audio modes |
| **P02-07** | Interactive SVG Time Trainer (`/time-trainer`) | [x] Completed | SVG clock with movable hands, formal 24h & conversational informal ("halb vier") |
| **P02-08** | German Sentence Builder (`/sentence-builder`) | [x] Completed | Drag/click tile arranger, V2 rule, modal brackets, TeKaMoLo, subordinate clauses |
| **P02-09** | Diagnostic CEFR Assessment (`/assessment`) | [x] Completed | 30 questions (A1–C1), competency breakdown, CEFR recommendation, WhatsApp CTA |
| **P02-10** | Code-Splitting & Lazy Loading Integration | [x] Completed | All 6 engines split into separate lazy chunks, zero build warnings |
| **P02-11** | Production Build & Linting Verification | [x] Completed | `tsc -b && vite build` passed (315ms), `oxlint` 0 warnings, 0 errors |

---

## Master Design System Evolution: Modern Skeuomorphism
*(Completed & Verified)*

| Task ID | Feature Description | Status | Verification Check |
| :--- | :--- | :--- | :--- |
| **SKEUO-01** | Centralized Material & Shadow Tokens (`src/styles/materials.css`, `tokens.css`) | [x] Completed | Paper worksheets, embossed buttons, recessed trays, clock bezel, stamps |
| **SKEUO-02** | Tactile UI Component Evolution (`Button.tsx`, `Badge.tsx`) | [x] Completed | Physical drop edges (3px), top highlights, active 1-2px depression, embossed badges |
| **SKEUO-03** | Modern Skeuomorphic Navigation & Console (`Navbar.tsx`, `MobileMenu.tsx`) | [x] Completed | Desk console bar, Germany flag tricolor, tactile active pills |
| **SKEUO-04** | Physical Learning Desk Homepage (`Home/index.tsx`) | [x] Completed | Stacked academic framework, CEFR recessed rows, flashcard courses, memo reviews |
| **SKEUO-05** | Tactile Learning Hub Dashboard (`LearningHub/index.tsx`) | [x] Completed | Recessed search slot, mechanical rocker tabs, flashcard tool items |
| **SKEUO-06** | Physical Dictionary & Lexicon (`DictionaryPage.tsx`) | [x] Completed | Reading desk console, printed vocabulary cards, audio knobs, embossed badges |
| **SKEUO-07** | Article Explorer Mechanical Keys (`ArticleExplorerPage.tsx`) | [x] Completed | Tactile DER/DIE/DAS keys (Prussian Blue, Crimson Red, Forest Green), ink stamps |
| **SKEUO-08** | Number Trainer Calculation Console (`NumberTrainerPage.tsx`) | [x] Completed | Recessed LED number display, beveled word tiles, tactile umlaut keys, stamp marks |
| **SKEUO-09** | Educational Analog Clock Skeuomorphism (`TimeTrainerPage.tsx`) | [x] Completed | Dimensional bezel, drop-shadow hands, brass center pin, recessed digital display |
| **SKEUO-10** | Physical Word Tile Tray (`SentenceBuilderPage.tsx`) | [x] Completed | Beveled cardstock word tokens, recessed snap-in drop tray, feedback stamps |
| **SKEUO-11** | Examination Paper & Certificate (`Assessment/index.tsx`) | [x] Completed | Examination folder presentation, test sheet choices, certificate report |
| **SKEUO-12** | Full Site Cohesion (`Courses`, `CourseLevelDetail`, `Demo`, `Online/Offline`, `About`, `Contact`) | [x] Completed | Consistent desk material system across all platform touchpoints |
| **SKEUO-13** | Production Verification & Linting | [x] Completed | `tsc -b && vite build` 0 errors, `oxlint` 0 warnings on 45 files |

---

## Phase 03: Marketing & Conversion Pathways
*(Completed & Verified — 9 of 9 Milestones 100% Complete)*

| Task ID | Feature Description | Status | Verification Check |
| :--- | :--- | :--- | :--- |
| **P03-01** | Interactive Course Comparison Matrix (`/courses`, `/course-comparison`) | [x] Completed | A1–C1 tactile matrix, 14 dimensions, CEFR skill cards, progression timeline, WhatsApp CTA, responsive table/card views |
| **P03-02** | Batch Availability Calendar (`/batches`) | [x] Completed | Monthly interactive calendar, chronological list view, A1–C1 & online/offline filters, status badge system, modal detail drawer, contextual WhatsApp enquiry |
| **P03-03** | Automated PDF Syllabus Generator (`/syllabus`) | [x] Completed | A1–C1 5-level curriculum, module-by-module progression accordions, 4 skill pillars, grammar & vocabulary maps, exam prep, vector A4 browser PDF print engine |
| **P03-04** | Centralized WhatsApp Lead Capture + OneDrive Excel CRM | [x] Completed | Shared `LeadCaptureModal`, `/api/leads` serverless API, rate limiting, honeypot, collision-resistant Lead IDs, Power Automate forwarder, `D9W-Leads.xlsx` table `D9W_Enquiries`, post-registration WhatsApp handoff |
| **P03-05** | Listening Practice Engine (Hörverstehen) (`/listening-practice`, `/listening`) | [x] Completed | A1–C1 36 exercises, 10 published native audio assets, 26 pending audio specs, skeuomorphic console with -5s/+5s & 4 speeds, 6 question types, 3-mode transcript drawer with dictation anti-cheat, `d9w-listening-progress-v1` LocalStorage, 14/14 automated tests passing |
| **P03-06** | Interactive Reading Practice Engine (Lesen) (`/reading-practice`, `/reading`, `/my-vocabulary`) | [x] Completed | A1–C1 36 passages, 12 categories, click-to-translate vocabulary engine with morphology map, noun gender colors, reading settings (font/spacing/mode), 4 question types, My Vocabulary collection with RFC 4180 CSV export, 14/14 automated tests passing |
| **P03-07** | Daily German Word (`Wort des Tages`) Engine (`/word-of-the-day`, `/wort-des-tages`, `/daily-word`) | [x] Completed | A1–C1 365-day deterministic schedule for 2026, Europe/Berlin timezone engine, B2/C1 vocabulary expansion (145 total), tactile hero card with authentic gender colors, native speech audio, interactive mini-quiz (3 question types & CEFR score tiers), Monday-first calendar, streak calculator, LocalStorage persistence (`d9w-daily-word-progress-v1` & unified `d9w-reading-vocabulary-v1`), reusable homepage widget, 37/37 automated tests passing |
| **P03-08** | Contextual Case Translator & German Grammar Engine (`/case-translator`, `/german-cases`, `/grammar-engine`, `/translator`) | [x] Completed | A1–C1 8-module engine: Contextual Sentence Analyzer with transparent pattern confidence, 4 Case Cards with question words, Article & Possessive Transformation Calculator with noun ending rules (-s/-es and dative +n), Preposition Trainer with Wo? vs Wohin? two-way switcher, Adaptive Case Quiz with 7 question types, Sentence Case Builder with constituent feedback, Searchable Pronoun/Verb Reference, `d9w-case-grammar-progress-v1` LocalStorage, 47/47 automated tests passing |
| **P03-09** | Personalized Study Schedule & Exam Countdown Generator (`/study-planner`, `/exam-planner`, `/study-schedule`) | [x] Completed | 5-Step Onboarding Wizard, Exam Countdown Engine (Goethe, telc, TestDaF, DSH, General), GLH guideline calculation & realistic caution warnings, Weekly Timetable with Calendar/List views, Daily Focus Session with wall-clock Focus Timer, Mock Exam score recording, Missed Task Recovery, A4 print layout, LocalStorage `d9w-study-planner-v1`, JSON export/import, 31/31 automated tests passing |
