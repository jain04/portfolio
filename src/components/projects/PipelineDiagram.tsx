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
 * An ordered process, drawn as a single continuous rail rather than a stack of
 * separate boxes — the point being that this is one flow, not six components.
 * A slow accent pulse travels the rail so it reads as data moving through.
 * Under prefers-reduced-motion the pulse is removed and the rail stays static.
 */
export function PipelineDiagram({ title, stages, footer, className }: PipelineDiagramProps) {
  return (
    <figure className={cn('rounded-2xl border border-line bg-surface/60 p-5 sm:p-6', className)}>
      {title && (
        <figcaption className="mb-5 flex items-center justify-between gap-3">
          <span className="eyebrow">{title}</span>
          <span className="font-mono text-[0.625rem] whitespace-nowrap text-faint">
            {stages.length} stages
          </span>
        </figcaption>
      )}

      <ol className="relative">
        {/* The rail sits behind the nodes, inset so it starts and ends on the
            first and last dot instead of floating past them. */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[3.5px] w-px bg-line-strong"
        />
        <span
          aria-hidden
          className="rail-pulse absolute top-2 bottom-2 left-[3.5px] w-px overflow-hidden"
        />

        {stages.map((stage, index) => (
          <li key={stage.key} className={cn('relative flex gap-4', index > 0 && 'mt-5')}>
            <span
              aria-hidden
              className="relative z-10 mt-[7px] size-2 shrink-0 rounded-full bg-accent ring-4 ring-surface"
            />

            <Reveal delay={index * 0.07} className="min-w-0 flex-1">
              <span className="font-mono text-[0.625rem] tracking-[0.16em] text-accent">
                {stage.key}
              </span>
              <p className="mt-1 text-[0.875rem] leading-snug font-medium tracking-tight text-fg">
                {stage.label}
              </p>
            </Reveal>
          </li>
        ))}
      </ol>

      {footer && (
        <p className="mt-6 border-t border-line pt-4 font-mono text-[0.6875rem] leading-relaxed text-faint">
          {footer}
        </p>
      )}
    </figure>
  )
}
