"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { AnalyticsGlobalStats } from "../types";
import { s } from "./styles";

interface JournalMetricsProps {
  global: AnalyticsGlobalStats;
}

export function JournalMetrics({ global }: JournalMetricsProps) {
  const t = useTranslations("analytics");

  const cards = [
    { value: global.totalJournalEntries, label: t("journal.totalEntries"), bg: "surface.lavender" },
    {
      value: global.totalWords.toLocaleString(),
      label: t("journal.totalWords"),
      bg: "surface.yellow",
    },
    { value: global.avgWordsPerEntry, label: t("journal.avgWords"), bg: "surface.coral" },
  ];

  return (
    <Box {...s.wrapper}>
      <Text {...s.title}>{t("journal.title")}</Text>
      <Box {...s.row}>
        {cards.map((card) => (
          <Box key={card.label} {...s.card} bg={card.bg}>
            <Text {...s.value}>{card.value}</Text>
            <Text {...s.label}>{card.label}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
