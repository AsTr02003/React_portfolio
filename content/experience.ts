import type { Role } from '@/lib/types'
import { assertNoPlaceholders } from '@/lib/content-guard'

/**
 * Merged from the two tailored resume variants.
 *
 * Where both documents described the same work from different angles, the
 * bullets are combined rather than listed twice — RBAC appears once covering
 * both the 25+ API endpoints and the 20+ client screens, and the FCM token
 * leak and the queued-job token processing are one item, because they are one
 * piece of work. Two near-identical metrics for the same change is the fastest
 * way to make a real result look inflated.
 *
 * Dropped as duplicates of stronger bullets: "35% mobile layout render speed"
 * (overlaps the 40% page-load figure) and "25% payload reduction" (overlaps
 * the API-contract work).
 */
export const experience: Role[] = [
  {
    company: 'Mocha Technologies',
    title: 'Software Engineer I',
    start: '2025-06',
    end: null,
    location: 'Mumbai, India',
    summary:
      'Full-stack work on a parcel management platform — Laravel and MySQL services, and the Flutter client on top of them.',
    highlights: [
      'Architected the backend for a parcel management platform in Laravel and MySQL, designing schemas and composite indexing patterns that serve 500+ daily active users.',
      'Cut server response latency by over 60% by eliminating N+1 query bottlenecks and removing redundant pagination logic on high-traffic REST endpoints.',
      'Enforced role-based access control for 5 distinct user roles across 25+ API endpoints and 20+ client screens, with route-level authorisation mapped directly to backend policy.',
      'Fixed a cross-tenant data leak in push-notification token registration, then moved token handling into queued background jobs that process 10,000+ device tokens daily with automated invalidation.',
      'Built Flutter interfaces for the platform, including a QR-based chain-of-custody scanning flow covering 500+ daily package handoffs, and a reusable navigation scaffold spanning all 5 roles that removed 30% of UI boilerplate.',
    ],
    stack: ['Laravel', 'MySQL', 'Flutter', 'Dart', 'Firebase FCM', 'REST APIs'],
  },
  {
    company: 'Bot2Do Technologies',
    title: 'Software Engineering Intern',
    start: '2024-07',
    end: '2024-10',
    location: 'Mumbai, India',
    summary:
      'Full-stack MERN work across client rendering, authentication and database performance.',
    highlights: [
      'Shipped MERN web applications, rewriting the front-end component rendering pipeline to cut initial page load times by 40%.',
      'Secured the client authentication pipeline using JWT storage, token refresh interceptors and local device caching, verified across 1,000+ simulated user sessions.',
      'Refactored MongoDB aggregation pipelines behind the administrative dashboards, improving heavy reporting query execution time by 30%.',
    ],
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT'],
  },
]

export function getExperience(): Role[] {
  const roles =
    process.env.NODE_ENV === 'production'
      ? experience.filter((role) => !role.draft)
      : experience

  assertNoPlaceholders(
    'content/experience.ts',
    roles.flatMap((role) => [role.summary, ...role.highlights]),
  )

  return [...roles].sort((a, b) => b.start.localeCompare(a.start))
}
