import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useAuthContext } from "@/lib/auth-context";
import { userService } from "@/lib/user.service";
import { api } from "@/lib/api-client";
import { toaster } from "@/components/ui/toaster";
import { useTranslatedError } from "./useTranslatedError";

export interface DeleteAccountOptions {
  onSuccess?: () => void;
  onError?: (_error: Error) => void;
}

export function useDeleteAccount(
  options?: DeleteAccountOptions
): UseMutationResult<void, Error, string> {
  const { setUser, setAccessToken } = useAuthContext();
  const queryClient = useQueryClient();
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: (password: string): Promise<void> => userService.deleteAccount(password),
    onSuccess: (): void => {
      api.removeToken();
      localStorage.removeItem("imm_access_token");
      localStorage.removeItem("imm_refresh_token");
      localStorage.removeItem("imm_consent_given");
      setAccessToken(null);
      setUser(null);
      queryClient.clear();
      options?.onSuccess?.();
      window.location.href = "/";
    },
    onError: (error: Error): void => {
      if (!options?.onError) {
        toaster.create({
          title: t("title"),
          description: translateError(error),
          type: "error",
          meta: { closable: true },
        });
      }
      options?.onError?.(error);
    },
  });
}
