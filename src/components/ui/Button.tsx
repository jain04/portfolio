import type { MouseEvent, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md'

const base =
  'group inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-fg text-[#08080a] hover:bg-white',
  secondary:
    'border border-line-strong bg-surface text-fg hover:border-faint hover:bg-surface-2',
  ghost: 'text-muted hover:text-fg',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
}

type BaseProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
}

type AnchorProps = BaseProps & {
  href: string
  external?: boolean
  download?: boolean
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function ButtonLink({
  children,
  variant = 'secondary',
  size = 'md',
  className,
  icon,
  href,
  external,
  download,
  onClick,
}: AnchorProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(download ? { download: '' } : {})}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {children}
      {icon}
    </a>
  )
}
