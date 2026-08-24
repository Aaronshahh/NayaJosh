-- Run this in the Supabase SQL Editor once.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  event_key text not null check (event_key in ('sangeet', 'wedding')),
  event_name text not null,
  attending boolean not null,
  guest_count integer not null default 1 check (guest_count >= 0 and guest_count <= 6),
  message text,
  event_date text,
  event_time text,
  event_location text
);

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
create index if not exists rsvps_event_key_idx on public.rsvps (event_key);
create index if not exists rsvps_email_idx on public.rsvps (email);

-- Server uses the service role key, so RLS can stay on with no public policies.
alter table public.rsvps enable row level security;
