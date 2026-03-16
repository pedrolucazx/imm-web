import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { journalService } from "@/lib/journal.service";
import type { CreateJournalEntryInput, JournalEntry } from "@/types/journal";

/**
 * Hook para buscar entradas do diário por data.
 */
export function useJournalEntries(date: string) {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  const query = useQuery({
    queryKey: ["journal", date],
    queryFn: () => journalService.getEntriesByDate(date),
    enabled: !isAuthLoading && !!accessToken,
  });

  return {
    ...query,
    isLoading: isAuthLoading || query.isPending,
  };
}

/**
 * Hook para salvar uma entrada no diário.
 * Invalida cache da data após sucesso.
 */
export function useSaveJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateJournalEntryInput) => journalService.createEntry(input),
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ["journal", entry.entryDate] });
    },
  });
}

/**
 * Hook para analisar uma entrada de diário com IA.
 * Atualiza cache local com feedback e invalida queries de perfil.
 */
export function useAnalyzeJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ journalEntryId, habitId }: { journalEntryId: string; habitId: string }) =>
      journalService.analyze(journalEntryId, habitId),
    onSuccess: (data, variables) => {
      queryClient.setQueriesData({ queryKey: ["journal"] }, (old: JournalEntry[] | undefined) => {
        if (!old) return old;
        return old.map((entry) =>
          entry.id === variables.journalEntryId ? { ...entry, aiFeedback: data.aiFeedback } : entry
        );
      });
      queryClient.invalidateQueries({ queryKey: ["journal"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
