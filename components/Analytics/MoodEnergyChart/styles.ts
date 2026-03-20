import type { SystemStyleObject } from "@chakra-ui/react";
import type { CSSProperties } from "react";

export const s = {
  wrapper: {
    mb: 8,
    w: "100%",
    border: "0.1875rem solid black",
    boxShadow: "brutal",
    bg: "card",
    p: { base: 3, md: 6 },
    overflowX: "auto",
  },
  header: {
    borderBottom: "0.125rem solid black",
    pb: 4,
  },
  title: {
    fontSize: "xl",
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: "wider",
  },
  body: {
    pt: 4,
    overflowX: { base: "auto", md: "visible" },
  },
  chartFrame: {
    w: "100%",
    maxW: { base: "100%", xl: "61.25rem" },
    mx: "auto",
    h: { base: "16rem", sm: "18rem", md: "23.75rem" },
    minW: { base: "26rem", sm: "32rem", md: "0" },
  },
} satisfies Record<string, SystemStyleObject>;

export const legendWrapperStyle: CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  right: 24,
  top: 4,
};

export const tooltipContentStyle: CSSProperties = {
  border: "0.125rem solid black",
  boxShadow: "0.1875rem 0.1875rem 0 black",
  borderRadius: 0,
  fontWeight: 700,
  fontSize: 12,
};

export const chartColors = {
  mood: "var(--chakra-colors-brand-coral)",
  energy: "var(--chakra-colors-habit-reading)",
};
