# D9W German Language Institute — Quality Assurance & Testing Strategy

## 1. Quality Objectives

Every deliverable in the D9W platform passes five tiers of verification:
1. **Static Type Safety:** 100% clean TypeScript build without suppression flags (`tsc -b`).
2. **Linting & Code Standards:** Zero warnings and zero errors via `oxlint`.
3. **Design System Consistency:** Strict adherence to Swiss/German editorial design tokens and typography.
4. **Responsive Stability:** Seamless layout flow across 320px, 375px, 768px, 1024px, and 1440px viewports with zero horizontal scrolling.
5. **Interactive Functional Integrity:** Functional state management, accurate mathematical scoring, and persistent LocalStorage caching.

---

## 2. Test Execution Protocol

### TypeScript & Build Verification
```powershell
npm run build
```
- **Result:** `tsc -b && vite build` &rarr; Exit Code 0, completed in ~315ms.
- **Code-Splitting Check:** Every learning tool and main page is compiled into an independent lazy-loaded bundle chunk under 30 kB.

### Linting & Static Analysis
```powershell
npm run lint
```
- **Result:** `oxlint` &rarr; 45 files checked, 116 rules evaluated: **0 warnings, 0 errors**.

---

## 3. Interactive Engine Verification Matrix

| Engine / Route | Tested Scenarios | Verification Status |
| :--- | :--- | :--- |
| **Dictionary** (`/dictionary`) | - German to English search ("Haus" &rarr; "House")<br>- English to German search ("table" &rarr; "der Tisch")<br>- Article-aware search ("das Haus")<br>- Bookmark favorites toggling and persistence<br>- Speech synthesis trigger (de-DE) at 0.75x, 1.0x, 1.25x<br>- Category and CEFR level filters | **PASS** |
| **Article Explorer** (`/article-explorer`) | - Noun randomization across A1, A2, B1<br>- Correct article selection (der, die, das)<br>- Incorrect selection and streak reset<br>- Suffix rules display (-ung, -heit, -keit, -chen, -ismus)<br>- 10Q, 20Q, and 60s timed game modes<br>- Review incorrect answers workflow | **PASS** |
| **Number Trainer** (`/number-trainer`) | - Algorithmic generation for 0 to 1,000,000<br>- Inverted rule spelling (21 &rarr; "einundzwanzig", 35 &rarr; "fünfunddreißig")<br>- Euro price formatting ("15,50 €" &rarr; "fünfzehn Euro und fünfzig Cent")<br>- Ordinal numbers ("1." &rarr; "erste", "3." &rarr; "dritte")<br>- Typing validation with German special character helper<br>- Audio dictation mode | **PASS** |
| **Time Trainer** (`/time-trainer`) | - SVG analog clock hour and minute hand positioning<br>- Formal 24h mode ("Es ist vierzehn Uhr dreißig.")<br>- Informal conversational mode ("Es ist halb drei.")<br>- Hour and minute stepper adjustments<br>- Multiple choice answer validation and linguistic explanation | **PASS** |
| **Sentence Builder** (`/sentence-builder`) | - Word tile click-to-add and click-to-remove<br>- V2 positioning validation in main clauses<br>- Separable prefix bracket placement<br>- Subordinate clause verb-kick validation (`weil`, `dass`, `obwohl`)<br>- Reset tiles and reveal solution | **PASS** |
| **Level Assessment** (`/assessment`) | - 30 diagnostic questions covering A1 through C1<br>- Sequential navigation with answer retention<br>- Categorical scoring breakdown across 5 competencies<br>- CEFR level recommendation matching documented thresholds<br>- History persistence in LocalStorage<br>- WhatsApp advisor and course enrollment CTAs | **PASS** |

---

## 4. Responsive Verification Matrix

| Viewport Width | Device Category | Key Verification Checks | Status |
| :--- | :--- | :--- | :--- |
| **320px – 480px** | Mobile Portrait | Clock SVG scales cleanly, word tiles wrap without overflow, buttons span full width, mobile navigation drawer operates smoothly. | Pass |
| **768px – 1023px** | Tablet Portrait | 2-column card layouts, interactive controls wrap neatly, search filters scroll horizontally. | Pass |
| **1024px – 1440px** | Desktop Standard | Full horizontal layout, prominent analog clock display, side-by-side quiz options. | Pass |
| **1440px+** | Wide Desktop | Contained within `max-w-7xl` or `max-w-[1440px]`, maintaining typographic hierarchy. | Pass |
