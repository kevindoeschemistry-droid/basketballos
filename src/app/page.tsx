import Link from "next/link";
import {
  Calendar,
  ClipboardCheck,
  Users,
  Trophy,
  Megaphone,
  Bus,
  Heart,
  ShoppingBag,
  BarChart3,
  FileText,
  Film,
  HandHelping,
  ArrowRight,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Schedule",
    desc: "Games, practices, meetings — one calendar for everything.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance",
    desc: "Mark attendance and auto-send reports to Resident Life.",
  },
  {
    icon: Users,
    title: "Roster",
    desc: "Player cards, guardians, and full contact directory.",
  },
  {
    icon: Trophy,
    title: "Game Center",
    desc: "Scores, stats, film links, and postgame notes.",
  },
  {
    icon: Megaphone,
    title: "Announcements",
    desc: "Pin important updates. Target players, parents, or everyone.",
  },
  {
    icon: BarChart3,
    title: "Player Development",
    desc: "Track growth areas, goals, and coach evaluations.",
  },
  {
    icon: Film,
    title: "Film Room",
    desc: "Organize game film, scout reports, and playbook diagrams.",
  },
  {
    icon: FileText,
    title: "Practice Planner",
    desc: "Build practice plans with timed blocks and coaching points.",
  },
  {
    icon: HandHelping,
    title: "Volunteers",
    desc: "Parents sign up for snack duty, scorekeeping, and more.",
  },
  {
    icon: Bus,
    title: "Transportation",
    desc: "Carpool plans, drivers, seat assignments — no gaps.",
  },
  {
    icon: Heart,
    title: "Fundraising",
    desc: "Campaign goals, player progress, and contribution tracking.",
  },
  {
    icon: ShoppingBag,
    title: "Spirit Pack Store",
    desc: "Team gear catalog with sizes, deadlines, and order tracking.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              BasketballOS
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-green-500" />
          Now in early access
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          One calm place to run
          <br />
          <span className="text-primary">your basketball program</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Stop juggling Hudl, MaxPreps, group texts, Google Docs, and five other
          apps. BasketballOS is the all-in-one command center for coaches,
          players, and parents.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Start Free <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full border border-border px-8 py-3.5 text-base font-medium hover:bg-muted/50 transition-colors"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="mb-4 text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Everything your program needs
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-muted-foreground">
          Built for real coaches, not fantasy sports fans. Simple enough for a
          60-year-old coach, powerful enough for a whole athletic department.
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ready to simplify your season?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Set up your team in under 5 minutes. Free during early access.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} BasketballOS. Built for coaches, by
          coaches.
        </div>
      </footer>
    </div>
  );
}
