"use server";

import {
  isAdminAuthenticated,
  resolveAdminAuth,
} from "@/lib/admin-auth";
import { createListing, deleteListing, updateListing } from "@/lib/listings-db";
import {
  buildListingInsertPayload,
  validateListingInsertPayload,
} from "@/lib/listings-schema";
import { toErrorMessage } from "@/lib/supabase-error";

export type SaveListingResult =
  | { success: true }
  | { success: false; error: string };

async function assertAdmin() {
  const auth = await resolveAdminAuth();
  if (!isAdminAuthenticated(auth)) {
    throw new Error("Unauthorized. Please log in again.");
  }
}

export async function saveListingAction(
  rawBody: Record<string, unknown>,
  listingId?: string
): Promise<SaveListingResult> {
  try {
    await assertAdmin();

    const input = buildListingInsertPayload(rawBody);
    const validationError = validateListingInsertPayload(input);
    if (validationError) {
      return { success: false, error: validationError };
    }

    if (listingId) {
      await updateListing(listingId, input);
    } else {
      await createListing(input);
    }

    return { success: true };
  } catch (error) {
    console.error("[saveListingAction] error:", error);
    return {
      success: false,
      error: toErrorMessage(error, "Failed to save listing."),
    };
  }
}

export async function deleteListingAction(
  id: string
): Promise<SaveListingResult> {
  try {
    await assertAdmin();
    await deleteListing(id);
    return { success: true };
  } catch (error) {
    console.error("[deleteListingAction] error:", error);
    return {
      success: false,
      error: toErrorMessage(error, "Failed to delete listing."),
    };
  }
}
