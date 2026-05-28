"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ListingCard } from "@/components/listing-card";
import type { Listing, PropertyType } from "@/lib/data";
import { PROPERTY_TYPES, US_STATES } from "@/lib/data";
import {
  type AcreageFilter,
  countActiveFilters,
  filterListings,
  parseTypesParam,
} from "@/lib/format";

const MAX_PRICE = 5_000_000;
const ITEMS_PER_PAGE = 2;

interface ListingsBrowserProps {
  listings: Listing[];
  initialTypes?: PropertyType[];
  initialState?: string;
  initialMinPrice?: number;
  initialMaxPrice?: number;
  initialAcreage?: AcreageFilter;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export function ListingsBrowser({
  listings,
  initialTypes = [],
  initialState = "all",
  initialMinPrice = 0,
  initialMaxPrice = MAX_PRICE,
  initialAcreage = "any",
  showFilters = true,
  title = "Browse Properties",
  subtitle,
}: ListingsBrowserProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const selectedTypes = parseTypesParam(
    searchParams.get("type") ??
      (initialTypes.length > 0 ? initialTypes.join(",") : null)
  );
  const state = searchParams.get("state") ?? initialState;
  const minPrice = Number(searchParams.get("minPrice") ?? initialMinPrice);
  const maxPrice = Number(searchParams.get("maxPrice") ?? initialMaxPrice);
  const acreage = (searchParams.get("acreage") ??
    initialAcreage) as AcreageFilter;

  const filterState = useMemo(
    () => ({
      types: selectedTypes,
      state,
      minPrice,
      maxPrice,
      acreage,
    }),
    [selectedTypes, state, minPrice, maxPrice, acreage]
  );

  const activeFilterCount = countActiveFilters(filterState);

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "all" || value === "any" || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      params.delete("page");
      const query = params.toString();
      router.push(query ? `/listings?${query}` : "/listings", {
        scroll: false,
      });
      setPage(1);
    },
    [router, searchParams]
  );

  const toggleType = (slug: PropertyType) => {
    const next = selectedTypes.includes(slug)
      ? selectedTypes.filter((t) => t !== slug)
      : [...selectedTypes, slug];
    updateParams({ type: next.length > 0 ? next.join(",") : null });
  };

  const filtered = useMemo(
    () => filterListings(listings, filterState),
    [listings, filterState]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const resultsLine = subtitle ?? (
    <>
      {activeFilterCount > 0 && (
        <>
          <span className="text-terracotta">
            {activeFilterCount} active filter{activeFilterCount === 1 ? "" : "s"}
          </span>
          <span> · </span>
        </>
      )}
      Showing {filtered.length} of {listings.length} properties
    </>
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-terracotta">
          Marketplace
        </p>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-5xl text-forest">{title}</h1>
          <p className="text-sm text-muted-foreground">{resultsLine}</p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        {showFilters && (
          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <div>
              <h3 className="mb-3 font-serif text-lg text-forest">
                Property Type
              </h3>
              <div className="space-y-2">
                {PROPERTY_TYPES.map((item) => (
                  <label
                    key={item.slug}
                    className="flex cursor-pointer items-center gap-3 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(item.slug)}
                      onChange={() => toggleType(item.slug)}
                      className="size-4 rounded border-input accent-forest"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3 font-serif text-lg text-forest">State</h3>
              <select
                value={state}
                onChange={(e) => updateParams({ state: e.target.value })}
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
              >
                <option value="all">All States</option>
                {US_STATES.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="mb-3 font-serif text-lg text-forest">
                Price Range
              </h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) =>
                    updateParams({ minPrice: e.target.value || "0" })
                  }
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                />
                <span className="text-muted-foreground">–</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) =>
                    updateParams({
                      maxPrice: e.target.value || String(MAX_PRICE),
                    })
                  }
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">$0 – $5M+</p>
            </div>

            <div>
              <h3 className="mb-3 font-serif text-lg text-forest">Acreage</h3>
              <select
                value={acreage}
                onChange={(e) =>
                  updateParams({
                    acreage: e.target.value === "any" ? null : e.target.value,
                  })
                }
                className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm"
              >
                <option value="any">Any</option>
                <option value="under-10">Under 10 acres</option>
                <option value="10-50">10–50 acres</option>
                <option value="50-100">50–100 acres</option>
                <option value="100-plus">100+ acres</option>
              </select>
            </div>

            <button
              type="button"
              onClick={() => router.push("/listings")}
              className="text-sm text-terracotta hover:underline"
            >
              Clear filters
            </button>
          </aside>
        )}

        <div>
          {filtered.length > 0 ? (
            <>
              <div className="grid gap-8 sm:grid-cols-2">
                {paginated.map((listing) => (
                  <ListingCard key={listing.slug} listing={listing} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-12 flex justify-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (pageNum) => (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setPage(pageNum)}
                        className={`size-10 rounded-full text-sm transition-colors ${
                          pageNum === page
                            ? "bg-forest text-cream"
                            : "border border-border text-foreground hover:bg-secondary"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
              <p className="font-serif text-lg text-forest">
                No properties match your filters
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try adjusting your search criteria or{" "}
                <Link href="/listings" className="text-terracotta underline">
                  clear all filters
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
