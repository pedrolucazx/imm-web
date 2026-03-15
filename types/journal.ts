export interface JournalEntry {
  id: string;
  userId: string;
  habitId: string;
  entryDate: string;
  content: string;
  wordCount: number | null;
  uiLanguageSnap: string | null;
  targetSkillSnap: string | null;
  moodScore: number | null;
  energyScore: number | null;
  aiFeedback: Record<string, unknown> | null;
  aiAgentType: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJournalEntryInput {
  habitId: string;
  content: string;
  moodScore?: number;
  energyScore?: number;
}
