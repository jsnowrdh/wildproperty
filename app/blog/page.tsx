import { JsonLd } from "@/components/json-ld";
import { BlogCard } from "@/components/blog-card";
import { BLOG_POSTS } from "@/lib/data";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog | WildProperty — Outdoor Hospitality Insights",
  description:
    "Buying guides, valuation breakdowns, and operator stories from the campgrounds, glamping retreats, and RV parks we cover.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.18em] text-primary/70">
            The WildProperty Journal
          </p>
          <h1 className="font-serif text-5xl leading-[1.05] text-primary md:text-6xl">
            Insights from the outdoor hospitality market
          </h1>
          <p className="mt-5 text-lg text-foreground/75">
            Buying guides, valuation breakdowns, and operator stories from the
            campgrounds, glamping retreats, and RV parks we cover.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {[...BLOG_POSTS]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
        </div>
      </section>
    </>
  );
}
