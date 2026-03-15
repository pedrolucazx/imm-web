"use client";

import { useState, useEffect } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import type { Habit } from "@/types/habits";
import type { JournalEntry } from "@/types/journal";
import { useSaveJournal, useAnalyzeJournal } from "@/lib/hooks/useJournal";
import { s } from "./styles";

const MOOD_EMOJIS = ["😞", "😕", "😐", "😊", "😄"] as const;
const ENERGY_EMOJIS = ["🔋", "🪫", "⚡", "💪", "🔥"] as const;

interface JournalEditorProps {
  habit: Habit;
  existingEntry: JournalEntry | null | undefined;
  isLoadingEntry: boolean;
}

export function JournalEditor({ habit, existingEntry, isLoadingEntry }: JournalEditorProps) {
  const t = useTranslations("dailyLab");
  const { mutate: saveJournal, isPending: isSaving } = useSaveJournal();
  const { mutate: analyzeJournal, isPending: isAnalyzing } = useAnalyzeJournal();

  const [content, setContent] = useState("");
  const [moodScore, setMoodScore] = useState<number>(3);
  const [energyScore, setEnergyScore] = useState<number>(3);

  useEffect(() => {
    setContent("");
    setMoodScore(3);
    setEnergyScore(3);
  }, [habit.id]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  const handleSave = () => {
    if (!content.trim() || isSaving) return;

    saveJournal(
      { habitId: habit.id, content, moodScore, energyScore },
      {
        onSuccess: (entry) => {
          setContent("");
          analyzeJournal(
            { journalEntryId: entry.id, habitId: habit.id },
            { onError: (err) => console.error("[analyzeJournal]", err) } // eslint-disable-line no-console
          );
        },
      }
    );
  };

  if (isLoadingEntry) {
    return (
      <Box py={8} textAlign="center">
        <Text fontSize="sm" fontWeight="bold" color="mutedFg">
          {t("journal.loading")}
        </Text>
      </Box>
    );
  }

  if (existingEntry) {
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

        {isAnalyzing && (
          <Box {...s.analyzingBadge}>
            <Text {...s.analyzingText}>⏳ {t("journal.analyzing")}</Text>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box>
      <chakra.textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          habit.habit_mode === "skill-building"
            ? t("journal.placeholderSkill")
            : t("journal.placeholderTracking")
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
        disabled={!content.trim() || isSaving}
        {...s.saveBtn}
        {...(!content.trim() || isSaving ? s.saveBtnDisabled : s.saveBtnEnabled)}
      >
        {isSaving ? t("journal.saving") : t("journal.save")}
      </chakra.button>
    </Box>
  );
}
