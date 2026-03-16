import { Heart, Plus } from "lucide-react";

export const metadata = { title: "Fundraising" };

const mockCampaign = {
  title: "Spring Car Wash Fundraiser",
  goal: 5000,
  raised: 2340,
  startDate: "Feb 15",
  endDate: "Apr 1",
  status: "active" as const,
};

const mockPlayerGoals = [
  { name: "Marcus Johnson", goal: 400, raised: 400, status: "Goal Met" },
  { name: "Darius Williams", goal: 400, raised: 320, status: "On Track" },
  { name: "Isaiah Thompson", goal: 400, raised: 180, status: "Behind" },
  { name: "Jaylen Davis", goal: 400, raised: 450, status: "Exceeded" },
  { name: "Andre Mitchell", goal: 400, raised: 250, status: "On Track" },
  { name: "Cameron Brooks", goal: 400, raised: 100, status: "Behind" },
];

const statusColors: Record<string, string> = {
  "On Track": "bg-blue-100 text-blue-700",
  Behind: "bg-red-100 text-red-700",
  "Goal Met": "bg-green-100 text-green-700",
  Exceeded: "bg-emerald-100 text-emerald-700",
};

export default function FundraisingPage() {
  const pct = Math.round((mockCampaign.raised / mockCampaign.goal) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Fundraising</h1>
          <p className="mt-1 text-muted-foreground">Track team and player fundraising progress.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> New Campaign
        </button>
      </div>

      {/* Campaign overview */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold">{mockCampaign.title}</h3>
        <p className="text-sm text-muted-foreground">{mockCampaign.startDate} — {mockCampaign.endDate}</p>
        <div className="mt-4">
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold">${mockCampaign.raised.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">of ${mockCampaign.goal.toLocaleString()} goal</span>
          </div>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-2 text-sm font-medium text-muted-foreground">{pct}% complete</p>
        </div>
      </div>

      {/* Player progress */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">Player Progress</h2>
        <div className="space-y-3">
          {mockPlayerGoals.map((p) => {
            const playerPct = Math.round((p.raised / p.goal) * 100);
            return (
              <div key={p.name} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{p.name}</h4>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.status]}`}>{p.status}</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(playerPct, 100)}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">${p.raised} / ${p.goal}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
