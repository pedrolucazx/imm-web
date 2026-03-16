import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { JournalEntry, CreateJournalEntryInput, AiFeedback } from "@/types/journal";

/**
 * Tipos de resultado da análise de IA.
 */
export type AnalyzeResult = {
  aiFeedback: AiFeedback;
  aiAgentType: "language-teacher" | "behavioral-coach";
};

/**
 * Serviço de operações do diário.
 */
export const journalService = {
  /**
   * Cria uma nova entrada no diário.
   */
  async createEntry(input: CreateJournalEntryInput): Promise<JournalEntry> {
    return api.post<JournalEntry>(ENDPOINTS.JOURNAL.CREATE, input);
  },

  /**
   * Lista entradas do diário por data.
   */
  async getEntriesByDate(date: string): Promise<JournalEntry[]> {
    return api.get<JournalEntry[]>(ENDPOINTS.JOURNAL.LIST, { params: { date } });
  },

  /**
   * Analisa uma entrada de diário usando IA.
   * Retorna o feedback e o tipo de agente (language-teacher ou behavioral-coach).
   */
  async analyze(journalEntryId: string, habitId: string): Promise<AnalyzeResult> {
    return api.post<AnalyzeResult>(ENDPOINTS.AI.ANALYZE, {
      journal_entry_id: journalEntryId,
      habit_id: habitId,
    });
  },
};
