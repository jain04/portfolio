import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Project } from '../../data/projects'
import { ProjectDiagram } from './ProjectDiagram'
import { TagRow } from '../ui/Tag'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

type CaseStudyProps = {
  project: Project | null
  onClose: () => void
}

/**
 * Full-screen case study. Keeps the homepage short while giving each featured
 * system the room it needs. Focus is trapped to the panel and Escape closes it.
 */
export function CaseStudy({ project, onClose }: CaseStudyProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const open = project !== null

  useLockBodyScroll(open)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return

      const first = focusables[0]
      const lastEl = focusables[focusables.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        lastEl.focus()
      } else if (!event.shiftKey && document.activeElement === lastEl) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex justify-center overflow-y-auto overscroll-contain bg-bg/85 p-0 backdrop-blur-md sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            ref={panelRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="my-0 h-fit w-full max-w-3xl rounded-none border border-line bg-surface outline-none sm:my-auto sm:rounded-2xl"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl border-b border-line bg-surface/95 px-5 py-4 backdrop-blur-xl sm:px-8 sm:py-5">
              <div className="min-w-0">
                <p className="eyebrow">Case study</p>
                <h2
                  id="case-study-title"
                  className="mt-1.5 text-xl font-semibold tracking-[-0.02em] sm:text-2xl"
                >
                  {project.name}
                </h2>
                <p className="mt-1 text-[0.8125rem] text-muted">{project.tagline}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-line-strong bg-surface-2 text-muted transition-colors hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="space-y-10 px-5 py-8 sm:px-8 sm:py-10">
              {project.caseStudy?.overview && (
                <p className="text-[0.9375rem] leading-relaxed text-muted sm:text-base">
                  {project.caseStudy.overview}
                </p>
              )}

              <ProjectDiagram project={project} />

              {project.caseStudy?.sections.map((section) => (
                <div key={section.heading}>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-sm font-semibold tracking-tight text-fg">
                      {section.heading}
                    </h3>
                    {section.badge && (
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.5625rem] tracking-[0.16em] text-accent uppercase">
                        {section.badge}
                      </span>
                    )}
                  </div>
                  {section.body && (
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                      {section.body}
                    </p>
                  )}
                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5">
                      {section.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-accent"
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {project.caseStudy?.challenges && (
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-fg">
                    Engineering challenges
                  </h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {project.caseStudy.challenges.map((challenge) => (
                      <li
                        key={challenge}
                        className="rounded-xl border border-line bg-surface-2/60 px-4 py-3 text-[0.8125rem] leading-snug text-muted"
                      >
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.areas && (
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-fg">
                    Engineering areas
                  </h3>
                  {/* The full set. The card only had room for a slice. */}
                  <TagRow items={project.areas} className="mt-4" />
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold tracking-tight text-fg">Technology</h3>
                <TagRow items={project.tags} className="mt-4" />
              </div>

              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t border-line pt-6">
                  {project.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-sm text-accent underline-offset-4 hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
