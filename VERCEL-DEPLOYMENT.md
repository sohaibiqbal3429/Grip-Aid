# Vercel Deployment

## Local commands

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run the production build locally:

```bash
npm run start
```

## Vercel project settings

- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave empty

## Required environment variables in Vercel

Set this in `Project Settings -> Environment Variables`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
CONTACT_TO_EMAIL=contact@your-domain.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SMTP_FROM="Automec Website <no-reply@your-domain.com>"
NEWSLETTER_API_URL=https://your-newsletter-api.com/subscriptions
NEWSLETTER_API_KEY=your-newsletter-api-key
NEWSLETTER_LIST_ID=your-newsletter-list-id
```

## Notes

- The site builds successfully without those variables, but the contact and newsletter forms need them at runtime.
- If you do not want newsletter signup yet, remove or hide that form before production, or configure the newsletter API variables.
- The image system is already production-safe: missing remote images fall back to generated artwork instead of breaking the page.
