const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const

/**
 * "2025-01" -> "Jan 2025". Formatted by hand rather than with toLocaleString
 * so the server and client cannot disagree about locale or time zone and
 * trigger a hydration mismatch.
 */
export function formatMonth(value: string): string {
  const [year, month] = value.split('-')
  if (!year) return value

  const index = Number(month) - 1
  const name = MONTHS[index]
  return name ? `${name} ${year}` : year
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`
}
