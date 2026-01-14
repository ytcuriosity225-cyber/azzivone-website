-- Supabase table and RLS setup

-- Products table (public read-only)
create table if not exists public.products (
  id bigint generated always as identity primary key,
  name text not null,
  price numeric not null,
  inventory int default 0,
  sales int default 0,
  status text,
  image text,
  bullets jsonb,
  created_at timestamptz default now()
);

-- Orders table
create table if not exists public.orders (
  id bigint generated always as identity primary key,
  product_id bigint not null references public.products(id) on delete restrict,
  quantity int not null,
  total numeric not null,
  name text,
  phone text,
  email text,
  address text,
  city text,
  payment_method text,
  courier text,
  notes text,
  user_id uuid,
  created_at timestamptz default now()
);

-- Hero (optional)
create table if not exists public.hero (
  id bigint generated always as identity primary key,
  title text,
  subtitle text,
  cta_text text,
  video_url text,
  logo_url text,
  created_at timestamptz default now()
);

-- Enable RLS on orders and products (we'll allow public SELECT on products explicitly)
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Allow anyone to SELECT products (public read-only)
create policy "public_select_products" on public.products
  for select using (true);

-- Allow authenticated users to INSERT orders
create policy "insert_orders_authenticated" on public.orders
  for insert with check (auth.role() = 'authenticated');

-- Allow admins (custom claim user_role = 'admin') to SELECT orders
-- Supabase exposes custom claims via current_setting('jwt.claims.<claim>', true)
create policy "select_orders_admin_only" on public.orders
  for select using (current_setting('jwt.claims.user_role', true) = 'admin');

-- Optionally allow admin to full access
create policy "full_access_admin_orders" on public.orders
  for all using (current_setting('jwt.claims.user_role', true) = 'admin');

-- Make sure to configure your JWT to include custom claim `user_role` for admin users.
