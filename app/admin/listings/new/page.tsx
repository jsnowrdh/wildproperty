import Link from "next/link";
import { AdminNav } from "@/components/admin/admin-nav";
import { ListingForm } from "@/components/admin/listing-form";

export default function NewListingPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <AdminNav
        title="Add Listing"
        action={
          <Link
            href="/admin/listings"
            className="text-sm text-forest underline-offset-4 hover:underline"
          >
            View all listings
          </Link>
        }
      />

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ListingForm submitLabel="Create Listing" />
      </div>
    </div>
  );
}
