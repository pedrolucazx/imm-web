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

  existingEntry: {
    border: "3px solid black",
    bg: "card",
    p: 4,
    mb: 4,
  },

  existingEntryLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    color: "mutedFg",
    mb: 1,
  },

  existingEntryContent: {
    fontSize: "sm",
    fontWeight: "500",
  },

  existingEntryMeta: {
    fontSize: "xs",
    color: "mutedFg",
    mt: 1,
  },

  textarea: {
    w: "100%",
    h: "40",
    p: 4,
    bg: "card",
    border: "3px solid black",
    boxShadow: "brutal",
    fontWeight: "500",
    fontSize: "base",
    resize: "none",
    display: "block",
    _focus: { outline: "none", ring: "2px", ringColor: "ring" },
    _placeholder: { color: "mutedFg" },
  },

  wordCount: {
    fontSize: "xs",
    fontWeight: "bold",
    color: "mutedFg",
    textAlign: "right",
    mt: 1,
  },

  scoresGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 4,
    mt: 4,
  },

  scoreCard: {
    border: "3px solid black",
    bg: "card",
    p: 4,
  },

  scoreLabel: {
    display: "block",
    fontSize: "sm",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 2,
  },

  scoreRow: {
    display: "flex",
    gap: 2,
  },

  scoreBtn: {
    flex: 1,
    py: 2,
    border: "3px solid black",
    fontWeight: "bold",
    fontSize: "lg",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },

  scoreBtnActive: {
    bg: "primary",
    boxShadow: "none",
    transform: "translate(2px, 2px)",
  },

  scoreBtnInactive: {
    bg: "card",
    boxShadow: "brutal-sm",
  },

  saveBtn: {
    mt: 4,
    w: "100%",
    py: 5,
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    border: "3px solid black",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  },

  saveBtnEnabled: {
    bg: "primary",
    boxShadow: "brutal",
    _hover: { transform: "translate(-2px, -2px)", boxShadow: "brutal-lg" },
    _active: { transform: "translate(2px, 2px)", boxShadow: "none" },
  },

  saveBtnDisabled: {
    bg: "muted",
    boxShadow: "brutal-sm",
    opacity: 0.5,
    cursor: "not-allowed",
  },

  analyzingBadge: {
    border: "3px solid black",
    bg: "surface.yellow",
    p: 4,
    mt: 4,
    textAlign: "center",
  },

  analyzingText: {
    fontSize: "sm",
    fontWeight: "bold",
  },
} satisfies Record<string, SystemStyleObject>;
