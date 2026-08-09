import { useEffect, useRef } from 'react'

/**
 * Reading progress along the top edge. Written straight to a transform on a
 * passive scroll listener — no state, so it never triggers a React render while
 * the user is scrolling.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-transparent">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-accent/70" />
    </div>
  )
}
