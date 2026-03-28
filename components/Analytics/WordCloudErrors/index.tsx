"use client";

import { Box, Skeleton, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useWordCloud } from "@/lib/hooks/useWordCloud";
import { toChakraColor } from "@/lib/habit-utils";
import { s } from "./styles";

interface WordCloudErrorsProps {
  habitId: string;
  /** Chakra color token already transformed by toChakraColor (e.g. "surface.mint") */
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
  const { data: items = [], isLoading } = useWordCloud(habitId);

  if (isLoading) return <Skeleton data-testid="word-cloud-skeleton" h={10} w="100%" />;
  if (items.length === 0) return null;

  const frequencies = items.map((i) => i.frequency);
  const minF = Math.min(...frequencies);
  const maxF = Math.max(...frequencies);
  const color = toChakraColor(habitColor);

  return (
    <Box {...s.wrapper}>
      <Text {...s.title}>{t("wordCloud.title")}</Text>
      <Box {...s.cloud}>
        {items.map((item, i) => {
          const fs = calcFontSize(item.frequency, minF, maxF);
          return (
            <Text
              key={`${item.word}-${i}`}
              fontWeight="800"
              color={color}
              fontSize={fs}
              data-fontsize={fs}
              aria-label={t("wordCloud.itemLabel", { word: item.word, count: item.frequency })}
            >
              {item.word}
            </Text>
          );
        })}
      </Box>
    </Box>
  );
}
