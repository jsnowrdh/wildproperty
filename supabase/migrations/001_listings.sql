-- WildProperty listings table
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  type text not null,
  city text not null,
  state text not null,
  price numeric not null,
  acreage numeric not null,
  description text not null,
  sites integer,
  gross_revenue text,
  noi text,
  occupancy text,
  image_url text not null,
  status text not null default 'active',
  created_at timestamp not null default now()
);

-- Allow service role and direct API access without RLS restrictions
alter table public.listings disable row level security;
