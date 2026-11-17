# P03-07: Wort des Tages (German Word of the Day) — Architecture & Reference Documentation

**Status:** Completed & Production Ready  
**Scope:** CEFR German Daily Vocabulary Experience (A1, A2, B1, B2, C1)  
**Primary Route:** `/word-of-the-day`  
**Aliases:** `/wort-des-tages`, `/daily-word`  
**Design System:** Modern Skeuomorphism & Premium European Editorial  
**Official Institute Timezone:** `Europe/Berlin` (`DAILY_WORD_CONFIG.TIMEZONE`)  
**Reference Year:** 2026 (Full 365-day deterministic vocabulary schedule)  
**Storage Engines:**
- `d9w-daily-word-progress-v1` (Daily completions, streaks, quiz attempts, learned states)
- `d9w-reading-vocabulary-v1` (Unified student saved vocabulary with P03-06 My Vocabulary)

---

## 1. Overview & Vision

The **Wort des Tages (Daily German Word)** learning engine brings a structured, pedagogical vocabulary habit into the daily routine of German learners from CEFR A1 through C1.

Rather than random or ad-hoc vocabulary generation, D9W implements an authentic **editorial calendar**:
1. Every day of the year presents exactly **one** carefully selected German word with its grammatical gender (`der`, `die`, `das`), phonetic IPA pronunciation, English translations, CEFR badge, natural context example sentences, and audio speech.
2. Learners engage through an interactive **Daily Mini Quiz** featuring article selection, meaning comprehension, and contextual sentence completion.
3. Daily habit retention is reinforced through **Consecutive Day Streaks** calculated strictly according to Central European Time (`Europe/Berlin`), preventing date drift or cheating across timezones.
4. Words saved from Wort des Tages automatically sync to the student's unified **My Vocabulary** bank (`/my-vocabulary`), ready for spaced-repetition export (Anki/Quizlet CSV).

---

## 2. Route & Navigation Architecture

### 2.1 Route Registrations (`src/routes/index.tsx`)
- `/word-of-the-day`: Primary canonical route for the full Wort des Tages experience.
- `/wort-des-tages`: Authentic German language alias route.
- `/daily-word`: Backward-compatible legacy alias and quick link.

### 2.2 Deep Linking & Date Parameter Sync
- The URL query parameter `?date=YYYY-MM-DD` allows learners to load and practise any previous word in the archive (e.g., `/word-of-the-day?date=2026-03-15`).
- Future dates (`date > todayBerlin`) are strictly protected from pre-exposure and resolve to today's active word.
- Omitting `?date` defaults cleanly to the current Berlin date.

---

## 3. Centralized Berlin Timezone Engine

A fundamental architectural requirement is that all learners worldwide see the identical German word on the same calendar day.

### 3.1 Timezone Invariant (`src/data/daily-word/dailyWordConfig.ts`)
```typescript
export const DAILY_WORD_CONFIG = {
  TIMEZONE: 'Europe/Berlin',
  SCHEDULE_YEAR: 2026,
  FALLBACK_VOCABULARY_ID: 'noun-001',
  STREAK_RULE: 'quiz-or-learned',
  PASSING_QUIZ_PERCENT: 60,
  STORAGE_KEY: 'd9w-daily-word-progress-v1',
  MY_VOCABULARY_STORAGE_KEY: 'd9w-reading-vocabulary-v1',
} as const
```

### 3.2 Midnight Transition Safety
`getBerlinTodayDateString()` uses native `Intl.DateTimeFormat`:
```typescript
const formatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: DAILY_WORD_CONFIG.TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
```
This produces the exact `YYYY-MM-DD` string in Berlin without relying on user machine clock timezones or UTC offsets.

---

## 4. 365-Day Schedule & Editorial Transparency

The schedule resides in `src/data/daily-word/dailyWordSchedule.ts` and contains 365 discrete entries mapping every day of 2026 to canonical vocabulary entries in `ALL_VOCABULARY`:

| Date Range | Days | Status | Review State | Description |
|---|---|---|---|---|
| **Jan 01 – Nov 30, 2026** | 334 days | `published: true` | `verified` | Fully curated, verified example sentences, audio-ready |
| **Dec 01 – Dec 31, 2026** | 31 days | `published: false` | `under-review` | Scheduled editorial pipeline; explicit badge shown |

### CEFR Level Distribution in Schedule:
- **A1:** 152 days (Foundation nouns, verbs, key adjectives)
- **A2:** 78 days (Daily living, travel, workplace essentials)
- **B1:** 65 days (Abstract concepts, societal discourse)
- **B2:** 45 days (Academic, professional, idiomatic expressions)
- **C1:** 25 days (Advanced nuance, rhetoric, precise distinctions)

---

## 5. Vocabulary Corpus Expansion (B2 & C1)

To support advanced learners at B2 and C1 levels, `ALL_VOCABULARY` was expanded with verified records:
- **B2 Additions (`src/data/vocabulary/b2-vocabulary.json`):** *Herausforderung*, *Nachhaltigkeit*, *Augenblick*, *Vorurteil*, *Zuversicht*, *Verantwortung*, *Sehnsucht*, *Bereitschaft*, *Wohlstand*, *Vielfalt*, *überzeugen*, *bewältigen*, *zuverlässig*, *eindeutig*.
- **C1 Additions (`src/data/vocabulary/c1-vocabulary.json`):** *Zäsur*, *Souveränität*, *Diskurs*, *Diskrepanz*, *Ambivalenz*, *Konsens*, *hinterfragen*, *prägnant*, *fundiert*.

Total `ALL_VOCABULARY` inventory: **145 verified entries**.

---

## 6. Visual Design & Modern Skeuomorphism

The visual interface adheres strictly to D9W's European Editorial and Modern Skeuomorphic design language:

### 6.1 Authentic Gender Color Tokens
- **Maskulin (`der`):** Prussian Blue (`#1E3A8A`) — Border accent `border-l-[#1E3A8A]`, Badge `bg-[#1E3A8A] text-white`
- **Feminin (`die`):** Crimson Red (`#C83B32`) — Border accent `border-l-[#C83B32]`, Badge `bg-[#C83B32] text-white`
- **Neutrum (`das`):** Forest Moss Green (`#15803D`) — Border accent `border-l-[#15803D]`, Badge `bg-[#15803D] text-white`

### 6.2 Skeuomorphic Tactility
- **Paper Desk Cards:** `skeuo-paper` with subtle multi-layer elevation and warm ivory background (`#F7F5F0`).
- **Tactile Action Buttons:** Stamped brass and ink-well aesthetic, with active press downstates (`hover:shadow-md active:translate-y-px`).
- **Interactive Speech Controller:** Tactile audio pill leveraging `useGermanSpeech` (`de-DE`).

---

## 7. Daily Mini Quiz Engine

Each daily word dynamically generates an interactive 3-part pedagogical assessment:

1. **Article Identification (`article-selection`):** Focuses on gender retention (`der`, `die`, `das`) for nouns.
2. **English Meaning Comprehension (`meaning-selection`):** 4-option multiple choice with deterministic distractor sampling.
3. **Sentence Fill-in-the-Blank (`fill-blank`):** Contextual sentence with the target word blanked (`______`) to test active recall.

### Pedagogical Score Tiers
- **100% (3/3):** *Ausgezeichnet!* (Excellent)
- **75%–89%:** *Sehr gut!* (Very Good)
- **60%–74% (2/3):** *Gut gemacht!* (Well Done — Qualifies for streak credit)
- **< 60%:** *Weiter üben!* (Keep Practising)

---

## 8. Streak Mechanics & Habit Tracking

### Qualification Rule
In accordance with `DAILY_WORD_CONFIG.STREAK_RULE: 'quiz-or-learned'`, a day qualifies for consecutive streak credit when:
1. The student clicks **"Als gelernt markieren"** (Mark as Learned), OR
2. The student completes the daily mini quiz with a passing score ($\ge 60\%$).

### Consecutive Continuity Logic
- An active streak remains valid if completed on **today** OR **yesterday** (allowing the user until midnight in Berlin to keep their streak alive).
- Missing two consecutive calendar days resets `currentStreak` to 0 or 1 upon completion.
- `longestStreak` persists the all-time personal best.

---

## 9. Integration with Existing Engines

1. **German Dictionary (`/dictionary`):** "Im Wörterbuch öffnen" button jumps straight to `/dictionary?q={word}`.
2. **Article Explorer (`/article-explorer`):** "Artikel Explorer" button jumps straight to `/article-explorer?search={word}`.
3. **My Vocabulary (`/my-vocabulary`):** "Zu meinem Wortschatz" seamlessly saves the word into `d9w-reading-vocabulary-v1`, making it immediately accessible across the reading practice ecosystem and exportable to CSV.
4. **Learning Hub (`/learning-hub`):** Features the interactive `DailyWordWidget` preview card at the top of the hub.

---

## 10. Automated Verification Suite

Run the full verification suite with:
```bash
npm run test:daily-word
```
Verifies 37 critical system assertions across schedule integrity, timezone determinism, vocabulary lookup, quiz generation, streak math, and gender color tokens.
