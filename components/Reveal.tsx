'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger, in ms. Keep the total across a group under ~200ms. */
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'header' | 'footer'
  className?: string
}

/**
 * Fade-and-rise on first scroll into view.
 *
 * Replaces framer-motion, which cost ~50kB gzipped to do exactly this. The
 * element ships with the `.reveal` class already applied server-side, so there
 * is no flash of visible content before hydration; a <noscript> rule in the
 * layout un-hides everything when JS never arrives.
 *
 * One-shot by design — re-animating on every scroll past is a distraction, not
 * a delight.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Very old browsers, and any environment without the API, get the content
    // immediately rather than a blank page.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      // Fire slightly before the element reaches the viewport edge so the
      // animation is already settling by the time it is properly on screen.
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={['reveal', className].filter(Boolean).join(' ')}
      data-visible={visible ? 'true' : 'false'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  )
}
