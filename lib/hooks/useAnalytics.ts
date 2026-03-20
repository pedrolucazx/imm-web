import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { analyticsService } from "@/lib/analytics.service";
import type { AnalyticsSummary } from "@/types/analytics";

export function useAnalyticsSummary(habitId?: string | null) {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  const query = useQuery<AnalyticsSummary, Error>({
    queryKey: ["analytics", habitId ?? "all"],
    queryFn: () => analyticsService.getSummary(habitId ?? undefined),
    enabled: !isAuthLoading && !!accessToken,
  });

  return {
    ...query,
    isLoading: isAuthLoading || query.isPending,
  };
}
