import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  card: {
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    p: 4,
    minH: "7.5rem",
    w: "100%",
    minW: 0,
    color: "black",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
  },
  value: {
    fontSize: { base: "2xl", md: "3xl" },
    fontWeight: "900",
    lineHeight: 1,
  },
  label: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mt: 1,
  },
} satisfies Record<string, SystemStyleObject>;
