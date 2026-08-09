import { useState } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { Tag, TagRow } from '../ui/Tag'
import { ProjectDiagram } from './ProjectDiagram'
import { CaseStudy } from './CaseStudy'
import {
  featuredProjects,
  hasDiagram,
  otherProjects,
  type Project,
} from '../../data/projects'

export function Work() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Selected work"
        title="Systems, not screens."
        description="A few systems and products I've worked on across SaaS, automation, analytics and AI."
      />

      <div className="mt-14 space-y-8 lg:mt-16 lg:space-y-10">
        {featuredProjects.map((project, index) => (
          <FeaturedCard
            key={project.id}
            project={project}
            index={index}
            onOpen={() => setSelected(project)}
          />
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10">
        {otherProjects.map((project, index) => (
          <CompactCard
            key={project.id}
            project={project}
            index={index}
            onOpen={project.caseStudy ? () => setSelected(project) : undefined}
          />
        ))}
      </div>

      <CaseStudy project={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}

function FeaturedCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  return (
    <Reveal
      as="article"
      delay={index * 0.06}
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong"
    >
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 lg:p-10">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[0.625rem] tracking-[0.16em] text-faint uppercase">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="h-px flex-1 bg-line" />
            <Tag variant="accent">{project.context}</Tag>
          </div>

          <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-2 text-[0.9375rem] font-medium text-accent">{project.tagline}</p>
          <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          {project.areas && (
            <div className="mt-7">
              <p className="eyebrow">Engineering areas</p>
              {/* Trimmed on the card — the case study lists every one of them.
                  26 chips at a glance is noise, not evidence. */}
              <TagRow items={project.areas} limit={8} className="mt-3" />
            </div>
          )}

          <div className="mt-7">
            <p className="eyebrow">Stack</p>
            <TagRow items={project.tags} className="mt-3" />
          </div>
        </div>

        {hasDiagram(project) && (
          <div className="lg:pt-2">
            <ProjectDiagram project={project} className="bg-bg/40" />
          </div>
        )}
      </div>

      <div className="border-t border-line px-6 py-5 sm:px-8 lg:px-10">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-2 text-sm font-medium text-fg transition-colors"
        >
          Explore case study
          <ArrowRight className="size-4 text-accent transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </Reveal>
  )
}

function CompactCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen?: () => void
}) {
  const interactive = Boolean(onOpen)

  return (
    <Reveal
      as="article"
      delay={index * 0.05}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-line-strong"
    >
      <div className="flex items-start justify-between gap-4">
        {/* Where the work happened, up top: it is the difference between a
            personal build and software written for an organization. */}
        <Tag variant={project.context === 'Project' ? 'default' : 'accent'}>
          {project.context}
        </Tag>
        {interactive && (
          <ArrowUpRight className="size-4 shrink-0 text-faint transition-colors duration-300 group-hover:text-accent" />
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{project.name}</h3>
      <p className="mt-1.5 text-[0.8125rem] text-accent">{project.tagline}</p>
      <p className="mt-3.5 flex-1 text-[0.875rem] leading-relaxed text-muted">
        {project.summary}
      </p>

      <TagRow items={project.tags} limit={5} className="mt-5" />

      {onOpen && (
        <button
          type="button"
          onClick={onOpen}
          className="mt-5 inline-flex w-fit items-center gap-1.5 text-[0.8125rem] font-medium text-fg"
        >
          View details
          <ArrowRight className="size-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      )}
    </Reveal>
  )
}
