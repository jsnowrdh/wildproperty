import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
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
      <AdminNav
        title="Edit Listing"
        subtitle={listing.title}
        action={
          <Link
            href="/admin/listings"
            className="text-sm text-forest underline-offset-4 hover:underline"
          >
            Back to listings
          </Link>
        }
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ListingForm initialListing={listing} submitLabel="Save Changes" />
      </div>
    </div>
  );
}
