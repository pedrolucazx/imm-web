import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  pageGrid: {
    display: "grid",
    gridTemplateColumns: { base: "1fr", lg: "1fr 1fr" },
    gap: 6,
    alignItems: "start",
  },

  sideCards: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  profileCard: {
    layerStyle: "cardBrutal",
    bg: "card",
    p: 6,
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },

  profileCardTitle: {
    fontSize: { base: "lg", md: "xl" },
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    lineHeight: 1.1,
    textWrap: "balance",
    pb: 3,
    borderBottom: "2px solid black",
  },

  formStack: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  aiSection: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    pt: 4,
    borderTop: "2px solid black",
  },

  aiTitle: {
    fontSize: "xs",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "mutedFg",
    mb: 1,
  },

  usageInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  usageLabel: {
    fontSize: "sm",
    fontWeight: "700",
  },

  usageReset: {
    fontSize: "xs",
    fontWeight: "600",
    color: "mutedFg",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },

  usageBar: {
    h: "10px",
    bg: "canvas",
    border: "2px solid black",
    overflow: "hidden",
  },

  usageFill: {
    h: "100%",
    bg: "secondary",
    _motionSafe: { transition: "width 0.3s ease" },
  },

  saveBtn: {
    w: "100%",
    mt: 2,
  },

  languageCard: {
    bg: "surface.yellow",
    border: "3px solid black",
    boxShadow: "4px 4px 0px 0px black",
    p: 5,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  languageCardTitle: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    lineHeight: 1.1,
    textWrap: "balance",
    color: "black",
  },

  languageBanner: {
    fontSize: "xs",
    fontWeight: "600",
    color: "black",
    lineHeight: 1.5,
  },

  privacyCard: {
    layerStyle: "cardBrutal",
    bg: "card",
    p: 5,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  privacyCardTitle: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    lineHeight: 1.1,
    textWrap: "balance",
  },

  privacyDescription: {
    fontSize: "xs",
    lineHeight: 1.5,
    color: "mutedFg",
  },

  accountCard: {
    layerStyle: "cardBrutal",
    bg: "card",
    p: 5,
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },

  accountCardTitle: {
    fontSize: "sm",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    lineHeight: 1.1,
    textWrap: "balance",
  },

  accountDescription: {
    fontSize: "xs",
    lineHeight: 1.5,
    color: "mutedFg",
  },
} satisfies Record<string, SystemStyleObject>;
