import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'
import { profile, RESUME_URL } from '../../data/profile'

const links = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
]

const sectionIds = links.map((l) => l.id)

export function Nav() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const scrolled = useScrolled()
  const reduced = useReducedMotion()

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || open
          ? 'border-b border-line bg-bg/80 backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-mono text-[0.8125rem] font-medium tracking-[0.22em] text-fg uppercase"
        >
          {profile.shortName}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = active === link.id
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative inline-flex h-9 items-center rounded-lg px-3 text-[0.8125rem] transition-colors duration-200',
                    isActive ? 'text-fg' : 'text-muted hover:text-fg',
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-surface-2 ring-1 ring-line"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 38 }
                      }
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={RESUME_URL}
            download=""
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3.5 text-[0.8125rem] font-medium text-fg transition-colors duration-200 hover:border-faint hover:bg-surface-2 sm:inline-flex"
          >
            Resume
            <ArrowUpRight className="size-3.5 text-faint transition-colors group-hover:text-fg" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex size-9 items-center justify-center rounded-lg border border-line-strong bg-surface text-fg md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg md:hidden"
          >
            <ul className="shell flex flex-col py-3">
              {links.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-2 py-3 text-[0.9375rem] transition-colors',
                      active === link.id ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                  >
                    {link.label}
                    <span className="font-mono text-[0.625rem] text-faint">
                      {String(links.indexOf(link) + 1).padStart(2, '0')}
                    </span>
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-line pt-3">
                <a
                  href={RESUME_URL}
                  download=""
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-2 py-3 text-[0.9375rem] text-fg"
                >
                  Resume
                  <ArrowUpRight className="size-4 text-faint" />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
