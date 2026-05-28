import type { MetadataRoute } from "next";
import {
  BLOG_POSTS,
  LISTINGS,
  PROPERTY_TYPES,
  SITE_URL,
} from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/listings`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/list`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/alerts`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const listingPages: MetadataRoute.Sitemap = LISTINGS.map((listing) => ({
    url: `${SITE_URL}/listings/${listing.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const locationPages: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  LISTINGS.forEach((listing) => {
    const key = `${listing.type}:${listing.stateSlug}`;
    if (!seen.has(key)) {
      seen.add(key);
      locationPages.push({
        url: `${SITE_URL}/listings/${listing.type}/${listing.stateSlug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  });

  PROPERTY_TYPES.forEach((type) => {
    locationPages.push({
      url: `${SITE_URL}/listings?type=${type.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...listingPages, ...locationPages, ...blogPages];
}
