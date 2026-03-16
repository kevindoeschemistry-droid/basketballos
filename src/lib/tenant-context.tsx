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

        // Single RPC call — bypasses PostgREST schema resolution
        const { data: tenantRpc, error: rpcError } = await supabase.rpc(
          "get_my_tenant"
        );

        if (rpcError || !tenantRpc) {
          console.error("Tenant RPC error:", rpcError);
          // Fallback: set profile from auth metadata so the app still works
          setTenant({
            organization: null,
            team: null,
            profile: {
              id: user.id,
              full_name:
                (user.user_metadata?.full_name as string) ||
                user.email ||
                "User",
              email: user.email || null,
              role: (user.user_metadata?.role as string) || "player",
              avatar_url: null,
            },
            membership: null,
            loading: false,
          });
          return;
        }

        /* eslint-disable @typescript-eslint/no-explicit-any */
        const t = tenantRpc as any;
        /* eslint-enable @typescript-eslint/no-explicit-any */

        setTenant({
          organization: t.organization || null,
          team: t.team || null,
          profile: t.profile || null,
          membership: t.membership || null,
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
