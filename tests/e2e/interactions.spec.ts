import { test, expect } from '@playwright/test'

test.describe('D9W Core Header, Navigation & UI Interactions', () => {
  test('Header renders official D9W logo without 10 TOOLS badge', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Check official logo exists
    const logoImg = page.locator('header img[alt="D9W German Language Institute"]')
    await expect(logoImg).toBeVisible()

    // Ensure the 10 TOOLS badge is completely removed from the header across all views
    const tenToolsInHeader = page.locator('header').getByText('10 TOOLS')
    await expect(tenToolsInHeader).toHaveCount(0)

    // Ensure Learning Hub navigation link is present in the DOM
    const learningHubLink = page.locator('header a[href="/learning-hub"]').first()
    await expect(learningHubLink).toBeAttached()
  })

  test('Language Switcher switches between Deutsch and English seamlessly', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Initially English
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')

    // Find and click language switcher button in header
    const langBtn = page
      .locator('header')
      .getByRole('button', { name: /change language|sprache|deutsch|english/i })
      .first()
    await expect(langBtn).toBeVisible()
    await langBtn.click()

    // Click German option
    const deOption = page.getByRole('option', { name: /deutsch/i }).first()
    await deOption.click()

    // Verify language changed to German
    await expect(page.locator('html')).toHaveAttribute('lang', 'de')

    // Verify localStorage persistence
    const savedLang = await page.evaluate(() => localStorage.getItem('d9w_language'))
    expect(savedLang).toBe('de')

    // Switch back to English
    await langBtn.click()
    const enOption = page.getByRole('option', { name: /english/i }).first()
    await enOption.click()

    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  })

  test('Mobile drawer navigation opens, navigates and closes correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/', { waitUntil: 'domcontentloaded' })

    // Open hamburger
    const hamburgerBtn = page.locator('button[aria-label="Open mobile navigation menu"]')
    await expect(hamburgerBtn).toBeVisible()
    await hamburgerBtn.click()

    // Mobile drawer should be visible
    const drawer = page.locator('div[role="dialog"][aria-label="Mobile Navigation"]')
    await expect(drawer).toBeVisible()

    // Verify no 10 TOOLS badge in drawer
    await expect(drawer.getByText('10 TOOLS')).toHaveCount(0)

    // Close via close button
    const closeBtn = drawer.locator('button[aria-label="Close navigation menu"]')
    await closeBtn.click()
    await expect(drawer).not.toBeVisible()

    // Open and close via Escape key
    await hamburgerBtn.click()
    await expect(drawer).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(drawer).not.toBeVisible()
  })

  test('Demo Booking & Lead Capture modal workflow', async ({ page }) => {
    await page.goto('/demo', { waitUntil: 'domcontentloaded' })

    // Check direct WhatsApp action link exists on page
    const waLink = page.locator('a[href*="wa.me/918056657640"]').first()
    await expect(waLink).toBeVisible()

    // Trigger Lead Capture Modal
    const bookDemoBtn = page.getByRole('button', { name: /Book Free Demo/i }).first()
    await expect(bookDemoBtn).toBeVisible()
    await bookDemoBtn.click()

    // Verify modal is open with accessible inputs
    const modal = page.locator('div[role="dialog"]').first()
    await expect(modal).toBeVisible()
    await expect(modal.locator('input[type="text"]').first()).toBeVisible()
    await expect(modal.locator('input[type="tel"]').first()).toBeVisible()
    await expect(modal.locator('input[type="email"]').first()).toBeVisible()
  })
})
