import { useId, useState } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'
import type { PipelineStage } from '../../data/projects'

type PipelineDiagramProps = {
  title?: string
  stages: PipelineStage[]
  footer?: string
  className?: string
}

/**
 * An ordered process, drawn as one continuous rail rather than a stack of boxes
 * — the point being that this is a single flow, not N components.
 *
 * One list, two layouts, chosen by container width: a vertical rail in the
 * narrow project card, and a horizontal track once there is room (the case
 * study). Rendering both and hiding one would duplicate every control for
 * screen readers, so the markup stays single and CSS does the work.
 *
 * The travelling accent is a gradient segment on the rail itself, which is a
 * transform on one element — a literal moving dot would animate `left` and
 * force layout on every frame.
 */
export function PipelineDiagram({ title, stages, footer, className }: PipelineDiagramProps) {
  const [active, setActive] = useState<PipelineStage | null>(null)
  const detailId = useId()

  return (
    <figure
      className={cn(
        '@container rounded-2xl border border-line bg-surface/60 p-5 sm:p-6',
        className,
      )}
      onMouseLeave={() => setActive(null)}
    >
      {title && (
        <figcaption className="mb-5 flex items-center justify-between gap-3">
          <span className="eyebrow">{title}</span>
          <span className="font-mono text-[0.625rem] whitespace-nowrap text-faint">
            {stages.length} stages
          </span>
        </figcaption>
      )}

      <ol className="relative flex flex-col @xl:flex-row @xl:items-start @xl:pt-6">
        {/* Vertical rail — inset so it starts and ends on the first and last dot. */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[3.5px] w-px bg-line-strong @xl:hidden"
        />
        <span
          aria-hidden
          className="rail-pulse absolute top-2 bottom-2 left-[3.5px] w-px @xl:hidden"
        />

        {/* Horizontal rail, inset by half a stage so it spans dot to dot. */}
        <span
          aria-hidden
          className="absolute top-[calc(1.5rem+3.5px)] right-0 left-0 hidden h-px bg-line-strong @xl:block"
        />
        <span
          aria-hidden
          className="track-pulse absolute top-[calc(1.5rem+3.5px)] right-0 left-0 hidden h-px overflow-hidden @xl:block"
        />

        {stages.map((stage, index) => {
          const isActive = active?.key === stage.key
          return (
            <li
              key={stage.key}
              className={cn(
                'relative flex gap-4',
                index > 0 && 'mt-5 @xl:mt-0',
                '@xl:min-w-0 @xl:flex-1 @xl:flex-col @xl:items-center @xl:gap-2',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'relative z-10 mt-[7px] size-2 shrink-0 rounded-full ring-4 ring-surface transition-transform duration-200 @xl:mt-0',
                  isActive ? 'scale-150 bg-fg' : 'bg-accent',
                )}
              />

              <Reveal delay={index * 0.06} className="min-w-0 flex-1 @xl:w-full @xl:flex-none">
                <button
                  type="button"
                  aria-describedby={isActive ? detailId : undefined}
                  onMouseEnter={() => setActive(stage)}
                  onFocus={() => setActive(stage)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(isActive ? null : stage)}
                  data-cursor="explore"
                  className={cn(
                    'block w-full text-left transition-opacity duration-200 @xl:text-center',
                    active && !isActive && 'opacity-45',
                  )}
                >
                  <span
                    className={cn(
                      'font-mono text-[0.625rem] tracking-[0.16em] transition-colors',
                      isActive ? 'text-fg' : 'text-accent',
                    )}
                  >
                    {stage.key}
                  </span>
                  {/* Kept for screen readers in track layout, where a full
                      sentence per stage will not fit in ~90px. */}
                  <span className="mt-1 block text-[0.875rem] leading-snug font-medium tracking-tight text-fg @xl:sr-only">
                    {stage.label}
                  </span>
                </button>
              </Reveal>
            </li>
          )
        })}
      </ol>

      <p
        id={detailId}
        aria-live="polite"
        className="mt-6 flex min-h-[3.25rem] items-start border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-muted"
      >
        {active ? (
          <span>
            <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-accent">
              {active.key}
            </span>{' '}
            — {active.detail}
          </span>
        ) : (
          <span className="font-mono text-[0.6875rem] text-faint">
            Hover a stage to inspect it.
          </span>
        )}
      </p>

      {footer && (
        <p className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-faint">{footer}</p>
      )}
    </figure>
  )
}
