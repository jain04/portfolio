import { cn } from '../../lib/cn'

type TagProps = {
  children: string
  variant?: 'default' | 'accent' | 'ghost'
  className?: string
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-tight whitespace-nowrap',
        variant === 'default' && 'border-line bg-surface-2 text-muted',
        variant === 'accent' && 'border-accent/30 bg-accent/10 text-accent',
        variant === 'ghost' && 'border-transparent bg-transparent text-faint',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function TagRow({
  items,
  variant,
  limit,
  className,
}: {
  items: readonly string[]
  variant?: TagProps['variant']
  limit?: number
  className?: string
}) {
  const shown = limit ? items.slice(0, limit) : items
  const rest = limit ? items.length - shown.length : 0

  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {shown.map((item) => (
        <Tag key={item} variant={variant}>
          {item}
        </Tag>
      ))}
      {rest > 0 && <Tag variant="ghost">{`+${rest}`}</Tag>}
    </div>
  )
}
