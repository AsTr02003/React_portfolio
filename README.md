# abhishekjoshi.dev

Personal site and portfolio. Next.js App Router, TypeScript, Tailwind CSS v4.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | Purpose                          |
| ------------------- | -------------------------------- |
| `npm run dev`       | Dev server with fast refresh      |
| `npm run build`     | Production build (fully static)   |
| `npm start`         | Serve the production build        |
| `npm run lint`      | ESLint                            |
| `npm run typecheck` | `tsc --noEmit`                    |
| `npm test`          | Vitest — sorting algorithm suite  |

Requires Node 20.19+. On older 20.x patches ESLint 9 warns, and Vitest 3+ fails
outright (`styleText` is missing from `node:util`), which is why Vitest is
pinned to 2.x here. Node 22 LTS clears both.

## Editing content

All copy lives in `content/` as typed data. Components render it and hold no
prose, so updating the site never means touching JSX.

| File                    | Contains                                              |
| ----------------------- | ----------------------------------------------------- |
| `content/site.ts`       | Name, bio, socials, resume, headline metrics, education, skills, achievements |
| `content/projects.ts`   | Projects, metrics, surfaces and case-study bodies      |
| `content/experience.ts` | Roles, newest first                                    |

Shapes are defined in `lib/types.ts`; the compiler will tell you what a new
entry is missing.

Any project with a non-empty `caseStudy` array automatically gets a
prerendered `/work/<slug>` page — no routing changes needed.

### Drafts and the placeholder guard

- `draft: true` keeps an entry visible in `npm run dev` and strips it from
  `npm run build`.
- Any live entry still containing the string `PLACEHOLDER` **fails the
  production build**, naming the file and the offending values.

```bash
ALLOW_PLACEHOLDER_CONTENT=1 npm run build   # downgrades the error to a warning
```

## Notes on the build

- **No animation library.** Scroll reveals are a small `Reveal` component over
  `IntersectionObserver` plus a CSS transition. Elements ship pre-hidden
  server-side, so nothing flashes before hydration, and a `<noscript>` rule
  un-hides them when JS never runs.
- **Motion is written to the DOM, not to React state.** The bento spotlight
  (`BentoCard`) and the reading-progress bar (`ScrollProgress`) set CSS custom
  properties and transforms directly, throttled to one write per animation
  frame — pointer and scroll events fire far more often than the screen
  refreshes, and re-rendering on them is what makes these effects janky.
- **Counters render their final value server-side** and only animate after
  mount, so the real numbers are in the HTML for crawlers and for anyone
  without JS.
- **The visualiser is generator-based.** Algorithms in `lib/sorting.ts` yield a
  frame per step and never touch the DOM; the player replays the trace. That is
  what makes speed, pause and reset properties of the player rather than of the
  sort — and it makes the algorithms directly testable (`lib/sorting.test.ts`,
  76 cases across six algorithms).
- **Theme.** Three states — system, explicit light, explicit dark. Colours are
  semantic CSS custom properties in `app/globals.css`; components reference
  tokens (`bg-bg-card`, `text-fg-muted`) and never raw colours. An inline script
  applies the stored choice before first paint.
- **`prefers-reduced-motion`** disables reveals, counters, progress arcs and
  smooth scrolling.
- **Metadata** is derived from `content/site.ts`, so the OG image, JSON-LD
  `Person` schema, sitemap and `robots.txt` cannot drift from the page.

## Deploying

Builds to fully static output; any host works.

### Vercel

Import the repo — `vercel.json` supplies the rest. No environment variables are
required for the first deploy.

| File             | Does                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------- |
| `vercel.json`    | Framework, `bom1` region, security headers, cache policy, `/resume` → PDF redirect        |
| `.vercelignore`  | Keeps build artefacts and editor state out of the upload                                   |
| `.env.example`   | Documents the two optional variables                                                       |

**Origin resolution.** `site.url` is no longer hardcoded — it resolves at build
time from `NEXT_PUBLIC_SITE_URL`, then Vercel's own
`VERCEL_PROJECT_PRODUCTION_URL`, then `http://localhost:3000`. So the
`*.vercel.app` deploy already emits correct absolute OG, canonical and sitemap
URLs. When a custom domain is attached, add `NEXT_PUBLIC_SITE_URL` in **Project
→ Settings → Environment Variables** (Production scope) and redeploy.

**Headers.** HSTS is `max-age=31536000; includeSubDomains` without `preload`
— preload is a hard commitment to serve every subdomain over HTTPS forever, so
it is opt-in. `/images/*` gets a one-day CDN cache with
`stale-while-revalidate` rather than `immutable`, because those filenames are
not content-hashed and a replaced `profile.png` should not be stuck in caches.

### Anywhere else

`npm run build && npm start`, or serve the prerendered output directly. Set
`NEXT_PUBLIC_SITE_URL` at build time; without it the metadata falls back to
localhost.
