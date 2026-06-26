# Bobba Tea Shop

A boba tea shop web app — a React + Vite frontend backed by **Supabase**
(Postgres + Auth). There's no custom server: the frontend talks to Supabase
directly, with access controlled by Row Level Security.

**🔗 Live demo:** https://bobba-shop.netlify.app

## Project structure

```
bobba_shop/
├── frontend/         # React + Vite + Tailwind CSS client
└── supabase/
    └── schema.sql    # Database tables + RLS policies
```

## Prerequisites

- Node.js 18+ (tested on Node 26)
- npm
- A free [Supabase](https://supabase.com) project

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. **Database:** open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and **Run**. This creates the
   `orders` and `carts` tables with RLS policies so each user can only access
   their own rows.
3. **Auth providers:** under **Authentication → Providers**, enable
   **Email** and **Google** (for Google, add your Google OAuth client ID/secret
   and copy Supabase's callback URL into the Google Cloud Console OAuth client's
   *Authorized redirect URIs*).
4. **Auth URLs:** under **Authentication → URL Configuration**, set the
   **Site URL** and add your deploy + local origins to **Redirect URLs**
   (e.g. `https://bobba-shop.netlify.app/**` and `http://localhost:5173/**`).
5. **API keys:** from **Project Settings → API**, grab the **Project URL** and
   **anon/publishable key** for the frontend env (below).

## Getting started

```bash
git clone https://github.com/Honour-Boy/bobba-tea-shop.git
cd bobba-tea-shop/frontend
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # starts the app on http://localhost:5173
```

Frontend environment variables (`frontend/.env`):

| Variable                 | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `VITE_SUPABASE_URL`      | Supabase project URL (e.g. `https://xxxx.supabase.co`).|
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/publishable key (safe in the frontend).  |

Frontend scripts:

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server.           |
| `npm run build`   | Build for production (`dist/`).      |
| `npm run preview` | Preview the production build.        |
| `npm run lint`    | Run ESLint.                          |

## How it works

### Auth

Authentication is handled entirely by **Supabase Auth**:

- **Google** — `supabase.auth.signInWithOAuth({ provider: "google" })`.
- **Email/password** — `supabase.auth.signUp` / `signInWithPassword`.

`AuthContext` tracks the session via `getSession()` + `onAuthStateChange`, so
the UI reacts to login, logout, token refresh, and the OAuth redirect.

### Shopping & accounts

Browsing and ordering work **without an account** — the cart is kept in the
browser (`localStorage`). Each menu item uses a quantity stepper, and once the
cart has items the checkout panel docks to the right of the menu.

Checkout opens a **demo payment step** (a placeholder card form — do not enter
real details). The fields are validated (16-digit card number, name, a
non-expired `MM/YY` date, and a 3–4 digit CVC) and the **Pay** button stays
disabled until they're all valid. Paying shows an order confirmation.

After paying, a **receipt page** confirms the order (reference, items, total).
A guest's order is stashed locally and saved to their account on login, after
which signed-in users can review their past orders on the **Orders** page.

### Data

Orders and the saved cart live in Supabase tables and are read/written directly
from the frontend with the anon key. **Row Level Security** restricts every row
to its owner (`auth.uid() = user_id`):

- `orders` — `{ reference, items, total, created_at }` per user.
- `carts` — one row per user holding the saved `flavours`.

## Deployment

The frontend is a static build deployed to **Netlify**.

- Build command: `npm run build` (base directory `frontend/`), publish `dist/`.
- A `_redirects` rule (`/* /index.html 200`) makes client-side routes work on
  reload — see [`frontend/public/_redirects`](frontend/public/_redirects).
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as build environment
  variables (or bake them in at build time).

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Framer Motion
- **Backend-as-a-service:** Supabase (Postgres, Auth, Row Level Security)

## Development workflow

Work lands through short-lived branches that flow into `main` via `staging`:

1. Branch each change off `staging` as an independent `feat/*` or `fix/*`
   (or `docs/*`) branch.
2. Merge the completed branch into `staging` (`--no-ff`) and verify there.
3. Once `staging` is good, merge `staging` into `main`.

```
feat/* | fix/*  ─►  staging  ─►  main
```

So `main` always reflects what has been integrated and verified on `staging`,
and every feature/fix keeps its own history.
