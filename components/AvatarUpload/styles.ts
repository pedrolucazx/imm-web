import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    alignItems: "center",
  },

  label: {
    fontSize: "sm",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },

  avatarBtn: {
    position: "relative",
    cursor: "pointer",
    borderRadius: "0",
    background: "none",
    border: "none",
    padding: "0",
    _hover: { opacity: 0.85 },
  },
} satisfies Record<string, SystemStyleObject>;
