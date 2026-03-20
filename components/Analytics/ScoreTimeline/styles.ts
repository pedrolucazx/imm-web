import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  wrapper: {
    flex: 1,
    minW: 0,
    w: "100%",
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    p: 4,
  },
  title: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },
} satisfies Record<string, SystemStyleObject>;
