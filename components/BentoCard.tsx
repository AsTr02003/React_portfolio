'use client'

import { useCallback, useRef } from 'react'
import type { ReactNode } from 'react'

/**
 * Card with a cursor-following spotlight.
 *
 * The pointer handler writes two CSS custom properties and nothing else — no
 * React state, so moving the mouse never triggers a render. Writes are
 * throttled to one per animation frame, since pointermove fires far more often
 * than the screen refreshes.
 */
export function BentoCard({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'article' | 'li' | 'section'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef<number | null>(null)

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current
    if (!node || frame.current !== null) return

    const { clientX, clientY } = event
    frame.current = requestAnimationFrame(() => {
      frame.current = null
      const rect = node.getBoundingClientRect()
      node.style.setProperty('--mx', `${clientX - rect.left}px`)
      node.style.setProperty('--my', `${clientY - rect.top}px`)
    })
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      onPointerMove={onPointerMove}
      className={`bento-card ${className}`}
    >
      {children}
    </Tag>
  )
}
