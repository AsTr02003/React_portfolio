'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'light' | 'dark'

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  // `null` until mounted: the server cannot know the visitor's theme, so
  // rendering a specific icon during SSR would guarantee a hydration mismatch.
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    setTheme(stored === 'light' || stored === 'dark' ? stored : systemTheme())
  }, [])

  useEffect(() => {
    // Only track the OS while the visitor has expressed no preference.
    if (localStorage.getItem('theme')) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setTheme(media.matches ? 'dark' : 'light')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      // The label has to describe the action, and it is unknown until mount.
      aria-label={theme ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme` : 'Switch theme'}
      className="grid size-9 place-items-center rounded-md text-fg-muted transition-colors hover:bg-bg-inset hover:text-fg"
    >
      {/* Reserve the box before mount so the nav does not shift on hydration. */}
      {theme === null ? (
        <span className="size-[18px]" />
      ) : theme === 'dark' ? (
        <Sun className="size-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="size-[18px]" aria-hidden="true" />
      )}
    </button>
  )
}
