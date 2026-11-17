import { execSync } from 'child_process'
import path from 'path'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const ARTIFACTS_DIR = 'C:\\Users\\KANIMOZHI\\.gemini\\antigravity\\brain\\8d9fc877-b045-4f8c-8bed-6d8a06a4d2b2\\screenshots'

console.log('Capturing About page screenshots...')

const destEn = path.join(ARTIFACTS_DIR, 'about-1440px-en.png')
const destDe = path.join(ARTIFACTS_DIR, 'about-1440px-de.png')
const destMobile = path.join(ARTIFACTS_DIR, 'about-390px-mobile.png')

execSync(`"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1100 --screenshot="${destEn}" "http://localhost:4173/about"`, { stdio: 'ignore' })
console.log('✓ Captured About English Desktop')

execSync(`"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,1100 --screenshot="${destDe}" "http://localhost:4173/about?lang=de"`, { stdio: 'ignore' })
console.log('✓ Captured About German Desktop')

execSync(`"${CHROME}" --headless=new --disable-gpu --hide-scrollbars --window-size=390,1200 --screenshot="${destMobile}" "http://localhost:4173/about"`, { stdio: 'ignore' })
console.log('✓ Captured About Mobile 390px')

console.log('Done.')
