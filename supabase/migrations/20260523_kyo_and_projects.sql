-- Create profiles for KYC
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  kyc_status text not null default 'none' check (kyc_status in ('none', 'pending', 'verified', 'rejected')),
  kyc_document_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS for profiles
alter table public.profiles enable row level security;
drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Add status to projects table
alter table public.projects 
add column if not exists status text not null default 'approved' check (status in ('pending', 'approved', 'rejected')),
add column if not exists owner_id uuid references auth.users(id) on delete cascade;

-- Update RLS for projects
alter table public.projects enable row level security;
drop policy if exists "Projects are viewable by everyone" on public.projects;
drop policy if exists "Approved projects" on public.projects;
drop policy if exists "Insert project" on public.projects;

create policy "Approved projects" on public.projects 
  for select using (status = 'approved' or auth.uid() = owner_id);

create policy "Insert project" on public.projects
  for insert with check (auth.uid() = owner_id);

