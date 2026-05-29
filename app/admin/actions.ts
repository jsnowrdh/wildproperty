"use server";

import { cookies } from "next/headers";
import type { DbListingInsert } from "@/lib/database.types";
import {
  ADMIN_AUTH_COOKIE,
  isAdminAuthenticated,
} from "@/lib/admin-auth";
import {
  createListing,
  deleteListing,
  updateListing,
} from "@/lib/listings-db";

async function assertAdmin() {
  const cookieStore = await cookies();
  const auth = cookieStore.get(ADMIN_AUTH_COOKIE)?.value;

  if (!isAdminAuthenticated(auth)) {
    throw new Error("Unauthorized");
  }
}

export async function saveListingAction(
  input: DbListingInsert,
  listingId?: string
) {
  await assertAdmin();

  if (listingId) {
    return updateListing(listingId, input);
  }

  return createListing(input);
}

export async function deleteListingAction(id: string) {
  await assertAdmin();
  await deleteListing(id);
}
