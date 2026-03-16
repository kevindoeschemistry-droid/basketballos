import { Bus, Plus, Users, MapPin } from "lucide-react";

export const metadata = { title: "Transportation" };

const mockDrivers = [
  { id: 1, name: "Coach Williams", vehicle: "Honda Pilot", seats: 6, riders: ["Marcus Johnson", "Darius Williams", "Isaiah Thompson"] },
  { id: 2, name: "Sarah Johnson", vehicle: "Toyota Highlander", seats: 5, riders: ["Jaylen Davis", "Andre Mitchell"] },
  { id: 3, name: "Mike Williams", vehicle: "Ford Explorer", seats: 5, riders: ["Cameron Brooks"] },
];

export default function TransportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Transportation</h1>
          <p className="mt-1 text-muted-foreground">Carpool plan for vs. Riverside — Friday, Mar 20</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Driver
        </button>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-card p-4">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {mockDrivers.length} Drivers
        </span>
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {mockDrivers.reduce((sum, d) => sum + d.riders.length, 0)} Riders assigned
        </span>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
          {mockDrivers.reduce((sum, d) => sum + d.seats - d.riders.length, 0)} Open seats
        </span>
      </div>

      {/* Drivers */}
      <div className="space-y-4">
        {mockDrivers.map((driver) => (
          <div key={driver.id} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">{driver.name}</h3>
                <p className="text-sm text-muted-foreground">{driver.vehicle} · {driver.seats} seats</p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${driver.riders.length >= driver.seats ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                {driver.riders.length}/{driver.seats}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {driver.riders.map((r) => (
                <span key={r} className="rounded-full bg-muted px-3 py-1 text-xs font-medium">{r}</span>
              ))}
              {driver.riders.length < driver.seats && (
                <span className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground">
                  Open seat
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
