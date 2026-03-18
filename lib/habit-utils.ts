import type { Habit, SkillBuildingPhase, TrackingCoachedPhase } from "@/types/habits";

export function getCurrentPhase(habit: Habit): SkillBuildingPhase | TrackingCoachedPhase | null {
  if (!habit.habit_plan || habit.plan_status !== "ready") return null;
  return (
    habit.habit_plan.phases.find((phase) => {
      const [start, end] = phase.days.split("-").map(Number);
      return habit.current_day >= start && habit.current_day <= end;
    }) ?? null
  );
}

export function getJournalPrompt(habit: Habit): string | undefined {
  return getCurrentPhase(habit)?.journal_prompt;
}
