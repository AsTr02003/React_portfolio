import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/**
 * Every section shares one heading treatment: a small uppercase eyebrow over a
 * hairline rule. The old site gave each section its own gradient heading in a
 * different colour pair, which read as five unrelated designs stacked.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 py-16">
      <Reveal>
        <h2
          id={`${id}-heading`}
          className="mb-10 border-b border-border pb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-fg-subtle"
        >
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  )
}
