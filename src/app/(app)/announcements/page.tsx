import { Megaphone, Pin, Plus } from "lucide-react";

export const metadata = { title: "Announcements" };

const mockAnnouncements = [
  {
    id: 1, title: "Schedule Change — Friday Game Moved to 6:00 PM",
    body: "The game against Riverside has been moved to 6:00 PM. Arrival time is now 5:00 PM. Please plan accordingly.",
    author: "Coach Williams", date: "Mar 14", pinned: true, audience: "Everyone",
  },
  {
    id: 2, title: "Spirit Pack Orders Due Friday",
    body: "Reminder: warm-up jacket orders close this Friday at midnight. Make sure to order the correct size.",
    author: "Coach Williams", date: "Mar 13", pinned: false, audience: "Parents",
  },
  {
    id: 3, title: "Film Session Monday 3 PM",
    body: "We will review film from the Central game. Attendance is mandatory for all varsity players.",
    author: "Coach Davis", date: "Mar 12", pinned: false, audience: "Players",
  },
];

export default function AnnouncementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Announcements</h1>
          <p className="mt-1 text-muted-foreground">Team updates and important notices.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="space-y-4">
        {mockAnnouncements.map((a) => (
          <div
            key={a.id}
            className={`rounded-xl border bg-card p-5 ${a.pinned ? "border-primary/30 bg-primary/5" : "border-border"}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                {a.pinned && <Pin className="h-4 w-4 text-primary" />}
                <h3 className="text-lg font-semibold">{a.title}</h3>
              </div>
              <span className="shrink-0 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {a.audience}
              </span>
            </div>
            <p className="mt-2 text-muted-foreground leading-relaxed">{a.body}</p>
            <p className="mt-3 text-xs text-muted-foreground">{a.author} · {a.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
