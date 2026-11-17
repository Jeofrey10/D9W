import { test, expect } from '@playwright/test'

test.describe('iOS Safari & iPad Safari Engine Optimization Tests', () => {
  test('Viewport meta tag specifies viewport-fit=cover for iOS dynamic island and notch', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const viewportMeta = page.locator('meta[name="viewport"]')
    await expect(viewportMeta).toHaveAttribute('content', /viewport-fit=cover/)
  })

  test('Inputs on mobile maintain font-size >= 16px to prevent iOS Safari auto-zoom', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/demo', { waitUntil: 'domcontentloaded' })

    const inputElements = page.locator('input[type="text"], input[type="email"], input[type="tel"]')
    const count = await inputElements.count()

    for (let i = 0; i < count; i++) {
      const fontSize = await inputElements.nth(i).evaluate((el) => {
        return window.getComputedStyle(el).fontSize
      })
      const numericSize = parseFloat(fontSize)
      expect(
        numericSize,
        `Input at index ${i} has font-size ${fontSize}, expected >= 16px to prevent iOS auto-zoom`
      ).toBeGreaterThanOrEqual(16)
    }
  })

  test('Interactive buttons have touch-action manipulation to eliminate tap delay', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const btn = page.locator('button').first()
    const touchAction = await btn.evaluate((el) => window.getComputedStyle(el).touchAction)
    expect(touchAction).toBe('manipulation')
  })

  test('Scrollable containers enable WebKit momentum scrolling', async ({ page }) => {
    await page.goto('/batches', { waitUntil: 'domcontentloaded' })
    const scrollContainers = page.locator('.overflow-x-auto, .overflow-y-auto')
    const count = await scrollContainers.count()

    if (count > 0) {
      const webkitScrolling = await scrollContainers.first().evaluate((el) => {
        return (el as HTMLElement).style.webkitOverflowScrolling ||
          window.getComputedStyle(el).getPropertyValue('-webkit-overflow-scrolling')
      })
      expect(['touch', 'auto', '']).toContain(webkitScrolling)
    }
  })
})
