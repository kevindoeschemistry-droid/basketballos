-- ============================================================
-- BasketballOS — Supabase Schema
-- ============================================================
-- Run this in the Supabase SQL Editor to create all tables.
-- Assumes Supabase Auth is enabled (auth.users).
-- ============================================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================================
-- 1. ORGANIZATIONS
-- ============================================================
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 2. TEAMS
-- ============================================================
create table public.teams (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade not null,
  name text not null,
  slug text not null,
  season text,
  level text, -- e.g. Varsity, JV, Freshman
  mascot text,
  primary_color text default '#1e40af',
  secondary_color text default '#f59e0b',
  logo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(organization_id, slug)
);

-- ============================================================
-- 3. PROFILES (linked to auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  avatar_url text,
  role text not null default 'player'
    check (role in ('super_admin','admin','head_coach','assistant_coach','team_manager','parent','player','resident_life','athletic_director')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 4. TEAM MEMBERSHIPS
-- ============================================================
create table public.team_memberships (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  role text not null default 'player'
    check (role in ('head_coach','assistant_coach','team_manager','parent','player','resident_life','athletic_director')),
  joined_at timestamptz default now(),
  unique(team_id, profile_id)
);

-- ============================================================
-- 5. PLAYERS
-- ============================================================
create table public.players (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete set null,
  first_name text not null,
  last_name text not null,
  jersey_number text,
  position text, -- PG, SG, SF, PF, C
  grade text,
  height text,
  weight text,
  photo_url text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 6. PLAYER GUARDIANS
-- ============================================================
create table public.player_guardians (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references public.players(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete set null,
  guardian_name text not null,
  relationship text, -- Mother, Father, Guardian
  email text,
  phone text,
  is_primary boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- 7. EVENTS
-- ============================================================
create table public.events (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  title text not null,
  event_type text not null
    check (event_type in ('practice','game','tournament','film_session','conditioning','team_meeting','volunteer_event','travel')),
  start_time timestamptz not null,
  end_time timestamptz,
  location text,
  opponent text,
  arrival_time timestamptz,
  uniform text,
  notes text,
  transportation_notes text,
  is_cancelled boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 8. EVENT RSVPs
-- ============================================================
create table public.event_rsvps (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade not null,
  player_id uuid references public.players(id) on delete cascade not null,
  status text not null default 'unknown'
    check (status in ('available','late','not_available','unknown')),
  notes text,
  responded_at timestamptz default now(),
  unique(event_id, player_id)
);

-- ============================================================
-- 9. ATTENDANCE RECORDS (per event)
-- ============================================================
create table public.attendance_records (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade not null,
  team_id uuid references public.teams(id) on delete cascade not null,
  submitted_by uuid references public.profiles(id) on delete set null,
  submitted_at timestamptz default now(),
  sent_to_resident_life boolean default false,
  sent_at timestamptz,
  delivery_status text default 'pending'
    check (delivery_status in ('pending','sent','delivered','failed')),
  notes text,
  unique(event_id)
);

-- ============================================================
-- 10. ATTENDANCE ENTRIES (per player per event)
-- ============================================================
create table public.attendance_entries (
  id uuid primary key default gen_random_uuid(),
  attendance_record_id uuid references public.attendance_records(id) on delete cascade not null,
  player_id uuid references public.players(id) on delete cascade not null,
  status text not null
    check (status in ('present','excused_absent','unexcused_absent','late','injured')),
  notes text,
  unique(attendance_record_id, player_id)
);

-- ============================================================
-- 11. ANNOUNCEMENTS
-- ============================================================
create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  body text not null,
  audience text not null default 'everyone'
    check (audience in ('everyone','players','parents','staff')),
  is_pinned boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 12. ANNOUNCEMENT READS
-- ============================================================
create table public.announcement_reads (
  id uuid primary key default gen_random_uuid(),
  announcement_id uuid references public.announcements(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  read_at timestamptz default now(),
  unique(announcement_id, profile_id)
);

-- ============================================================
-- 13. GAMES
-- ============================================================
create table public.games (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete set null,
  team_id uuid references public.teams(id) on delete cascade not null,
  opponent text not null,
  game_date timestamptz not null,
  location text,
  home_away text check (home_away in ('home','away','neutral')),
  team_score integer,
  opponent_score integer,
  result text check (result in ('win','loss','tie',null)),
  notes text,
  hudl_link text,
  maxpreps_link text,
  film_link text,
  postgame_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 14. PLAYER GAME STATS
-- ============================================================
create table public.player_game_stats (
  id uuid primary key default gen_random_uuid(),
  game_id uuid references public.games(id) on delete cascade not null,
  player_id uuid references public.players(id) on delete cascade not null,
  minutes integer default 0,
  points integer default 0,
  rebounds integer default 0,
  assists integer default 0,
  steals integer default 0,
  blocks integer default 0,
  turnovers integer default 0,
  fouls integer default 0,
  fg_made integer default 0,
  fg_attempted integer default 0,
  three_made integer default 0,
  three_attempted integer default 0,
  ft_made integer default 0,
  ft_attempted integer default 0,
  created_at timestamptz default now(),
  unique(game_id, player_id)
);

-- ============================================================
-- 15. PRACTICE PLANS
-- ============================================================
create table public.practice_plans (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  event_id uuid references public.events(id) on delete set null,
  title text not null,
  practice_date date not null,
  total_duration integer, -- minutes
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 16. PRACTICE PLAN BLOCKS
-- ============================================================
create table public.practice_plan_blocks (
  id uuid primary key default gen_random_uuid(),
  practice_plan_id uuid references public.practice_plans(id) on delete cascade not null,
  sort_order integer not null default 0,
  block_type text not null
    check (block_type in ('warmup','shooting','ball_handling','defensive_work','scrimmage','conditioning','film','other')),
  title text not null,
  duration integer not null, -- minutes
  instructions text,
  coaching_points text,
  equipment text,
  created_at timestamptz default now()
);

-- ============================================================
-- 17. PLAYER DEVELOPMENT NOTES
-- ============================================================
create table public.player_development_notes (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references public.players(id) on delete cascade not null,
  coach_id uuid references public.profiles(id) on delete set null,
  category text not null
    check (category in ('shooting','ball_handling','passing','defense','rebounding','conditioning','leadership','effort')),
  note_type text not null default 'note'
    check (note_type in ('strength','growth_area','goal','note','evaluation')),
  content text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 18. FILM RESOURCES
-- ============================================================
create table public.film_resources (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  title text not null,
  category text not null
    check (category in ('game_film','scout_film','playbook','concept','drill','other')),
  url text,
  notes text,
  audience text default 'everyone'
    check (audience in ('everyone','coaches','players')),
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- ============================================================
-- 19. FILES
-- ============================================================
create table public.files (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  title text not null,
  description text,
  file_url text not null,
  file_type text, -- pdf, doc, image, etc.
  category text default 'general',
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

-- ============================================================
-- 20. TEAM LINKS
-- ============================================================
create table public.team_links (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  title text not null,
  url text not null,
  category text default 'general',
  sort_order integer default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- 21. CONTACTS (DIRECTORY)
-- ============================================================
create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  full_name text not null,
  role text,
  email text,
  phone text,
  title text,
  organization text,
  notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- 22. VOLUNTEER SLOTS
-- ============================================================
create table public.volunteer_slots (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  event_id uuid references public.events(id) on delete set null,
  title text not null,
  description text,
  slot_type text
    check (slot_type in ('snack_duty','score_table','bookkeeper','transportation','fundraiser_help','other')),
  spots_available integer default 1,
  deadline timestamptz,
  created_at timestamptz default now()
);

-- ============================================================
-- 23. VOLUNTEER SIGNUPS
-- ============================================================
create table public.volunteer_signups (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid references public.volunteer_slots(id) on delete cascade not null,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  signed_up_at timestamptz default now(),
  unique(slot_id, profile_id)
);

-- ============================================================
-- 24. TRANSPORTATION PLANS
-- ============================================================
create table public.transportation_plans (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events(id) on delete cascade not null,
  team_id uuid references public.teams(id) on delete cascade not null,
  plan_type text not null default 'bus'
    check (plan_type in ('bus','carpool','mixed')),
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 25. TRANSPORT DRIVERS
-- ============================================================
create table public.transport_drivers (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid references public.transportation_plans(id) on delete cascade not null,
  driver_name text not null,
  phone text,
  vehicle_description text,
  seat_capacity integer default 4,
  created_at timestamptz default now()
);

-- ============================================================
-- 26. TRANSPORT RIDERS
-- ============================================================
create table public.transport_riders (
  id uuid primary key default gen_random_uuid(),
  driver_id uuid references public.transport_drivers(id) on delete cascade not null,
  player_id uuid references public.players(id) on delete cascade not null,
  unique(driver_id, player_id)
);

-- ============================================================
-- 27. FUNDRAISER CAMPAIGNS
-- ============================================================
create table public.fundraiser_campaigns (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  title text not null,
  description text,
  team_goal numeric(10,2) default 0,
  player_goal numeric(10,2) default 0,
  start_date date,
  end_date date,
  status text default 'active'
    check (status in ('draft','active','completed','cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 28. PLAYER FUNDRAISER GOALS
-- ============================================================
create table public.player_fundraiser_goals (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references public.fundraiser_campaigns(id) on delete cascade not null,
  player_id uuid references public.players(id) on delete cascade not null,
  goal numeric(10,2) default 0,
  raised numeric(10,2) default 0,
  status text default 'on_track'
    check (status in ('on_track','behind','goal_met','exceeded')),
  unique(campaign_id, player_id)
);

-- ============================================================
-- 29. FUNDRAISER CONTRIBUTIONS
-- ============================================================
create table public.fundraiser_contributions (
  id uuid primary key default gen_random_uuid(),
  player_goal_id uuid references public.player_fundraiser_goals(id) on delete cascade not null,
  amount numeric(10,2) not null,
  donor_name text,
  notes text,
  contributed_at timestamptz default now()
);

-- ============================================================
-- 30. STORE PRODUCTS
-- ============================================================
create table public.store_products (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  name text not null,
  description text,
  category text
    check (category in ('required_gear','practice_gear','game_gear','spirit_wear','accessories')),
  price numeric(10,2),
  image_url text,
  is_required boolean default false,
  sizes text[], -- available sizes
  purchase_link text,
  deadline timestamptz,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ============================================================
-- 31. STORE ORDERS
-- ============================================================
create table public.store_orders (
  id uuid primary key default gen_random_uuid(),
  team_id uuid references public.teams(id) on delete cascade not null,
  player_id uuid references public.players(id) on delete cascade not null,
  status text default 'pending'
    check (status in ('pending','ordered','shipped','delivered')),
  total numeric(10,2) default 0,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- 32. STORE ORDER ITEMS
-- ============================================================
create table public.store_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.store_orders(id) on delete cascade not null,
  product_id uuid references public.store_products(id) on delete cascade not null,
  size text,
  quantity integer default 1,
  price numeric(10,2)
);

-- ============================================================
-- 33. NOTIFICATIONS
-- ============================================================
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  team_id uuid references public.teams(id) on delete cascade,
  title text not null,
  body text,
  link text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- INDEXES
-- ============================================================
create index idx_team_memberships_team on public.team_memberships(team_id);
create index idx_team_memberships_profile on public.team_memberships(profile_id);
create index idx_players_team on public.players(team_id);
create index idx_events_team on public.events(team_id);
create index idx_events_start on public.events(start_time);
create index idx_event_rsvps_event on public.event_rsvps(event_id);
create index idx_attendance_entries_record on public.attendance_entries(attendance_record_id);
create index idx_announcements_team on public.announcements(team_id);
create index idx_games_team on public.games(team_id);
create index idx_notifications_profile on public.notifications(profile_id);
create index idx_volunteer_slots_team on public.volunteer_slots(team_id);
create index idx_fundraiser_campaigns_team on public.fundraiser_campaigns(team_id);

-- ============================================================
-- ROW LEVEL SECURITY (basic policies)
-- ============================================================
alter table public.organizations enable row level security;
alter table public.teams enable row level security;
alter table public.profiles enable row level security;
alter table public.team_memberships enable row level security;
alter table public.players enable row level security;
alter table public.player_guardians enable row level security;
alter table public.events enable row level security;
alter table public.event_rsvps enable row level security;
alter table public.attendance_records enable row level security;
alter table public.attendance_entries enable row level security;
alter table public.announcements enable row level security;
alter table public.announcement_reads enable row level security;
alter table public.games enable row level security;
alter table public.player_game_stats enable row level security;
alter table public.practice_plans enable row level security;
alter table public.practice_plan_blocks enable row level security;
alter table public.player_development_notes enable row level security;
alter table public.film_resources enable row level security;
alter table public.files enable row level security;
alter table public.team_links enable row level security;
alter table public.contacts enable row level security;
alter table public.volunteer_slots enable row level security;
alter table public.volunteer_signups enable row level security;
alter table public.transportation_plans enable row level security;
alter table public.transport_drivers enable row level security;
alter table public.transport_riders enable row level security;
alter table public.fundraiser_campaigns enable row level security;
alter table public.player_fundraiser_goals enable row level security;
alter table public.fundraiser_contributions enable row level security;
alter table public.store_products enable row level security;
alter table public.store_orders enable row level security;
alter table public.store_order_items enable row level security;
alter table public.notifications enable row level security;

-- ============================================================
-- RLS POLICIES: Team members can read their team data
-- ============================================================

-- Helper function: check if user is member of a team
create or replace function public.is_team_member(p_team_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.team_memberships
    where team_id = p_team_id and profile_id = auth.uid()
  );
$$ language sql security definer;

-- Helper function: check if user is coach/admin of a team
create or replace function public.is_team_coach(p_team_id uuid)
returns boolean as $$
  select exists (
    select 1 from public.team_memberships
    where team_id = p_team_id
      and profile_id = auth.uid()
      and role in ('head_coach','assistant_coach','team_manager')
  );
$$ language sql security definer;

-- Profiles: users can read all profiles, update own
create policy "Profiles: read all" on public.profiles for select using (true);
create policy "Profiles: update own" on public.profiles for update using (id = auth.uid());
create policy "Profiles: insert own" on public.profiles for insert with check (id = auth.uid());

-- Teams: read if member
create policy "Teams: read as member" on public.teams for select using (public.is_team_member(id));

-- Team memberships: read if member of same team
create policy "Memberships: read" on public.team_memberships for select using (public.is_team_member(team_id));

-- Players: read if team member
create policy "Players: read" on public.players for select using (public.is_team_member(team_id));
create policy "Players: coach manage" on public.players for all using (public.is_team_coach(team_id));

-- Events: read if team member, coach manage
create policy "Events: read" on public.events for select using (public.is_team_member(team_id));
create policy "Events: coach manage" on public.events for all using (public.is_team_coach(team_id));

-- RSVP: read if team member, insert/update own
create policy "RSVP: read" on public.event_rsvps for select
  using (exists (select 1 from public.events e where e.id = event_id and public.is_team_member(e.team_id)));

-- Attendance: read if team member, coach manage
create policy "Attendance records: read" on public.attendance_records for select using (public.is_team_member(team_id));
create policy "Attendance records: coach manage" on public.attendance_records for all using (public.is_team_coach(team_id));

-- Attendance entries: read via record
create policy "Attendance entries: read" on public.attendance_entries for select
  using (exists (select 1 from public.attendance_records ar where ar.id = attendance_record_id and public.is_team_member(ar.team_id)));

-- Announcements: read if team member
create policy "Announcements: read" on public.announcements for select using (public.is_team_member(team_id));
create policy "Announcements: coach manage" on public.announcements for all using (public.is_team_coach(team_id));

-- Announcement reads
create policy "Announcement reads: own" on public.announcement_reads for all using (profile_id = auth.uid());

-- Games: read if team member
create policy "Games: read" on public.games for select using (public.is_team_member(team_id));
create policy "Games: coach manage" on public.games for all using (public.is_team_coach(team_id));

-- Player game stats
create policy "Stats: read" on public.player_game_stats for select
  using (exists (select 1 from public.games g where g.id = game_id and public.is_team_member(g.team_id)));

-- Practice plans
create policy "Practice plans: read" on public.practice_plans for select using (public.is_team_member(team_id));
create policy "Practice plans: coach manage" on public.practice_plans for all using (public.is_team_coach(team_id));

-- Practice plan blocks
create policy "Blocks: read" on public.practice_plan_blocks for select
  using (exists (select 1 from public.practice_plans pp where pp.id = practice_plan_id and public.is_team_member(pp.team_id)));

-- Development notes
create policy "Dev notes: read" on public.player_development_notes for select
  using (exists (select 1 from public.players p where p.id = player_id and public.is_team_member(p.team_id)));

-- Film resources
create policy "Film: read" on public.film_resources for select using (public.is_team_member(team_id));

-- Files
create policy "Files: read" on public.files for select using (public.is_team_member(team_id));

-- Team links
create policy "Links: read" on public.team_links for select using (public.is_team_member(team_id));

-- Contacts
create policy "Contacts: read" on public.contacts for select using (public.is_team_member(team_id));

-- Volunteers
create policy "Volunteer slots: read" on public.volunteer_slots for select using (public.is_team_member(team_id));
create policy "Volunteer signups: read" on public.volunteer_signups for select
  using (exists (select 1 from public.volunteer_slots vs where vs.id = slot_id and public.is_team_member(vs.team_id)));

-- Transportation
create policy "Transport plans: read" on public.transportation_plans for select using (public.is_team_member(team_id));
create policy "Transport drivers: read" on public.transport_drivers for select
  using (exists (select 1 from public.transportation_plans tp where tp.id = plan_id and public.is_team_member(tp.team_id)));
create policy "Transport riders: read" on public.transport_riders for select
  using (exists (
    select 1 from public.transport_drivers td
    join public.transportation_plans tp on tp.id = td.plan_id
    where td.id = driver_id and public.is_team_member(tp.team_id)
  ));

-- Fundraising
create policy "Campaigns: read" on public.fundraiser_campaigns for select using (public.is_team_member(team_id));
create policy "Player goals: read" on public.player_fundraiser_goals for select
  using (exists (select 1 from public.fundraiser_campaigns fc where fc.id = campaign_id and public.is_team_member(fc.team_id)));
create policy "Contributions: read" on public.fundraiser_contributions for select
  using (exists (
    select 1 from public.player_fundraiser_goals pg
    join public.fundraiser_campaigns fc on fc.id = pg.campaign_id
    where pg.id = player_goal_id and public.is_team_member(fc.team_id)
  ));

-- Store
create policy "Products: read" on public.store_products for select using (public.is_team_member(team_id));
create policy "Orders: read own" on public.store_orders for select using (public.is_team_member(team_id));
create policy "Order items: read" on public.store_order_items for select
  using (exists (select 1 from public.store_orders so where so.id = order_id and public.is_team_member(so.team_id)));

-- Notifications: own only
create policy "Notifications: own" on public.notifications for select using (profile_id = auth.uid());
create policy "Notifications: update own" on public.notifications for update using (profile_id = auth.uid());

-- Organizations: read if member of any team in org
create policy "Organizations: read" on public.organizations for select
  using (exists (
    select 1 from public.teams t
    join public.team_memberships tm on tm.team_id = t.id
    where t.organization_id = organizations.id and tm.profile_id = auth.uid()
  ));

-- Player guardians
create policy "Guardians: read" on public.player_guardians for select
  using (exists (select 1 from public.players p where p.id = player_id and public.is_team_member(p.team_id)));

-- ============================================================
-- TRIGGER: auto-create profile on signup
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'player')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- SEED DATA
-- ============================================================
-- See supabase/seed.sql for demo data.
-- Run seed.sql separately after this schema.
