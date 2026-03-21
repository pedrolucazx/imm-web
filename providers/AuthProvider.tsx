"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/lib/auth-context";
import { api } from "@/lib/api-client";
import { authService } from "@/lib/auth.service";
import type { AuthResponse, LoginInput, RegisterInput, User } from "@/types/auth";
import { isAuthRoute } from "@/lib/routing-utils";

function hasRefreshTokenCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.split(";").some((cookie) => cookie.trim().startsWith("refreshToken="));
}

/**
 * Provedor de autenticação que gerencia estado global de usuário e token.
 * Tenta refresh automático ao carregar e fornece funções de login/logout/register.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [user, setUserState] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(!isAuthRoute(pathname));

  useEffect(() => {
    api.setOnTokenRefreshed((newToken, newUser) => {
      setAccessTokenState(newToken);
      setUserState(newUser);
    });
  }, []);

  useEffect(() => {
    if (isAuthRoute(pathname)) return;

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
        .catch((_error) => {})
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (data: LoginInput): Promise<AuthResponse> => {
    const response = await authService.login(data);
    api.setToken(response.token);
    setAccessTokenState(response.token);
    setUserState(response.user);
    return response;
  }, []);

  const register = useCallback(async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await authService.register(data);
    api.setToken(response.token);
    setAccessTokenState(response.token);
    setUserState(response.user);
    return response;
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
