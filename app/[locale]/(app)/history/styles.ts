import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  pageContainer: {
    maxW: "800px",
  },

  badgesRow: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap" as const,
    mb: 4,
  },

  agentBadge: {
    px: 2,
    py: "2px",
    border: "2px solid black",
    bg: "surface.sky",
    fontSize: "xs",
    fontWeight: "800",
  },

  separator: {
    borderColor: "black",
    borderWidth: "2px",
    my: 5,
  },

  entryCard: {
    border: "2px solid black",
    bg: "card",
    p: 4,
    mb: 3,
  },

  habitRow: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mb: 2,
    flexWrap: "wrap" as const,
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
    bg: "surface.sky",
  },

  entryContent: {
    fontSize: "sm",
    fontWeight: "500",
    mb: 2,
  },

  entryMeta: {
    fontSize: "xs",
    color: "mutedFg",
    fontWeight: "700",
  },

  feedbackBox: {
    border: "3px solid black",
    p: 5,
    boxShadow: "brutal",
  },

  noFeedback: {
    border: "3px solid black",
    bg: "muted",
    p: 4,
    textAlign: "center" as const,
  },

  noFeedbackText: {
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
  },
} satisfies Record<string, SystemStyleObject>;
