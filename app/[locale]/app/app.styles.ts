import { SystemStyleObject } from "@chakra-ui/react";
import type { CSSProperties } from "react";

export const s = {
  pageWrapper: {
    minH: "100vh",
    bg: "canvas",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    px: 6,
    py: 12,
    flexDirection: "column",
  },

  card: {
    layerStyle: "cardBrutal",
    bg: "card",
    p: { base: 8, md: 12 },
    maxW: "560px",
    w: "100%",
    textAlign: "center",
  },

  gearsRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    mb: 8,
  },

  gearBase: {
    lineHeight: 1,
    display: "block",
    userSelect: "none",
  },

  badge: {
    display: "inline-block",
    bg: "primary",
    color: "black",
    fontWeight: "800",
    fontSize: "xs",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    px: 3,
    py: 1,
    border: "2px solid black",
    boxShadow: "brutal-sm",
    mb: 6,
  },

  title: {
    fontSize: { base: "2xl", md: "3xl" },
    fontWeight: "800",
    lineHeight: 1.1,
    mb: 4,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
  },

  subtitle: {
    fontSize: "md",
    fontWeight: "500",
    color: "mutedFg",
    mb: 8,
    lineHeight: 1.6,
  },

  divider: {
    h: "3px",
    bg: "black",
    w: "100%",
    mb: 8,
  },

  statusRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    mb: 8,
  },

  statusDot: {
    w: 3,
    h: 3,
    borderRadius: "full",
    bg: "secondary",
    border: "2px solid black",
    flexShrink: 0,
  },

  statusText: {
    fontSize: "sm",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },

  backLink: {
    display: "inline-block",
    border: "3px solid black",
    bg: "card",
    boxShadow: "brutal",
    px: 6,
    py: 3,
    fontWeight: "800",
    fontSize: "sm",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    textDecoration: "none",
    color: "black",
    cursor: "pointer",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
    _hover: {
      transform: "translate(-2px, -2px)",
      boxShadow: "brutal-lg",
    },
    _active: {
      transform: "translate(2px, 2px)",
      boxShadow: "brutal-sm",
    },
  },
} satisfies Record<string, SystemStyleObject>;

export const gearAnimations = {
  large: {
    fontSize: "6rem",
    animation: "spin 6s linear infinite",
  } satisfies CSSProperties,

  small: {
    fontSize: "3.5rem",
    marginTop: "1.5rem",
    animation: "spin 4s linear infinite reverse",
  } satisfies CSSProperties,

  medium: {
    fontSize: "4.5rem",
    animation: "spin 5s linear infinite",
  } satisfies CSSProperties,

  pulse: {
    animation: "pulse 2s ease-in-out infinite",
  } satisfies CSSProperties,
};
