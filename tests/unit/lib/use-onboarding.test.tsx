import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useOnboarding } from "@/lib/hooks/useOnboarding";

const mockGetStatus = jest.fn();
const mockUpdate = jest.fn();
const mockUseAuthContext = jest.fn();

jest.mock("@/lib/onboarding.service", () => ({
  onboardingService: {
    getStatus: (...args: unknown[]) => mockGetStatus(...args),
    update: (...args: unknown[]) => mockUpdate(...args),
  },
}));

jest.mock("@/lib/auth-context", () => ({
  useAuthContext: () => mockUseAuthContext(),
}));

const USER_ID = "user-123";
const LS_KEY = `onboarding_completed_${USER_ID}`;

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

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
  mockUseAuthContext.mockReturnValue({
    isAuthenticated: true,
    isLoading: false,
    user: { id: USER_ID },
  });
});

describe("useOnboarding — shouldShowTour", () => {
  it("is false while query is loading", () => {
    mockGetStatus.mockReturnValue(new Promise(() => {})); // never resolves
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    expect(result.current.shouldShowTour).toBe(false);
  });

  it("is true when server returns not completed and not skipped", async () => {
    mockGetStatus.mockResolvedValue({ completed: false, skipped: false, currentStep: 0 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(result.current.shouldShowTour).toBe(true));
  });

  it("is false when server returns completed", async () => {
    mockGetStatus.mockResolvedValue({ completed: true, skipped: false, currentStep: 5 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(result.current.shouldShowTour).toBe(false));
  });

  it("is false when server returns skipped", async () => {
    mockGetStatus.mockResolvedValue({ completed: false, skipped: true, currentStep: 2 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(result.current.shouldShowTour).toBe(false));
  });

  it("is false when user is not authenticated", () => {
    mockUseAuthContext.mockReturnValue({ isAuthenticated: false, isLoading: false, user: null });
    mockGetStatus.mockResolvedValue({ completed: false, skipped: false, currentStep: 0 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    expect(result.current.shouldShowTour).toBe(false);
  });

  it("is false when auth is still loading", () => {
    mockUseAuthContext.mockReturnValue({ isAuthenticated: false, isLoading: true, user: null });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    expect(result.current.shouldShowTour).toBe(false);
  });
});

describe("useOnboarding — localStorage sync", () => {
  it("sets per-user localStorage key when server returns completed", async () => {
    mockGetStatus.mockResolvedValue({ completed: true, skipped: false, currentStep: 5 });
    const { wrapper } = makeWrapper();
    renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(localStorage.getItem(LS_KEY)).toBe("true"));
  });

  it("sets per-user localStorage key when server returns skipped", async () => {
    mockGetStatus.mockResolvedValue({ completed: false, skipped: true, currentStep: 2 });
    const { wrapper } = makeWrapper();
    renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(localStorage.getItem(LS_KEY)).toBe("true"));
  });

  it("removes stale localStorage key when server says not completed", async () => {
    localStorage.setItem(LS_KEY, "true");
    mockGetStatus.mockResolvedValue({ completed: false, skipped: false, currentStep: 0 });
    const { wrapper } = makeWrapper();
    renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(localStorage.getItem(LS_KEY)).toBeNull());
  });

  it("uses per-user key — different users don't share state", async () => {
    const otherKey = "onboarding_completed_other-user";
    localStorage.setItem(otherKey, "true");
    mockGetStatus.mockResolvedValue({ completed: false, skipped: false, currentStep: 0 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(result.current.shouldShowTour).toBe(true));
    expect(localStorage.getItem(LS_KEY)).toBeNull();
  });
});

describe("useOnboarding — completeTour", () => {
  it("calls update with completed:true and sets localStorage", async () => {
    mockGetStatus.mockResolvedValue({ completed: false, skipped: false, currentStep: 0 });
    mockUpdate.mockResolvedValue({ completed: true, skipped: false, currentStep: 5 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(result.current.shouldShowTour).toBe(true));

    await act(async () => {
      await result.current.completeTour();
    });

    expect(mockUpdate).toHaveBeenCalledWith({ completed: true });
    expect(localStorage.getItem(LS_KEY)).toBe("true");
  });
});

describe("useOnboarding — skipTour", () => {
  it("calls update with skipped:true and sets localStorage", async () => {
    mockGetStatus.mockResolvedValue({ completed: false, skipped: false, currentStep: 0 });
    mockUpdate.mockResolvedValue({ completed: false, skipped: true, currentStep: 1 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });
    await waitFor(() => expect(result.current.shouldShowTour).toBe(true));

    await act(async () => {
      await result.current.skipTour();
    });

    expect(mockUpdate).toHaveBeenCalledWith({ skipped: true });
    expect(localStorage.getItem(LS_KEY)).toBe("true");
  });
});

describe("useOnboarding — restartTour", () => {
  it("removes localStorage and calls update to reset state", async () => {
    localStorage.setItem(LS_KEY, "true");
    mockGetStatus.mockResolvedValue({ completed: true, skipped: false, currentStep: 5 });
    mockUpdate.mockResolvedValue({ completed: false, skipped: false, currentStep: 0 });
    const { wrapper } = makeWrapper();
    const { result } = renderHook(() => useOnboarding(), { wrapper });

    await act(async () => {
      await result.current.restartTour();
    });

    expect(localStorage.getItem(LS_KEY)).toBeNull();
    expect(mockUpdate).toHaveBeenCalledWith({ completed: false, skipped: false, currentStep: 0 });
  });
});
