# D9W German Language Institute — P03-01 Implementation Report
## Interactive Course Comparison Matrix

- **Feature ID:** `P03-01`
- **Feature Name:** Interactive Course Comparison Matrix
- **Target Route:** `/courses`, `/course-comparison`
- **Date Completed:** 2026-11-15
- **Status:** Complete & Verified

---

## 1. Overview & Pedagogical Purpose

The **Interactive Course Comparison Matrix** provides prospective language students with an authoritative, CEFR-grounded comparison of German levels **A1, A2, B1, B2, and C1**. Instead of generic SaaS pricing tables, the interface models a prestigious European language institute's curriculum handbook, enabling students to compare:

1. **What each level teaches** (core grammatical and communicative focus).
2. **What they will be able to do** (speaking, listening, reading, writing capabilities).
3. **Expected learning progression** (sequential mastery from beginner discovery to professional command).
4. **Verified academic logistics** (duration, teaching hours, official exam preparation, and delivery mode).
5. **Direct admissions advisory** (contextual WhatsApp consultation pre-filled with the selected level).

---

## 2. Components Created

All components reside in `src/features/course-comparison/`:

| Component | Responsibility |
| :--- | :--- |
| `src/data/courseComparison.ts` | Centralized, strongly typed data structure with 14 comparison dimensions across A1–C1, CEFR skills, and WhatsApp URL generator. |
| `CourseLevelSelector.tsx` | 5 tactile card buttons with step counters (`Step 1 / 5`), level badge, hours, and pressed/raised active elevation. |
| `CourseComparisonTable.tsx` | Desktop 14-dimension comparison table with sticky category headers, distinct first column, and active level column highlight. |
| `CourseComparisonCard.tsx` | Mobile-optimized single-level card with quick-switch buttons, duration metrics, 14-dimension breakdown, and real-world scenario. |
| `CourseSkillCard.tsx` | 4 CEFR pillar cards: **Hören** (Listening), **Sprechen** (Speaking), **Lesen** (Reading), **Schreiben** (Writing), with real-world tasks. |
| `CourseProgression.tsx` | Visual sequential roadmap (A1 &rarr; A2 &rarr; B1 &rarr; B2 &rarr; C1) with milestone summaries and verified syllabus links (`/courses/:level`). |
| `CourseEnquiryCTA.tsx` | Admissions inquiry block generating pre-filled WhatsApp click-to-chat links (`+49 1520 D9W-INFO`) with transparent user guidance. |
| `CourseComparisonSection.tsx` | Master section orchestrating Section A through F with URL query parameter synchronization (`?level=b1`). |
| `index.ts` | Clean barrel export for the feature module. |

---

## 3. The 14 Comparison Dimensions

Every level is comprehensively compared across 14 standardized criteria:

1. **CEFR Level:** Official framework code (A1, A2, B1, B2, C1).
2. **Learning Stage:** European competency tier (Breakthrough, Waystage, Threshold, Vantage, Operational Proficiency).
3. **Main Learning Focus:** Pedagogical priority (phonetics, past tense, subordinate syntax, technical debate, academic register).
4. **Speaking Capabilities:** Real-world oral capabilities.
5. **Listening Capabilities:** Spoken comprehension thresholds.
6. **Reading Capabilities:** Authentic text types interpreted independently.
7. **Writing Capabilities:** Composition documents and formal correspondence.
8. **Grammar Coverage:** Core structural and syntactical rules mastered.
9. **Vocabulary Development:** Estimated active and passive lexical range (~600 to 8,000+ words).
10. **Real-World Communication:** Concrete scenarios (café ordering, doctor visits, citizenship interviews, hospital rounds, dissertation defense).
11. **Exam Preparation:** Verified examinations targeted (Goethe-Zertifikat, telc, TestDaF, DSH).
12. **Available Learning Modes:** Hybrid (Online Live & Institute Classroom).
13. **Course Duration:** Verified hours and timeline (A1/A2: 8 wks / 80h; B1: 10 wks / 100h; B2: 12 wks / 120h; C1: 14 wks / 140h).
14. **Recommended Next Level:** Next natural academic milestone.

---

## 4. Skeuomorphic & Visual Polish

- **Tactile Paper Surfaces:** `.skeuo-paper` and `.skeuo-paper-stacked` deliver natural warm ivory depth and layered shadow boundaries.
- **Physical Buttons:** `.skeuo-button-primary` and `.skeuo-button-secondary` with 3px drop shadows and 1–2px active depression.
- **Recessed Trays:** `.skeuo-recessed` and `.skeuo-recessed-dark` frame duration stats and consultation banners.
- **Grammatical Ledger Accents:** Prussian Blue (`#1E4F8A`), Crimson Red (`#C83B32`), Forest Green (`#2A684C`), and Muted Gold (`#D7B95D`) top borders indicate language skill domains.
- **Active Level Markers:** Dynamic red ledger pins and bold highlighted table columns focus the reader's attention.

---

## 5. WhatsApp Integration Verification

- **Institute Contact Number:** `+49 1520 D9W-INFO` (`+49 1520 3994636`).
- **URL Format:** `https://wa.me/4915203994636?text=${encodeURIComponent(message)}`
- **Generated Message Sample (for B1):**
  > `Hello D9W German Institute, I would like to enquire about the B1 German Course (Intermediate Independence). Please share the upcoming batch schedule, syllabus, and consultation details.`
- **Ethical Safeguard:** Clear disclaimer stating *"Opens WhatsApp directly with your pre-filled inquiry. No automatic messages are sent."*

---

## 6. Verification Results

| Verification Check | Target | Actual Result | Status |
| :--- | :--- | :--- | :--- |
| **TypeScript Compilation** | `tsc -b` | 0 errors | **PASS** |
| **Production Vite Build** | `vite build` | 2,157 modules transformed in 324ms | **PASS** |
| **Code Linter** | `oxlint` | 0 warnings, 0 errors across 54 files | **PASS** |
| **Level Selection Sync** | A1 &rarr; C1 state updates | Updates all 14 dimensions, skills, and CTA | **PASS** |
| **URL State Sync** | `?level=b2` query param | Deep linking directly focuses B2 | **PASS** |
| **Course Links** | Internal routes | `/courses/a1` through `/courses/c1` verified | **PASS** |
| **Responsive Layout** | 320px–1440px | Table on desktop with toggle; dedicated card on mobile | **PASS** |
| **Touch Targets** | Accessibility | Touch targets &ge; 40px with visible focus rings | **PASS** |

---

## 7. Known Limitations & Future Enhancements

- Course fees and specific cohort start dates are omitted per strict data integrity rules; these will be dynamically linked in `P03-02: Real-Time Batch Availability Calendar`.
- PDF syllabus download button will be connected in `P03-03: Automated PDF Syllabus Generation`.
