-- Public site: read active listings only. Admin writes use SUPABASE_SERVICE_ROLE_KEY (bypasses RLS).
alter table public.listings enable row level security;

drop policy if exists "Public read active listings" on public.listings;
create policy "Public read active listings"
  on public.listings
  for select
  to anon, authenticated
  using (status = 'active');
