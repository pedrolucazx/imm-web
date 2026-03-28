"use client";

import { useState, useEffect, useId, useMemo } from "react";
import { Box, Text, chakra } from "@chakra-ui/react";
import { LuMic, LuSquare } from "react-icons/lu";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import type { Habit } from "@/types/habits";
import type { JournalEntry } from "@/types/journal";
import { useSaveJournal } from "@/lib/hooks/useJournal";
import { getJournalPrompt, LANGUAGE_SKILLS } from "@/lib/habit-utils";
import { usePronunciationRecorder } from "@/lib/hooks/usePronunciationRecorder";
import { pronunciationService } from "@/lib/pronunciation.service";
import { journalService } from "@/lib/journal.service";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "@/lib/hooks/useTranslatedError";
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
  const tErrors = useTranslations("errors");
  const { translateError } = useTranslatedError();
  const {
    mutate: saveJournal,
    mutateAsync: saveJournalAsync,
    isPending: isSaving,
  } = useSaveJournal();
  const moodGroupId = useId();
  const energyGroupId = useId();

  const canUseAudio = true; // flag Pro gate futura
  const isLanguageHabit = LANGUAGE_SKILLS.includes(habit.target_skill);
  const showToggle = isLanguageHabit && canUseAudio;

  const [mode, setMode] = useState<"write" | "record">("write");
  const [content, setContent] = useState("");
  const [moodScore, setMoodScore] = useState<number>(DEFAULT_MOOD_SCORE);
  const [energyScore, setEnergyScore] = useState<number>(DEFAULT_ENERGY_SCORE);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const recorder = usePronunciationRecorder();

  useEffect(() => {
    setContent("");
    setMoodScore(DEFAULT_MOOD_SCORE);
    setEnergyScore(DEFAULT_ENERGY_SCORE);
    setMode("write");
    recorder.reset();
  }, [habit.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const parseResult = journalSchema.safeParse({ content });
  const isContentValid = parseResult.success;

  const audioSrc = useMemo(() => {
    if (!recorder.audioBlob) return null;
    return URL.createObjectURL(recorder.audioBlob);
  }, [recorder.audioBlob]);

  useEffect(() => {
    return () => {
      if (audioSrc) URL.revokeObjectURL(audioSrc);
    };
  }, [audioSrc]);

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

  const handleRecordSave = async () => {
    if (!recorder.audioBlob || isTranscribing || isSaving) return;
    setIsTranscribing(true);
    try {
      const { signedUrl, publicUrl } = await pronunciationService.getUploadUrl(recorder.mimeType);
      await pronunciationService.uploadAudio(signedUrl, recorder.audioBlob, recorder.mimeType);
      const { transcription } = await journalService.transcribeAudio({
        audioUrl: publicUrl,
        habitId: habit.id,
      });
      const entry = await saveJournalAsync({
        habitId: habit.id,
        content: transcription,
        entryDate: today,
        audioUrl: publicUrl,
        moodScore,
        energyScore,
      });
      recorder.reset();
      onAnalyze(entry.id, habit.id);
    } catch (error) {
      toaster.create({
        title: tErrors("title"),
        description: translateError(error as Error),
        type: "error",
        meta: { closable: true },
      });
    } finally {
      setIsTranscribing(false);
    }
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
      {showToggle && (
        <Box {...s.modeToggle}>
          <chakra.button
            type="button"
            aria-pressed={mode === "write"}
            onClick={() => setMode("write")}
            {...s.modeToggleBtn}
            {...(mode === "write" ? s.modeToggleBtnActive : s.modeToggleBtnInactive)}
          >
            {t("journal.modeWrite")}
          </chakra.button>
          <chakra.button
            type="button"
            aria-pressed={mode === "record"}
            onClick={() => setMode("record")}
            {...s.modeToggleBtn}
            {...(mode === "record" ? s.modeToggleBtnActive : s.modeToggleBtnInactive)}
          >
            {t("journal.modeRecord")}
          </chakra.button>
        </Box>
      )}

      {mode === "write" && (
        <>
          <Textarea
            aria-label={t("journal.contentLabel")}
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

          <chakra.button
            type="button"
            onClick={handleSave}
            disabled={!isContentValid || isSaving}
            {...s.saveBtn}
            {...(!isContentValid || isSaving ? s.saveBtnDisabled : s.saveBtnEnabled)}
          >
            {isSaving ? t("journal.saving") : t("journal.save")}
          </chakra.button>
        </>
      )}

      {mode === "record" && (
        <Box {...s.recorderBox}>
          {!recorder.isSupported ? (
            <Text {...s.micUnsupported}>{t("journal.micNotSupported")}</Text>
          ) : (
            <>
              {recorder.state === "recording" && (
                <Box {...s.recordingIndicator}>
                  <Box {...s.recordingDot} />
                  <Text {...s.recordingText}>{t("journal.stopRecording")}</Text>
                </Box>
              )}

              {audioSrc && recorder.state === "recorded" && (
                <Box {...s.audioPlayerWrapper}>
                  <audio
                    controls
                    src={audioSrc}
                    aria-label="Audio preview"
                    style={{ width: "100%" }}
                  />
                </Box>
              )}

              <Box {...s.recorderBtnRow}>
                {recorder.state === "idle" && (
                  <chakra.button
                    type="button"
                    onClick={recorder.start}
                    {...s.saveBtn}
                    {...s.saveBtnEnabled}
                    mt={0}
                  >
                    <LuMic style={{ display: "inline", marginRight: "8px" }} />
                    {t("journal.startRecording")}
                  </chakra.button>
                )}

                {recorder.state === "recording" && (
                  <chakra.button
                    type="button"
                    onClick={recorder.stop}
                    {...s.saveBtn}
                    {...s.saveBtnEnabled}
                    mt={0}
                    bg="red.500"
                  >
                    <LuSquare style={{ display: "inline", marginRight: "8px" }} />
                    {t("journal.stopRecording")}
                  </chakra.button>
                )}

                {recorder.state === "recorded" && (
                  <>
                    <chakra.button
                      type="button"
                      onClick={recorder.reset}
                      flex={1}
                      {...s.saveBtn}
                      {...s.saveBtnInactive}
                      mt={0}
                    >
                      {t("journal.reRecord")}
                    </chakra.button>
                    <chakra.button
                      type="button"
                      onClick={handleRecordSave}
                      disabled={isTranscribing || isSaving}
                      flex={2}
                      {...s.saveBtn}
                      {...(isTranscribing || isSaving ? s.saveBtnDisabled : s.saveBtnEnabled)}
                      mt={0}
                    >
                      {isTranscribing
                        ? t("journal.transcribing")
                        : isSaving
                          ? t("journal.saving")
                          : t("journal.transcribeAndSave")}
                    </chakra.button>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      )}

      <Box {...s.scoresGrid}>
        <Box {...s.scoreCard}>
          <Text as="span" id={moodGroupId} {...s.scoreLabel}>
            {t("journal.moodLabel")}
          </Text>
          <Box role="group" aria-labelledby={moodGroupId} {...s.scoreRow}>
            {MOOD_EMOJIS.map((emoji, i) => {
              const val = i + 1;
              const active = moodScore === val;
              return (
                <chakra.button
                  key={val}
                  type="button"
                  aria-pressed={active}
                  aria-label={t("journal.moodAriaLabel", { val })}
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
          <Text as="span" id={energyGroupId} {...s.scoreLabel}>
            {t("journal.energyLabel")}
          </Text>
          <Box role="group" aria-labelledby={energyGroupId} {...s.scoreRow}>
            {ENERGY_EMOJIS.map((emoji, i) => {
              const val = i + 1;
              const active = energyScore === val;
              return (
                <chakra.button
                  key={val}
                  type="button"
                  aria-pressed={active}
                  aria-label={t("journal.energyAriaLabel", { val })}
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
    </Box>
  );
}
