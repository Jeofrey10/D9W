import { test, expect } from '@playwright/test'

const VIEWPORT_WIDTHS = [
  // Mobile Phones
  { width: 320, height: 568, name: 'Mobile Ultra-Compact (320px - iPhone SE 1st gen)' },
  { width: 360, height: 740, name: 'Mobile Compact (360px - Galaxy S8)' },
  { width: 375, height: 667, name: 'Mobile Standard (375px - iPhone SE/8)' },
  { width: 390, height: 844, name: 'Mobile Modern (390px - iPhone 14/13/12)' },
  { width: 393, height: 852, name: 'Mobile Flagship (393px - Pixel 7 / iPhone 14 Pro)' },
  { width: 412, height: 915, name: 'Mobile Large Android (412px - Samsung S23+)' },
  { width: 430, height: 932, name: 'Mobile Max (430px - iPhone 14 Pro Max)' },
  // Tablets & Foldables
  { width: 600, height: 960, name: 'Small Tablet / Phablet (600px)' },
  { width: 768, height: 1024, name: 'Portrait Tablet (768px - iPad Mini/Air)' },
  { width: 820, height: 1180, name: 'Mid Tablet (820px - iPad 10th gen)' },
  { width: 834, height: 1194, name: 'Tablet Pro (834px - iPad Pro 11)' },
  { width: 1024, height: 768, name: 'Landscape Tablet / Small Laptop (1024px)' },
  // Laptops
  { width: 1280, height: 800, name: 'Standard Laptop (1280px)' },
  { width: 1366, height: 768, name: 'Common Laptop (1366px)' },
  { width: 1440, height: 900, name: 'High-Res Laptop (1440px - MacBook Pro)' },
  { width: 1536, height: 864, name: 'Large Laptop (1536px)' },
  // Desktops & Wide Screens
  { width: 1600, height: 900, name: 'Standard Desktop (1600px)' },
  { width: 1920, height: 1080, name: 'Full HD Desktop (1920px)' },
  { width: 2560, height: 1440, name: '2K / QHD Ultra-Wide (2560px)' },
]

const KEY_PAGES = [
  '/',
  '/courses',
  '/batches',
  '/syllabus',
  '/learning-hub',
  '/about',
  '/contact',
  '/reading-practice',
  '/listening-practice',
  '/word-of-the-day',
  '/case-translator',
  '/study-planner',
]

test.describe('D9W Universal Responsive Optimization & Overflow Audit', () => {
  for (const vp of VIEWPORT_WIDTHS) {
    test(`Zero horizontal overflow at ${vp.width}px (${vp.name}) across core routes`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height })

      for (const path of KEY_PAGES) {
        await page.goto(path, { waitUntil: 'domcontentloaded' })

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          const docWidth = document.documentElement.scrollWidth
          const winWidth = window.innerWidth
          return {
            docWidth,
            winWidth,
            hasOverflow: docWidth > winWidth,
          }
        })

        expect(
          overflow.hasOverflow,
          `Horizontal scroll detected on ${path} at width ${vp.width}px (scrollWidth: ${overflow.docWidth}px, innerWidth: ${overflow.winWidth}px)`
        ).toBe(false)
      }
    })
  }
})
