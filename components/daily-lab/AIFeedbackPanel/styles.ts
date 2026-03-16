import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    mt: 6,
  },

  sectionTitle: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },

  usageCounter: {
    display: "inline-flex",
    alignItems: "center",
    gap: 1,
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "mutedFg",
    mb: 4,
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
  },

  agentBadge: {
    display: "inline-flex",
    alignItems: "center",
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    border: "2px solid black",
    bg: "primary",
    px: 2,
    py: 1,
    mb: 4,
  },

  scoreRow: {
    mb: 4,
  },

  scoreLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "sm",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 1,
  },

  scoreValue: {
    fontSize: "sm",
    fontWeight: "800",
  },

  progressTrack: {
    h: "3",
    w: "100%",
    bg: "muted",
    border: "2px solid black",
    overflow: "hidden",
  },

  progressFill: {
    h: "100%",
    bg: "primary",
    transition: "width 0.3s ease",
  },

  divider: {
    borderTop: "2px solid black",
    my: 4,
  },

  subTitle: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 3,
  },

  errorItem: {
    border: "2px solid black",
    bg: "surface.red",
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
    color: "fg",
    mt: 1,
  },

  errorExplanation: {
    fontSize: "xs",
    color: "mutedFg",
    mt: 1,
  },

  highlightBox: {
    border: "2px solid black",
    bg: "surface.green",
    p: 3,
    mb: 3,
  },

  highlightText: {
    fontSize: "sm",
    fontWeight: "500",
    fontStyle: "italic",
  },

  insightItem: {
    display: "flex",
    gap: 2,
    alignItems: "flex-start",
    mb: 2,
  },

  insightBullet: {
    fontSize: "sm",
    fontWeight: "800",
    flexShrink: 0,
    mt: "1px",
  },

  insightText: {
    fontSize: "sm",
    fontWeight: "500",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 3,
    mb: 4,
  },

  statCard: {
    border: "2px solid black",
    bg: "muted",
    p: 3,
    textAlign: "center",
  },

  statLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "mutedFg",
    mb: 1,
  },

  statValue: {
    fontSize: "lg",
    fontWeight: "800",
  },

  actionBox: {
    border: "3px solid black",
    bg: "primary",
    p: 4,
    mt: 3,
  },

  actionLabel: {
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 1,
  },

  actionText: {
    fontSize: "sm",
    fontWeight: "600",
  },
} satisfies Record<string, SystemStyleObject>;
