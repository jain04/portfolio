# Aditya Jain — Portfolio

Personal portfolio site. React + TypeScript + Vite + Tailwind CSS v4.

Live at **https://jain04.github.io/portfolio/**, deployed by GitHub Actions
(`.github/workflows/deploy.yml`) on every push to `main`.

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
npm run resume   # re-export the resume PDF from its HTML source
npm run og       # re-export the social share image
```

Because the site is a GitHub Pages *project* page, the build is served from
`/portfolio/`, not the domain root. `vite.config.ts` sets `base` accordingly, and
`vite preview` uses the same prefix so it mirrors production. Anything referenced
from JavaScript rather than markup has to go through `import.meta.env.BASE_URL`
(see `RESUME_URL`) — Vite rewrites asset paths in HTML, but not string literals.

## The resume

The resume is written as HTML and exported to PDF, so there is one source of truth:

```
resume/resume.html        ← edit this
resume/build-resume.mjs   ← the exporter
public/Aditya-Jain-Resume.pdf   ← generated; this is what the site serves
```

Edit `resume/resume.html`, then:

```bash
npm run resume
```

That renders the HTML through your local headless Chrome (`--print-to-pdf`), so the PDF
is a pixel-exact export of the HTML — what you see in the browser is what downloads.
Set `CHROME_PATH` if Chrome lives somewhere non-standard.

To preview before exporting, run `npm run dev` and open
`http://localhost:5173/resume/resume.html` — the on-screen view is styled as an A4
sheet. The page is print-first: A4, real selectable text (ATS-readable), single column,
`break-inside: avoid` on each entry so nothing splits mid-block.

Regenerate the PDF **before** `npm run build` — the build copies `public/` into `dist/`
as-is and does not run the exporter.

## Identity and links

All of it lives in **`src/data/profile.ts`**, and every one is currently set.

| Constant       | Notes                                                                                        |
| -------------- | -------------------------------------------------------------------------------------------- |
| `EMAIL`        | Drives the contact section, the footer and the mailto link.                                    |
| `LINKEDIN_URL` | —                                                                                              |
| `GITHUB_URL`   | Set it to `''` and every GitHub link disappears rather than rendering dead.                    |
| `RESUME_URL`   | Built from `BASE_URL`; the PDF itself comes from `npm run resume`.                              |

These values are duplicated in `resume/resume.html` — change both together.

## Where the content lives

Content is data, not markup — edit these rather than the components:

```
src/data/
├── profile.ts      identity, links, hero copy, about, contact copy
├── projects.ts     projects + full case-study content (overview, diagrams, challenges)
├── experience.ts   roles and education
└── skills.ts       skill groups, engineering focus areas, principles
```

Adding a project is one entry in `projects.ts`. Set `featured: true` for the large
treatment; give it a `caseStudy` and it becomes clickable, opening the full-screen
case study view.

### Project diagrams

A project declares **either** an `architecture` **or** a `pipeline`, never both, and
`ProjectDiagram` renders whichever one is present — so a card and its case study can
never disagree about how a system is drawn.

- `architecture` → stacked tiers, items within a tier side by side. Use it for a
  system whose parts are peers (AccuMax: three portals over shared services).
- `pipeline` → an ordered rail with a travelling accent. Use it for a process where
  order is the point (tax automation: data → transform → map → identify → automate →
  verify).

The distinction is the whole reason there are two components: drawing a platform as a
six-step sequence would tell a reader something untrue about it.

## Design system

Tokens are CSS variables in `src/styles/index.css` under `@theme`. There is a single
accent colour (`--color-accent`) — changing that one value re-themes the site.

## Notes on the animation approach

Scroll reveals are CSS transitions toggled by a shared scroll listener
(`src/lib/reveal.ts`), not JS-interpolated values, and the hidden state only applies
once JS has confirmed it is running. If the script fails, every section still renders
fully visible.

That controller has three layers of protection against the one failure that actually
matters — content stuck at `opacity: 0`:

1. The hidden state is opt-in, added by JS at startup.
2. A late sweep after mount catches layout that settles once fonts land.
3. A 500ms interval sweeps alongside the scroll listener, because browsers defer
   scroll events while a tab is hidden or the compositor is throttled. It clears
   itself as soon as everything has been revealed, so the steady state is no timers.

`prefers-reduced-motion` disables reveals, the connector dashes and the pipeline
pulse. Framer Motion is used only for the mobile menu, the case-study overlay and the
nav active-item indicator.

## The hero runner

`src/components/hero/runner/` is a small original pixel-art game: a visored bot that
runs along the base of the hero and jumps over bugs.

```
sprites.ts   pixel matrices ('#' body, '=' accent) rasterised once to offscreen canvases
engine.ts    world state, physics, spawning, collision, drawing — a plain class
HeroRunner.tsx   mounting, sizing, input, teardown
```

Nothing in it is derived from anyone else's artwork or code; the character and both
obstacles are authored as character matrices in `sprites.ts`, so restyling one is a
text edit.

The engine is not React state. It updates 60 times a second, and routing that through
a re-render would be a performance bug — React owns the mount, the engine owns the
frame, and the HUD is written straight to the DOM through refs.

Four rules it holds to:

- **Space is never captured globally.** Space is how keyboard users scroll; taking it
  site-wide for a game would be indefensible. The canvas is a real focusable control,
  and only claims Space and ArrowUp while it holds focus. Click and tap always work.
- **It never ends.** Clipping an obstacle costs the streak, not the game. A "game over"
  parked under the headline would be worse than having no game.
- **It never runs unseen.** The loop stops when scrolled offscreen or the tab is
  hidden. Because `ResizeObserver` does not fire in a hidden tab, the canvas is
  re-measured on the way back in — otherwise a resize performed in a background tab
  would leave it stale.
- **Reduced motion means still.** One composed frame, no loop, no input.

## Interactive diagrams and the rest of the layer

Both diagrams explain themselves on hover *and* on focus, and each keeps its
description area in the layout permanently so revealing one never shifts the diagram.

`PipelineDiagram` is one list with two layouts, chosen by container width: a vertical
rail in the narrow project card, a horizontal track with a travelling accent in the
case study. Rendering both and hiding one would duplicate every control for screen
readers. The travelling accent is a gradient segment moved by `transform` — a literal
moving dot would animate `left` and force layout every frame.

`ui/Cursor.tsx` adds a contextual label beside the pointer on elements that opt in
with `data-cursor="view|open|explore"`, on hover-capable pointer-fine devices only.

An earlier version replaced the native cursor with a dot. That was removed
deliberately: a lagging dot is worse than an arrow at pointing, and hiding the system
cursor makes selection and affordances feel wrong on a page whose job is to get
someone hired. The native cursor now stays untouched and the label is additive —
nothing on the page depends on it.

Two easter eggs, in `hooks/useEasterEggs.ts`: the arrow sequence
`↑ ↑ ↓ ↓ ← → ← →` fires a one-shot glitch, and `g` toggles a scanline "dev mode".
Poking the character four times makes it react. All three are inert under reduced
motion and none of them gate any content.
