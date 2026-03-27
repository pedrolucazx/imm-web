import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AnalyticsSummary } from "@/types/analytics";

export const analyticsService = {
  async getSummary(habitId?: string): Promise<AnalyticsSummary> {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const params: Record<string, string> = { timezone };
    if (habitId) params.habitId = habitId;
    return api.get<AnalyticsSummary>(ENDPOINTS.ANALYTICS.SUMMARY, { params });
  },
};
