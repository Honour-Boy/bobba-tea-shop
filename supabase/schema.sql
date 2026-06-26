-- Bobba Tea Shop — Supabase schema (Supabase-native: the frontend talks to
-- Supabase directly using the anon key, protected by Row Level Security).
--
-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Auth is handled by Supabase (auth.users); these tables reference it.
--
-- NOTE: This drops and recreates the tables. It removes the old Express-backend
-- tables (which had a `users` table and foreign keys pointing at it) and any
-- rows in them. Safe for a fresh project; back up first if you have real data.

drop table if exists public.orders cascade;
drop table if exists public.carts cascade;
drop table if exists public.users cascade;  -- obsolete: auth is now auth.users

-- Orders --------------------------------------------------------------------
create table public.orders (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  reference  text not null,
  items      jsonb not null default '[]'::jsonb,   -- [{ name, count, price }]
  total      numeric not null,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "orders_select_own" on public.orders
  for select using (auth.uid() = user_id);

create policy "orders_insert_own" on public.orders
  for insert with check (auth.uid() = user_id);

create index orders_user_created_idx
  on public.orders (user_id, created_at desc);

-- Carts (one row per user) --------------------------------------------------
create table public.carts (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  flavours   jsonb not null default '[]'::jsonb,   -- [{ name, count }]
  updated_at timestamptz not null default now()
);

alter table public.carts enable row level security;

-- A single policy covering select/insert/update/delete for the owner.
create policy "carts_own" on public.carts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
