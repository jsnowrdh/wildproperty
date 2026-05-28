import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { ListingDetailContent } from "@/components/listing-detail-content";
import { ListingsBrowser } from "@/components/listings-browser";
import {
  LISTINGS,
  PROPERTY_TYPES,
  getListingBySlug,
  getListingImageUrl,
  getListingsByTypeAndState,
  getPropertyTypeLabel,
  getStateBySlug,
} from "@/lib/data";
import {
  breadcrumbJsonLd,
  buildMetadata,
  listingDetailDescription,
  listingDetailTitle,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ segments: string[] }>;
}

export async function generateStaticParams() {
  const listingParams = LISTINGS.map((listing) => ({
    segments: [listing.slug],
  }));

  const locationParams: { segments: string[] }[] = [];
  const seen = new Set<string>();

  LISTINGS.forEach((listing) => {
    const key = `${listing.type}:${listing.stateSlug}`;
    if (!seen.has(key)) {
      seen.add(key);
      locationParams.push({
        segments: [listing.type, listing.stateSlug],
      });
    }
  });

  return [...listingParams, ...locationParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { segments } = await params;

  if (segments.length === 1) {
    const listing = getListingBySlug(segments[0]);
    if (!listing) {
      return { title: "Listing Not Found" };
    }
    return buildMetadata({
      title: listingDetailTitle(listing),
      description: listingDetailDescription(listing),
      path: `/listings/${listing.slug}`,
      openGraph: {
        images: [getListingImageUrl(listing.imageSeed)],
      },
    });
  }

  if (segments.length === 2) {
    const [type, state] = segments;
    const propertyType = PROPERTY_TYPES.find((item) => item.slug === type);
    const stateInfo = getStateBySlug(state);

    if (!propertyType || !stateInfo) {
      return { title: "Page Not Found" };
    }

    const title = `${propertyType.label}s for Sale in ${stateInfo.label}`;
    const description = `Browse ${propertyType.label.toLowerCase()}s for sale in ${stateInfo.label}. Filter by price and acreage on WildProperty.`;

    return buildMetadata({
      title,
      description,
      path: `/listings/${type}/${state}`,
    });
  }

  return { title: "Page Not Found" };
}

export default async function ListingsCatchAllPage({ params }: PageProps) {
  const { segments } = await params;

  if (segments.length === 1) {
    const listing = getListingBySlug(segments[0]);
    if (!listing) {
      notFound();
    }
    return <ListingDetailContent listing={listing} />;
  }

  if (segments.length === 2) {
    const [type, state] = segments;
    const propertyType = PROPERTY_TYPES.find((item) => item.slug === type);
    const stateInfo = getStateBySlug(state);

    if (!propertyType || !stateInfo) {
      notFound();
    }

    const listings = getListingsByTypeAndState(
      propertyType.slug,
      stateInfo.slug
    );

    const title = `${propertyType.label}s for Sale in ${stateInfo.label}`;
    const subtitle =
      listings.length > 0
        ? `${listings.length} ${listings.length === 1 ? "property" : "properties"} in ${stateInfo.label}`
        : `No active ${propertyType.label.toLowerCase()} listings in ${stateInfo.label} right now`;

    return (
      <>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Browse Properties", path: "/listings" },
            {
              name: getPropertyTypeLabel(propertyType.slug),
              path: `/listings?type=${propertyType.slug}`,
            },
            {
              name: stateInfo.label,
              path: `/listings/${type}/${state}`,
            },
          ])}
        />
        <Suspense fallback={null}>
          <ListingsBrowser
            listings={listings}
            initialTypes={[propertyType.slug]}
            initialState={stateInfo.value}
            showFilters={listings.length > 0}
            title={title}
            subtitle={subtitle}
          />
        </Suspense>
      </>
    );
  }

  notFound();
}
