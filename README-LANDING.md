# Clavis landing page

The public landing page is `/` and the existing doctor workspace is now `/dashboard`.

Routes:

- `/` — Clavis landing page
- `/login` — doctor login
- `/signup` — account creation
- `/forgot-credentials` — account recovery
- `/payment` — plan/payment UI
- `/dashboard` — medical scribe workspace

The landing page uses the existing neutral/premium green visual system and keeps the Clavis logo mark.

Build locally:

```bash
npm install
npm run dev
```

Production Docker:

```bash
docker build -t clavis-frontend .
docker run --rm -p 3000:3000 -e NUXT_PUBLIC_API_BASE=https://api.example.com clavis-frontend
```
