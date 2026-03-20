"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ScoreLineChart } from "@/components/ui/score-line-chart";
import type { HabitStat } from "../types";
import { s } from "./styles";

interface ScoreTimelineProps {
  habit: HabitStat | null;
}

export function ScoreTimeline({ habit }: ScoreTimelineProps) {
  const t = useTranslations("analytics");

  if (habit == null || habit.scoreTimeline == null || habit.scoreTimeline.length === 0) {
    return null;
  }

  return (
    <Box {...s.wrapper}>
      <Text {...s.title}>{t("scoreTimeline.title")}</Text>
      <ScoreLineChart
        entries={habit.scoreTimeline}
        currentDay={habit.currentDay}
        labels={{
          grammar: t("scoreTimeline.grammar"),
          vocabulary: t("scoreTimeline.vocabulary"),
          fluency: t("scoreTimeline.fluency"),
          axisDate: t("mood.axisDate"),
          axisScore: t("mood.axisScore"),
        }}
      />
    </Box>
  );
}
