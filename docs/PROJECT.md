# D9W German Language Institute — Project Overview

## 1. Executive Summary

**D9W German Language Institute** is a modern, high-standard European educational platform designed to elevate how prospective students, healthcare professionals, engineers, and scholars learn the German language.

Operating under the institutional tagline:

> **"Learn German. Shape Your Future."**

The platform integrates:
1. An authoritative **German Language Institute presence** with clear academic transparency.
2. **Ten interactive German learning tools** (Vocabulary, Grammar, Communication, Personal Learning).
3. **CEFR-aligned curriculums (A1 through C1)** targeting Goethe-Zertifikat, telc, and TestDaF exam certification.
4. Flexible **Online live micro-batches** and **Offline campus cohorts**.
5. Direct **WhatsApp and online admissions pathways**.

---

## 2. Strategic Objectives

- **Demystify German Acquisition:** Provide instant, free, client-side digital tools to conquer notorious stumbling blocks: grammatical gender (`der`, `die`, `das`), inverted numbers, TeKaMoLo adverbial order, and case declensions.
- **Convert Casual Learners to Enrolled Students:** Create an organic bridge from free learning tools and diagnostic assessments to live course enrollment and demo bookings.
- **Establish European Editorial Authority:** Contrast sharply with generic AI-generated templates by using a Swiss/German editorial design aesthetic (Warm Ivory, Deep Charcoal, German Red, Muted Gold, pure whitespace, crisp typography).
- **Zero Heavy Backend Overhead:** Architect a fast, client-side, zero-database frontend utilizing static JSON data structures, native Web Speech APIs, and browser LocalStorage.

---

## 3. Scope & Phasing

### Phase 01: Complete Project Initialization & Design System (Completed)
- Vite + React 19 + TypeScript + Tailwind CSS v4 setup.
- Centralized design tokens and typography system (Manrope & Inter Variable fonts).
- Reusable UI component library (Button, Container, SectionHeading, Badge, Navbar, MobileMenu, Footer, PageLayout).
- React Router DOM routing with 20+ fully registered routes.
- Polished Homepage foundation with 8 key sections.
- Comprehensive documentation suite.

### Phase 02: Interactive Learning Engines (Completed)
- **Shared Infrastructure:** Normalized vocabulary schema and 200+ verified records across A1/A2/B1.
- **Pronunciation Engine:** Reusable `useGermanSpeech` hook with variable speed controls (0.75x–1.25x).
- **Persistence Engine:** Reusable `useLocalStorage` hook managing favorites, quiz scores, streaks, and assessment history.
- **Engine 01 (German Dictionary):** Dual-direction search, article tagging, IPA phonetics, and favorites bookmarking.
- **Engine 02 (Article Explorer):** `der`/`die`/`das` practice, 10Q/20Q/timed/review modes, and educational suffix rules.
- **Engine 03 (Number Trainer):** 0–1,000,000 algorithmic generator, inverted number rules, typing drill, and audio dictation.
- **Engine 04 (Time Trainer):** Interactive SVG analog clock with movable hands, formal 24h & conversational informal ("halb vier").
- **Engine 05 (Sentence Builder):** Word tile arranger enforcing V2, modal brackets, TeKaMoLo, and subordinate verb-final syntax.
- **Engine 06 (German Level Assessment):** 30-question diagnostic CEFR test (A1–C1), competency breakdown, and course match CTAs.
- **Performance Optimization:** Code-splitting with React `lazy` and `Suspense`, achieving sub-320ms builds and 0 linter warnings.

### Phase 03: Marketing & Conversion Pathways (Upcoming)
- Interactive Course Comparison Matrix.
- Real-Time Batch Availability Calendar.
- Automated PDF Syllabus Generation.
- Integrated WhatsApp Lead Capture Flow.
- Remaining Tool Implementations (Listening, Reading, Daily Word, Translator, Study Planner).
