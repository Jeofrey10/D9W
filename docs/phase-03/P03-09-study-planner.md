# P03-09: Personalized Study Schedule & Exam Countdown Generator

## 1. Executive Overview

**Milestone:** Phase 03 / P03-09 (Final Milestone of Phase 03)  
**Feature:** Personalized German Study Schedule & Exam Countdown Generator  
**Routes:** `/study-planner`, `/exam-planner`, `/study-schedule`  
**Storage Key:** `d9w-study-planner-v1`  
**Status:** Complete & Production Ready  

---

## 2. Architectural Objectives & Constraints

1. **Zero External Paid APIs:** 100% deterministic, offline-capable schedule generation without external LLMs, OpenAI, or paid translation services.
2. **Pedagogical Alignment:** Schedules follow standard CEFR Guided Learning Hours (GLH) and European language examination structures (Goethe-Zertifikat, telc Deutsch, TestDaF, DSH).
3. **Transparent Limitations:** Clear educational warnings when a student's chosen timeline is insufficient for the targeted level leap (e.g. A1 to B2 in 8 weeks).
4. **Deep Ecosystem Integration:** Automatically maps practice sessions to existing D9W Learning Hub tools:
   - Listening tasks -> `/listening-practice`
   - Reading tasks -> `/reading-practice`
   - Daily vocabulary -> `/word-of-the-day`
   - Saved vocabulary -> `/my-vocabulary`
   - Grammar & Case analysis -> `/case-translator`
   - Sentence construction -> `/sentence-builder`
   - Noun genders -> `/article-explorer`
   - Diagnostic placement -> `/assessment`
5. **Modern Skeuomorphism:** Rich tactile materials matching the European physical notebook and desk aesthetic.

---

## 3. Core Modules & Capabilities

### Module 1: 5-Step Personalized Onboarding Wizard
- **Step 1 (Proficiency):** Current CEFR level (A1–C1), target level (A1–C1), and automatic detection of past D9W diagnostic assessments.
- **Step 2 (Exam & Timeline):** Selection of provider (Goethe, telc, TestDaF, DSH, General German), target exam level, planned exam date (with confirmed vs. estimated toggle) or flexible study duration.
- **Step 3 (Availability & Rhythm):** Active study days (Monday–Sunday), daily study minutes (15, 30, 45, 60, 90, or custom), time of day (morning, afternoon, evening, flexible), and study intensity (relaxed, balanced, intensive).
- **Step 4 (Priorities & Weights):** Self-identified weakest skill (+40% allocation boost), strongest skill (with 12% floor preservation), additional attention areas, and grammar/vocabulary supplements.
- **Step 5 (Review & GLH Analysis):** Complete schedule preview, Guided Learning Hours comparison (needed vs. planned), educational caution warnings, and deterministic plan generation.

### Module 2: Exam Countdown Engine
- Real-time days and weeks remaining countdown calculated strictly with local midnight dates to prevent timezone off-by-one errors.
- Visual status badges: Planning (> 12 weeks), Preparation (4–12 weeks), Revision (2–4 weeks), Final Preparation (<= 2 weeks), and Completed (past dates).
- Discloses that countdowns and milestones are planning aids, not predictive guarantees of exam success.

### Module 3: Weekly Timetable & Task Management
- Monday to Sunday columns with rest-day badges ("Ruhetag • Erholung & Regeneration").
- Dual view modes:
  1. **Calendar / Timetable View:** Multi-column view on desktop, vertical day stacks on mobile (< 768px).
  2. **List View:** Concise, linear task overview.
- Full task action lifecycle: mark complete, skip task (retained in schedule with reason), reschedule date, edit duration, add custom tasks, and delete custom tasks.

### Module 4: Daily Study Session & Wall-Clock Focus Timer
- Today's date in German and English, daily planned minutes, completed minutes, and completion percentage.
- Lightweight focus timer with 15m, 25m (Pomodoro), 30m, 45m presets, and wall-clock accuracy immune to background tab pausing.
- 1-click option to mark associated task complete upon timer expiration.

### Module 5: Mock Examination Planner
- Multi-skill score recording (Hören, Lesen, Schreiben, Sprechen, and Total) for scheduled mock exams.
- Qualitative reflection and weak-point notes storage.
- Non-affiliation disclaimers ensuring learners understand scores are self-recorded practice benchmarks.

### Module 6: Progress Dashboard & Data Management
- Comprehensive analytics: overall completion percentage, hours completed vs. planned, weekly consistency bar, and skill-by-skill breakdown table.
- JSON backup export (`d9w-study-plan-*.json`) and JSON import for cross-device migration.
- Double-confirmation modal for resetting local plan data.

### Module 7: Missed-Task Recovery
- Identifies overdue incomplete tasks (`date < today` and neither completed nor skipped).
- 1-click recovery distributing missed tasks into upcoming available study days without exceeding daily limits or encroaching on designated rest days.

### Module 8: A4 Printable Study Plan
- Dedicated print layout (`@media print`) featuring D9W letterhead, target level summary, phase breakdown, scheduled mock exam milestones, and task checklists.

---

## 4. Curated Activity Inventory (24 Total Templates)

The deterministic task engine draws from a curated bank of **24 verified pedagogical templates** across all 8 learning dimensions:

1. **Listening (`listening`, 4 templates):** Short Announcements & Public Transport (A1–A2), Informal Dialogue & Social Scenarios (A1–B1), Radio Interviews & Societal Discussions (B1–B2), Academic Lectures & Presentations (B2–C1).
2. **Reading (`reading`, 4 templates):** Notices, Flyers & Classified Advertisements (A1–A2), Editorial Articles & Travel Reports (A2–B1), Opinion Editorials & Reader Comments (B1–B2), Scientific Summaries & Technical Texts (B2–C1).
3. **Writing (`writing`, 4 templates):** Informal Postcard/Message (A1–A2), Semi-formal Inquiry & Apology (A2–B1), Opinion Forum Contribution (B1–B2), Academic Argumentation & Graphic Analysis (B2–C1).
4. **Speaking (`speaking`, 4 templates):** Daily Routine Monologue & Introduction (A1–A2), Joint Planning Conversation (A2–B1), Structured Mini-Presentation (B1–B2), Academic Discussion & Spontaneous Stance (B2–C1).
5. **Grammar (`grammar`, 4 templates):** Cases & Declension Deep Dive (A1–B1), Two-Way Prepositions (A1–B1), Word Order & Subordinate Clauses (A1–B2), Noun Gender & Suffix Rules (A1–A2).
6. **Vocabulary (`vocabulary`, 2 templates):** Wort des Tages Context Quiz (A1–C1), Thematic Flashcard Spaced Repetition (A1–B2).
7. **Mock Exam (`mock-exam`, 1 template):** Full Timed Examination Simulation (A1–C1).
8. **Revision (`revision`, 1 template):** Targeted Error Analysis & Weak-Point Remediation (A1–C1).
