"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTenant } from "@/lib/tenant-context";
import { getNavForRole, ROLE_LABELS, ROLE_COLORS } from "@/lib/role-nav";

export function Sidebar() {
  const pathname = usePathname();
  const { organization, team, profile, membership } = useTenant();

  const role = membership?.role || profile?.role || "player";
  const navItems = getNavForRole(role);
  const teamInitial =
    organization?.name?.[0]?.toUpperCase() ||
    team?.name?.[0]?.toUpperCase() ||
    "B";
  const displayName = organization?.name || "BasketballOS";
  const teamLabel = team
    ? `${team.level || ""} ${team.season || ""}`.trim()
    : null;

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-sidebar text-sidebar-foreground">
      {/* School identity */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4">
        {organization?.logo_url || team?.logo_url ? (
          <img
            src={team?.logo_url || organization?.logo_url || ""}
            alt={displayName}
            className="h-8 w-8 rounded-lg object-cover"
          />
        ) : (
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white font-black text-sm"
            style={{ backgroundColor: team?.primary_color || "#1e3a5f" }}
          >
            {teamInitial}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold leading-tight">
            {displayName}
          </p>
          {teamLabel && (
            <p className="truncate text-xs text-sidebar-foreground/60">
              {teamLabel}
            </p>
          )}
        </div>
      </div>

      {/* Role badge */}
      <div className="px-4 pt-3 pb-1">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white",
            ROLE_COLORS[role] || "bg-gray-500"
          )}
        >
          {ROLE_LABELS[role] || role}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-4 py-3">
        <p className="text-[11px] text-sidebar-foreground/40 text-center">
          Powered by BasketballOS
        </p>
      </div>
    </aside>
  );
}
