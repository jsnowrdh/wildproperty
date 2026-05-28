-- WildProperty listings table
create table if not exists public.listings (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  type text not null check (type in ('campground', 'glamping-retreat', 'rv-park', 'nature-resort')),
  city text not null,
  state text not null,
  price bigint not null,
  acreage numeric not null,
  description text not null,
  sites integer,
  gross_revenue text,
  noi text,
  occupancy text,
  image_url text not null,
  status text not null default 'active' check (status in ('active', 'draft', 'sold')),
  created_at timestamptz not null default now()
);

create index if not exists listings_status_idx on public.listings (status);
create index if not exists listings_type_state_idx on public.listings (type, state);
create index if not exists listings_slug_idx on public.listings (slug);

alter table public.listings enable row level security;

create policy "Public can read active listings"
  on public.listings
  for select
  using (status = 'active');

-- Seed data (run once; skip if slugs already exist)
insert into public.listings (
  slug, title, type, city, state, price, acreage, description, sites,
  gross_revenue, noi, occupancy, image_url, status
) values
  (
    'blue-ridge-glamping',
    'Blue Ridge Glamping Retreat',
    'glamping-retreat',
    'Asheville',
    'NC',
    1250000,
    22,
    'Blue Ridge Glamping Retreat is a turnkey luxury outdoor hospitality asset in the heart of the Blue Ridge Mountains near Asheville. The property features 14 fully outfitted safari-style tents with en-suite bathrooms, a central lodge with commercial kitchen and event space, and panoramic mountain views.',
    14,
    '$890K',
    '$420K',
    '72%',
    'https://images.unsplash.com/photo-1632367294096-4e77d53c4ae9?auto=format&fit=crop&w=1200&q=80',
    'active'
  ),
  (
    'riverbend-rv-park',
    'Riverbend RV Park',
    'rv-park',
    'Bend',
    'OR',
    875000,
    8,
    'Riverbend RV Park sits on 8 acres along the Deschutes River in Central Oregon. The park includes 45 full-hookup sites, a club house, laundry, and river access.',
    45,
    '$620K',
    '$310K',
    '68%',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    'active'
  ),
  (
    'pinecrest-family',
    'Pinecrest Family Campground',
    'campground',
    'Lake Tahoe',
    'CA',
    2100000,
    47,
    'Pinecrest Family Campground is a legacy outdoor hospitality asset on 47 acres near Lake Tahoe with 80 sites, a swimming pool, recreation hall, and general store.',
    80,
    '$1.4M',
    '$680K',
    '78%',
    'https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?auto=format&fit=crop&w=1200&q=80',
    'active'
  ),
  (
    'coastal-pines-nature-resort',
    'Coastal Pines Nature Resort',
    'nature-resort',
    'Olympic Peninsula',
    'WA',
    3400000,
    112,
    'Coastal Pines Nature Resort spans 112 acres of coastal forest on Washington''s Olympic Peninsula with 12 custom-built cabins and trail systems.',
    12,
    '$1.1M',
    '$520K',
    '61%',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'active'
  ),
  (
    'desert-star-glamping',
    'Desert Star Glamping',
    'glamping-retreat',
    'Sedona',
    'AZ',
    640000,
    6,
    'Desert Star Glamping is a boutique glamping operation on 6 acres surrounded by Sedona''s iconic red rock formations with six custom safari tents.',
    6,
    '$480K',
    '$245K',
    '85%',
    'https://images.unsplash.com/photo-1676766268952-f959fff2945b?auto=format&fit=crop&w=1200&q=80',
    'active'
  ),
  (
    'lakeside-haven-campground',
    'Lakeside Haven Campground',
    'campground',
    'Boundary Waters',
    'MN',
    990000,
    35,
    'Lakeside Haven Campground offers 35 acres of lakefront property at the gateway to Minnesota''s Boundary Waters Canoe Area with 60 campsites and canoe rentals.',
    60,
    '$720K',
    '$340K',
    '82%',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
    'active'
  )
on conflict (slug) do nothing;
