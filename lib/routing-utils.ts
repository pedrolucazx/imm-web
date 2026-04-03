import { routing } from "@/lib/routing";
import { ROUTES } from "@/lib/routes";

const AUTH_SLUGS = [
  ROUTES.LOGIN.slice(1),
  ROUTES.REGISTER.slice(1),
  ROUTES.FORGOT_PASSWORD.slice(1),
  ROUTES.RESET_PASSWORD.slice(1),
  ROUTES.VERIFY_EMAIL.slice(1),
];

const PROTECTED_SEGMENTS = [
  ROUTES.APP_DAILY_LAB.slice(1),
  ROUTES.APP_HABITS.slice(1),
  ROUTES.APP_HISTORY.slice(1),
  ROUTES.APP_ANALYTICS.slice(1),
  ROUTES.SETTINGS.slice(1),
];

export function resolveLocale(pathname: string): (typeof routing.locales)[number] {
  return (
    routing.locales.find(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    ) ?? routing.defaultLocale
  );
}

export function isProtectedRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return routing.locales.some((locale) =>
    PROTECTED_SEGMENTS.some(
      (segment) =>
        pathname === `/${locale}/${segment}` || pathname.startsWith(`/${locale}/${segment}/`)
    )
  );
}

export function isAuthRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return routing.locales.some((locale) =>
    AUTH_SLUGS.some(
      (slug) => pathname === `/${locale}/${slug}` || pathname.startsWith(`/${locale}/${slug}/`)
    )
  );
}
