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

  const effectiveRate =
    global.avgConsistencyRate != null ? global.avgConsistencyRate : global.completionRateToday;

  const stats: { value: string; label: string; bg: string }[] = [
    {
      value: `${Math.round(effectiveRate * 100)}%`,
      label: t("global.completionRate"),
      bg: "hsl(152, 80%, 70%)",
    },
    {
      value: global.totalWords.toLocaleString(),
      label: t("global.totalWords"),
      bg: "hsl(54, 100%, 70%)",
    },
    {
      value: global.avgMood != null ? String(Math.round(global.avgMood * 10) / 10) : "—",
      label: t("global.avgMood"),
      bg: "hsl(0, 100%, 80%)",
    },
    {
      value: String(global.totalJournalEntries),
      label: t("global.journalEntries"),
      bg: "hsl(280, 80%, 80%)",
    },
  ];

  if (global.moodConsistencyCorrelation) {
    const high = Math.round(global.moodConsistencyCorrelation.highMoodRate * 100);
    const low = Math.round(global.moodConsistencyCorrelation.lowMoodRate * 100);
    stats.push({
      value: `${high}% / ${low}%`,
      label: t("global.moodConsistency"),
      bg: "hsl(54, 100%, 70%)",
    });
  }

  if (global.bestPerformanceHour) {
    stats.push({
      value: global.bestPerformanceHour,
      label: t("global.bestHour"),
      bg: "hsl(195, 70%, 72%)",
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
