"use client";

import { useState } from "react";
import { Box, Drawer, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { Link, usePathname, useRouter } from "@/lib/navigation";
import { ROUTES } from "@/lib/routes";
import { useAuthContext } from "@/lib/auth-context";
import { useHabits } from "@/lib/hooks/useHabits";
import { s, SIDEBAR_WIDTH } from "./styles";
import type { Habit } from "@/types/habits";

const TOTAL_DAYS = 66;

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

const MOBILE_PANEL_ID = "sidebar-mobile-panel";

interface SidebarContentProps {
  t: ReturnType<typeof useTranslations>;
  pathname: string;
  currentDay: number | null;
  onNavClick?: () => void;
  onLogout: () => void;
}

function SidebarContent({ t, pathname, currentDay, onNavClick, onLogout }: SidebarContentProps) {
  return (
    <>
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
              <Link href={href} aria-current={isActive ? "page" : undefined} onClick={onNavClick}>
                <Box as="span" aria-hidden="true" {...s.navIcon}>
                  {icon}
                </Box>
                {t(labelKey)}
              </Link>
            </Box>
          );
        })}
      </Box>

      <chakra.button type="button" onClick={onLogout} {...s.logoutBtn}>
        <Box as="span" aria-hidden="true" {...s.navIcon}>
          🚪
        </Box>
        {t("logout")}
      </chakra.button>

      {currentDay !== null && (
        <Box {...s.footer}>
          <Text {...s.progressLabel}>
            {t("progressDays", { day: currentDay, total: TOTAL_DAYS })}
          </Text>
          <Box
            {...s.progressBar}
            role="progressbar"
            aria-valuenow={currentDay}
            aria-valuemin={0}
            aria-valuemax={TOTAL_DAYS}
            aria-label={t("progressDays", { day: currentDay, total: TOTAL_DAYS })}
          >
            <Box {...s.progressFill} style={{ width: `${(currentDay / TOTAL_DAYS) * 100}%` }} />
          </Box>
        </Box>
      )}
    </>
  );
}

export function Sidebar() {
  const t = useTranslations("sidebar");
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const { data: habits = [] } = useHabits();
  const activeHabits = habits.filter((h: Habit) => h.is_active);
  const currentDay =
    activeHabits.length > 0 ? Math.max(...activeHabits.map((h: Habit) => h.current_day)) : null;

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // logout falhou no servidor — prosseguir com limpeza local
    } finally {
      queryClient.clear();
      router.replace(ROUTES.LOGIN);
    }
  };

  const contentProps: SidebarContentProps = {
    t,
    pathname,
    currentDay,
    onLogout: handleLogout,
  };

  return (
    <>
      <Box
        {...s.hamburgerButton}
        display={{ base: "flex", md: "none" }}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls={MOBILE_PANEL_ID}
        aria-label={t("openMenu")}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setIsOpen(true)}
      >
        ☰
      </Box>

      <Drawer.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)} placement="start">
        <Drawer.Backdrop display={{ base: "block", md: "none" }} />
        <Drawer.Positioner display={{ base: "flex", md: "none" }}>
          <Drawer.Content id={MOBILE_PANEL_ID} {...s.drawerContent}>
            <Drawer.CloseTrigger asChild>
              <Box {...s.closeButton} aria-label={t("closeMenu")}>
                ✕
              </Box>
            </Drawer.CloseTrigger>
            <SidebarContent {...contentProps} onNavClick={() => setIsOpen(false)} />
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>

      <Box as="aside" {...s.aside} display={{ base: "none", md: "flex" }} w={SIDEBAR_WIDTH}>
        <SidebarContent {...contentProps} />
      </Box>
    </>
  );
}
