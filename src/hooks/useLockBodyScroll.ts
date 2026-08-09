import { useEffect } from 'react'

/** Locks page scroll while an overlay (case study / mobile menu) is open. */
export function useLockBodyScroll(locked: boolean): void {
  useEffect(() => {
    if (!locked) return

    const { overflow, paddingRight } = document.body.style
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}
