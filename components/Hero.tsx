import Image from 'next/image'
import { ArrowUpRight, Award, FileText } from 'lucide-react'
import { Reveal } from './Reveal'
import { BentoCard } from './BentoCard'
import { SocialIcon } from './Icon'
import { achievements, site } from '@/content/site'

export function Hero() {
  const patent = achievements[0]

  return (
    <section id="top" className="pt-14 sm:pt-20">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Intro */}
        <Reveal className="sm:col-span-2 lg:col-span-3">
          <BentoCard className="h-full p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <Image
                src="/images/profile.jpeg"
                alt=""
                width={56}
                height={56}
                priority
                className="size-24 rounded-full border border-border object-cover"
              />
              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {site.name}
                </h1>
                <p className="mt-0.5 text-sm text-fg-muted">
                  {site.title} at <span className="text-fg">{site.company}</span>
                  <span className="text-fg-subtle"> · {site.location}</span>
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted">
              {site.tagline}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-2">
              <a
                href={site.resume}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
              >
                <FileText className="size-4" aria-hidden="true" />
                Resume
              </a>
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                View work
              </a>
            </div>
          </BentoCard>
        </Reveal>

        {/* Patent — the strongest single credential, so it gets its own tile. */}
        {patent && (
          <Reveal delay={60} className="sm:col-span-2 lg:col-span-1">
            <BentoCard className="flex h-full flex-col justify-between gap-4 p-6">
              <Award className="size-5 text-accent" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium leading-snug text-fg">{patent.title}</p>
                <p className="mt-1.5 text-xs leading-snug text-fg-subtle">
                  {patent.issuer} · {patent.year}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-fg-muted">
                  Published patent for an algorithm visualisation system.
                </p>
              </div>
            </BentoCard>
          </Reveal>
        )}

        {/* Metrics — disabled. To restore, re-add these two imports:
              import { MetricTile } from './MetricTile'
              import { headlineMetrics } from '@/content/site'
            They were removed because noUnusedLocals fails the build on unused
            imports, so leaving them behind breaks `npm run build`. */}
        {/* {headlineMetrics.map((metric, index) => (
          <Reveal key={metric.label} delay={100 + index * 50}>
            <MetricTile metric={metric} />
          </Reveal>
        ))} */}

        {/* Contact strip */}
        <Reveal delay={300} className="sm:col-span-2 lg:col-span-4">
          <BentoCard className="flex flex-wrap items-center gap-x-6 gap-y-3 p-5">
            <a
              href={`mailto:${site.email}`}
              className="link-underline inline-flex items-center gap-2 text-sm text-fg transition-colors hover:text-accent"
            >
              <SocialIcon name="mail" className="size-4" />
              {site.email}
            </a>

            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                <SocialIcon name={social.icon} className="size-4" />
                {social.label}
                <ArrowUpRight className="size-3" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
          </BentoCard>
        </Reveal>
      </div>
    </section>
  )
}
