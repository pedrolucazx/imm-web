"use client";

import { Box, Text } from "@chakra-ui/react";
import { s } from "./styles";

interface ScoreBadgeProps {
  label: string;
  value: number;
}

export function ScoreBadge({ label, value }: ScoreBadgeProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <Box {...s.scoreBadgeContainer}>
      <Text {...s.scoreBadgeValue}>{clamped}</Text>
      <Text {...s.scoreBadgeLabel}>{label}</Text>
      <Box {...s.progressBar}>
        <Box {...s.progressFill} w={`${clamped}%`} />
      </Box>
    </Box>
  );
}
