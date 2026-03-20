import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    mb: 0,
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    p: { base: 4, md: 6 },
    pt: { base: 5, md: 7 },
    w: "100%",
    maxW: "none",
    gridColumn: { base: "auto", md: "span 2" },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: { base: "lg", md: "xl" },
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },
  scrollContainer: {
    pb: 2,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: {
      base: "repeat(11, minmax(0, 1fr))",
      sm: "repeat(11, minmax(0, 1.5rem))",
      md: "repeat(11, minmax(0, 1.875rem))",
    },
    gap: "0.25rem",
    width: "100%",
  },
  cell: {
    w: "full",
    aspectRatio: "1",
    border: "0.09375rem solid black",
    cursor: "default",
    borderRadius: "0.125rem",
  },
  completedMint: { bg: "surface.mint" },
  completedSky: { bg: "surface.sky" },
  completedCoral: { bg: "surface.coral" },
  completedLavender: { bg: "surface.lavender" },
  completedYellow: { bg: "surface.yellow" },
  pendingRegular: { bg: "muted" },
  legend: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: 2,
  },
  legendCell: {
    w: "0.75rem",
    h: "0.75rem",
    border: "0.0625rem solid black",
  },
  legendText: {
    fontSize: "xs",
    color: "mutedFg",
    fontWeight: "bold",
  },
} satisfies Record<string, SystemStyleObject>;
