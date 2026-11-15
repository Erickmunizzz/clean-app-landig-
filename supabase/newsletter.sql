-- Reference schema already applied to production. Do not rerun on existing tables.
-- Inserts go through the server Edge Function using service_role and RPC.
-- anon has no direct INSERT or SELECT privileges. Never expose service_role.
grant usage on schema private to service_role;
create table private.marketing_admins(user_id uuid primary key references auth.users(id) on delete cascade);
alter table private.marketing_admins enable row level security;
revoke all on private.marketing_admins from public,anon,authenticated;
insert into private.marketing_admins(user_id)
select u.id from auth.users u join public.profiles p on p.id=u.id
where lower(u.email)='royyallstore@gmail.com' and u.email_confirmed_at is not null and p.role='owner' and p.is_active;
create function private.is_marketing_admin() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from private.marketing_admins a where a.user_id=auth.uid()); $$;
revoke all on function private.is_marketing_admin() from public,anon; grant execute on function private.is_marketing_admin() to authenticated;
create function public.marketing_admin_access() returns boolean language sql stable security invoker set search_path='' as $$select private.is_marketing_admin();$$;
revoke all on function public.marketing_admin_access() from public,anon; grant execute on function public.marketing_admin_access() to authenticated;
create table public.newsletter_subscribers(
 id uuid primary key default gen_random_uuid(), email text not null unique,
 status text not null default 'subscribed' check(status in ('subscribed','unsubscribed')),
 consent_version text not null default 'cleanma-marketing-v1', consented_at timestamptz not null default now(),
 source text not null default 'landing_footer',created_at timestamptz not null default now(),
 check(email=lower(btrim(email)) and length(email)<=254 and email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$')
);
alter table public.newsletter_subscribers enable row level security;
revoke all on public.newsletter_subscribers from public,anon,authenticated;
grant select on public.newsletter_subscribers to authenticated; grant all on public.newsletter_subscribers to service_role;
create policy newsletter_marketing_read on public.newsletter_subscribers for select to authenticated using((select private.is_marketing_admin()));
create index newsletter_subscribers_created_idx on public.newsletter_subscribers(created_at desc,id);
create table private.newsletter_rate_limits(ip_hash text primary key, window_started_at timestamptz not null, attempts integer not null);
alter table private.newsletter_rate_limits enable row level security;
revoke all on private.newsletter_rate_limits from public,anon,authenticated; grant all on private.newsletter_rate_limits to service_role;
create function public.subscribe_newsletter(email_input text,ip_hash_input text) returns void language plpgsql security invoker set search_path='' as $$
declare attempts_now integer;
begin
 if length(ip_hash_input)<>64 or email_input<>lower(btrim(email_input)) or length(email_input)>254 or email_input !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'Invalid submission';end if;
 insert into private.newsletter_rate_limits values(ip_hash_input,now(),1)
 on conflict(ip_hash) do update set attempts=case when newsletter_rate_limits.window_started_at<now()-interval '15 minutes' then 1 else newsletter_rate_limits.attempts+1 end,window_started_at=case when newsletter_rate_limits.window_started_at<now()-interval '15 minutes' then now() else newsletter_rate_limits.window_started_at end returning attempts into attempts_now;
 if attempts_now>5 then raise exception 'RATE_LIMIT';end if;
 insert into public.newsletter_subscribers(email) values(email_input) on conflict(email) do nothing;
 delete from private.newsletter_rate_limits where window_started_at<now()-interval '1 day';
end;$$;
revoke all on function public.subscribe_newsletter(text,text) from public,anon,authenticated; grant execute on function public.subscribe_newsletter(text,text) to service_role;
