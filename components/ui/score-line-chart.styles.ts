import type { SystemStyleObject } from "@chakra-ui/react";
import type { CSSProperties } from "react";

export const s = {
  wrapper: {
    w: "100%",
    overflowX: { base: "auto", md: "visible" },
    flex: 1,
    minH: 0,
  },
  chartFrame: {
    w: "100%",
    minW: { base: "28rem", sm: "32rem", md: "0" },
    maxW: { base: "100%", xl: "61.25rem" },
    mx: "auto",
    h: { base: "11.625rem", md: "14.625rem" },
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
  grammar: "var(--chakra-colors-brand-coral)",
  vocabulary: "var(--chakra-colors-brand-yellow)",
  fluency: "var(--chakra-colors-brand-mint)",
};
