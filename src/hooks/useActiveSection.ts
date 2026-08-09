import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in the reading position.
 *
 * A passive scroll listener reading offsets, rather than an
 * IntersectionObserver: the nav has to stay correct after programmatic jumps
 * and hash navigation, where observer callbacks can lag or be throttled.
 */
export function useActiveSection(ids: string[]): string {
  // Starts empty so the hero doesn't falsely light up the first nav item.
  const [active, setActive] = useState('')

  useEffect(() => {
    const update = () => {
      // The reading line sits just below the sticky nav.
      const line = window.scrollY + 140
      let current = ''

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.offsetTop
        if (line >= top && line < top + el.offsetHeight) {
          current = id
          break
        }
      }

      // Pin the last section once the page is scrolled to the very bottom,
      // where short sections can never reach the reading line.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = ids[ids.length - 1] ?? current

      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return active
}
