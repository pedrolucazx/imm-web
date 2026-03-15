import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { JournalEntry, CreateJournalEntryInput } from "@/types/journal";

export const journalService = {
  async createEntry(input: CreateJournalEntryInput): Promise<JournalEntry> {
    return api.post<JournalEntry>(ENDPOINTS.JOURNAL.CREATE, input);
  },

  async getEntriesByDate(date: string): Promise<JournalEntry[]> {
    return api.get<JournalEntry[]>(ENDPOINTS.JOURNAL.LIST, { params: { date } });
  },

  async analyze(journalEntryId: string, habitId: string): Promise<void> {
    await api.post(ENDPOINTS.AI.ANALYZE, { journalEntryId, habitId });
  },
};
