"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { authService } from "@/lib/auth.service";
import type { AuthResponse, RegisterResponse, LoginInput, RegisterInput, User } from "@/types/auth";
import { isAuthRoute } from "@/lib/routing-utils";
import { logger } from "@/lib/logger";

function hasRefreshTokenCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((cookie) => cookie.trim().startsWith("refreshToken="));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const initialIsAuthRoute = useRef(isAuthRoute(pathname));
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(!initialIsAuthRoute.current);

  useEffect(() => {
    api.setOnTokenRefreshed((newToken, newUser) => {
      setAccessTokenState(newToken);
      setUserState(newUser);
    });
  }, []);

  useEffect(() => {
    if (initialIsAuthRoute.current) return;

    const existingToken = api.getToken();
    if (existingToken) {
      setAccessTokenState(existingToken);
      authService
        .refresh()
        .then((data) => {
          api.setToken(data.token);
          setAccessTokenState(data.token);
          setUserState(data.user);
        })
        .catch(() => {
          api.removeToken();
          setAccessTokenState(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
      return;
    }

    const hasRefreshToken = hasRefreshTokenCookie();
    if (hasRefreshToken) {
      authService
        .refresh()
        .then((data) => {
          api.setToken(data.token);
          setAccessTokenState(data.token);
          setUserState(data.user);
        })
        .catch((error) => {
          logger.debug("[AuthProvider] silent refresh failed", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (data: LoginInput): Promise<AuthResponse> => {
    const response = await authService.login(data);
    api.setToken(response.token);
    setAccessTokenState(response.token);
    setUserState(response.user);
    return response;
  }, []);

  const register = useCallback(async (data: RegisterInput): Promise<RegisterResponse> => {
    return authService.register(data);
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      api.removeToken();
      setAccessTokenState(null);
      setUserState(null);
    }
  }, []);

  const setAccessToken = useCallback((token: string | null) => {
    setAccessTokenState(token);
  }, []);

  const setUser = useCallback((userData: User | null) => {
    setUserState(userData);
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
        setAccessToken,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
