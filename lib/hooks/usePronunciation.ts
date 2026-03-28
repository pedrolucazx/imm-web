"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { pronunciationService } from "@/lib/pronunciation.service";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";
import type { AnalyzePronunciationResult } from "@/types/pronunciation";

type AnalyzeParams = {
  blob: Blob;
  mimeType: string;
  habitId: string;
  originalText: string;
  entryDate: string;
};

export type UsePronunciationResult = {
  analyze: (_params: AnalyzeParams) => Promise<void>;
  isLoading: boolean;
  result: AnalyzePronunciationResult | null;
  reset: () => void;
};

export function usePronunciation(): UsePronunciationResult {
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalyzePronunciationResult | null>(null);

  const analyze = useCallback(
    async ({ blob, mimeType, habitId, originalText, entryDate }: AnalyzeParams) => {
      setIsLoading(true);
      try {
        const { signedUrl, publicUrl } = await pronunciationService.getUploadUrl(mimeType);
        await pronunciationService.uploadAudio(signedUrl, blob, mimeType);
        const data = await pronunciationService.analyze({
          habitId,
          audioUrl: publicUrl,
          originalText,
          entryDate,
        });
        setResult(data);
      } catch (error) {
        toaster.create({
          title: t("title"),
          description: translateError(error as Error),
          type: "error",
          meta: { closable: true },
        });
      } finally {
        setIsLoading(false);
      }
    },
    [t, translateError]
  );

  const reset = useCallback(() => {
    setResult(null);
    setIsLoading(false);
  }, []);

  return { analyze, isLoading, result, reset };
}
