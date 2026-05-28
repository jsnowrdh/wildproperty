import Image from "next/image";
import Link from "next/link";
import { MapPin, Trees } from "lucide-react";
import type { Listing } from "@/lib/data";
import { getListingImageUrl, getPropertyTypeLabel } from "@/lib/data";
import { formatAcres } from "@/lib/format";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listings/${listing.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
          <Image
            src={getListingImageUrl(listing.imageSeed)}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-medium text-forest backdrop-blur-sm">
            {getPropertyTypeLabel(listing.type)}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-5">
          <h3 className="font-serif text-2xl leading-tight text-forest">
            {listing.title}
          </h3>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" strokeWidth={1.75} />
            {listing.location}
          </p>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-foreground/75">
            {listing.summary}
          </p>

          <div className="mt-4 flex items-end justify-between border-t border-border/60 pt-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Asking
              </p>
              <p className="font-serif text-2xl text-forest">
                {listing.priceDisplay}
              </p>
            </div>
            <p className="flex items-center gap-1 text-sm text-foreground/70">
              <Trees className="size-4 text-terracotta" strokeWidth={1.75} />
              {formatAcres(listing.acres)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
