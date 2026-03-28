import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  scoreCard: {
    border: "3px solid black",
    p: 4,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  scoreNumber: {
    fontSize: "4xl",
    fontWeight: "800",
    lineHeight: 1,
    flexShrink: 0,
  },

  scoreMeta: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },

  scoreLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "wider",
    color: "mutedFg",
  },

  statsRow: {
    display: "flex",
    gap: 4,
    fontSize: "sm",
    fontWeight: "600",
  },

  statCorrect: {
    color: "green.700",
  },

  statMissed: {
    color: "red.700",
  },

  sectionTitle: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "wider",
    color: "mutedFg",
    mb: 2,
  },

  wordList: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },

  wordCorrect: {
    px: 2,
    py: 0.5,
    bg: "surface.mint",
    border: "2px solid black",
    fontSize: "sm",
    fontWeight: "600",
  },

  wordMissed: {
    px: 2,
    py: 0.5,
    bg: "surface.coral",
    border: "2px solid black",
    fontSize: "sm",
    fontWeight: "600",
  },

  wordExtra: {
    px: 2,
    py: 0.5,
    bg: "card",
    border: "2px solid black",
    fontSize: "sm",
    fontWeight: "500",
    opacity: 0.7,
  },

  transcriptionBox: {
    border: "2px solid black",
    bg: "card",
    p: 3,
  },

  transcriptionText: {
    fontSize: "sm",
    fontStyle: "italic",
  },

  retryButton: {
    mt: 2,
  },
} satisfies Record<string, SystemStyleObject>;
