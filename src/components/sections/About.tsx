import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { profile } from '../../data/profile'

export function About() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2 className="mt-4 text-3xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-4xl">
            {profile.name}
          </h2>
          <p className="mt-3 text-[0.9375rem] text-muted">{profile.role}</p>
          <p className="mt-6 font-mono text-[0.6875rem] leading-relaxed tracking-[0.1em] text-faint uppercase">
            {profile.specialisms.join(' · ')}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="space-y-5">
          {profile.about.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[1.0625rem] leading-relaxed text-muted sm:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>
      </div>
    </Section>
  )
}
