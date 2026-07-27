Map bundle

Includes the React components and CSS for the Global Coverage map from this project.

How to use

1. Install dependencies:

```bash
npm install d3 topojson-client
```

2. Copy the `InteractiveWorldMap.tsx` and `InteractiveWorldMap.module.css` files into a React project (Next.js client component). Ensure `d3` and `topojson-client` are installed.

3. For a quick demo, use the included `GlobalCoverageMap.jsx` (plain React) and `GlobalCoverageMap.module.css` in any client-side React app.

Notes

- The components dynamically import `d3` and `topojson-client` at runtime to avoid SSR bundling.
- The map fetches the world atlas JSON from CDN: https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
- Accessibility: pins include keyboard `tabindex` and `aria-label` attributes.
