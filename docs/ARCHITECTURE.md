# D9W German Language Institute — System Architecture

## 1. Technical Architecture Overview

D9W German Language Institute is built as a single-page application (SPA) with zero external database or proprietary backend requirements.

```
+-------------------------------------------------------------+
|                      Client Browser                         |
|                                                             |
|   +-----------------------------------------------------+   |
|   |                  React 19 SPA                       |   |
|   |  - React Router DOM v7 (Declarative Routing)        |   |
|   |  - Route Code-Splitting with lazy & Suspense        |   |
|   |  - Tailwind CSS v4 + Central Design Tokens          |   |
|   |  - Manrope & Inter Variable Webfonts                |   |
|   +-----------------------------------------------------+   |
|                              |                              |
|          +-------------------+-------------------+          |
|          |                   |                   |          |
|          v                   v                   v          |
|    +-----------+      +--------------+    +--------------+  |
|    | Local JSON|      | LocalStorage |    |  Web Speech  |  |
|    | Datasets  |      | State Cache  |    |  Audio API   |  |
|    +-----------+      +--------------+    +--------------+  |
+-------------------------------------------------------------+
                               |
                               v
               +-------------------------------+
               |     Vercel Static Hosting     |
               |     Global Edge CDN Delivery  |
               +-------------------------------+
```

---

## 2. Directory Structure

```
D9W-German-Hub/
├── public/
│   ├── images/
│   ├── audio/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── PlaceholderPage.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   └── SectionHeading.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── PageLayout.tsx
│   ├── data/
│   │   ├── assessment/
│   │   │   └── questions.json          # 30 CEFR diagnostic questions (A1–C1)
│   │   ├── grammar/
│   │   │   ├── articles.json           # Der/die/das suffix rules & categories
│   │   │   └── sentence-structure.json # V2, Satzklammer, TeKaMoLo rules
│   │   ├── numbers/
│   │   │   ├── cardinal-numbers.json
│   │   │   ├── numberUtils.ts          # 0–1,000,000 algorithmic German spelling engine
│   │   │   └── ordinal-numbers.json
│   │   ├── sentences/
│   │   │   ├── a1-sentences.json
│   │   │   └── a2-sentences.json
│   │   ├── time/
│   │   │   └── timeUtils.ts            # Formal (24h) & informal conversational time rules
│   │   ├── vocabulary/
│   │   │   ├── a1-adjectives.json
│   │   │   ├── a1-nouns.json
│   │   │   ├── a1-verbs.json
│   │   │   ├── a2-nouns.json
│   │   │   ├── b1-nouns.json
│   │   │   ├── common-phrases.json
│   │   │   └── index.ts                # Unified vocabulary index & search
│   │   ├── courses.ts
│   │   └── learningTools.ts
│   ├── hooks/
│   │   ├── useGermanSpeech.ts          # Web Speech Synthesis API abstraction (de-DE)
│   │   └── useLocalStorage.ts          # Resilient client persistence & progress tracking
│   ├── pages/
│   │   ├── About/
│   │   ├── Assessment/
│   │   ├── Contact/
│   │   ├── Courses/
│   │   ├── Demo/
│   │   ├── Home/
│   │   ├── LearningHub/
│   │   │   ├── tools/
│   │   │   │   ├── ArticleExplorerPage.tsx
│   │   │   │   ├── DailyWordPage.tsx
│   │   │   │   ├── DictionaryPage.tsx
│   │   │   │   ├── ListeningPage.tsx
│   │   │   │   ├── NumberTrainerPage.tsx
│   │   │   │   ├── ReadingPage.tsx
│   │   │   │   ├── SentenceBuilderPage.tsx
│   │   │   │   ├── StudyPlannerPage.tsx
│   │   │   │   ├── TimeTrainerPage.tsx
│   │   │   │   └── TranslatorPage.tsx
│   │   │   └── index.tsx
│   │   ├── NotFound/
│   │   ├── OfflineClasses/
│   │   └── OnlineClasses/
│   ├── routes/
│   │   └── index.tsx                   # Lazy-loaded route architecture
│   ├── styles/
│   │   ├── animations.css
│   │   ├── globals.css
│   │   └── tokens.css
│   ├── types/
│   │   ├── index.ts
│   │   └── learning.ts                 # Normalized learning engine domain models
│   ├── App.tsx
│   └── main.tsx
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── DESIGN.md
│   ├── IMPLEMENTATION.md
│   ├── PROJECT.md
│   ├── REQUIREMENTS.md
│   ├── TASKS.md
│   └── TESTING.md
├── package.json
├── README.md
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

---

## 3. Key Architectural Decisions in Phase 02

1. **Route Code-Splitting with `React.lazy` & `Suspense`:**
   Each of the six interactive engines is compiled into an independent chunk, ensuring sub-320ms builds and minimal initial JS load for homepage visitors.
2. **Normalized Static JSON Datasets:**
   Over 200 linguistic records organized into modular JSON files. No external database or network overhead; instant offline accessibility.
3. **Web Speech Synthesis Engine:**
   Uses native `window.speechSynthesis` with `de-DE` locale, providing variable playback rate controls (0.75x, 1.0x, 1.25x) and automatic voice detection without recurring API subscription costs.
4. **Algorithmic Number & Time Rule Engines:**
   Implemented pure TypeScript logic for German number compounding (ones before tens with `und`, `fünfunddreißig`, `eine Million`) and German formal/informal time expressions (*"halb vier"* meaning 3:30).
5. **Client-Side Progress Engine:**
   Safe LocalStorage caching versioned as `v1` to manage student favorites, recent searches, daily streaks, quiz scores, and diagnostic evaluation history.
