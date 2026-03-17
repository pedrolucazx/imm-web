import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  content: {
    bg: "card",
    border: "3px solid black",
    boxShadow: "brutal",
    w: "100%",
    maxH: "90vh",
    overflowY: "auto" as const,
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
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    _hover: { transform: "translate(-1px, -1px)", boxShadow: "brutal" },
    _active: { transform: "translate(1px, 1px)", boxShadow: "none" },
    _focusVisible: { outline: "3px solid", outlineColor: "ring", outlineOffset: "2px" },
  },
} satisfies Record<string, SystemStyleObject>;
