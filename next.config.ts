import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  webpack(config) {
    config.infrastructureLogging = { level: "error" };
    return config;
  },
  async rewrites() {
    const apiUrl = (process.env.NEXT_PUBLIC_API_URL?.trim() || "http://localhost:3001").replace(
      /\/$/,
      ""
    );
    return [{ source: "/api/:path*", destination: `${apiUrl}/api/:path*` }];
  },
};

export default withNextIntl(nextConfig);
