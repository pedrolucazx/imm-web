import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import { onboardingService } from "@/lib/onboarding.service";
import type { UpdateOnboardingInput } from "@/types/onboarding";

const LS_KEY_PREFIX = "onboarding_completed";

export function useOnboarding() {
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuthContext();
  const queryClient = useQueryClient();

  const lsKey = user?.id ? `${LS_KEY_PREFIX}_${user.id}` : null;

  // Always query the server — server is the source of truth.
  // localStorage is only a write-cache (avoids showing the tour again mid-session
  // after the user completes/skips), never a gate that prevents the query from running.
  const query = useQuery({
    queryKey: ["onboarding", user?.id],
    queryFn: () => onboardingService.getStatus(),
    enabled: !isAuthLoading && isAuthenticated,
    staleTime: Infinity,
    retry: false,
  });

  // Keep localStorage in sync with server state so that if the server says
  // "not done" (e.g. after restartTour), we immediately clear the stale flag.
  useEffect(() => {
    if (!lsKey) return;
    if (query.data?.completed || query.data?.skipped) {
      localStorage.setItem(lsKey, "true");
    } else if (query.isSuccess) {
      localStorage.removeItem(lsKey);
    }
  }, [query.data, query.isSuccess, lsKey]);

  const shouldShowTour = query.isSuccess && !query.data?.completed && !query.data?.skipped;

  const { mutateAsync: updateOnboarding } = useMutation({
    mutationFn: (data: UpdateOnboardingInput) => onboardingService.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["onboarding", user?.id] });
    },
  });

  const completeTour = async (): Promise<void> => {
    await updateOnboarding({ completed: true });
    if (lsKey) localStorage.setItem(lsKey, "true");
  };

  const skipTour = async (): Promise<void> => {
    await updateOnboarding({ skipped: true });
    if (lsKey) localStorage.setItem(lsKey, "true");
  };

  const restartTour = async (): Promise<void> => {
    if (lsKey) localStorage.removeItem(lsKey);
    await updateOnboarding({ completed: false, skipped: false, currentStep: 0 });
  };

  return { shouldShowTour, completeTour, skipTour, restartTour };
}
