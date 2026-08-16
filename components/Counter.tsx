'use client'

import { useEffect, useRef, useState } from 'react'

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts up to `value` once, when scrolled into view.
 *
 * The final value is rendered server-side and the animation only replaces it
 * after mount, so the real number is in the HTML for crawlers and for anyone
 * without JS — a counter that starts at 0 and needs JS to become correct is a
 * decorative element that breaks the content underneath it.
 */
export function Counter({
  value,
  prefix = '',
  suffix = '',
  duration = 1400,
  className,
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(value)
  const [armed, setArmed] = useState(false)

  // Drop to the start value only once JS is confirmed running, and only if the
  // visitor has not asked for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setDisplay(0)
    setArmed(true)
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!node || !armed) return

    let raf = 0
    let start: number | null = null

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        observer.disconnect()

        const step = (now: number) => {
          start ??= now
          const progress = Math.min((now - start) / duration, 1)
          setDisplay(Math.round(easeOut(progress) * value))
          if (progress < 1) raf = requestAnimationFrame(step)
        }

        raf = requestAnimationFrame(step)
      },
      { threshold: 0.4 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [armed, value, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-US')}
      {suffix}
    </span>
  )
}
