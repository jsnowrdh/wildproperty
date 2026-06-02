import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  ADMIN_AUTH_VALUE,
  getAdminAuthCookieOptions,
} from "@/lib/admin-auth";

interface LoginRequestBody {
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequestBody;
    const password = body.password?.trim();

    if (!password) {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "Admin login is not configured." },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set(
      ADMIN_AUTH_COOKIE,
      ADMIN_AUTH_VALUE,
      getAdminAuthCookieOptions(request)
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
