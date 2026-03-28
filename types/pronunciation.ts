export type WordCloudItem = {
  word: string;
  frequency: number;
};

export type AnalyzePronunciationResult = {
  id: string;
  userId: string;
  habitId: string;
  entryDate: string;
  originalText: string;
  transcription: string | null;
  score: number;
  missedWords: string[];
  correctWords: string[];
  extraWords: string[];
  audioUrl: string | null;
  createdAt: string;
};
