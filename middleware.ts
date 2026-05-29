import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

const PUBLIC_ADMIN_PATHS = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API routes validate auth in their own handlers (cookies() + Request headers).
  if (pathname.startsWith("/api/admin")) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  const isAuthenticated = isAdminAuthenticated(authCookie);

  if (PUBLIC_ADMIN_PATHS.includes(pathname)) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/listings/new", request.url));
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
