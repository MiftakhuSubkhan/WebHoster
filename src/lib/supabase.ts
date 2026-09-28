import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Validasi apakah konfigurasi Supabase sudah terisi dengan benar di .env.local
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("https://") &&
    supabaseUrl !== "https://your-project-id.supabase.co"
  );
};

/**
 * Supabase Client Instance
 * Akan bernilai null atau mock-safe jika kredensial belum dikonfigurasi oleh pengguna
 */
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
