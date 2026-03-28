import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AnalyzePronunciationResult, WordCloudItem } from "@/types/pronunciation";

type AudioUploadUrlResponse = {
  signedUrl: string;
  publicUrl: string;
  path: string;
};

type AnalyzeInput = {
  habitId: string;
  audioUrl: string;
  originalText: string;
  entryDate: string;
};

export const pronunciationService = {
  async getUploadUrl(contentType: string): Promise<AudioUploadUrlResponse> {
    return api.post<AudioUploadUrlResponse>(ENDPOINTS.PRONUNCIATION.UPLOAD_URL, { contentType });
  },

  async uploadAudio(signedUrl: string, blob: Blob, mimeType: string): Promise<void> {
    const res = await fetch(signedUrl, {
      method: "PUT",
      body: blob,
      headers: { "Content-Type": mimeType },
    });
    if (!res.ok) {
      throw new Error(`Audio upload failed: ${res.status} ${res.statusText}`);
    }
  },

  async analyze(input: AnalyzeInput): Promise<AnalyzePronunciationResult> {
    return api.post<AnalyzePronunciationResult>(ENDPOINTS.PRONUNCIATION.ANALYZE, input);
  },

  async getWordCloud(habitId: string): Promise<WordCloudItem[]> {
    return api.get<WordCloudItem[]>(ENDPOINTS.PRONUNCIATION.WORD_CLOUD, {
      params: { habitId },
    });
  },
};
