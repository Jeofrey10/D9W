# P03-03: Automated Syllabus Generator — Architecture & Reference Documentation

**Status:** Completed & Production Ready  
**Scope:** CEFR German Language Curriculum (A1, A2, B1, B2, C1)  
**Route:** `/syllabus` (supports query params e.g. `/syllabus?level=b1`)  
**Design System:** Modern Skeuomorphism & European Editorial  
**Print Engine:** Zero-dependency Native Browser Vector Print Engine via CSS Paged Media (`@media print`)

---

## 1. Overview & Vision

The **Automated Syllabus Generator** (`/syllabus`) provides prospective and enrolled students with an interactive, institutional curriculum explorer and high-fidelity 4-page A4 PDF syllabus generator across all five core German language proficiency tiers:

- **A1 — Breakthrough / Beginner** (Foundation, Phonetics, Basic Transactions)
- **A2 — Waystage / Elementary** (Daily Life, Routine Dialogues, Travel, Compound Structures)
- **B1 — Threshold / Intermediate** (Independent Discourse, Workplace Basics, Subjunctive II, telc/Goethe Zertifikat B1)
- **B2 — Vantage / Upper Intermediate** (Professional German, Nuanced Arguments, Passive Voice Variations, Academic Transition)
- **C1 — Effective Operational Proficiency / Advanced** (Idiomatic Fluency, University Readiness, Stylistic Nuances, TestDaF / DSH Mastery)

It bridges online course discovery with offline reference, enabling students to evaluate weekly instructional modules, four-skill learning outcomes (*Hören, Sprechen, Lesen, Schreiben*), grammar and vocabulary progression, and exam preparation frameworks before consulting or enrolling.

---

## 2. Technical Architecture

### 2.1 Technology Stack
- **React 19 & TypeScript:** Strongly typed, componentized syllabus system.
- **Vite 8 & Tailwind CSS v4:** Modern CSS engine with `@import` support for specialized print stylesheets.
- **React Router 7:** Deep-linking with URL parameter reflection (`useSearchParams`), updating without triggering full-page remounts.
- **Native Browser Print Engine:** Pure CSS `@media print` layout without heavy canvas/blob or Node.js server dependencies. Zero external PDF service cost.

### 2.2 Component Hierarchy

```
src/pages/Syllabus/index.tsx
  ├── SyllabusHero.tsx                   # Editorial header with CEFR badges & instant PDF trigger
  ├── SyllabusLevelSelector.tsx          # Tactile 5-level skeuomorphic selector with ARIA tablist
  ├── SyllabusActionBar.tsx              # Quick actions: Download PDF, WhatsApp Enquiry, View Batches
  ├── SyllabusOverview.tsx               # Duration, weekly commitment, batch sizes & target benchmarks
  ├── SyllabusSkillPillars.tsx           # 4 CEFR Core Competencies (Hören, Sprechen, Lesen, Schreiben)
  ├── SyllabusModuleAccordion.tsx        # Modular progression with grammar, vocabulary & activity breakdowns
  ├── SyllabusGrammarMap.tsx             # Interactive grammar progression with links to /sentence-builder
  ├── SyllabusVocabularyMap.tsx          # Vocabulary thematic clusters with links to /dictionary
  ├── SyllabusExamPreparation.tsx        # Exam structures (Goethe, telc, TestDaF) + legal disclaimers
  ├── SyllabusConversionCTA.tsx          # Final conversion banner linking to WhatsApp & Batch Calendar
  └── SyllabusPrintDocument.tsx          # 4-page A4 printable document (hidden on screen, displayed in print)
```

---

## 3. Zero-Dependency PDF / Print Engine

### 3.1 Design Principles
Rather than relying on third-party rasterizers (such as `html2canvas` or `jsPDF`) which cause blurry text, bloated bundle sizes, and broken font rendering, P03-03 uses **CSS Paged Media Module Level 3** and native browser PDF output:
- **Zero Bundle Overhead:** 0 KB third-party JS added.
- **Crisp Vector Output:** Text and icons render at vector fidelity (600+ DPI) with selectable and searchable text.
- **Exact Pagination:** Explicit `break-before: page` and `break-inside: avoid` controls guarantee clean 4-page layouts for every level.

### 3.2 Dynamic Filename Control
Browsers (Chrome, Edge, Safari, Firefox) derive default PDF filenames from `document.title`. The utility `triggerSyllabusPrint(level: CefrLevel)` temporarily adjusts `document.title` to:
```
D9W-German-Syllabus-<LEVEL>.pdf (e.g. D9W-German-Syllabus-B1.pdf)
```
Upon print dialogue completion or cancellation, `document.title` is seamlessly restored.

### 3.3 4-Page A4 Document Structure
The print document layout (`SyllabusPrintDocument.tsx` and `syllabus-print.css`) enforces:

1. **Page 1: Title & Institutional Overview:**
   - D9W Official crest, institutional header, contact details (`+49 1520 D9W-INFO`).
   - Syllabus level title, subtitle, CEFR level badge, and verification stamp.
   - Course overview, duration, CEFR exit benchmark, and 4 skill outcome cards.
2. **Page 2: Core Learning Objectives & Four Skill Pillars:**
   - Detailed functional competencies for Listening, Speaking, Reading, and Writing.
   - Real-world application scenarios and European language portfolio alignments.
3. **Page 3: Modular Curriculum Architecture:**
   - 6 structured instructional modules detailing specific focus topics, grammar rules, vocabulary units, and classroom exercises.
4. **Page 4: Exam Readiness, Grammar Progression & Admissions:**
   - Accredited examination readiness breakdown (Goethe-Zertifikat, telc, TestDaF/DSH).
   - Mandatory legal disclaimers regarding certification bodies.
   - Admissions pathway, batch enrollment QR code/metadata, and WhatsApp enquiry details.

---

## 4. Cross-Platform Integrations

1. **Course Comparison Matrix (`/courses/compare`):**
   - Syllabus buttons link directly to `/syllabus?level=<id>`, navigating directly to the targeted tier.
2. **Batch Availability Calendar (`/batches`):**
   - Batch detail drawer syllabus buttons link directly to `/syllabus?level=<level>`.
3. **Course Level Detail Pages (`/courses/:level`):**
   - Prominent "Download Syllabus (PDF)" button in the hero and curriculum sections routes into the syllabus generator.
4. **Global Navigation & Footers:**
   - "Course Syllabus (A1–C1)" linked in Institute section of `Footer.tsx` and the mobile navigation drawer `MobileMenu.tsx`.
5. **Interactive Learning Engine Cross-Links:**
   - Grammar map nodes link directly to `/sentence-builder`.
   - Vocabulary domain nodes link directly to `/dictionary`.

---

## 5. Educational Integrity & Legal Compliance

- **Goethe-Institut & telc Non-Affiliation:** The syllabus clearly outlines alignment with international Goethe and telc exam frameworks while including unambiguous disclaimers stating that D9W is an independent preparatory institute and that exams are administered by external licensed testing centers.
- **CEFR Alignment:** Learning outcomes adhere strictly to the Council of Europe's Common European Framework of Reference for Languages (Can-Do descriptors).
- **Contact Details:** Standardized to official D9W communication lines: `+49 1520 D9W-INFO` (`4915203994636`) and `info@d9w-german.de`.

---

## 6. Maintenance & Adding New Modules

To update curriculum data or add elective modules:
1. Open `src/data/syllabus.ts`.
2. Locate the relevant level entry in `SYLLABUS_DATA`.
3. Modify or append modules, grammar topics, vocabulary themes, or exam preparation blueprints.
4. Types are enforced via `SyllabusLevelData` and `SyllabusModule` interfaces in `src/types/syllabus.ts`.
