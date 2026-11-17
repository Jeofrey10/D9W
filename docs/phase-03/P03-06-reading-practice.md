# P03-06: Interactive German Reading Practice (Lesen) — Architecture & Reference Documentation

**Status:** Completed & Production Ready  
**Scope:** CEFR German Reading Comprehension (A1, A2, B1, B2, C1)  
**Primary Routes:** `/reading-practice` (aliased from `/reading`), `/my-vocabulary`  
**Design System:** Modern Skeuomorphism & Premium European Editorial  
**Storage Engine:** Browser LocalStorage (`d9w-reading-progress-v1`, `d9w-reading-vocabulary-v1`, `d9w-reading-preferences-v1`)  
**Data Repository:** Centralized Dictionary (`src/data/vocabulary/index.ts`) + Morphology Mapping (`GERMAN_MORPHOLOGY_MAP`)

---

## 1. Overview & Vision

The **Interactive Reading Practice Engine (*Lesen*)** provides an editorial, distraction-free environment for students progressing from beginner (A1) to advanced academic fluency (C1).

The cornerstone capability is the **Click-to-Translate German Vocabulary Engine**: every German word in every passage is an interactive token that can be clicked to inspect its contextual meaning, base lemma, grammatical gender with authentic color cues (`der` Prussian Blue, `die` Crimson Red, `das` Forest Green), plural forms, verb conjugations, and example usage—all without losing the reader's scroll position or rhythm.

Students can save unfamiliar words to their personal **My Vocabulary Collection** (`/my-vocabulary`), review them, copy them, and export them as RFC 4180 compliant CSV files for use in spaced-repetition tools (Anki, Quizlet).

---

## 2. Route & Navigation Architecture

### 2.1 Route Registrations (`src/routes/index.tsx`)
- `/reading-practice`: Primary entry point for reading passages, progress dashboard, and interactive workspace.
- `/reading`: Backward-compatible redirect/alias to `/reading-practice`.
- `/my-vocabulary`: Dedicated personal collection page with search, filters (CEFR level, gender, word type), clipboard copy, and CSV export.

### 2.2 Deep-Linking & Parameter Reflection
- `?level=B1`: Automatically filters the library to the requested CEFR tier.
- `?passage=pass-a1-alltag-01`: Directly loads the focused reading workspace for the specified text.
- Leaving workspace mode resets the URL query param and returns smoothly to the filtered library view.

---

## 3. CEFR Level Framework

The 36 passages map strictly to Common European Framework of Reference (CEFR) standards:

| Level | CEFR Designation | Target Length | Reading Speed | Grammar Focus | Key Competencies |
|---|---|---|---|---|---|
| **A1** | Breakthrough | 60–120 words | 70 WPM | Präsens, V2 word order, W-Fragen | Everyday routines, bakery orders, simple family introductions |
| **A2** | Waystage | 120–200 words | 90 WPM | Perfekt, Modalverben, weil/dass clauses | Flat hunting, train travel, job interviews, waste separation |
| **B1** | Threshold | 200–350 words | 120 WPM | Präteritum, Passiv, Konjunktiv II | Dual vocational training, volunteering, transit passes, energy transition |
| **B2** | Vantage | 350–500 words | 150 WPM | Passiv Perfekt, Partizipien, Nomen-Verb | Industry 4.0, circular economy, remote work, Bauhaus architecture |
| **C1** | Operational Proficiency | 450–700 words | 180 WPM | Erweiterte Partizipien, Stilistik, Substantivierung | Kafka critique, AI ethics & sovereignty, deliberative democracy, gastrosophy |

---

## 4. The 12 Thematic Categories

Every reading passage belongs to one of twelve standardized categories defined in `src/data/reading/categories.ts`:

1. `alltag`: Alltag — Everyday Life
2. `familie`: Familie & Freunde — Family & Social Life
3. `reisen`: Reisen & Verkehr — Travel & Mobility
4. `essen-kultur`: Essen & Kultur — Food and Culture
5. `arbeit-karriere`: Arbeit & Beruf — Work and Career
6. `bildung`: Bildung & Schule — Education & Studies
7. `technologie`: Technologie & Medien — Technology & Media
8. `gesundheit`: Gesundheit & Wohlbefinden — Health & Wellness
9. `umwelt`: Umwelt & Natur — Environment & Sustainability
10. `gesellschaft`: Gesellschaft & Politik — Society & Civic Life
11. `geschichte`: Geschichte & Städte — History & Cities
12. `literatur`: Literatur & Kunst — Literature & Arts

---

## 5. Clickable Vocabulary Engine & Word Inflection

### 5.1 Tokenization (`tokenizeGermanText.ts`)
The non-destructive tokenizer splits paragraphs into sequential tokens, cleanly separating punctuation (`.`, `,`, `!`, `?`, `—`, `"`), whitespace, and word tokens while preserving exact casing and German umlauts (`ä`, `ö`, `ü`, `ß`).

### 5.2 Morphology Mapping (`vocabularyLookup.ts`)
To resolve inflected words without bloated natural language processing libraries:
1. First priority checks the passage's explicit `keyVocabulary` list.
2. Second priority resolves inflections using `GERMAN_MORPHOLOGY_MAP` (e.g. *häuser* &rarr; *Haus*, *ging* &rarr; *gehen*, *stehe* &rarr; *aufstehen*).
3. Third priority searches the centralized repository `ALL_VOCABULARY`.
4. If unlisted, returns `null` and displays a transparent "Entry not available yet" message with a direct search link to the German Dictionary (`/dictionary?q=...`), strictly preventing fabricated grammatical claims.

### 5.3 Gender Color Tokens
- `der` (Masculine): Prussian Blue (`#1E3A8A`)
- `die` (Feminine): Crimson Red (`#C83B32`)
- `das` (Neuter): Forest Moss Green (`#15803D`)

---

## 6. Reading Modes & Reader Preferences

The workspace provides local reading preferences stored under `d9w-reading-preferences-v1`:

- **Font Size:** Small (`text-base`), Normal (`text-lg`), Large (`text-xl`).
- **Line Spacing:** Compact (`leading-relaxed`), Comfortable (`leading-loose`), Relaxed (`leading-[2.2]`).
- **Reading Modes:**
  - **Reading Mode (*Lesen*):** Pure German text for immersive reading.
  - **Learning Mode (*Lernen*):** Subtly underlines key curriculum vocabulary words and indicates noun genders.
  - **Review Mode (*Review*):** Highlights saved words, reveals quiz solutions, and displays grammar explanations.

---

## 7. Comprehension Question Engine & Scoring

Each reading text features structured comprehension questions spanning 4 formats:
1. **Multiple Choice (`multiple-choice`):** 4 radio options testing explicit details and inference.
2. **True / False (`true-false`):** Binary evaluation of factual claims in the text.
3. **Fill in the Blank (`fill-blank`):** Case-insensitive and umlaut-tolerant (`ä` <-> `ae`) text inputs.
4. **Short Answer (`short-answer`):** Free text input with model answer reveal and self-evaluation.

### Scoring Tiers
- **90–100%:** *Ausgezeichnet!* (Excellent)
- **75–89%:** *Sehr Gut!* (Very Good)
- **60–74%:** *Gut gemacht!* (Good Progress)
- **< 60%:** *Noch einmal üben!* (Keep Practising)

---

## 8. My Vocabulary Collection & CSV Export (`/my-vocabulary`)

Saved words are stored in `d9w-reading-vocabulary-v1`:
- **Deduplication:** Normalizes keys (`[article]_[word]`) so repeated saves update rather than duplicate.
- **Export Engine (`vocabularyExport.ts`):** Formats saved words into RFC 4180 CSV with UTF-8 Byte Order Mark (`\uFEFF`) ensuring clean compatibility with Microsoft Excel, Anki, and LibreOffice.
- **Actions:** Quick clipboard copy, direct link to German Dictionary, and 1-click test in Article Explorer.

---

## 9. Verification & Test Suite

The engine includes an automated test suite executed via `npm run test:reading`:
- **Script:** `scripts/test-reading-engine.mjs`
- **14 Unit Assertions:**
  - 36 total passage inventory.
  - 8-8-8-6-6 CEFR distribution.
  - All 12 categories represented.
  - Published passages count and structure.
  - Non-zero word counts.
  - German punctuation separation.
  - Morphology resolution for irregular verbs and plural nouns.
  - Contextual vocabulary lookup.
  - Gender style tokens.
  - Tolerance text normalization.
  - Question grading across MC, T/F, and Fill-in-Blank.
  - Full submission grading.
  - Score tier thresholds.
  - RFC 4180 CSV export and deduplication keys.
