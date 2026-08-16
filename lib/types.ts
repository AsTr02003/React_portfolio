export type Social = {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'mail'
}

export type Link = {
  label: string
  href: string
}

/**
 * A headline number. `value` is split so the counter can animate the digits
 * while leaving the prefix/suffix ("+", "%", "~") static — animating a "%"
 * character is not a thing.
 */
export type Metric = {
  value: number
  prefix?: string
  suffix?: string
  label: string
  /** Optional second line for context. */
  detail?: string
  /** 0-100. Renders a progress arc; use only where a share of a whole is meant. */
  progress?: number
}

export type CaseStudySection = {
  heading: string
  body: string[]
  bullets?: string[]
}

/** Distinct deliverables of one product, e.g. a Flutter client and a Laravel API. */
export type Surface = {
  name: string
  stack: string[]
  points: string[]
}

export type Project = {
  slug: string
  title: string
  /** Employer, or 'Personal project'. */
  context: string
  summary: string
  period: string
  /** Professional work outranks personal work in the grid. */
  kind: 'work' | 'personal'
  stack: string[]
  metrics?: Metric[]
  surfaces?: Surface[]
  links?: Link[]
  image?: { src: string; alt: string }
  /** Renders the live demo component on the detail page. */
  demo?: 'sorting-visualizer'
  /** Drives the bento tile size. */
  span?: 'full' | 'half'
  /** Present => a /work/[slug] page is generated. */
  caseStudy?: CaseStudySection[]
  draft?: boolean
}

export type Role = {
  company: string
  title: string
  /** "YYYY-MM". */
  start: string
  /** null means current. */
  end: string | null
  location: string
  summary: string
  highlights: string[]
  stack: string[]
  draft?: boolean
}

export type Achievement = {
  title: string
  issuer: string
  year: string
  description: string
}

export type Education = {
  institution: string
  qualification: string
  start: string
  end: string
  location: string
}
