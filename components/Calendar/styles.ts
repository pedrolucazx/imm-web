import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    border: "3px solid black",
    bg: "card",
    p: 6,
    boxShadow: "brutal",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 4,
  },

  monthTitle: {
    fontSize: "2xl",
    fontWeight: "800",
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
    gap: 2,
    mb: 2,
  },

  weekdayLabel: {
    textAlign: "center",
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "mutedFg",
    py: 2,
  },

  daysGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 2,
  },

  dayCell: {
    aspectRatio: "1",
    border: "2px solid black",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "2px",
    cursor: "default",
    bg: "card",
    opacity: 0.5,
  },

  dayCellEmpty: {
    aspectRatio: "1",
  },

  dayCellToday: {
    border: "2px solid black",
    outline: "4px solid",
    outlineColor: "ring",
    opacity: 1,
  },

  dayCellHasEntries: {
    bg: "surface.mint",
    opacity: 1,
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal-sm" },
    _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
  },

  dayNumber: {
    fontSize: "lg",
    fontWeight: "700",
    lineHeight: 1,
  },

  entryCount: {
    fontSize: "xs",
    lineHeight: 1,
    mt: "2px",
  },
} satisfies Record<string, SystemStyleObject>;
