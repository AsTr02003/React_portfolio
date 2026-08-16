/**
 * Build-time guard against shipping unfinished copy.
 *
 * Draft projects are filtered out of production automatically, but a role has
 * no such escape hatch — dropping your current job from the page to hide a
 * placeholder bullet would be worse than the placeholder. So instead the
 * production build fails loudly if scaffold text survives into live content.
 *
 * Escape hatch: set ALLOW_PLACEHOLDER_CONTENT=1 to downgrade this to a warning
 * (useful for a first deploy while the copy is still being written).
 */
const MARKER = 'PLACEHOLDER'

export function assertNoPlaceholders(source: string, values: string[]): void {
  if (process.env.NODE_ENV !== 'production') return

  const offenders = values.filter((value) => value.includes(MARKER))
  if (offenders.length === 0) return

  const detail = offenders.map((value) => `  · ${value.slice(0, 80)}…`).join('\n')

  if (process.env.ALLOW_PLACEHOLDER_CONTENT === '1') {
    console.warn(
      `\n⚠  ${source}: shipping ${offenders.length} placeholder value(s):\n${detail}\n`,
    )
    return
  }

  throw new Error(
    `\n\n${source} still contains ${offenders.length} placeholder value(s):\n${detail}\n\n` +
      `Replace the text in content/, or set ALLOW_PLACEHOLDER_CONTENT=1 to deploy anyway.\n`,
  )
}
