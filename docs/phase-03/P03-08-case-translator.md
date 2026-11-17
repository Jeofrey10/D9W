# P03-08: Contextual Case Translator & German Grammar Engine — Architecture & Reference Documentation

**Status:** Completed & Production Ready  
**Scope:** CEFR German Grammatical Cases (Nominativ, Akkusativ, Dativ, Genitiv) across A1 to C1  
**Primary Route:** `/case-translator`  
**Aliases:** `/german-cases`, `/grammar-engine`, `/translator`  
**Design System:** Modern Skeuomorphism & Premium European Editorial  
**Storage Engine:** Browser LocalStorage (`d9w-case-grammar-progress-v1`)  
**Data Repository:** `src/data/grammar/`  
**Zero Paid APIs / Zero External Backend:** 100% deterministic, offline-capable, client-side educational grammar engine.

---

## 1. Overview & Vision

The **Contextual Case Translator & German Grammar Engine** solves one of the most notorious hurdles in German language acquisition: understanding, predicting, and correctly using the **four grammatical cases**:

1. **Nominativ (1. Fall / Wer-Fall):** Identifies the grammatical subject performing the action or the predicate nominative after copula verbs (*sein, werden, bleiben, heißen*).
2. **Akkusativ (4. Fall / Wen-Fall):** Identifies the direct object receiving the action, duration expressions, pure accusative prepositions (*durch, für, gegen, ohne, um*), and destination with two-way prepositions (*Wohin?*).
3. **Dativ (3. Fall / Wem-Fall):** Identifies the recipient or indirect object (*Wem?*), objects of dative verbs (*helfen, danken, gehören, gefallen*), pure dative prepositions (*aus, bei, mit, nach, seit, von, zu*), and static location (*Wo?*).
4. **Genitiv (2. Fall / Wessen-Fall):** Denotes possession, origin, relationships (*Wessen?*), pure genitive prepositions (*während, wegen, trotz, innerhalb, außerhalb, statt*), and select formal C1 verbs (*bedürfen, gedenken*).

Crucially, **this is an educational grammar engine, not a generic black-box machine translator**. It provides rule-based transparency, explains the pedagogical "why", visualizes syntactic constituents with tactile case color tokens, and acknowledges limitations honestly when an entered sentence falls outside supported patterns.

---

## 2. Route & Navigation Architecture

### 2.1 Route Registrations (`src/routes/index.tsx`)
- `/case-translator`: Primary canonical route hosting all 8 integrated modules.
- `/german-cases`: Human-friendly pedagogical alias.
- `/grammar-engine`: Institutional alias.
- `/translator`: Backward-compatible alias replacing the legacy placeholder page.

### 2.2 Deep Linking & URL State Synchronization
The engine uses URL query parameters to allow direct links to specific tools and filters:
- `?tab=analyzer`: Opens Module A (Sentence Analyzer).
- `?tab=cases`: Opens Module B (Four Case Cards).
- `?tab=articles`: Opens Module C (Article Transformation Trainer).
- `?tab=prepositions`: Opens Module D (Preposition Trainer).
- `?tab=quiz`: Opens Module E (Interactive Case Quiz).
- `?tab=builder`: Opens Module F (Sentence Case Builder).
- `?tab=reference`: Opens Module G (Searchable Reference Library).
- `?tab=progress`: Opens Module H (Grammar Progress Dashboard).

---

## 3. The Eight Core Modules

### Modul A: Contextual Sentence Analyzer (`CaseAnalyzerModule.tsx`)
- **Deterministic Tokenization:** Preserves capitalization, trailing punctuation, and compound structures.
- **Pattern Matching:** Matches against verified reference sentences (100% confidence) or falls back to rule-based constituent identification.
- **Syntactic Element Decomposition:** Generates a structured breakdown table showing Element, Word, Grammatical Function (Subject, Direct Object, Indirect Object, Prepositional Object, Genitive Attribute), Case, and detailed explanation.
- **Honest Limitations:** Explicitly informs the user if a sentence is ambiguous or outside supported educational patterns, without inventing arbitrary analyses.
- **Pattern Inspector Modal:** Explains the 10 core sentence patterns (`PAT-01` to `PAT-10`).

### Modul B: Four German Case Learning Cards (`FourCaseCardsModule.tsx`)
- Interactive tactile card selector for Nominativ, Akkusativ, Dativ, and Genitiv.
- Core question words (*Wer? Was?*, *Wen? Was?*, *Wem?*, *Wessen?*).
- Complete article and pronoun summaries.
- Common learner mistakes comparing incorrect vs correct German with pedagogical rationales.
- Curated example sentences across CEFR A1 to C1 with highlighted grammar.
- Direct CTA button to launch targeted quiz practice for the selected case.

### Modul C: Article Transformation Trainer (`ArticleTransformationModule.tsx`)
- **Interactive Calculator:** Users select gender (masculine, feminine, neuter, plural), case (Nom, Akk, Dat, Gen), and article type (definite, indefinite, negative, possessive with stem selector).
- **Instant Result Display:** Shows the exact inflected article form with tactile gender and case border styling.
- **Full Reference Tables:** Side-by-side matrices for definite (*der/die/das*), indefinite (*ein/eine/ein*), and negative (*kein/keine/kein/keine*) articles.
- **Noun Ending Guide:** Detailed rules and examples for genitive masculine/neuter `-s` vs `-es` endings, N-Deklination exceptions (*des Studenten, des Kollegen*), and dative plural `+n` rule (*den Kindern, den Tischen*).

### Modul D: Preposition & Case Trainer (`PrepositionTrainerModule.tsx`)
- Four categorized preposition groups:
  1. *Accusative (DOGFU):* `durch`, `für`, `gegen`, `ohne`, `um`, `bis`.
  2. *Dative:* `aus`, `bei`, `mit`, `nach`, `seit`, `von`, `zu`, `gegenüber`.
  3. *Genitive:* `während`, `wegen`, `trotz`, `innerhalb`, `außerhalb`, `statt`.
  4. *Two-Way (Wechselpräpositionen):* `an`, `auf`, `hinter`, `in`, `neben`, `über`, `unter`, `vor`, `zwischen`.
- **Interactive Wo? vs Wohin? Switch:** Demonstrates location (*Wo?* &rarr; Dativ: *Ich bin im Haus*) versus destination (*Wohin?* &rarr; Akkusativ: *Ich gehe ins Haus*).
- **Movement-Within-Location Clarification:** Teaches that movement inside a bounded location (*Der Hund läuft im Garten herum*) remains Dativ.
- **Contractions Matrix:** Documents 11 universal contractions (*im, ins, am, ans, beim, vom, zum, zur, aufs, fürs, ums*).

### Modul E: Interactive Case Quiz (`InteractiveCaseQuizModule.tsx`)
- Adaptive question engine featuring 7 distinct exercise formats:
  - *Case identification*
  - *Article selection*
  - *Fill-in-the-blank*
  - *Preposition selection*
  - *Syntactic role identification*
  - *Sentence correction*
  - *Two-way location vs destination distinction*
- Single-question interface with immediate feedback, explanations, score tracking, progress bar, and "Retry Incorrect Questions Only" mode.

### Modul F: Sentence Case Builder (`SentenceCaseBuilderModule.tsx`)
- Scrambled word tile interface where students construct authentic German sentences.
- Drop tray with tile remove/replace capabilities.
- Real-time syntax check supporting multiple acceptable permutations.
- Multi-card case breakdown explaining *why* each tile took its case (e.g. *Ich* = Nominativ subject, *dem Mann* = Dativ recipient, *das Buch* = Akkusativ direct object).

### Modul G: Contextual Case Reference Library (`ContextualCaseReferenceModule.tsx`)
- **Full Personal Pronoun Chart:** All 9 persons across all 4 cases (*ich/mich/mir/meiner*, *du/dich/dir/deiner*, *er/ihn/ihm/seiner*, *sie/sie/ihr/ihrer*, *es/es/ihm/seiner*, *wir/uns/uns/unser*, *ihr/euch/euch/euer*, *sie/sie/ihnen/ihrer*, *Sie/Sie/Ihnen/Ihrer*).
- **Verb Valency Directory:** Searchable table of accusative, dative, dual-object, and genitive verbs with valency formulas and examples.
- **Preposition Master Index:** Searchable catalog with meanings and case triggers.

### Modul H: Grammar Progress Dashboard (`GrammarProgressDashboard.tsx`)
- Real-time metrics: Total questions attempted, total correct, accuracy percentage, solved sentence builder exercises.
- Case-by-case accuracy bars (Nominativ, Akkusativ, Dativ, Genitiv).
- Strongest case & weakest case identification.
- Reset progress modal with explicit double-confirmation.

---

## 4. Visual Identity & Skeuomorphic Design

The UI implements D9W's signature European Editorial and Modern Skeuomorphic design language:
- **Paper Worksheets (`skeuo-paper`):** Warm Ivory cardstock (`#F7F5F0`) with subtle multi-layer elevation.
- **Segmented Console Navigation:** Tactile mechanical switch bar pinned to the top of the workspace.
- **Authentic Case Color Tokens:**
  - **Nominativ:** Slate Charcoal (`#1E293B`)
  - **Akkusativ:** German Crimson Red (`#C83B32`)
  - **Dativ:** Forest Emerald Green (`#15803D`)
  - **Genitiv:** Antique Muted Gold (`#854D0E`)
- **Accessible Multi-Cues:** Cases are distinguished by color, badge text labels, and question words so users with color vision deficiency are fully supported.

---

## 5. Automated Verification Test Suite

Run the full verification suite with:
```bash
npm run test:cases
```
Executes 47 automated assertions validating:
- 4 case definitions and question words.
- Definite, indefinite, negative, and possessive article declensions.
- Personal pronouns across all 4 cases.
- Preposition categories, two-way logic, and contractions.
- Verb valencies (*helfen*, *haben*, *geben*, *bedürfen*).
- Contextual sentence analyzer pattern recognition and fallback.
- Quiz question distribution and scoring.
- Case color token uniqueness.
