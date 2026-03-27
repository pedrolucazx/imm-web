import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  label: {
    fontSize: "sm",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 2,
  },
  radioGroup: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 2,
  },
  radio: {
    p: 3,
    borderWidth: "2px",
    borderColor: "border",
    boxShadow: "brutal-sm",
    fontWeight: "700",
    fontSize: "sm",
    textAlign: "center",
    cursor: "pointer",
    _motionSafe: {
      transition: "transform 0.1s ease, box-shadow 0.1s ease",
      _hover: { transform: "translate(-2px, -2px)" },
      _active: { transform: "translate(2px, 2px)" },
    },
    _hover: { boxShadow: "brutal" },
    _active: { boxShadow: "none" },
  },
  radioSelected: { bg: "primary" },
  radioUnselected: { bg: "card" },
  flagText: {
    fontSize: "xl",
    display: "block",
    mb: 1,
  },
  error: {
    fontSize: "sm",
    color: "error",
    mt: 1,
  },
} satisfies Record<string, SystemStyleObject>;
