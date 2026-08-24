-- Run this in the Supabase SQL Editor once.

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  event_key text not null check (event_key in ('sangeet', 'wedding')),
  event_name text not null,
  attending boolean not null,
  guest_count integer not null default 0 check (guest_count >= 0 and guest_count <= 5),
  guest_names text[] not null default '{}'::text[],
  invitee_responses jsonb not null default '[]'::jsonb,
  message text,
  event_date text,
  event_time text,
  event_location text
);

-- Safe to run against an existing RSVP table.
alter table public.rsvps
  add column if not exists guest_names text[] not null default '{}'::text[],
  add column if not exists invitee_responses jsonb not null default '[]'::jsonb;

create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);
create index if not exists rsvps_event_key_idx on public.rsvps (event_key);
create index if not exists rsvps_email_idx on public.rsvps (email);

-- Server uses the service role key, so RLS can stay on with no public policies.
alter table public.rsvps enable row level security;

-- Invitation parties power the RSVP name search. party_size_limit includes
-- the named invitees, so the number of additional guests allowed is:
-- party_size_limit - cardinality(invited_names).
create table if not exists public.invite_parties (
  id uuid primary key default gen_random_uuid(),
  event_key text not null check (event_key in ('sangeet', 'wedding')),
  display_name text not null,
  invited_names text[] not null,
  party_size_limit integer not null check (party_size_limit > 0),
  sort_order integer not null check (sort_order > 0),
  constraint invite_parties_has_names check (cardinality(invited_names) > 0),
  constraint invite_parties_capacity_covers_invitees
    check (party_size_limit >= cardinality(invited_names)),
  constraint invite_parties_event_display_name_key unique (event_key, display_name),
  constraint invite_parties_event_sort_order_key unique (event_key, sort_order)
);

alter table public.rsvps
  add column if not exists invite_party_id uuid references public.invite_parties(id);

create index if not exists invite_parties_event_key_idx
  on public.invite_parties (event_key);
create index if not exists rsvps_invite_party_id_idx
  on public.rsvps (invite_party_id);

-- Server routes use the service role key; invite data should not be public.
alter table public.invite_parties enable row level security;

insert into public.invite_parties
  (event_key, sort_order, display_name, invited_names, party_size_limit)
values
  ('sangeet', 1, 'Abdesh and Anju Jha', array['Abdesh Jha', 'Anju Jha'], 5),
  ('sangeet', 2, 'Bilal and Sirin Khokar', array['Bilal Khokar', 'Sirin Khokar'], 2),
  ('sangeet', 3, 'Dr. Ted Saha', array['Dr. Ted Saha'], 2),
  ('sangeet', 4, 'Dr. Andy Saha', array['Dr. Andy Saha'], 2),
  ('sangeet', 5, 'Alvin Saha', array['Alvin Saha'], 5),
  ('sangeet', 6, 'Pramod Mahaseth', array['Pramod Mahaseth'], 4),
  ('sangeet', 7, 'Manoj Shah', array['Manoj Shah'], 4),
  ('sangeet', 8, 'Gudia Shah', array['Gudia Shah'], 3),
  ('sangeet', 9, 'Dr. Amit Shah', array['Dr. Amit Shah'], 3),
  ('sangeet', 10, 'Srikanth S', array['Srikanth S'], 2),
  ('sangeet', 11, 'Manpreet', array['Manpreet'], 2),
  ('sangeet', 12, 'Dr. Subash Thakur', array['Dr. Subash Thakur'], 3),
  ('sangeet', 13, 'Dr. Hemchand Mahaseth', array['Dr. Hemchand Mahaseth'], 2),
  ('sangeet', 14, 'Suresh Shah', array['Suresh Shah'], 3),
  ('sangeet', 15, 'Murari', array['Murari'], 3),
  ('sangeet', 16, 'Jyoti and Prem', array['Jyoti', 'Prem'], 2),
  ('sangeet', 17, 'Dr. Krishna Mohan Purbey', array['Dr. Krishna Mohan Purbey'], 2),
  ('sangeet', 18, 'Dr. Sristi and Dr. Ravi', array['Dr. Sristi', 'Dr. Ravi'], 2),
  ('sangeet', 19, 'Renuka Singh', array['Renuka Singh'], 1),
  ('sangeet', 20, 'Madhu Singh', array['Madhu Singh'], 2),
  ('sangeet', 21, 'Dr. Sristy', array['Dr. Sristy'], 1),
  ('sangeet', 22, 'Dr. Sujit and Archana', array['Dr. Sujit', 'Archana'], 2),
  ('sangeet', 23, 'Rajendra and Amrita Mahato', array['Rajendra Mahato', 'Amrita Mahato'], 6),
  ('sangeet', 24, 'Dr. Utpal Anand', array['Dr. Utpal Anand'], 2),
  ('sangeet', 25, 'Sanjay and Sabita Sah', array['Sanjay Sah', 'Sabita Sah'], 4),
  ('sangeet', 26, 'Anand Mishra', array['Anand Mishra'], 3),
  ('wedding', 1, 'Abdesh Jha', array['Abdesh Jha'], 5),
  ('wedding', 2, 'Bilal and Sirin', array['Bilal', 'Sirin'], 5),
  ('wedding', 3, 'Dr. Ted Saha', array['Dr. Ted Saha'], 2),
  ('wedding', 4, 'Andy Saha', array['Andy Saha'], 2),
  ('wedding', 5, 'Alvin Saha', array['Alvin Saha'], 5),
  ('wedding', 6, 'Pramod Mahaseth', array['Pramod Mahaseth'], 4),
  ('wedding', 7, 'Manoj Shah', array['Manoj Shah'], 4),
  ('wedding', 8, 'Guria Shah', array['Guria Shah'], 3),
  ('wedding', 9, 'Dr. Amit Shah', array['Dr. Amit Shah'], 3),
  ('wedding', 10, 'Kamal and Sonia', array['Kamal', 'Sonia'], 2),
  ('wedding', 11, 'Srikanth S', array['Srikanth S'], 2),
  ('wedding', 12, 'Manpreet', array['Manpreet'], 2),
  ('wedding', 13, 'Dr. Subash Thakur', array['Dr. Subash Thakur'], 3),
  ('wedding', 14, 'Dr. Hemchand Mahaseth', array['Dr. Hemchand Mahaseth'], 2),
  ('wedding', 15, 'Suresh Shah', array['Suresh Shah'], 3),
  ('wedding', 16, 'Murari', array['Murari'], 3),
  ('wedding', 17, 'Jyoti and Prem', array['Jyoti', 'Prem'], 2),
  ('wedding', 18, 'Dr. Krishna Mohan Purbey', array['Dr. Krishna Mohan Purbey'], 2),
  ('wedding', 19, 'Dr. Sristi and Dr. Ravi', array['Dr. Sristi', 'Dr. Ravi'], 2),
  ('wedding', 20, 'Renuka Singh', array['Renuka Singh'], 1),
  ('wedding', 21, 'Madhu Singh', array['Madhu Singh'], 2),
  ('wedding', 22, 'Dr. Sristy', array['Dr. Sristy'], 1),
  ('wedding', 23, 'Swapna and Biswanath', array['Swapna', 'Biswanath'], 2),
  ('wedding', 24, 'Dr. Sujit and Archana', array['Dr. Sujit', 'Archana'], 2),
  ('wedding', 25, 'Rajendra and Amrita Mahato', array['Rajendra Mahato', 'Amrita Mahato'], 6),
  ('wedding', 26, 'Dr. Utpal Anand', array['Dr. Utpal Anand'], 2),
  ('wedding', 27, 'Dr. Manohar Sah', array['Dr. Manohar Sah'], 2),
  ('wedding', 28, 'Dr. Satyendra Mandal', array['Dr. Satyendra Mandal'], 2),
  ('wedding', 29, 'Sanjay and Sabita Sah', array['Sanjay Sah', 'Sabita Sah'], 4),
  ('wedding', 30, 'Anand Mishra', array['Anand Mishra'], 3),
  ('wedding', 31, 'Burhan and Shookri', array['Burhan', 'Shookri'], 2)
on conflict (event_key, display_name) do update set
  invited_names = excluded.invited_names,
  party_size_limit = excluded.party_size_limit,
  sort_order = excluded.sort_order;
