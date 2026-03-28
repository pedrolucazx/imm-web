"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useWordCloud } from "@/lib/hooks/useWordCloud";
import { toChakraColor } from "@/lib/habit-utils";
import { s } from "./styles";

interface WordCloudErrorsProps {
  habitId: string;
  habitColor: string;
}

function calcFontSize(frequency: number, min: number, max: number): string {
  const range = max - min || 1;
  const scale = 0.875 + ((frequency - min) / range) * 1.125;
  return `${scale.toFixed(3)}rem`;
}

export function WordCloudErrors({ habitId, habitColor }: WordCloudErrorsProps) {
  const t = useTranslations("pronunciation");
  const { data: items = [] } = useWordCloud(habitId);

  if (items.length === 0) return null;

  const frequencies = items.map((i) => i.frequency);
  const minF = Math.min(...frequencies);
  const maxF = Math.max(...frequencies);
  const color = toChakraColor(habitColor);

  return (
    <Box {...s.wrapper}>
      <Text {...s.title}>{t("wordCloud.title")}</Text>
      <Box {...s.cloud}>
        {items.map((item) => {
          const fs = calcFontSize(item.frequency, minF, maxF);
          return (
            <Text key={item.word} fontWeight="800" color={color} fontSize={fs} data-fontsize={fs}>
              {item.word}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
