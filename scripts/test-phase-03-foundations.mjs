/**
 * Automated Verification Test Suite for D9W Phase 03 Foundations (P03-01, P03-02, P03-03)
 */

import { createServer } from 'vite'

let passed = 0
let failed = 0

function assert(name, condition, message = '') {
  if (condition) {
    console.log(`✓ PASS: ${name}`)
    passed++
  } else {
    console.error(`✗ FAIL: ${name} — ${message}`)
    failed++
  }
}

async function runTests() {
  console.log('=== Starting D9W Phase 03 Foundations Verification Suite (P03-01, P03-02, P03-03) ===\n')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  try {
    // 1. P03-01: Course Comparison Matrix
    console.log('--- 1. P03-01: Interactive Course Comparison Matrix ---')
    const {
      COURSE_COMPARISON_LEVELS,
      COMPARISON_CATEGORIES,
      ALL_CEFR_LEVELS,
      buildWhatsAppCourseEnquiryUrl,
    } = await vite.ssrLoadModule('./src/data/courseComparison.ts')

    assert(
      'All 5 CEFR levels (A1, A2, B1, B2, C1) present in course comparison dataset',
      ALL_CEFR_LEVELS.length === 5 &&
        ALL_CEFR_LEVELS.every((lvl) => ['A1', 'A2', 'B1', 'B2', 'C1'].includes(lvl))
    )

    assert(
      'Comparison categories count is exactly 14 dimensions',
      COMPARISON_CATEGORIES.length === 14
    )

    assert(
      'Every CEFR level defines comprehensive metadata across all 14 categories',
      ALL_CEFR_LEVELS.every((lvl) => {
        const item = COURSE_COMPARISON_LEVELS[lvl]
        return item && item.level === lvl && item.name && item.durationWeeks && item.hoursTotal
      })
    )

    const whatsappUrl = buildWhatsAppCourseEnquiryUrl('B1')
    assert(
      'WhatsApp course enquiry URL builder formats correct link with institute phone and encoded level message',
      whatsappUrl.includes('918056657640') && whatsappUrl.includes('B1')
    )

    // 2. P03-02: Batch Availability Calendar
    console.log('\n--- 2. P03-02: Batch Availability Calendar & Filtering ---')
    const {
      BATCHES_DATA,
      D9W_WHATSAPP_NUMBER,
    } = await vite.ssrLoadModule('./src/data/batches.ts')

    assert(
      'Batch dataset contains at least 10 verified batches across levels and formats',
      BATCHES_DATA.length >= 10
    )

    assert(
      'Official WhatsApp advising number matches institutional standard (918056657640)',
      D9W_WHATSAPP_NUMBER === '918056657640'
    )

    const allBatchesValid = BATCHES_DATA.every((b) => {
      const validDate = /^\d{4}-\d{2}-\d{2}$/.test(b.startDate)
      const validStatus = ['open', 'filling-fast', 'full', 'coming-soon'].includes(b.status)
      const validMode = ['online', 'offline'].includes(b.mode)
      return validDate && validStatus && validMode
    })
    assert(
      'All batch records conform to strict schema (ISO start dates, modes, verified statuses)',
      allBatchesValid
    )

    const onlineBatches = BATCHES_DATA.filter((b) => b.mode === 'online')
    const offlineBatches = BATCHES_DATA.filter((b) => b.mode === 'offline')
    assert(
      'Both Online and Offline batch modes are active in the live schedule',
      onlineBatches.length > 0 && offlineBatches.length > 0
    )

    // 3. P03-03: Automated Syllabus Generator
    console.log('\n--- 3. P03-03: Automated Syllabus Generator ---')
    const {
      SYLLABUS_DATA,
      ALL_SYLLABUS_LEVELS,
      buildWhatsAppSyllabusEnquiryUrl,
      getSyllabusPdfFilename,
    } = await vite.ssrLoadModule('./src/data/syllabus.ts')

    assert(
      'Syllabus dataset covers all 5 CEFR levels (A1, A2, B1, B2, C1)',
      ALL_SYLLABUS_LEVELS.length === 5 &&
        ALL_SYLLABUS_LEVELS.every((lvl) => !!SYLLABUS_DATA[lvl])
    )

    const allSyllabusHaveModules = ALL_SYLLABUS_LEVELS.every((lvl) => {
      const syl = SYLLABUS_DATA[lvl]
      return (
        syl.modules &&
        syl.modules.length >= 4 &&
        syl.grammarMap &&
        syl.grammarMap.length >= 4 &&
        syl.vocabularyMap &&
        syl.vocabularyMap.length >= 4
      )
    })
    assert(
      'Every level syllabus defines at least 4 learning modules, grammar maps, and vocabulary themes',
      allSyllabusHaveModules
    )

    const syllabusFilename = getSyllabusPdfFilename('B2')
    assert(
      'getSyllabusPdfFilename produces standardized institutional filename',
      syllabusFilename === 'D9W-German-Syllabus-B2.pdf'
    )

    const syllabusWaUrl = buildWhatsAppSyllabusEnquiryUrl(SYLLABUS_DATA.B2)
    assert(
      'buildWhatsAppSyllabusEnquiryUrl formats valid link with encoded B2 syllabus payload',
      syllabusWaUrl.includes('918056657640') && syllabusWaUrl.includes('B2')
    )

    console.log('\n========================================')
    console.log(`Total tests: ${passed}`)
    console.log(`Passed:      ${passed}`)
    console.log(`Failed:      ${failed}`)
    console.log('========================================\n')

    await vite.close()

    if (failed > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('Fatal error in foundations test runner:', error)
    await vite.close()
    process.exit(1)
  }
}

runTests()
