# Bobba Tea Shop

A full-stack boba tea shop web app — a React + Vite frontend and an Express + TypeScript + MongoDB API.

## Project structure

```
bobba_shop/
├── backend/    # Express + TypeScript REST API (auth + cart)
└── frontend/   # React + Vite + Tailwind CSS client
```

## Prerequisites

- Node.js 18+ (tested on Node 26)
- npm

## Getting started

Clone the repository and install dependencies for each app.

```bash
git clone https://github.com/Honour-Boy/bobba-tea-shop.git
cd bobba-tea-shop
```

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then edit .env (see below)
npm run start:dev      # starts the API on http://localhost:5000
```

Environment variables (`backend/.env`):

| Variable            | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `CONNECTIONSTRING`  | MongoDB URI. **Leave empty** to spin up an automatic in-memory MongoDB.     |
| `PORT`              | Port the API listens on (defaults to `5000`).                               |
| `ACCESSTOKENSECRET` | Secret used to sign JWT access tokens. Use a long random string.            |

> **No database?** Leave `CONNECTIONSTRING` empty and the server boots an in-memory
> MongoDB automatically (downloads a Mongo binary on first run; data is ephemeral).
> To persist data, set `CONNECTIONSTRING` to a real MongoDB URI (e.g. MongoDB Atlas).

Backend scripts:

| Script              | Description                                          |
| ------------------- | ---------------------------------------------------- |
| `npm run start:dev` | Run with hot-reload via ts-node-dev.                 |
| `npm run build`     | Compile TypeScript to `dist/`.                       |
| `npm start`         | Compile and run the production build.                |

### Frontend

```bash
cd frontend
npm install
npm run dev            # starts the app on http://localhost:5173
```

Frontend scripts:

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server.           |
| `npm run build`   | Build for production.                |
| `npm run preview` | Preview the production build.        |
| `npm run lint`    | Run ESLint.                          |

The frontend talks to the backend API at `http://localhost:5000/api` by
default. To point it elsewhere, set `VITE_API_URL` in a `frontend/.env` file:

```
VITE_API_URL=http://localhost:5000/api
```

### Shopping & accounts

Browsing and ordering work **without an account** — the cart is kept in the
browser (`localStorage`). Each menu item uses a quantity stepper, and once the
cart has items the checkout panel docks to the right of the menu.

Checkout opens a **demo payment step** (a placeholder card form — do not enter
real details). The fields are validated (16-digit card number, name, a
non-expired `MM/YY` date, and a 3–4 digit CVC) and the **Pay** button stays
disabled until they're all valid. Paying shows an order confirmation.

After paying, a **receipt page** confirms the order (reference, items, total)
with options to return home, share, and — for guests — log in to save it.
Logging in is optional: a guest's order is stashed locally and saved to their
account on login, after which signed-in users can review their past orders on
the **Orders** page. The JWT is stored in `localStorage` and sent on
authenticated requests.

## API

Base URL: `http://localhost:5000`

| Method | Endpoint             | Auth | Description                     |
| ------ | -------------------- | ---- | ------------------------------- |
| POST   | `/api/user/register` | No   | Register a new user.            |
| POST   | `/api/user/login`    | No   | Log in and receive a JWT token. |
| POST   | `/api/cart/create`   | Yes  | Create a cart for the user.     |
| GET    | `/api/cart/user`     | Yes  | Get the current user's cart.    |
| PUT    | `/api/cart/user`     | Yes  | Update the current user's cart. |
| POST   | `/api/orders`        | Yes  | Place an order for the user.    |
| GET    | `/api/orders`        | Yes  | List the user's past orders.    |

Authenticated requests must include the JWT in an `auth-token` header.
Passwords must be at least 8 characters and include a number and a symbol.

## Tech stack

- **Frontend:** React, Vite, Tailwind CSS, React Router, Framer Motion, Axios
- **Backend:** Express, TypeScript, MongoDB/Mongoose, JWT, bcrypt, Joi

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
