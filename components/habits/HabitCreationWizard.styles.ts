import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  formStack: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  label: {
    display: "block",
    fontSize: "sm",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 2,
  },

  input: {
    bg: "white",
    border: "2px solid black",
    borderRadius: "0",
    _focus: { ring: "2px", ringColor: "ring" },
  },

  textarea: {
    bg: "white",
    border: "2px solid black",
    borderRadius: "0",
    resize: "none",
    _focus: { ring: "2px", ringColor: "ring" },
  },

  sectionLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    mb: 2,
    color: "mutedFg",
  },

  modeHintSkill: {
    border: "3px solid black",
    bg: "surface.mint",
    p: 3,
  },

  modeHintTracking: {
    border: "3px solid black",
    bg: "surface.lavender",
    p: 3,
  },

  modeHintText: {
    fontSize: "sm",
    fontWeight: "bold",
  },

  planNoteSkill: {
    bg: "surface.mint",
    border: "3px solid black",
    p: 3,
  },

  planNoteTracking: {
    bg: "surface.lavender",
    border: "3px solid black",
    p: 3,
  },

  planNoteText: {
    fontSize: "sm",
    fontWeight: "bold",
  },

  toggleRow: {
    border: "3px solid black",
    bg: "card",
    p: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toggleLabel: {
    fontWeight: "bold",
  },

  manualNote: {
    bg: "muted",
    border: "3px solid black",
    p: 4,
  },

  manualNoteText: {
    fontSize: "sm",
    fontWeight: "bold",
  },

  summaryCard: {
    border: "3px solid black",
    bg: "card",
    p: 4,
  },

  summaryTitle: {
    fontWeight: "800",
    mb: 3,
    textTransform: "uppercase",
  },

  summaryStack: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    fontSize: "sm",
    fontWeight: "500",
  },

  planPreview: {
    border: "3px solid black",
    bg: "card",
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  planPreviewTitle: {
    fontWeight: "800",
    textTransform: "uppercase",
    fontSize: "sm",
    mb: 1,
  },

  planStrategy: {
    fontSize: "sm",
    fontWeight: "500",
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },

  phaseCard: {
    border: "2px solid black",
    bg: "muted",
    p: 3,
  },

  phaseHeader: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "mutedFg",
    mb: 1,
  },

  phaseTitle: {
    fontWeight: "700",
    fontSize: "sm",
    mb: 2,
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

  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    py: 8,
    textAlign: "center",
  },

  loadingTitle: {
    fontWeight: "800",
    textTransform: "uppercase",
  },

  loadingSubtitle: {
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
  },
} satisfies Record<string, SystemStyleObject>;
