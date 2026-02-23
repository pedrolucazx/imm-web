import { createNavigation } from "next-intl/navigation";

export const routing = {
  locales: ["pt-BR", "en-US", "es-ES"] as const,
  defaultLocale: "pt-BR" as const,
};

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
