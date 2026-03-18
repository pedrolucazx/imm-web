"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { JournalEntry } from "@/types/journal";
import { LanguageTeacherPanel } from "./LanguageTeacherPanel";
import { BehavioralCoachPanel } from "./BehavioralCoachPanel";
import { s } from "./styles";
import { AI_DAILY_LIMIT } from "@/lib/constants";

interface AIFeedbackPanelProps {
  entry: JournalEntry | null;
  isAnalyzing: boolean;
  aiRequestsToday: number;
  habitColor?: string;
}

export function AIFeedbackPanel({
  entry,
  isAnalyzing,
  aiRequestsToday,
  habitColor,
}: AIFeedbackPanelProps) {
  const t = useTranslations("dailyLab.ai");

  return (
    <Box {...s.wrapper}>
      <Box {...s.counterRow}>
        <Text {...s.usageCounter}>
          ⚡ {t("usageCounter", { used: aiRequestsToday, limit: AI_DAILY_LIMIT })}
        </Text>
      </Box>

      <Box aria-live="polite" aria-atomic="true">
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

        {!isAnalyzing && entry && !entry.aiFeedback?.agentType && (
          <Box {...s.placeholder}>
            <Text {...s.placeholderText}>{t("noFeedbackYet")}</Text>
          </Box>
        )}

        {!isAnalyzing && entry && entry.aiFeedback?.agentType && (
          <Box {...s.panel} bg={habitColor ?? s.panel.bg}>
            {entry.aiFeedback.agentType === "language-teacher" && (
              <LanguageTeacherPanel feedback={entry.aiFeedback} />
            )}
            {entry.aiFeedback.agentType === "behavioral-coach" && (
              <BehavioralCoachPanel feedback={entry.aiFeedback} />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
