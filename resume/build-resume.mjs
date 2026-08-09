/**
 * Renders resume/resume.html to public/Aditya-Jain-Resume.pdf using the local
 * headless Chrome, so the PDF is always an exact export of the HTML source.
 *
 *   npm run resume
 *
 * Edit resume/resume.html and re-run — nothing else needs to change.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const source = resolve(here, 'resume.html')
const output = resolve(root, 'public/Aditya-Jain-Resume.pdf')

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

const chrome = CHROME_CANDIDATES.find((path) => existsSync(path))

if (!chrome) {
  console.error(
    'Could not find Chrome. Install Google Chrome, or set CHROME_PATH to a Chromium binary.',
  )
  process.exit(1)
}

if (!existsSync(source)) {
  console.error(`Missing resume source: ${source}`)
  process.exit(1)
}

mkdirSync(dirname(output), { recursive: true })

// Chrome refuses to overwrite in some versions; start clean.
rmSync(output, { force: true })

execFileSync(
  chrome,
  [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--no-sandbox',
    `--print-to-pdf=${output}`,
    `file://${source}`,
  ],
  { stdio: 'ignore' },
)

if (!existsSync(output)) {
  console.error('Chrome ran but produced no PDF.')
  process.exit(1)
}

console.log(`Resume exported → ${output.replace(`${root}/`, '')}`)
