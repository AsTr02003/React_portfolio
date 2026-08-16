import { GraduationCap } from 'lucide-react'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { BentoCard } from './BentoCard'
import { education, site, skills } from '@/content/site'
import { formatMonth } from '@/lib/format'

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <Reveal className="lg:col-span-2">
          <BentoCard className="h-full p-6 sm:p-7">
            <div className="space-y-4">
              {site.bio.map((paragraph, index) => (
                <p key={index} className="text-pretty leading-relaxed text-fg-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </BentoCard>
        </Reveal>

        <Reveal delay={60}>
          <BentoCard className="flex h-full flex-col gap-5 p-6">
            {education.map((entry) => (
              <div key={entry.institution}>
                <GraduationCap className="mb-3 size-5 text-accent" aria-hidden="true" />
                <p className="text-sm font-medium leading-snug text-fg">
                  {entry.qualification}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-fg-muted">
                  {entry.institution}
                </p>
                <p className="mt-1 font-mono text-xs text-fg-subtle">
                  {formatMonth(entry.start)} — {formatMonth(entry.end)}
                </p>
              </div>
            ))}
          </BentoCard>
        </Reveal>

        <Reveal delay={100} className="lg:col-span-3">
          <BentoCard className="p-6 sm:p-7">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((row) => (
                <div key={row.group}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                    {row.group}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {row.items.join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </BentoCard>
        </Reveal>
      </div>
    </Section>
  )
}
