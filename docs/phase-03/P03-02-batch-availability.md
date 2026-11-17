# D9W German Language Institute — P03-02 Implementation Report
## Batch Availability Calendar

- **Feature ID:** `P03-02`
- **Feature Name:** Batch Availability Calendar & Discovery Engine
- **Target Route:** `/batches`
- **Date Completed:** 2026-11-16
- **Status:** Complete & Verified

---

## 1. Overview & Objectives

The **Batch Availability Calendar** (`/batches`) provides prospective students with a transparent, responsive platform to discover upcoming German language batches. It bridges the academic curriculum (A1–C1) with real enrollment planning through:

1. **Dual Presentation Modes:** An interactive **Monthly Calendar** with highlighted start dates alongside a chronological **Upcoming Batches List**.
2. **Multi-Dimensional Filters:** Filter by CEFR Level (A1, A2, B1, B2, C1), Learning Mode (Online Live Studio vs. Offline Campus), Registration Status, and Date Range (This Month, Next Month, All Upcoming).
3. **Strict Data Integrity:** Zero fake urgency, zero fabricated remaining seat numbers, and zero artificial booking simulations. Registration status is purely categorical (`OPEN`, `FILLING FAST`, `FULL`, `COMING SOON`).
4. **Contextual WhatsApp Advising:** Direct click-to-chat integration injecting verified batch metadata into the official admissions consultation line (`+49 1520 D9W-INFO`).
5. **Detailed Batch Inspector:** Responsive modal drawer displaying comprehensive class timings, duration, days, venue/studio format, and registration deadlines.

---

## 2. Component Architecture

All components and utilities are organized under `src/features/batches/` with schema and schedule records in `src/data/batches.ts`:

```text
src/
  features/
    batches/
      components/
        BatchCalendar.tsx         # Monthly 7-column calendar grid with date inspection
        BatchCalendarHeader.tsx   # Month/year navigation with 'Current Month' trigger
        BatchFilters.tsx          # Tactile filter desk (Level, Mode, Status, Timeline)
        BatchViewToggle.tsx       # Segmented rocker control (Calendar vs. Upcoming List)
        BatchCard.tsx             # Physical flashcard presentation of scheduled cohorts
        BatchList.tsx             # Responsive grid of sorted upcoming batch cards
        BatchDetailModal.tsx      # Accessible dialog modal for deep schedule inspection
        BatchStatusBadge.tsx      # Semantic badge (Open, Filling Fast, Full, Coming Soon)
        BatchEmptyState.tsx       # Filter reset and custom batch consultation prompt
      hooks/
        useBatchFilters.ts        # Pure filtering, sorting, and active filter counting
        useBatchCalendar.ts       # Month navigation, grid generation, and date selection
      utils/
        calendarUtils.ts          # Timezone-safe date arithmetic, leap year math, German formatters
        batchUtils.ts             # Filter predicates, WhatsApp URL generator, chronology sorting
      index.ts                    # Barrel export
  data/
    batches.ts                    # Centralized strongly typed batch records
  pages/
    Batches/
      index.tsx                   # Dedicated page with hero, filters, and CEFR cross-links
```

---

## 3. Data Schema & Academic Publication Workflow

### Data Schema (`src/data/batches.ts`)

```typescript
export type CourseLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export type LearningMode = 'online' | 'offline'

export type BatchStatus = 'open' | 'filling-fast' | 'full' | 'coming-soon'

export interface Batch {
  id: string
  level: CourseLevel
  mode: LearningMode
  title: string
  startDate: string // ISO 'YYYY-MM-DD'
  endDate?: string // ISO 'YYYY-MM-DD'
  days: string[] // e.g. ['Montag', 'Mittwoch', 'Freitag']
  startTime?: string // e.g. '18:30'
  endTime?: string // e.g. '20:30'
  timezone?: string // e.g. 'CET (Europe/Berlin)'
  durationHours?: number
  durationWeeks?: number
  status: BatchStatus
  location?: string
  description?: string
  registrationDeadline?: string // ISO 'YYYY-MM-DD'
  syllabusUrl?: string
  published: boolean
}
```

### Schedule Publication Workflow for Institute Coordinators

To add, edit, or archive a cohort, academic coordinators edit `src/data/batches.ts`:

1. **Add a Batch:** Append a new object to `BATCHES_DATA` with `published: true`.
2. **Start Dates:** Always use ISO `YYYY-MM-DD` strings (e.g. `'2027-01-18'`).
3. **Status Changes:**
   - Set `status: 'open'` when accepting applications.
   - Set `status: 'filling-fast'` when the institute marks the cohort near capacity.
   - Set `status: 'full'` when registration closes.
   - Set `status: 'coming-soon'` for announced future cohorts.
4. **Drafts / Pre-release:** Set `published: false` to keep an internal cohort hidden from students until dates are finalized.
5. **Archiving:** Past batches are automatically excluded from the upcoming list view while remaining queryable in historical records.

---

## 4. Calendar Logic & Timezone Safety

- **Local Parsing (`parseIsoDateLocal`):** Parses `YYYY-MM-DD` using local calendar parts `(year, month - 1, day)`. This completely eliminates UTC day-shift bugs that occur in standard `new Date('YYYY-MM-DD')`.
- **Leap Year Support:** `getDaysInMonth(year, monthIndex)` dynamically queries `new Date(year, monthIndex + 1, 0).getDate()`, accurately returning 29 days for February in leap years (e.g. 2028).
- **European Weekday Alignment:** Conforms to DIN 1355 / ISO 8601 with Monday-start indexing (`Mo`, `Di`, `Mi`, `Do`, `Fr`, `Sa`, `So`).
- **Date Grid Multiples:** Dynamically fills 35 or 42 grid cells with leading days from the previous month and trailing days from the next month for visual stability.

---

## 5. WhatsApp Integration Verification

- **Institute Line:** `+49 1520 D9W-INFO` (`4915203994636`).
- **Message Template:**
  ```text
  Hello D9W Team,

  I am interested in the [LEVEL] German course.

  Batch: [BATCH TITLE]
  Learning Mode: [ONLINE/OFFLINE]
  Start Date: [START DATE]

  Please share the registration details and further information.

  Thank you.
  ```
- **Encoding:** Built with `encodeURIComponent` and opened via `https://wa.me/4915203994636?text=...`.
- **Transparency Disclosure:** All triggers explicitly state that clicking opens WhatsApp with a pre-filled draft and no message is sent automatically.

---

## 6. Accessibility & Skeuomorphic Design

- **Paper Aesthetic:** `.skeuo-paper` and `.skeuo-paper-stacked` warm ivory surfaces with fine borders (`#DEDAD1`).
- **Recessed Filter Trays:** `.skeuo-recessed` frames segmented selectors and dropdowns.
- **Accessible Dialog:** `BatchDetailModal` uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, trapped escape key listener, and body scroll lock.
- **Touch Target Sizing:** All date buttons, filter pills, and action links adhere to &ge; 40px touch targets.
- **Screen Reader Clarity:** Batch status badges include descriptive `aria-label` text (e.g. *"Registration is currently open"*).

---

## 7. Verification Results

| Check / Test | Command / Method | Result | Status |
| :--- | :--- | :--- | :--- |
| **TypeScript Strictness** | `tsc -b` | 0 errors | **PASS** |
| **Linter Analysis** | `oxlint` | 0 errors, 0 warnings across 70 files | **PASS** |
| **Vite Production Build** | `vite build` | 2,173 modules transformed in 836ms | **PASS** |
| **Calendar Calculations** | Node unit test | Leap years, month boundaries, weekday alignment verified | **PASS** |
| **Batch Filter Combinations** | Node unit test | Level, mode, status, date-range, and multi-filters verified | **PASS** |
| **Past & Draft Exclusions** | Node unit test | Past batches excluded from upcoming; unpublished hidden | **PASS** |
| **WhatsApp Message Formatting**| Node unit test | Strict message structure and encoding verified | **PASS** |
| **Navigation & Links** | Integration test | Navbar, MobileMenu, Footer, Courses, Online/Offline verified | **PASS** |

---

## 8. Missing Institute Information & Next Steps

- **Live Payment / Seat Reservation:** The institute does not currently operate an automated real-time seat reservation gateway; batch admission is coordinated through the admissions desk and WhatsApp advisory flow.
- **Upcoming Milestone:** `P03-03: Automated PDF Syllabus Generation` will provide downloadable curriculum documents linked to these cohorts.
