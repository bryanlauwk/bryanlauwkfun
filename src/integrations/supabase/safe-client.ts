/**
 * Safe wrapper around the Supabase client.
 * Falls back gracefully when env vars are missing.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const FALLBACK_URL = "https://ywirnyuvvpenzajaajkg.supabase.co";
const FALLBACK_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3aXJueXV2dnBlbnphamFhamtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NTEyMzMsImV4cCI6MjA4NDAyNzIzM30.oQYanGrwoZGEyl7tcJJxa5xVfqa44cFIoIXJNFjv6WU";

function getSupabaseClient(): SupabaseClient<Database> {
  const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;

  return createClient<Database>(url, key, {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

export const safeSupabase = getSupabaseClient();
