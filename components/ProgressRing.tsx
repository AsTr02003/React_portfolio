'use client'

import { useEffect, useRef, useState } from 'react'

const SIZE = 36
const STROKE = 3
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Small arc showing a percentage. Purely decorative reinforcement of the number
 * beside it, so it is hidden from assistive tech rather than announced twice.
 */
export function ProgressRing({ value }: { value: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setFilled(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setFilled(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const clamped = Math.max(0, Math.min(100, value))

  return (
    <svg
      ref={ref}
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      className="shrink-0 -rotate-90"
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--border)"
        strokeWidth={STROKE}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={filled ? CIRCUMFERENCE * (1 - clamped / 100) : CIRCUMFERENCE}
        style={{ transition: 'stroke-dashoffset 1400ms cubic-bezier(0.16, 1, 0.3, 1)' }}
      />
    </svg>
  )
}
