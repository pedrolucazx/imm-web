import { SystemStyleObject } from "@chakra-ui/react";
import { sharedAuthStyles, brandLinkStyle, footerLinkStyle } from "../auth.styles";

export const s = {
  ...sharedAuthStyles,
  langGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 2,
  },
  langBtn: {
    p: 3,
    border: "2px solid black",
    boxShadow: "2px 2px 0px 0px black",
    fontWeight: "700",
    fontSize: "sm",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    _hover: {
      transform: "translate(-2px, -2px)",
      boxShadow: "4px 4px 0px 0px black",
    },
    _active: {
      transform: "translate(2px, 2px)",
      boxShadow: "none",
    },
  },
  langFlag: {
    fontSize: "xl",
    display: "block",
    mb: 1,
  },
} satisfies Record<string, SystemStyleObject>;

export { brandLinkStyle, footerLinkStyle };
