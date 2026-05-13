import { createClient } from "@supabase/supabase-js";

export type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
  bucket: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.https://jfvcfxanvikmtvsuyskc.supabase.co/rest/v1/;
  const serviceRoleKey = process.env.sb_publishable_lC_YBQP60d0oQrqczuDYiQ_y-Uf4tSh;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    url,
    serviceRoleKey,
    bucket: process.env.SUPABASE_STORAGE_BUCKET ?? "menu-images"
  };
}

export function isSupabaseConfigured() {
  return getSupabaseConfig() !== null;
}

export function createSupabaseAdminClient() {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error("Supabase no está configurado.");
  }

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
