# P03-05: German Listening Practice Engine (Hörverstehen) — Architecture & Reference Documentation

**Status:** Completed & Production Ready  
**Scope:** Interactive CEFR German Listening Comprehension (A1, A2, B1, B2, C1)  
**Primary Route:** `/listening-practice` (Aliased from `/listening`)  
**Design System:** Modern Skeuomorphism & European Editorial  
**Storage Engine:** Browser LocalStorage (`d9w-listening-progress-v1`)  
**Audio Foundation:** Bundled Native Audio (`/audio/listening/[level]/[file].wav`) with Dedicated Manifest  

---

## 1. Overview & Vision

The **Listening Practice Engine (*Hörverstehen*)** delivers an authentic, pedagogical German audio comprehension laboratory for students progressing from novice (A1) to near-native operational fluency (C1).

Unlike artificial browser speech synthesis (Text-to-Speech) engines that lack human prosody, natural pauses, emotion, and ambient cadence, P03-05 is built strictly for **authentic human German speech**. The system integrates:

- **10 Published Master Audio Exercises** bundled natively with real German speech files.
- **26 Curriculum-Aligned Exercises** configured with pending audio states, complete with pedagogical transcripts, questions, and vocabulary annotations ready for production studio drop-ins.
- **Skeuomorphic Audio Console** featuring recessed transport controls, seekable scrubbers, and 4-speed playback rate selectors (0.75x, 1.0x, 1.25x, 1.5x).
- **Comprehensive Question Types:** Multiple Choice, True/False, Fill-in-the-Blank, Multi-Speaker Conversations, Public Announcements, and Dictation Practice with word-by-word similarity scoring.
- **Pedagogical 3-Mode Transcript Drawer:** Hidden by default during first listen, revealable for study, and auto-unlocked upon submission review (with strict anti-cheat protections for dictation).
- **Persistent Student Progress Dashboard:** Tracks completed exercises, total listening minutes, cumulative average score, and daily study streaks without external databases.

---

## 2. Route & Navigation Architecture

### 2.1 Route Registrations
In `src/routes/index.tsx`:
- `/listening-practice`: Primary entry point for the listening comprehension suite.
- `/listening`: Backward-compatible redirect/alias to `/listening-practice`.

### 2.2 Deep Linking & URL Parameter Reflection
The application synchronizes view state bidirectionally with the URL query parameters using React Router's `useSearchParams`:
- `?level=A1` (or `A2`, `B1`, `B2`, `C1`): Filters the exercise grid to the requested proficiency level.
- `?exercise=ex-a1-alltag-01`: Automatically mounts the focused exercise workspace for that specific exercise.
- Leaving exercise mode clears the `exercise` query param and returns to the filtered library view.

---

## 3. CEFR Level Framework

The listening curriculum maps strictly to Common European Framework of Reference (CEFR) standards:

| Level | CEFR Designation | Target Speed | Native Exercises | Audio Focus |
|---|---|---|---|---|
| **A1** | Breakthrough / Beginner | 0.85x – 1.0x | 8 exercises (2 published) | Articulated greetings, numbers, daily coffee orders, basic introductions. |
| **A2** | Waystage / Elementary | 0.90x – 1.0x | 8 exercises (2 published) | Directions, shopping dialogues, daily schedules, train arrivals. |
| **B1** | Threshold / Intermediate | 1.0x – 1.10x | 8 exercises (2 published) | Public transit delays, workplace conversations, health appointments. |
| **B2** | Vantage / Upper Intermediate | 1.0x – 1.25x | 6 exercises (2 published) | Team project debates, radio feature reports, university registration. |
| **C1** | Effective Operational Proficiency | 1.0x – 1.50x | 6 exercises (2 published) | Specialized scientific debates, complex regulatory broadcasts, academic symposiums. |

---

## 4. The 10 Listening Categories

Every exercise belongs to one of ten standardized thematic categories defined in `src/data/listening/categories.ts`:

1. `alltag`: Daily Routine & Introductions (*Alltag & Vorstellung*)
2. `familie-freunde`: Family & Social Life (*Familie & Freunde*)
3. `einkaufen`: Shopping & Markets (*Einkaufen & Märkte*)
4. `restaurant-cafe`: Dining, Food & Cafes (*Restaurant & Café*)
5. `reisen-verkehr`: Travel, Transit & Navigation (*Reisen & Verkehr*)
6. `arbeit-beruf`: Professional Workplace & Office (*Arbeit & Beruf*)
7. `bildung`: Education, University & School (*Bildung & Universität*)
8. `gesundheit`: Health, Medicine & Doctor Visits (*Gesundheit & Arztbesuch*)
9. `nachrichten-durchsagen`: Public News & Station Announcements (*Nachrichten & Durchsagen*)
10. `diskussionen`: Opinions, Culture & Debates (*Diskussionen & Meinung*)

---

## 5. Exercise & Question Types

The listening engine supports 6 pedagogical question formats:

1. **Multiple Choice (`multiple-choice`):** 4 radio options testing explicit comprehension or situational inference with explanation hints.
2. **True / False (`true-false`):** 2-button binary evaluation of key statements from the audio passage.
3. **Fill in the Blank (`fill-blank`):** Case-insensitive input testing exact terminology, numbers, or key vocabulary with umlaut tolerance (`ä` <-> `ae`).
4. **Conversation Comprehension (`conversation`):** Multi-speaker comprehension assessing speaker intent, agreements, or objections.
5. **Short Announcement (`announcement`):** Simulated airport, train station, or store loudspeaker broadcasts testing track numbers, delays, and critical instructions.
6. **Dictation Practice (`dictation`):** Precision transcription exercise evaluating user input against the authentic spoken German sentence using word-by-word similarity calculations.

---

## 6. Skeuomorphic Audio Console Engine

### 6.1 Architecture (`ListeningAudioPlayer.tsx` & `useListeningPlayer.ts`)
The player is styled after classic European analog high-fidelity audio equipment:
- **Materiality:** Warm ivory textured deck (`#F7F5F0`), deep slate casing (`#171717`), debossed track well with micro-groove borders, and muted gold highlights (`#D7B95D`).
- **Interactive Scrubber:** Custom progress range input with metallic thumbs, active buffer track, and elapsed/remaining time counters (`mm:ss`).
- **Transport Controls:**
  - Precision Play / Pause button with physical depressed-depth shadow states.
  - Skip Back 5 Seconds (`-5s`) & Skip Forward 5 Seconds (`+5s`).
  - Full Reset / Replay to Start (`0:00`).
- **Speed Selector:** Four stepped analog buttons: `0.75x` (slow practice), `1.0x` (authentic), `1.25x` (advanced challenge), and `1.5x` (rapid speed).
- **Global Singleton Protection:** Ensures only one audio track can play simultaneously across the entire application; starting a new track immediately pauses any active player.

---

## 7. Dual Audio Architecture (Real vs. Pending Audio)

To preserve pedagogical integrity, **no synthetic robotic Web Speech API voices are used in place of authentic audio**.

- **Published Exercises (`published: true`):**
  - Bound to physical, verified audio files located in `public/audio/listening/[level]/[filename].wav`.
  - Documented in `src/data/listening/audioManifest.ts` with explicit sample rates, channels, durations, speaker IDs, and licenses.
  - The play button is fully active, allowing full interactive listening and testing.
- **Pending Audio Exercises (`published: false`, `audioStatus: 'pending'`):**
  - Visually distinguished with an amber "Audio in Production" badge.
  - Interactive player is safely disabled with an informative notice indicating that authentic native recordings are currently in mastering.
  - Questions and pedagogical transcripts remain fully inspectable for classroom and curriculum review.

---

## 8. Transcript Drawer & Anti-Cheat System

The `ListeningTranscriptPanel` component features a 3-mode state machine:

1. **`hidden`:** Transcript remains concealed so students focus purely on auditory processing.
2. **`revealed`:** Student manually unrolls the transcript parchment to read along with the audio.
3. **`review`:** After submitting answers, the transcript unlocks alongside answer explanations and correct key indicators.

> [!IMPORTANT]
> **Dictation Integrity Rule:** For `dictation` exercises, the manual "Reveal Transcript" button is permanently locked until after answer submission to prevent copying and pasting.

---

## 9. Scoring, Grading & LocalStorage Progress Architecture

### 9.1 Grading Engine (`listeningScoring.ts`)
- Questions award 10 points each (default).
- Dictation calculates partial credit proportional to word-level matches:
  $$\text{Points} = \text{round}\left(\frac{\text{Matching Words}}{\text{Total Words}} \times 10\right)$$
- Overall percentage determines the skeuomorphic performance ink stamp:
  - **`excellent` (90% - 100%):** *Ausgezeichnet!* (Gold seal)
  - **`very-good` (75% - 89%):** *Sehr Gut!* (Emerald seal)
  - **`good` (60% - 74%):** *Gut gemacht!* (Blue seal)
  - **`needs-practice` (< 60%):** *Noch einmal üben!* (Amber seal)

### 9.2 Persistence Schema (`useListeningProgress.ts`)
Data is stored under key `d9w-listening-progress-v1`:
```typescript
interface ListeningProgressState {
  completedExerciseIds: string[]
  exerciseAttempts: Record<string, QuestionAttempt[]>
  totalListeningSeconds: number
  lastActiveDate: string | null
  streakDays: number
}
```

---

## 10. Verification & Test Suite

The feature includes an automated verification script executed via `npm run test:listening`:

- **Test Suite:** `scripts/test-listening-engine.mjs`
- **Execution:** `node scripts/test-listening-engine.mjs`
- **Assertions:** 14 automated unit tests verifying:
  - Total exercise count target (36 exercises).
  - CEFR distribution (A1: 8, A2: 8, B1: 8, B2: 6, C1: 6).
  - Representation across all 10 categories.
  - Representation across all 6 question types.
  - Physical file existence and minimum byte size for all published audio assets.
  - Manifest consistency.
  - German text normalization and umlaut transliteration.
  - Tolerant fill-in-the-blank answer checking.
  - Exact and partial dictation scoring algorithms.
  - Score tier boundaries and time formatters.
  - Full exercise submission pipelines.
