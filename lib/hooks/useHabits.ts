import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "@/lib/auth-context";
import {
  habitService,
  type CreateHabitInput,
  type PreviewPlanInput,
  type HabitLogInput,
} from "@/lib/habit.service";
import type { Habit } from "@/types/habits";

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

export function usePreviewHabitPlan() {
  return useMutation({
    mutationFn: (input: PreviewPlanInput) => habitService.previewPlan(input),
  });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateHabitInput) => habitService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}

export function useLogHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: HabitLogInput }) =>
      habitService.log(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["habits"] });
    },
  });
}
