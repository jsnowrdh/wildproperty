import Link from "next/link";
import { AdminListingsTable } from "@/components/admin/admin-listings-table";
import { getAllListingsAdmin } from "@/lib/listings-db";

export default async function AdminListingsPage() {
  const listings = await getAllListingsAdmin();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary/70">
            WildProperty Admin
          </p>
          <h1 className="mt-2 font-serif text-3xl text-primary">All Listings</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {listings.length} listing{listings.length === 1 ? "" : "s"} in Supabase
          </p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream hover:bg-forest-deep"
        >
          Add listing
        </Link>
      </div>

      <AdminListingsTable listings={listings} />
    </div>
  );
}
