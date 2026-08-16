import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

/** Monogram favicon, replacing the default Vite logo. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#09090b',
          color: '#fafafa',
          fontSize: 18,
          fontWeight: 600,
          borderRadius: 6,
        }}
      >
        AJ
      </div>
    ),
    size,
  )
}
