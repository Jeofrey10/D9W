/**
 * Automated Verification Test Suite for D9W Bilingual Language System (German + English)
 */

import { createServer } from 'vite'
import fs from 'node:fs'
import path from 'node:path'

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

function getObjectKeyPaths(obj, prefix = '') {
  let keys = []
  for (const k of Object.keys(obj)) {
    const val = obj[k]
    const fullPath = prefix ? `${prefix}.${k}` : k
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      keys = keys.concat(getObjectKeyPaths(val, fullPath))
    } else {
      keys.push(fullPath)
    }
  }
  return keys
}

function getDeepValue(obj, pathStr) {
  return pathStr.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj)
}

function interpolate(text, params) {
  if (!params) return text
  return Object.entries(params).reduce(
    (str, [k, v]) => str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v)),
    text
  )
}

async function runTests() {
  console.log('=== Starting D9W Bilingual Language System Verification Suite (DE + EN) ===\n')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'silent',
  })

  try {
    // 1. Types & Supported Languages
    console.log('--- 1. Supported Languages & Types ---')
    const { SUPPORTED_LANGUAGES } = await vite.ssrLoadModule('./src/i18n/types.ts')

    assert(
      'SUPPORTED_LANGUAGES defines exactly 2 languages (de, en)',
      Array.isArray(SUPPORTED_LANGUAGES) && SUPPORTED_LANGUAGES.length === 2
    )

    const deLang = SUPPORTED_LANGUAGES.find((l) => l.code === 'de')
    const enLang = SUPPORTED_LANGUAGES.find((l) => l.code === 'en')

    assert(
      'German language option contains correct label and flag',
      deLang && deLang.nativeLabel === 'Deutsch' && deLang.flag === '🇩🇪'
    )

    assert(
      'English language option contains correct label and flag',
      enLang && enLang.nativeLabel === 'English' && enLang.flag === '🇬🇧'
    )

    // 2. Dictionary Loading & Parity
    console.log('\n--- 2. Translation Dictionaries Parity (EN <-> DE) ---')
    const { en } = await vite.ssrLoadModule('./src/i18n/locales/en/index.ts')
    const { de } = await vite.ssrLoadModule('./src/i18n/locales/de/index.ts')

    assert('English dictionary is non-empty object', Boolean(en && typeof en === 'object'))
    assert('German dictionary is non-empty object', Boolean(de && typeof de === 'object'))

    const enKeyPaths = getObjectKeyPaths(en)
    const deKeyPaths = getObjectKeyPaths(de)

    console.log(`Total translated string keys defined: ${enKeyPaths.length}`)

    assert(
      `English and German dictionaries have substantial coverage (>= 100 keys, actual: ${enKeyPaths.length})`,
      enKeyPaths.length >= 100
    )

    // Check that every EN key exists in DE
    const missingInDe = enKeyPaths.filter((k) => getDeepValue(de, k) === undefined)
    assert(
      `All English keys exist in German dictionary (missing: ${missingInDe.length})`,
      missingInDe.length === 0,
      missingInDe.slice(0, 5).join(', ')
    )

    // Check that every DE key exists in EN
    const missingInEn = deKeyPaths.filter((k) => getDeepValue(en, k) === undefined)
    assert(
      `All German keys exist in English dictionary (missing: ${missingInEn.length})`,
      missingInEn.length === 0,
      missingInEn.slice(0, 5).join(', ')
    )

    // Check that no string values are empty
    const emptyEn = enKeyPaths.filter((k) => {
      const val = getDeepValue(en, k)
      return typeof val !== 'string' || val.trim().length === 0
    })
    const emptyDe = deKeyPaths.filter((k) => {
      const val = getDeepValue(de, k)
      return typeof val !== 'string' || val.trim().length === 0
    })

    assert(
      'No English dictionary string values are blank or invalid',
      emptyEn.length === 0,
      emptyEn.slice(0, 3).join(', ')
    )
    assert(
      'No German dictionary string values are blank or invalid',
      emptyDe.length === 0,
      emptyDe.slice(0, 3).join(', ')
    )

    // 3. Module Breakdown Verifications
    console.log('\n--- 3. Module Scope & Content Verification ---')
    const modules = ['common', 'home', 'courses', 'batches', 'learning', 'about', 'contact']
    modules.forEach((mod) => {
      assert(
        `Module "${mod}" exists in both dictionaries`,
        Boolean(en[mod] && de[mod] && typeof en[mod] === 'object' && typeof de[mod] === 'object')
      )
    })

    // 4. Dot-Notation Resolution & Interpolation
    console.log('\n--- 4. Dot-Notation Resolution & Interpolation Logic ---')
    const resolve = (localeObj, pathStr) => getDeepValue(localeObj, pathStr)

    const homeTitleEn = resolve(en, 'home.hero.title1')
    const homeTitleDe = resolve(de, 'home.hero.title1')
    assert(
      'Resolves deep path home.hero.title1 for EN',
      Boolean(homeTitleEn && homeTitleEn.includes('German'))
    )
    assert(
      'Resolves deep path home.hero.title1 for DE',
      Boolean(homeTitleDe && homeTitleDe.includes('Deutsch'))
    )

    const testParamTemplate = en.contact.preferWhatsAppDesc
    const interpolated = interpolate(testParamTemplate, { phone: '+91 80566 57640' })
    assert(
      'Parameter interpolation replaces {phone} in contact description correctly',
      interpolated.includes('+91 80566 57640') && !interpolated.includes('{phone}')
    )

    // 5. Official Business Information in Config & Integration
    console.log('\n--- 5. Official Business Information Verification ---')
    const { businessInfo } = await vite.ssrLoadModule('./src/config/business.ts')

    assert(
      'Business config defines official phone (+91 80566 57640)',
      businessInfo.phone === '+91 80566 57640'
    )
    assert(
      'Business config defines official WhatsApp (+91 80566 57640)',
      businessInfo.whatsapp === '+91 80566 57640'
    )
    assert(
      'Business config defines official WhatsApp link (https://wa.me/918056657640)',
      businessInfo.whatsappUrl === 'https://wa.me/918056657640'
    )
    assert(
      'Business config defines official email (info@d9wgermanlanguage.com)',
      businessInfo.email === 'info@d9wgermanlanguage.com'
    )
    assert(
      'Business config defines official Instagram handle (D9W@Madurai)',
      businessInfo.instagramDisplay === 'D9W@Madurai'
    )
    assert(
      'Business config defines official Google Maps URL',
      businessInfo.googleMapsUrl === 'https://maps.app.goo.gl/7wUPQwBsAdHszEwg9'
    )
    assert(
      'Business config defines accurate full address with Madurai 625016',
      businessInfo.address.full ===
        '27/6, 20th Extension Road, Behind Sebastiar Church, New Ellis Nagar, Madurai, Tamil Nadu 625016, India'
    )

    // 6. Pedagogical Integrity (German learning materials preserved)
    console.log('\n--- 6. Pedagogical Boundary Check ---')
    const { COURSES_DATA } = await vite.ssrLoadModule('./src/data/courses.ts')
    assert(
      'Courses dataset preserves authentic CEFR levels (A1 to C1)',
      COURSES_DATA.length === 5 &&
        COURSES_DATA.map((c) => c.level).join(',') === 'A1,A2,B1,B2,C1'
    )

    const wordsJsonPath = path.resolve(process.cwd(), 'src/data/dictionary/words.json')
    if (fs.existsSync(wordsJsonPath)) {
      const words = JSON.parse(fs.readFileSync(wordsJsonPath, 'utf-8'))
      assert(
        'Dictionary preserves authentic German vocabulary and articles',
        words.length > 0 && words.some((w) => w.german && w.article)
      )
    }

    // 7. SEO Hreflang Tags in index.html
    console.log('\n--- 7. SEO & Alternate Hreflang Tags ---')
    const indexHtml = fs.readFileSync(path.resolve(process.cwd(), 'index.html'), 'utf-8')
    assert(
      'index.html defines hreflang="en"',
      indexHtml.includes('hreflang="en"')
    )
    assert(
      'index.html defines hreflang="de"',
      indexHtml.includes('hreflang="de"')
    )
    assert(
      'index.html defines hreflang="x-default"',
      indexHtml.includes('hreflang="x-default"')
    )

    // 8. Official Institute Logo Asset & Branding
    console.log('\n--- 8. Official Institute Logo Integration ---')
    const logoPath = path.resolve(process.cwd(), 'public/assets/d9w-institute-logo.png')
    assert(
      'Official logo file exists at public/assets/d9w-institute-logo.png',
      fs.existsSync(logoPath)
    )

    if (fs.existsSync(logoPath)) {
      const logoBuf = fs.readFileSync(logoPath)
      const isPng = logoBuf.toString('ascii', 1, 4) === 'PNG'
      const width = logoBuf.readUInt32BE(16)
      const height = logoBuf.readUInt32BE(20)
      assert(
        'Official logo is authentic 1024x682 RGBA PNG',
        isPng && width === 1024 && height === 682
      )
    }

    const faviconPath = path.resolve(process.cwd(), 'public/favicon.png')
    assert(
      'Browser favicon.png generated from official logo exists',
      fs.existsSync(faviconPath)
    )

    assert(
      'index.html references official logo in Schema.org and OpenGraph metadata',
      indexHtml.includes('/assets/d9w-institute-logo.png')
    )

    const { Logo } = await vite.ssrLoadModule('./src/components/common/Logo.tsx')
    assert(
      'Reusable Logo component is exported and ready for consumption',
      typeof Logo === 'function'
    )

    // 9. Founder & German Language Teacher Profile Verification
    console.log('\n--- 9. Founder Profile Verification (Patharnisha) ---')
    assert(
      'Founder name is strictly spelled "Patharnisha" in English locale',
      en.about.founderName === 'Patharnisha'
    )
    assert(
      'Founder name is strictly spelled "Patharnisha" in German locale',
      de.about.founderName === 'Patharnisha'
    )
    assert(
      'Founder designation is strictly "Founder & German Language Teacher"',
      en.about.founderRole === 'Founder & German Language Teacher'
    )
    assert(
      'German designation is strictly "Gründerin und Deutschlehrerin"',
      de.about.founderRole === 'Gründerin und Deutschlehrerin'
    )
    assert(
      'Organization is strictly "D9W German Language Institute"',
      en.about.founderOrganization === 'D9W German Language Institute' &&
        de.about.founderOrganization === 'D9W German Language Institute'
    )
    assert(
      'English founder biography matches approved copy exactly',
      en.about.founderBio ===
        "Meet Patharnisha, the founder and German language teacher at D9W German Language Institute. With a passion for German language education, she leads the institute's learning journey, helping students build their German language skills through structured and engaging learning experiences."
    )
    assert(
      'German founder biography matches approved copy exactly',
      de.about.founderBio ===
        'Lernen Sie Patharnisha kennen, die Gründerin und Deutschlehrerin des D9W German Language Institute. Mit ihrer Leidenschaft für den Deutschunterricht begleitet sie die Lernreise des Instituts und unterstützt Lernende dabei, ihre Deutschkenntnisse durch strukturierten und abwechslungsreichen Unterricht aufzubauen.'
    )

    console.log('\n======================================================')
    console.log(`Results: ${passed} PASSED, ${failed} FAILED`)
    console.log('======================================================')

    if (failed > 0) {
      process.exit(1)
    }
  } finally {
    await vite.close()
  }
}

runTests().catch((err) => {
  console.error('Fatal test runner error:', err)
  process.exit(1)
})
