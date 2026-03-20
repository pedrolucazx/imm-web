import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { analyticsService } from "@/lib/analytics.service";
import type { AnalyticsSummary } from "@/types/analytics";

export function useAnalyticsSummary(habitId?: string | null) {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();
  const isUnauthorized = isAuthLoading || !accessToken;

  const query = useQuery<AnalyticsSummary, Error>({
    queryKey: ["analytics", habitId ?? "all"],
    queryFn: () => analyticsService.getSummary(habitId ?? undefined),
    enabled: !isAuthLoading && !!accessToken,
  });

  return {
    ...query,
    data: isUnauthorized ? null : query.data,
    error: isUnauthorized ? null : query.error,
    isError: isUnauthorized ? false : query.isError,
    isLoading: isAuthLoading || query.isLoading,
  };
}
