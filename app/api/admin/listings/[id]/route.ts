import { NextResponse } from "next/server";
import type { DbListingInsert } from "@/lib/database.types";
import { deleteListing, updateListing } from "@/lib/listings-db";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    const body = (await request.json()) as Partial<DbListingInsert>;

    const listing = await updateListing(id, {
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
    });

    return NextResponse.json({ listing });
  } catch (error) {
    console.error("Admin listings PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update listing." },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteProps) {
  try {
    const { id } = await params;
    await deleteListing(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin listings DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete listing." },
      { status: 500 }
    );
  }
}
