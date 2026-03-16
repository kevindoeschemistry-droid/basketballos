-- ============================================================
-- BasketballOS — Demo Seed Data
-- ============================================================
-- Run AFTER schema.sql in Supabase SQL Editor.
-- Creates demo accounts for each role so reviewers can
-- instantly experience the app from every perspective.
-- ============================================================

-- ── Auth Users ──────────────────────────────────────────────
-- Password for all: BasketballOS2025!
-- bcrypt hash of "BasketballOS2025!" generated with cost 10
-- The trigger on auth.users will auto-create profiles,
-- so we insert auth users first, then UPDATE profiles with
-- the correct roles afterwards.

INSERT INTO auth.users (
  id, instance_id, aud, role, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  confirmation_token, recovery_token,
  raw_app_meta_data, raw_user_meta_data, is_super_admin
) VALUES
  ('c0000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'coach@basketballos.demo', crypt('BasketballOS2025!', gen_salt('bf')),
   NOW(), NOW(), NOW(), '', '',
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Coach Mike Thompson","role":"head_coach"}'::jsonb, false),
  ('c0000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'assistant@basketballos.demo', crypt('BasketballOS2025!', gen_salt('bf')),
   NOW(), NOW(), NOW(), '', '',
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Coach Sarah Williams","role":"assistant_coach"}'::jsonb, false),
  ('c0000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'manager@basketballos.demo', crypt('BasketballOS2025!', gen_salt('bf')),
   NOW(), NOW(), NOW(), '', '',
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Alex Rivera","role":"team_manager"}'::jsonb, false),
  ('c0000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'parent@basketballos.demo', crypt('BasketballOS2025!', gen_salt('bf')),
   NOW(), NOW(), NOW(), '', '',
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Maria Johnson","role":"parent"}'::jsonb, false),
  ('c0000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'player@basketballos.demo', crypt('BasketballOS2025!', gen_salt('bf')),
   NOW(), NOW(), NOW(), '', '',
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Marcus Johnson","role":"player"}'::jsonb, false),
  ('c0000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'ad@basketballos.demo', crypt('BasketballOS2025!', gen_salt('bf')),
   NOW(), NOW(), NOW(), '', '',
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Dr. Robert Chen","role":"athletic_director"}'::jsonb, false),
  ('c0000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
   'reslife@basketballos.demo', crypt('BasketballOS2025!', gen_salt('bf')),
   NOW(), NOW(), NOW(), '', '',
   '{"provider":"email","providers":["email"]}'::jsonb,
   '{"full_name":"Janet Garcia","role":"resident_life"}'::jsonb, false);

-- Also need identities for Supabase Auth to work with email/password login
INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, last_sign_in_at, created_at, updated_at) VALUES
  (gen_random_uuid(), 'c0000000-0000-0000-0000-000000000001', 'coach@basketballos.demo',
   '{"sub":"c0000000-0000-0000-0000-000000000001","email":"coach@basketballos.demo"}'::jsonb,
   'email', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c0000000-0000-0000-0000-000000000002', 'assistant@basketballos.demo',
   '{"sub":"c0000000-0000-0000-0000-000000000002","email":"assistant@basketballos.demo"}'::jsonb,
   'email', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c0000000-0000-0000-0000-000000000003', 'manager@basketballos.demo',
   '{"sub":"c0000000-0000-0000-0000-000000000003","email":"manager@basketballos.demo"}'::jsonb,
   'email', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c0000000-0000-0000-0000-000000000004', 'parent@basketballos.demo',
   '{"sub":"c0000000-0000-0000-0000-000000000004","email":"parent@basketballos.demo"}'::jsonb,
   'email', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c0000000-0000-0000-0000-000000000005', 'player@basketballos.demo',
   '{"sub":"c0000000-0000-0000-0000-000000000005","email":"player@basketballos.demo"}'::jsonb,
   'email', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c0000000-0000-0000-0000-000000000006', 'ad@basketballos.demo',
   '{"sub":"c0000000-0000-0000-0000-000000000006","email":"ad@basketballos.demo"}'::jsonb,
   'email', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c0000000-0000-0000-0000-000000000007', 'reslife@basketballos.demo',
   '{"sub":"c0000000-0000-0000-0000-000000000007","email":"reslife@basketballos.demo"}'::jsonb,
   'email', NOW(), NOW(), NOW());

-- ── Organization ────────────────────────────────────────────
INSERT INTO public.organizations (id, name, slug, logo_url) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Lincoln High School', 'lincoln-hs', NULL);

-- ── Team ────────────────────────────────────────────────────
INSERT INTO public.teams (id, organization_id, name, slug, season, level, mascot, primary_color, secondary_color) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001',
   'Lincoln Lions Varsity', 'varsity', '2025-26', 'Varsity', 'Lions', '#1e3a5f', '#e86c2f');

-- ── Update Profiles ─────────────────────────────────────────
-- The auth.users trigger already created profiles rows.
-- Now update them with the correct roles and phone numbers.

UPDATE public.profiles SET full_name = 'Coach Mike Thompson',    phone = '(555) 555-0101', role = 'head_coach'        WHERE id = 'c0000000-0000-0000-0000-000000000001';
UPDATE public.profiles SET full_name = 'Coach Sarah Williams',   phone = '(555) 555-0102', role = 'assistant_coach'   WHERE id = 'c0000000-0000-0000-0000-000000000002';
UPDATE public.profiles SET full_name = 'Alex Rivera',            phone = '(555) 555-0103', role = 'team_manager'      WHERE id = 'c0000000-0000-0000-0000-000000000003';
UPDATE public.profiles SET full_name = 'Maria Johnson',          phone = '(555) 555-0104', role = 'parent'            WHERE id = 'c0000000-0000-0000-0000-000000000004';
UPDATE public.profiles SET full_name = 'Marcus Johnson',         phone = '(555) 555-0105', role = 'player'            WHERE id = 'c0000000-0000-0000-0000-000000000005';
UPDATE public.profiles SET full_name = 'Dr. Robert Chen',        phone = '(555) 555-0106', role = 'athletic_director' WHERE id = 'c0000000-0000-0000-0000-000000000006';
UPDATE public.profiles SET full_name = 'Janet Garcia',           phone = '(555) 555-0107', role = 'resident_life'     WHERE id = 'c0000000-0000-0000-0000-000000000007';

-- ── Team Memberships ────────────────────────────────────────
INSERT INTO public.team_memberships (team_id, profile_id, role) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'head_coach'),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', 'assistant_coach'),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000003', 'team_manager'),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000004', 'parent'),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000005', 'player'),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000006', 'athletic_director'),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000007', 'resident_life');

-- ── Players ─────────────────────────────────────────────────
INSERT INTO public.players (id, team_id, profile_id, first_name, last_name, jersey_number, position, grade, height, is_active) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000005', 'Marcus', 'Johnson', '3', 'PG', '11', '6''1"', true),
  ('d0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', NULL, 'Darius', 'Williams', '5', 'SG', '12', '6''3"', true),
  ('d0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', NULL, 'Isaiah', 'Thompson', '10', 'SF', '11', '6''5"', true),
  ('d0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', NULL, 'Jaylen', 'Davis', '12', 'PF', '12', '6''6"', true),
  ('d0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', NULL, 'Andre', 'Mitchell', '15', 'C', '11', '6''8"', true),
  ('d0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', NULL, 'Cameron', 'Brooks', '20', 'PG', '10', '5''11"', true),
  ('d0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', NULL, 'Tyler', 'Robinson', '21', 'SG', '11', '6''2"', true),
  ('d0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', NULL, 'Kevin', 'Moore', '23', 'SF', '12', '6''4"', true),
  ('d0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', NULL, 'Brandon', 'Lee', '24', 'PF', '10', '6''5"', true),
  ('d0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000001', NULL, 'Malik', 'Carter', '30', 'C', '11', '6''7"', true),
  ('d0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000001', NULL, 'Derrick', 'Hall', '32', 'SG', '12', '6''1"', true),
  ('d0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000001', NULL, 'Jamal', 'Wright', '33', 'PF', '10', '6''6"', true);

-- ── Player Guardians ────────────────────────────────────────
INSERT INTO public.player_guardians (player_id, profile_id, guardian_name, relationship, email, phone, is_primary) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000004', 'Maria Johnson', 'Mother', 'parent@basketballos.demo', '(555) 555-0104', true);

-- ── Events ──────────────────────────────────────────────────
INSERT INTO public.events (id, team_id, title, event_type, start_time, end_time, location, opponent, uniform, notes) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Practice', 'practice', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '4 hours', 'Main Gym', NULL, NULL, 'Focus on press break and transition offense'),
  ('e0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'vs. Riverside Hawks', 'game', NOW() + INTERVAL '3 days', NOW() + INTERVAL '3 days 2 hours', 'Riverside HS', 'Riverside Hawks', 'Home White', 'Arrive 45 min early. Bring warm-up gear.'),
  ('e0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'Film Review', 'film_session', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days 1 hour', 'Room 204', NULL, NULL, 'Review Riverside game film'),
  ('e0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'Practice', 'practice', NOW() + INTERVAL '6 days', NOW() + INTERVAL '6 days 2 hours', 'Main Gym', NULL, NULL, NULL),
  ('e0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'vs. Central Bears', 'game', NOW() + INTERVAL '8 days', NOW() + INTERVAL '8 days 2 hours', 'Home — Main Gym', 'Central Bears', 'Away Blue', 'Senior Night');

-- ── Games ───────────────────────────────────────────────────
INSERT INTO public.games (id, event_id, team_id, opponent, game_date, location, home_away, team_score, opponent_score, result, notes) VALUES
  ('f0000000-0000-0000-0000-000000000001', NULL, 'b0000000-0000-0000-0000-000000000001', 'Eastside Eagles', NOW() - INTERVAL '14 days', 'Home', 'home', 72, 58, 'win', 'Strong first half. Controlled tempo.'),
  ('f0000000-0000-0000-0000-000000000002', NULL, 'b0000000-0000-0000-0000-000000000001', 'Westlake Warriors', NOW() - INTERVAL '10 days', 'Away', 'away', 61, 65, 'loss', 'Struggled in the 4th quarter.'),
  ('f0000000-0000-0000-0000-000000000003', NULL, 'b0000000-0000-0000-0000-000000000001', 'Northridge Cougars', NOW() - INTERVAL '7 days', 'Home', 'home', 68, 55, 'win', 'Great defensive effort. 15 steals as a team.'),
  ('f0000000-0000-0000-0000-000000000004', NULL, 'b0000000-0000-0000-0000-000000000001', 'Southview Titans', NOW() - INTERVAL '3 days', 'Away', 'away', 74, 60, 'win', 'Marcus had 22 points. Best road game of the season.');

-- ── Announcements ───────────────────────────────────────────
INSERT INTO public.announcements (team_id, author_id, title, body, audience, is_pinned) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Schedule Change — Thursday Practice Moved', 'Practice on Thursday is moved to 4:00 PM due to a school assembly. Please plan accordingly.', 'everyone', true),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Senior Night — March 25', 'Senior Night is Wednesday, March 25 vs. Central Bears. Parents of seniors please arrive by 5:45 PM for the ceremony.', 'parents', true),
  ('b0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Film Session Required', 'All players must attend film session on Monday. We will review the Riverside game and prep for Central.', 'players', false);

-- ── Fundraiser Campaign ─────────────────────────────────────
INSERT INTO public.fundraiser_campaigns (id, team_id, title, description, team_goal, player_goal, start_date, end_date, status) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'Spring Car Wash Fundraiser', 'Annual car wash fundraiser to support new uniform purchases and tournament travel.', 5000.00, 400.00, '2026-02-15', '2026-04-01', 'active');

-- ── Volunteer Slots ─────────────────────────────────────────
INSERT INTO public.volunteer_slots (team_id, event_id, title, description, slot_type, spots_available) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'Score Table', 'Operate the scoreboard during the game', 'score_table', 2),
  ('b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000002', 'Snack Duty', 'Bring snacks and drinks for the team', 'snack_duty', 2),
  ('b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000005', 'Senior Night Setup', 'Help set up decorations for Senior Night', 'other', 4);

-- ── Contacts (Directory) ────────────────────────────────────
INSERT INTO public.contacts (team_id, full_name, role, email, phone, title, organization) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Dr. Robert Chen', 'Athletic Director', 'ad@basketballos.demo', '(555) 555-0106', 'Athletic Director', 'Lincoln High School'),
  ('b0000000-0000-0000-0000-000000000001', 'Janet Garcia', 'Resident Life', 'reslife@basketballos.demo', '(555) 555-0107', 'Director of Residential Life', 'Lincoln High School'),
  ('b0000000-0000-0000-0000-000000000001', 'Tom Bradley', 'Trainer', 'trainer@lincolnhs.edu', '(555) 555-0108', 'Athletic Trainer', 'Lincoln High School'),
  ('b0000000-0000-0000-0000-000000000001', 'CIF Southern Section', 'League', 'info@cifss.org', NULL, NULL, 'CIF-SS');

-- ── Store Products ──────────────────────────────────────────
INSERT INTO public.store_products (team_id, name, description, category, price, is_required, sizes, purchase_link, deadline, is_active) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Game Jersey — Home White', 'Official home game jersey', 'required_gear', 65.00, true, ARRAY['S','M','L','XL','XXL'], NULL, NOW() + INTERVAL '5 days', true),
  ('b0000000-0000-0000-0000-000000000001', 'Game Shorts — Navy', 'Official game shorts', 'required_gear', 40.00, true, ARRAY['S','M','L','XL'], NULL, NOW() + INTERVAL '5 days', true),
  ('b0000000-0000-0000-0000-000000000001', 'Warm-Up Jacket', 'Team warm-up jacket', 'practice_gear', 55.00, false, ARRAY['S','M','L','XL','XXL'], NULL, NOW() + INTERVAL '2 days', true),
  ('b0000000-0000-0000-0000-000000000001', 'Practice Jersey — Gray', 'Reversible practice jersey', 'practice_gear', 25.00, false, ARRAY['S','M','L','XL'], NULL, NULL, true),
  ('b0000000-0000-0000-0000-000000000001', 'Lions Spirit T-Shirt', 'Team spirit wear', 'spirit_wear', 20.00, false, ARRAY['S','M','L','XL','XXL'], NULL, NULL, true),
  ('b0000000-0000-0000-0000-000000000001', 'Drawstring Bag', 'Team logo drawstring bag', 'accessories', 15.00, false, NULL, NULL, NULL, true);
