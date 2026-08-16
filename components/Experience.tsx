import { Section } from './Section'
import { Reveal } from './Reveal'
import { BentoCard } from './BentoCard'
import { Tag } from './Tag'
import { getExperience } from '@/content/experience'
import { formatPeriod } from '@/lib/format'

export function Experience() {
  const roles = getExperience()

  return (
    <Section id="experience" title="Experience">
      <ol className="space-y-3">
        {roles.map((role, index) => (
          <Reveal as="li" key={`${role.company}-${role.start}`} delay={index * 60}>
            <BentoCard as="article" className="p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-medium tracking-tight text-fg">
                  {role.company}
                </h3>
                <time
                  dateTime={role.start}
                  className="font-mono text-xs text-fg-subtle"
                >
                  {formatPeriod(role.start, role.end)}
                </time>
              </div>

              <p className="mt-1 font-mono text-xs uppercase tracking-wider text-accent">
                {role.title}
                <span className="text-fg-subtle"> · {role.location}</span>
              </p>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
                {role.summary}
              </p>

              <ul className="mt-5 space-y-2.5">
                {role.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="relative max-w-2xl pl-4 text-sm leading-relaxed text-fg-muted before:absolute before:left-0 before:top-[0.6em] before:size-1 before:rounded-full before:bg-accent"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {role.stack.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </BentoCard>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
