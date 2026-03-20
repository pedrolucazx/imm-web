import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    mb: 8,
  },
  wrapperCompact: {
    mb: 0,
    border: "0.1875rem solid black",
    boxShadow: "brutal-sm",
    p: 4,
    w: "100%",
    maxW: { base: "none", md: "26.25rem" },
    alignSelf: "start",
    h: "fit-content",
  },
  title: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },
  titleCompact: {
    fontSize: "lg",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 3,
  },
  scrollContainer: {
    pb: 2,
  },
  scrollContainerCompact: {
    pb: 2,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(11, minmax(0, 1.875rem))",
    gap: "0.25rem",
  },
  gridCompact: {
    display: "grid",
    gridTemplateColumns: "repeat(11, minmax(1.125rem, 1fr))",
    gridTemplateRows: "repeat(6, 1fr)",
    gap: "0.3125rem",
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
  pendingCompact: { bg: "card" },
  legend: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mt: 2,
  },
  legendCompact: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: 2,
  },
  legendCell: {
    w: "0.75rem",
    h: "0.75rem",
    border: "0.0625rem solid black",
  },
  legendCellCompact: {
    w: "0.625rem",
    h: "0.625rem",
    border: "0.0625rem solid black",
  },
  legendText: {
    fontSize: "xs",
    color: "mutedFg",
    fontWeight: "bold",
  },
  legendTextCompact: {
    fontSize: "xs",
    color: "mutedFg",
    fontWeight: "bold",
  },
} satisfies Record<string, SystemStyleObject>;
