# D9W German Language Institute — Vercel Deployment & Build Architecture

## 1. Hosting Architecture

The D9W platform is designed for zero-config, high-performance static edge hosting on **Vercel**.

```
GitHub Repository  --->  Vercel Edge Network  --->  Global End Users
(Push to main)           - Build: npm run build     - Instant SSL
                         - Output: dist             - Sub-50ms TTFB
```

---

## 2. Vercel Configuration (`vercel.json`)

To ensure client-side routing with React Router DOM works seamlessly when users directly refresh or navigate to deep URLs (such as `/courses/b2` or `/article-explorer`), a `vercel.json` rewrites file is provided:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 3. Deployment Steps

### Option A: Automatic Git Integration (Recommended)
1. Push the repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Phase 01 initialization and design system"
   git remote add origin <repo-url>
   git push -u origin main
   ```
2. Log into [Vercel Dashboard](https://vercel.com).
3. Click **Add New...** &rarr; **Project**.
4. Import the `D9W-German-Hub` repository.
5. Vercel automatically detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
6. Click **Deploy**.

### Option B: Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 4. Environment & Build Requirements

- **Node.js Runtime:** 22.12 or later
- **Package Manager:** npm 10+
- **Environment Variables:** None required in Phase 01 (zero third-party API keys or credentials needed).
