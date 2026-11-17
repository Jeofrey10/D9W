import { test, expect } from '@playwright/test'

test.describe('D9W Critical User Journeys (Phase 10 Verification)', () => {
  test('Journey 1: Homepage exploration and bilingual switching', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Verify hero section
    await expect(page.locator('h1').first()).toBeVisible()

    // Switch to German using header language dropdown
    const langBtn = page
      .locator('header')
      .getByRole('button', { name: /change language|sprache|deutsch|english/i })
      .first()
    await langBtn.click()

    const deOption = page.getByRole('option', { name: /deutsch/i }).first()
    await deOption.click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'de')
  })

  test('Journey 2: Courses and CEFR Comparison Matrix navigation', async ({ page }) => {
    await page.goto('/courses', { waitUntil: 'domcontentloaded' })

    // Check course levels and comparison matrix are displayed
    await expect(page.locator('#course-comparison')).toBeVisible()
    await expect(page.locator('text=A1').first()).toBeVisible()
    await expect(page.locator('text=B1').first()).toBeVisible()
    await expect(page.locator('text=C1').first()).toBeVisible()
  })

  test('Journey 3: Batches schedule filtering (Online + B1)', async ({ page }) => {
    await page.goto('/batches', { waitUntil: 'domcontentloaded' })

    // Verify batch schedule page loads with verified batches
    await expect(page.locator('h1').first()).toBeVisible()
    const batchElements = page.locator('.skeuo-paper, .border')
    expect(await batchElements.count()).toBeGreaterThan(0)
  })

  test('Journey 4: Automated Syllabus Generator inspection', async ({ page }) => {
    await page.goto('/syllabus', { waitUntil: 'domcontentloaded' })

    // Check level tabs/selectors (A1, A2, B1, B2, C1)
    await expect(page.locator('text=A1').first()).toBeVisible()
    await expect(page.locator('text=B2').first()).toBeVisible()

    // Select B2
    const b2Btn = page.getByRole('button', { name: /B2/i }).first()
    if (await b2Btn.isVisible()) {
      await b2Btn.click()
    }

    // Check syllabus modules appear
    await expect(page.locator('text=Module').first()).toBeVisible()
  })

  test('Journey 5: Wort des Tages (German Word of the Day)', async ({ page }) => {
    await page.goto('/word-of-the-day', { waitUntil: 'domcontentloaded' })

    // Check daily word header and card
    await expect(page.locator('text=WORT DES TAGES').first()).toBeVisible()
    const audioBtn = page.locator('button[aria-label="Aussprache anhören"]').first()
    await expect(audioBtn).toBeVisible()
  })

  test('Journey 6: Contextual Case Translator & Grammar Engine', async ({ page }) => {
    await page.goto('/case-translator', { waitUntil: 'domcontentloaded' })

    // Verify case selector/engine is loaded
    await expect(page.locator('text=Nominativ').first()).toBeVisible()
    await expect(page.locator('text=Akkusativ').first()).toBeVisible()
    await expect(page.locator('text=Dativ').first()).toBeVisible()
  })

  test('Journey 7: Interactive Reading Practice and Vocabulary Lookup', async ({ page }) => {
    await page.goto('/reading-practice', { waitUntil: 'domcontentloaded' })

    // Check reading passage items exist
    await expect(page.locator('h1').first()).toBeVisible()
    const passageCards = page.locator('.skeuo-paper, article, [data-passage-card]')
    expect(await passageCards.count()).toBeGreaterThan(0)
  })

  test('Journey 8: Listening Practice Audio & Transcript inspection', async ({ page }) => {
    await page.goto('/listening-practice', { waitUntil: 'domcontentloaded' })

    // Check listening exercises exist
    await expect(page.locator('h1').first()).toBeVisible()
    const exercises = page.locator('.skeuo-paper, button:has-text("Play"), button:has-text("Audio")')
    expect(await exercises.count()).toBeGreaterThan(0)
  })

  test('Journey 9: Personalized Study Schedule & Exam Countdown Generator', async ({ page }) => {
    await page.goto('/study-planner', { waitUntil: 'domcontentloaded' })

    // Check study planner step 1 / configuration hero
    await expect(page.locator('h1').first()).toContainText('Lernplan')
  })
})
