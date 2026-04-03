import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useAuthContext } from "@/lib/auth-context";
import { resolveAuthReady } from "@/lib/auth-state";
import { userService } from "@/lib/user.service";
import { toaster } from "@/components/ui/toaster";
import type { UpdateProfileInput, UserProfile } from "@/types/user";
import { useTranslatedError } from "./useTranslatedError";

export function useGetProfile() {
  const auth = useAuthContext();
  const isAuthReady = resolveAuthReady(auth);
  const { accessToken } = auth;

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getMe(),
    enabled: isAuthReady && !!accessToken,
  });

  return {
    ...query,
    isLoading: !isAuthReady || query.isLoading,
  };
}

export function useUpdateProfile(options?: { silent?: boolean }) {
  const queryClient = useQueryClient();
  const t = useTranslations("settings");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => userService.updateMe(data),
    onSuccess: (updatedProfile: UserProfile) => {
      queryClient.setQueryData(["profile"], updatedProfile);
      if (!options?.silent) {
        toaster.create({
          title: t("toastSuccessTitle"),
          description: t("toastSuccessDesc"),
          type: "success",
          meta: { closable: true },
        });
      }
    },
    onError: (error: Error) => {
      toaster.create({
        title: t("toastErrorTitle"),
        description: translateError(error),
        type: "error",
        meta: { closable: true },
      });
    },
  });
}
