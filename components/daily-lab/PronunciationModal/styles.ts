import type { SystemStyleObject } from "@chakra-ui/react";

export const s = {
  referenceBox: {
    border: "2px solid black",
    bg: "card",
    p: 4,
    mb: 4,
  },

  referenceLabel: {
    fontSize: "xs",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "wider",
    color: "mutedFg",
    mb: 2,
  },

  referenceText: {
    fontSize: "md",
    fontWeight: "600",
    lineHeight: "1.6",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    py: 4,
  },

  recordingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    justifyContent: "center",
    py: 2,
  },

  recordingDot: {
    w: 3,
    h: 3,
    borderRadius: "full",
    bg: "red.500",
    // 1s is intentional: faster pulse gives clear real-time recording feedback
    animation: "pulse 1s ease-in-out infinite",
  },

  recordingText: {
    fontSize: "sm",
    fontWeight: "600",
    color: "red.600",
  },

  audioPlayerWrapper: {
    w: "100%",
    mb: 3,
  },

  loadingBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    py: 6,
  },

  loadingText: {
    fontSize: "sm",
    fontWeight: "600",
    color: "mutedFg",
  },

  unsupportedBox: {
    border: "2px solid black",
    bg: "surface.coral",
    p: 4,
    textAlign: "center" as const,
  },

  unsupportedText: {
    fontSize: "sm",
    fontWeight: "600",
  },
} satisfies Record<string, SystemStyleObject>;
