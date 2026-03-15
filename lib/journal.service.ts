import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { JournalEntry, CreateJournalEntryInput } from "@/types/journal";

export const journalService = {
  async createEntry(input: CreateJournalEntryInput): Promise<JournalEntry> {
    return api.post<JournalEntry>(ENDPOINTS.JOURNAL.CREATE, input);
  },

  async getEntryByDate(date: string, habitId: string): Promise<JournalEntry | null> {
    try {
      return await api.get<JournalEntry>(ENDPOINTS.JOURNAL.GET_BY_DATE(date), {
        params: { habit_id: habitId },
      });
    } catch {
      return null;
    }
  },

  async analyze(journalEntryId: string, habitId: string): Promise<void> {
    await api.post(ENDPOINTS.AI.ANALYZE, { journalEntryId, habitId });
  },
};
