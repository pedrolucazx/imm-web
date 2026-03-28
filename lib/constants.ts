export const LANGUAGES = [
  { value: "pt-BR", label: "Português", flag: "🇧🇷" },
  { value: "en-US", label: "English", flag: "🇺🇸" },
  { value: "es-ES", label: "Español", flag: "🇪🇸" },
] as const;

export type UILanguage = (typeof LANGUAGES)[number]["value"];

export const AI_DAILY_LIMIT = 15;

export const API_COLORS = [
  "bg-surface-mint",
  "bg-surface-sky",
  "bg-surface-coral",
  "bg-surface-lavender",
  "bg-surface-yellow",
] as const;

export type ApiColor = (typeof API_COLORS)[number];
export const MIN_NAME_LENGTH = 2;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_HABIT_NAME_LENGTH = 80;
export const MIN_AVAILABLE_MINUTES = 5;
export const MAX_AVAILABLE_MINUTES = 120;
export const DEFAULT_AVAILABLE_MINUTES = 30;
export const DEFAULT_MOOD_SCORE = 3;
export const DEFAULT_ENERGY_SCORE = 3;
export const JOURNAL_HISTORY_LIMIT = 100;
