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

const MIN_REM = 0.8;
const MAX_REM = 2;

function calcFontSize(frequency: number, min: number, max: number): string {
  if (min === max) return `${MAX_REM}rem`;
  const scale = MIN_REM + ((frequency - min) / (max - min)) * (MAX_REM - MIN_REM);
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
            <Text
              key={item.word}
              fontWeight="800"
              color={color}
              fontSize={fs}
              data-fontsize={fs}
              aria-label={`${item.word}: ${item.frequency}`}
            >
              {item.word}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
