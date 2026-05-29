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
