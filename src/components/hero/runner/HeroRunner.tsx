import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { RunnerEngine } from './engine'
import type { Palette } from './sprites'

/** Pixel art needs whole-number scaling or it shimmers. */
const scaleFor = (cssWidth: number) => (cssWidth < 640 ? 2 : 3)

function readPalette(): Palette {
  const s = getComputedStyle(document.documentElement)
  return {
    body: s.getPropertyValue('--color-fg').trim() || '#f4f4f5',
    accent: s.getPropertyValue('--color-accent').trim() || '#5b8cff',
    dim: s.getPropertyValue('--color-line-strong').trim() || '#2f2f35',
  }
}

/**
 * The hero runner: a small original character that runs along the base of the
 * hero and jumps on space, arrow-up, click or tap.
 *
 * Three things it deliberately does *not* do:
 *  - It never captures Space globally. Space is how keyboard users scroll, and
 *    stealing it site-wide to play a game would be indefensible. The canvas is
 *    a focusable control; once focused, Space and ArrowUp are its own.
 *  - It never ends. Clipping an obstacle costs a streak, not a game over — a
 *    "GAME OVER" sitting under the headline would be worse than no game.
 *  - It never runs unseen. The loop stops when scrolled away or the tab hides.
 */
export function HeroRunner() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const distRef = useRef<HTMLSpanElement>(null)
  const streakRef = useRef<HTMLSpanElement>(null)
  const engineRef = useRef<RunnerEngine | null>(null)
  const pokesRef = useRef(0)

  const reduced = useReducedMotion()
  const [poked, setPoked] = useState(false)
  const [engaged, setEngaged] = useState(false)

  const jump = useCallback(() => {
    if (engineRef.current?.jump()) setEngaged(true)
  }, [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let palette = readPalette()
    let engine = new RunnerEngine(scaleFor(wrap.clientWidth), palette)
    engineRef.current = engine

    let frame = 0
    let last = 0
    let hudAt = 0
    let running = false

    const size = () => {
      const cssW = wrap.clientWidth
      const cssH = wrap.clientHeight
      if (!cssW || !cssH) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      palette = readPalette()
      engine.resize(cssW, cssH, scaleFor(cssW), palette)
    }

    size()

    // Reduced motion: one composed frame, no loop, no input. The character is
    // still there, it simply is not moving.
    if (reduced) {
      engine.drawStatic(ctx, palette)
      const ro = new ResizeObserver(() => {
        size()
        engine.drawStatic(ctx, palette)
      })
      ro.observe(wrap)
      return () => ro.disconnect()
    }

    const onScreen = () => {
      const r = wrap.getBoundingClientRect()
      return r.bottom > 0 && r.top < window.innerHeight
    }

    const tick = (now: number) => {
      const dt = last ? (now - last) / 1000 : 0
      last = now
      engine.update(dt)
      engine.draw(ctx, palette)

      if (now - hudAt > 120) {
        hudAt = now
        if (distRef.current) {
          distRef.current.textContent = String(Math.floor(engine.stats.distance / 10)).padStart(
            4,
            '0',
          )
        }
        if (streakRef.current) {
          streakRef.current.textContent = String(engine.stats.cleared).padStart(2, '0')
        }
      }

      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (running || document.hidden || !onScreen()) return
      running = true
      last = 0
      frame = requestAnimationFrame(tick)
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(frame)
    }

    const sync = () => (document.hidden || !onScreen() ? stop() : start())

    // ResizeObserver does not fire in a hidden tab, so a window resize that
    // happens while the tab is in the background leaves the canvas at its old
    // size. Re-measure on the way back in, before resuming the loop.
    const onVisibility = () => {
      if (!document.hidden) size()
      sync()
    }

    start()

    window.addEventListener('scroll', sync, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    const ro = new ResizeObserver(() => {
      size()
      sync()
    })
    ro.observe(wrap)

    return () => {
      stop()
      window.removeEventListener('scroll', sync)
      document.removeEventListener('visibilitychange', onVisibility)
      ro.disconnect()
      engineRef.current = null
    }
  }, [reduced])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return
    const engine = engineRef.current
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Poking the character repeatedly makes it react — easter egg #1.
    if (engine?.hitsCharacter(x, y)) {
      pokesRef.current += 1
      if (pokesRef.current >= 4) {
        pokesRef.current = 0
        engine.celebrate()
        setPoked(true)
        window.setTimeout(() => setPoked(false), 2200)
        return
      }
    }

    jump()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (reduced) return
    if (event.key === ' ' || event.key === 'ArrowUp' || event.key === 'Spacebar') {
      // Safe to prevent: this only fires while the runner itself holds focus.
      event.preventDefault()
      jump()
    }
  }

  return (
    <div className="relative w-full select-none">
      <div className="shell flex items-end justify-between gap-4 pb-2">
        <p className="font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
          {poked ? (
            <span className="text-accent">ok, ok — still running</span>
          ) : reduced ? (
            'runner · paused for reduced motion'
          ) : engaged ? (
            <>
              dist <span ref={distRef} className="text-muted tabular-nums">0000</span>
              <span className="mx-2 text-line-strong">·</span>
              streak <span ref={streakRef} className="text-muted tabular-nums">00</span>
            </>
          ) : (
            'tap or press space to jump'
          )}
        </p>

        <p aria-hidden className="hidden font-mono text-[0.625rem] text-faint sm:block">
          {reduced ? 'static' : 'bugs ahead'}
        </p>
      </div>

      <div
        ref={wrapRef}
        role={reduced ? undefined : 'button'}
        tabIndex={reduced ? undefined : 0}
        aria-label={
          reduced
            ? undefined
            : 'Decorative mini-game. Press space or arrow up to make the character jump.'
        }
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        data-cursor={reduced ? undefined : 'jump'}
        className="relative h-[96px] w-full overflow-hidden outline-none sm:h-[132px]"
      >
        <canvas ref={canvasRef} className="block h-full w-full" />
      </div>
    </div>
  )
}
