"use client";

import Link from "next/link";
import {
  Calendar,
  ClipboardCheck,
  Megaphone,
  Users,
  Trophy,
  AlertCircle,
  HandHelping,
  Bus,
  Heart,
  ShoppingBag,
} from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType;
  href: string;
  alert?: string;
}

function DashboardCard({
  title,
  value,
  subtitle,
  icon: Icon,
  href,
  alert,
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        {alert && (
          <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
            <AlertCircle className="h-3 w-3" />
            {alert}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {subtitle && (
          <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </Link>
  );
}

export function DashboardCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <DashboardCard
        icon={Calendar}
        title="Next Event"
        value="Practice"
        subtitle="Today at 3:30 PM — Main Gym"
        href="/schedule"
      />
      <DashboardCard
        icon={ClipboardCheck}
        title="Attendance"
        value="Not Submitted"
        subtitle="Today's practice"
        href="/attendance"
        alert="Action needed"
      />
      <DashboardCard
        icon={Trophy}
        title="Season Record"
        value="12 – 4"
        subtitle="Last game: W 68-55 vs. Riverside"
        href="/games"
      />
      <DashboardCard
        icon={Users}
        title="RSVP Status"
        value="11 of 15"
        subtitle="4 players haven't responded"
        href="/schedule"
        alert="3 missing"
      />
      <DashboardCard
        icon={Megaphone}
        title="Announcements"
        value="2 New"
        subtitle="1 pinned announcement"
        href="/announcements"
      />
      <DashboardCard
        icon={HandHelping}
        title="Volunteers"
        value="2 Open Slots"
        subtitle="Score table & snack duty needed"
        href="/volunteers"
        alert="Help needed"
      />
      <DashboardCard
        icon={Bus}
        title="Transportation"
        value="Planned"
        subtitle="Next away game — 2 cars confirmed"
        href="/transport"
      />
      <DashboardCard
        icon={Heart}
        title="Fundraising"
        value="$2,340 / $5,000"
        subtitle="Car wash campaign — 46% complete"
        href="/fundraising"
      />
      <DashboardCard
        icon={ShoppingBag}
        title="Spirit Pack"
        value="Deadline Soon"
        subtitle="Warm-up jacket order closes Friday"
        href="/store"
        alert="2 days left"
      />
    </div>
  );
}
