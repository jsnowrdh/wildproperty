import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/json-ld";
import { ListingDetailContent } from "@/components/listing-detail-content";
import { LocationPageSections } from "@/components/location-page-sections";
import { ListingsBrowser } from "@/components/listings-browser";
import {
  LISTINGS,
  getListingBySlug,
  getListingImageUrl,
  getPropertyTypeLabel,
  getStateBySlug,
} from "@/lib/data";
import {
  generateLocationPageContent,
  getAllLocationPageParams,
  getLocationListings,
  isValidPropertyTypeSlug,
} from "@/lib/location-pages";
import {
  breadcrumbJsonLd,
  buildMetadata,
  listingDetailDescription,
  listingDetailTitle,
  locationPageJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ segments: string[] }>;
}

export async function generateStaticParams() {
  const listingParams = LISTINGS.map((listing) => ({
    segments: [listing.slug],
  }));

  const locationParams = getAllLocationPageParams().map(({ type, stateSlug }) => ({
    segments: [type, stateSlug],
  }));

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

    if (!isValidPropertyTypeSlug(type)) {
      return { title: "Page Not Found" };
    }

    const content = generateLocationPageContent(type, state);
    if (!content) {
      return { title: "Page Not Found" };
    }

    return buildMetadata({
      title: content.metaTitle,
      description: content.metaDescription,
      path: content.path,
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

    if (!isValidPropertyTypeSlug(type)) {
      notFound();
    }

    const stateInfo = getStateBySlug(state);
    const content = generateLocationPageContent(type, state);

    if (!stateInfo || !content) {
      notFound();
    }

    const listings = getLocationListings(type, state);

    return (
      <>
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Browse Properties", path: "/listings" },
              {
                name: getPropertyTypeLabel(type),
                path: `/listings?type=${type}`,
              },
              {
                name: stateInfo.label,
                path: content.path,
              },
            ]),
            ...locationPageJsonLd({
              title: content.h1,
              description: content.metaDescription,
              path: content.path,
              listings,
              faq: content.faq,
            }),
          ]}
        />
        <Suspense fallback={null}>
          <ListingsBrowser
            listings={listings}
            initialTypes={[type]}
            initialState={stateInfo.value}
            showFilters={listings.length > 0}
            title={content.h1}
            subtitle={content.subtitle}
          />
        </Suspense>
        <LocationPageSections content={content} />
      </>
    );
  }

  notFound();
}
