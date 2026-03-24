import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { toaster } from "@/components/ui/toaster";
import type { AuthResponse, RegisterResponse, LoginInput, RegisterInput } from "@/types/auth";
import { useTranslations } from "next-intl";
import { useTranslatedError } from "./useTranslatedError";

export interface RegisterMutationOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export interface AuthMutationOptions {
  onSuccess?: (_data: AuthResponse) => void;
  onError?: (_error: Error) => void;
}

export function useRegister(
  options?: RegisterMutationOptions
): UseMutationResult<RegisterResponse, Error, RegisterInput> {
  const { register } = useAuthContext();
  const t = useTranslations("auth.register");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: (data: RegisterInput): Promise<RegisterResponse> => register(data),
    onSuccess: (): void => {
      options?.onSuccess?.();
      toaster.create({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDesc"),
        type: "success",
        meta: { closable: true },
      });
    },
    onError: (error: Error): void => {
      const translatedMessage = translateError(error);
      toaster.create({
        title: t("toastErrorTitle"),
        description: translatedMessage,
        type: "error",
        meta: { closable: true },
      });
      options?.onError?.(error);
    },
  });
}

export function useLogin(
  options?: AuthMutationOptions
): UseMutationResult<AuthResponse, Error, LoginInput> {
  const { login } = useAuthContext();
  const queryClient = useQueryClient();
  const t = useTranslations("auth.login");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: (data: LoginInput): Promise<AuthResponse> => login(data),
    onSuccess: (data: AuthResponse): void => {
      queryClient.setQueryData(["user"], data.user);
      options?.onSuccess?.(data);
      toaster.create({
        title: t("toastSuccessTitle"),
        description: t("toastSuccessDesc"),
        type: "success",
        meta: { closable: true },
      });
    },
    onError: (error: Error): void => {
      if (error.message === "EMAIL_NOT_VERIFIED") {
        toaster.create({
          title: t("emailNotVerifiedTitle"),
          description: t("emailNotVerifiedDesc"),
          type: "warning",
          meta: { closable: true },
        });
      } else {
        const translatedMessage = translateError(error);
        toaster.create({
          title: t("toastErrorTitle"),
          description: translatedMessage,
          type: "error",
          meta: { closable: true },
        });
      }
      options?.onError?.(error);
    },
  });
}

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
