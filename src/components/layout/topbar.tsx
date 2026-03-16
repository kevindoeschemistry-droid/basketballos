"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Menu, LogOut, User } from "lucide-react";
import { MobileNav } from "./mobile-nav";
import { useTenant } from "@/lib/tenant-context";

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { profile, team } = useTenant();

  async function handleSignOut() {
    if (isSupabaseConfigured()) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/login");
  }

  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 lg:px-6">
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Team name — visible on desktop */}
        <div className="hidden lg:block">
          {team && (
            <p className="text-sm font-medium text-muted-foreground">
              {team.name}
              {team.mascot && (
                <span className="ml-1 text-muted-foreground/60">
                  — {team.mascot}
                </span>
              )}
            </p>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {profile && (
            <span className="hidden sm:block text-sm text-muted-foreground mr-2">
              {profile.full_name}
            </span>
          )}
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted text-muted-foreground"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted text-muted-foreground"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
