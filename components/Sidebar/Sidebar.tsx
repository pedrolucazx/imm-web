"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { s } from "./sidebar.styles";

interface NavItem {
  icon: string;
  labelKey: string;
  href: string;
  ownedRoute: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    icon: "⚡",
    labelKey: "dailyLab",
    href: ROUTES.APP_DAILY_LAB,
    ownedRoute: ROUTES.APP_DAILY_LAB,
  },
  { icon: "🎯", labelKey: "habits", href: ROUTES.APP_DAILY_LAB, ownedRoute: "/habits" },
  { icon: "📅", labelKey: "history", href: ROUTES.APP_DAILY_LAB, ownedRoute: "/history" },
  { icon: "📊", labelKey: "analytics", href: ROUTES.APP_DAILY_LAB, ownedRoute: "/analytics" },
  { icon: "⚙️", labelKey: "settings", href: ROUTES.SETTINGS, ownedRoute: ROUTES.SETTINGS },
];

const CURRENT_DAY = 0;
const TOTAL_DAYS = 66;

export function Sidebar() {
  const t = useTranslations("sidebar");
  const pathname = usePathname();

  return (
    <Box as="aside" {...s.aside}>
      <Box {...s.logoSection}>
        <Box as="span" {...s.logoEmoji}>
          🧠
        </Box>
        <Text {...s.logoText}>{t("appName")}</Text>
      </Box>

      <Box as="nav" {...s.nav}>
        {NAV_ITEMS.map(({ icon, labelKey, href, ownedRoute }) => {
          const isActive = pathname === ownedRoute;
          const styles = isActive ? s.navItemActive : s.navItem;

          return (
            <Box key={labelKey} asChild {...styles}>
              <Link href={href}>
                <Box as="span" {...s.navIcon}>
                  {icon}
                </Box>
                {t(labelKey)}
              </Link>
            </Box>
          );
        })}
      </Box>

      <Box {...s.footer}>
        <Text {...s.progressLabel}>
          {t("progressDays", { day: CURRENT_DAY, total: TOTAL_DAYS })}
        </Text>
        <Box {...s.progressBar}>
          <Box {...s.progressFill} style={{ width: `${(CURRENT_DAY / TOTAL_DAYS) * 100}%` }} />
        </Box>
      </Box>
    </Box>
  );
}
