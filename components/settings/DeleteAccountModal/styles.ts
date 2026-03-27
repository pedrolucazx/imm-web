import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  content: {
    bg: "card",
    border: "3px solid black",
    boxShadow: "brutal",
    w: "100%",
    maxH: "90vh",
    p: 6,
  },

  header: {
    p: 0,
    mb: 6,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    fontSize: "2xl",
    fontWeight: "800",
    textTransform: "uppercase" as const,
    flex: 1,
    pr: 4,
  },

  closeBtn: {
    w: 10,
    h: 10,
    border: "3px solid black",
    bg: "accent",
    color: "white",
    fontWeight: "900",
    fontSize: "lg",
    cursor: "pointer",
    boxShadow: "brutal-sm",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    _motionSafe: {
      transition: "transform 0.1s ease, box-shadow 0.1s ease",
      _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal" },
      _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
    },
    _focusVisible: { outline: "3px solid", outlineColor: "ring", outlineOffset: "2px" },
  },

  body: {
    p: 0,
    overflowY: "auto" as const,
    flex: "1",
    minH: 0,
  },

  footer: {
    p: 0,
    mt: 4,
  },

  warningBox: {
    bg: "red.50",
    border: "2px solid",
    borderColor: "red.500",
    p: 3,
  },

  warningText: {
    fontSize: "sm",
    fontWeight: "600",
    color: "red.700",
    lineHeight: 1.5,
  },

  field: {
    mt: 4,
  },
  footerActions: {
    display: "flex",
    gap: 3,
    w: "100%",
  },

  footerBtn: {
    flex: 1,
  },

  deleteBtn: {
    flex: 1,
    bg: "red.500",
    color: "white",
    _hover: { bg: "red.600" },
  },
} satisfies Record<string, SystemStyleObject>;
