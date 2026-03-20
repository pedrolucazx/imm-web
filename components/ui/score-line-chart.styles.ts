import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    w: "100%",
    overflowX: "auto",
  },
  chartFrame: {
    w: "100%",
    minW: { base: "43.75rem", md: "53.75rem" },
    maxW: "53.75rem",
    mx: "auto",
    h: "20rem",
  },
} satisfies Record<string, SystemStyleObject>;
