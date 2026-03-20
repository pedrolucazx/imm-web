import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  grid: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      sm: "repeat(auto-fit, minmax(12.5rem, 1fr))",
    },
    gap: 4,
    mb: 8,
  },
  card: {
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    p: 6,
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    transition: "transform 0.1s, box-shadow 0.1s, border-bottom 0.1s",
  },
  cardSelected: {
    borderBottom: "0.375rem solid black",
    boxShadow: "0 0.5rem 0 0 black",
    transform: "translateY(-0.1875rem)",
  },
  cardUnselected: {
    borderBottom: "0.1875rem solid black",
    transform: "none",
  },
  toneMint: { bg: "surface.mint" },
  toneSky: { bg: "surface.sky" },
  toneCoral: { bg: "surface.coral" },
  toneLavender: { bg: "surface.lavender" },
  toneYellow: { bg: "surface.yellow" },
  cardHeader: {
    mb: 3,
    gap: 2,
    alignItems: "flex-start",
    minHeight: { base: "4rem", sm: "6rem" },
    display: "flex",
  },
  cardInfo: {
    flex: 1,
    minW: 0,
  },
  habitIcon: {
    fontSize: { base: "3xl", sm: "4xl" },
    lineHeight: 1,
    flexShrink: 0,
  },
  habitName: {
    fontSize: "lg",
    fontWeight: "800",
    lineHeight: 1.2,
    mb: 1,
    lineClamp: 2,
  },
  skillBadge: {
    display: "inline-block",
    paddingInline: 2,
    py: 0.5,
    border: "0.125rem solid black",
    bg: "card",
    mt: 1,
  },
  skillBadgeText: {
    fontSize: "xs",
    fontWeight: "bold",
  },
  streakNumber: {
    fontSize: { base: "4xl", sm: "5xl" },
    fontWeight: "900",
    lineHeight: 1,
    mb: 1,
  },
  streakLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },
  bottomSection: {
    mt: "auto",
    borderTop: "0.125rem solid black",
    pt: 3,
  },
  dayLabel: {
    fontSize: "sm",
    fontWeight: "bold",
    mb: 1,
  },
  progressOuter: {
    h: "0.75rem",
    border: "0.125rem solid black",
    bg: "card",
    overflow: "hidden",
  },
  progressInner: {
    h: "100%",
    bg: "black",
  },
  extraStats: {
    mt: 3,
    gap: { base: 2, sm: 4 },
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
  },
  extraStat: {
    fontSize: "xs",
    color: "mutedFg",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  emptyState: {
    border: "0.1875rem solid black",
    p: 8,
    textAlign: "center",
    mb: 8,
  },
  emptyText: {
    color: "mutedFg",
    fontWeight: "bold",
  },
} satisfies Record<string, SystemStyleObject>;
