import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  page: {
    px: { base: 4, md: 8 },
    pt: { base: 20, md: 8 },
    pb: { base: 8, md: 8 },
    display: "flex",
    flexDirection: "column",
    gap: 6,
    maxW: "800px",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 4,
  },

  title: {
    fontSize: { base: "3xl", md: "4xl" },
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
    lineHeight: 1.1,
  },

  spinner: {
    position: "fixed",
    inset: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
} satisfies Record<string, SystemStyleObject>;
