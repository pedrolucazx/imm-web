import { SystemStyleObject } from "@chakra-ui/react";

export const landingStyles: Record<string, SystemStyleObject> = {
  phaseNumber: {
    fontSize: "6xl",
    fontWeight: "900",
    opacity: 0.2,
    position: "absolute",
    top: 4,
    right: 4,
    lineHeight: 1,
  },
  agentBadge: {
    display: "inline-block",
    px: 3,
    py: 1,
    bg: "white",
    border: "2px solid black",
    fontSize: "xs",
    fontWeight: "900",
    textTransform: "uppercase",
  },
};
