import type { PlanStatus, TargetSkill } from "@/types/habits";

export interface MoodConsistencyCorrelation {
  highMoodRate: number;
  lowMoodRate: number;
}

export interface AnalyticsGlobalStats {
  completionRateToday: number;
  avgConsistencyRate: number;
  totalJournalEntries: number;
  totalWords: number;
  avgWordsPerEntry: number;
  avgMood: number | null;
  avgEnergy: number | null;
  aiRequestsToday: number;
  moodConsistencyCorrelation: MoodConsistencyCorrelation | null;
  bestPerformanceHour: string | null;
}

export interface HabitLog {
  logDate: string;
  completed: boolean;
}

export interface ScorePoint {
  date: string;
  grammarScore: number;
  vocabularyScore: number;
  fluencyScore: number;
}

export interface HabitStat {
  id: string;
  name: string;
  icon: string;
  color: string;
  currentDay: number;
  streak: number;
  bestStreak: number;
  consistencyRate: number;
  totalCompletedDays: number;
  targetSkill: TargetSkill | null;
  planStatus: PlanStatus;
  habitPlan: Record<string, unknown> | null;
  logs: HabitLog[];
  scoreTimeline: ScorePoint[] | null;
}

export interface MoodTimelineEntry {
  date: string;
  mood: number | null;
  energy: number | null;
}

export interface AnalyticsSummary {
  habits: HabitStat[];
  global: AnalyticsGlobalStats;
  moodTimeline: MoodTimelineEntry[];
}
