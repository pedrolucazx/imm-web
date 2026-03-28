import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  section: {
    mb: 8,
  },

  loadingText: {
    fontSize: "sm",
    fontWeight: "bold",
    color: "mutedFg",
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
    _focusVisible: { outline: "none", ring: "2px", ringColor: "ring" },
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
    gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
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
    _motionSafe: { transition: "transform 0.1s ease, box-shadow 0.1s ease" },
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
    _motionSafe: { transition: "transform 0.1s ease, box-shadow 0.1s ease" },
  },

  saveBtnEnabled: {
    bg: "primary",
    boxShadow: "brutal",
    _motionSafe: {
      _hover: { transform: "translate(-2px, -2px)", boxShadow: "brutal-lg" },
      _active: { transform: "translate(2px, 2px)", boxShadow: "none" },
    },
  },

  saveBtnDisabled: {
    bg: "muted",
    boxShadow: "brutal-sm",
    opacity: 0.5,
    cursor: "not-allowed",
  },

  saveBtnInactive: {
    bg: "card",
    boxShadow: "brutal",
    _motionSafe: {
      _hover: { transform: "translate(-2px, -2px)", boxShadow: "brutal-lg" },
      _active: { transform: "translate(2px, 2px)", boxShadow: "none" },
    },
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

  modeToggle: {
    display: "flex",
    border: "3px solid black",
    mb: 4,
    overflow: "hidden",
  },

  modeToggleBtn: {
    flex: 1,
    py: 2,
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    cursor: "pointer",
    border: "none",
    _motionSafe: { transition: "background 0.1s ease" },
  },

  modeToggleBtnActive: {
    bg: "primary",
    boxShadow: "none",
  },

  modeToggleBtnInactive: {
    bg: "card",
  },

  recorderBox: {
    border: "3px solid black",
    bg: "card",
    p: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
  },

  recordingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },

  recordingDot: {
    w: 3,
    h: 3,
    borderRadius: "full",
    bg: "red.500",
    _motionSafe: { animation: "pulse 1s infinite" },
  },

  recordingText: {
    fontSize: "sm",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },

  audioPlayerWrapper: {
    w: "100%",
    border: "3px solid black",
    p: 2,
    bg: "muted",
  },

  recorderBtnRow: {
    display: "flex",
    gap: 3,
    w: "100%",
  },

  micUnsupported: {
    fontSize: "sm",
    fontWeight: "bold",
    color: "mutedFg",
    textAlign: "center",
  },
} satisfies Record<string, SystemStyleObject>;
