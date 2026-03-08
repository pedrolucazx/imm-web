"use client";

import { useCallback, useEffect, useState } from "react";
import { AuthContext } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { authService } from "@/lib/auth.service";
import type { AuthResponse, LoginInput, RegisterInput, User } from "@/types/auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.setOnTokenRefreshed((newToken, newUser) => {
      setAccessToken(newToken);
      setUser(newUser);
    });
    return () => {
      api.setOnTokenRefreshed(() => {});
    };
  }, []);

  useEffect(() => {
    authService
      .refresh()
      .then((data) => {
        api.setToken(data.token);
        setAccessToken(data.token);
        setUser(data.user);
      })
      .catch((error) => {
        // No valid refresh token — user is considered logged out
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.debug("[AuthProvider] Session rehydration failed:", error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async (data: LoginInput): Promise<AuthResponse> => {
    const response = await authService.login(data);
    api.setToken(response.token);
    setAccessToken(response.token);
    setUser(response.user);
    return response;
  }, []);

  const register = useCallback(async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await authService.register(data);
    api.setToken(response.token);
    setAccessToken(response.token);
    setUser(response.user);
    return response;
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      api.removeToken();
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated: accessToken !== null,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
