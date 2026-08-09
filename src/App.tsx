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

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#08080a]"
      >
        Skip to content
      </a>

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
