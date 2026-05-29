"use server";

import { cookies } from "next/headers";
import {
  ADMIN_AUTH_COOKIE,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import { deleteListing } from "@/lib/listings-db";
import { toErrorMessage } from "@/lib/supabase-error";

async function assertAdmin() {
  const cookieStore = await cookies();
  const auth = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!isAdminAuthenticated(auth)) {
    throw new Error("Unauthorized");
  }
}

export async function deleteListingAction(id: string) {
  try {
    await assertAdmin();
    await deleteListing(id);
    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      error: toErrorMessage(error, "Failed to delete listing."),
    };
  }
}
