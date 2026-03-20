"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { AnalyticsGlobalStats } from "@/types/analytics";
import { s } from "./styles";

interface GlobalStatsRowProps {
  global: AnalyticsGlobalStats;
}

export function GlobalStatsRow({ global }: GlobalStatsRowProps) {
  const t = useTranslations("analytics");

  const stats: { value: string; label: string; bg: string }[] = [
    {
      value: `${Math.round(global.avgConsistencyRate * 100)}%`,
      label: t("global.completionRate"),
      bg: "surface.mint",
    },
    {
      value: global.totalWords.toLocaleString(),
      label: t("global.totalWords"),
      bg: "surface.yellow",
    },
    {
      value: global.avgMood != null ? String(Math.round(global.avgMood * 10) / 10) : "—",
      label: t("global.avgMood"),
      bg: "surface.coral",
    },
    {
      value: String(global.totalJournalEntries),
      label: t("global.journalEntries"),
      bg: "surface.lavender",
    },
  ];

  if (global.moodConsistencyCorrelation) {
    const high = Math.round(global.moodConsistencyCorrelation.highMoodRate * 100);
    const low = Math.round(global.moodConsistencyCorrelation.lowMoodRate * 100);
    stats.push({
      value: `${high}% / ${low}%`,
      label: t("global.moodConsistency"),
      bg: "surface.yellow",
    });
  }

  if (global.bestPerformanceHour) {
    stats.push({
      value: global.bestPerformanceHour,
      label: t("global.bestHour"),
      bg: "surface.sky",
    });
  }

  return (
    <>
      {stats.map((stat) => (
        <Box key={stat.label} {...s.card} bg={stat.bg}>
          <Text {...s.value}>{stat.value}</Text>
          <Text {...s.label}>{stat.label}</Text>
        </Box>
      ))}
    </>
  );
}
