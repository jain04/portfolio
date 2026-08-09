import type { CSSProperties } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Download } from 'lucide-react'
import { ButtonLink } from '../ui/Button'
import { SystemLabel } from '../ui/SystemLabel'
import { SystemDiagram } from './SystemDiagram'
import { HeroRunner } from './runner/HeroRunner'
import { LINKEDIN_URL, profile, RESUME_URL } from '../../data/profile'

/** Staggered hero entrance, expressed as a CSS animation delay. */
const rise = (ms: number) => ({ '--rise-delay': `${ms}ms` }) as CSSProperties

/**
 * Two icons stacked in one slot: the resting one leaves as the hover one
 * arrives. Cheap, and it gives every primary action a bit of character.
 */
function SwapIcon({ from, to }: { from: React.ReactNode; to: React.ReactNode }) {
  return (
    <span aria-hidden className="relative inline-flex size-4 items-center justify-center">
      <span className="absolute inline-flex transition-all duration-200 group-hover:-translate-y-2 group-hover:opacity-0">
        {from}
      </span>
      <span className="absolute inline-flex translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        {to}
      </span>
    </span>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-0 sm:pt-40 lg:pt-44">
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
              <ButtonLink
                href="#work"
                variant="primary"
                icon={
                  <SwapIcon
                    from={<ArrowDown className="size-4" />}
                    to={<ArrowRight className="size-4" />}
                  />
                }
              >
                View My Work
              </ButtonLink>

              <ButtonLink
                href={RESUME_URL}
                download
                icon={
                  <SwapIcon
                    from={<Download className="size-4 text-faint" />}
                    to={<ArrowDown className="size-4 text-accent" />}
                  />
                }
              >
                Download Resume
                <span className="ml-1 font-mono text-[0.625rem] text-faint transition-colors group-hover:text-accent">
                  .pdf
                </span>
              </ButtonLink>

              <ButtonLink
                href={LINKEDIN_URL}
                external
                variant="ghost"
                icon={<ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
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

      {/* Status strip: a little personality, stated as machine readout. */}
      <div className="rise mt-16 border-t border-line/70 py-5 sm:mt-20" style={rise(340)}>
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          <SystemLabel label="System.status" value="Online" live />
          <SystemLabel label="Currently building" value="SaaS + Automation" />
          <SystemLabel label="Based in" value="India" />
          <SystemLabel
            label="Interested in"
            value="Systems / AI / Automation"
            className="col-span-2 sm:col-span-1"
          />
        </div>
      </div>

      <div className="rise" style={rise(400)}>
        <HeroRunner />
      </div>
    </section>
  )
}
