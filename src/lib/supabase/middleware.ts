import { createServerClient } from "@supabase/ssr";
import {
  NextResponse,
  type NextRequest,
} from "next/server";

function getSupabaseEnvironment() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const publishableKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !publishableKey) {
    throw new Error(
      "Supabase middleware environment variables are missing."
    );
  }

  return {
    url,
    publishableKey,
  };
}

export async function updateSession(
  request: NextRequest,
  initialResponse: NextResponse
) {
  const { url, publishableKey } =
    getSupabaseEnvironment();

  const response = initialResponse;

  const supabase = createServerClient(
    url,
    publishableKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          /*
           * Make refreshed cookies available to the
           * remaining middleware logic in this request.
           */
          cookiesToSet.forEach(
            ({
              name,
              value,
            }) => {
              request.cookies.set(
                name,
                value
              );
            }
          );

          /*
           * Send refreshed cookies back to the browser.
           */
          cookiesToSet.forEach(
            ({
              name,
              value,
              options,
            }) => {
              response.cookies.set(
                name,
                value,
                options
              );
            }
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return {
    response,
    user,
  };
}