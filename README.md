# Brigade
**The offline shift toolkit for professional chefs.**

## Stack
- **Framework:** SvelteKit
- **Deployment:** Vercel (via GitHub Actions)
- **Payments:** Stripe Checkout (one-time)
- **Storage:** localStorage + IndexedDB (client-side only)
- **Offline:** vite-plugin-pwa (Service Worker + Cache API)

---

## Local Setup

```bash
npm install
cp .env.example .env
# Fill in your Stripe keys and PRO_TOKEN_SECRET
npm run dev
```

---

## Environment Variables

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | Stripe secret key (server-side) |
| `PUBLIC_STRIPE_KEY` | Stripe publishable key (client-side) |
| `PRO_TOKEN_SECRET` | Random secret for Pro token signing — `openssl rand -hex 32` |

---

## GitHub Actions → Vercel Setup

1. Create project on Vercel, link to this repo
2. Get your `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` from Vercel dashboard
3. Add to GitHub repo → Settings → Secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - `PUBLIC_STRIPE_KEY`
4. Add env vars directly in Vercel dashboard (for server secrets):
   - `STRIPE_SECRET_KEY`
   - `PRO_TOKEN_SECRET`

Push to `main` → GitHub Actions builds → Deploys to Vercel automatically.

---

## Build Phases

- **Phase 1** — Recipe Scaler, Allergen Reference, Conversions, Timers ← *current*
- **Phase 2** — Station Checklists, PWA polish
- **Phase 3** — Pro tier, Stripe, Banquet Calculator, Chef's Notebook
- **Phase 4** — Shift Briefs (serverless + KV)
- **Phase 5** — Landing page, launch

---

## Pro Status

Pro is stored in `localStorage` after server-verified Stripe payment.
No account required. No sync. Fully offline once activated.
