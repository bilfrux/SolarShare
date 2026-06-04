create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  description text not null,
  "imageUrl" text,
  "targetAmount" numeric(10,2) not null,
  "currentAmount" numeric(10,2) not null default 0,
  investors integer not null default 0,
  "returnRate" numeric(5,2) not null,
  category text not null,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.projects enable row level security;

-- Basic readable policy (will be altered by later migrations)
drop policy if exists "Projects are viewable by everyone" on public.projects;
create policy "Projects are viewable by everyone" on public.projects for select using (true);
