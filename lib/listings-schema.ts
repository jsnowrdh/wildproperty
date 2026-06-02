/** Columns on public.listings (see supabase/migrations/001_listings.sql) */
export const LISTING_TABLE_COLUMNS = [
  "id",
  "slug",
  "title",
  "type",
  "city",
  "state",
  "price",
  "acreage",
  "description",
  "sites",
  "gross_revenue",
  "noi",
  "occupancy",
  "image_url",
  "status",
  "broker_name",
  "broker_email",
  "broker_phone",
  "broker_company",
  "created_at",
] as const;

/** Columns the form/API may send on insert (id + created_at are DB defaults) */
export const LISTING_INSERT_COLUMNS = [
  "slug",
  "title",
  "type",
  "city",
  "state",
  "price",
  "acreage",
  "description",
  "sites",
  "gross_revenue",
  "noi",
  "occupancy",
  "image_url",
  "status",
  "broker_name",
  "broker_email",
  "broker_phone",
  "broker_company",
] as const;

export type ListingInsertColumn = (typeof LISTING_INSERT_COLUMNS)[number];

export interface ListingInsertPayload {
  slug: string;
  title: string;
  type: string;
  city: string;
  state: string;
  price: number;
  acreage: number;
  description: string;
  sites: number | null;
  gross_revenue: string | null;
  noi: string | null;
  occupancy: string | null;
  image_url: string;
  status: string;
  broker_name: string | null;
  broker_email: string | null;
  broker_phone: string | null;
  broker_company: string | null;
}

export function buildListingInsertPayload(
  body: Record<string, unknown>
): ListingInsertPayload {
  return {
    slug: String(body.slug ?? "").trim(),
    title: String(body.title ?? "").trim(),
    type: String(body.type ?? "").trim(),
    city: String(body.city ?? "").trim(),
    state: String(body.state ?? "").trim().toUpperCase(),
    price: Number(body.price),
    acreage: Number(body.acreage),
    description: String(body.description ?? "").trim(),
    sites:
      body.sites != null && String(body.sites) !== ""
        ? Number(body.sites)
        : null,
    gross_revenue: body.gross_revenue
      ? String(body.gross_revenue).trim()
      : null,
    noi: body.noi ? String(body.noi).trim() : null,
    occupancy: body.occupancy ? String(body.occupancy).trim() : null,
    image_url: String(body.image_url ?? "").trim(),
    status: String(body.status ?? "active").trim() || "active",
    broker_name: body.broker_name
      ? String(body.broker_name).trim()
      : null,
    broker_email: body.broker_email
      ? String(body.broker_email).trim()
      : null,
    broker_phone: body.broker_phone
      ? String(body.broker_phone).trim()
      : null,
    broker_company: body.broker_company
      ? String(body.broker_company).trim()
      : null,
  };
}

export function validateListingInsertPayload(
  payload: ListingInsertPayload
): string | null {
  if (
    !payload.slug ||
    !payload.title ||
    !payload.type ||
    !payload.city ||
    !payload.state ||
    !payload.description ||
    !payload.image_url
  ) {
    return "Missing required listing fields.";
  }

  if (Number.isNaN(payload.price) || Number.isNaN(payload.acreage)) {
    return "Price and acreage must be valid numbers.";
  }

  return null;
}

export function logSupabaseEnvStatus(context: string) {
  console.log(`[${context}] Supabase env:`, {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? "set"
      : "MISSING",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ? "set"
      : "MISSING",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY
      ? "set"
      : "MISSING",
  });
}
