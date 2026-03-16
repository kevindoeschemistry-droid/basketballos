import { BarChart3 } from "lucide-react";

export const metadata = { title: "Player Development" };

const categories = ["Shooting", "Ball Handling", "Passing", "Defense", "Rebounding", "Conditioning", "Leadership", "Effort"];

const mockPlayers = [
  { name: "Marcus Johnson", strengths: ["Shooting", "Leadership"], growth: ["Defense", "Rebounding"] },
  { name: "Darius Williams", strengths: ["Ball Handling", "Passing"], growth: ["Shooting", "Conditioning"] },
  { name: "Isaiah Thompson", strengths: ["Defense", "Effort"], growth: ["Shooting", "Ball Handling"] },
  { name: "Jaylen Davis", strengths: ["Rebounding", "Conditioning"], growth: ["Passing", "Leadership"] },
];

export default function DevelopmentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Player Development</h1>
        <p className="mt-1 text-muted-foreground">Track strengths, growth areas, and goals for each player.</p>
      </div>

      <div className="space-y-4">
        {mockPlayers.map((player) => (
          <div key={player.name} className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-lg font-semibold">{player.name}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-medium text-green-700">Strengths</p>
                <div className="flex flex-wrap gap-2">
                  {player.strengths.map((s) => (
                    <span key={s} className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-amber-700">Growth Areas</p>
                <div className="flex flex-wrap gap-2">
                  {player.growth.map((g) => (
                    <span key={g} className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">{g}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
