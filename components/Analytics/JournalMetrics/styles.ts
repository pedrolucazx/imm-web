import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    mb: 0,
    w: "100%",
    gridColumn: { base: "auto", md: "span 3" },
  },
  title: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },
  row: {
    display: "grid",
    gridTemplateColumns: {
      base: "1fr",
      sm: "repeat(2, minmax(0, 1fr))",
      md: "repeat(3, minmax(0, 1fr))",
    },
    gap: 3,
    w: "100%",
    maxW: "100%",
  },
  card: {
    border: "0.1875rem solid black",
    boxShadow: "brutal-sm",
    p: { base: 4, md: 5 },
    textAlign: "center",
  },
  value: {
    fontSize: "2xl",
    fontWeight: "900",
  },
  label: {
    fontSize: "xs",
    fontWeight: "bold",
    color: "mutedFg",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mt: 1,
  },
} satisfies Record<string, SystemStyleObject>;
