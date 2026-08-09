import { Boxes, Brain, Layers, Workflow } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { focusAreas } from '../../data/skills'

const icons: Record<string, LucideIcon> = {
  layers: Layers,
  building: Boxes,
  workflow: Workflow,
  brain: Brain,
}

export function Focus() {
  return (
    <Section id="focus">
      <SectionHeading
        eyebrow="Engineering focus"
        title="Building beyond the interface."
        description="The work spans the whole path from the screen a user touches to the infrastructure it runs on."
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {focusAreas.map((area, index) => {
          const Icon = icons[area.icon] ?? Layers
          return (
            <Reveal
              as="li"
              key={area.title}
              delay={index * 0.06}
              className="group rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent">
                <Icon className="size-4" aria-hidden />
              </span>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{area.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
                {area.description}
              </p>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
