# Sharthi website

Marketing site for **Sharthi**, the daily-reflection app. Built like [manageme.si](https://manageme.si) (section order) with footer/legal structure borrowed from [visity.io](https://www.visity.io).

Pages: `/` (hero → two ways in → how it works → Ask → Report → FAQ → contact), `/about`, `/terms`, `/privacy`, `/disclaimer`.

Stack: Next.js 16 (App Router) + Tailwind 4, same fonts and palette as the app (Rasa for headings, Mukta for body).

## Run it

```bash
npm install
npm run dev
```

Opens on http://localhost:3211. Crawlers are blocked (`robots.ts` + `noindex` meta) until launch.

## Waitlist

The form posts to `src/app/api/waitlist/route.ts`. In development entries land in `data/waitlist.jsonl` (git-ignored). For the live site set `WAITLIST_WEBHOOK_URL` (see `.env.example`) and every sign-up is POSTed there as JSON.

## Where things live

```
src/
  site.ts                  owner name and phone
  app/page.tsx             the home page; copy for steps, features, roadmap and FAQ at the top
  app/{about,terms,privacy,disclaimer}/page.tsx   text pages (shared frame: components/LegalPage.tsx)
  app/globals.css          palette (dawn + night), fonts, the wheel animation, text-page styles
  components/Logo.tsx      the mark (wheel) and wordmark
  components/SiteHeader.tsx, SiteFooter.tsx   shared chrome; nav + footer links live here
  components/WaitlistForm.tsx + app/api/waitlist/route.ts   the waitlist
  components/Wheel.tsx     the seven-spoke chariot wheel (SVG), tappable; sample scores, notes, sankalps
  components/Mockups.tsx   the hero phone (cycles Reflect → Report → Ask → Wisdom → Journey) + light mockups
  components/ChatDemo.tsx  the four example conversations in the Ask section
  components/Audience.tsx  the rotating "For …" line in the hero
```

Checks: `npm run typecheck`, `npm run lint`, `npm run build`.
