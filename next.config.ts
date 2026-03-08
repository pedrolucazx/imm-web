import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  webpack(config) {
    config.infrastructureLogging = { level: "error" };
    return config;
  },
  async rewrites() {
    // Always proxy /api/* → backend so the refreshToken cookie is always
    // same-origin (set on Vercel domain in prod, localhost in dev).
    // Without this, the cookie belongs to the backend domain and the
    // Next.js middleware cannot read it from the browser request.
    const apiUrl = (
      process.env.API_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      "http://localhost:3001"
    ).replace(/\/$/, "");
    return [{ source: "/api/:path*", destination: `${apiUrl}/:path*` }];
  },
};

export default withNextIntl(nextConfig);
