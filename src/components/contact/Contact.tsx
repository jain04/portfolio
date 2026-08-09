import type { ComponentType, SVGProps } from 'react'
import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { Section } from '../ui/Section'
import { Reveal } from '../ui/Reveal'
import { GitHubIcon, LinkedInIcon } from '../ui/BrandIcons'
import { EMAIL, profile, socialLinks } from '../../data/profile'

const icons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  linkedin: LinkedInIcon,
  github: GitHubIcon,
  mail: Mail,
  resume: Download,
}

export function Contact() {
  return (
    <Section id="contact">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 max-w-xl text-3xl leading-[1.08] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[3rem]">
            {profile.contactHeading}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.contactCopy}
          </p>

          {EMAIL && (
            <a
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-flex items-center gap-2 text-base font-medium text-fg underline-offset-8 transition-colors hover:text-accent hover:underline sm:text-lg"
            >
              {EMAIL}
              <ArrowUpRight className="size-4 text-accent" aria-hidden />
            </a>
          )}
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
            {socialLinks.map((link) => {
              const Icon = icons[link.icon] ?? ArrowUpRight
              const isExternal = link.href.startsWith('http')
              const isDownload = link.icon === 'resume'

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                    {...(isDownload ? { download: '' } : {})}
                    data-cursor={isDownload ? 'download' : isExternal ? 'open' : undefined}
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4 text-faint" aria-hidden />
                      <span className="text-[0.9375rem] font-medium text-fg">{link.label}</span>
                    </span>
                    <ArrowUpRight
                      className="size-4 text-faint transition-colors group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
