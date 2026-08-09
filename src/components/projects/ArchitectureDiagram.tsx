import { useId, useState } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import type { ArchitectureTier, DiagramNode } from '../../data/projects'

type ArchitectureDiagramProps = {
  title?: string
  tiers: ArchitectureTier[]
  footer?: string
  className?: string
}

const tones: Record<NonNullable<ArchitectureTier['tone']>, string> = {
  edge: 'border-accent/25 bg-accent/[0.07] text-fg',
  core: 'border-line-strong bg-surface-2 text-fg',
  data: 'border-line bg-surface-2/50 text-muted',
}

/**
 * A layered system, drawn as stacked tiers. Items inside a tier sit side by side
 * because they are peers — three portals, two data services — which is the whole
 * point: a platform is not a sequence of steps, and drawing it as one would
 * misrepresent it.
 *
 * Every component is a real button: hovering explains it, and so does tabbing to
 * it. The explanation area is always in the layout, so revealing one never
 * shifts the diagram.
 */
export function ArchitectureDiagram({
  title,
  tiers,
  footer,
  className,
}: ArchitectureDiagramProps) {
  const [active, setActive] = useState<DiagramNode | null>(null)
  const last = tiers.length - 1
  const detailId = useId()

  return (
    <figure
      className={cn(
        // A container, not a viewport, decides the layout below: this figure is
        // full-width on phones but a narrow side column at lg, so viewport
        // breakpoints get it wrong in one case or the other.
        '@container rounded-2xl border border-line bg-surface/60 p-5 sm:p-6',
        className,
      )}
      onMouseLeave={() => setActive(null)}
    >
      {title && (
        <figcaption className="mb-5 flex items-center justify-between gap-3">
          <span className="eyebrow">{title}</span>
          <span className="font-mono text-[0.625rem] whitespace-nowrap text-faint">
            {tiers.length} tiers
          </span>
        </figcaption>
      )}

      <div className="flex flex-col">
        {tiers.map((tier, index) => (
          <div key={tier.label}>
            {/* The tier label sits above its row rather than beside it: a side
                column costs ~80px, which is the difference between three chips
                fitting and "Notifications" being clipped. */}
            <Reveal delay={index * 0.07} className="flex flex-col gap-2">
              <span className="font-mono text-[0.625rem] tracking-[0.1em] text-faint uppercase">
                {tier.label}
              </span>

              {/* Peers share one row once the figure is wide enough for them;
                  below that they fall to two per row instead of being cut off. */}
              <div className="grid grid-cols-2 gap-1.5 @xs:auto-cols-fr @xs:grid-flow-col @xs:grid-cols-none">
                {tier.items.map((item) => {
                  const isActive = active?.label === item.label
                  return (
                    <button
                      key={item.label}
                      type="button"
                      aria-describedby={isActive ? detailId : undefined}
                      onMouseEnter={() => setActive(item)}
                      onFocus={() => setActive(item)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : item)}
                      data-cursor="explore"
                      className={cn(
                        // No truncation: a chip that wraps to two lines still
                        // reads, a chip cut off mid-word looks broken.
                        'min-w-0 rounded-lg border px-2.5 py-2.5 text-center text-[0.8125rem] leading-tight font-medium tracking-tight text-balance transition-all duration-200',
                        tones[tier.tone ?? 'core'],
                        isActive
                          ? 'border-accent bg-accent/15 text-fg'
                          : 'hover:border-line-strong',
                        active && !isActive && 'opacity-45',
                      )}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>
            </Reveal>

            {index < last && (
              <div aria-hidden className="flex h-5 items-center">
                {/* One connector for the whole tier: the layer below serves
                    every item above it, not one each. */}
                <svg
                  width="100%"
                  height="20"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  className="overflow-visible"
                >
                  <line
                    x1="50"
                    y1="0"
                    x2="50"
                    y2="20"
                    stroke="var(--color-line-strong)"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="flow-line"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Fixed height so revealing a description never reflows the diagram. */}
      <p
        id={detailId}
        aria-live="polite"
        className="mt-5 flex min-h-[3.25rem] items-start border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-muted"
      >
        {active?.detail ?? (
          <span className="font-mono text-[0.6875rem] text-faint">
            Hover a component to inspect it.
          </span>
        )}
      </p>

      {footer && (
        <p className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-faint">{footer}</p>
      )}
    </figure>
  )
}
