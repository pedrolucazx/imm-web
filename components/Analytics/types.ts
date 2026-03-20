export interface MoodConsistencyCorrelation {
  highMoodRate: number;
  lowMoodRate: number;
}

export interface AnalyticsGlobalStats {
  completionRateToday: number;
  avgConsistencyRate?: number;
  totalJournalEntries: number;
  totalWords: number;
  avgWordsPerEntry: number;
  avgMood: number | null;
  avgEnergy: number | null;
  aiRequestsToday: number;
  moodConsistencyCorrelation: MoodConsistencyCorrelation | null;
  bestPerformanceHour: string | null;
}
