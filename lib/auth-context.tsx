"use client";

import { createContext, useContext } from "react";
import type { AuthResponse, LoginInput, RegisterInput, User } from "@/types/auth";

export interface AuthContextValue {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (_data: LoginInput) => Promise<AuthResponse>;
  register: (_data: RegisterInput) => Promise<AuthResponse>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
