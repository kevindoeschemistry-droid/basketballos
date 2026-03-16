"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export interface TenantData {
  organization: {
    id: string;
    name: string;
    slug: string;
    logo_url: string | null;
  } | null;
  team: {
    id: string;
    name: string;
    slug: string;
    season: string | null;
    level: string | null;
    mascot: string | null;
    primary_color: string;
    secondary_color: string;
    logo_url: string | null;
  } | null;
  profile: {
    id: string;
    full_name: string;
    email: string | null;
    role: string;
    avatar_url: string | null;
  } | null;
  membership: {
    role: string;
  } | null;
  loading: boolean;
}

const defaultTenant: TenantData = {
  organization: null,
  team: null,
  profile: null,
  membership: null,
  loading: true,
};

const TenantContext = createContext<TenantData>(defaultTenant);

export function useTenant() {
  return useContext(TenantContext);
}

export function TenantProvider({ children }: { children: ReactNode }) {
  const [tenant, setTenant] = useState<TenantData>(defaultTenant);

  useEffect(() => {
    async function loadTenant() {
      if (!isSupabaseConfigured()) {
        // Demo mode — show placeholder data
        setTenant({
          organization: {
            id: "demo",
            name: "Lincoln High School",
            slug: "demo",
            logo_url: null,
          },
          team: {
            id: "demo",
            name: "Lincoln Lions Varsity",
            slug: "varsity",
            season: "2025-26",
            level: "Varsity",
            mascot: "Lions",
            primary_color: "#1e3a5f",
            secondary_color: "#e86c2f",
            logo_url: null,
          },
          profile: {
            id: "demo",
            full_name: "Coach Demo",
            email: "demo@school.edu",
            role: "head_coach",
            avatar_url: null,
          },
          membership: { role: "head_coach" },
          loading: false,
        });
        return;
      }

      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setTenant({ ...defaultTenant, loading: false });
          return;
        }

        // Fetch profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("id, full_name, email, role, avatar_url")
          .eq("id", user.id)
          .single();

        // Fetch first team membership (simple query — no nested joins)
        const { data: membership } = await supabase
          .from("team_memberships")
          .select("role, team_id")
          .eq("profile_id", user.id)
          .limit(1)
          .single();

        // Fetch team details separately
        let teamData: {
          id: string;
          name: string;
          slug: string;
          season: string | null;
          level: string | null;
          mascot: string | null;
          primary_color: string;
          secondary_color: string;
          logo_url: string | null;
          organization_id: string;
        } | null = null;

        if (membership?.team_id) {
          const { data: team } = await supabase
            .from("teams")
            .select(
              "id, name, slug, season, level, mascot, primary_color, secondary_color, logo_url, organization_id"
            )
            .eq("id", membership.team_id)
            .single();
          teamData = team;
        }

        // Fetch organization separately
        let orgData: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
        } | null = null;

        if (teamData?.organization_id) {
          const { data: org } = await supabase
            .from("organizations")
            .select("id, name, slug, logo_url")
            .eq("id", teamData.organization_id)
            .single();
          orgData = org;
        }

        setTenant({
          organization: orgData,
          team: teamData
            ? {
                id: teamData.id,
                name: teamData.name,
                slug: teamData.slug,
                season: teamData.season,
                level: teamData.level,
                mascot: teamData.mascot,
                primary_color: teamData.primary_color || "#1e3a5f",
                secondary_color: teamData.secondary_color || "#e86c2f",
                logo_url: teamData.logo_url,
              }
            : null,
          profile: profile
            ? {
                id: profile.id,
                full_name: profile.full_name,
                email: profile.email,
                role: profile.role,
                avatar_url: profile.avatar_url,
              }
            : null,
          membership: membership ? { role: membership.role } : null,
          loading: false,
        });
      } catch {
        setTenant({ ...defaultTenant, loading: false });
      }
    }

    loadTenant();
  }, []);

  return (
    <TenantContext.Provider value={tenant}>{children}</TenantContext.Provider>
  );
}
