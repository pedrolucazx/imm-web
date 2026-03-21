import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  overlay: {
    position: "fixed",
    inset: "0",
    bg: "blackAlpha.700",
    backdropFilter: "blur(4px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 4,
  },

  banner: {
    bg: "card",
    border: "3px solid black",
    boxShadow: "8px 8px 0px 0px black",
    maxW: "500px",
    w: "100%",
    maxH: "90vh",
    overflowY: "auto",
  },

  header: {
    bg: "surface.coral",
    p: 4,
    borderBottom: "3px solid black",
    display: "flex",
    alignItems: "center",
    gap: 3,
  },

  headerIcon: {
    fontSize: "2xl",
  },

  headerTitle: {
    fontSize: "lg",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    lineHeight: 1.2,
  },

  body: {
    p: 6,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  introText: {
    fontSize: "sm",
    fontWeight: "600",
    lineHeight: 1.7,
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  sectionTitle: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    color: "black",
  },

  sectionText: {
    fontSize: "sm",
    lineHeight: 1.6,
    color: "black",
  },

  footer: {
    p: 4,
    borderTop: "3px solid black",
    bg: "canvas",
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },

  links: {
    display: "flex",
    justifyContent: "center",
    pt: 2,
    borderTop: "1px solid",
    borderColor: "border",
  },

  link: {
    fontSize: "xs",
    fontWeight: "600",
    textDecoration: "underline",
    _hover: {
      color: "secondary",
    },
  },
} satisfies Record<string, SystemStyleObject>;
