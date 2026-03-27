import { analyticsService } from "@/lib/analytics.service";
import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { AnalyticsSummary } from "@/types/analytics";

jest.mock("@/lib/api-client", () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockApi = api as jest.Mocked<typeof api>;

const mockSummary: AnalyticsSummary = {
  habits: [],
  global: {
    completionRateToday: 0.5,
    avgConsistencyRate: 0.75,
    totalJournalEntries: 10,
    totalWords: 1200,
    avgWordsPerEntry: 120,
    avgMood: 4,
    avgEnergy: 3.5,
    aiRequestsToday: 2,
    moodConsistencyCorrelation: null,
    bestPerformanceHour: "09:00",
  },
  moodTimeline: [],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("analyticsService", () => {
  it("calls analytics summary endpoint with timezone by default", async () => {
    mockApi.get.mockResolvedValue(mockSummary);

    const result = await analyticsService.getSummary();

    expect(mockApi.get).toHaveBeenCalledWith(ENDPOINTS.ANALYTICS.SUMMARY, {
      params: expect.objectContaining({ timezone: expect.any(String) }),
    });
    expect(result).toEqual(mockSummary);
  });

  it("passes habitId and timezone as query params when habitId provided", async () => {
    mockApi.get.mockResolvedValue(mockSummary);

    const result = await analyticsService.getSummary("habit-123");

    expect(mockApi.get).toHaveBeenCalledWith(ENDPOINTS.ANALYTICS.SUMMARY, {
      params: expect.objectContaining({ habitId: "habit-123", timezone: expect.any(String) }),
    });
    expect(result).toEqual(mockSummary);
  });
});
