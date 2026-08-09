import { cn } from '../../lib/cn'
import { Reveal } from '../ui/Reveal'

type FlowDiagramProps = {
  title?: string
  nodes: string[]
  footer?: string
  /** Emphasise the first and last node as system boundaries. */
  boundaries?: boolean
  className?: string
}

/**
 * Vertical, responsive pipeline. Nodes reveal in sequence on first view and the
 * connectors carry a slow dashed flow — enough to read as "data moving through",
 * not enough to distract. Fully static under prefers-reduced-motion.
 */
export function FlowDiagram({
  title,
  nodes,
  footer,
  boundaries = true,
  className,
}: FlowDiagramProps) {
  const last = nodes.length - 1

  return (
    <figure className={cn('rounded-2xl border border-line bg-surface/60 p-5 sm:p-6', className)}>
      {title && (
        <figcaption className="mb-5 flex items-center justify-between gap-3">
          <span className="eyebrow">{title}</span>
          <span className="font-mono text-[0.625rem] whitespace-nowrap text-faint">
            {nodes.length} stages
          </span>
        </figcaption>
      )}

      <ol className="flex flex-col">
        {nodes.map((node, index) => {
          const isEdge = boundaries && (index === 0 || index === last)
          return (
            <li key={`${node}-${index}`}>
              <Reveal
                delay={index * 0.06}
                className={cn(
                  'flex items-center gap-3 rounded-xl border px-4 py-3',
                  isEdge ? 'border-accent/25 bg-accent/[0.07]' : 'border-line-strong bg-surface-2',
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'font-mono text-[0.625rem] tabular-nums',
                    isEdge ? 'text-accent' : 'text-faint',
                  )}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[0.875rem] leading-snug font-medium tracking-tight text-fg">
                  {node}
                </span>
              </Reveal>

              {index < last && (
                <div aria-hidden className="flex h-5 items-center pl-[1.35rem]">
                  <svg width="2" height="20" viewBox="0 0 2 20" className="overflow-visible">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="20"
                      stroke="var(--color-line-strong)"
                      strokeWidth="1.5"
                      className="flow-line"
                    />
                  </svg>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      {footer && (
        <p className="mt-5 border-t border-line pt-4 font-mono text-[0.6875rem] leading-relaxed text-faint">
          {footer}
        </p>
      )}
    </figure>
  )
}
