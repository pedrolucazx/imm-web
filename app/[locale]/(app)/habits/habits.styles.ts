import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  page: {
    p: { base: 4, md: 8 },
    maxW: "800px",
    overflowX: "visible",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 8,
    flexWrap: "wrap",
    gap: 4,
    overflow: "visible",
  },

  pageTitle: {
    fontSize: { base: "3xl", md: "4xl" },
    fontWeight: "800",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },

  newHabitBtn: {
    position: "relative" as const,
  },

  banner: {
    p: 4,
    mb: 6,
    display: "flex",
    alignItems: "start",
    justifyContent: "space-between",
    gap: 4,
  },

  bannerDismiss: {
    flexShrink: 0,
    w: 8,
    h: 8,
    border: "2px solid black",
    bg: "card",
    fontWeight: "bold",
    fontSize: "sm",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  habitList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  habitCard: {
    w: "100%",
    p: 6,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  habitHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    flexWrap: "wrap",
  },

  habitInfo: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  habitIcon: {
    fontSize: "3xl",
  },

  habitTitle: {
    fontSize: "xl",
    fontWeight: "800",
  },

  habitTags: {
    display: "flex",
    gap: 2,
    mt: 1,
    flexWrap: "wrap",
  },

  habitTag: {
    px: 2,
    py: 0.5,
    border: "2px solid black",
    bg: "card",
    fontSize: "xs",
    fontWeight: "bold",
  },

  habitStreak: {
    textAlign: "right",
  },

  streakNumber: {
    fontSize: "3xl",
    fontWeight: "800",
  },

  streakLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  planToggle: {
    w: "100%",
    py: 2,
    border: "2px solid black",
    bg: "card",
    fontWeight: "bold",
    fontSize: "sm",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },

  planContent: {
    mt: 3,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  planStrategy: {
    border: "2px solid black",
    bg: "card",
    p: 3,
  },

  planStrategyText: {
    fontSize: "sm",
    fontWeight: "bold",
  },

  planMetrics: {
    fontSize: "xs",
    fontWeight: "500",
    color: "mutedFg",
    mt: 1,
  },

  phaseCard: {
    border: "2px solid black",
    bg: "card",
    p: 4,
  },

  phaseHeader: {
    fontSize: "sm",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },

  phaseTitle: {
    fontSize: "lg",
    fontWeight: "800",
    mt: 1,
  },

  taskList: {
    mt: 2,
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },

  taskItem: {
    fontSize: "sm",
    fontWeight: "500",
    display: "flex",
    gap: 2,
  },

  phaseTip: {
    fontSize: "sm",
    fontWeight: "500",
    mt: 2,
  },

  phaseTipLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    color: "mutedFg",
  },

  generatingStatus: {
    mt: 4,
    border: "2px solid black",
    bg: "surface.yellow",
    p: 4,
    animation: "pulse 2s infinite",
  },

  failedStatus: {
    mt: 4,
    border: "2px solid black",
    bg: "surface.coral",
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  emptyState: {
    bg: "card",
    p: 10,
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "5xl",
    mb: 4,
  },

  emptyTitle: {
    fontSize: "xl",
    fontWeight: "800",
    mb: 2,
  },

  emptySubtitle: {
    fontWeight: "500",
    color: "mutedFg",
    mb: 6,
  },
} satisfies Record<string, SystemStyleObject>;
