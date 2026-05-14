# Sudheesh Knowledge Journal

Static single-file portfolio and knowledge journal prepared for a no-cost Vercel deployment.

## Project Shape

- `index.html` is the production entry point Vercel serves.
- `sudheesh_journal_v3.html` is kept as the original source copy.
- `vercel.json` adds clean URLs and baseline security headers.
- No build step, server, database, paid storage, or paid Vercel feature is required.

## Deploy On Vercel

Recommended production flow:

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New Project** and import that repository.
3. Use these project settings:
   - Framework Preset: `Other`
   - Build Command: leave empty
   - Output Directory: leave empty
   - Install Command: leave empty
4. Deploy on the Vercel Hobby plan.

CLI alternative:

```bash
npm i -g vercel
vercel login
vercel --prod
```

The CLI may ask to link/create a project. Choose the current directory and keep the defaults for a static project.

## Cloudflare DNS

After Vercel creates the production deployment:

1. Add the domain in Vercel under **Project Settings > Domains**.
2. In Cloudflare DNS, remove conflicting `A`, `AAAA`, or `CNAME` records for the same host.
3. Add these records:

| Host | Type | Target | Proxy |
| --- | --- | --- | --- |
| `@` | `A` | `76.76.21.21` | DNS only while Vercel verifies |
| `www` | `CNAME` | `cname.vercel-dns-0.com` | DNS only while Vercel verifies |

4. Run Vercel's domain inspection after adding the domain and use any project-specific values it recommends over the general values above.
5. Once Vercel shows the domain as valid and HTTPS is issued, optionally switch Cloudflare records to proxied if you want Cloudflare HTTP protection/caching in front of Vercel.
6. In Cloudflare SSL/TLS settings, use **Full** or **Full (strict)** after Vercel HTTPS is active.

## Cost Controls

- Use Vercel Hobby for static hosting.
- Keep the project static: no serverless functions, analytics add-ons, image optimization pipeline, database, cron jobs, or paid storage.
- Keep Cloudflare on the Free plan for DNS and standard proxying.
- Use Google Fonts directly from the browser; there is no hosting cost.

## Production Checklist

- Confirm contact form behavior. It currently shows an in-browser success message and does not send email.
- Verify the final custom domain and `www` redirect preference in Vercel.
- Run a browser smoke test on desktop and mobile after DNS propagation.
- Keep `.vercel` out of git because it contains local project-link metadata.
