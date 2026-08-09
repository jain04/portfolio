import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from './Reveal'

type SectionProps = {
  id: string
  children: ReactNode
  className?: string
  /** Adds the hairline that separates every major band of the page. */
  divided?: boolean
}

export function Section({ id, children, className, divided = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 py-20 sm:py-24 lg:py-32',
        divided && 'border-t border-line',
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted sm:text-[1.0625rem]">
          {description}
        </p>
      )}
    </Reveal>
  )
}
