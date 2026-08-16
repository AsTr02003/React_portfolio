import type { Achievement, Education, Metric, Social } from '@/lib/types'

export const site = {
  name: 'Abhishek Joshi',
  title: 'Software Engineer I',
  company: 'Mocha Technologies',
  location: 'Mumbai, India',

  /** TODO: point at your real domain — OG tags, canonical URL and sitemap derive from this. */
  url: 'https://abhishekjoshi.dev',

  tagline:
    'I build across the stack — Flutter clients, Laravel and Node services, and the React interfaces on top of them.',

  bio: [
    'I am a software engineer at Mocha Technologies, working on a parcel management platform and visitor management platform. Most of my time goes to the backend — Laravel and MySQL, schema and index design, and the access-control layer that keeps five distinct user roles apart — plus the Flutter client that sits on top of it.',
    'I like the parts of the job with a measurable answer: a query plan that stops doing N+1 lookups, an index that turns a slow report into a fast one, a token-registration bug that was quietly leaking data across tenants. I graduated from Shah and Anchor Kutchhi Engineering College in 2025, where the algorithm visualiser I built ended up patented.',
  ],

  /**
   * Personal address, deliberately. A work email on a portfolio routes
   * recruiter mail through your employer's mail server.
   */
  email: 'pabhi.joshi0104@gmail.com',
  phone: '+91 93240 39137',

  /** TODO: replace with a current export — this file is the October 2024 version. */
  resume: '/Abhishek_Joshi_resume_web.pdf',

  socials: [
    // TODO: verify these two. Your resume prints the handle "abhishek-joshi"
    // for both, but the previous site linked the URLs below. A dead link in
    // the header is worse than no link.
    { label: 'GitHub', href: 'https://github.com/AsTr02003', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/abhishek-joshi-4b3265246/',
      icon: 'linkedin',
    },
  ] satisfies Social[],
} as const

/** Hero tiles. Kept to four — a wall of numbers reads as noise. */
export const headlineMetrics: Metric[] = [
  {
    value: 60,
    suffix: '%',
    progress: 60,
    label: 'Lower API latency',
    detail: 'N+1 elimination, parcel platform',
  },
  { value: 500, suffix: '+', label: 'Daily active users', detail: 'Parcel management platform' },
  { value: 10000, suffix: '+', label: 'Device tokens', detail: 'Queued cross-tenant processing' },
  { value: 900, suffix: '+', label: 'Students reached', detail: 'Patented DSA visualiser' },
]

export const achievements: Achievement[] = [
  {
    title: 'Best Industry-Ready Patent Award',
    issuer: 'SAKEC TECH Symposium',
    year: '2026',
    description:
      'Published patent for an algorithm visualisation system, awarded for scalable educational impact.',
  },
]

export const education: Education[] = [
  {
    institution: 'Shah and Anchor Kutchhi Engineering College',
    qualification: 'B.E. Information Technology',
    start: '2021-12',
    end: '2025-05',
    location: 'Chembur, Mumbai',
  },
]

export const skills = [
  { group: 'Languages', items: ['JavaScript (ES6+)', 'Dart', 'Python', 'SQL', 'C'] },
  { group: 'Mobile', items: ['Flutter', 'Firebase FCM', 'State management'] },
  { group: 'Frontend', items: ['React', 'Next.js', 'Redux', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Laravel', 'Node.js', 'Express', 'REST APIs', 'MVC'] },
  { group: 'Data', items: ['MySQL', 'MongoDB', 'Schema & index design'] },
  { group: 'Security', items: ['JWT', 'OAuth2', 'RBAC'] },
  { group: 'Tooling', items: ['Git', 'Docker', 'AWS', 'Postman'] },
]
