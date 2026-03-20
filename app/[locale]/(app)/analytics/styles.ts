import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  content: {
    display: "grid",
    gap: 6,
  },

  globalGrid: {
    display: "grid",
    gap: 3,
    gridTemplateColumns: {
      base: "repeat(2, minmax(0, 1fr))",
      lg: "repeat(4, minmax(0, 1fr))",
    },
  },

  sectionGrid: {
    display: "grid",
    gap: 6,
    gridTemplateColumns: {
      base: "1fr",
      xl: "minmax(0, 1.35fr) minmax(0, 1fr)",
    },
  },

  errorCard: {
    border: "3px solid black",
    boxShadow: "brutal",
    bg: "surface.coral",
    p: 6,
    maxW: "560px",
    display: "grid",
    gap: 3,
  },

  errorTitle: {
    fontSize: "lg",
    fontWeight: "800",
    lineHeight: "1.2",
  },

  errorText: {
    fontSize: "sm",
    fontWeight: "500",
  },
} satisfies Record<string, SystemStyleObject>;
