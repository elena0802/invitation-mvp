create extension if not exists "pgcrypto";

create table if not exists public.thank_you_cards (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  image_url text not null,
  groom_name text not null,
  bride_name text not null,
  message text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists thank_you_cards_public_id_idx
  on public.thank_you_cards (public_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_thank_you_cards_updated_at
  on public.thank_you_cards;

create trigger set_thank_you_cards_updated_at
before update on public.thank_you_cards
for each row
execute function public.set_updated_at();

alter table public.thank_you_cards enable row level security;
