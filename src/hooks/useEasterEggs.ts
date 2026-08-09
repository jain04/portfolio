import { useEffect, useState } from 'react'

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
]

/**
 * Two hidden switches, both optional and neither load-bearing:
 *
 *  - the arrow sequence fires a one-shot glitch across the page
 *  - `g` toggles a persistent "dev mode" (scanlines + a system readout)
 *
 * Nothing here gates navigation or content, and both are inert under reduced
 * motion — an easter egg that shakes the screen at someone who asked for
 * stillness is just a bug with a nicer name.
 */
export function useEasterEggs() {
  const [devMode, setDevMode] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let progress = 0
    let toastTimer = 0
    let glitchTimer = 0

    const announce = (message: string) => {
      setToast(message)
      window.clearTimeout(toastTimer)
      toastTimer = window.setTimeout(() => setToast(null), 2600)
    }

    const onKey = (event: KeyboardEvent) => {
      // Never hijack a key the user is aiming at a control or a text field.
      const el = document.activeElement
      const typing =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el instanceof HTMLElement && el.isContentEditable)
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return

      progress = event.key === KONAMI[progress] ? progress + 1 : event.key === KONAMI[0] ? 1 : 0

      if (progress === KONAMI.length) {
        progress = 0
        setGlitch(true)
        announce('Sequence accepted')
        window.clearTimeout(glitchTimer)
        glitchTimer = window.setTimeout(() => setGlitch(false), 1100)
      }

      if (event.key === 'g' || event.key === 'G') {
        setDevMode((on) => {
          announce(on ? 'Dev mode off' : 'Dev mode on')
          return !on
        })
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(toastTimer)
      window.clearTimeout(glitchTimer)
    }
  }, [])

  useEffect(() => {
    document.documentElement.toggleAttribute('data-dev', devMode)
  }, [devMode])

  useEffect(() => {
    document.documentElement.toggleAttribute('data-glitch', glitch)
  }, [glitch])

  return { devMode, toast }
}
