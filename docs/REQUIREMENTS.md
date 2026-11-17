# D9W German Language Institute — System Requirements

## 1. Functional Requirements

### FR-01: Navigation & Routing
- The application supports client-side routing via React Router DOM with lazy-loaded route chunks and suspense fallback.
- Cleanly resolves all institute routes: `/`, `/courses`, `/courses/:level`, `/learning-hub`, `/online-classes`, `/offline-classes`, `/assessment`, `/about`, `/contact`, `/demo`.
- Fully functional interactive engines: `/dictionary`, `/article-explorer`, `/number-trainer`, `/time-trainer`, `/sentence-builder`, `/assessment`.
- Unrecognized URL paths route to a branded 404 page with navigation recovery.
- Automatic scroll reset to `(0, 0)` on every route transition.

### FR-02: German Dictionary Engine (`/dictionary`)
- Must support bidirectional search (German &rarr; English and English &rarr; German).
- Article-aware search matching (e.g. searching "das Haus" or "Haus").
- Display headword, grammatical article, plural form, IPA phonetics, CEFR level, category, and example sentence with translation.
- Integration of `useGermanSpeech` for audio pronunciation (0.75x, 1.0x, 1.25x).
- Persistent favorites bookmarking and recent search tracking via LocalStorage.

### FR-03: Article Explorer Engine (`/article-explorer`)
- Randomized noun drill testing `der`, `die`, `das` articles.
- Game modes: Practice, 10 Questions, 20 Questions, 60s Timed Challenge, and Review Incorrect Mistakes.
- Suffix rules educational explanations (-ung, -heit, -keit, -schaft, -chen, -ismus, -ling) with noted exceptions.
- Real-time accuracy and streak calculation.

### FR-04: Number Trainer Engine (`/number-trainer`)
- Support numbers from 0 to 1,000,000 with algorithmic German spelling generation.
- Enforce inverted digit rules (21 &rarr; `einundzwanzig`, 35 &rarr; `fünfunddreißig`) and compound word rules.
- Practice modes: Number to Word Quiz, Word to Number, Typing Drill, and Audio Dictation.
- Euro price formatting and ordinal numbers (`erste`, `dritte`, `siebte`).

### FR-05: Time Trainer Engine (`/time-trainer`)
- Interactive SVG analog clock with hour and minute hands.
- Live stepper controls to adjust hours and minutes.
- Formal (24h) and informal conversational German time expression generation:
  - 14:30 formal: *"Es ist vierzehn Uhr dreißig."*
  - 14:30 informal: *"Es ist halb drei."* (Enforcing the rule that *halb* refers to the upcoming hour).
- Quiz mode with multiple choice validation and linguistic explanations.

### FR-06: Sentence Builder Engine (`/sentence-builder`)
- Click and touch-friendly tile arranger to form German sentences.
- Validation of core syntactic rules:
  - Verb-Second (V2) in main clauses.
  - Sentence bracket with modal verbs and separable prefixes.
  - Verb-final in subordinate clauses (`weil`, `dass`, `obwohl`).
  - TeKaMoLo adverbial sequencing.
- Reset, show solution, and native audio playback.

### FR-07: Diagnostic CEFR Assessment (`/assessment`)
- 30 diagnostic questions spanning A1, A2, B1, B2, and C1.
- Competency evaluation across Vocabulary, Grammar, Sentence Structure, Reading Comprehension, and Functional Language.
- Answer retention during previous/next question navigation.
- Accurate calculation of raw score, percentage, and CEFR recommended level:
  - 0–7 &rarr; A1
  - 8–14 &rarr; A2
  - 15–21 &rarr; B1
  - 22–26 &rarr; B2
  - 27–30 &rarr; C1
- Non-certifying diagnostic disclaimer and contextual enrollment CTAs (course link, demo booking, WhatsApp advisor).

---

## 2. Non-Functional Requirements

### NFR-01: Performance & Code-Splitting
- All 6 interactive tools and primary pages are code-split into discrete lazy chunks under 30 kB.
- Sub-320ms production builds using Vite 8 with zero warnings.
- Instant client-side speech synthesis and local search.

### NFR-02: Accessibility (a11y)
- Full WCAG 2.1 AA compliance.
- Keyboard navigation across all interactive buttons, inputs, and drawers.
- Visible focus rings with high-contrast German Red (`#C83B32`) outline.
- Full support for `prefers-reduced-motion` media queries.

### NFR-03: Responsive Design
- Tested and verified on 320px mobile, 375px mobile, 768px tablet, 1024px laptop, and 1440px desktop.
- Zero horizontal overflow (`overflow-x: hidden`).
- Minimum touch target sizing (40px) on interactive word tiles and buttons.

### NFR-04: Code Quality & Engineering
- Strict TypeScript (`tsc -b` passing clean).
- Linter validation: `oxlint` with 0 warnings and 0 errors across 45 files.
- Zero external backend, cloud database, or paid API dependencies.
