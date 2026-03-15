import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { useLogin, useLogout, useRegister } from "@/lib/hooks/useAuth";
import type { AuthResponse } from "@/types/auth";

const mockLogin = jest.fn();
const mockRegister = jest.fn();
const mockLogout = jest.fn();

jest.mock("@/lib/auth-context", () => ({
  useAuthContext: () => ({
    login: mockLogin,
    register: mockRegister,
    logout: mockLogout,
  }),
}));

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock("@/components/ui/toaster", () => ({
  toaster: {
    create: jest.fn(),
  },
}));

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
  it("calls authContext.register with the provided data", async () => {
    mockRegister.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useRegister(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
        name: "Test User",
      });
    });

    expect(mockRegister).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "pass123",
      name: "Test User",
    });
  });

  it("calls options.onSuccess callback after successful registration", async () => {
    mockRegister.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();
    const onSuccess = jest.fn();

    const { result } = renderHook(() => useRegister({ onSuccess }), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
        name: "Test User",
      });
    });

    expect(onSuccess).toHaveBeenCalledWith(mockAuthResponse);
  });

  it("calls options.onError callback on failure", async () => {
    const error = new Error("Registration failed");
    mockRegister.mockRejectedValue(error);
    const { wrapper } = makeWrapper();
    const onError = jest.fn();

    const { result } = renderHook(() => useRegister({ onError }), { wrapper });

    await act(async () => {
      result.current.mutate({
        email: "user@example.com",
        password: "pass123",
        name: "Test User",
      });
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(onError).toHaveBeenCalledWith(error);
  });
});

describe("useLogin", () => {
  it("calls authContext.login with the provided credentials", async () => {
    mockLogin.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useLogin(), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
      });
    });

    expect(mockLogin).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "pass123",
    });
  });

  it("calls options.onSuccess callback after successful login", async () => {
    mockLogin.mockResolvedValue(mockAuthResponse);
    const { wrapper } = makeWrapper();
    const onSuccess = jest.fn();

    const { result } = renderHook(() => useLogin({ onSuccess }), { wrapper });

    await act(async () => {
      await result.current.mutateAsync({
        email: "user@example.com",
        password: "pass123",
      });
    });

    expect(onSuccess).toHaveBeenCalledWith(mockAuthResponse);
  });
});

describe("useLogout", () => {
  it("calls authContext.logout when invoked", async () => {
    mockLogout.mockResolvedValue(undefined);
    const { wrapper } = makeWrapper();

    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      result.current.mutate();
    });

    expect(mockLogout).toHaveBeenCalled();
  });

  it("clears the query client data when invoked", async () => {
    mockLogout.mockResolvedValue(undefined);
    const { wrapper, queryClient } = makeWrapper();
    queryClient.setQueryData(["user"], { id: "1", name: "John" });

    const { result } = renderHook(() => useLogout(), { wrapper });

    await act(async () => {
      result.current.mutate();
    });

    expect(queryClient.getQueryData(["user"])).toBeUndefined();
  });
});
