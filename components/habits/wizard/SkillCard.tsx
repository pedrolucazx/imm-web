"use client";

import { Box, HStack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { Tooltip } from "@/components/ui/tooltip";
import type { TargetSkill } from "@/types/habits";
import { SKILL_METADATA } from "@/types/habits";

interface SkillCardProps {
  skill: TargetSkill;
  isSelected: boolean;
  onClick: () => void;
}

export function SkillCard({ skill, isSelected, onClick }: SkillCardProps) {
  const t = useTranslations();
  const metadata = SKILL_METADATA[skill];

  const skillName = t(metadata.label);
  const shortDesc = t(metadata.shortDescription);
  const longDesc = metadata.longDescription ? t(metadata.longDescription) : null;

  const isBehavioral = metadata.category === "behavioral";

  const tooltipContent =
    isBehavioral && longDesc ? (
      <Box maxW="260px" p={1}>
        <Text fontWeight="bold" fontSize="xs" textTransform="uppercase" mb={1}>
          {shortDesc}
        </Text>
        <Text fontSize="xs" lineHeight="1.5">
          {longDesc}
        </Text>
      </Box>
    ) : null;

  return (
    <Box
      as="button"
      w="full"
      h="auto"
      p={3}
      border="2px solid black"
      bg={isSelected ? "yellow.300" : "white"}
      cursor="pointer"
      transition="all 0.15s"
      onClick={onClick}
      _hover={{ boxShadow: "4px 4px 0 black" }}
      _active={{ transform: "translate(2px, 2px)", boxShadow: "none" }}
    >
      <HStack justify="space-between" align="center" gap={2} w="full">
        <HStack gap={3} flex="1">
          <Text fontSize="2xl" lineHeight="1">
            {metadata.icon}
          </Text>
          <Text fontWeight="bold" fontSize="sm" textTransform="uppercase" textAlign="left">
            {skillName}
          </Text>
        </HStack>
        {tooltipContent && (
          <Tooltip
            content={tooltipContent}
            positioning={{ placement: "top" }}
            showArrow={false}
            contentProps={{
              bg: "white",
              border: "2px solid black",
              borderRadius: "0",
              boxShadow: "4px 4px 0 black",
              color: "black",
              p: 3,
            }}
          >
            <Box
              as="span"
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              w="18px"
              h="18px"
              border="2px solid black"
              fontSize="10px"
              fontWeight="black"
              flexShrink={0}
              cursor="help"
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              ?
            </Box>
          </Tooltip>
        )}
      </HStack>
    </Box>
  );
}
