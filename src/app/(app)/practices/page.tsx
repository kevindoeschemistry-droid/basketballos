import { FileText, Plus, Copy } from "lucide-react";

export const metadata = { title: "Practice Plans" };

const mockPlans = [
  {
    id: 1, title: "Game Prep — Riverside", date: "Mar 14", duration: "90 min",
    blocks: ["Warmup (10 min)", "Defensive Rotations (20 min)", "Transition Offense (20 min)", "Scrimmage (25 min)", "Free Throws (15 min)"],
  },
  {
    id: 2, title: "Shooting Focus", date: "Mar 12", duration: "90 min",
    blocks: ["Warmup (10 min)", "Catch & Shoot (20 min)", "Ball Screens (20 min)", "3-on-3 (20 min)", "Conditioning (20 min)"],
  },
  {
    id: 3, title: "Defensive Day", date: "Mar 10", duration: "75 min",
    blocks: ["Warmup (10 min)", "Shell Drill (15 min)", "Help & Recover (15 min)", "Press Break (15 min)", "Scrimmage (20 min)"],
  },
];

export default function PracticesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Practice Plans</h1>
          <p className="mt-1 text-muted-foreground">Plan, organize, and reuse practice sessions.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> New Plan
        </button>
      </div>

      <div className="space-y-4">
        {mockPlans.map((plan) => (
          <div key={plan.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{plan.title}</h3>
                <p className="text-sm text-muted-foreground">{plan.date} · {plan.duration}</p>
              </div>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors">
                <Copy className="h-3 w-3" /> Duplicate
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {plan.blocks.map((block, i) => (
                <span key={i} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {block}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
