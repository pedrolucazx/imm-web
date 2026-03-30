import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { OnboardingSession, UpdateOnboardingInput } from "@/types/onboarding";

export const onboardingService = {
  async getStatus(): Promise<OnboardingSession> {
    return api.get<OnboardingSession>(ENDPOINTS.USER.ONBOARDING);
  },

  async update(data: UpdateOnboardingInput): Promise<OnboardingSession> {
    return api.put<OnboardingSession>(ENDPOINTS.USER.ONBOARDING, data);
  },
};
