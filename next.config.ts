import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  webpack(config) {
    config.infrastructureLogging = { level: "error" };
    return config;
  },
};

export default withNextIntl(nextConfig);
