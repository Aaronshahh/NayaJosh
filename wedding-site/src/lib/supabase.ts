import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type RsvpRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  event_key: "sangeet" | "wedding";
  event_name: string;
  attending: boolean;
  guest_count: number;
  message: string | null;
  event_date: string | null;
  event_time: string | null;
  event_location: string | null;
};

let adminClient: SupabaseClient | null = null;

/** Accept either project URL or a pasted /rest/v1 URL. */
function normalizeSupabaseUrl(raw: string) {
  const trimmed = raw.trim().replace(/\/+$/, "");
  return trimmed.replace(/\/rest\/v1$/i, "");
}

export function getSupabaseAdmin() {
  if (adminClient) return adminClient;

  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!rawUrl || !key) {
    throw new Error("Supabase env vars are missing (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
  }

  const url = normalizeSupabaseUrl(rawUrl);

  adminClient = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}
