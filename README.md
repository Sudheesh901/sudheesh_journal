# Sudheesh K. Reddy — Portfolio & Knowledge Base

Production Astro site deployed on Vercel at **[sudheeshreddy.com](https://sudheeshreddy.com)**.

AI engineering portfolio and open-source knowledge base for DS/AI engineers.

---

## Stack

| Layer | Technology |
| --- | --- |
| Framework | [Astro 5](https://astro.build) — static output |
| Content | MDX + Astro Content Collections |
| Styling | Global CSS design tokens (no framework) |
| Contact API | Vercel Serverless Function + Nodemailer |
| Hosting | Vercel Hobby |
| DNS | Cloudflare (DNS-only, no proxy) |

---

## Local Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
npm run typecheck  # Astro type-check (astro check)
```

---

## Deploy on Vercel

### First-time setup

1. Push this repo to GitHub.
2. In Vercel → **Add New Project** → import the repository.
3. Vercel auto-detects Astro. Confirm these settings:

| Setting | Value |
| --- | --- |
| Framework Preset | **Astro** |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

4. Add environment variables (see below).
5. Deploy.

### Subsequent deploys

Push to `main` — Vercel deploys automatically.

---

## Environment Variables

Set these in **Vercel → Project → Settings → Environment Variables** for Production, Preview, and Development.

| Variable | Value |
| --- | --- |
| `SMTP_USER` | Gmail address used to send contact notifications |
| `SMTP_PASS` | Gmail App Password (not your account password) |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form submissions |

**Gmail App Password:** Enable 2-step verification on your Google account, then go to **Google Account → Security → App Passwords** and create one for this site.

A local template is provided at `.env.example` — never commit actual credentials.

---

## Custom Domain (Cloudflare + Vercel)

1. In Vercel → **Project → Settings → Domains** — add `sudheeshreddy.com` and `www.sudheeshreddy.com`.
2. Vercel will show DNS records to add. In **Cloudflare DNS**:

| Host | Type | Value | Proxy |
| --- | --- | --- | --- |
| `@` | `A` | `76.76.21.21` | DNS only (grey cloud) during verification |
| `www` | `CNAME` | `cname.vercel-dns-0.com` | DNS only during verification |

3. Once Vercel shows the domain as **Valid** and HTTPS is issued, you can optionally switch Cloudflare records to **Proxied** for DDoS protection.
4. In Cloudflare → **SSL/TLS** → set to **Full (strict)** once Vercel HTTPS is active.
5. Vercel automatically redirects `www` → apex (or apex → `www`, configurable in Project → Domains).

---

## Project Structure

```
src/
├── components/        Nav, Footer, PageHero, ContentCard, CollectionIndex
├── content/           MDX content collections (foundations, ai-engineering, interview, projects, experience)
├── layouts/           BaseLayout, ArticleLayout, KBArticleLayout
├── pages/             File-based routing
│   ├── foundations/   python.astro, ai-ml.astro, statistics.astro + [slug].astro
│   ├── ai-engineering/ ai-engineer-roadmap.astro, llms-nlp.astro + [slug].astro
│   ├── experience/    static pages + [slug].astro
│   ├── interview/     [slug].astro
│   ├── projects/      [slug].astro
│   ├── 404.astro
│   ├── collaborate.astro
│   ├── contact.astro
│   └── index.astro
└── styles/            global.css (design tokens)

public/
├── site.js            Nav, mobile menu, contact form, scroll animations
├── robots.txt
└── favicon.svg

api/
└── contact.js         Vercel serverless function — rate-limited, validated email handler
```

---

## Production Checklist

- [ ] Environment variables set in Vercel dashboard
- [ ] Custom domain added and DNS verified in Vercel
- [ ] Contact form tested end-to-end after deploy
- [ ] Add `public/og-default.png` (1200×630px) for social sharing previews
- [ ] Submit `https://sudheeshreddy.com/sitemap-index.xml` to Google Search Console
- [ ] Smoke test on desktop and mobile after DNS propagation
