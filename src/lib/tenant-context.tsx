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

        // Fetch first team membership (user's primary team)
        const { data: membership } = await supabase
          .from("team_memberships")
          .select(
            `
            role,
            teams (
              id, name, slug, season, level, mascot,
              primary_color, secondary_color, logo_url,
              organization_id,
              organizations (
                id, name, slug, logo_url
              )
            )
          `
          )
          .eq("profile_id", user.id)
          .limit(1)
          .single();

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const teamData = (membership as any)?.teams as Record<string, unknown> | null;
        const orgData = (teamData as any)?.organizations as Record<string, unknown> | null;
        /* eslint-enable @typescript-eslint/no-explicit-any */

        setTenant({
          organization: orgData
            ? {
                id: orgData.id as string,
                name: orgData.name as string,
                slug: orgData.slug as string,
                logo_url: orgData.logo_url as string | null,
              }
            : null,
          team: teamData
            ? {
                id: teamData.id as string,
                name: teamData.name as string,
                slug: teamData.slug as string,
                season: teamData.season as string | null,
                level: teamData.level as string | null,
                mascot: teamData.mascot as string | null,
                primary_color: (teamData.primary_color as string) || "#1e3a5f",
                secondary_color:
                  (teamData.secondary_color as string) || "#e86c2f",
                logo_url: teamData.logo_url as string | null,
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
