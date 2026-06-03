"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Listing } from "@/lib/data";
import { PROPERTY_TYPES, US_STATES } from "@/lib/data";

export interface ListingFormValues {
  slug: string;
  title: string;
  type: string;
  city: string;
  state: string;
  price: string;
  acreage: string;
  description: string;
  sites: string;
  gross_revenue: string;
  noi: string;
  occupancy: string;
  image_url: string;
  status: string;
  broker_name: string;
  broker_email: string;
  broker_phone: string;
  broker_company: string;
}

const emptyValues: ListingFormValues = {
  slug: "",
  title: "",
  type: "campground",
  city: "",
  state: "CA",
  price: "",
  acreage: "",
  description: "",
  sites: "",
  gross_revenue: "",
  noi: "",
  occupancy: "",
  image_url: "",
  status: "active",
  broker_name: "",
  broker_email: "",
  broker_phone: "",
  broker_company: "",
};

function listingToFormValues(listing: Listing): ListingFormValues {
  return {
    slug: listing.slug,
    title: listing.title,
    type: listing.type,
    city: listing.city,
    state: listing.state,
    price: String(listing.price),
    acreage: String(listing.acres),
    description: listing.description,
    sites: listing.sites ? String(listing.sites) : "",
    gross_revenue: listing.financials?.grossRevenue ?? "",
    noi: listing.financials?.noi ?? "",
    occupancy: listing.financials?.occupancy ?? "",
    image_url: listing.imageUrl,
    status: listing.status ?? "active",
    broker_name: listing.broker?.name ?? "",
    broker_email: listing.broker?.email ?? "",
    broker_phone: listing.broker?.phone ?? "",
    broker_company: listing.broker?.company ?? "",
  };
}

interface ListingFormProps {
  initialListing?: Listing;
  submitLabel?: string;
}

export function ListingForm({
  initialListing,
  submitLabel = "Create Listing",
}: ListingFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<ListingFormValues>(
    initialListing ? listingToFormValues(initialListing) : emptyValues
  );
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField<K extends keyof ListingFormValues>(
    key: K,
    value: ListingFormValues[K]
  ) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    let saved = false;

    try {
      const payload = {
        slug: values.slug.trim(),
        title: values.title.trim(),
        type: values.type.trim(),
        city: values.city.trim(),
        state: values.state.trim().toUpperCase(),
        price: Number(values.price),
        acreage: Number(values.acreage),
        description: values.description.trim(),
        sites: values.sites ? Number(values.sites) : null,
        gross_revenue: values.gross_revenue.trim() || null,
        noi: values.noi.trim() || null,
        occupancy: values.occupancy.trim() || null,
        image_url: values.image_url.trim(),
        status: values.status.trim() || "active",
        broker_name: values.broker_name.trim() || null,
        broker_email: values.broker_email.trim() || null,
        broker_phone: values.broker_phone.trim() || null,
        broker_company: values.broker_company.trim() || null,
      };

      const listingId = initialListing?.id?.trim();
      const url = listingId
        ? `/api/admin/listings/${listingId}`
        : "/api/admin/listings";
      const method = listingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(payload),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        success?: boolean;
      };

      if (!response.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Failed to save listing.");
        return;
      }

      saved = true;
      router.push("/admin/listings");
      router.refresh();
    } catch (error) {
      console.error("[ListingForm] submit error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Check Vercel logs for details."
      );
    } finally {
      if (!saved) {
        setStatus((current) => (current === "loading" ? "idle" : current));
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={values.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={values.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="type">Property Type</Label>
          <Select
            value={values.type}
            onValueChange={(value) => updateField("type", value)}
          >
            <SelectTrigger id="type" className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((type) => (
                <SelectItem key={type.slug} value={type.slug}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={values.status}
            onValueChange={(value) => updateField("status", value)}
          >
            <SelectTrigger id="status" className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={values.city}
            onChange={(e) => updateField("city", e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Select
            value={values.state}
            onValueChange={(value) => updateField("state", value)}
          >
            <SelectTrigger id="state" className="mt-1.5 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price">Price (USD)</Label>
          <Input
            id="price"
            type="number"
            min="0"
            value={values.price}
            onChange={(e) => updateField("price", e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="acreage">Acreage</Label>
          <Input
            id="acreage"
            type="number"
            min="0"
            step="0.1"
            value={values.acreage}
            onChange={(e) => updateField("acreage", e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="sites">Sites</Label>
          <Input
            id="sites"
            type="number"
            min="0"
            value={values.sites}
            onChange={(e) => updateField("sites", e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            value={values.image_url}
            onChange={(e) => updateField("image_url", e.target.value)}
            required
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="gross_revenue">Gross Revenue</Label>
          <Input
            id="gross_revenue"
            value={values.gross_revenue}
            onChange={(e) => updateField("gross_revenue", e.target.value)}
            placeholder="$890K"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="noi">NOI</Label>
          <Input
            id="noi"
            value={values.noi}
            onChange={(e) => updateField("noi", e.target.value)}
            placeholder="$420K"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="occupancy">Occupancy</Label>
          <Input
            id="occupancy"
            value={values.occupancy}
            onChange={(e) => updateField("occupancy", e.target.value)}
            placeholder="72%"
            className="mt-1.5"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
          rows={6}
          className="mt-1.5"
        />
      </div>

      <div className="rounded-xl border border-border p-6">
        <h3 className="font-serif text-lg text-forest">Broker contact</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Shown to buyers on the listing detail page.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="broker_name">Broker name</Label>
            <Input
              id="broker_name"
              value={values.broker_name}
              onChange={(e) => updateField("broker_name", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="broker_company">Broker company</Label>
            <Input
              id="broker_company"
              value={values.broker_company}
              onChange={(e) => updateField("broker_company", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="broker_email">Broker email</Label>
            <Input
              id="broker_email"
              type="email"
              value={values.broker_email}
              onChange={(e) => updateField("broker_email", e.target.value)}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="broker_phone">Broker phone</Label>
            <Input
              id="broker_phone"
              type="tel"
              value={values.broker_phone}
              onChange={(e) => updateField("broker_phone", e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <Button
        type="submit"
        className="rounded-full bg-forest hover:bg-forest-light"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Saving..." : submitLabel}
      </Button>
    </form>
  );
}
