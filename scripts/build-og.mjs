/**
 * Renders scripts/og.html to public/og.png at 1200x630.
 *
 *   npm run og
 *
 * The card has to be a raster image: LinkedIn, Slack and X all ignore SVG in
 * og:image, which is the one place this asset is ever seen.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { findChrome } from './chrome.mjs'

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, '..')

const source = resolve(here, 'og.html')
const output = resolve(root, 'public/og.png')

const chrome = findChrome()

if (!existsSync(source)) {
  console.error(`Missing Open Graph source: ${source}`)
  process.exit(1)
}

mkdirSync(dirname(output), { recursive: true })
rmSync(output, { force: true })

execFileSync(
  chrome,
  [
    '--headless',
    '--disable-gpu',
    '--no-sandbox',
    '--hide-scrollbars',
    '--default-background-color=00000000',
    '--window-size=1200,630',
    `--screenshot=${output}`,
    `file://${source}`,
  ],
  { stdio: 'ignore' },
)

if (!existsSync(output)) {
  console.error('Chrome ran but produced no image.')
  process.exit(1)
}

console.log(`Open Graph card exported → ${output.replace(`${root}/`, '')}`)
