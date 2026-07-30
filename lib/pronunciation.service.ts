import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AnalyzePronunciationResult, WordCloudItem } from "@/types/pronunciation";

type AnalyzeInput = {
  habitId: string;
  audio: Blob;
  originalText: string;
  entryDate?: string;
};

export const pronunciationService = {
  async analyze(input: AnalyzeInput): Promise<AnalyzePronunciationResult> {
    const ext = input.audio.type === "audio/mp4" ? "mp4" : "webm";
    const form = new FormData();
    form.append("habitId", input.habitId);
    form.append("originalText", input.originalText);
    if (input.entryDate) form.append("entryDate", input.entryDate);
    form.append("audio", input.audio, `pronunciation.${ext}`);
    return api.post<AnalyzePronunciationResult>(ENDPOINTS.PRONUNCIATION.ANALYZE, form);
  },

  async getWordCloud(habitId: string): Promise<WordCloudItem[]> {
    return api.get<WordCloudItem[]>(ENDPOINTS.PRONUNCIATION.WORD_CLOUD, {
      params: { habitId },
    });
  },
};
