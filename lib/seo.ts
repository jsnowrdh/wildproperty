import type { Metadata } from "next";
import type { BlogPost, Listing } from "./data";
import {
  SITE_URL,
  getBlogImageUrl,
  getListingImageUrl,
  getPropertyTypeLabel,
} from "./data";

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function buildMetadata({
  title,
  description,
  path,
  openGraph,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  openGraph?: Metadata["openGraph"];
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "WildProperty",
      type: "website",
      ...openGraph,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WildProperty",
    url: SITE_URL,
    description:
      "The marketplace for campgrounds, glamping retreats, RV parks, and nature resorts for sale.",
    logo: absoluteUrl("/favicon.ico"),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function realEstateListingJsonLd(listing: Listing) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: listing.title,
    description: listing.description,
    url: absoluteUrl(`/listings/${listing.slug}`),
    datePosted: "2026-01-01",
    image: getListingImageUrl(listing.imageSeed),
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressRegion: listing.state,
      addressCountry: "US",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.acres,
      unitCode: "ACR",
    },
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: "WildProperty",
      url: SITE_URL,
    },
  };
}

export function blogPostJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    keywords: post.keyword,
    image: getBlogImageUrl(post.imageSeed),
    author: {
      "@type": "Organization",
      name: "WildProperty",
    },
    publisher: {
      "@type": "Organization",
      name: "WildProperty",
      url: SITE_URL,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function buildBlogPostMetadata(post: BlogPost): Metadata {
  const image = getBlogImageUrl(post.imageSeed);

  return buildMetadata({
    title: `${post.title} | WildProperty`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: image, width: 1200, height: 800, alt: post.title }],
    },
    keywords: [post.keyword, "outdoor hospitality", "WildProperty"],
  });
}

export function listingDetailTitle(listing: Listing): string {
  return `${listing.title} — ${getPropertyTypeLabel(listing.type)} for Sale in ${listing.location} | WildProperty`;
}

export function listingDetailDescription(listing: Listing): string {
  return `${listing.summary} Asking ${listing.priceDisplay} for ${listing.acres} acres in ${listing.location}.`;
}

export function locationPageJsonLd({
  title,
  description,
  path,
  listings,
  faq,
}: {
  title: string;
  description: string;
  path: string;
  listings: Listing[];
  faq: { question: string; answer: string }[];
}) {
  const url = absoluteUrl(path);

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url,
      isPartOf: {
        "@type": "WebSite",
        name: "WildProperty",
        url: SITE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ];

  if (listings.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      numberOfItems: listings.length,
      itemListElement: listings.map((listing, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/listings/${listing.slug}`),
        name: listing.title,
      })),
    });
  }

  return schemas;
}
