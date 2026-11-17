# D9W German Language Institute

> **"Learn German. Shape Your Future."**

A premium, production-ready German language education web platform inspired by sophisticated Swiss and German editorial design systems. Built with React 19, TypeScript, Vite, and Tailwind CSS v4.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js:** `v22.12` or higher (verified with `v22.20.0`)
- **Package Manager:** `npm`

### Installation
```bash
# Clone or navigate to the repository
cd D9W-German-Hub

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build & Preview
```bash
# Typecheck and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) with native ES module loading |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite` |
| **Typography** | [Manrope Variable](https://fontsource.org/fonts/manrope) (Headings) & [Inter Variable](https://fontsource.org/fonts/inter) (Body) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Class Merging** | `clsx` + `tailwind-merge` (`cn` helper) |
| **Architecture** | Client-Side SPA, Local JSON Datasets, Web Speech APIs, Vercel Edge Hosting |

---

## 🎨 Design System & Editorial Direction

The visual foundation follows Swiss/German modernist principles:
- **Warm Ivory (`#F7F5F0`):** Natural editorial reading background.
- **Deep Charcoal (`#171717`):** Authoritative high-contrast text and structural elements.
- **German Red (`#C83B32`):** Primary brand accent for buttons, alerts, and grammatical gender markers.
- **Muted Gold (`#D7B95D`):** Secondary accent for CEFR level badges and highlights.
- **Grammatical Color Coding:** Blue for `der` (masculine), Red for `die` (feminine), Green for `das` (neuter).

---

## 🧭 Routing Architecture

| Route | View | Description |
| :--- | :--- | :--- |
| `/` | `HomePage` | Full editorial homepage with 8 core sections |
| `/courses` | `CoursesPage` | CEFR course catalog (A1, A2, B1, B2, C1) |
| `/courses/:level` | `CourseLevelDetailPage` | Dynamic detailed curriculum view per CEFR level |
| `/learning-hub` | `LearningHubPage` | Dashboard with search and category filters for 10 tools |
| `/dictionary` | `DictionaryPage` | German vocabulary and lexicon lookup |
| `/article-explorer` | `ArticleExplorerPage` | Noun gender mastering tool (`der`, `die`, `das`) |
| `/number-trainer` | `NumberTrainerPage` | German inverted numbers and price dictation |
| `/time-trainer` | `TimeTrainerPage` | Interactive clock for formal and informal German time |
| `/sentence-builder` | `SentenceBuilderPage` | German syntax engine (V2 rule & TeKaMoLo order) |
| `/listening` | `ListeningPage` | Audio dialogues and listening comprehension |
| `/reading` | `ReadingPage` | Graded authentic German reading passages |
| `/daily-word` | `DailyWordPage` | Wort des Tages with cultural etymology |
| `/translator` | `TranslatorPage` | Contextual German translation companion |
| `/study-planner` | `StudyPlannerPage` | Milestone-based CEFR exam study schedule generator |
| `/online-classes` | `OnlineClassesPage` | Live interactive virtual micro-batches (max 14 students) |
| `/offline-classes` | `OfflineClassesPage` | Campus immersion cohorts, smart classrooms, and library |
| `/assessment` | `AssessmentPage` | Free 15-minute diagnostic CEFR placement test |
| `/about` | `AboutPage` | Institutional philosophy, faculty standards, and CEFR mapping |
| `/contact` | `ContactPage` | Admissions desk, WhatsApp support, and enquiry form |
| `/demo` | `DemoPage` | Free 45-minute demo class reservation |
| `*` | `NotFoundPage` | Branded 404 page with recovery navigation |

---

## 📚 Documentation Directory

Complete architectural and operational documentation is maintained in [`docs/`](./docs/):
- [`docs/PROJECT.md`](./docs/PROJECT.md) — Project vision, goals, and phased roadmap.
- [`docs/DESIGN.md`](./docs/DESIGN.md) — Design tokens, typography hierarchy, and color system.
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — Technical architecture, directory structure, and decisions.
- [`docs/REQUIREMENTS.md`](./docs/REQUIREMENTS.md) — Functional and non-functional specifications.
- [`docs/IMPLEMENTATION.md`](./docs/IMPLEMENTATION.md) — Implementation details, component patterns, and guidelines.
- [`docs/TASKS.md`](./docs/TASKS.md) — Phased task breakdown and completion tracking.
- [`docs/TESTING.md`](./docs/TESTING.md) — Testing strategy, responsive matrix, and acceptance criteria.
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Vercel deployment instructions and configuration.

---

## 📄 License & Intellectual Property

&copy; D9W German Language Institute. All rights reserved.
