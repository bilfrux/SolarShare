create extension if not exists pgcrypto;

create table if not exists public.investments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id uuid not null references public.projects(id) on delete cascade,
  amount numeric(10,2) not null check (amount >= 20),
  created_at timestamptz not null default now()
);

create index if not exists investments_user_id_idx on public.investments (user_id);
create index if not exists investments_project_id_idx on public.investments (project_id);

alter table public.investments enable row level security;

drop policy if exists "Users can read their own investments" on public.investments;
create policy "Users can read their own investments"
  on public.investments
  for select
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own investments" on public.investments;
create policy "Users can create their own investments"
  on public.investments
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own investments" on public.investments;
create policy "Users can update their own investments"
  on public.investments
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own investments" on public.investments;
create policy "Users can delete their own investments"
  on public.investments
  for delete
  using (auth.uid() = user_id);
