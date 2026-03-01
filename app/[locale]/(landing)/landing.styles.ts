import { SystemStyleObject } from "@chakra-ui/react";

const brutalCard: SystemStyleObject = {
  border: "3px solid black",
  boxShadow: "4px 4px 0px 0px black",
};

const brutalCardSm: SystemStyleObject = {
  border: "2px solid black",
  boxShadow: "2px 2px 0px 0px black",
};

const linkReset: SystemStyleObject = {
  display: "inline-block",
  textDecoration: "none",
  color: "black",
};

const btnBase: SystemStyleObject = {
  ...linkReset,
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "wider",
};

const brutalHover: SystemStyleObject = {
  transition: "transform 0.1s ease, box-shadow 0.1s ease",
  cursor: "pointer",
  _hover: {
    transform: "translate(-2px, -2px)",
    boxShadow: "6px 6px 0px 0px black",
  },
  _active: {
    transform: "translate(2px, 2px)",
    boxShadow: "none",
  },
};

const sectionTitle: SystemStyleObject = {
  fontSize: { base: "1.875rem", md: "2.25rem" },
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const sectionSubtitle: SystemStyleObject = {
  fontSize: { base: "lg", md: "xl" },
  fontWeight: "500",
  color: "mutedFg",
  maxW: "2xl",
};

export const s: Record<string, SystemStyleObject> = {
  // ── Page ──────────────────────────────────────────────────
  pageWrapper: {
    minH: "100vh",
    display: "flex",
    flexDirection: "column",
    bg: "canvas",
  },

  // ── Nav ───────────────────────────────────────────────────
  header: {
    borderBottom: "3px solid black",
    bg: "card",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  navContainer: {
    maxW: "6xl",
    mx: "auto",
    px: 6,
    py: 4,
  },
  navInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: { base: "column", md: "row" },
    gap: { base: 3, md: 0 },
  },
  navBrand: {
    fontSize: "2xl",
    fontWeight: "700",
  },
  navButtons: {
    display: "flex",
    flexDirection: { base: "column", md: "row" },
    gap: 3,
    w: { base: "full", md: "auto" },
  },
  navLoginBtn: {
    ...btnBase,
    ...brutalCardSm,
    ...brutalHover,
    px: 5,
    py: 3,
    bg: "card",
    fontSize: "sm",
    w: { base: "full", md: "auto" },
    textAlign: "center",
  },
  navSignupBtn: {
    ...btnBase,
    ...brutalCardSm,
    ...brutalHover,
    px: 5,
    py: 3,
    bg: "primary",
    fontSize: "sm",
    w: { base: "full", md: "auto" },
    textAlign: "center",
  },

  // ── Hero ──────────────────────────────────────────────────
  heroSection: {
    py: { base: 20, md: 32 },
  },
  container: {
    maxW: "6xl",
    mx: "auto",
    px: 6,
  },
  heroBox: {
    maxW: "3xl",
  },
  heroTitle: {
    fontSize: { base: "3rem", md: "4.5rem" },
    fontWeight: "700",
    lineHeight: "1.1",
    mb: 6,
  },
  heroHighlight: {
    bg: "primary",
    px: 2,
    display: "inline-block",
    mt: 2,
  },
  heroSubtitle: {
    fontSize: { base: "lg", md: "xl" },
    fontWeight: "500",
    color: "mutedFg",
    mb: 10,
    maxW: "xl",
  },
  heroCtaBtn: {
    ...btnBase,
    ...brutalCard,
    ...brutalHover,
    px: 10,
    py: 6,
    bg: "primary",
    fontSize: "xl",
    w: { base: "full", md: "auto" },
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  // ── Section layouts ───────────────────────────────────────
  sectionCard: {
    borderTop: "3px solid black",
    bg: "card",
    py: 20,
  },
  sectionPlain: {
    borderTop: "3px solid black",
    py: 20,
  },
  sectionCentered: {
    borderTop: "3px solid black",
    py: 20,
  },
  centeredContent: {
    maxW: "6xl",
    mx: "auto",
    px: 6,
    textAlign: "center",
  },

  // ── Section typography ────────────────────────────────────
  phasesTitle: { ...sectionTitle, mb: 3 },
  phasesSubtitle: { ...sectionSubtitle, mb: 10 },
  ultralearningTitle: { ...sectionTitle, mb: 3 },
  ultralearningSubtitle: { ...sectionSubtitle, mb: 6 },
  agentsTitle: { ...sectionTitle, mb: 10 },
  featuresTitle: {
    fontSize: "1.875rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    mb: 8,
  },
  opensourceTitle: { ...sectionTitle, mb: 4 },

  // ── Grids ─────────────────────────────────────────────────
  grid3: {
    gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
    gap: 6,
    w: "full",
  },
  gridFeatures: {
    gridTemplateColumns: { base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
    gap: 4,
  },

  // ── Phase cards ───────────────────────────────────────────
  phaseCard: {
    ...brutalCard,
    p: 8,
    position: "relative",
  },
  phaseNumber: {
    fontSize: "6xl",
    fontWeight: "900",
    opacity: 0.2,
    position: "absolute",
    top: 4,
    right: 4,
    lineHeight: 1,
  },
  phaseLabel: {
    fontSize: "sm",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "wider",
    mb: 1,
  },
  phaseTitle: {
    fontSize: "2xl",
    fontWeight: "700",
    mb: 2,
  },
  phaseDesc: {
    fontSize: "md",
    fontWeight: "500",
  },

  // ── Ultralearning ─────────────────────────────────────────
  ultraCard: {
    ...brutalCard,
    bg: "surface.yellow",
    p: 8,
    maxW: "2xl",
  },
  ultraCardHeading: {
    fontSize: "lg",
    fontWeight: "700",
    mb: 4,
  },
  ultraStepList: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    alignItems: "flex-start",
  },
  ultraStepRow: {
    display: "flex",
    gap: 3,
    alignItems: "flex-start",
  },
  ultraStepEmoji: {
    fontSize: "xl",
  },
  ultraStep: {
    fontSize: "md",
    fontWeight: "500",
  },

  // ── Agent cards ───────────────────────────────────────────
  agentCard: {
    ...brutalCard,
    p: 8,
  },
  agentIcon: {
    display: "block",
    fontSize: { base: "4xl", md: "5xl" },
    lineHeight: "1.2",
    mb: 4,
  },
  agentTitle: {
    fontSize: "2xl",
    fontWeight: "700",
    mb: 3,
  },
  agentDesc: {
    fontSize: "md",
    fontWeight: "500",
    mb: 4,
  },
  agentBadge: {
    display: "inline-block",
    px: 3,
    py: 1,
    bg: "card",
    border: "2px solid black",
    fontSize: "xs",
    fontWeight: "900",
    textTransform: "uppercase",
  },

  // ── Feature cards ─────────────────────────────────────────
  featureCard: {
    ...brutalCard,
    bg: "card",
    p: 6,
  },
  featureIcon: {
    fontSize: "3xl",
    display: "block",
    mb: 2,
  },
  featureTitle: {
    fontSize: "lg",
    fontWeight: "700",
    mb: 1,
  },
  featureDesc: {
    fontSize: "sm",
    fontWeight: "500",
    color: "mutedFg",
  },

  // ── Open Source ───────────────────────────────────────────
  opensourceSection: {
    borderTop: "3px solid black",
    bg: "surface.lavender",
    py: 20,
  },
  opensourceSubtitle: {
    fontSize: { base: "lg", md: "xl" },
    fontWeight: "500",
    color: "mutedFg",
    mb: 8,
    maxW: "2xl",
    mx: "auto",
  },
  githubBtn: {
    ...btnBase,
    ...brutalCard,
    ...brutalHover,
    px: 8,
    py: 4,
    bg: "black",
    color: "white",
    fontSize: "lg",
    w: { base: "full", md: "auto" },
    textAlign: "center",
    _hover: {
      transform: "translate(-2px, -2px)",
      boxShadow: "6px 6px 0px 0px black",
      color: "white",
    },
  },

  // ── Final CTA ─────────────────────────────────────────────
  ctaSection: {
    borderTop: "3px solid black",
    bg: "black",
    color: "white",
    py: 16,
  },
  ctaTitle: {
    fontSize: "4xl",
    fontWeight: "700",
    mb: 4,
  },
  ctaSubtitle: {
    fontSize: "lg",
    fontWeight: "500",
    mb: 8,
    opacity: 0.8,
  },
  ctaBtn: {
    ...btnBase,
    ...brutalCard,
    ...brutalHover,
    px: 10,
    py: 5,
    bg: "primary",
    fontSize: "lg",
    w: { base: "full", md: "auto" },
    textAlign: "center",
    whiteSpace: "nowrap",
  },

  // ── Footer ────────────────────────────────────────────────
  footer: {
    bg: "card",
    borderTop: "3px solid black",
    py: 6,
  },
  footerInner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: "sm",
    fontWeight: "700",
    color: "mutedFg",
  },
  footerLink: {
    fontSize: "sm",
    fontWeight: "700",
    color: "mutedFg",
    textDecoration: "none",
    _hover: { color: "black" },
  },
};
