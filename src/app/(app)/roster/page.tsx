import { Users, Plus } from "lucide-react";

export const metadata = { title: "Roster" };

const mockPlayers = [
  { id: 1, name: "Marcus Johnson", number: "3", position: "PG", grade: "12th" },
  { id: 2, name: "Darius Williams", number: "5", position: "SG", grade: "11th" },
  { id: 3, name: "Isaiah Thompson", number: "10", position: "SF", grade: "12th" },
  { id: 4, name: "Jaylen Davis", number: "12", position: "PF", grade: "11th" },
  { id: 5, name: "Andre Mitchell", number: "15", position: "C", grade: "12th" },
  { id: 6, name: "Cameron Brooks", number: "20", position: "PG", grade: "10th" },
  { id: 7, name: "Tyler Robinson", number: "21", position: "SG", grade: "11th" },
  { id: 8, name: "Kevin Moore", number: "23", position: "SF", grade: "10th" },
  { id: 9, name: "Brandon Lee", number: "24", position: "PF", grade: "12th" },
  { id: 10, name: "Malik Carter", number: "30", position: "C", grade: "11th" },
  { id: 11, name: "Derrick Hall", number: "32", position: "SG", grade: "10th" },
  { id: 12, name: "Jamal Wright", number: "33", position: "PF", grade: "12th" },
];

export default function RosterPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Roster</h1>
          <p className="mt-1 text-muted-foreground">Lincoln Lions Varsity — 2025-26 Season</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Player
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockPlayers.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {player.number}
            </div>
            <div>
              <h3 className="font-semibold">{player.name}</h3>
              <p className="text-sm text-muted-foreground">
                {player.position} · {player.grade}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
