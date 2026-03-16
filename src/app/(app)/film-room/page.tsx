import { Film, Plus, ExternalLink } from "lucide-react";

export const metadata = { title: "Film Room" };

const mockResources = [
  { id: 1, title: "Riverside Game Film", category: "Game Film", url: "#", audience: "Everyone" },
  { id: 2, title: "Central Bears Scout Report", category: "Scout Film", url: "#", audience: "Coaches" },
  { id: 3, title: "Motion Offense Playbook", category: "Playbook", url: "#", audience: "Everyone" },
  { id: 4, title: "Press Break Concepts", category: "Concept", url: "#", audience: "Players" },
  { id: 5, title: "Box-Out Drill Demos", category: "Drill", url: "#", audience: "Everyone" },
];

const catColors: Record<string, string> = {
  "Game Film": "bg-blue-100 text-blue-700",
  "Scout Film": "bg-amber-100 text-amber-700",
  Playbook: "bg-green-100 text-green-700",
  Concept: "bg-purple-100 text-purple-700",
  Drill: "bg-pink-100 text-pink-700",
};

export default function FilmRoomPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Film Room</h1>
          <p className="mt-1 text-muted-foreground">Game film, scout reports, and playbook resources.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Resource
        </button>
      </div>

      <div className="space-y-3">
        {mockResources.map((r) => (
          <div key={r.id} className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Film className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{r.title}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${catColors[r.category] || "bg-muted text-muted-foreground"}`}>{r.category}</span>
                <span className="text-xs text-muted-foreground">{r.audience}</span>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
        ))}
      </div>
    </div>
  );
}
