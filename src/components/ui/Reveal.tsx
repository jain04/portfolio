import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { watch } from '../../lib/reveal'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds, so callers read like the rest of the animation config. */
  delay?: number
  /** Render as a different element for correct document semantics. */
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * One-shot entrance on scroll: a 12px rise and a fade, nothing more.
 * The transition lives in CSS and the hidden state is opt-in (see lib/reveal),
 * so content is readable even if this never runs.
 */
export function Reveal({ children, className, delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    return watch(node)
  }, [])

  return (
    <Tag
      ref={ref as never}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${Math.round(delay * 1000)}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  )
}
