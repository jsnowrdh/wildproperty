import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import {
  buildListingInsertPayload,
  logSupabaseEnvStatus,
  validateListingInsertPayload,
} from "@/lib/listings-schema";
import { toErrorMessage } from "@/lib/supabase-error";
import { requireSupabaseAdminClient } from "@/lib/supabase-admin";
import { getAllListingsAdmin } from "@/lib/listings-db";

export async function GET(request: Request) {
  const authError = await requireAdminAuth(request);
  if (authError) return authError;

  try {
    logSupabaseEnvStatus("admin/listings GET");
    const listings = await getAllListingsAdmin();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error("[admin/listings GET] error:", error);
    const message = toErrorMessage(error, "Failed to fetch listings.");
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  const authError = await requireAdminAuth(request);
  if (authError) return authError;

  logSupabaseEnvStatus("admin/listings POST");

  try {
    const rawBody = await request.json();
    console.log("[admin/listings POST] raw body:", rawBody);

    const input = buildListingInsertPayload(
      rawBody as Record<string, unknown>
    );
    console.log("[admin/listings POST] parsed insert payload:", input);

    const validationError = validateListingInsertPayload(input);
    if (validationError) {
      console.log("[admin/listings POST] validation failed:", validationError);
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const supabase = requireSupabaseAdminClient();
    const { data, error } = await supabase
      .from("listings")
      .insert(input)
      .select("id, slug, title")
      .single();

    if (error) {
      console.error("[admin/listings POST] Supabase insert error:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        { error: error.message, code: error.code, details: error.details },
        { status: 500 }
      );
    }

    console.log("[admin/listings POST] insert success:", data);
    return NextResponse.json({ success: true, listing: data }, { status: 201 });
  } catch (error) {
    console.error("[admin/listings POST] unexpected error:", error);
    const message = toErrorMessage(error, "Failed to create listing.");
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
