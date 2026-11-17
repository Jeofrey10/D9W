# D9W German Language Institute — Design System

## 1. Design Direction & Philosophy

The D9W visual identity draws inspiration from the enduring traditions of **Swiss Style (International Typographic Style)** and **German Bauhaus and Ulm School** principles:

- **Clarity over ornament:** Functionality dictates form. Every line, badge, and border serves a communicative purpose.
- **Editorial grid-based discipline:** Asymmetrical tension balanced by consistent column grids and generous whitespace.
- **Restraint and elegance:** No hyper-saturated gradient blobs or AI-generated gimmicks. Deep, authoritative tones grounded by warm, natural paper backgrounds.
- **Linguistic precision:** German words, compound nouns, and grammar terms receive deliberate typographic hierarchy.

---

## 2. Color Palette & Tokens

All colors are centralized in `src/styles/tokens.css` and exposed via `@theme` in `src/styles/globals.css`.

| Token Name | Hex Code | Visual Role |
| :--- | :--- | :--- |
| **Warm Ivory** (`--d9w-color-bg-primary`) | `#F7F5F0` | Primary background, natural editorial texture |
| **Deep Charcoal** (`--d9w-color-text-primary`) | `#171717` | Primary headings, dark buttons, high-contrast text |
| **German Red** (`--d9w-color-accent-brand`) | `#C83B32` | Primary brand accent, primary CTA, urgent highlights |
| **German Red Hover** (`--d9w-color-accent-brand-hover`) | `#AA2E26` | Button hover and active states |
| **Muted Gold** (`--d9w-color-accent-secondary`) | `#D7B95D` | Secondary accent, badges, CEFR milestones |
| **Pure White** (`--d9w-color-surface`) | `#FFFFFF` | Elevated cards, forms, active nav pills |
| **Soft Stone** (`--d9w-color-surface-secondary`) | `#E8E5DD` | Secondary card fills, subtle divider strips |
| **Body Text** (`--d9w-color-text-body`) | `#55534F` | Extended prose, descriptions, syllabus copy |
| **Muted Text** (`--d9w-color-text-muted`) | `#89857E` | Metadata, captions, placeholders |
| **Editorial Border** (`--d9w-color-border`) | `#DEDAD1` | Structural lines, container dividers |

### Grammatical Gender Indicators

To aid intuitive memorization of German noun articles, specific editorial tints are defined:

- **Der (Masculine):** Prussian Blue (`#1E4F8A` / subtle background `#EDF3FA`)
- **Die (Feminine):** Crimson Red (`#C83B32` / subtle background `#FBEBEA`)
- **Das (Neuter):** Forest Moss Green (`#2A684C` / subtle background `#EDF6F1`)
- **Plural:** Warm Ochre (`#8A4F1E` / subtle background `#F9F2EB`)

---

## 3. Typography Hierarchy

### Font Families
- **Headings & Display:** `Manrope Variable` (`@fontsource-variable/manrope`) — Architectural, clean geometric modernist sans with strong editorial weights (600, 700, 800).
- **Body & Controls:** `Inter Variable` (`@fontsource-variable/inter`) — Highly legible neo-grotesque sans engineered for digital reading and micro-copy.
- **Code & Pronunciation (IPA):** System monospace with tabular figure numerals for clock and number trainers.

### Scale & Spacing
- **Display 1 (Hero):** 48px–60px / Leading 1.1 / Weight 900
- **Heading 1 (Page):** 32px–40px / Leading 1.2 / Weight 800
- **Heading 2 (Section):** 24px–32px / Leading 1.25 / Weight 800
- **Heading 3 (Card):** 18px–20px / Leading 1.35 / Weight 700
- **Body Large:** 16px–18px / Leading 1.6 / Weight 400
- **Body Regular:** 14px–15px / Leading 1.55 / Weight 400
- **Caption / Meta:** 11px–12px / Leading 1.4 / Weight 500–600

---

## 4. Spacing & Container Conventions

- **Responsive Breakpoints:**
  - Mobile: `320px – 767px`
  - Tablet: `768px – 1023px`
  - Desktop: `1024px and above`
- **Container Widths:**
  - `sm`: `max-w-3xl` (768px)
  - `md`: `max-w-5xl` (1024px)
  - `lg`: `max-w-7xl` (1280px)
  - `xl`: `max-w-[1440px]` (1440px)

---

## 5. Modern Skeuomorphism Material System

The D9W design language integrates **Modern Skeuomorphism + Premium European Editorial Design**, styled as an authentic physical German learning desk:

### A. Paper Surfaces (`.skeuo-paper`, `.skeuo-paper-stacked`, `.skeuo-flashcard`)
- **Study Worksheets & Flashcards:** Warm ivory surface (`#FFFFFF` to `#FAF8F5`), fine border (`#DEDAD1`), layered edge shadow (`0 1px 2px rgba(23,23,23,0.04), 0 4px 12px rgba(23,23,23,0.05), inset 0 1px 0 rgba(255,255,255,0.9)`).
- **Stacked Paper Effect:** Multi-layered sheet edges mimicking printed vocabulary flashcards and notebooks.

### B. Embossed Buttons & Controls (`.skeuo-button-primary`, `.skeuo-button-secondary`, `.skeuo-button-gold`, `.skeuo-button-dark`)
- **Tactile Depth:** 2–3px physical bottom drop shadow, inset top highlight (`inset 0 1px 0 rgba(255,255,255,0.3)`), and physical 1–2px depression on click (`:active:translate-y-[2px]`).
- **Primary German Red:** Linear gradient (`#D4443B` to `#B6332A`) with `#85221C` bottom edge.
- **Secondary Ivory:** Clean surface with `#BFB9AA` bottom edge.
- **Muted Gold:** Gradient with `#937A2C` bottom edge.
- **Dark Editorial:** Deep charcoal with pitch black bottom edge.

### C. Recessed Control Panels (`.skeuo-recessed`, `.skeuo-input`, `.skeuo-display-meter`)
- **Reading Desks & Displays:** Inset shadows (`inset 0 2px 4px rgba(23,23,23,0.08)`), darker interior (`#EFECE6`), and outer highlight.
- **Digital LED Displays:** High-contrast recessed dark panels with monospace tabular figures.

### D. Grammatical Mechanical Keys (`.skeuo-key-der`, `.skeuo-key-die`, `.skeuo-key-das`)
- **Der (Prussian Blue):** Raised mechanical key with 4px bottom shadow (`#0D2644`), active depression.
- **Die (Crimson Red):** Raised key with 4px bottom shadow (`#731D17`), active depression.
- **Das (Forest Moss Green):** Raised key with 4px bottom shadow (`#0F2A1E`), active depression.

### E. Physical Word Tiles (`.skeuo-word-tile`, `.skeuo-word-tile-placed`, `.skeuo-tile-slot`)
- **Sentence Builder Tokens:** Beveled cardstock tokens with 3px lower edge shadow and tactile snap-in tray.

### F. Tactile Ink Stamp Marks (`.skeuo-stamp-correct`, `.skeuo-stamp-incorrect`)
- **Feedback Stamps:** Double-bordered 3–4° tilted ink stamps for `RICHTIG!` (Forest Green) and `FALSCH!` (German Red) with spring entry animation.

### G. Educational Analog Clock (`.skeuo-clock-rim`, `.skeuo-clock-dial`, `.skeuo-clock-pin`)
- **Analog Skeuomorphism:** Concentric multi-stage beveled bezel, dimensional drop shadows on hour and minute hands, and center brass cap.
- **Radii:** Minimalist architectural radii (`2px`, `4px`, `8px`). Rounded bubbles (`rounded-3xl` or `rounded-full` on cards) are strictly avoided.
- **Shadows:** Minimalist architectural shadows (`var(--d9w-shadow-subtle)`, `var(--d9w-shadow-card)`).

---

## 5. Animation & Motion Guidelines

- **Duration:** 150ms–350ms with custom cubic bezier `(0.16, 1, 0.3, 1)`.
- **Transitions:** Smooth hover color changes, delicate card elevations, and fade-in reveals.
- **Accessibility:** Mandatory `prefers-reduced-motion` override that eliminates transitions and scroll behaviors for sensitive users.
