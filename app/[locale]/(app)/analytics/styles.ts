import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  content: {
    display: "grid",
    gap: 6,
    w: "100%",
    minW: 0,
    overflowX: "hidden",
  },

  globalGrid: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      md: "repeat(2, minmax(0, 1fr))",
      xl: "repeat(auto-fit, minmax(12rem, 1fr))",
    },
    gap: 3,
    w: "100%",
    minW: 0,
  },

  sectionGrid: {
    display: "grid",
    gap: 3,
    alignItems: "start",
    justifyContent: "start",
    gridTemplateColumns: {
      base: "1fr",
      md: "repeat(5, 1fr)",
    },
  },

  detailCard: {
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    bg: "card",
    p: { base: 4, md: 6 },
    w: "100%",
  },

  detailHeader: {
    display: "grid",
    gap: 1,
    borderBottom: "0.125rem solid black",
    pb: 4,
    mb: 4,
  },

  detailTitle: {
    fontSize: { base: "lg", md: "xl" },
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    lineHeight: "1.2",
  },

  detailPhase: {
    fontSize: "xs",
    fontWeight: "700",
    color: "mutedFg",
    textTransform: "uppercase",
    letterSpacing: "wider",
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
