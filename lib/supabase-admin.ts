import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";

/** Service-role client bypasses RLS — use for all admin listing writes/reads. */
export function createSupabaseAdminClient(): SupabaseClient<Database> | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!url || !serviceRoleKey) {
    return null;
  }

  if (anonKey && serviceRoleKey === anonKey) {
    console.error(
      "[supabase-admin] SUPABASE_SERVICE_ROLE_KEY matches the anon key — admin writes will be blocked by RLS."
    );
    return null;
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function requireSupabaseAdminClient(): SupabaseClient<Database> {
  const client = createSupabaseAdminClient();

  if (!client) {
    throw new Error(
      "Supabase admin client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return client;
}
