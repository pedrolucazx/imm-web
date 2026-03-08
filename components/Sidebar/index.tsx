"use client";

import { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { s, SIDEBAR_WIDTH } from "./styles";

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
  { icon: "🎯", labelKey: "habits", href: ROUTES.APP_DAILY_LAB, ownedRoute: ROUTES.APP_HABITS },
  { icon: "📅", labelKey: "history", href: ROUTES.APP_DAILY_LAB, ownedRoute: ROUTES.APP_HISTORY },
  {
    icon: "📊",
    labelKey: "analytics",
    href: ROUTES.APP_DAILY_LAB,
    ownedRoute: ROUTES.APP_ANALYTICS,
  },
  { icon: "⚙️", labelKey: "settings", href: ROUTES.SETTINGS, ownedRoute: ROUTES.SETTINGS },
];

const CURRENT_DAY = 0;
const TOTAL_DAYS = 66;

export function Sidebar() {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Box
          {...s.hamburgerButton}
          display={{ base: "flex", md: "none" }}
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menu"
        >
          ☰
        </Box>
      )}

      {isOpen && (
        <Box
          {...s.overlay}
          display={{ base: "block", md: "none" }}
          onClick={() => setIsOpen(false)}
        />
      )}

      <Box
        as="aside"
        {...s.aside}
        display={{ base: isOpen ? "flex" : "none", md: "flex" }}
        w={{ base: "100%", md: SIDEBAR_WIDTH }}
      >
        <Box
          {...s.closeButton}
          display={{ base: "flex", md: "none" }}
          onClick={() => setIsOpen(false)}
          aria-label="Fechar menu"
        >
          ✕
        </Box>

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
                <Link
                  href={href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <Box as="span" aria-hidden="true" {...s.navIcon}>
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
          <Box
            {...s.progressBar}
            role="progressbar"
            aria-valuenow={CURRENT_DAY}
            aria-valuemin={0}
            aria-valuemax={TOTAL_DAYS}
            aria-label={t("progressDays", { day: CURRENT_DAY, total: TOTAL_DAYS })}
          >
            <Box {...s.progressFill} style={{ width: `${(CURRENT_DAY / TOTAL_DAYS) * 100}%` }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
