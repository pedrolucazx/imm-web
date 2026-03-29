import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { JournalEntry, CreateJournalEntryInput, AiFeedback } from "@/types/journal";
import { JOURNAL_HISTORY_LIMIT } from "@/lib/constants";

export type AnalyzeResult = {
  aiFeedback: AiFeedback;
  aiAgentType: "language-teacher" | "behavioral-coach";
};

export const journalService = {
  async createEntry(input: CreateJournalEntryInput): Promise<JournalEntry> {
    return api.post<JournalEntry>(ENDPOINTS.JOURNAL.CREATE, input);
  },

  async getEntriesByDate(date: string): Promise<JournalEntry[]> {
    return api.get<JournalEntry[]>(ENDPOINTS.JOURNAL.LIST, { params: { date } });
  },

  async listHistory(limit = JOURNAL_HISTORY_LIMIT): Promise<JournalEntry[]> {
    return api.get<JournalEntry[]>(ENDPOINTS.JOURNAL.HISTORY, { params: { limit } });
  },

  async analyze(journalEntryId: string, habitId: string): Promise<AnalyzeResult> {
    return api.post<AnalyzeResult>(ENDPOINTS.AI.ANALYZE, {
      journal_entry_id: journalEntryId,
      habit_id: habitId,
    });
  },

  async transcribeAudio(input: {
    audioUrl: string;
    habitId: string;
  }): Promise<{ transcription: string }> {
    return api.post<{ transcription: string }>(ENDPOINTS.JOURNAL.TRANSCRIBE, input);
  },
};
