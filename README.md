# Natobotics Website — React 19 + Vite

Enterprise-structured React 19 rebuild of the Natobotics marketing site, implementing
the design system from Phase 1 (tokens, typography, motion) as real, running code.

## Stack
- React 19.2 + TypeScript
- Vite 8
- React Router 7 (client-side routing)
- Framer Motion (scroll reveals, animated counters, hero motion)
- CSS Modules + design tokens (no CSS framework - full control over the dark enterprise theme)

## Getting started
```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Folder structure (feature/layer separation - scales to a larger team)
```
src/
  app/                 App shell: router, root layout, scroll restoration
  pages/               Route-level pages (one file per route or route group)
  widgets/
    layout/            Header, Footer - used on every page
    home/               Composed sections unique to the home page
  components/ui/       Reusable, presentation-only primitives (Button, Card, Badge,
                        Container, Section, Reveal, Counter) - the seed of the
                        component library from Phase 1
  data/                Typed content (services, industries, offices, stats, case
                        studies, jobs) - this is the seam where a headless CMS
                        (Phase 4) plugs in without touching any component code
  styles/              tokens.css (design tokens) + globals.css (reset + utilities)
  types/               Shared TypeScript interfaces
```

### Why this structure
Each `pages/*.tsx` file composes `widgets` and `components/ui` - it holds no
business logic itself. Content lives in `data/`, typed against `types/index.ts`.
When Phase 4 (headless CMS) is implemented, `data/*.ts` files are replaced by
fetch calls with the same return shape - no component changes required.

## What's implemented
- Full routing for every page in the Phase 1 sitemap (stub pages marked clearly
  where content is scoped for a later phase - see `pages/StubPage.tsx`)
- Design tokens wired as CSS custom properties, consumed via CSS Modules
- Scroll-reveal, staggered motion, animated number counters, and a signature
  animated "delivery mesh" hero visual - all respecting `prefers-reduced-motion`
- Fully keyboard-navigable, with visible focus states throughout
- A working (client-side) contact form - wire the `handleSubmit` in
  `pages/ContactPage.tsx` to your real backend endpoint

## Not yet implemented (see Phase roadmap)
- Interactive D3/WebGL global map (Phase 3)
- Headless CMS integration + remote config (Phase 4)
- Admin dashboard (Phase 4)
- SSR/edge rendering, since this is a Vite SPA - migrate to Next.js if SSR/ISR
  becomes a hard requirement for SEO (Phase 5)
