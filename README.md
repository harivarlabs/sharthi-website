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

The form posts to `src/app/api/waitlist/route.ts`. On the live site each sign-up is emailed to info@sarathi.online through Resend (Vercel Marketplace integration; `RESEND_API_KEY`). Without that key, `WAITLIST_WEBHOOK_URL` is used if set; otherwise (local development) entries land in `data/waitlist.jsonl` (git-ignored). See `.env.example`.

### Email DNS (one-time)

Resend sends from `waitlist@sarathi.online`, so the domain must be verified once. Add these records at the registrar for `sarathi.online` (values from the Resend dashboard / `vercel integration open resend`):

| Record | Type | Name | Value |
|---|---|---|---|
| DKIM | TXT | `resend._domainkey` | `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIjSEJdODP90b1QxjfwizE2OeCyEntP5UjRtCzWSbdCBkNk8NCOZ813hODJmmrInHlM31lEXBDSwfnWz9uRG4gdf7oO6nFjQdrsFyXx5jihxAk2phQd7ePQ4aV4ut+TFNUR4CYcos5MfWT6D4ZvpbbYseLZ0kZmqaWTWql+vH80QIDAQAB` |
| SPF | MX (priority 10) | `send` | `feedback-smtp.us-east-1.amazonses.com` |
| SPF | TXT | `send` | `v=spf1 include:amazonses.com ~all` |

Until these are live, Resend refuses to send and the form shows "We couldn't save that just now."

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
