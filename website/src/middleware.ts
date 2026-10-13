import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Lightweight, Edge-safe middleware to guard /admin routes.
 *
 * Checks for the presence of the secure HttpOnly admin session cookie.
 * Authoritative authentication & role verification is strictly enforced
 * server-side on every backend API request.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow login page through
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check for admin_session cookie
  const sessionToken = req.cookies.get("admin_session")?.value;

  if (!sessionToken) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Attach security headers for admin pages
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
