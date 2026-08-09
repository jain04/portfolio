/**
 * Shared scroll-reveal controller.
 *
 * Two deliberate choices:
 *  1. The hidden state only applies once `<html>` carries `reveal-armed`, which
 *     JS adds at startup. If the script never runs, every section renders
 *     fully visible — the animation can never swallow the content.
 *  2. Visibility is decided from getBoundingClientRect on a passive scroll
 *     listener rather than IntersectionObserver, and a timer sweeps once after
 *     mount, so a throttled or missing observer can't strand an element at
 *     opacity 0.
 */

const watched = new Set<HTMLElement>()
let listening = false

const MARGIN = 80

function show(el: HTMLElement) {
  el.classList.add('is-visible')
  watched.delete(el)
  if (watched.size === 0) stopListening()
}

function check() {
  if (watched.size === 0) return
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight

  for (const el of [...watched]) {
    const rect = el.getBoundingClientRect()
    const enteredFromBelow = rect.top <= viewportHeight - MARGIN
    const stillOnScreen = rect.bottom >= 0
    if (enteredFromBelow && stillOnScreen) show(el)
  }
}

function startListening() {
  if (listening) return
  listening = true
  window.addEventListener('scroll', check, { passive: true })
  window.addEventListener('resize', check, { passive: true })
}

function stopListening() {
  if (!listening) return
  listening = false
  window.removeEventListener('scroll', check)
  window.removeEventListener('resize', check)
}

export function arm() {
  document.documentElement.classList.add('reveal-armed')
}

export function watch(el: HTMLElement): () => void {
  watched.add(el)
  startListening()

  // Immediate pass for anything already on screen, plus one late sweep to cover
  // layout that settles after fonts/images land.
  check()
  const timer = window.setTimeout(check, 400)

  return () => {
    window.clearTimeout(timer)
    watched.delete(el)
    if (watched.size === 0) stopListening()
  }
}
