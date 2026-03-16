import { Settings, Users, Shield, Building2 } from "lucide-react";

export const metadata = { title: "Admin" };

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Admin</h1>
        <p className="mt-1 text-muted-foreground">Team settings, roles, and organization management.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <h3 className="font-semibold">Organization</h3>
          <p className="mt-1 text-sm text-muted-foreground">Manage school name, logo, and details.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <h3 className="font-semibold">Team Members</h3>
          <p className="mt-1 text-sm text-muted-foreground">Invite coaches, parents, and players.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Shield className="h-5 w-5" />
          </div>
          <h3 className="font-semibold">Roles & Permissions</h3>
          <p className="mt-1 text-sm text-muted-foreground">Manage who can view and edit data.</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Settings className="h-5 w-5" />
          </div>
          <h3 className="font-semibold">Team Settings</h3>
          <p className="mt-1 text-sm text-muted-foreground">Season, colors, mascot, and team details.</p>
        </div>
      </div>
    </div>
  );
}
