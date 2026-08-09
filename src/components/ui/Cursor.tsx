import { useEffect, useRef, useState } from 'react'

/**
 * A contextual hint that trails the pointer over interactive elements.
 *
 * An earlier version hid the native cursor and replaced it with a dot. That is
 * the part of the pattern that costs usability — a lagging dot is worse than an
 * arrow at pointing, and it makes text selection and affordances feel wrong. So
 * the native cursor stays exactly where it is, and this only adds a label on the
 * handful of elements that opt in. Nothing here is the only signal for anything.
 *
 * Elements opt in with `data-cursor="view"`; the value becomes the label.
 */
const LABELS: Record<string, string> = {
  view: 'View',
  open: 'Open ↗',
  explore: 'Explore',
  jump: 'Jump',
  download: 'Save',
}

export function Cursor() {
  const chipRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || calm.matches) return

    let x = 0
    let y = 0
    let raf = 0
    let queued = false

    const paint = () => {
      queued = false
      if (chipRef.current) {
        // Offset down-right so the chip sits beside the arrow, never under it.
        chipRef.current.style.transform = `translate3d(${x + 18}px, ${y + 18}px, 0)`
      }
    }

    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY

      const target = (event.target as Element | null)?.closest?.('[data-cursor]')
      const key = target?.getAttribute('data-cursor') ?? null
      setLabel(key ? (LABELS[key] ?? key) : null)

      if (!queued) {
        queued = true
        raf = requestAnimationFrame(paint)
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  if (!label) return null

  return (
    <div
      ref={chipRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
    >
      <span className="flex items-center rounded-full border border-accent/40 bg-accent/15 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.16em] text-accent uppercase backdrop-blur-sm">
        {label}
      </span>
    </div>
  )
}
