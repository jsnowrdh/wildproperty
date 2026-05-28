import Link from "next/link";

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export function BlogContentRenderer({ content }: { content: string }) {
  const blocks = content.trim().split("\n\n");

  return (
    <div className="space-y-6 text-lg leading-[1.75] text-foreground/85">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={index}
              className="mt-10 font-serif text-3xl text-primary first:mt-0"
            >
              {block.replace("## ", "")}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3
              key={index}
              className="mt-6 font-serif text-xl text-primary"
            >
              {block.replace("### ", "")}
            </h3>
          );
        }

        if (block.startsWith("- ")) {
          const items = block.split("\n").filter((line) => line.startsWith("- "));
          return (
            <ul key={index} className="list-disc space-y-2 pl-6">
              {items.map((item, i) => (
                <li key={i}>{renderInline(item.replace(/^- /, ""))}</li>
              ))}
            </ul>
          );
        }

        if (block.startsWith("[cta]")) {
          return (
            <div
              key={index}
              className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8"
            >
              <p className="font-serif text-2xl text-primary">
                Ready to Start Looking?
              </p>
              <p className="mt-3 leading-relaxed text-foreground/75">
                Browse active campgrounds, glamping retreats, RV parks, and nature
                resorts for sale on WildProperty — or set buyer alerts to get
                notified when new listings match your criteria.
              </p>
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

        return (
          <p
            key={index}
            className={
              index === 0
                ? "text-xl leading-[1.7] text-foreground/90"
                : undefined
            }
          >
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
