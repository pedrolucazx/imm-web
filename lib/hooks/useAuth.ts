import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { authService } from "@/lib/auth.service";
import { toaster } from "@/components/ui";
import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth";
import { useTranslations } from "next-intl";

export interface AuthMutationOptions {
  onSuccess?: (_data: AuthResponse) => void;
}

// Register mutation
export function useRegister(
  options?: AuthMutationOptions
): UseMutationResult<AuthResponse, Error, RegisterInput> {
  const queryClient = useQueryClient();
  const t = useTranslations("auth.register");

  return useMutation({
    mutationFn: async (data: RegisterInput): Promise<AuthResponse> => {
      return authService.register(data);
    },
    onSuccess: (data: AuthResponse): void => {
      authService.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
      toaster.create({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDesc"),
        type: "success",
        meta: { closable: true },
      });
      options?.onSuccess?.(data);
    },
    onError: (error: Error): void => {
      toaster.create({
        title: t("toastErrorTitle"),
        description: error.message || t("toastErrorDesc"),
        type: "error",
        meta: { closable: true },
      });
    },
  });
}

// Login mutation
export function useLogin(
  options?: AuthMutationOptions
): UseMutationResult<AuthResponse, Error, LoginInput> {
  const queryClient = useQueryClient();
  const t = useTranslations("auth.login");

  return useMutation({
    mutationFn: async (data: LoginInput): Promise<AuthResponse> => {
      return authService.login(data);
    },
    onSuccess: (data: AuthResponse): void => {
      authService.setToken(data.token);
      queryClient.setQueryData(["user"], data.user);
      toaster.create({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDesc"),
        type: "success",
        meta: { closable: true },
      });
      options?.onSuccess?.(data);
    },
    onError: (error: Error): void => {
      toaster.create({
        title: t("toastErrorTitle"),
        description: error.message || t("toastErrorDesc"),
        type: "error",
        meta: { closable: true },
      });
    },
  });
}

// Logout
export function useLogout(): () => void {
  const queryClient = useQueryClient();

  return (): void => {
    authService.removeToken();
    queryClient.setQueryData(["user"], null);
    queryClient.clear();
  };
}
