"use client";

import { useState, useEffect } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import type { Habit } from "@/types/habits";
import type { JournalEntry } from "@/types/journal";
import { useSaveJournal } from "@/lib/hooks/useJournal";
import { getJournalPrompt } from "@/lib/habit-utils";
import { s } from "./styles";
import { DEFAULT_MOOD_SCORE, DEFAULT_ENERGY_SCORE } from "@/lib/constants";

const MOOD_EMOJIS = ["😞", "😕", "😐", "😊", "😄"] as const;
const ENERGY_EMOJIS = ["🐌", "🚶", "🏃", "💨", "🚀"] as const;

const journalSchema = z.object({
  content: z.string().min(1),
});

interface JournalEditorProps {
  habit: Habit;
  existingEntry: JournalEntry | null | undefined;
  isLoadingEntry: boolean;
  isAnalyzing?: boolean;
  today: string;
  onAnalyze: (_journalEntryId: string, _habitId: string) => void;
}

export function JournalEditor({
  habit,
  existingEntry,
  isLoadingEntry,
  isAnalyzing = false,
  today,
  onAnalyze,
}: JournalEditorProps) {
  const t = useTranslations("dailyLab");
  const { mutate: saveJournal, isPending: isSaving } = useSaveJournal();

  const [content, setContent] = useState("");
  const [moodScore, setMoodScore] = useState<number>(DEFAULT_MOOD_SCORE);
  const [energyScore, setEnergyScore] = useState<number>(DEFAULT_ENERGY_SCORE);

  useEffect(() => {
    setContent("");
    setMoodScore(DEFAULT_MOOD_SCORE);
    setEnergyScore(DEFAULT_ENERGY_SCORE);
  }, [habit.id]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const parseResult = journalSchema.safeParse({ content });
  const isContentValid = parseResult.success;

  const handleSave = () => {
    if (!parseResult.success || isSaving) return;

    saveJournal(
      { habitId: habit.id, content, entryDate: today, moodScore, energyScore },
      {
        onSuccess: (entry) => {
          setContent("");
          onAnalyze(entry.id, habit.id);
        },
      }
    );
  };

  if (isLoadingEntry) {
    return (
      <Box py={8} textAlign="center">
        <Text {...s.loadingText}>{t("journal.loading")}</Text>
      </Box>
    );
  }

  if (existingEntry) {
    const needsAnalysis = !existingEntry.aiFeedback?.agentType;
    return (
      <Box>
        <Box {...s.existingEntry}>
          <Text {...s.existingEntryLabel}>{t("journal.yourEntry")}</Text>
          <Text {...s.existingEntryContent}>{existingEntry.content}</Text>
          <Text {...s.existingEntryMeta}>
            {existingEntry.wordCount ?? 0} {t("journal.words")} · {t("journal.mood")}{" "}
            {existingEntry.moodScore ?? "—"}/5 · {t("journal.energy")}{" "}
            {existingEntry.energyScore ?? "—"}/5
          </Text>
        </Box>
        {needsAnalysis && (
          <chakra.button
            type="button"
            onClick={() => onAnalyze(existingEntry.id, habit.id)}
            disabled={isAnalyzing}
            {...s.saveBtn}
            {...(isAnalyzing ? s.saveBtnDisabled : s.saveBtnEnabled)}
          >
            {isAnalyzing ? t("journal.analyzing") : t("journal.analyze")}
          </chakra.button>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          getJournalPrompt(habit) ??
          (habit.habit_mode === "skill-building"
            ? t("journal.placeholderSkill")
            : t("journal.placeholderTracking"))
        }
        disabled={isSaving}
        {...s.textarea}
      />

      <Text {...s.wordCount}>
        {wordCount} {t("journal.words")}
      </Text>

      <Box {...s.scoresGrid}>
        <Box {...s.scoreCard}>
          <Text as="span" {...s.scoreLabel}>
            {t("journal.moodLabel")}
          </Text>
          <Box {...s.scoreRow}>
            {MOOD_EMOJIS.map((emoji, i) => {
              const val = i + 1;
              const active = moodScore === val;
              return (
                <chakra.button
                  key={val}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setMoodScore(val)}
                  {...s.scoreBtn}
                  {...(active ? s.scoreBtnActive : s.scoreBtnInactive)}
                >
                  {emoji}
                </chakra.button>
              );
            })}
          </Box>
        </Box>

        <Box {...s.scoreCard}>
          <Text as="span" {...s.scoreLabel}>
            {t("journal.energyLabel")}
          </Text>
          <Box {...s.scoreRow}>
            {ENERGY_EMOJIS.map((emoji, i) => {
              const val = i + 1;
              const active = energyScore === val;
              return (
                <chakra.button
                  key={val}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setEnergyScore(val)}
                  {...s.scoreBtn}
                  {...(active ? s.scoreBtnActive : s.scoreBtnInactive)}
                >
                  {emoji}
                </chakra.button>
              );
            })}
          </Box>
        </Box>
      </Box>

      <chakra.button
        type="button"
        onClick={handleSave}
        disabled={!isContentValid || isSaving}
        {...s.saveBtn}
        {...(!isContentValid || isSaving ? s.saveBtnDisabled : s.saveBtnEnabled)}
      >
        {isSaving ? t("journal.saving") : t("journal.save")}
      </chakra.button>
    </Box>
  );
}
