import { NextResponse } from "next/server";
import type { DbListingInsert } from "@/lib/database.types";
import { getAllListingsAdmin, mapDbListingToListing } from "@/lib/listings-db";
import { requireSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const listings = await getAllListingsAdmin();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Admin listings GET error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to fetch listings.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as DbListingInsert;

    if (
      !body.slug?.trim() ||
      !body.title?.trim() ||
      !body.type?.trim() ||
      !body.city?.trim() ||
      !body.state?.trim() ||
      body.price === undefined ||
      body.acreage === undefined ||
      !body.description?.trim() ||
      !body.image_url?.trim()
    ) {
      return NextResponse.json(
        { error: "Missing required listing fields." },
        { status: 400 }
      );
    }

    const input: DbListingInsert = {
      slug: body.slug.trim(),
      title: body.title.trim(),
      type: body.type.trim(),
      city: body.city.trim(),
      state: body.state.trim().toUpperCase(),
      price: Number(body.price),
      acreage: Number(body.acreage),
      description: body.description.trim(),
      sites: body.sites ? Number(body.sites) : null,
      gross_revenue: body.gross_revenue?.trim() || null,
      noi: body.noi?.trim() || null,
      occupancy: body.occupancy?.trim() || null,
      image_url: body.image_url.trim(),
      status: body.status?.trim() || "active",
    };

    const supabase = requireSupabaseAdminClient();
    const { data, error } = await supabase
      .from("listings")
      .insert(input)
      .select("*")
      .single();

    if (error) throw error;

    return NextResponse.json(
      { listing: mapDbListingToListing(data) },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin listings POST error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create listing.";
    const status = message.includes("not configured") ? 503 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
