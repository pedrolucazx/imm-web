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

  return (
    <Box {...s.wrapper}>
      <Text {...s.title}>{t("journal.title")}</Text>
      <Box {...s.row}>
        <Box {...s.card}>
          <Text {...s.value}>{global.totalJournalEntries}</Text>
          <Text {...s.label}>{t("journal.totalEntries")}</Text>
        </Box>
        <Box {...s.card}>
          <Text {...s.value}>{global.totalWords.toLocaleString()}</Text>
          <Text {...s.label}>{t("journal.totalWords")}</Text>
        </Box>
        <Box {...s.card}>
          <Text {...s.value}>{global.avgWordsPerEntry}</Text>
          <Text {...s.label}>{t("journal.avgWords")}</Text>
        </Box>
      </Box>
    </Box>
  );
}
