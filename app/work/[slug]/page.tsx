import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { Reveal } from '@/components/Reveal'
import { BentoCard } from '@/components/BentoCard'
import { Tag } from '@/components/Tag'
import { Counter } from '@/components/Counter'
import { SortingVisualizer } from '@/components/SortingVisualizer'
import { getCaseStudySlugs, getProject } from '@/content/projects'

type Params = { params: Promise<{ slug: string }> }

/** Every case study is known at build time, so all routes prerender. */
export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  }
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project?.caseStudy?.length) notFound()

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 pb-16 pt-14">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          All work
        </Link>

        <header className="mt-8">
          <p className="font-mono text-xs uppercase tracking-wider text-accent">
            {project.context} · {project.period}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
            {project.summary}
          </p>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((item) => (
              <li key={item}>
                <Tag>{item}</Tag>
              </li>
            ))}
          </ul>

          {project.links && project.links.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-5">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-sm text-fg transition-colors hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          )}
        </header>

        {project.metrics && (
          <Reveal>
            <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.metrics.map((metric) => (
                <BentoCard key={metric.label} className="p-4">
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
                </BentoCard>
              ))}
            </dl>
          </Reveal>
        )}

        {project.demo === 'sorting-visualizer' && (
          <Reveal>
            <div className="mt-10">
              <SortingVisualizer />
            </div>
          </Reveal>
        )}

        <div className="mt-12 space-y-10">
          {project.caseStudy.map((section, index) => (
            <Reveal key={section.heading} delay={index * 50}>
              <section>
                <h2 className="mb-4 border-b border-border pb-3 font-mono text-xs font-medium uppercase tracking-[0.16em] text-fg-subtle">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((paragraph, i) => (
                    <p key={i} className="text-pretty leading-relaxed text-fg-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="relative pl-4 leading-relaxed text-fg-muted before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-accent"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        {project.surfaces && (
          <Reveal>
            <div className="mt-12 grid gap-3 sm:grid-cols-2">
              {project.surfaces.map((surface) => (
                <BentoCard key={surface.name} className="p-6">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-accent">
                    {surface.name}
                  </h2>
                  <p className="mt-2 text-xs text-fg-subtle">{surface.stack.join(' · ')}</p>
                  <ul className="mt-4 space-y-2">
                    {surface.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-4 text-sm leading-relaxed text-fg-muted before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-fg-subtle"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </BentoCard>
              ))}
            </div>
          </Reveal>
        )}

        <Footer />
      </main>
    </>
  )
}
