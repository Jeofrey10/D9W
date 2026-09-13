# D9W German Language Institution

> Official website for D9W German Language Institution based in Madurai, Tamil Nadu, India.
> "Best German Language Courses at an Affordable Price."

---

## Overview

D9W German Language Institution is a German-language learning institute founded and taught by **Patharnisha ("Nisha")**. The institute prepares students across all Common European Framework of Reference for Languages (CEFR) levels (**A1 to C2**) for academic study, professional careers, and life in Germany through online and in-person instruction.

## Features

- **Asymmetric Editorial Design**: Warm ivory palette, Playfair Display + Inter typography, and fluid micro-interactions.
- **Responsive Layout**: Specially formatted and framed for both smartphones and desktop PCs.
- **Comprehensive CEFR Levels**: Interactive timeline covering A1 Beginner Breakthrough to C2 Mastery.
- **4 Flexible Learning Formats**: Self-study online, individual guidance, blended learning, and intensive group instruction.
- **Interactive Inquiries**: Form validation, direct contact options, and Google Maps embed.
- **Accessible & Performance Optimized**: 100% static prerendering with Next.js Turbopack, iOS auto-zoom prevention, and accessible touch targets.

## Tech Stack

- **Framework**: Next.js 16 (Turbopack, App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 & Custom CSS Design Tokens
- **Motion**: Framer Motion
- **Fonts**: Playfair Display (Serif) & Inter (Sans) via `next/font/google`

## Getting Started

### Prerequisites

- Node.js 18+ or later
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jeofrey10/d9w-german-institution.git

# Navigate to project directory
cd d9w-german-institution

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the site.

### Production Build

```bash
# Generate optimized static bundle
npm run build

# Preview production build locally
npm run start
```

## Project Structure

```
├── public/
│   └── images/              # Hero, tutor portrait, and Germany visuals
├── src/
│   ├── app/
│   │   ├── globals.css      # Design tokens, section container, reset
│   │   ├── layout.tsx       # Root layout, Google Fonts, SEO metadata
│   │   └── page.tsx         # Assembled single-page landing site
│   ├── components/
│   │   ├── layout/          # Navbar & Footer
│   │   ├── sections/        # Hero, Formats, Levels, About, Testimonials, FAQ, Contact
│   │   └── ui/              # Reusable Buttons, Ratings, ScrollReveal
│   └── lib/
│       ├── constants.ts     # Business content single source of truth
│       └── utils.ts         # Utility helpers
├── package.json
└── tsconfig.json
```

## Contact & Location

- **Founder & Tutor**: Patharnisha ("Nisha")
- **Address**: 73, Alagar Kovil Main Rd, Mellur, Tallakulam, Madurai, Tamil Nadu 625002
- **Phone**: +91 97894 92758
- **Email**: d9wgermanlanguage@gmail.com
- **Instagram**: [@d9wgermanlanguage](https://www.instagram.com/d9wgermanlanguage/)

---

© D9W German Language Institution. All rights reserved.
