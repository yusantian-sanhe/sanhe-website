import createIntlMiddleware from "next-intl/middleware";
import {
  NextResponse,
  type NextRequest,
} from "next/server";
import {
  defaultLocale,
  locales,
} from "./src/i18n/locales";
import { updateSession } from "./src/lib/supabase/middleware";

const intlMiddleware =
  createIntlMiddleware({
    locales,
    defaultLocale,
  });

function copyResponseCookies(
  source: NextResponse,
  target: NextResponse
) {
  source.cookies
    .getAll()
    .forEach((cookie) => {
      target.cookies.set(cookie);
    });

  return target;
}

function isAdminPath(pathname: string) {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/")
  );
}

function isAdminLoginPath(
  pathname: string
) {
  return pathname === "/admin/login";
}

export default async function middleware(
  request: NextRequest
) {
  const { pathname } = request.nextUrl;

  const adminRequest =
    isAdminPath(pathname);

  /*
   * Admin routes must not be processed by next-intl.
   * Public website routes continue using the existing
   * six-language routing middleware.
   */
  const initialResponse = adminRequest
    ? NextResponse.next({
        request,
      })
    : intlMiddleware(request);

  const {
    response,
    user,
  } = await updateSession(
    request,
    initialResponse
  );

  if (!adminRequest) {
    return response;
  }

  /*
   * Visitors who are not signed in can only access
   * the administrator login page.
   */
  if (
    !user &&
    !isAdminLoginPath(pathname)
  ) {
    const loginUrl =
      request.nextUrl.clone();

    loginUrl.pathname =
      "/admin/login";

    loginUrl.searchParams.set(
      "next",
      pathname
    );

    const redirectResponse =
      NextResponse.redirect(loginUrl);

    return copyResponseCookies(
      response,
      redirectResponse
    );
  }

  /*
   * Signed-in administrators should not remain
   * on the login page.
   */
  if (
    user &&
    isAdminLoginPath(pathname)
  ) {
    const dashboardUrl =
      request.nextUrl.clone();

    dashboardUrl.pathname =
      "/admin";

    dashboardUrl.search = "";

    const redirectResponse =
      NextResponse.redirect(
        dashboardUrl
      );

    return copyResponseCookies(
      response,
      redirectResponse
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};