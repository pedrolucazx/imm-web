import type { SystemStyleObject } from "@chakra-ui/react";

export const SIDEBAR_WIDTH = "16rem";

export const s = {
  aside: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    h: "100vh",
    w: SIDEBAR_WIDTH,
    bg: "sidebar.bg",
    borderRight: "3px solid black",
    boxShadow: "4px 0px 0px 0px black",
    display: "flex",
    flexDirection: "column" as const,
    zIndex: 100,
    overflowY: "auto" as const,
  },

  logoSection: {
    px: 5,
    py: 6,
    borderBottom: "3px solid black",
  },

  logoEmoji: {
    fontSize: "2rem",
    lineHeight: 1,
    mb: 2,
    display: "block",
  },

  logoText: {
    fontSize: "xl",
    fontWeight: "900",
    letterSpacing: "-0.03em",
    color: "sidebar.fg",
    lineHeight: 1.1,
  },

  nav: {
    flex: 1,
    px: 3,
    py: 4,
    display: "flex",
    flexDirection: "column" as const,
    gap: 2,
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    px: 4,
    py: 3,
    fontWeight: "700",
    fontSize: "sm",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    textDecoration: "none",
    color: "sidebar.fg",
    bg: "card",
    border: "3px solid black",
    boxShadow: "brutal-sm",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    _hover: {
      transform: "translate(-1px, -1px)",
      boxShadow: "brutal",
    },
    _active: {
      transform: "translate(1px, 1px)",
      boxShadow: "none",
    },
  },

  navItemActive: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    px: 4,
    py: 3,
    fontWeight: "700",
    fontSize: "sm",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    textDecoration: "none",
    color: "sidebar.primaryFg",
    bg: "sidebar.primary",
    border: "3px solid black",
    boxShadow: "brutal-sm",
    cursor: "pointer",
  },

  navIcon: {
    fontSize: "1.1rem",
    flexShrink: 0,
  },

  footer: {
    px: 5,
    py: 5,
    borderTop: "3px solid black",
  },

  progressLabel: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    color: "sidebar.fg",
    mb: 2,
  },

  progressBar: {
    h: "10px",
    w: "100%",
    bg: "card",
    border: "3px solid black",
    overflow: "hidden" as const,
  },

  progressFill: {
    h: "100%",
    bg: "sidebar.primary",
    transition: "width 0.3s ease",
  },
} satisfies Record<string, SystemStyleObject>;
