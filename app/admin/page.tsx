import Link from "next/link";
import { ListingForm } from "@/components/admin/listing-form";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary/70">
            WildProperty Admin
          </p>
          <h1 className="mt-2 font-serif text-3xl text-primary">Add Listing</h1>
        </div>
        <Link
          href="/admin/listings"
          className="text-sm text-forest underline-offset-4 hover:underline"
        >
          View all listings
        </Link>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <ListingForm submitLabel="Create Listing" />
      </div>
    </div>
  );
}
