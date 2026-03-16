"use client";

import { Box, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { LanguageTeacherFeedback } from "@/types/journal";
import { s } from "./styles";

interface LanguageTeacherPanelProps {
  feedback: LanguageTeacherFeedback;
}

interface ScoreBarProps {
  label: string;
  value: number;
}

function ScoreBar({ label, value }: ScoreBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <Box {...s.scoreRow}>
      <Box {...s.scoreLabel}>
        <Text as="span">{label}</Text>
        <Text as="span" {...s.scoreValue}>
          {clamped}/100
        </Text>
      </Box>
      <Box {...s.progressTrack}>
        <Box {...s.progressFill} w={`${clamped}%`} />
      </Box>
    </Box>
  );
}

/**
 * Painel de feedback do professor de idiomas.
 * Exibe pontuações de gramática, vocabulário e fluência, erros encontrados,
 * frase modelo e próximo desafio.
 */
export function LanguageTeacherPanel({ feedback }: LanguageTeacherPanelProps) {
  const t = useTranslations("dailyLab.ai.languageTeacher");

  return (
    <>
      <Text {...s.agentBadge}>📝 {t("title")}</Text>

      <Text {...s.subTitle}>{t("linguistic")}</Text>
      <ScoreBar label={t("grammar")} value={feedback.linguistic.grammarScore} />
      <ScoreBar label={t("vocabulary")} value={feedback.linguistic.vocabularyScore} />
      <ScoreBar label={t("fluency")} value={feedback.linguistic.fluencyScore} />

      {feedback.errors.length > 0 && (
        <>
          <Box {...s.divider} />
          <Text {...s.subTitle}>{t("errors")}</Text>
          {feedback.errors.map((err, i) => (
            <Box key={i} {...s.errorItem}>
              <Text {...s.errorOriginal}>{err.original}</Text>
              <Text {...s.errorCorrected}>→ {err.corrected}</Text>
              <Text {...s.errorExplanation}>{err.explanation}</Text>
            </Box>
          ))}
        </>
      )}

      <Box {...s.divider} />
      <Text {...s.subTitle}>{t("modelSentence")}</Text>
      <Box {...s.highlightBox}>
        <Text {...s.highlightText}>&ldquo;{feedback.modelSentence}&rdquo;</Text>
      </Box>

      <Text {...s.subTitle}>{t("nextChallenge")}</Text>
      <Box {...s.actionBox}>
        <Text {...s.actionText}>{feedback.nextChallenge}</Text>
      </Box>
    </>
  );
}
