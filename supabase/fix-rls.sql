-- ============================================================
-- Fix: ensure users can read their own memberships and related data
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Reload PostgREST schema cache
notify pgrst, 'reload schema';

-- Add policy: users can always read their own team memberships
-- (the existing policy uses is_team_member which may cause issues)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'team_memberships' and policyname = 'Memberships: read own'
  ) then
    create policy "Memberships: read own" on public.team_memberships
      for select using (profile_id = auth.uid());
  end if;
end $$;

-- Add policy: users can read teams they belong to (direct check)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'teams' and policyname = 'Teams: read via membership'
  ) then
    create policy "Teams: read via membership" on public.teams
      for select using (
        exists (
          select 1 from public.team_memberships
          where team_id = teams.id and profile_id = auth.uid()
        )
      );
  end if;
end $$;

-- Add policy: users can read their org (direct check, no function call)
do $$
begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'organizations' and policyname = 'Organizations: read via team membership'
  ) then
    create policy "Organizations: read via team membership" on public.organizations
      for select using (
        exists (
          select 1 from public.teams t
          join public.team_memberships tm on tm.team_id = t.id
          where t.organization_id = organizations.id
            and tm.profile_id = auth.uid()
        )
      );
  end if;
end $$;

-- Reload again after policy changes
notify pgrst, 'reload schema';
