import Link from "next/link";
import { AdminListingsTable } from "@/components/admin/admin-listings-table";
import { AdminNav } from "@/components/admin/admin-nav";
import { getAllListingsAdmin } from "@/lib/listings-db";

export default async function AdminListingsPage() {
  const listings = await getAllListingsAdmin();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <AdminNav
        title="All Listings"
        subtitle={`${listings.length} listing${listings.length === 1 ? "" : "s"} in Supabase`}
        action={
          <Link
            href="/admin"
            className="inline-flex items-center rounded-full bg-forest px-5 py-2 text-sm font-medium text-cream hover:bg-forest-deep"
          >
            Add listing
          </Link>
        }
      />

      <AdminListingsTable listings={listings} />
    </div>
  );
}
