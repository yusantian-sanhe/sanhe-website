import { createBrowserClient } from "@supabase/ssr";

function getSupabaseEnvironment() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase browser environment variables are missing."
    );
  }

  return {
    url,
    publishableKey,
  };
}

export function createClient() {
  const { url, publishableKey } =
    getSupabaseEnvironment();

  return createBrowserClient(
    url,
    publishableKey
  );
}