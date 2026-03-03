import { SystemStyleObject } from "@chakra-ui/react";
import type { CSSProperties } from "react";

const brutalCard: SystemStyleObject = {
  border: "3px solid black",
  boxShadow: "4px 4px 0px 0px black",
};

export const s = {
  pageWrapper: {
    minH: "100vh",
    bg: "canvas",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 6,
    py: 6,
  },
  inner: {
    w: "100%",
    maxW: "448px",
  },
  brandWrapper: {
    mb: 10,
  },
  brandHeading: {
    fontSize: "4xl",
    fontWeight: "700",
  },
  brandFlex: {
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  card: {
    ...brutalCard,
    p: 8,
    bg: "card",
  },
  cardStack: {
    display: "flex",
    flexDirection: "column",
  },
  cardTitle: {
    fontSize: "3xl",
    fontWeight: "700",
    lineHeight: "2.25rem",
    mb: 2,
  },
  cardSubtitle: {
    fontSize: "md",
    fontWeight: "500",
    color: "mutedFg",
    mb: 8,
  },
  formStack: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
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
  submitBtn: {
    width: "100%",
  },
  footerText: {
    textAlign: "center",
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
    mt: 6,
  },
} satisfies Record<string, SystemStyleObject>;

export const brandLinkStyle: CSSProperties = {
  textDecoration: "none",
  color: "inherit",
};

export const footerLinkStyle: CSSProperties = {
  fontWeight: "bold",
  color: "black",
  textDecoration: "underline",
  textUnderlineOffset: "4px",
};
