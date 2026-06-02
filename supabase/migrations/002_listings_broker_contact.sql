-- Broker contact fields on listings
alter table public.listings
  add column if not exists broker_name text,
  add column if not exists broker_email text,
  add column if not exists broker_phone text,
  add column if not exists broker_company text;
