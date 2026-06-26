-- Bobba Tea Shop — Supabase (Postgres) schema.
-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- The backend connects with the service-role key, so it bypasses Row Level
-- Security. RLS is therefore left disabled here (these tables are only ever
-- accessed by the trusted server, never directly from the browser).

-- Users ---------------------------------------------------------------------
create table if not exists public.users (
    id         uuid primary key default gen_random_uuid(),
    email      text not null unique,
    password   text not null,           -- bcrypt hash, never plaintext
    created_at timestamptz not null default now()
);

-- Carts (one per user) ------------------------------------------------------
create table if not exists public.carts (
    id         uuid primary key default gen_random_uuid(),
    user_id    uuid not null references public.users(id) on delete cascade,
    flavours   jsonb not null default '[]'::jsonb,   -- [{ name, count }]
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    unique (user_id)
);

-- Orders --------------------------------------------------------------------
create table if not exists public.orders (
    id         uuid primary key default gen_random_uuid(),
    user_id    uuid not null references public.users(id) on delete cascade,
    reference  text not null,
    items      jsonb not null default '[]'::jsonb,   -- [{ name, count, price }]
    total      numeric not null,
    created_at timestamptz not null default now()
);

create index if not exists orders_user_id_created_at_idx
    on public.orders (user_id, created_at desc);
