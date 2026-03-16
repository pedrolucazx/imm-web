"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { BehavioralCoachFeedback } from "@/types/journal";
import { ScoreBadge } from "./ScoreBadge";
import { s } from "./styles";

interface BehavioralCoachPanelProps {
  feedback: BehavioralCoachFeedback;
}

const MOOD_EMOJIS: Record<BehavioralCoachFeedback["behavioral"]["moodDetected"], string> = {
  motivated: "💪",
  fatigued: "😴",
  neutral: "😐",
  stressed: "😤",
  relaxed: "😌",
  anxious: "😰",
};

export function BehavioralCoachPanel({ feedback }: BehavioralCoachPanelProps) {
  const t = useTranslations("dailyLab.ai.behavioralCoach");
  const tAi = useTranslations("dailyLab.ai");

  return (
    <>
      <Box {...s.panelHeader}>
        <Text {...s.panelTitle}>🎯 {t("title")}</Text>
        <Box {...s.skillBadge}>{feedback.targetSkill}</Box>
      </Box>

      <Box {...s.scoreGrid}>
        <Box {...s.statCard}>
          <Text {...s.moodEmoji}>{MOOD_EMOJIS[feedback.behavioral.moodDetected]}</Text>
          <Text {...s.statLabel}>{t(`mood.${feedback.behavioral.moodDetected}`)}</Text>
        </Box>
        <Box {...s.statCard}>
          <Text {...s.statValue}>{t(`energy.${feedback.behavioral.energyLevel}`)}</Text>
          <Text {...s.statLabel}>{t("energyLevel")}</Text>
        </Box>
        <ScoreBadge label={t("alignmentScore")} value={feedback.habitAlignmentScore} />
      </Box>

      <Text {...s.subTitle}>{t("insights")}</Text>
      {feedback.insights.map((insight, i) => (
        <Box key={i} {...s.insightCard}>
          <Text {...s.insightText}>{insight}</Text>
        </Box>
      ))}

      <Box {...s.actionBox}>
        <Text {...s.boxTitle}>⚡ {t("actionSuggestion")}</Text>
        <Text {...s.actionText}>{feedback.actionSuggestion}</Text>
      </Box>

      <Text {...s.poweredBy}>{tAi("poweredBy")}</Text>
    </>
  );
}
