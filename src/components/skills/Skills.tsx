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

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {skillGroups.map((group, index) => {
          const Icon = icons[group.icon] ?? LayoutGrid
          return (
            <Reveal
              as="li"
              key={group.title}
              delay={(index % 3) * 0.05}
              className="rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 text-accent" aria-hidden />
                <h3 className="text-sm font-semibold tracking-tight">{group.title}</h3>
              </div>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-[0.6875rem] leading-none text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
