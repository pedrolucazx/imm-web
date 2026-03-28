import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    minW: 0,
    w: "100%",
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    p: { base: 4, md: 6 },
    pt: { base: 5, md: 7 },
    display: "flex",
    flexDirection: "column",
    gridColumn: { base: "auto", md: "span 2" },
  },

  title: {
    fontSize: { base: "lg", md: "xl" },
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: { base: 3, md: 4 },
  },

  cloud: {
    display: "flex",
    flexWrap: "wrap",
    gap: 2,
    alignItems: "baseline",
  },
} satisfies Record<string, SystemStyleObject>;
