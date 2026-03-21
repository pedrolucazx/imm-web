import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { journalService } from "@/lib/journal.service";
import { toaster } from "@/components/ui/toaster";
import type { CreateJournalEntryInput, JournalEntry } from "@/types/journal";
import { useTranslatedError } from "./useTranslatedError";

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

export function useJournalHistory() {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  const query = useQuery({
    queryKey: ["journal-history"],
    queryFn: () => journalService.listHistory(),
    enabled: !isAuthLoading && !!accessToken,
  });

  return {
    ...query,
    isLoading: isAuthLoading || query.isPending,
  };
}

export function useSaveJournal() {
  const queryClient = useQueryClient();
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: (input: CreateJournalEntryInput) => journalService.createEntry(input),
    onSuccess: (entry) => {
      queryClient.invalidateQueries({ queryKey: ["journal", entry.entryDate] });
    },
    onError: (error: Error) => {
      toaster.create({
        title: "Error",
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
    },
  });
}

export function useAnalyzeJournal() {
  const queryClient = useQueryClient();
  const { translateError } = useTranslatedError();

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
    onError: (error: Error) => {
      toaster.create({
        title: "Error",
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
    },
  });
}
