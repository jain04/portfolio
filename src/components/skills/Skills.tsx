import { Cloud, Database, LayoutGrid, Server, Shield, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { skillGroups } from '../../data/skills'

const icons: Record<string, LucideIcon> = {
  layout: LayoutGrid,
  server: Server,
  database: Database,
  cloud: Cloud,
  shield: Shield,
  sparkles: Sparkles,
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Technical expertise"
        title="The stack I actually work in."
        description="Grouped by the layer of the system they belong to, not by how confident a progress bar could look."
      />

      {/* A spec sheet rather than a card grid: one ruled row per layer of the
          stack, category on the left, contents on the right. Scans top-to-bottom
          in a couple of seconds and stays readable when a group grows. */}
      <dl className="mt-12 border-t border-line lg:mt-14">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.icon] ?? LayoutGrid
          return (
            <Reveal
              key={group.title}
              delay={(index % 3) * 0.05}
              className="group grid gap-3 border-b border-line py-6 transition-colors duration-300 hover:bg-surface/60 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:gap-10 sm:py-7"
            >
              <dt className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-accent" aria-hidden />
                <span className="text-[0.9375rem] font-semibold tracking-tight">
                  {group.title}
                </span>
              </dt>

              <dd className="flex flex-wrap items-center gap-x-2 gap-y-2">
                {group.items.map((item, i) => (
                  <span key={item} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-line-strong">
                        ·
                      </span>
                    )}
                    <span className="font-mono text-[0.8125rem] text-muted">{item}</span>
                  </span>
                ))}
              </dd>
            </Reveal>
          )
        })}
      </dl>
    </Section>
  )
}
