import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  clearAdminAuthCookie,
  getAdminAuthCookieOptions,
} from "@/lib/admin-auth";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_AUTH_COOKIE, "", {
    ...getAdminAuthCookieOptions(request),
    maxAge: 0,
  });

  const response = NextResponse.redirect(new URL("/admin/login", request.url));
  clearAdminAuthCookie(response, request);
  return response;
}
