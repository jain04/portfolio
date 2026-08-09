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

      {/* Deliberately not cards: this section sits right under a dense hero, and
          four more bordered boxes would read as filler. A ruled column each is
          lighter and lets the page breathe before Selected Work. */}
      <ul className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
        {focusAreas.map((area, index) => {
          const Icon = icons[area.icon] ?? Layers
          return (
            <Reveal
              as="li"
              key={area.title}
              delay={index * 0.06}
              className="group border-t border-line pt-6 transition-colors duration-300 hover:border-accent/40"
            >
              <div className="flex items-center gap-2.5">
                <Icon className="size-4 shrink-0 text-accent" aria-hidden />
                <h3 className="text-base font-semibold tracking-tight">{area.title}</h3>
              </div>
              <p className="mt-3 text-[0.875rem] leading-relaxed text-muted">
                {area.description}
              </p>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
