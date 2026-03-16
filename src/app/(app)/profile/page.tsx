"use client";

import { useTenant } from "@/lib/tenant-context";
import { ROLE_LABELS, ROLE_COLORS } from "@/lib/role-nav";
import { cn } from "@/lib/utils";
import { User, Mail, Shield, Building2, Users } from "lucide-react";

export default function ProfilePage() {
  const { organization, team, profile, membership, loading } = useTenant();

  const role = membership?.role || profile?.role || "player";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Profile
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your account details and team info.
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={profile.full_name}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-white text-2xl font-bold"
              style={{ backgroundColor: team?.primary_color || "#1e3a5f" }}
            >
              {profile?.full_name?.[0]?.toUpperCase() || "?"}
            </div>
          )}

          <div className="min-w-0 flex-1 space-y-1">
            <h2 className="text-xl font-bold">
              {profile?.full_name || "Unknown User"}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white",
                  ROLE_COLORS[role] || "bg-gray-500"
                )}
              >
                {ROLE_LABELS[role] || role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Account Details */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-semibold text-lg">Account Details</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <User className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Name</span>
              <span className="ml-auto font-medium">
                {profile?.full_name || "—"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Email</span>
              <span className="ml-auto font-medium">
                {profile?.email || "—"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Role</span>
              <span className="ml-auto font-medium">
                {ROLE_LABELS[role] || role}
              </span>
            </div>
          </div>
        </div>

        {/* Team Details */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-4">
          <h3 className="font-semibold text-lg">Team Info</h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">School</span>
              <span className="ml-auto font-medium">
                {organization?.name || "—"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Users className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Team</span>
              <span className="ml-auto font-medium">
                {team?.name || "—"}
              </span>
            </div>

            {team?.level && (
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Level</span>
                <span className="ml-auto font-medium">{team.level}</span>
              </div>
            )}

            {team?.season && (
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">Season</span>
                <span className="ml-auto font-medium">{team.season}</span>
              </div>
            )}
          </div>

          {/* Team colors */}
          {team && (
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-2">Team Colors</p>
              <div className="flex gap-2">
                <div
                  className="h-8 w-8 rounded-lg border"
                  style={{ backgroundColor: team.primary_color }}
                  title="Primary"
                />
                <div
                  className="h-8 w-8 rounded-lg border"
                  style={{ backgroundColor: team.secondary_color }}
                  title="Secondary"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
