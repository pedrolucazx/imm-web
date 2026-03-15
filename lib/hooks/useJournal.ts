import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { journalService } from "@/lib/journal.service";
import type { CreateJournalEntryInput } from "@/types/journal";

export function useJournalEntry(date: string, habitId: string | null) {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  const query = useQuery({
    queryKey: ["journal", date, habitId],
    queryFn: () => journalService.getEntryByDate(date, habitId!),
    enabled: !isAuthLoading && !!accessToken && !!habitId,
  });

  return {
    ...query,
    isLoading: isAuthLoading || query.isPending,
  };
}

export function useSaveJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateJournalEntryInput) => journalService.createEntry(input),
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
      queryClient.setQueryData(["journal", entry.entryDate, entry.habitId], entry);
    },
  });
}

export function useAnalyzeJournal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ journalEntryId, habitId }: { journalEntryId: string; habitId: string }) =>
      journalService.analyze(journalEntryId, habitId),
    onSuccess: (_data, { habitId }) => {
      queryClient.invalidateQueries({ queryKey: ["journal"] });
      queryClient.invalidateQueries({ queryKey: ["habits", habitId] });
    },
  });
}
