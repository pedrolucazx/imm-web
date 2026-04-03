import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { resolveAuthReady } from "@/lib/auth-state";
import { pronunciationService } from "@/lib/pronunciation.service";
import type { WordCloudItem } from "@/types/pronunciation";

export function useWordCloud(habitId: string | null) {
  const auth = useAuthContext();
  const isAuthReady = resolveAuthReady(auth);
  const { accessToken } = auth;

  return useQuery<WordCloudItem[], Error>({
    queryKey: ["word-cloud", habitId],
    queryFn: () => pronunciationService.getWordCloud(habitId!),
    enabled: isAuthReady && !!accessToken && !!habitId,
  });
}
