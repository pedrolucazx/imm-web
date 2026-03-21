import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  warningBox: {
    bg: "red.50",
    border: "2px solid",
    borderColor: "red.500",
    p: 3,
  },

  warningText: {
    fontSize: "sm",
    fontWeight: "600",
    color: "red.700",
    lineHeight: 1.5,
  },

  field: {
    mt: 4,
  },
} satisfies Record<string, SystemStyleObject>;
