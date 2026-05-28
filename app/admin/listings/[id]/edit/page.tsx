import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingForm } from "@/components/admin/listing-form";
import { getListingByIdAdmin } from "@/lib/listings-db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditListingPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await getListingByIdAdmin(id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary/70">
            WildProperty Admin
          </p>
          <h1 className="mt-2 font-serif text-3xl text-primary">Edit Listing</h1>
          <p className="mt-2 text-sm text-muted-foreground">{listing.title}</p>
        </div>
        <Link
          href="/admin/listings"
          className="text-sm text-forest underline-offset-4 hover:underline"
        >
          Back to listings
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ListingForm initialListing={listing} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
