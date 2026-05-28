import { NextResponse } from "next/server";
import type { DbListingInsert } from "@/lib/database.types";
import { createListing, getAllListingsAdmin } from "@/lib/listings-db";

export async function GET() {
  try {
    const listings = await getAllListingsAdmin();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error("Admin listings GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings." },
      { status: 500 }
    );
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

    const listing = await createListing({
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
    });

    return NextResponse.json({ listing }, { status: 201 });
  } catch (error) {
    console.error("Admin listings POST error:", error);
    return NextResponse.json(
      { error: "Failed to create listing." },
      { status: 500 }
    );
  }
}
