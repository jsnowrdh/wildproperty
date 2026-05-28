"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Listing } from "@/lib/data";
import { getPropertyTypeLabel } from "@/lib/data";

interface AdminListingsTableProps {
  listings: Listing[];
}

export function AdminListingsTable({ listings }: AdminListingsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;

    setDeletingId(id);
    setError("");

    try {
      const response = await fetch(`/api/admin/listings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Failed to delete listing.");
        return;
      }

      router.refresh();
    } catch {
      setError("Failed to delete listing.");
    } finally {
      setDeletingId(null);
    }
  }

  if (listings.length === 0) {
    return (
      <p className="text-muted-foreground">
        No listings yet.{" "}
        <Link href="/admin" className="text-forest underline">
          Add your first listing
        </Link>
        .
      </p>
    );
  }

  return (
    <div>
      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      <div className="overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border bg-muted/40">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id ?? listing.slug} className="border-b border-border/70">
                <td className="px-4 py-3">
                  <div className="font-medium text-forest">{listing.title}</div>
                  <div className="text-xs text-muted-foreground">{listing.slug}</div>
                </td>
                <td className="px-4 py-3">{getPropertyTypeLabel(listing.type)}</td>
                <td className="px-4 py-3">{listing.location}</td>
                <td className="px-4 py-3">{listing.priceDisplay}</td>
                <td className="px-4 py-3 capitalize">{listing.status ?? "active"}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/listings/${listing.id}/edit`}>Edit</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={deletingId === listing.id}
                      onClick={() => listing.id && handleDelete(listing.id, listing.title)}
                    >
                      {deletingId === listing.id ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
