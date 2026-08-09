import { GraduationCap } from 'lucide-react'
import { cn } from '../../lib/cn'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { TagRow } from '../ui/Tag'
import { education, experience } from '../../data/experience'

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="Production software, in production conditions."
        description="From building business dashboards against real organizational requirements to engineering a production multi-tenant SaaS platform."
      />

      <div className="mt-12 space-y-4 lg:mt-14">
        {experience.map((role, index) => (
          <Reveal as="article" key={role.company} delay={index * 0.05}>
            <div className="grid gap-6 rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:gap-12 lg:p-10">
              <div>
                <div className="flex items-center gap-2">
                  {role.current && (
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  )}
                  <span
                    className={cn(
                      'font-mono text-[0.6875rem] tracking-[0.14em] uppercase',
                      role.current ? 'text-accent' : 'text-faint',
                    )}
                  >
                    {role.period}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{role.role}</h3>
                <p className="mt-1 text-[0.9375rem] text-muted">
                  {role.company}
                  {role.location && (
                    <span className="text-faint"> · {role.location}</span>
                  )}
                </p>
                <p className="mt-4 font-mono text-[0.6875rem] leading-relaxed text-faint">
                  {role.context}
                </p>
              </div>

              <div>
                <p className="text-[0.9375rem] leading-relaxed text-muted">{role.summary}</p>

                <ul className="mt-6 space-y-3">
                  {role.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-[0.9375rem] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[0.6rem] size-1 shrink-0 rounded-full bg-line-strong"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <TagRow items={role.stack} className="mt-7" />
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Reveal className="rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="size-4 text-faint" aria-hidden />
            <h3 className="eyebrow">Education</h3>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <li
                key={item.abbreviation}
                className="rounded-xl border border-line bg-surface-2/50 p-5"
              >
                <p className="text-sm font-semibold tracking-tight">
                  {item.degree}{' '}
                  <span className="font-mono text-[0.6875rem] text-faint">
                    ({item.abbreviation})
                  </span>
                </p>
                <p className="mt-1.5 text-[0.875rem] text-muted">{item.institution}</p>
                <p className="mt-2 font-mono text-[0.6875rem] text-faint">{item.detail}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
