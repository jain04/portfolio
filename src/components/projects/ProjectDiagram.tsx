import { ArchitectureDiagram } from './ArchitectureDiagram'
import { PipelineDiagram } from './PipelineDiagram'
import type { Project } from '../../data/projects'

/**
 * Picks the visual that matches the shape of the system: layered tiers for a
 * platform, an ordered rail for a process. One place makes the choice, so the
 * card and the case study can never disagree about how a project is drawn.
 */
export function ProjectDiagram({
  project,
  className,
}: {
  project: Project
  className?: string
}) {
  const { architecture, pipeline } = project.caseStudy ?? {}

  if (architecture) {
    return (
      <ArchitectureDiagram
        title={architecture.title}
        tiers={architecture.tiers}
        footer={architecture.footer}
        className={className}
      />
    )
  }

  if (pipeline) {
    return (
      <PipelineDiagram
        title={pipeline.title}
        stages={pipeline.stages}
        footer={pipeline.footer}
        className={className}
      />
    )
  }

  return null
}
