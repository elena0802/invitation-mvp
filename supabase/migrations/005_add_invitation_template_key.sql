alter table public.invitations
add column if not exists template_key text default 'bloom';

update public.invitations
set template_key = 'bloom'
where template_key is null;

alter table public.invitations
alter column template_key set default 'bloom';
