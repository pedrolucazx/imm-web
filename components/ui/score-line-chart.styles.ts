import type { SystemStyleObject } from "@chakra-ui/react";
import type { CSSProperties } from "react";

export const s = {
  wrapper: {
    w: "100%",
    overflowX: "auto",
  },
  chartFrame: {
    w: "100%",
    minW: { base: "43.75rem", md: "53.75rem" },
    maxW: "53.75rem",
    mx: "auto",
    h: "20rem",
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
  grammar: "var(--chakra-colors-surface-sky)",
  vocabulary: "var(--chakra-colors-surface-yellow)",
  fluency: "var(--chakra-colors-surface-mint)",
};
