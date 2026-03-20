"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { AnalyticsGlobalStats } from "../types";
import { s } from "./styles";

interface GlobalStatsRowProps {
  global: AnalyticsGlobalStats;
}

export function GlobalStatsRow({ global }: GlobalStatsRowProps) {
  const t = useTranslations("analytics");

  const stats: { value: string; label: string }[] = [
    {
      value: `${Math.round(global.avgConsistencyRate * 100)}%`,
      label: t("global.completionRate"),
    },
    {
      value: global.totalWords.toLocaleString(),
      label: t("global.totalWords"),
    },
    {
      value: global.avgMood != null ? String(Math.round(global.avgMood * 10) / 10) : "—",
      label: t("global.avgMood"),
    },
    {
      value: String(global.totalJournalEntries),
      label: t("global.journalEntries"),
    },
  ];

  if (global.moodConsistencyCorrelation) {
    const high = Math.round(global.moodConsistencyCorrelation.highMoodRate * 100);
    const low = Math.round(global.moodConsistencyCorrelation.lowMoodRate * 100);
    stats.push({
      value: `${high}% / ${low}%`,
      label: t("global.moodConsistency"),
    });
  }

  if (global.bestPerformanceHour) {
    stats.push({
      value: global.bestPerformanceHour,
      label: t("global.bestHour"),
    });
  }

  return (
    <>
      {stats.map((stat) => (
        <Box key={stat.label} {...s.card}>
          <Text {...s.value}>{stat.value}</Text>
          <Text {...s.label}>{stat.label}</Text>
        </Box>
      ))}
    </>
  );
}
