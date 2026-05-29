"use server";

import type { DbListingInsert } from "@/lib/database.types";
import {
  buildListingInsertPayload,
  validateListingInsertPayload,
} from "@/lib/listings-schema";
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

export async function saveListingAction(
  rawBody: Record<string, unknown>,
  listingId?: string
): Promise<SaveListingResult> {
  logEnvStatus("saveListingAction");

  try {
    const input = buildListingInsertPayload(rawBody);
    console.log("[saveListingAction] insert payload:", input);

    const validationError = validateListingInsertPayload(input);
    if (validationError) {
      return { success: false, error: validationError };
    }

    const supabase = requireSupabaseAdminClient();

    if (listingId) {
      const { error } = await supabase
        .from("listings")
        .update(input as DbListingInsert)
        .eq("id", listingId);

      if (error) {
        console.error("[saveListingAction] Supabase update error:", error);
        return {
          success: false,
          error: formatSupabaseError(error, "Failed to update listing."),
        };
      }
    } else {
      const { error } = await supabase.from("listings").insert(input);

      if (error) {
        console.error("[saveListingAction] Supabase insert error:", error);
        return {
          success: false,
          error: formatSupabaseError(error, "Failed to create listing."),
        };
      }
    }

    console.log("[saveListingAction] success");
    return { success: true };
  } catch (error) {
    console.error("[saveListingAction] unexpected error:", error);
    return {
      success: false,
      error: formatSupabaseError(error, "Failed to save listing."),
    };
  }
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
