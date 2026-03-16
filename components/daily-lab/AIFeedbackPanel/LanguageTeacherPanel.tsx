"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { LanguageTeacherFeedback } from "@/types/journal";
import { ScoreBadge } from "./ScoreBadge";
import { s } from "./styles";

interface LanguageTeacherPanelProps {
  feedback: LanguageTeacherFeedback;
}

export function LanguageTeacherPanel({ feedback }: LanguageTeacherPanelProps) {
  const t = useTranslations("dailyLab.ai.languageTeacher");

  return (
    <>
      <Box {...s.panelHeader}>
        <Text {...s.panelTitle}>📝 {t("title")}</Text>
        <Box {...s.skillBadge}>{feedback.targetSkill}</Box>
      </Box>

      <Box {...s.scoreGrid}>
        <ScoreBadge label={t("grammar")} value={feedback.linguistic.grammarScore} />
        <ScoreBadge label={t("vocabulary")} value={feedback.linguistic.vocabularyScore} />
        <ScoreBadge label={t("fluency")} value={feedback.linguistic.fluencyScore} />
      </Box>

      {feedback.errors.length > 0 && (
        <>
          <Text {...s.subTitle}>{t("errors")}</Text>
          {feedback.errors.map((err, i) => (
            <Box key={i} {...s.errorItem}>
              <Text {...s.errorOriginal}>{err.original}</Text>
              <Text {...s.errorCorrected}>{err.corrected}</Text>
              <Text {...s.errorExplanation}>{err.explanation}</Text>
            </Box>
          ))}
        </>
      )}

      <Box {...s.highlightBox}>
        <Text {...s.boxTitle}>✨ {t("modelSentence")}</Text>
        <Text {...s.highlightText}>&ldquo;{feedback.modelSentence}&rdquo;</Text>
      </Box>

      <Box {...s.actionBox}>
        <Text {...s.boxTitle}>🎯 {t("nextChallenge")}</Text>
        <Text {...s.actionText}>{feedback.nextChallenge}</Text>
      </Box>

      <Text {...s.poweredBy}>⚡ Powered by Free AI Agent</Text>
    </>
  );
}
