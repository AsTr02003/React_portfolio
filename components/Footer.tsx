import { site } from '@/content/site'

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-fg-subtle">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>
          Built with Next.js and Tailwind CSS ·{' '}
          <a
            href="https://github.com/AsTr02003"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline transition-colors hover:text-fg"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  )
}
