"use server";

import type { DbListingInsert } from "@/lib/database.types";
import {
  buildListingInsertPayload,
  validateListingInsertPayload,
} from "@/lib/listings-schema";
import { createListing, updateListing } from "@/lib/listings-db";
import { formatSupabaseError } from "@/lib/supabase-error";
import { requireSupabaseAdminClient } from "@/lib/supabase-admin";

export type SaveListingResult =
  | { success: true }
  | { success: false; error: string };

function logEnvStatus(context: string) {
  console.log(`[${context}] Supabase env:`, {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? "set"
      : "MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "set"
      : "MISSING",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? "set"
      : "MISSING",
  });
}

async function persistListing(
  rawBody: Record<string, unknown>,
  listingId?: string
): Promise<SaveListingResult> {
  const context = listingId ? "updateListingAction" : "createListingAction";
  logEnvStatus(context);

  try {
    const input = buildListingInsertPayload(rawBody);
    console.log(`[${context}] payload:`, input);

    const validationError = validateListingInsertPayload(input);
    if (validationError) {
      return { success: false, error: validationError };
    }

    requireSupabaseAdminClient();

    if (listingId) {
      await updateListing(listingId, input as DbListingInsert);
    } else {
      await createListing(input as DbListingInsert);
    }

    console.log(`[${context}] success`);
    return { success: true };
  } catch (error) {
    console.error(`[${context}] unexpected error:`, error);
    return {
      success: false,
      error: formatSupabaseError(error, "Failed to save listing."),
    };
  }
}

/** Create a new listing via service role (auth enforced by middleware on /admin/*). */
export async function createListingAction(
  rawBody: Record<string, unknown>
): Promise<SaveListingResult> {
  return persistListing(rawBody);
}

/** Update an existing listing via service role (auth enforced by middleware on /admin/*). */
export async function updateListingAction(
  listingId: string,
  rawBody: Record<string, unknown>
): Promise<SaveListingResult> {
  if (!listingId.trim()) {
    return { success: false, error: "Listing ID is required to update." };
  }

  return persistListing(rawBody, listingId);
}

/** @deprecated Prefer createListingAction / updateListingAction */
export async function saveListingAction(
  rawBody: Record<string, unknown>,
  listingId?: string
): Promise<SaveListingResult> {
  return persistListing(rawBody, listingId);
}

export async function deleteListingAction(
  id: string
): Promise<SaveListingResult> {
  try {
    const supabase = requireSupabaseAdminClient();
    const { error } = await supabase.from("listings").delete().eq("id", id);

    if (error) {
      console.error("[deleteListingAction] Supabase error:", error);
      return {
        success: false,
        error: formatSupabaseError(error, "Failed to delete listing."),
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[deleteListingAction] unexpected error:", error);
    return {
      success: false,
      error: formatSupabaseError(error, "Failed to delete listing."),
    };
  }
}
