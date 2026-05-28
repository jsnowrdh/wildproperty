import Link from "next/link";
import type { LocationPageContent } from "@/lib/location-pages";

interface LocationPageSectionsProps {
  content: LocationPageContent;
}

export function LocationPageSections({ content }: LocationPageSectionsProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-6 pb-20">
      <section className="max-w-3xl">
        <h2 className="font-serif text-2xl text-primary">
          {content.h1.replace(" for Sale", " Market Overview")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          {content.intro}
        </p>
        <p className="mt-4 text-base leading-relaxed text-foreground/80">
          {content.marketOverview}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-primary">
          What to Evaluate Before You Buy
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-foreground/80">
          {content.buyerTips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-primary">
          Frequently Asked Questions
        </h2>
        <dl className="mt-6 space-y-6">
          {content.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-foreground">{item.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground/75">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-xl text-primary">
            Other Property Types
          </h2>
          <ul className="mt-4 space-y-2">
            {content.relatedTypeLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/75 underline-offset-4 hover:text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-serif text-xl text-primary">Nearby States</h2>
          <ul className="mt-4 space-y-2">
            {content.relatedStateLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-foreground/75 underline-offset-4 hover:text-primary hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
