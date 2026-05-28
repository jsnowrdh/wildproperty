import type { PropertyType } from "./data";

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const millions = price / 1_000_000;
    return `$${millions % 1 === 0 ? millions.toFixed(0) : millions.toFixed(2)}M`;
  }
  if (price >= 1_000) {
    return `$${Math.round(price / 1_000)}K`;
  }
  return `$${price.toLocaleString()}`;
}

export function formatAcres(acres: number): string {
  return `${acres} acre${acres === 1 ? "" : "s"}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export type AcreageFilter = "any" | "under-10" | "10-50" | "50-100" | "100-plus";

export function matchesAcreageFilter(
  acres: number,
  filter: AcreageFilter
): boolean {
  switch (filter) {
    case "under-10":
      return acres < 10;
    case "10-50":
      return acres >= 10 && acres <= 50;
    case "50-100":
      return acres > 50 && acres <= 100;
    case "100-plus":
      return acres > 100;
    default:
      return true;
  }
}

export interface ListingFilters {
  types?: PropertyType[];
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  acreage?: AcreageFilter;
}

export function filterListings<
  T extends {
    type: PropertyType;
    state: string;
    price: number;
    acres: number;
  },
>(listings: T[], filters: ListingFilters): T[] {
  return listings.filter((listing) => {
    if (
      filters.types &&
      filters.types.length > 0 &&
      !filters.types.includes(listing.type)
    ) {
      return false;
    }
    if (filters.state && filters.state !== "all" && listing.state !== filters.state) {
      return false;
    }
    if (filters.minPrice !== undefined && listing.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && listing.price > filters.maxPrice) {
      return false;
    }
    if (
      filters.acreage &&
      filters.acreage !== "any" &&
      !matchesAcreageFilter(listing.acres, filters.acreage)
    ) {
      return false;
    }
    return true;
  });
}

export function countActiveFilters(filters: ListingFilters): number {
  let count = 0;
  if (filters.types && filters.types.length > 0) count += 1;
  if (filters.state && filters.state !== "all") count += 1;
  if (filters.minPrice !== undefined && filters.minPrice > 0) count += 1;
  if (filters.maxPrice !== undefined && filters.maxPrice < 5_000_000) count += 1;
  if (filters.acreage && filters.acreage !== "any") count += 1;
  return count;
}

export function parseTypesParam(value: string | null): PropertyType[] {
  if (!value) return [];
  return value.split(",").filter(Boolean) as PropertyType[];
}
