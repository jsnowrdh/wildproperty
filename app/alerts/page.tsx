import { Bell } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { BuyerAlertsForm } from "@/components/buyer-alerts-form";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Get Notified About New Outdoor Hospitality Listings",
  description:
    "Never miss a property. Sign up for free email alerts when new campgrounds, glamping retreats, or RV parks matching your criteria are listed on WildProperty.",
  path: "/alerts",
});

export default function AlertsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Buyer Alerts", path: "/alerts" },
        ])}
      />

      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="mb-12 text-center">
          <div className="mb-6 inline-flex size-14 items-center justify-center rounded-full bg-forest/10 text-forest">
            <Bell className="size-6" strokeWidth={1.75} />
          </div>
          <h1 className="font-serif text-4xl text-forest sm:text-5xl">
            Never Miss a Property
          </h1>
          <p className="mt-4 text-lg text-foreground/75">
            Get email alerts when new listings match your criteria.
          </p>
        </div>

        <BuyerAlertsForm />
      </section>
    </>
  );
}
