"use client";

import { createContext, useContext } from "react";
import type { AuthResponse, RegisterResponse, LoginInput, RegisterInput, User } from "@/types/auth";

export interface AuthContextValue {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthReady?: boolean;
  login: (_data: LoginInput) => Promise<AuthResponse>;
  register: (_data: RegisterInput) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
  setAccessToken: (_token: string | null) => void;
  setUser: (_user: User | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
