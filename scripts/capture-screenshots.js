import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const ARTIFACTS_DIR = 'C:\\Users\\KANIMOZHI\\.gemini\\antigravity\\brain\\8d9fc877-b045-4f8c-8bed-6d8a06a4d2b2\\screenshots'

if (!fs.existsSync(ARTIFACTS_DIR)) {
  fs.mkdirSync(ARTIFACTS_DIR, { recursive: true })
}

const viewports = [
  { name: '320px-mobile-small', width: 320, height: 600 },
  { name: '375px-mobile-standard', width: 375, height: 667 },
  { name: '390px-mobile-modern', width: 390, height: 844 },
  { name: '768px-tablet', width: 768, height: 1024 },
  { name: '1024px-laptop', width: 1024, height: 768 },
  { name: '1440px-desktop', width: 1440, height: 900 },
  { name: '1920px-desktop-wide', width: 1920, height: 1080 },
]

console.log('Capturing responsive screenshots...')

for (const vp of viewports) {
  const destHeader = path.join(ARTIFACTS_DIR, `header-${vp.name}.png`)
  const cmd = `"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${destHeader}" "http://localhost:4173/"`
  try {
    execSync(cmd, { stdio: 'ignore' })
    console.log(`✓ Captured header ${vp.name} (${vp.width}x${vp.height})`)
  } catch (err) {
    console.error(`✗ Failed for ${vp.name}:`, err.message)
  }
}

// Also capture German language mode
const destDe = path.join(ARTIFACTS_DIR, `header-1440px-german.png`)
execSync(`"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,900 --screenshot="${destDe}" "http://localhost:4173/?lang=de"`, { stdio: 'ignore' })
console.log('✓ Captured 1440px German mode')

// Also capture footer on 1440px desktop
const destFooter = path.join(ARTIFACTS_DIR, `footer-1440px.png`)
// Wait a bit or scroll to bottom
execSync(`"${CHROME}" --headless=new --disable-gpu --window-size=1440,2400 --screenshot="${destFooter}" "http://localhost:4173/"`, { stdio: 'ignore' })
console.log('✓ Captured full page with footer')

console.log('Screenshot capture complete!')
