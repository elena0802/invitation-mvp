create extension if not exists "pgcrypto";

create table if not exists public.invitations (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  title text not null,
  groom_name text not null,
  bride_name text not null,
  wedding_date date not null,
  venue text not null,
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists invitations_public_id_idx
  on public.invitations (public_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_invitations_updated_at on public.invitations;

create trigger set_invitations_updated_at
before update on public.invitations
for each row
execute function public.set_updated_at();

alter table public.invitations enable row level security;
