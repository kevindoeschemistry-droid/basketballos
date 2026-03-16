import { Calendar, Plus } from "lucide-react";

export const metadata = { title: "Schedule" };

const mockEvents = [
  { id: 1, type: "Practice", title: "Practice", time: "3:30 PM", location: "Main Gym", date: "Today" },
  { id: 2, type: "Game", title: "vs. Riverside Hawks", time: "7:00 PM", location: "Away — Riverside HS", date: "Fri, Mar 20" },
  { id: 3, type: "Film Session", title: "Film Review", time: "3:00 PM", location: "Room 204", date: "Mon, Mar 23" },
  { id: 4, type: "Practice", title: "Practice", time: "3:30 PM", location: "Main Gym", date: "Tue, Mar 24" },
  { id: 5, type: "Game", title: "vs. Central Bears", time: "6:30 PM", location: "Home — Main Gym", date: "Wed, Mar 25" },
];

const typeColors: Record<string, string> = {
  Practice: "bg-blue-100 text-blue-700",
  Game: "bg-amber-100 text-amber-700",
  "Film Session": "bg-purple-100 text-purple-700",
  Tournament: "bg-green-100 text-green-700",
};

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Schedule</h1>
          <p className="mt-1 text-muted-foreground">All upcoming events in one place.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Event
        </button>
      </div>

      <div className="space-y-3">
        {mockEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{event.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeColors[event.type] || "bg-muted text-muted-foreground"}`}>
                  {event.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{event.date} · {event.time} · {event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
