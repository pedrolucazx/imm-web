import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["pt-BR", "en-US", "es-ES"],
  defaultLocale: "pt-BR",
  localePrefix: "always",
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
