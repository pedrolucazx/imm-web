import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  section: {
    mb: 8,
  },

  sectionTitle: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },

  habitList: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  habitCard: {
    w: "100%",
    border: "3px solid black",
    p: 5,
    textAlign: "left",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },

  habitRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },

  habitIcon: {
    fontSize: "4xl",
    lineHeight: 1,
    flexShrink: 0,
  },

  habitInfo: {
    flex: 1,
    minW: 0,
  },

  habitName: {
    fontSize: "xl",
    fontWeight: "800",
  },

  habitMeta: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    mt: 1,
    flexWrap: "wrap",
  },

  skillBadge: {
    px: 2,
    py: 0.5,
    border: "2px solid black",
    bg: "card",
    fontSize: "xs",
    fontWeight: "bold",
  },

  streakText: {
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
  },

  checkbox: {
    w: 8,
    h: 8,
    border: "3px solid black",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  planCard: {
    ml: 12,
    mt: 2,
    border: "2px solid black",
    bg: "card",
    p: 4,
  },

  planHeader: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "mutedFg",
    mb: 1,
  },

  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },

  taskItem: {
    fontSize: "sm",
    fontWeight: "500",
  },

  tipText: {
    fontSize: "xs",
    fontWeight: "bold",
    color: "mutedFg",
    mt: 1,
  },
} satisfies Record<string, SystemStyleObject>;
