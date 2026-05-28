import Link from "next/link";

interface ArticleCtaProps {
  title: string;
  description: string;
}

export function ArticleCta({ title, description }: ArticleCtaProps) {
  return (
    <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8">
      <p className="font-serif text-2xl text-primary">{title}</p>
      <p className="mt-3 leading-relaxed text-foreground/75">{description}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/listings"
          className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep"
        >
          Browse listings
        </Link>
        <Link
          href="/alerts"
          className="inline-flex items-center rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
        >
          Get buyer alerts
        </Link>
      </div>
    </div>
  );
}

export function ArticleFooter() {
  return (
    <div className="mt-10 border-t border-border pt-8 text-sm text-foreground/60">
      <p>
        <strong>WildProperty.org</strong> is the marketplace for outdoor
        hospitality properties. Browse campgrounds, glamping retreats, RV parks,
        and nature resorts for sale nationwide.
      </p>
    </div>
  );
}
