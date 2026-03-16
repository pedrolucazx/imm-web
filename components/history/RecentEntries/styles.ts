import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  section: {
    mt: 8,
  },

  title: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },

  list: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 3,
  },

  card: {
    border: "3px solid black",
    bg: "card",
    p: 4,
    boxShadow: "brutal-sm",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal" },
    _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
    flexWrap: "wrap" as const,
    gap: 2,
  },

  habitRow: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  habitIcon: {
    fontSize: "lg",
  },

  habitName: {
    fontWeight: "800",
    fontSize: "sm",
  },

  skillBadge: {
    px: 2,
    py: "2px",
    border: "2px solid black",
    fontSize: "xs",
    fontWeight: "800",
    bg: "muted",
    boxShadow: "brutal-sm",
  },

  date: {
    fontSize: "xs",
    fontWeight: "700",
    color: "mutedFg",
  },

  preview: {
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
    mb: 2,
    lineClamp: 2,
    overflow: "hidden",
  },

  meta: {
    fontSize: "xs",
    fontWeight: "700",
    color: "mutedFg",
  },

  empty: {
    border: "3px solid black",
    bg: "muted",
    p: 6,
    textAlign: "center",
  },

  emptyText: {
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
  },
} satisfies Record<string, SystemStyleObject>;
