import { profile, socialLinks } from '../../data/profile'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <p className="text-[0.8125rem] text-faint">
          © {year} {profile.name}
        </p>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {socialLinks
            .filter((link) => link.icon !== 'resume')
            .map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="text-[0.8125rem] text-muted transition-colors hover:text-fg"
                >
                  {link.label}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  )
}
