"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { JournalEntry } from "@/types/journal";
import { LanguageTeacherPanel } from "./LanguageTeacherPanel";
import { BehavioralCoachPanel } from "./BehavioralCoachPanel";
import { s } from "./styles";

const AI_DAILY_LIMIT = 10;

interface AIFeedbackPanelProps {
  entry: JournalEntry | null;
  isAnalyzing: boolean;
  aiRequestsToday: number;
}

export function AIFeedbackPanel({ entry, isAnalyzing, aiRequestsToday }: AIFeedbackPanelProps) {
  const t = useTranslations("dailyLab.ai");

  return (
    <Box {...s.wrapper}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
        <Text {...s.sectionTitle} mb={0}>
          {t("sectionTitle")}
        </Text>
        <Text {...s.usageCounter}>
          ⚡ {t("usageCounter", { used: aiRequestsToday, limit: AI_DAILY_LIMIT })}
        </Text>
      </Box>

      {isAnalyzing && (
        <Box {...s.loadingBox}>
          <Text {...s.loadingText}>⏳ {t("loading")}</Text>
        </Box>
      )}

      {!isAnalyzing && !entry && (
        <Box {...s.placeholder}>
          <Text {...s.placeholderText}>{t("placeholder")}</Text>
        </Box>
      )}

      {!isAnalyzing && entry && !entry.aiFeedback && (
        <Box {...s.placeholder}>
          <Text {...s.placeholderText}>{t("noFeedbackYet")}</Text>
        </Box>
      )}

      {!isAnalyzing && entry?.aiFeedback && (
        <Box {...s.panel}>
          {entry.aiFeedback.agentType === "language-teacher" ? (
            <LanguageTeacherPanel feedback={entry.aiFeedback} />
          ) : (
            <BehavioralCoachPanel feedback={entry.aiFeedback} />
          )}
        </Box>
      )}
    </Box>
  );
}
