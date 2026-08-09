type Layer = {
  label: string
  detail?: string
  tone?: 'edge' | 'core' | 'data'
}

const layers: Layer[] = [
  { label: 'Users', tone: 'edge' },
  { label: 'Web Application', detail: 'React · Angular', tone: 'core' },
  { label: 'API Layer', detail: 'Node.js · Python', tone: 'core' },
  { label: 'Data + Cloud', detail: 'MongoDB · Azure · Redis', tone: 'data' },
]

/**
 * The hero visual: a quiet product-architecture diagram rather than an
 * illustration. Rendered in DOM (not an image) so it scales and stays legible.
 */
export function SystemDiagram() {
  return (
    <div
      role="img"
      aria-label="System architecture: users flow through the web application and API layer into data and cloud infrastructure, supported by automation, AI and integrations."
      className="relative w-full"
    >
      {/* soft accent bloom behind the stack */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-10 bottom-10 rounded-full bg-accent/10 blur-[64px]"
      />

      <div className="relative rounded-2xl border border-line bg-surface/60 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <span className="eyebrow">System</span>
          <span className="font-mono text-[0.625rem] text-faint">production shape</span>
        </div>

        <ul className="mt-5 flex flex-col">
          {layers.map((layer, index) => (
            <li key={layer.label}>
              <div
                className={
                  'flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 ' +
                  (layer.tone === 'core'
                    ? 'border-line-strong bg-surface-2'
                    : 'border-line bg-surface-2/40')
                }
              >
                <span className="text-sm font-medium tracking-tight text-fg">{layer.label}</span>
                {layer.detail && (
                  <span className="font-mono text-[0.6875rem] text-faint">{layer.detail}</span>
                )}
              </div>

              {index < layers.length - 1 && (
                <div aria-hidden className="flex h-6 items-center justify-center">
                  <svg width="2" height="24" viewBox="0 0 2 24" className="overflow-visible">
                    <line
                      x1="1"
                      y1="0"
                      x2="1"
                      y2="24"
                      stroke="var(--color-line-strong)"
                      strokeWidth="1.5"
                      className="flow-line"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1.5 border-t border-line pt-4">
          {['Automation', 'AI', 'Integrations'].map((item, i) => (
            <span key={item} className="font-mono text-[0.6875rem] text-faint">
              {i > 0 && <span className="mr-2 text-line-strong">·</span>}
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
