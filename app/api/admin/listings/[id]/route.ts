import { NextResponse } from "next/server";
import type { DbListingInsert } from "@/lib/database.types";
import { mapDbListingToListing } from "@/lib/listings-db";
import { requireSupabaseAdminClient } from "@/lib/supabase-admin";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<DbListingInsert>;

    const supabase = requireSupabaseAdminClient();
    const { data, error } = await supabase
      .from("listings")
      .update({
        ...body,
        slug: body.slug?.trim(),
        title: body.title?.trim(),
        type: body.type?.trim(),
        city: body.city?.trim(),
        state: body.state?.trim().toUpperCase(),
        price: body.price !== undefined ? Number(body.price) : undefined,
        acreage: body.acreage !== undefined ? Number(body.acreage) : undefined,
        description: body.description?.trim(),
        sites: body.sites !== undefined ? Number(body.sites) : undefined,
        gross_revenue: body.gross_revenue?.trim() || null,
        noi: body.noi?.trim() || null,
        occupancy: body.occupancy?.trim() || null,
        image_url: body.image_url?.trim(),
        status: body.status?.trim(),
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json({ listing: mapDbListingToListing(data) });
  } catch (error) {
    console.error("Admin listings PUT error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update listing.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const supabase = requireSupabaseAdminClient();
    const { error } = await supabase.from("listings").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin listings DELETE error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to delete listing.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
