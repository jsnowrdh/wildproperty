import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { ListingsBrowser } from "@/components/listings-browser";
import { getActiveListings } from "@/lib/listings-db";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Browse Properties | WildProperty",
  description:
    "Search campgrounds, glamping retreats, RV parks, and nature resorts for sale across the US. Filter by property type, state, price, and acreage.",
  path: "/listings",
});

export default async function ListingsPage() {
  const listings = await getActiveListings();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Browse Properties", path: "/listings" },
        ])}
      />

      <Suspense fallback={null}>
        <ListingsBrowser listings={listings} />
      </Suspense>
    </>
  );
}
