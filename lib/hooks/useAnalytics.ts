import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { resolveAuthReady } from "@/lib/auth-state";
import { analyticsService } from "@/lib/analytics.service";
import type { AnalyticsSummary } from "@/types/analytics";

export function useAnalyticsSummary(habitId?: string | null) {
  const auth = useAuthContext();
  const isAuthReady = resolveAuthReady(auth);
  const { accessToken } = auth;
  const isUnauthorized = !isAuthReady || !accessToken;
  const isAuthorized = !isUnauthorized;

  const query = useQuery<AnalyticsSummary, Error>({
    queryKey: ["analytics", habitId ?? "all"],
    queryFn: () => analyticsService.getSummary(habitId ?? undefined),
    enabled: isAuthorized,
  });

  return {
    ...query,
    data: isUnauthorized ? null : query.data,
    error: isUnauthorized ? null : query.error,
    isError: isUnauthorized ? false : query.isError,
    isLoading: !isAuthReady || query.isLoading,
  };
}
