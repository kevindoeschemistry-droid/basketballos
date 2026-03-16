"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgSlug, setOrgSlug] = useState("");
  const [role, setRole] = useState("head_coach");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleOrgNameChange(value: string) {
    setOrgName(value);
    // Auto-generate slug from school name
    setOrgSlug(
      value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 40)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setError(
        "BasketballOS is not connected to a database yet. Please contact support to get started."
      );
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, role, org_name: orgName, org_slug: orgSlug },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    } catch {
      setError("Unable to connect. Please try again later.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-xl font-black">B</span>
          </div>
          <h1 className="text-2xl font-bold">Check your email</h1>
          <p className="text-muted-foreground">
            We sent a confirmation link to <strong>{email}</strong>. Click it to
            activate your account.
          </p>
          <p className="text-sm text-muted-foreground">
            Your school URL will be:{" "}
            <strong className="text-foreground">{orgSlug}.basketballos.com</strong>
          </p>
          <Link
            href="/login"
            className="inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-black">B</span>
            </div>
            <span className="text-2xl font-bold">BasketballOS</span>
          </Link>
          <h1 className="mt-6 text-2xl font-bold">Set up your program</h1>
          <p className="mt-2 text-muted-foreground">
            Create your school&apos;s account in minutes
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* School / Organization */}
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              School Info
            </p>
            <div>
              <label htmlFor="orgName" className="mb-1.5 block text-sm font-medium">
                School or Organization Name
              </label>
              <input
                id="orgName"
                type="text"
                required
                value={orgName}
                onChange={(e) => handleOrgNameChange(e.target.value)}
                className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Lincoln High School"
              />
            </div>
            <div>
              <label htmlFor="orgSlug" className="mb-1.5 block text-sm font-medium">
                Your URL
              </label>
              <div className="flex items-center gap-0">
                <input
                  id="orgSlug"
                  type="text"
                  required
                  pattern="[a-z0-9-]+"
                  value={orgSlug}
                  onChange={(e) => setOrgSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="h-12 w-full rounded-l-lg border border-r-0 border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="lincoln-hs"
                />
                <span className="flex h-12 items-center rounded-r-lg border border-input bg-muted px-3 text-sm text-muted-foreground whitespace-nowrap">
                  .basketballos.com
                </span>
              </div>
            </div>
          </div>

          {/* Personal info */}
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              Your Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Coach Johnson"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="coach@school.edu"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label htmlFor="role" className="mb-1.5 block text-sm font-medium">
              Your Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="head_coach">Head Coach</option>
              <option value="assistant_coach">Assistant Coach</option>
              <option value="team_manager">Team Manager</option>
              <option value="athletic_director">Athletic Director</option>
              <option value="parent">Parent</option>
              <option value="player">Player</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-full bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
