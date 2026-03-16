import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Domains that should show the marketing/landing page (not a tenant)
const ROOT_DOMAINS = [
  "basketballos.com",
  "basketballos.vercel.app",
  "localhost",
  "127.0.0.1",
];

function extractSubdomain(host: string): string | null {
  // Remove port
  const hostname = host.split(":")[0];

  // Check if this is a root domain (no subdomain)
  for (const root of ROOT_DOMAINS) {
    if (hostname === root || hostname === `www.${root}`) {
      return null;
    }
    // e.g. lincoln.basketballos.com → "lincoln"
    if (hostname.endsWith(`.${root}`)) {
      const sub = hostname.replace(`.${root}`, "");
      if (sub && !sub.includes(".")) {
        return sub;
      }
    }
  }

  // Vercel preview URLs: lincoln-basketballos-xxx.vercel.app
  if (hostname.endsWith(".vercel.app")) {
    return null; // Don't treat Vercel preview deploys as tenants
  }

  return null;
}

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";

  // Extract tenant subdomain
  const subdomain = extractSubdomain(host);

  // Store subdomain in a header so pages can read the tenant context
  if (subdomain) {
    supabaseResponse.headers.set("x-tenant-slug", subdomain);
  }

  // Protect (app) routes — require login
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/schedule") ||
    pathname.startsWith("/attendance") ||
    pathname.startsWith("/announcements") ||
    pathname.startsWith("/roster") ||
    pathname.startsWith("/games") ||
    pathname.startsWith("/practices") ||
    pathname.startsWith("/development") ||
    pathname.startsWith("/film-room") ||
    pathname.startsWith("/files") ||
    pathname.startsWith("/directory") ||
    pathname.startsWith("/volunteers") ||
    pathname.startsWith("/transport") ||
    pathname.startsWith("/fundraising") ||
    pathname.startsWith("/store") ||
    pathname.startsWith("/admin")
  ) {
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from auth pages
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
