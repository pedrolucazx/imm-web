"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { authService } from "@/lib/auth.service";
import type { AuthResponse, RegisterResponse, LoginInput, RegisterInput, User } from "@/types/auth";
import { isAuthRoute, isProtectedRoute } from "@/lib/routing-utils";
import { logger } from "@/lib/logger";

function hasRefreshTokenCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((cookie) => cookie.trim().startsWith("refreshToken="));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCurrentAuthRoute = isAuthRoute(pathname);
  const isCurrentProtectedRoute = isProtectedRoute(pathname);
  const hasAttemptedRestore = useRef(false);
  const previousIsProtectedRoute = useRef(isCurrentProtectedRoute);
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(isCurrentAuthRoute);

  useEffect(() => {
    api.setOnTokenRefreshed((newToken, newUser) => {
      setAccessTokenState(newToken);
      setUserState(newUser);
    });
  }, []);

  useEffect(() => {
    if (!previousIsProtectedRoute.current && isCurrentProtectedRoute) {
      hasAttemptedRestore.current = false;
    }
    previousIsProtectedRoute.current = isCurrentProtectedRoute;

    if (isCurrentAuthRoute) {
      setIsAuthReady(true);
      return;
    }

    const existingToken = api.getToken();
    const shouldAttemptRestore =
      Boolean(existingToken) || isCurrentProtectedRoute || hasRefreshTokenCookie();

    if (!shouldAttemptRestore) {
      logger.debug("[AuthProvider] skipping session restore on public route", { pathname });
      setIsAuthReady(true);
      return;
    }

    if (hasAttemptedRestore.current) return;
    setIsAuthReady(false);
    hasAttemptedRestore.current = true;

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
        setUserState(null);
      })
      .finally(() => {
        setIsAuthReady(true);
      });
  }, [pathname, isCurrentAuthRoute, isCurrentProtectedRoute]);

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
        isLoading: !isAuthReady,
        isAuthReady,
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
