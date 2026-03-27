import type { SystemStyleObject } from "@chakra-ui/react";
import { sharedAuthStyles } from "../auth.styles";

export const s = {
  ...sharedAuthStyles,
  suspenseFallback: {
    minH: "100vh",
    bg: "canvas",
    display: "grid",
    placeItems: "center",
  },
  tokenErrorBox: {
    textAlign: "center",
    py: 4,
  },
  tokenErrorText: {
    color: "error",
    mb: 4,
  },
} satisfies Record<string, SystemStyleObject>;
