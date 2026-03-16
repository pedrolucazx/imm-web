import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { JournalEntry, CreateJournalEntryInput, AiFeedback } from "@/types/journal";

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

  async analyze(journalEntryId: string, habitId: string): Promise<AnalyzeResult> {
    return api.post<AnalyzeResult>(ENDPOINTS.AI.ANALYZE, {
      journal_entry_id: journalEntryId,
      habit_id: habitId,
    });
  },
};
