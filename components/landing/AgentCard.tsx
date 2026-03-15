import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { s } from "@/app/[locale]/(landing)/landing.styles";

export interface AgentCardProps {
  icon: string;
  title: string;
  desc: string;
  badge: string;
  bg: string;
}

export function AgentCard({ icon, title, desc, badge, bg }: AgentCardProps) {
  return (
    <Box bg={bg} {...s.agentCard}>
      <Text {...s.agentIcon}>{icon}</Text>
      <Text as="h4" {...s.agentTitle}>
        {title}
      </Text>
      <Text {...s.agentDesc}>{desc}</Text>
      <Box as="span" {...s.agentBadge}>
        {badge}
      </Box>
    </Box>
  );
}
