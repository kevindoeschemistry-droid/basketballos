import { Trophy, Plus } from "lucide-react";

export const metadata = { title: "Games" };

const mockGames = [
  { id: 1, opponent: "Riverside Hawks", date: "Mar 10", homeAway: "Home", score: "68-55", result: "W" },
  { id: 2, opponent: "Central Bears", date: "Mar 7", homeAway: "Away", score: "52-58", result: "L" },
  { id: 3, opponent: "Eastside Eagles", date: "Mar 3", homeAway: "Home", score: "71-63", result: "W" },
  { id: 4, opponent: "Westview Wolves", date: "Feb 28", homeAway: "Away", score: "65-60", result: "W" },
  { id: 5, opponent: "Northgate Knights", date: "Feb 24", homeAway: "Home", score: "45-50", result: "L" },
];

export default function GamesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Games</h1>
          <p className="mt-1 text-muted-foreground">Season record: 12–4</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" /> Add Game
        </button>
      </div>

      <div className="space-y-3">
        {mockGames.map((game) => (
          <div
            key={game.id}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${game.result === "W" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {game.result}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{game.opponent}</h3>
              <p className="text-sm text-muted-foreground">{game.date} · {game.homeAway}</p>
            </div>
            <span className="text-lg font-bold">{game.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
