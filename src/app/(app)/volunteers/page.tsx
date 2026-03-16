import { HandHelping, Plus, CheckCircle2 } from "lucide-react";

export const metadata = { title: "Volunteers" };

const mockSlots = [
  { id: 1, title: "Score Table", event: "vs. Riverside — Mar 20", spots: 2, filled: 1, volunteers: ["Sarah Johnson"] },
  { id: 2, title: "Snack Duty", event: "vs. Riverside — Mar 20", spots: 2, filled: 0, volunteers: [] },
  { id: 3, title: "Bookkeeper", event: "vs. Central — Mar 25", spots: 1, filled: 1, volunteers: ["Mike Williams"] },
  { id: 4, title: "Snack Duty", event: "vs. Central — Mar 25", spots: 2, filled: 2, volunteers: ["Lisa Davis", "Tom Carter"] },
];

export default function VolunteersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Volunteers</h1>
          <p className="mt-1 text-muted-foreground">Sign up for game day and event duties.</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Slot
        </button>
      </div>

      <div className="space-y-4">
        {mockSlots.map((slot) => (
          <div key={slot.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{slot.title}</h3>
                <p className="text-sm text-muted-foreground">{slot.event}</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${slot.filled >= slot.spots ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                {slot.filled}/{slot.spots} filled
              </span>
            </div>
            {slot.volunteers.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {slot.volunteers.map((v) => (
                  <span key={v} className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium">
                    <CheckCircle2 className="h-3 w-3 text-green-600" /> {v}
                  </span>
                ))}
              </div>
            )}
            {slot.filled < slot.spots && (
              <button className="mt-3 inline-flex items-center gap-2 rounded-full border border-primary bg-primary/5 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors">
                <HandHelping className="h-4 w-4" /> Sign Up
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
