import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_AUTH_COOKIE = "admin_auth";
export const ADMIN_AUTH_VALUE = "authenticated";
/** Session lifetime in seconds (24 hours). */
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24;

export function isAdminAuthenticated(cookieValue: string | undefined): boolean {
  return cookieValue === ADMIN_AUTH_VALUE;
}

export function getAdminAuthCookieOptions(request?: Pick<Request, "url">) {
  const isSecure =
    request != null
      ? new URL(request.url).protocol === "https:"
      : process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isSecure,
    sameSite: "lax" as const,
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  };
}

/** @deprecated Use getAdminAuthCookieOptions(request) for request-aware secure flag */
export const adminAuthCookieOptions = getAdminAuthCookieOptions();

export function applyAdminAuthCookie(
  response: NextResponse,
  request?: Pick<Request, "url">
) {
  response.cookies.set(
    ADMIN_AUTH_COOKIE,
    ADMIN_AUTH_VALUE,
    getAdminAuthCookieOptions(request)
  );
  return response;
}

export function clearAdminAuthCookie(
  response: NextResponse,
  request?: Pick<Request, "url">
) {
  response.cookies.set(ADMIN_AUTH_COOKIE, "", {
    ...getAdminAuthCookieOptions(request),
    maxAge: 0,
  });
  return response;
}

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
