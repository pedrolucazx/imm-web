"use client";

import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { LuMic, LuSquare } from "react-icons/lu";
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { PronunciationResult } from "@/components/daily-lab/PronunciationResult";
import { usePronunciationRecorder } from "@/lib/hooks/usePronunciationRecorder";
import { usePronunciation } from "@/lib/hooks/usePronunciation";
import type { Habit } from "@/types/habits";
import { s } from "./styles";

interface PronunciationModalProps {
  open: boolean;
  onClose: () => void;
  habit: Habit;
  originalText: string;
  entryDate: string;
}

export function PronunciationModal({
  open,
  onClose,
  habit,
  originalText,
  entryDate,
}: PronunciationModalProps) {
  const t = useTranslations("pronunciation");
  const recorder = usePronunciationRecorder();
  const pronunciation = usePronunciation();

  function handleClose() {
    recorder.reset();
    pronunciation.reset();
    onClose();
  }

  function handleRetry() {
    recorder.reset();
    pronunciation.reset();
  }

  function handleAnalyze() {
    if (!recorder.audioBlob) return;
    pronunciation.analyze({
      blob: recorder.audioBlob,
      mimeType: recorder.mimeType,
      habitId: habit.id,
      originalText,
      entryDate,
    });
  }

  const audioSrc = useMemo(() => {
    if (!recorder.audioBlob) return null;
    return URL.createObjectURL(recorder.audioBlob);
  }, [recorder.audioBlob]);

  useEffect(() => {
    return () => {
      if (audioSrc) URL.revokeObjectURL(audioSrc);
    };
  }, [audioSrc]);

  const showResult = !!pronunciation.result;
  const showLoading = pronunciation.isLoading;

  return (
    <DialogRoot
      open={open}
      onOpenChange={({ open: isOpen }) => {
        if (!isOpen) handleClose();
      }}
      placement="center"
    >
      <DialogContent maxW="lg">
        <DialogHeader>
          <DialogTitle>{t("modalTitle")}</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>

        <DialogBody pb={6}>
          {!recorder.isSupported ? (
            <Box {...s.unsupportedBox}>
              <Text {...s.unsupportedText}>{t("browserNotSupported")}</Text>
            </Box>
          ) : showResult ? (
            <PronunciationResult
              result={pronunciation.result!}
              originalText={originalText}
              onRetry={handleRetry}
            />
          ) : showLoading ? (
            <Box {...s.loadingBox}>
              <Spinner size="xl" borderWidth="4px" color="primary" />
              <Text {...s.loadingText}>{t("analyzing")}</Text>
            </Box>
          ) : (
            <>
              <Box {...s.referenceBox}>
                <Text {...s.referenceLabel}>{t("referenceText")}</Text>
                <Text {...s.referenceText}>{originalText}</Text>
              </Box>

              {recorder.state === "recording" && (
                <Box {...s.recordingIndicator}>
                  <Box {...s.recordingDot} />
                  <Text {...s.recordingText}>{t("record")}</Text>
                </Box>
              )}

              {audioSrc && recorder.state === "recorded" && (
                <Box {...s.audioPlayerWrapper}>
                  <audio
                    controls
                    src={audioSrc}
                    aria-label={t("audioPreview")}
                    style={{ width: "100%" }}
                  />
                </Box>
              )}

              <Box {...s.controls}>
                {recorder.state === "idle" && (
                  <Button colorPalette="red" onClick={recorder.start}>
                    <LuMic />
                    {t("record")}
                  </Button>
                )}

                {recorder.state === "recording" && (
                  <Button colorPalette="red" variant="outline" onClick={recorder.stop}>
                    <LuSquare />
                    {t("stop")}
                  </Button>
                )}

                {recorder.state === "recorded" && (
                  <>
                    <Button variant="outline" size="sm" onClick={recorder.reset}>
                      <LuMic />
                      {t("record")}
                    </Button>
                    <Button onClick={handleAnalyze} disabled={!recorder.audioBlob}>
                      {t("analyze")}
                    </Button>
                  </>
                )}
              </Box>
            </>
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
