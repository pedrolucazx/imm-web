import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { consentService } from "@/lib/consent.service";
import { toaster } from "@/components/ui/toaster";
import { useAuthContext } from "@/lib/auth-context";
import { resolveAuthReady } from "@/lib/auth-state";
import { useTranslatedError } from "./useTranslatedError";

export function useGetConsents() {
  const auth = useAuthContext();
  const isAuthReady = resolveAuthReady(auth);
  const { accessToken } = auth;

  return useQuery({
    queryKey: ["consents"],
    queryFn: () => consentService.getConsents(),
    retry: false,
    staleTime: Infinity,
    enabled: isAuthReady && !!accessToken,
  });
}

export function useSaveConsent(options?: { onError?: (_error: Error) => void }) {
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      Promise.all([
        consentService.saveConsent("cookie_consent"),
        consentService.saveConsent("privacy_policy"),
        consentService.saveConsent("terms_of_use"),
      ]),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["consents"] });
    },
    onError: (error: Error) => {
      toaster.create({
        title: t("title"),
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
      options?.onError?.(error);
    },
  });
}
