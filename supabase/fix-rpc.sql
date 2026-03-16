-- ============================================================
-- Fix: Create RPC function to load tenant data in one call
-- This bypasses PostgREST's schema resolution issues
-- Run this in the Supabase SQL Editor
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_my_tenant()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id uuid := auth.uid();
  v_profile jsonb;
  v_mem_role text;
  v_team_id uuid;
  v_team jsonb;
  v_org_id uuid;
  v_org jsonb;
BEGIN
  IF v_user_id IS NULL THEN
    RETURN NULL;
  END IF;

  -- Get profile
  SELECT jsonb_build_object(
    'id', p.id,
    'full_name', p.full_name,
    'email', p.email,
    'role', p.role,
    'avatar_url', p.avatar_url
  ) INTO v_profile
  FROM public.profiles p
  WHERE p.id = v_user_id;

  -- Get first team membership
  SELECT tm.role, tm.team_id
  INTO v_mem_role, v_team_id
  FROM public.team_memberships tm
  WHERE tm.profile_id = v_user_id
  LIMIT 1;

  -- Get team + org if membership exists
  IF v_team_id IS NOT NULL THEN
    SELECT jsonb_build_object(
      'id', t.id,
      'name', t.name,
      'slug', t.slug,
      'season', t.season,
      'level', t.level,
      'mascot', t.mascot,
      'primary_color', COALESCE(t.primary_color, '#1e3a5f'),
      'secondary_color', COALESCE(t.secondary_color, '#e86c2f'),
      'logo_url', t.logo_url
    ), t.organization_id
    INTO v_team, v_org_id
    FROM public.teams t
    WHERE t.id = v_team_id;

    IF v_org_id IS NOT NULL THEN
      SELECT jsonb_build_object(
        'id', o.id,
        'name', o.name,
        'slug', o.slug,
        'logo_url', o.logo_url
      ) INTO v_org
      FROM public.organizations o
      WHERE o.id = v_org_id;
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'profile', v_profile,
    'membership', CASE WHEN v_mem_role IS NOT NULL
      THEN jsonb_build_object('role', v_mem_role)
      ELSE NULL
    END,
    'team', v_team,
    'organization', v_org
  );
END;
$$;

-- Reload PostgREST schema cache so it sees the new function
NOTIFY pgrst, 'reload schema';
