# Vercel Deployment

## Commands

```bash
npm install
npm run build
npm run dev
npm run start
```

## Vercel project settings

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave empty

## Environment variables

Required for production metadata and SEO:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Required for the contact form:

```env
CONTACT_TO_EMAIL=contact@your-domain.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM="Automec Website <no-reply@your-domain.com>"
```

Required for the newsletter form:

```env
NEWSLETTER_API_URL=https://your-newsletter-api.com/subscriptions
NEWSLETTER_API_KEY=your-newsletter-api-key
NEWSLETTER_LIST_ID=your-newsletter-list-id
```

## Behavior without env vars

- The site still builds and deploys.
- If contact or newsletter variables are missing, those API routes now return `503` with a clear configuration message instead of a generic `500`.
- On Vercel, metadata now falls back to `VERCEL_PROJECT_PRODUCTION_URL` or `VERCEL_URL` when `NEXT_PUBLIC_SITE_URL` is not set.
