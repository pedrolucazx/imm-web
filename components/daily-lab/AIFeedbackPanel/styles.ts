import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    mt: 6,
  },

  counterRow: {
    display: "flex",
    justifyContent: "flex-end",
    mb: 3,
  },

  usageCounter: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "mutedFg",
  },

  placeholder: {
    border: "3px solid black",
    bg: "card",
    p: 6,
    textAlign: "center",
  },

  placeholderText: {
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
  },

  loadingBox: {
    border: "3px solid black",
    bg: "surface.yellow",
    p: 4,
    textAlign: "center",
  },

  loadingText: {
    fontSize: "sm",
    fontWeight: "bold",
  },

  panel: {
    border: "3px solid black",
    bg: "card",
    p: 5,
    boxShadow: "brutal",
  },

  panelHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 5,
  },

  panelTitle: {
    fontSize: "2xl",
    fontWeight: "800",
  },

  skillBadge: {
    px: 3,
    py: 1,
    border: "2px solid black",
    bg: "card",
    fontSize: "sm",
    fontWeight: "800",
    boxShadow: "brutal-sm",
  },

  scoreGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 3,
    mb: 5,
  },

  subTitle: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 3,
  },

  boxTitle: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 1,
  },

  errorItem: {
    border: "2px solid black",
    bg: "surface.coral",
    p: 3,
    mb: 2,
  },

  errorOriginal: {
    fontSize: "sm",
    fontWeight: "500",
    textDecoration: "line-through",
    color: "mutedFg",
  },

  errorCorrected: {
    fontSize: "sm",
    fontWeight: "800",
    mt: 1,
  },

  errorExplanation: {
    fontSize: "xs",
    color: "mutedFg",
    mt: 1,
  },

  highlightBox: {
    border: "2px solid black",
    bg: "surface.yellow",
    p: 4,
    mt: 4,
  },

  highlightText: {
    fontSize: "sm",
    fontWeight: "500",
    fontStyle: "italic",
  },

  actionBox: {
    border: "3px solid black",
    bg: "primary",
    p: 4,
    mt: 4,
  },

  actionText: {
    fontSize: "sm",
    fontWeight: "600",
  },

  statCard: {
    border: "2px solid black",
    bg: "card",
    p: 3,
    textAlign: "center",
    boxShadow: "brutal-sm",
  },

  moodEmoji: {
    fontSize: "3xl",
    lineHeight: 1,
  },

  statLabel: {
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mt: 1,
  },

  statValue: {
    fontSize: "lg",
    fontWeight: "800",
  },

  insightCard: {
    border: "2px solid black",
    bg: "card",
    p: 3,
    mb: 2,
  },

  insightText: {
    fontSize: "sm",
    fontWeight: "500",
  },

  poweredBy: {
    fontSize: "xs",
    fontWeight: "bold",
    color: "mutedFg",
    textAlign: "center",
    mt: 5,
  },

  scoreBadgeContainer: {
    border: "2px solid black",
    bg: "card",
    p: 3,
    textAlign: "center",
    boxShadow: "brutal-sm",
  },

  scoreBadgeValue: {
    fontSize: "3xl",
    fontWeight: "800",
    lineHeight: 1,
  },

  scoreBadgeLabel: {
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mt: 1,
    mb: 2,
  },

  progressBar: {
    h: "2",
    w: "100%",
    bg: "muted",
    border: "2px solid black",
    overflow: "hidden",
  },

  progressFill: {
    h: "100%",
    bg: "secondary",
    transition: "width 0.3s ease",
  },
} satisfies Record<string, SystemStyleObject>;
