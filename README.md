# AgentLead.dev

Marketing + docs site for the two AgentLead open-source products:

- **Skills** — engineering discipline for your AI coding assistant (`npx @ai-agent-lead/skills`)
- **Flow** — declare agents in YAML and run them as a durable, orchestrated graph (`pip install agentlead-flow-core`)

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Tailwind CSS v4**, and
configured for a fully **static export** so it can be hosted anywhere.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs a static site to ./out
```

`next.config.mjs` sets `output: "export"`, so `npm run build` produces a self-contained
`/out` folder of static HTML/CSS/JS — no Node server required at runtime.

## Deploy

Live on **Cloudflare Pages**: https://agentlead.pages.dev (project `agentlead`).

Manual deploy of the static bundle:

```bash
npm run build
npx wrangler@latest pages deploy out --project-name agentlead --branch main
```

`/out` is host-agnostic, so Netlify (`publish: out`), Vercel, GitHub Pages, or any
CDN/S3 bucket work too.

### Continuous deployment (GitHub Actions → Cloudflare Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

**Required GitHub Secrets** (Settings → Secrets and variables → Actions) — never
commit these; the public workflow only references them:

| Secret | Value |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | A Cloudflare API token scoped to **Account → Cloudflare Pages → Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account id (`794ad0…`) |

The deploy step is skipped (the build still runs) until `CLOUDFLARE_API_TOKEN`
is present, so the workflow never fails for a missing secret.

## Structure

All application code lives under `src/`; the repo root holds only config.

```
src/
  app/
    layout.tsx        # shared shell: fonts, metadata, Nav, Footer
    page.tsx          # home — frames both products
    skills/page.tsx   # Skills product page
    flow/page.tsx     # Flow product page
    globals.css       # design tokens (@theme) + components
  components/          # Nav, Footer, Reveal, Chain, CodeBlock, FlowDiagram, AgentRoster, …
  lib/
    site.ts           # links + product metadata (single source of truth)
    data.ts           # flows, lenses/gates, Flow features & concepts
    highlight.ts      # Shiki build-time syntax highlighting
```

The `@/*` import alias maps to `src/*` (see `tsconfig.json`). To update copy, links,
or the product lists, edit `src/lib/site.ts` and `src/lib/data.ts` — the pages render
from that data.
