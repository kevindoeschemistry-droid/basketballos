"use client";

import { useState } from "react";
import { ClipboardCheck, Send, RotateCcw } from "lucide-react";

type Status = "present" | "excused_absent" | "unexcused_absent" | "late" | "injured";

const mockPlayers = [
  { id: "1", name: "Marcus Johnson", number: "3" },
  { id: "2", name: "Darius Williams", number: "5" },
  { id: "3", name: "Isaiah Thompson", number: "10" },
  { id: "4", name: "Jaylen Davis", number: "12" },
  { id: "5", name: "Andre Mitchell", number: "15" },
  { id: "6", name: "Cameron Brooks", number: "20" },
  { id: "7", name: "Tyler Robinson", number: "21" },
  { id: "8", name: "Kevin Moore", number: "23" },
  { id: "9", name: "Brandon Lee", number: "24" },
  { id: "10", name: "Malik Carter", number: "30" },
  { id: "11", name: "Derrick Hall", number: "32" },
  { id: "12", name: "Jamal Wright", number: "33" },
];

const statusLabels: Record<Status, string> = {
  present: "Present",
  excused_absent: "Excused",
  unexcused_absent: "Unexcused",
  late: "Late",
  injured: "Injured",
};

const statusColors: Record<Status, string> = {
  present: "bg-green-100 text-green-700 border-green-300",
  excused_absent: "bg-yellow-100 text-yellow-700 border-yellow-300",
  unexcused_absent: "bg-red-100 text-red-700 border-red-300",
  late: "bg-orange-100 text-orange-700 border-orange-300",
  injured: "bg-purple-100 text-purple-700 border-purple-300",
};

export default function AttendancePage() {
  const [entries, setEntries] = useState<Record<string, Status>>(
    Object.fromEntries(mockPlayers.map((p) => [p.id, "present" as Status]))
  );
  const [submitted, setSubmitted] = useState(false);

  function setStatus(playerId: string, status: Status) {
    setEntries((prev) => ({ ...prev, [playerId]: status }));
  }

  const presentCount = Object.values(entries).filter((s) => s === "present").length;
  const absentCount = Object.values(entries).filter((s) => s.includes("absent")).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Attendance</h1>
          <p className="mt-1 text-muted-foreground">
            Today&apos;s Practice — Main Gym
          </p>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex flex-wrap gap-3 rounded-xl border border-border bg-card p-4">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
          {presentCount} Present
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
          {absentCount} Absent
        </span>
        <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
          {mockPlayers.length} Total
        </span>
        {submitted && (
          <span className="ml-auto rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            Sent to Resident Life ✓
          </span>
        )}
      </div>

      {/* Player list */}
      <div className="space-y-2">
        {mockPlayers.map((player) => (
          <div
            key={player.id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {player.number}
              </div>
              <span className="font-medium">{player.name}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(statusLabels) as Status[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setStatus(player.id, status)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    entries[player.id] === status
                      ? statusColors[status]
                      : "border-border bg-background text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setSubmitted(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Send className="h-4 w-4" />
          Submit Attendance
        </button>
        {submitted && (
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-base font-medium hover:bg-muted transition-colors">
            <RotateCcw className="h-4 w-4" />
            Resend to Resident Life
          </button>
        )}
      </div>
    </div>
  );
}
