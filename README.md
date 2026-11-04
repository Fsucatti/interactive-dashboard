# Interactive Dashboard

A data visualization dashboard with analytics, reports, and settings. Built with Next.js, Recharts, and Tailwind CSS, and published as a static site on Cloudflare Workers.

The data is sample data. Settings are saved in the visitor's browser with `localStorage`, so there is no server or database.

## Run it locally

You need Node 22. `next build` can fail on Node 26 with a webpack hashing error.

```bash
npm install
npm run dev
```

To try the static build the way Cloudflare serves it:

```bash
npm run build
npm run preview
```

## Deploy

Sign in once with `npx wrangler login`, then run:

```bash
npm run deploy
```

Configuration is in `wrangler.jsonc`. Security headers are in `public/_headers`: if you add an external service, allow it in the content security policy there.

## Change things

| To change | Edit |
|---|---|
| Charts and sample data | `src/app/components/sections/` |
| Menu items | `src/app/components/NavItems.ts` |
| Default settings and how they're saved | `src/app/lib/settings.ts` |
