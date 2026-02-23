import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { useLogin, useLogout, useRegister } from "@/lib/hooks/useAuth";
import { authService } from "@/lib/auth.service";
import type { AuthResponse } from "@/types/auth";

jest.mock("@/lib/auth.service", () => ({
  authService: {
    register: jest.fn(),
    login: jest.fn(),
    setToken: jest.fn(),
    removeToken: jest.fn(),
  },
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;

const mockAuthResponse: AuthResponse = {
  token: "test-jwt-token",
  user: { id: "user-1", email: "user@example.com", name: "Test User" },
};

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
});

describe("useRegister", () => {
  it("calls authService.register with the provided data", async () => {
    mockAuthService.register.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
        name: "Test User",
      });
    });

    expect(mockAuthService.register).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "pass123",
      name: "Test User",
    });
  });

  it("stores the token via authService.setToken on success", async () => {
    mockAuthService.register.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
        name: "Test User",
      });
    });

    expect(mockAuthService.setToken).toHaveBeenCalledWith(mockAuthResponse.token);
  });
});

describe("useLogin", () => {
  it("calls authService.login with the provided credentials", async () => {
    mockAuthService.login.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
      });
    });

    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "pass123",
    });
  });

  it("stores the token via authService.setToken on success", async () => {
    mockAuthService.login.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
      });
    });

    expect(mockAuthService.setToken).toHaveBeenCalledWith(mockAuthResponse.token);
  });
});

describe("useLogout", () => {
  it("calls authService.removeToken when invoked", () => {
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useLogout(), { wrapper });

    act(() => {
      result.current();
    });

    expect(mockAuthService.removeToken).toHaveBeenCalled();
  });

  it("clears the query client data when invoked", () => {
    const { wrapper, queryClient } = makeWrapper();
    queryClient.setQueryData(["user"], { id: "1", name: "John" });

    const { result } = renderHook(() => useLogout(), { wrapper });

    act(() => {
      result.current();
    });

    expect(queryClient.getQueryData(["user"])).toBeUndefined();
  });
});
