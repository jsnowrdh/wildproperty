import type { DbListing, DbListingInsert } from "@/lib/database.types";
import type { Listing, PropertyType } from "@/lib/data";
import { getStateByCode } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { toErrorMessage } from "@/lib/supabase-error";
import { createSupabaseClient } from "@/lib/supabase";
import { requireSupabaseAdminClient } from "@/lib/supabase-admin";

function summarize(description: string): string {
  if (description.length <= 160) return description;
  return `${description.slice(0, 157).trim()}...`;
}

export function mapDbListingToListing(row: DbListing): Listing {
  const stateInfo = getStateByCode(row.state);

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    city: row.city,
    state: row.state,
    stateSlug: stateInfo?.slug ?? row.state.toLowerCase(),
    location: `${row.city}, ${row.state}`,
    price: Number(row.price),
    priceDisplay: formatPrice(Number(row.price)),
    acres: Number(row.acreage),
    type: row.type as PropertyType,
    description: row.description,
    summary: summarize(row.description),
    imageUrl: row.image_url,
    featured: true,
    sites: row.sites ?? undefined,
    highlights: [],
    amenities: [],
    financials:
      row.gross_revenue || row.noi || row.occupancy
        ? {
            grossRevenue: row.gross_revenue ?? undefined,
            noi: row.noi ?? undefined,
            occupancy: row.occupancy ?? undefined,
          }
        : undefined,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function getActiveListings(): Promise<Listing[]> {
  const supabase = createSupabaseClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getActiveListings error:", error);
    return [];
  }

  return (data ?? []).map(mapDbListingToListing);
}

export async function getAllListingsAdmin(): Promise<Listing[]> {
  const supabase = requireSupabaseAdminClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllListingsAdmin error:", error);
    return [];
  }

  return (data ?? []).map(mapDbListingToListing);
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const supabase = createSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("getListingBySlug error:", error);
    return null;
  }

  return data ? mapDbListingToListing(data) : null;
}

export async function getListingByIdAdmin(id: string): Promise<Listing | null> {
  const supabase = requireSupabaseAdminClient();

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("getListingByIdAdmin error:", error);
    return null;
  }

  return data ? mapDbListingToListing(data) : null;
}

export async function getListingsByTypeAndState(
  type: PropertyType,
  stateSlug: string
): Promise<Listing[]> {
  const listings = await getActiveListings();
  return listings.filter(
    (listing) => listing.type === type && listing.stateSlug === stateSlug
  );
}

export async function getRelatedListings(
  listing: Listing,
  limit = 3
): Promise<Listing[]> {
  const listings = await getActiveListings();
  return listings
    .filter((item) => item.type === listing.type && item.slug !== listing.slug)
    .slice(0, limit);
}

export function getUniqueStatesFromListings(listings: Listing[]): string[] {
  return [...new Set(listings.map((listing) => listing.state))];
}

export async function createListing(input: DbListingInsert) {
  const supabase = requireSupabaseAdminClient();

  const { data, error } = await supabase
    .from("listings")
    .insert(input)
    .select("*")
    .single();

  if (error) {
    throw new Error(toErrorMessage(error, "Failed to create listing."));
  }
  return mapDbListingToListing(data);
}

export async function updateListing(id: string, input: Partial<DbListingInsert>) {
  const supabase = requireSupabaseAdminClient();

  const { data, error } = await supabase
    .from("listings")
    .update(input)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(toErrorMessage(error, "Failed to update listing."));
  }
  return mapDbListingToListing(data);
}

export async function deleteListing(id: string) {
  const supabase = requireSupabaseAdminClient();

  const { error } = await supabase.from("listings").delete().eq("id", id);
  if (error) {
    throw new Error(toErrorMessage(error, "Failed to delete listing."));
  }
}

export function resolveListingImage(
  listing: Pick<Listing, "imageUrl">,
  width = 800,
  height = 600
): string {
  const fallback = `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
  const url = listing.imageUrl?.trim();
  if (!url) return fallback;
  if (url.startsWith("http")) return url;
  if (url.startsWith("photo-")) {
    return `https://images.unsplash.com/${url}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
  }
  return url;
}
