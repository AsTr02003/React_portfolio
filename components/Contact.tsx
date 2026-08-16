import { ArrowUpRight, Phone } from 'lucide-react'
import { Section } from './Section'
import { Reveal } from './Reveal'
import { BentoCard } from './BentoCard'
import { SocialIcon } from './Icon'
import { site } from '@/content/site'

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <Reveal>
        <BentoCard className="p-6 sm:p-8">
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-fg">
            Open to interesting problems and good teams.
          </p>
          <p className="mt-2 max-w-xl text-pretty leading-relaxed text-fg-muted">
            Email is the surest way to reach me.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              <SocialIcon name="mail" className="size-4" />
              {site.email}
            </a>

            {site.phone && (
              <a
                href={`tel:${site.phone.replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                <Phone className="size-4" aria-hidden="true" />
                {site.phone}
              </a>
            )}
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
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
              </li>
            ))}
          </ul>
        </BentoCard>
      </Reveal>
    </Section>
  )
}
