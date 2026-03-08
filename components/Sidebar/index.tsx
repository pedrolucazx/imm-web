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
  { icon: "🎯", labelKey: "habits", href: ROUTES.APP_HABITS, ownedRoute: ROUTES.APP_HABITS },
  { icon: "📅", labelKey: "history", href: ROUTES.APP_HISTORY, ownedRoute: ROUTES.APP_HISTORY },
  {
    icon: "📊",
    labelKey: "analytics",
    href: ROUTES.APP_ANALYTICS,
    ownedRoute: ROUTES.APP_ANALYTICS,
  },
  { icon: "⚙️", labelKey: "settings", href: ROUTES.SETTINGS, ownedRoute: ROUTES.SETTINGS },
];

interface SidebarProps {
  currentDay?: number;
  totalDays?: number;
}

export function Sidebar({ currentDay, totalDays }: SidebarProps = {}) {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const hasProgress = currentDay !== undefined && totalDays !== undefined;

  return (
    <>
      {!isOpen && (
        <Box
          {...s.hamburgerButton}
          display={{ base: "flex", md: "none" }}
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(true)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsOpen(true)}
          aria-label={t("openMenu")}
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
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsOpen(false)}
          aria-label={t("closeMenu")}
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

        {hasProgress && (
          <Box {...s.footer}>
            <Text {...s.progressLabel}>
              {t("progressDays", { day: currentDay, total: totalDays })}
            </Text>
            <Box
              {...s.progressBar}
              role="progressbar"
              aria-valuenow={currentDay}
              aria-valuemin={0}
              aria-valuemax={totalDays}
              aria-label={t("progressDays", { day: currentDay, total: totalDays })}
            >
              <Box {...s.progressFill} style={{ width: `${(currentDay! / totalDays!) * 100}%` }} />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
