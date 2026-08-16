'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { site } from '@/content/site'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const

export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  // Scroll spy. Tracking the topmost intersecting section is more stable than
  // reacting to whichever entry fires last, which flickers when two sections
  // are on screen at once.
  useEffect(() => {
    if (!isHome) return

    const nodes = sections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const topmost = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

        if (topmost) setActive(topmost.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [isHome])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header
        className={[
          'sticky top-0 z-40 border-b transition-colors duration-200',
          scrolled
            ? 'border-border bg-bg/75 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        ].join(' ')}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6"
        >
          <Link
            href="/"
            className="text-sm font-medium tracking-tight text-fg transition-colors hover:text-accent"
          >
            {site.name}
          </Link>

          <div className="flex items-center gap-1">
            {/* Root-relative hashes so these keep working from a case-study page. */}
            <ul className="hidden items-center gap-0.5 sm:flex">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`/#${section.id}`}
                    aria-current={active === section.id ? 'true' : undefined}
                    className={[
                      'rounded-md px-2.5 py-2 text-sm transition-colors',
                      active === section.id
                        ? 'text-fg'
                        : 'text-fg-muted hover:text-fg',
                    ].join(' ')}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>

            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  )
}
