import { SystemStyleObject } from "@chakra-ui/react";
import type { CSSProperties } from "react";

export const sharedAuthStyles = {
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
    layerStyle: "cardBrutal",
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
