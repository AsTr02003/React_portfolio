import type { Project } from '@/lib/types'
import { assertNoPlaceholders } from '@/lib/content-guard'

/**
 * Ordered as displayed. Professional work first, then personal.
 *
 * Parcel Management is employer work, so the case study describes architecture
 * and outcomes rather than internal specifics — enough to hold a technical
 * conversation, nothing that should not be public. Review it before deploying.
 */
export const projects: Project[] = [
  {
    slug: 'parcel-management',
    title: 'Parcel Management Platform',
    context: 'Mocha Technologies',
    period: '2026',
    kind: 'work',
    span: 'full',
    summary:
      'Chain-of-custody tracking for parcel handoffs, from the Laravel services to the Flutter client staff use on the floor.',
    stack: ['Laravel', 'MySQL', 'Flutter', 'Dart', 'Firebase FCM', 'REST APIs'],
    // metrics: [
    //   { value: 60, suffix: '%', progress: 60, label: 'Lower response latency' },
    //   { value: 500, suffix: '+', label: 'Daily active users' },
    //   { value: 25, suffix: '+', label: 'Secured endpoints' },
    //   { value: 10000, suffix: '+', label: 'Device tokens / day' },
    // ],
    surfaces: [
      {
        name: 'Backend',
        stack: ['Laravel', 'MySQL', 'Queued jobs'],
        points: [
          'Schema and composite indexing designed around the platform’s read patterns.',
          'Role-based access control across 25+ endpoints, enforced at the route layer.',
          'N+1 query elimination and pagination cleanup, cutting latency by over 60%.',
          'Queued background workers processing 10,000+ device tokens daily.',
        ],
      },
      {
        name: 'Mobile client',
        stack: ['Flutter', 'Dart', 'Firebase FCM'],
        points: [
          'QR-based chain-of-custody.',
          'Reusable navigation scaffold spanning 5 roles, removing 30% of UI boilerplate.',
          'Real-time alerts via FCM, with deep links into the relevant record.',
          'Local state management tuned to keep JSON parsing off the critical path.',
        ],
      },
    ],
    // caseStudy: [
    //   {
    //     heading: 'Context',
    //     body: [
    //       'A parcel handoff is a custody problem before it is a software problem. Every package changes hands several times between arrival and delivery, and when something goes missing the only question that matters is who held it last and when. Paper logs and verbal handoffs answer that badly.',
    //       'The platform records every transfer as an explicit custody event, and puts that record in front of five different kinds of user — each of whom should see a different slice of it.',
    //     ],
    //   },
    //   {
    //     heading: 'Access control',
    //     body: [
    //       'Five roles, each with a different view of the same data, is the kind of requirement that tempts you to filter in the UI. That approach leaks: the data still reaches the client, and any missed check anywhere in the interface exposes it.',
    //       'Authorisation is enforced at the route layer instead, across 25+ endpoints, with the client’s 20+ screens mapped to the same policy definitions. The interface hides what a role cannot use; the server is what actually refuses.',
    //     ],
    //   },
    //   {
    //     heading: 'Performance',
    //     body: [
    //       'The endpoints backing the busiest lists were issuing a query per row — the classic N+1 pattern — on top of pagination logic that was re-counting results it already had.',
    //       'Rewriting those access paths and designing composite indexes around the real read patterns cut response latency by more than 60%.',
    //     ],
    //   },
    //   {
    //     heading: 'A cross-tenant leak',
    //     body: [
    //       'Push notification tokens were being registered without correctly scoping them to a tenant, which meant notifications could reach devices belonging to a different customer entirely. This is a data leak, not a notification bug.',
    //       'Fixing registration closed the exposure. Token handling then moved into queued background jobs that process 10,000+ tokens daily and invalidate stale ones automatically, so the problem could not quietly return through unbounded growth.',
    //     ],
    //   },
    // ],
  },

  {
    slug: 'dsa-visualizer',
    title: 'DSA Visualizer',
    context: 'Personal project · Patented',
    period: '2024',
    kind: 'personal',
    span: 'full',
    demo: 'sorting-visualizer',
    summary:
      'Interactive visualiser for 15+ sorting and data-structure algorithms, used by 900+ students. Awarded a published patent.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'OAuth2'],
    metrics: [
      { value: 15, suffix: '+', label: 'Algorithms visualised' },
      { value: 900, suffix: '+', label: 'Students reached' },
      { value: 1000, suffix: '+', label: 'Data points at 60fps' },
    ],
    links: [
      // TODO: add the real repository and live URLs.
      { label: 'View website', href: 'https://sorting-visualizer-react-wheat.vercel.app/' },
    ],
    image: { src: '/images/sorting-visualizer.png', alt: 'DSA Visualizer running a sort' },
    caseStudy: [
      {
        heading: 'Context',
        body: [
          'Complexity classes are hard to internalise from notation. The gap between O(n²) and O(n log n) is abstract on a page and obvious the moment you watch two algorithms race on the same input.',
          'The visualiser renders that comparison directly, across 15+ algorithms, and has been used by 900+ students.',
        ],
      },
      {
        heading: 'Separating the algorithm from the animation',
        body: [
          'The obvious implementation interleaves drawing calls with the sort itself. That makes every algorithm responsible for its own animation, ties speed control to the sorting logic, and makes stepping backwards impossible.',
          'Each algorithm is instead written as a generator that yields comparison and swap events. The sort runs to completion producing a trace; the renderer replays that trace at whatever speed the user picks. Adding an algorithm means writing a generator and nothing else.',
        ],
        bullets: [
          'Algorithms stay pure and independently testable.',
          'Playback speed, pause and step are properties of the player, not the sort.',
          'Every algorithm gets identical instrumentation — comparison and swap counts come free.',
        ],
      },
      {
        heading: 'Rendering',
        body: [
          'Holding 60fps while animating 1,000+ bars means the per-frame cost has to stay flat. Render work is batched per frame and driven from the recorded trace rather than from React state updates per comparison, which would have meant thousands of re-renders a second.',
        ],
      },
      {
        heading: 'Recognition',
        body: [
          'The system received the Best Industry-Ready Patent Award at the SAKEC TECH Symposium in 2026, with a published patent covering the visualisation approach.',
        ],
      },
    ],
  },

  {
    slug: 'task-me',
    title: 'Task Me',
    context: 'Personal project',
    period: '2024',
    kind: 'personal',
    span: 'full',
    summary:
      'Task and bug tracking for small agile teams — a React web platform and a Flutter client over shared services.',
    stack: ['React', 'Redux', 'Node.js', 'Tailwind CSS', 'Flutter', 'Dart'],
    metrics: [
      { value: 15, label: 'Team size supported' },
      { value: 500, suffix: '+', label: 'Task updates / day' },
      { value: 25, suffix: '%', progress: 25, label: 'Fewer network requests' },
    ],
    surfaces: [
      {
        name: 'Web platform',
        stack: ['React', 'Redux', 'Node.js', 'Tailwind CSS'],
        points: [
          'Email verification, activity logging and real-time project status.',
          'Modular backend services with token rotation and tuned indexing.',
          'Redux state management cutting redundant server requests by 25%.',
        ],
      },
      {
        name: 'Mobile client',
        stack: ['Flutter', 'Dart'],
        points: [
          'Biometric and OTP authentication through platform channels.',
          'Infinite-scroll pagination holding 60fps across 500+ tasks on low-end devices.',
          'Push notifications for assignment and status changes.',
        ],
      },
    ],
    // links: [{ label: 'Repository', href: 'https://github.com/AsTr02003' }],
    image: { src: '/images/task-manager.png', alt: 'Task Me project dashboard' },
    caseStudy: [
      {
        heading: 'Context',
        body: [
          'Small teams tracking work in spreadsheets lose the link between a bug, the person fixing it, and the release it belongs to. Task Me models projects, tasks and bugs as distinct resources with explicit assignment, for teams of up to 15.',
        ],
      },
      {
        heading: 'Two clients, one service',
        body: [
          'The web platform and the mobile client are separate front ends over the same services, which keeps authorisation and validation in one place rather than duplicated per platform.',
          'The mobile client adds what only makes sense on a device — biometric and OTP authentication through platform channels, and push notifications on assignment changes.',
        ],
      },
      {
        heading: 'Keeping the list fast',
        body: [
          'A tracker is mostly a list, and lists are where naive implementations fall over. Backend indexing was tuned around the queries the boards actually issue, supporting 500+ task updates a day.',
          'On the client, Redux removed redundant refetches — a 25% drop in network requests — while the mobile list uses windowed pagination to hold 60fps past 500 tasks on lower-end hardware.',
        ],
      },
    ],
  },
]

export function getProjects(): Project[] {
  const visible =
    process.env.NODE_ENV === 'production'
      ? projects.filter((project) => !project.draft)
      : projects

  assertNoPlaceholders(
    'content/projects.ts',
    visible.flatMap((project) => [project.title, project.summary]),
  )

  return visible
}

export function getProject(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug)
}

/** Only projects with a case study get a generated detail route. */
export function getCaseStudySlugs(): string[] {
  return getProjects()
    .filter((project) => project.caseStudy?.length)
    .map((project) => project.slug)
}
