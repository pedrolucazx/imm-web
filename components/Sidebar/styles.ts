import type { SystemStyleObject } from "@chakra-ui/react";

export const SIDEBAR_WIDTH = "16rem";

const navItemBase = {
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
  border: "3px solid black",
  boxShadow: "brutal-sm",
  cursor: "pointer",
};

export const s = {
  aside: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    h: "100vh",
    bg: "primary",
    borderRight: "2px solid black",
    boxShadow: "brutal-sm",
    flexDirection: "column" as const,
    zIndex: 50,
    overflowY: "auto" as const,
  },

  hamburgerButton: {
    position: "fixed" as const,
    top: 4,
    left: 4,
    zIndex: 51,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    w: 10,
    h: 10,
    bg: "primary",
    border: "2px solid black",
    boxShadow: "brutal-sm",
    cursor: "pointer",
    fontSize: "1.5rem",
    fontWeight: "900",
    _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal" },
    _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },

  overlay: {
    position: "fixed" as const,
    inset: 0,
    bg: "blackAlpha.600",
    zIndex: 49,
  },

  closeButton: {
    position: "absolute" as const,
    top: 4,
    right: 4,
    w: 10,
    h: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bg: "sidebar.primary",
    color: "sidebar.primaryFg",
    border: "2px solid black",
    boxShadow: "brutal-sm",
    cursor: "pointer",
    fontWeight: "900",
    fontSize: "1rem",
    _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal" },
    _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },

  logoSection: {
    px: 5,
    py: 6,
    borderBottom: "3px solid black",
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "center",
    gap: "0.5rem",
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
    ...navItemBase,
    color: "sidebar.fg",
    bg: "card",
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
    ...navItemBase,
    color: "sidebar.primaryFg",
    bg: "sidebar.primary",
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
