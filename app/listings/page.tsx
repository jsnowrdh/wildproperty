import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { ListingsBrowser } from "@/components/listings-browser";
import { LISTINGS } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Outdoor Hospitality Properties For Sale",
  description:
    "Search campgrounds, glamping retreats, RV parks, and nature resorts for sale across the US. Filter by property type, state, price, and acreage.",
  path: "/listings",
});

export default function ListingsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Browse Properties", path: "/listings" },
        ])}
      />
      <Suspense fallback={<ListingsLoading />}>
        <ListingsBrowser listings={LISTINGS} />
      </Suspense>
    </>
  );
}

function ListingsLoading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-3 h-3 w-32 animate-pulse rounded bg-muted" />
      <div className="h-10 w-64 animate-pulse rounded bg-muted" />
    </div>
  );
}
