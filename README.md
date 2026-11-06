# Interactive Dashboard

A data visualization dashboard with analytics, reports and settings. It has a light and a dark theme and works in English or Spanish. The data is sample data, and your settings are saved in your browser.

**Built with:** Next.js, Recharts and Tailwind CSS.

## Run it locally

You need Node 22. `next build` can fail on Node 26.

```bash
npm install
npm run dev
```

## Change things

| To change | Edit |
|---|---|
| Charts and sample data | `src/app/components/sections/` |
| Menu items | `src/app/components/NavItems.ts` |
| Default settings | `src/app/lib/settings.ts` |
| Text in each language | `src/app/lib/i18n.ts` |
| Light theme colors | `src/app/globals.css` |
