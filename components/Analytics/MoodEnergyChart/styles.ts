import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    mb: 8,
    w: "100%",
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    bg: "card",
    p: { base: 4, md: 6 },
  },
  header: {
    borderBottom: "0.125rem solid black",
    pb: 4,
  },
  title: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },
  body: {
    pt: 4,
    overflowX: "auto",
  },
  chartFrame: {
    w: "100%",
    maxW: { base: "none", xl: "61.25rem" },
    mx: "auto",
    h: { base: "20rem", md: "23.75rem" },
    minW: { base: "43.75rem", md: "53.75rem" },
  },
} satisfies Record<string, SystemStyleObject>;
