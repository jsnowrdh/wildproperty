import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_AUTH_COOKIE = "admin_auth";
export const ADMIN_AUTH_VALUE = "authenticated";

export function isAdminAuthenticated(cookieValue: string | undefined): boolean {
  return cookieValue === ADMIN_AUTH_VALUE;
}

export const adminAuthCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7,
};

function readAuthFromCookieHeader(
  cookieHeader: string | null
): string | undefined {
  if (!cookieHeader) return undefined;

  for (const part of cookieHeader.split(";")) {
    const [name, ...valueParts] = part.trim().split("=");
    if (name === ADMIN_AUTH_COOKIE) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return undefined;
}

/** Resolve admin session from Next cookies() and optional Request cookie header. */
export async function resolveAdminAuth(
  request?: Request
): Promise<string | undefined> {
  const cookieStore = await cookies();
  const fromStore = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (isAdminAuthenticated(fromStore)) {
    return fromStore;
  }

  if (request) {
    const fromHeader = readAuthFromCookieHeader(
      request.headers.get("cookie")
    );
    if (isAdminAuthenticated(fromHeader)) {
      return fromHeader;
    }
  }

  return undefined;
}

/** Returns a 401 response when unauthenticated, otherwise null. */
export async function requireAdminAuth(
  request?: Request
): Promise<NextResponse | null> {
  const auth = await resolveAdminAuth(request);

  if (!isAdminAuthenticated(auth)) {
    console.log("[requireAdminAuth] rejected — admin_auth cookie missing or invalid");
    return NextResponse.json(
      { error: "Unauthorized. Please log in again." },
      { status: 401 }
    );
  }

  return null;
}
