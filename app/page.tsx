import Link from "next/link";
import {
  ArrowRight,
  Caravan,
  Globe,
  Mountain,
  Shield,
  Sparkles,
  Tent,
  TreePine,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { ListingCard } from "@/components/listing-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { SearchHero } from "@/components/search-hero";
import { PROPERTY_TYPES } from "@/lib/data";
import {
  getActiveListings,
  getUniqueStatesFromListings,
} from "@/lib/listings-db";
import {
  breadcrumbJsonLd,
  buildMetadata,
  organizationJsonLd,
} from "@/lib/seo";

export const metadata = buildMetadata({
  title: "WildProperty — Outdoor Hospitality Marketplace",
  description:
    "The marketplace for campgrounds, glamping retreats, RV parks, and nature resorts for sale. Browse active listings free.",
  path: "/",
});

const categoryIcons = {
  campground: Tent,
  "glamping-retreat": Sparkles,
  "rv-park": Caravan,
  "nature-resort": Mountain,
} as const;

const features = [
  {
    icon: Globe,
    title: "All in One Place",
    description:
      "The only marketplace dedicated entirely to campgrounds, glamping resorts, and RV parks. No more sifting through generic commercial listings.",
  },
  {
    icon: Shield,
    title: "Serious Buyers Only",
    description:
      "Our audience is investors, operators, and outdoor entrepreneurs actively looking to acquire — not casual browsers.",
  },
  {
    icon: TreePine,
    title: "Free to Browse",
    description:
      "Search every active listing without an account. Reach out to brokers directly when a property catches your eye.",
  },
];

export default async function HomePage() {
  const listings = await getActiveListings();
  const featured = listings.filter((listing) => listing.featured);
  const stateCount = getUniqueStatesFromListings(listings).length;

  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ]}
      />

      <section className="hero-gradient relative flex min-h-screen items-center overflow-hidden text-cream">
        <div
          className="absolute inset-0 mix-blend-overlay opacity-40"
          style={{
            backgroundImage:
              "url(https://picsum.photos/seed/wpforest/1920/1200)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-forest-deep/70" />

        <div className="relative mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-cream/30 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-cream/90">
            Outdoor hospitality marketplace
          </span>

          <h1 className="mx-auto mt-8 max-w-3xl font-serif text-4xl leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Find Your Place
            <br />
            in the Wild
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            The marketplace for campgrounds, glamping retreats, RV parks, and
            nature resorts for sale.
          </p>

          <div className="mt-10">
            <SearchHero />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream/75">
            <span>
              <span className="font-serif text-cream">{listings.length}</span>{" "}
              Active Listings
            </span>
            <span className="hidden h-4 w-px bg-cream/25 sm:inline-block" />
            <span>
              <span className="font-serif text-cream">{stateCount}</span> States
            </span>
            <span className="hidden h-4 w-px bg-cream/25 sm:inline-block" />
            <span>
              <span className="font-serif text-cream">Free</span> to Browse
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-terracotta">
              Currently on the market
            </p>
            <h2 className="font-serif text-4xl text-forest sm:text-5xl">
              Featured Properties
            </h2>
          </div>
          <Link
            href="/listings"
            className="hidden items-center gap-2 text-sm text-forest transition-colors hover:text-terracotta sm:inline-flex"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 text-sm text-forest hover:text-terracotta"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <section className="bg-cream-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Browse by category</p>
            <h2 className="mt-2 font-serif text-3xl text-forest sm:text-4xl">
              Every kind of outdoor business
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROPERTY_TYPES.map((category) => {
              const Icon = categoryIcons[category.slug];
              return (
                <Link
                  key={category.slug}
                  href={`/listings?type=${category.slug}`}
                  className="group rounded-2xl bg-card p-7 shadow-[0_2px_16px_rgba(26,48,33,0.05)] transition-shadow hover:shadow-[0_4px_24px_rgba(26,48,33,0.08)]"
                >
                  <Icon
                    className="size-6 text-terracotta"
                    strokeWidth={1.75}
                  />
                  <h3 className="mt-5 font-serif text-xl text-forest">
                    {category.label}s
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="section-label">Why WildProperty</p>
            <h2 className="mt-2 font-serif text-3xl text-forest sm:text-4xl">
              Built for outdoor hospitality
            </h2>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-sage">
                  <feature.icon
                    className="size-5 text-forest"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="mt-5 font-serif text-xl text-forest">
                  {feature.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterCta />
    </>
  );
}
