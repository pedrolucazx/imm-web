import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { toaster } from "@/components/ui/toaster";
import type { AuthResponse, LoginInput, RegisterInput } from "@/types/auth";
import { useTranslations } from "next-intl";

export interface AuthMutationOptions {
  onSuccess?: (_data: AuthResponse) => void;
  onError?: (_error: Error) => void;
}

// Register mutation
export function useRegister(
  options?: AuthMutationOptions
): UseMutationResult<AuthResponse, Error, RegisterInput> {
  const { register } = useAuthContext();
  const queryClient = useQueryClient();
  const t = useTranslations("auth.register");

  return useMutation({
    mutationFn: (data: RegisterInput): Promise<AuthResponse> => register(data),
    onSuccess: (data: AuthResponse): void => {
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
      options?.onError?.(error);
    },
  });
}

// Login mutation
export function useLogin(
  options?: AuthMutationOptions
): UseMutationResult<AuthResponse, Error, LoginInput> {
  const { login } = useAuthContext();
  const queryClient = useQueryClient();
  const t = useTranslations("auth.login");

  return useMutation({
    mutationFn: (data: LoginInput): Promise<AuthResponse> => login(data),
    onSuccess: (data: AuthResponse): void => {
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
      options?.onError?.(error);
    },
  });
}

// Logout
export function useLogout(): UseMutationResult<void, Error, void> {
  const { logout } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: (): void => {
      queryClient.clear();
    },
  });
}
