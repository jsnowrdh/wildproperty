import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

function isServerActionRequest(request: NextRequest): boolean {
  return request.headers.has("next-action");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Server Actions POST to the page URL — never redirect (returns HTML → "unexpected response").
  // Auth is validated inside the action via cookies().
  if (isServerActionRequest(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  const isAuthenticated = isAdminAuthenticated(authCookie);

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
