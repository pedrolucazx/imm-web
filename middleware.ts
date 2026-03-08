import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";

const handleI18n = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always",
});

const REFRESH_TOKEN_COOKIE = "refresh_token";

const PROTECTED_SEGMENTS = [ROUTES.APP_DAILY_LAB.slice(1)];

function resolveLocale(pathname: string): (typeof routing.locales)[number] {
  return (
    routing.locales.find(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    ) ?? routing.defaultLocale
  );
}

function isProtectedRoute(pathname: string): boolean {
  return routing.locales.some((locale) =>
    PROTECTED_SEGMENTS.some(
      (segment) =>
        pathname === `/${locale}/${segment}` || pathname.startsWith(`/${locale}/${segment}/`)
    )
  );
}

function isAuthRoute(pathname: string): boolean {
  return routing.locales.some(
    (locale) =>
      pathname === `/${locale}/login` ||
      pathname.startsWith(`/${locale}/login/`) ||
      pathname === `/${locale}/register` ||
      pathname.startsWith(`/${locale}/register/`)
  );
}

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
