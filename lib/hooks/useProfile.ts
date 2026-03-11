import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useAuthContext } from "@/lib/auth-context";
import { userService } from "@/lib/user.service";
import { toaster } from "@/components/ui/toaster";
import type { UpdateProfileInput, UserProfile } from "@/types/user";

export function useGetProfile() {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => userService.getMe(),
    enabled: !isAuthLoading && !!accessToken,
  });

  return {
    ...query,
    isLoading: isAuthLoading || query.isPending,
  };
}

export function useUpdateProfile(options?: { silent?: boolean }) {
  const queryClient = useQueryClient();
  const t = useTranslations("settings");

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
        description: error.message || t("toastErrorDesc"),
        type: "error",
        meta: { closable: true },
      });
    },
  });
}
