# Clavis authentication and billing pages

Added pages:

- `/login` — doctor sign-in UI
- `/signup` — account creation UI
- `/payment` — plan selection + checkout UI

These are intentionally frontend-first. For production:

1. Connect `/login` and `/signup` to your FastAPI authentication API.
2. Use secure, HTTP-only session cookies or short-lived access/refresh tokens.
3. Create Stripe Checkout Sessions on the server, not in the browser.
4. Never send raw card numbers/CVC to your FastAPI API. Let Stripe Elements or Stripe Checkout handle card data.
5. Handle Stripe webhooks server-side to activate/cancel subscriptions.
