import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { s } from "@/app/[locale]/(landing)/landing.styles";

export interface FeatureCardProps {
  icon: string;
  title: string;
  desc: string;
}

export function FeatureCard({ icon, title, desc }: FeatureCardProps) {
  return (
    <Box {...s.featureCard}>
      <Text {...s.featureIcon}>{icon}</Text>
      <Text as="h4" {...s.featureTitle}>
        {title}
      </Text>
      <Text {...s.featureDesc}>{desc}</Text>
    </Box>
  );
}
