"use client";

import { Box, Button, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { LuRotateCcw } from "react-icons/lu";
import type { AnalyzePronunciationResult } from "@/types/pronunciation";
import { s } from "./styles";

interface PronunciationResultProps {
  result: AnalyzePronunciationResult;
  originalText: string;
  onRetry: () => void;
}

function scoreCardBg(score: number): string {
  const pct = score * 100;
  if (pct >= 80) return "surface.yellow";
  if (pct < 60) return "surface.coral";
  return "card";
}

function tokenizeWords(text: string): string[] {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.replace(/[^\p{L}\p{N}]+$/u, "").replace(/^[^\p{L}\p{N}]+/u, ""));
}

export function PronunciationResult({ result, originalText, onRetry }: PronunciationResultProps) {
  const t = useTranslations("pronunciation");
  const pct = Math.round(result.score * 100);

  const correctSet = new Set(result.correctWords.map((w) => w.toLowerCase()));
  const missedSet = new Set(result.missedWords.map((w) => w.toLowerCase()));
  const tokens = tokenizeWords(originalText);

  return (
    <Box {...s.wrapper}>
      <Box {...s.scoreCard} bg={scoreCardBg(result.score)}>
        <Text {...s.scoreNumber}>{pct}%</Text>
        <Box {...s.scoreMeta}>
          <Text {...s.scoreLabel}>{t("result.score")}</Text>
          <Box {...s.statsRow}>
            <Text {...s.statCorrect}>
              ✓ {result.correctWords.length} {t("result.correct")}
            </Text>
            <Text {...s.statMissed}>
              ✗ {result.missedWords.length} {t("result.missed")}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box>
        <Box {...s.wordList}>
          {tokens.map((word, i) => {
            const lower = word.toLowerCase();
            if (correctSet.has(lower)) {
              return (
                <Text key={i} {...s.wordCorrect}>
                  {word}
                </Text>
              );
            }
            if (missedSet.has(lower)) {
              return (
                <Text key={i} {...s.wordMissed}>
                  {word}
                </Text>
              );
            }
            return (
              <Text key={i} {...s.wordExtra}>
                {word}
              </Text>
            );
          })}
        </Box>
      </Box>

      {result.extraWords.length > 0 && (
        <Box>
          <Text {...s.sectionTitle}>{t("result.extra")}</Text>
          <Box {...s.wordList}>
            {result.extraWords.map((word, i) => (
              <Text key={i} {...s.wordExtra}>
                {word}
              </Text>
            ))}
          </Box>
        </Box>
      )}

      {result.transcription && (
        <Box {...s.transcriptionBox}>
          <Text {...s.sectionTitle}>{t("result.transcription")}</Text>
          <Text {...s.transcriptionText}>{result.transcription}</Text>
        </Box>
      )}

      <Button variant="outline" size="sm" onClick={onRetry} {...s.retryButton}>
        <LuRotateCcw />
        {t("retry")}
      </Button>
    </Box>
  );
}
