import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { principles } from '../../data/skills'

export function Principles() {
  return (
    <Section id="principles">
      <SectionHeading
        eyebrow="How I think"
        title="I don't just build features."
        description="Four questions I ask before writing anything that has to survive contact with real users and real data."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:mt-14">
        {principles.map((principle, index) => (
          <Reveal
            as="li"
            key={principle.title}
            delay={index * 0.05}
            className="bg-surface p-7 transition-colors duration-300 hover:bg-surface-2 sm:p-9"
          >
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-faint">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{principle.title}</h3>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
              {principle.question}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
