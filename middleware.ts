import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/lib/navigation";

const handleI18n = createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: "always",
});

const REFRESH_TOKEN_COOKIE = "refresh_token";

const PROTECTED_SEGMENTS = ["daily-lab"];

function isProtectedRoute(pathname: string): boolean {
  return routing.locales.some((locale) =>
    PROTECTED_SEGMENTS.some((segment) => pathname.startsWith(`/${locale}/${segment}`))
  );
}

function isAuthRoute(pathname: string): boolean {
  return routing.locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/login`) || pathname.startsWith(`/${locale}/register`)
  );
}

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasRefreshToken = request.cookies.has(REFRESH_TOKEN_COOKIE);

  if (isProtectedRoute(pathname) && !hasRefreshToken) {
    const loginUrl = new URL(`/${routing.defaultLocale}/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthRoute(pathname) && hasRefreshToken) {
    const appUrl = new URL(`/${routing.defaultLocale}/daily-lab`, request.url);
    return NextResponse.redirect(appUrl);
  }

  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
