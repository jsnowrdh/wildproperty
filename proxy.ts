import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  applyAdminAuthCookie,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

function isServerActionRequest(request: NextRequest): boolean {
  return request.headers.has("next-action");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Server Actions POST to the page URL — never redirect (returns HTML → "unexpected response").
  if (isServerActionRequest(request)) {
    return NextResponse.next({ request });
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next({ request });
  }

  const authCookie = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  const isAuthenticated = isAdminAuthenticated(authCookie);

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next({ request });
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Re-set the session cookie on every admin page request so it persists across navigation.
    const response = NextResponse.next({ request });
    applyAdminAuthCookie(response, request);
    return response;
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
