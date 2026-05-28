import { JsonLd } from "@/components/json-ld";
import { ListPropertyForm } from "@/components/list-property-form";
import { PricingCards } from "@/components/pricing-cards";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "List Your Campground or RV Park For Sale",
  description:
    "Reach thousands of qualified buyers. List your campground, glamping retreat, RV park, or nature resort on WildProperty — the dedicated outdoor hospitality marketplace.",
  path: "/list",
});

export default function ListPropertyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "List Your Property", path: "/list" },
        ])}
      />

      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-terracotta">
            For sellers &amp; brokers
          </p>
          <h1 className="font-serif text-5xl leading-tight text-forest sm:text-6xl">
            List Your Property on WildProperty
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-foreground/75">
            Reach thousands of qualified buyers actively searching for outdoor
            hospitality properties.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <PricingCards />
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12">
          <h2 className="mb-2 font-serif text-3xl text-forest">
            Submit your property
          </h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Tell us a bit about what you&apos;re listing.
          </p>
          <ListPropertyForm />
        </div>
      </section>
    </>
  );
}
