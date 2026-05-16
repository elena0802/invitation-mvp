alter table public.invitations
add column if not exists card_type text not null default 'invitation';
