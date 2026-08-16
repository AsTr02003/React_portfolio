import { ImageResponse } from 'next/og'
import { site } from '@/content/site'

export const alt = `${site.name} — ${site.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Generated at build time, so the link preview on LinkedIn, Slack or X can
 * never drift out of sync with site.ts. Inline styles only — this renders
 * through Satori, which does not run Tailwind.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 600,
              color: '#fafafa',
              letterSpacing: '-0.03em',
            }}
          >
            {site.name}
          </div>
          {/* One interpolation, not three nodes — Satori rejects multi-child
              elements that have no explicit display set. */}
          <div style={{ fontSize: 38, color: '#a1a1aa', marginTop: 16 }}>
            {`${site.title} at ${site.company}`}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 48, height: 4, background: '#7aa2f7' }} />
          <div style={{ fontSize: 26, color: '#71717a' }}>
            {site.url.replace(/^https?:\/\//, '')}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
