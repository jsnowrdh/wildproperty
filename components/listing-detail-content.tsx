import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ListingCard } from "@/components/listing-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListingInquiryForm } from "@/components/listing-inquiry-form";
import { Separator } from "@/components/ui/separator";
import type { Listing } from "@/lib/data";
import {
  getPropertyTypeLabel,
} from "@/lib/data";
import { getRelatedListings, resolveListingImage } from "@/lib/listings-db";
import { formatAcres } from "@/lib/format";
import { breadcrumbJsonLd, realEstateListingJsonLd } from "@/lib/seo";
import { ArrowLeft, Building2, CheckCircle2, Mail, Phone, User } from "lucide-react";

interface ListingDetailContentProps {
  listing: Listing;
  related?: Listing[];
}

export function ListingDetailContent({
  listing,
  related = [],
}: ListingDetailContentProps) {

  return (
    <>
      <JsonLd
        data={[
          realEstateListingJsonLd(listing),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Browse Properties", path: "/listings" },
            { name: listing.title, path: `/listings/${listing.slug}` },
          ]),
        ]}
      />

      <article className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
          <Link href="/listings">
            <ArrowLeft className="size-4" />
            Back to listings
          </Link>
        </Button>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
              <Image
                src={resolveListingImage(listing, 1200, 750)}
                alt={listing.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            <div className="mt-8">
              <Badge className="rounded-full bg-white/95 text-forest shadow-sm">
                {getPropertyTypeLabel(listing.type)}
              </Badge>
              <h1 className="mt-4 font-serif text-3xl tracking-tight text-forest sm:text-4xl">
                {listing.title}
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                {listing.location}
              </p>

              <Separator className="my-8" />

              <section>
                <h2 className="font-serif text-xl text-forest">
                  About this property
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {listing.description}
                </p>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-semibold text-forest">Highlights</h2>
                <ul className="mt-4 space-y-3">
                  {listing.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-forest-light" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="mt-8">
                <h2 className="text-xl font-semibold text-forest">Amenities</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {listing.amenities.map((item) => (
                    <Badge key={item} variant="outline">
                      {item}
                    </Badge>
                  ))}
                </div>
              </section>
            </div>
          </div>

          <aside>
            <div className="sticky top-24 rounded-2xl bg-card p-6 shadow-[0_2px_16px_rgba(26,48,33,0.06)]">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">
                Asking Price
              </p>
              <p className="mt-1 font-serif text-3xl text-forest">
                {listing.priceDisplay}
              </p>

              <dl className="mt-6 space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Acreage</dt>
                  <dd className="font-medium">{formatAcres(listing.acres)}</dd>
                </div>
                {listing.sites && (
                  <div className="flex justify-between border-b border-border pb-3">
                    <dt className="text-muted-foreground">Sites / Units</dt>
                    <dd className="font-medium">{listing.sites}</dd>
                  </div>
                )}
                <div className="flex justify-between border-b border-border pb-3">
                  <dt className="text-muted-foreground">Property Type</dt>
                  <dd className="font-medium">
                    {getPropertyTypeLabel(listing.type)}
                  </dd>
                </div>
                <div className="flex justify-between pb-3">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="font-medium">{listing.location}</dd>
                </div>
              </dl>

              {listing.financials && (
                <div className="mt-6 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-semibold text-forest">
                    Financial Overview
                  </p>
                  <dl className="mt-3 space-y-2 text-sm">
                    {listing.financials.grossRevenue && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Gross Revenue</dt>
                        <dd>{listing.financials.grossRevenue}</dd>
                      </div>
                    )}
                    {listing.financials.noi && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">NOI</dt>
                        <dd>{listing.financials.noi}</dd>
                      </div>
                    )}
                    {listing.financials.occupancy && (
                      <div className="flex justify-between">
                        <dt className="text-muted-foreground">Occupancy</dt>
                        <dd>{listing.financials.occupancy}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {listing.broker && (
                <div className="mt-6 rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-semibold text-forest">
                    Listing broker
                  </p>
                  <dl className="mt-3 space-y-3 text-sm">
                    {listing.broker.name && (
                      <div className="flex items-start gap-2">
                        <User className="mt-0.5 size-4 shrink-0 text-forest-light" />
                        <div>
                          <dt className="sr-only">Broker name</dt>
                          <dd className="font-medium text-foreground">
                            {listing.broker.name}
                          </dd>
                        </div>
                      </div>
                    )}
                    {listing.broker.company && (
                      <div className="flex items-start gap-2">
                        <Building2 className="mt-0.5 size-4 shrink-0 text-forest-light" />
                        <div>
                          <dt className="sr-only">Broker company</dt>
                          <dd>{listing.broker.company}</dd>
                        </div>
                      </div>
                    )}
                    {listing.broker.email && (
                      <div className="flex items-start gap-2">
                        <Mail className="mt-0.5 size-4 shrink-0 text-forest-light" />
                        <div>
                          <dt className="sr-only">Broker email</dt>
                          <dd>
                            <a
                              href={`mailto:${listing.broker.email}`}
                              className="font-medium text-forest underline-offset-4 hover:underline"
                            >
                              {listing.broker.email}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                    {listing.broker.phone && (
                      <div className="flex items-start gap-2">
                        <Phone className="mt-0.5 size-4 shrink-0 text-forest-light" />
                        <div>
                          <dt className="sr-only">Broker phone</dt>
                          <dd>
                            <a
                              href={`tel:${listing.broker.phone.replace(/\s/g, "")}`}
                              className="font-medium text-forest underline-offset-4 hover:underline"
                            >
                              {listing.broker.phone}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              <ListingInquiryForm listingTitle={listing.title} />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="text-2xl font-semibold text-forest">
              Similar properties
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ListingCard key={item.slug} listing={item} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
