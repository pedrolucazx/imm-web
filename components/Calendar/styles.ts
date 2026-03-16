import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    border: "3px solid black",
    bg: "card",
    p: 4,
    boxShadow: "brutal",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 4,
  },

  monthTitle: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },

  navBtn: {
    w: 9,
    h: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "3px solid black",
    bg: "card",
    fontWeight: "900",
    fontSize: "lg",
    cursor: "pointer",
    boxShadow: "brutal-sm",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal" },
    _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
  },

  weekdayGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 1,
    mb: 1,
  },

  weekdayLabel: {
    textAlign: "center",
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "mutedFg",
    py: 1,
  },

  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 1,
  },

  dayCell: {
    minH: { base: "44px", md: "56px" },
    border: "2px solid black",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    cursor: "default",
    bg: "card",
    position: "relative" as const,
  },

  dayCellEmpty: {
    minH: { base: "44px", md: "56px" },
    border: "2px solid transparent",
  },

  dayCellToday: {
    border: "2px solid black",
    boxShadow: "brutal-sm",
    bg: "surface.yellow",
  },

  dayCellHasEntries: {
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal-sm" },
    _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
  },

  dayNumber: {
    fontSize: "sm",
    fontWeight: "700",
    lineHeight: 1,
  },

  dayNumberMuted: {
    color: "mutedFg",
  },

  dotsRow: {
    display: "flex",
    gap: "3px",
    flexWrap: "wrap" as const,
    justifyContent: "center",
  },

  dot: {
    w: "6px",
    h: "6px",
    borderRadius: "full",
    border: "1px solid black",
  },
} satisfies Record<string, SystemStyleObject>;
