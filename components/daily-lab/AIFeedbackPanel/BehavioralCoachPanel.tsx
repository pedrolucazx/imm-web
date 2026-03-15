"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { BehavioralCoachFeedback } from "@/types/journal";
import { s } from "./styles";

interface BehavioralCoachPanelProps {
  feedback: BehavioralCoachFeedback;
}

export function BehavioralCoachPanel({ feedback }: BehavioralCoachPanelProps) {
  const t = useTranslations("dailyLab.ai.behavioralCoach");

  const moodLabel = t(`mood.${feedback.behavioral.moodDetected}`);
  const energyLabel = t(`energy.${feedback.behavioral.energyLevel}`);

  return (
    <>
      <Text {...s.agentBadge}>🧠 {t("title")}</Text>

      <Box {...s.statGrid}>
        <Box {...s.statCard}>
          <Text {...s.statLabel}>{t("moodDetected")}</Text>
          <Text {...s.statValue}>{moodLabel}</Text>
        </Box>
        <Box {...s.statCard}>
          <Text {...s.statLabel}>{t("energyLevel")}</Text>
          <Text {...s.statValue}>{energyLabel}</Text>
        </Box>
      </Box>

      <Box {...s.scoreRow}>
        <Box {...s.scoreLabel}>
          <Text as="span">{t("alignmentScore")}</Text>
          <Text as="span" {...s.scoreValue}>
            {feedback.habitAlignmentScore}/100
          </Text>
        </Box>
        <Box {...s.progressTrack}>
          <Box {...s.progressFill} w={`${feedback.habitAlignmentScore}%`} />
        </Box>
      </Box>

      <Box {...s.divider} />
      <Text {...s.subTitle}>{t("insights")}</Text>
      {feedback.insights.map((insight, i) => (
        <Box key={i} {...s.insightItem}>
          <Text {...s.insightBullet}>→</Text>
          <Text {...s.insightText}>{insight}</Text>
        </Box>
      ))}

      <Box {...s.divider} />
      <Text {...s.subTitle}>{t("actionSuggestion")}</Text>
      <Box {...s.actionBox}>
        <Text {...s.actionLabel}>🎯 {t("actionSuggestion")}</Text>
        <Text {...s.actionText}>{feedback.actionSuggestion}</Text>
      </Box>
    </>
  );
}
