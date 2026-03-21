import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useAuthContext } from "@/lib/auth-context";
import {
  habitService,
  type CreateHabitInput,
  type PreviewPlanInput,
  type HabitLogInput,
} from "@/lib/habit.service";
import { toaster } from "@/components/ui/toaster";
import type { Habit } from "@/types/habits";
import { useTranslatedError } from "./useTranslatedError";

export function useHabits() {
  const { isLoading: isAuthLoading, accessToken } = useAuthContext();

  const query = useQuery<Habit[], Error>({
    queryKey: ["habits"],
    queryFn: () => habitService.list(),
    enabled: !isAuthLoading && !!accessToken,
  });

  return {
    ...query,
    isLoading: isAuthLoading || query.isPending,
  };
}

function createErrorHandler(
  t: (_key: string) => string,
  translateError: (_error: Error) => string
) {
  return (error: Error): void => {
    toaster.create({
      title: t("title"),
      description: translateError(error),
      type: "error",
      meta: { closable: true },
    });
  };
}

export function usePreviewHabitPlan() {
  const queryClient = useQueryClient();
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: (input: PreviewPlanInput) => habitService.previewPlan(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: createErrorHandler(t, translateError),
  });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: (input: CreateHabitInput) => habitService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onError: createErrorHandler(t, translateError),
  });
}

export function useLogHabit() {
  const queryClient = useQueryClient();
  const t = useTranslations("errors");
  const { translateError } = useTranslatedError();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: HabitLogInput }) =>
      habitService.log(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
    onError: createErrorHandler(t, translateError),
  });
}
