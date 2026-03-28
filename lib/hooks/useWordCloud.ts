import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { pronunciationService } from "@/lib/pronunciation.service";
import type { WordCloudItem } from "@/types/pronunciation";

export function useWordCloud(habitId: string | null) {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  return useQuery<WordCloudItem[], Error>({
    queryKey: ["word-cloud", habitId],
    queryFn: () => pronunciationService.getWordCloud(habitId!),
    enabled: !isAuthLoading && !!accessToken && !!habitId,
  });
}
