import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  aside: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    h: "100vh",
    w: "16rem",
    bg: "sidebar.bg",
    borderRight: "3px solid black",
    boxShadow: "4px 0px 0px 0px black",
    display: "flex",
    flexDirection: "column" as const,
    zIndex: 100,
    overflowY: "auto" as const,
  },

  logoSection: {
    px: 6,
    py: 6,
    borderBottom: "3px solid black",
  },

  logoText: {
    fontSize: "lg",
    fontWeight: "900",
    textTransform: "uppercase" as const,
    letterSpacing: "-0.03em",
    color: "sidebar.fg",
    lineHeight: 1,
  },

  logoSubtext: {
    fontSize: "xs",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "sidebar.fg",
    opacity: 0.6,
    mt: 1,
  },

  nav: {
    flex: 1,
    px: 3,
    py: 4,
    display: "flex",
    flexDirection: "column" as const,
    gap: 1,
  },

  navLabel: {
    px: 3,
    py: 2,
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    color: "sidebar.fg",
    opacity: 0.5,
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    px: 3,
    py: 2,
    fontWeight: "700",
    fontSize: "sm",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    textDecoration: "none",
    color: "sidebar.fg",
    border: "2px solid transparent",
    cursor: "pointer",
    transition: "all 0.1s ease",
    _hover: {
      bg: "sidebar.accent",
      border: "2px solid black",
      boxShadow: "brutal-sm",
      transform: "translate(-1px, -1px)",
    },
  },

  navItemActive: {
    display: "flex",
    alignItems: "center",
    gap: 3,
    px: 3,
    py: 2,
    fontWeight: "700",
    fontSize: "sm",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    textDecoration: "none",
    color: "sidebar.primaryFg",
    bg: "sidebar.primary",
    border: "2px solid black",
    boxShadow: "brutal-sm",
    cursor: "pointer",
  },

  navIcon: {
    fontSize: "1rem",
    flexShrink: 0,
  },

  footer: {
    px: 5,
    py: 5,
    borderTop: "3px solid black",
  },

  footerLabel: {
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    letterSpacing: "0.12em",
    color: "sidebar.fg",
    opacity: 0.6,
    mb: 2,
  },

  progressBar: {
    h: "8px",
    w: "100%",
    bg: "sidebar.accent",
    border: "2px solid black",
    overflow: "hidden" as const,
  },

  progressFill: {
    h: "100%",
    bg: "sidebar.primary",
    transition: "width 0.3s ease",
  },

  progressText: {
    fontSize: "xs",
    fontWeight: "700",
    color: "sidebar.fg",
    mt: 2,
  },
} satisfies Record<string, SystemStyleObject>;
