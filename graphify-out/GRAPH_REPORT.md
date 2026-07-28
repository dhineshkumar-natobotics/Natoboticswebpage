# Graph Report - .  (2026-07-27)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 316 nodes · 653 edges · 13 communities (12 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5aa698ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Container.tsx
- dependencies
- react
- Header.tsx
- AppRouter.tsx
- devDependencies
- compilerOptions
- GlobalDeliveryPage.tsx
- compilerOptions
- HomePage.tsx
- TeamPage.tsx
- tsconfig.json

## God Nodes (most connected - your core abstractions)
1. `Container()` - 31 edges
2. `react` - 30 edges
3. `Section()` - 23 edges
4. `Reveal()` - 20 edges
5. `PageHero()` - 18 edges
6. `compilerOptions` - 18 edges
7. `compilerOptions` - 15 edges
8. `Button()` - 13 edges
9. `Card()` - 8 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `plugins` --extends--> `typescript`  [EXTRACTED]
  .oxlintrc.json → package.json

## Import Cycles
- None detected.

## Communities (13 total, 1 thin omitted)

### Community 0 - "Container.tsx"
Cohesion: 0.13
Nodes (26): BaseProps, Button(), ButtonAsButton, ButtonAsLink, Size, Variant, Card(), CardProps (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.05
Nodes (36): clsx, framer-motion, @icons-pack/react-simple-icons, lucide-react, dependencies, clsx, d3, framer-motion (+28 more)

### Community 2 - "react"
Cohesion: 0.07
Nodes (19): plugins, rules, react/only-export-components, react/rules-of-hooks, typescript/no-unused-vars, $schema, oxc, react (+11 more)

### Community 3 - "Header.tsx"
Cohesion: 0.09
Nodes (16): RootLayout(), caseStudies, industries, JobItem, jobs, services, CareersPage(), WORK_MODES (+8 more)

### Community 4 - "AppRouter.tsx"
Cohesion: 0.08
Nodes (22): ScrollToTop(), BlogPage(), CaseStudiesPage(), CaseStudyDetailPage(), ClientsPage(), getInitials(), ContactPage(), faqs (+14 more)

### Community 5 - "devDependencies"
Cohesion: 0.07
Nodes (28): oxlint, devDependencies, oxlint, @types/d3, @types/node, @types/react, @types/react-dom, @types/topojson-client (+20 more)

### Community 6 - "compilerOptions"
Cohesion: 0.08
Nodes (23): DOM, src, vite/client, compilerOptions, allowArbitraryExtensions, allowImportingTsExtensions, erasableSyntaxOnly, jsx (+15 more)

### Community 7 - "GlobalDeliveryPage.tsx"
Cohesion: 0.10
Nodes (14): Badge(), BadgeProps, CONNS, InteractiveWorldMapProps, LOCS, clients, offices, getMapIdForOffice() (+6 more)

### Community 8 - "compilerOptions"
Cohesion: 0.10
Nodes (19): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+11 more)

### Community 9 - "HomePage.tsx"
Cohesion: 0.13
Nodes (13): Counter(), CounterProps, stats, HomePage(), StatItem, CaseStudyPreview(), FinalCta(), GlobalDeliveryTeaser() (+5 more)

### Community 10 - "TeamPage.tsx"
Cohesion: 0.31
Nodes (7): teamData, TeamMember, TimelineEvent, timelineEvents, GithubIcon(), LinkedinIcon(), TeamPage()

## Knowledge Gaps
- **101 isolated node(s):** `$schema`, `oxc`, `react/rules-of-hooks`, `name`, `private` (+96 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `Container.tsx`, `Header.tsx`, `AppRouter.tsx`, `GlobalDeliveryPage.tsx`, `HomePage.tsx`, `TeamPage.tsx`?**
  _High betweenness centrality (0.398) - this node is a cross-community bridge._
- **Why does `plugins` connect `react` to `devDependencies`?**
  _High betweenness centrality (0.300) - this node is a cross-community bridge._
- **What connects `$schema`, `oxc`, `react/rules-of-hooks` to the rest of the system?**
  _101 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Container.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13425253991291727 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `react` be split into smaller, more focused modules?**
  _Cohesion score 0.06628787878787878 - nodes in this community are weakly interconnected._
- **Should `Header.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0946969696969697 - nodes in this community are weakly interconnected._