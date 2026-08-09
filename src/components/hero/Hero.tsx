import type { CSSProperties } from 'react'
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { SystemDiagram } from './SystemDiagram'
import { LINKEDIN_URL, profile, RESUME_URL } from '../../data/profile'

/** Staggered hero entrance, expressed as a CSS animation delay. */
const rise = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-44 lg:pb-28">
      <div aria-hidden className="grid-veil pointer-events-none absolute inset-0 -z-10" />

      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
          <div>
            <div className="rise flex items-center gap-2.5" style={rise(0)}>
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-muted uppercase">
                Software Engineer @ {profile.company}
              </span>
            </div>

            <h1
              className="rise mt-6 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.04em] sm:text-[3.25rem] lg:text-[3.75rem]"
              style={rise(80)}
            >
              I build software that solves{' '}
              <span className="text-accent">real business problems.</span>
            </h1>

            <p
              className="rise mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
              style={rise(140)}
            >
              {profile.subhead}
            </p>

            <ul
              className="rise mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2"
              style={rise(200)}
              aria-label="Core technologies"
            >
              {profile.coreStack.map((tech, i) => (
                <li key={tech} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden className="text-line-strong">·</span>}
                  <span className="font-mono text-[0.75rem] text-muted">{tech}</span>
                </li>
              ))}
            </ul>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={rise(260)}>
              <ButtonLink href="#work" variant="primary" icon={<ArrowDown className="size-4" />}>
                View My Work
              </ButtonLink>
              <ButtonLink
                href={RESUME_URL}
                download
                icon={<Download className="size-4 text-faint" />}
              >
                Download Resume
              </ButtonLink>
              <ButtonLink
                href={LINKEDIN_URL}
                external
                variant="ghost"
                icon={<ArrowUpRight className="size-4" />}
              >
                LinkedIn
              </ButtonLink>
            </div>
          </div>

          <div className="rise lg:w-full lg:justify-self-end" style={rise(180)}>
            <SystemDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}
