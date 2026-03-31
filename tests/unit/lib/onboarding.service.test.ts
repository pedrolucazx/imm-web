import { onboardingService } from "@/lib/onboarding.service";
import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { OnboardingSession } from "@/types/onboarding";

jest.mock("@/lib/api-client", () => ({
  api: {
    get: jest.fn(),
    put: jest.fn(),
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

const mockSession: OnboardingSession = {
  completed: false,
  skipped: false,
  currentStep: 0,
  completedAt: null,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("onboardingService", () => {
  describe("getStatus", () => {
    it("calls GET on the onboarding endpoint", async () => {
      mockApi.get.mockResolvedValue(mockSession);

      const result = await onboardingService.getStatus();

      expect(mockApi.get).toHaveBeenCalledWith(ENDPOINTS.USER.ONBOARDING);
      expect(result).toEqual(mockSession);
    });

    it("propagates API errors", async () => {
      mockApi.get.mockRejectedValue(new Error("Network error"));

      await expect(onboardingService.getStatus()).rejects.toThrow("Network error");
    });
  });

  describe("update", () => {
    it("calls PUT with completed payload", async () => {
      const updated: OnboardingSession = { ...mockSession, completed: true };
      mockApi.put.mockResolvedValue(updated);

      const result = await onboardingService.update({ completed: true });

      expect(mockApi.put).toHaveBeenCalledWith(ENDPOINTS.USER.ONBOARDING, { completed: true });
      expect(result).toEqual(updated);
    });

    it("calls PUT with skipped payload", async () => {
      const updated: OnboardingSession = { ...mockSession, skipped: true };
      mockApi.put.mockResolvedValue(updated);

      const result = await onboardingService.update({ skipped: true });

      expect(mockApi.put).toHaveBeenCalledWith(ENDPOINTS.USER.ONBOARDING, { skipped: true });
      expect(result).toEqual(updated);
    });

    it("calls PUT with currentStep payload", async () => {
      const updated: OnboardingSession = { ...mockSession, currentStep: 3 };
      mockApi.put.mockResolvedValue(updated);

      const result = await onboardingService.update({ currentStep: 3 });

      expect(mockApi.put).toHaveBeenCalledWith(ENDPOINTS.USER.ONBOARDING, { currentStep: 3 });
      expect(result).toEqual(updated);
    });

    it("propagates API errors", async () => {
      mockApi.put.mockRejectedValue(new Error("Unauthorized"));

      await expect(onboardingService.update({ completed: true })).rejects.toThrow("Unauthorized");
    });
  });
});
