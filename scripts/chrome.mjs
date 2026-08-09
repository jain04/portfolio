import { existsSync } from 'node:fs'

const CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)

/**
 * Locates a local Chromium build. Both the resume PDF and the Open Graph image
 * are rendered by Chrome, so the lookup lives in one place.
 * Exits with a usable message rather than throwing a stack trace.
 */
export function findChrome() {
  const chrome = CANDIDATES.find((path) => existsSync(path))

  if (!chrome) {
    console.error(
      'Could not find Chrome. Install Google Chrome, or set CHROME_PATH to a Chromium binary.',
    )
    process.exit(1)
  }

  return chrome
}
