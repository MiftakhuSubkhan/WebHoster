import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("webhoster_admin_session")?.value;
  const isAuthenticated = session === "authenticated";

  // 1. Trap generic admin routes (/admin and /admin/:path*)
  // Silently redirect automated scanners and probes to homepage
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Secret Authentication Gateway (/wh-auth)
  if (pathname === "/wh-auth") {
    // If user is already authenticated, redirect directly to admin workspace panel
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/wh-panel", request.url));
    }
    return NextResponse.next();
  }

  // 3. Protected Admin Workspace Panel (/wh-panel and /wh-panel/:path*)
  if (pathname === "/wh-panel" || pathname.startsWith("/wh-panel/")) {
    // Unauthenticated requests must be redirected immediately to /wh-auth
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/wh-auth", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/wh-panel/:path*", "/wh-auth"],
};
