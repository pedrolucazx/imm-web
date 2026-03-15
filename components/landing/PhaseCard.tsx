import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { s } from "@/app/[locale]/(landing)/landing.styles";

export interface PhaseCardProps {
  num: number;
  label: string;
  title: string;
  desc: string;
  bg: string;
}

export function PhaseCard({ num, label, title, desc, bg }: PhaseCardProps) {
  return (
    <Box bg={bg} {...s.phaseCard}>
      <Text as="span" {...s.phaseNumber}>
        {num}
      </Text>
      <Text {...s.phaseLabel}>{label}</Text>
      <Text as="h4" {...s.phaseTitle}>
        {title}
      </Text>
      <Text {...s.phaseDesc}>{desc}</Text>
    </Box>
  );
}
