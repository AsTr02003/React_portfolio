import type { ReactNode } from 'react'

/** Single source of truth for stack chips, so they cannot drift apart. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-border bg-bg-subtle px-2 py-0.5 font-mono text-xs text-fg-muted">
      {children}
    </span>
  )
}
