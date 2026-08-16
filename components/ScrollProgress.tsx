'use client'

import { useEffect, useRef } from 'react'

/**
 * Reading-progress bar across the top of the viewport.
 *
 * Writes scaleX directly to the node instead of going through React state —
 * scroll fires far too often to re-render on, and a transform-only update is
 * composited without touching layout. Reads are batched into an animation
 * frame so a fast scroll cannot queue a pile of layout reads.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame: number | null = null

    const update = () => {
      frame = null
      const node = ref.current
      if (!node) return

      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0
      node.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`
    }

    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
    >
      <div ref={ref} className="h-full origin-left scale-x-0 bg-accent" />
    </div>
  )
}
