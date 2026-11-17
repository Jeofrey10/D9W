import { test, expect } from '@playwright/test'

const ROUTES = [
  { path: '/', name: 'Home' },
  { path: '/courses', name: 'Courses & Comparison Matrix' },
  { path: '/courses/a1', name: 'Course A1 Detail' },
  { path: '/courses/b1', name: 'Course B1 Detail' },
  { path: '/batches', name: 'Batch Schedule & Calendar' },
  { path: '/syllabus', name: 'Automated Syllabus Generator' },
  { path: '/learning-hub', name: 'Learning Hub' },
  { path: '/about', name: 'About & Founder Profile' },
  { path: '/contact', name: 'Contact & Campus Information' },
  { path: '/demo', name: 'Demo Booking & Lead Capture' },
  { path: '/online-classes', name: 'Online Classes' },
  { path: '/offline-classes', name: 'Offline Classes' },
  { path: '/assessment', name: 'Assessment' },
  // 10 Interactive Learning Tools
  { path: '/dictionary', name: 'Dictionary' },
  { path: '/article-explorer', name: 'Article Explorer' },
  { path: '/number-trainer', name: 'Number Trainer' },
  { path: '/time-trainer', name: 'Time Trainer' },
  { path: '/sentence-builder', name: 'Sentence Builder' },
  { path: '/listening-practice', name: 'Listening Practice' },
  { path: '/reading-practice', name: 'Reading Practice' },
  { path: '/my-vocabulary', name: 'My Vocabulary' },
  { path: '/word-of-the-day', name: 'Wort des Tages' },
  { path: '/case-translator', name: 'Contextual Case Translator' },
  { path: '/study-planner', name: 'Study Schedule & Countdown' },
]

test.describe('D9W Universal Routes Smoke Tests', () => {
  for (const route of ROUTES) {
    test(`Route "${route.path}" (${route.name}) loads cleanly without errors`, async ({ page }) => {
      const consoleErrors: string[] = []
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          // Ignore external font or speech synthesis warnings in headless environment
          const text = msg.text()
          if (!text.includes('speechSynthesis') && !text.includes('favicon')) {
            consoleErrors.push(text)
          }
        }
      })

      const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' })
      expect(response?.status()).toBeLessThan(400)

      // Ensure React error boundary was NOT triggered
      const errorBoundaryHeading = page.locator('text=An Unexpected Issue Occurred')
      await expect(errorBoundaryHeading).toHaveCount(0)

      // Verify page layout and navbar are visible
      const header = page.locator('header')
      await expect(header).toBeVisible()

      // Verify no uncaught console errors
      expect(consoleErrors).toEqual([])
    })
  }

  test('Route aliases redirect or render expected view correctly', async ({ page }) => {
    // /wort-des-tages -> Word of the Day
    await page.goto('/wort-des-tages', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('text=An Unexpected Issue Occurred')).toHaveCount(0)

    // /german-cases -> Case Translator
    await page.goto('/german-cases', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('text=An Unexpected Issue Occurred')).toHaveCount(0)

    // /study-schedule -> Study Planner
    await page.goto('/study-schedule', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('text=An Unexpected Issue Occurred')).toHaveCount(0)
  })

  test('404 Page renders gracefully with return navigation', async ({ page }) => {
    await page.goto('/non-existent-page-xyz', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('header')).toBeVisible()
    await expect(page.getByRole('heading', { level: 1, name: '404' })).toBeVisible()
    await expect(page.locator('text=An Unexpected Issue Occurred')).toHaveCount(0)
  })
})
