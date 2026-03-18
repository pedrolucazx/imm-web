import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/lib/routing";
import { resolveLocale, isProtectedRoute, isAuthRoute } from "./lib/routing-utils";

const handleI18n = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always",
});

const REFRESH_TOKEN_COOKIE = "refreshToken";

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_COOKIE);
  const locale = resolveLocale(pathname);

  if (isProtectedRoute(pathname) && !hasRefreshToken) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && hasRefreshToken) {
    const appUrl = new URL(`/${locale}/daily-lab`, request.url);
    return NextResponse.redirect(appUrl);
  }

  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
