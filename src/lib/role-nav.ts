import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Megaphone,
  Users,
  Trophy,
  FileText,
  BarChart3,
  Film,
  FolderOpen,
  BookUser,
  HandHelping,
  Bus,
  Heart,
  ShoppingBag,
  Settings,
  type LucideIcon,
} from "lucide-react";
import type { UserRole } from "@/lib/types";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

/* ─── Demo accounts ────────────────────────────────────────── */

export const DEMO_ACCOUNTS = [
  {
    role: "head_coach" as UserRole,
    label: "Head Coach",
    email: "coach@basketballos.demo",
    emoji: "🏀",
    color: "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100",
    desc: "Full access — manage everything",
  },
  {
    role: "assistant_coach" as UserRole,
    label: "Assistant Coach",
    email: "assistant@basketballos.demo",
    emoji: "📋",
    color: "border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
    desc: "Attendance, practice plans, development",
  },
  {
    role: "team_manager" as UserRole,
    label: "Team Manager",
    email: "manager@basketballos.demo",
    emoji: "📊",
    color: "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100",
    desc: "Stats, logistics, coordination",
  },
  {
    role: "player" as UserRole,
    label: "Player",
    email: "player@basketballos.demo",
    emoji: "🎽",
    color: "border-green-200 bg-green-50 text-green-700 hover:bg-green-100",
    desc: "Schedule, RSVP, development notes",
  },
  {
    role: "parent" as UserRole,
    label: "Parent",
    email: "parent@basketballos.demo",
    emoji: "👪",
    color: "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
    desc: "Schedule, volunteer, fundraising, store",
  },
  {
    role: "athletic_director" as UserRole,
    label: "Athletic Director",
    email: "ad@basketballos.demo",
    emoji: "🏛️",
    color: "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100",
    desc: "Oversight, compliance, reports",
  },
];

export const DEMO_PASSWORD = "BasketballOS2025!";

/* ─── Role-specific navigation ─────────────────────────────── */

const ALL_NAV: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/schedule", label: "Schedule", icon: Calendar },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/announcements", label: "Announcements", icon: Megaphone },
  { href: "/roster", label: "Roster", icon: Users },
  { href: "/games", label: "Games", icon: Trophy },
  { href: "/practices", label: "Practices", icon: FileText },
  { href: "/development", label: "Development", icon: BarChart3 },
  { href: "/film-room", label: "Film Room", icon: Film },
  { href: "/files", label: "Files", icon: FolderOpen },
  { href: "/directory", label: "Directory", icon: BookUser },
  { href: "/volunteers", label: "Volunteers", icon: HandHelping },
  { href: "/transport", label: "Transport", icon: Bus },
  { href: "/fundraising", label: "Fundraising", icon: Heart },
  { href: "/store", label: "Spirit Pack", icon: ShoppingBag },
  { href: "/admin", label: "Admin", icon: Settings },
];

function pick(keys: string[]): NavItem[] {
  return ALL_NAV.filter((n) => keys.includes(n.href));
}

export const NAV_BY_ROLE: Record<string, NavItem[]> = {
  // Coaches — see everything
  super_admin: ALL_NAV,
  admin: ALL_NAV,
  head_coach: ALL_NAV,
  assistant_coach: pick([
    "/dashboard",
    "/schedule",
    "/attendance",
    "/announcements",
    "/roster",
    "/games",
    "/practices",
    "/development",
    "/film-room",
    "/files",
    "/directory",
  ]),
  // Manager — logistics focused
  team_manager: pick([
    "/dashboard",
    "/schedule",
    "/attendance",
    "/announcements",
    "/roster",
    "/games",
    "/practices",
    "/files",
    "/directory",
    "/volunteers",
    "/transport",
    "/fundraising",
    "/store",
  ]),
  // Player — their own view
  player: pick([
    "/dashboard",
    "/schedule",
    "/announcements",
    "/games",
    "/practices",
    "/development",
    "/film-room",
    "/store",
  ]),
  // Parent — family logistics
  parent: pick([
    "/dashboard",
    "/schedule",
    "/announcements",
    "/games",
    "/volunteers",
    "/transport",
    "/fundraising",
    "/store",
    "/directory",
  ]),
  // Resident Life — attendance only
  resident_life: pick([
    "/dashboard",
    "/attendance",
    "/roster",
    "/directory",
  ]),
  // Athletic Director — oversight
  athletic_director: pick([
    "/dashboard",
    "/schedule",
    "/attendance",
    "/announcements",
    "/roster",
    "/games",
    "/files",
    "/directory",
    "/admin",
  ]),
};

/* ─── Role labels & colors ─────────────────────────────────── */

export const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  head_coach: "Head Coach",
  assistant_coach: "Assistant Coach",
  team_manager: "Team Manager",
  player: "Player",
  parent: "Parent",
  resident_life: "Resident Life",
  athletic_director: "Athletic Director",
};

export const ROLE_COLORS: Record<string, string> = {
  super_admin: "bg-red-600",
  admin: "bg-red-500",
  head_coach: "bg-blue-600",
  assistant_coach: "bg-indigo-500",
  team_manager: "bg-purple-600",
  player: "bg-green-600",
  parent: "bg-amber-500",
  resident_life: "bg-teal-600",
  athletic_director: "bg-slate-600",
};

export function getNavForRole(role: string | undefined): NavItem[] {
  return NAV_BY_ROLE[role || "player"] || NAV_BY_ROLE.player;
}
