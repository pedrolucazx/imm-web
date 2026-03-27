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
  footerActions: {
    display: "flex",
    gap: 3,
    w: "100%",
  },

  footerBtn: {
    flex: 1,
  },

  deleteBtn: {
    flex: 1,
    bg: "red.500",
    color: "white",
    _hover: { bg: "red.600" },
  },
} satisfies Record<string, SystemStyleObject>;
