# David Onyema (dskyle77) — Portfolio v2

Rebuilt on Next.js 16 (App Router) + TypeScript + Tailwind CSS v4.
Real content from your old React/MUI site has been migrated and rewritten
into case-study format. Old MUI components were replaced with Tailwind
equivalents to match this scaffold.

## What's populated already

- **lib/site.ts** — your real name, handle, GitHub, LinkedIn, itch.io,
  Twitter, email, skills list (web + game dev). No phone number included,
  per your instruction.
- **lib/projects.ts** — your 4 real projects (Quicksite, Legal Baby
  Distribution, Blog Dashboard, Max Games Maker), rewritten into
  problem/approach/decisions/result format based on your old descriptions.
  **Go through each one and swap in real specifics** — actual numbers,
  actual tradeoffs, what actually went wrong. Specific beats polished.
- **app/about/page.tsx** — your real bio, rewritten from your old
  AboutSection.jsx content.
- **app/contact/page.tsx** — email + GitHub + LinkedIn only. No phone
  number, no WhatsApp deep link with digits in client-side code.

## Before you deploy

1. Read through `lib/projects.ts` and tighten the problem/approach/decisions/
   result copy — these are drafted from your old one-line descriptions, so
   they need your real specifics.
2. Add real project screenshots to `/public/projects/` and reference them
   in the `image` field (currently empty).
3. Double check `lib/site.ts` — confirm the LinkedIn URL and email are
   exactly right.
4. If you want the contact page to have a working in-page form (not just
   mailto), add a form service like Formspree or Resend — say the word and
   I'll wire it in.

## Local development

```bash
npm install
npm run dev
```

If you hit a Turbopack error on Windows (native bindings issue), run:
```bash
npm run dev -- --webpack
```
Also avoid running the project from inside a OneDrive-synced folder —
OneDrive can corrupt binary files in node_modules mid-sync.

## Deploy

Push to GitHub, import on vercel.com/new. Zero config needed.

Once deployed, update `site.links.portfolio` in `lib/site.ts` to your real
domain and redeploy — this powers the sitemap, canonical URLs, and Open
Graph tags.

## What's already handled

- Per-page SEO metadata (`generateMetadata` on each route)
- Auto-generated `sitemap.xml` and `robots.txt`
- JSON-LD structured data (Person schema, all your real social links)
- Static generation for all project pages — fast, fully crawlable
- `next/font` self-hosted fonts (no external request, zero layout shift)
- Reduced-motion support, visible focus states
- Fully responsive, mobile-first
- No phone number exposed anywhere in the codebase

## Design system: "Circuit & Cartridge"

- **Palette:** near-black ink (#0B0E12), warm bone-white (#EDEAE0), signal
  blue (#2E9EFF) as the single accent, dim gray (#565C60) for secondary
  borders/text.
- **Type:** Press Start 2P (pixel display, used only for your name in the
  hero) + JetBrains Mono (labels, UI, code-adjacent text) + Inter (body
  paragraphs).
- **Signature element:** the `StatCard` component — a game-HUD-style panel
  (`components/StatCard.tsx`) applied to real professional facts: role,
  location, stack, status. Borrows the visual grammar of a character sheet
  without any game jokes — reads as competent, not cute.
- **Restraint rule:** only the StatCard gets the glow treatment
  (`shadow` + `glow-text` utility in globals.css). Everything else stays
  flat and high-contrast so the one signature element actually stands out.
