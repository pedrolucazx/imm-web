import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useAnalyticsSummary } from "@/lib/hooks/useAnalytics";
import type { AnalyticsSummary } from "@/types/analytics";

const mockGetSummary = jest.fn();
const mockUseAuthContext = jest.fn();

jest.mock("@/lib/analytics.service", () => ({
  analyticsService: {
    getSummary: (...args: unknown[]) => mockGetSummary(...args),
  },
}));

jest.mock("@/lib/auth-context", () => ({
  useAuthContext: () => mockUseAuthContext(),
}));

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  };
}

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

describe("useAnalyticsSummary", () => {
  it("does not fetch when auth is loading", () => {
    mockUseAuthContext.mockReturnValue({
      isLoading: true,
      accessToken: null,
    });

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useAnalyticsSummary(), { wrapper });

    expect(mockGetSummary).not.toHaveBeenCalled();
    expect(result.current.data).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(true);
  });

  it("does not expose stale data when unauthenticated", () => {
    mockUseAuthContext.mockReturnValue({
      isLoading: false,
      accessToken: null,
    });

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useAnalyticsSummary(), { wrapper });

    expect(mockGetSummary).not.toHaveBeenCalled();
    expect(result.current.data).toBeNull();
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });

  it("fetches analytics summary when authenticated", async () => {
    mockUseAuthContext.mockReturnValue({
      isLoading: false,
      accessToken: "token",
    });
    mockGetSummary.mockResolvedValue(mockSummary);

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useAnalyticsSummary("habit-123"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockGetSummary).toHaveBeenCalledWith("habit-123");
    expect(result.current.data).toEqual(mockSummary);
    expect(result.current.isLoading).toBe(false);
  });

  it("exposes error state when request fails and user is authenticated", async () => {
    mockUseAuthContext.mockReturnValue({
      isLoading: false,
      accessToken: "token",
    });
    mockGetSummary.mockRejectedValue(new Error("boom"));

    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useAnalyticsSummary(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error?.message).toBe("boom");
  });
});
