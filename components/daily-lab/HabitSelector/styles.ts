import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  tabsRow: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    mb: 4,
  },

  tab: {
    px: 4,
    py: 2,
    border: "3px solid black",
    fontWeight: "bold",
    fontSize: "sm",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxW: "180px",
  },

  tabActive: {
    bg: "primary",
    boxShadow: "none",
    transform: "translate(2px, 2px)",
  },

  tabInactive: {
    bg: "card",
    boxShadow: "brutal-sm",
  },

  modeBadge: {
    display: "inline-block",
    px: 2,
    py: 0.5,
    border: "2px solid black",
    bg: "surface.mint",
    fontSize: "xs",
    fontWeight: "bold",
    mb: 3,
  },

  modeBadgeTracking: {
    bg: "surface.lavender",
  },

  skillBanner: {
    border: "3px solid black",
    bg: "surface.mint",
    p: 3,
    mb: 4,
  },

  skillBannerText: {
    fontSize: "sm",
    fontWeight: "bold",
  },
} satisfies Record<string, SystemStyleObject>;
