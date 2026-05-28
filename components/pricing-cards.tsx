import { Check, Star } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "Free",
    suffix: null,
    featured: false,
    features: ["1 listing", "Standard placement", "3 photos"],
  },
  {
    name: "Featured",
    price: "$49",
    suffix: "/month",
    featured: true,
    features: [
      "1 listing",
      "Featured placement",
      "10 photos",
      "Highlighted in search results",
    ],
  },
  {
    name: "Broker",
    price: "$99",
    suffix: "/month",
    featured: false,
    features: [
      "Up to 10 listings",
      "Priority placement",
      "Unlimited photos",
      "Email blast to buyer list",
    ],
  },
];

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={`relative rounded-2xl border bg-card p-8 ${
            tier.featured
              ? "scale-[1.02] border-forest shadow-[var(--shadow-card-hover)]"
              : "border-border"
          }`}
        >
          {tier.featured && (
            <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-terracotta px-3 py-1 text-xs font-medium text-cream">
              <Star className="size-3 fill-current" />
              Most Popular
            </span>
          )}

          <h3 className="font-serif text-2xl text-forest">{tier.name}</h3>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="font-serif text-5xl text-foreground">
              {tier.price}
            </span>
            {tier.suffix && (
              <span className="text-muted-foreground">{tier.suffix}</span>
            )}
          </div>

          <ul className="mt-6 space-y-3">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-terracotta" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
