import { cn } from '../../lib/cn'

type SystemLabelProps = {
  label: string
  value: string
  /** Draws the value in the accent colour with a live dot. */
  live?: boolean
  className?: string
}

/**
 * A key/value readout in the system-console idiom. Used sparingly — a handful
 * of these give the page a machine-room voice; wall-to-wall they would turn a
 * portfolio into a fake terminal.
 */
export function SystemLabel({ label, value, live, className }: SystemLabelProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span className="font-mono text-[0.5625rem] tracking-[0.2em] text-faint uppercase">
        {label}
      </span>
      <span
        className={cn(
          'flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.08em] uppercase',
          live ? 'text-accent' : 'text-muted',
        )}
      >
        {live && (
          <span aria-hidden className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
          </span>
        )}
        {value}
      </span>
    </div>
  )
}
