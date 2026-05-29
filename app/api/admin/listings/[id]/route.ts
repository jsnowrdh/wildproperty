import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/admin-auth";
import {
  buildListingInsertPayload,
  logSupabaseEnvStatus,
  validateListingInsertPayload,
} from "@/lib/listings-schema";
import { toErrorMessage } from "@/lib/supabase-error";
import { requireSupabaseAdminClient } from "@/lib/supabase-admin";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteProps) {
  const authError = await requireAdminAuth(request);
  if (authError) return authError;

  logSupabaseEnvStatus("admin/listings PUT");

  try {
    const { id } = await params;
    const rawBody = (await request.json()) as Record<string, unknown>;
    console.log("[admin/listings PUT] id:", id, "body:", rawBody);

    const input = buildListingInsertPayload(rawBody);
    const validationError = validateListingInsertPayload(input);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const supabase = requireSupabaseAdminClient();
    const { data, error } = await supabase
      .from("listings")
      .update(input)
      .eq("id", id)
      .select("id, slug, title")
      .single();

    if (error) {
      console.error("[admin/listings PUT] Supabase error:", {
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

    return NextResponse.json({ success: true, listing: data });
  } catch (error) {
    console.error("[admin/listings PUT] unexpected error:", error);
    const message = toErrorMessage(error, "Failed to update listing.");
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(request: Request, { params }: RouteProps) {
  const authError = await requireAdminAuth(request);
  if (authError) return authError;

  logSupabaseEnvStatus("admin/listings DELETE");

  try {
    const { id } = await params;
    console.log("[admin/listings DELETE] id:", id);

    const supabase = requireSupabaseAdminClient();
    const { error } = await supabase.from("listings").delete().eq("id", id);

    if (error) {
      console.error("[admin/listings DELETE] Supabase error:", {
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[admin/listings DELETE] unexpected error:", error);
    const message = toErrorMessage(error, "Failed to delete listing.");
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
