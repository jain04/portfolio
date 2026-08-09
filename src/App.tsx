import { Nav } from './components/navigation/Nav'
import { Hero } from './components/hero/Hero'
import { Focus } from './components/sections/Focus'
import { Work } from './components/projects/Work'
import { Experience } from './components/experience/Experience'
import { Skills } from './components/skills/Skills'
import { Principles } from './components/sections/Principles'
import { About } from './components/sections/About'
import { Contact } from './components/contact/Contact'
import { Footer } from './components/layout/Footer'
import { Cursor } from './components/ui/Cursor'
import { useEasterEggs } from './hooks/useEasterEggs'

export default function App() {
  const { devMode, toast } = useEasterEggs()

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#08080a]"
      >
        Skip to content
      </a>

      <Cursor />

      {/* Dev mode: scanlines over the whole page, purely decorative. */}
      {devMode && <div aria-hidden className="scanlines pointer-events-none fixed inset-0 z-[90]" />}

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[95] -translate-x-1/2 rounded-full border border-accent/30 bg-surface/90 px-4 py-2 font-mono text-[0.6875rem] tracking-[0.16em] text-accent uppercase backdrop-blur-md"
        >
          {toast}
        </div>
      )}

      <Nav />

      <main id="main">
        <Hero />
        <Focus />
        <Work />
        <Experience />
        <Skills />
        <Principles />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
