"use client";

import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { useTenant } from "@/lib/tenant-context";
import { ROLE_LABELS, ROLE_COLORS } from "@/lib/role-nav";
import { cn } from "@/lib/utils";

const ROLE_SUBTITLES: Record<string, string> = {
  head_coach: "Here\u2019s your command center. See what needs attention today.",
  assistant_coach: "Here\u2019s today\u2019s overview. Check attendance and practice plans.",
  team_manager: "Logistics at a glance. Keep the team running smoothly.",
  player: "Here\u2019s what\u2019s coming up. Stay ready.",
  parent: "Stay in the loop on schedule, volunteering, and more.",
  resident_life: "Attendance reports and compliance at a glance.",
  athletic_director: "Program overview and compliance status.",
};

const ROLE_CHECKLISTS: Record<string, { text: string; done: boolean }[]> = {
  head_coach: [
    { text: "Submit attendance for practice", done: false },
    { text: "Review film from last game", done: true },
    { text: "Confirm transportation for Friday", done: false },
    { text: "Post announcement about schedule change", done: true },
    { text: "Update development notes for Marcus", done: false },
  ],
  assistant_coach: [
    { text: "Prepare practice plan for tomorrow", done: false },
    { text: "Submit attendance for today", done: false },
    { text: "Review player development notes", done: true },
    { text: "Upload drill video to film room", done: false },
  ],
  team_manager: [
    { text: "Confirm snack duty volunteer for Friday", done: false },
    { text: "Update carpool assignments", done: true },
    { text: "Check spirit pack order deadline", done: false },
    { text: "Update fundraiser totals", done: false },
    { text: "Print roster for away game", done: true },
  ],
  player: [
    { text: "RSVP for Friday\u2019s game", done: false },
    { text: "Watch film review assignment", done: true },
    { text: "Order warm-up jacket (due Friday)", done: false },
  ],
  parent: [
    { text: "RSVP for Friday\u2019s game", done: true },
    { text: "Sign up for snack duty", done: false },
    { text: "Check Marcus\u2019s gear checklist", done: false },
    { text: "Review fundraiser progress", done: true },
  ],
  resident_life: [
    { text: "Review today\u2019s attendance report", done: false },
    { text: "Check absent player follow-ups", done: true },
  ],
  athletic_director: [
    { text: "Review attendance compliance", done: false },
    { text: "Approve travel request for tournament", done: true },
    { text: "Check season record update", done: true },
  ],
};

export default function DashboardPage() {
  const { organization, team, profile, membership, loading } = useTenant();

  const role = membership?.role || profile?.role || "player";
  const schoolName = organization?.name || "Your School";
  const teamName = team?.name || "Basketball";
  const greeting = profile?.full_name
    ? `Welcome back, ${profile.full_name.split(" ")[0]}`
    : "Welcome back";
  const subtitle = ROLE_SUBTITLES[role] || ROLE_SUBTITLES.player;
  const checklist = ROLE_CHECKLISTS[role] || ROLE_CHECKLISTS.player;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {loading ? "Dashboard" : greeting}
          </h1>
          {!loading && (
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white",
                ROLE_COLORS[role] || "bg-gray-500"
              )}
            >
              {ROLE_LABELS[role] || role}
            </span>
          )}
        </div>
        <p className="mt-1 text-muted-foreground">
          {loading
            ? "Loading your team..."
            : `${schoolName} \u2014 ${teamName}`}
        </p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>

      {/* Team color accent bar */}
      {team && !loading && (
        <div
          className="h-1.5 w-full rounded-full"
          style={{
            background: `linear-gradient(to right, ${team.primary_color}, ${team.secondary_color})`,
          }}
        />
      )}

      {/* Cards */}
      <DashboardCards />

      {/* Today's Checklist */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold">Today&apos;s Checklist</h2>
        <ul className="space-y-3">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  item.done
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border"
                }`}
              >
                {item.done ? "\u2713" : ""}
              </span>
              <span
                className={
                  item.done ? "text-muted-foreground line-through" : ""
                }
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
