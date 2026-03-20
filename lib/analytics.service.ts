import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AnalyticsSummary } from "@/types/analytics";

export const analyticsService = {
  async getSummary(habitId?: string): Promise<AnalyticsSummary> {
    const params = habitId ? { habitId } : undefined;
    return api.get<AnalyticsSummary>(ENDPOINTS.ANALYTICS.SUMMARY, { params });
  },
};
