import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  displayDate: {
    fontSize: "lg",
    fontWeight: "500",
    color: "mutedFg",
    mb: 8,
  },

  sectionTitle: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 4,
  },
} satisfies Record<string, SystemStyleObject>;
