import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { BentoCard } from './BentoCard'
import { Tag } from './Tag'
import { Counter } from './Counter'
import { SortingVisualizer } from './SortingVisualizer'
import { getProjects } from '@/content/projects'
import type { Project } from '@/lib/types'

function ProjectTile({ project }: { project: Project }) {
  const hasCaseStudy = Boolean(project.caseStudy?.length)

  return (
    <BentoCard as="article" className="h-full p-6 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-medium tracking-tight text-fg">{project.title}</h3>
        <span className="font-mono text-xs text-fg-subtle">{project.period}</span>
      </div>

      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">
        {project.context}
      </p>

      <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-fg-muted">
        {project.summary}
      </p>

      {project.metrics && (
        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-border py-4 sm:grid-cols-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="sr-only">{metric.label}</dt>
              <dd>
                <Counter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  className="block font-mono text-xl font-semibold tabular-nums text-fg"
                />
                <span className="mt-1 block text-xs leading-snug text-fg-subtle">
                  {metric.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      )}

      {/* Two surfaces of one product, shown side by side rather than as one
          undifferentiated stack list. */}
      {project.surfaces && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.surfaces.map((surface) => (
            <div key={surface.name} className="rounded-lg bg-bg-subtle p-4">
              <p className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                {surface.name}
              </p>
              <p className="mt-1.5 text-xs text-fg-muted">{surface.stack.join(' · ')}</p>
              <ul className="mt-3 space-y-1.5">
                {surface.points.slice(0, 3).map((point) => (
                  <li
                    key={point}
                    className="relative pl-3.5 text-xs leading-relaxed text-fg-muted before:absolute before:left-0 before:top-[0.55em] before:size-1 before:rounded-full before:bg-fg-subtle"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* The demo is the argument for this project, so it runs inline rather
          than sitting behind a click. */}
      {project.demo === 'sorting-visualizer' && (
        <div className="mt-6">
          <SortingVisualizer />
        </div>
      )}

      {!project.surfaces && (
        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li key={item}>
              <Tag>{item}</Tag>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        {hasCaseStudy && (
          <Link
            href={`/work/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg transition-colors hover:text-accent"
          >
            Read case study
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover/link:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        )}

        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            {link.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        ))}
      </div>
    </BentoCard>
  )
}

export function Work() {
  const projects = getProjects()
  const work = projects.filter((project) => project.kind === 'work')
  const personal = projects.filter((project) => project.kind === 'personal')

  return (
    <Section id="work" title="Selected work">
      <div className="space-y-3">
        {work.map((project, index) => (
          <Reveal key={project.slug} delay={index * 60}>
            <ProjectTile project={project} />
          </Reveal>
        ))}
      </div>

      {personal.length > 0 && (
        <>
          <Reveal>
            <h3 className="mb-4 mt-14 font-mono text-xs font-medium uppercase tracking-[0.16em] text-fg-subtle">
              Personal projects
            </h3>
          </Reveal>

          <div className="space-y-3">
            {personal.map((project, index) => (
              <Reveal key={project.slug} delay={index * 60}>
                <ProjectTile project={project} />
              </Reveal>
            ))}
          </div>
        </>
      )}
    </Section>
  )
}
