"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTenant } from "@/lib/tenant-context";
import { getNavForRole, ROLE_LABELS, ROLE_COLORS } from "@/lib/role-nav";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { organization, team, profile, membership } = useTenant();

  if (!open) return null;

  const role = membership?.role || profile?.role || "player";
  const navItems = getNavForRole(role);
  const teamInitial =
    organization?.name?.[0]?.toUpperCase() ||
    team?.name?.[0]?.toUpperCase() ||
    "B";
  const displayName = organization?.name || "BasketballOS";

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 w-72 bg-sidebar text-sidebar-foreground overflow-y-auto">
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center gap-2.5 min-w-0">
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
            <span className="truncate text-lg font-bold">{displayName}</span>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center h-10 w-10 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

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

        <nav className="px-3 py-2">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
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

        <div className="border-t border-sidebar-border px-4 py-3">
          <p className="text-[11px] text-sidebar-foreground/40 text-center">
            Powered by BasketballOS
          </p>
        </div>
      </div>
    </div>
  );
}
