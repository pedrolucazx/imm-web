import type {
  Habit,
  HabitMode,
  HabitPlan,
  PlanStatus,
  SkillBuildingPhase,
  SkillMetadata,
  TargetSkill,
  TrackingCoachedPhase,
} from "@/types/habits";
import type { SkillPlanData, TrackingConfigData } from "@/components/habits/wizard/types";
import { API_COLORS } from "@/lib/constants";

export interface ApiHabit {
  id: string;
  userId: string;
  name: string;
  targetSkill: string | null;
  icon: string;
  color: string;
  frequency: string;
  targetDays: number;
  isActive: boolean;
  sortOrder: number;
  startDate: string | null;
  habitPlan: Record<string, unknown> | null;
  planStatus: string;
  streak: number;
  currentDay: number;
  completedToday: boolean;
  createdAt: string;
  updatedAt: string;
}

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

export const LANGUAGE_SKILLS: TargetSkill[] = ["en-US", "es-ES", "pt-BR"];
export const BEHAVIORAL_SKILLS: TargetSkill[] = ["general", "fitness", "mindfulness"];

export const SKILL_ICONS: Record<TargetSkill, string> = {
  "en-US": "🇺🇸",
  "es-ES": "🇪🇸",
  "pt-BR": "🇧🇷",
  general: "🧠",
  fitness: "💪",
  mindfulness: "🧘",
};

export const SKILL_METADATA: Record<TargetSkill, SkillMetadata> = {
  "en-US": {
    label: "habits.skills.en-US.name",
    icon: "🇺🇸",
    shortDescription: "habits.skills.en-US.short",
    longDescription: "habits.skills.en-US.long",
    category: "language",
    hasDailyPlan: true,
  },
  "es-ES": {
    label: "habits.skills.es-ES.name",
    icon: "🇪🇸",
    shortDescription: "habits.skills.es-ES.short",
    longDescription: "habits.skills.es-ES.long",
    category: "language",
    hasDailyPlan: true,
  },
  "pt-BR": {
    label: "habits.skills.pt-BR.name",
    icon: "🇧🇷",
    shortDescription: "habits.skills.pt-BR.short",
    longDescription: "habits.skills.pt-BR.long",
    category: "language",
    hasDailyPlan: true,
  },
  general: {
    label: "habits.skills.general.name",
    icon: "🧠",
    shortDescription: "habits.skills.general.short",
    longDescription: "habits.skills.general.long",
    category: "behavioral",
    hasDailyPlan: false,
  },
  fitness: {
    label: "habits.skills.fitness.name",
    icon: "💪",
    shortDescription: "habits.skills.fitness.short",
    longDescription: "habits.skills.fitness.long",
    category: "behavioral",
    hasDailyPlan: false,
  },
  mindfulness: {
    label: "habits.skills.mindfulness.name",
    icon: "🧘",
    shortDescription: "habits.skills.mindfulness.short",
    longDescription: "habits.skills.mindfulness.long",
    category: "behavioral",
    hasDailyPlan: false,
  },
};

export const MAX_ACTIVE_HABITS = 5;
export const WARN_ACTIVE_HABITS = 3;

export function deriveHabitMode(skill: TargetSkill): HabitMode {
  return LANGUAGE_SKILLS.includes(skill) ? "skill-building" : "tracking-coached";
}

export function buildPainPoints(data: SkillPlanData | TrackingConfigData): string[] {
  const raw = "barrier" in data ? data.barrier : data.struggles;
  return raw
    .split(/[.,;]+/)
    .map((s: string) => s.trim())
    .filter(Boolean);
}

export function randomColor(): string {
  return API_COLORS[Math.floor(Math.random() * API_COLORS.length)];
}

const VALID_SKILLS = new Set<TargetSkill>([...LANGUAGE_SKILLS, ...BEHAVIORAL_SKILLS]);

export function toTargetSkill(apiSkill: string | null): TargetSkill {
  if (apiSkill && VALID_SKILLS.has(apiSkill as TargetSkill)) {
    return apiSkill as TargetSkill;
  }
  return "general";
}

export function toHabitMode(targetSkill: TargetSkill): HabitMode {
  return LANGUAGE_SKILLS.includes(targetSkill) ? "skill-building" : "tracking-coached";
}

export function toPlanStatus(
  apiStatus: string,
  habitPlan: Record<string, unknown> | null
): PlanStatus {
  switch (apiStatus) {
    case "generating":
      return "generating";
    case "failed":
      return "failed";
    case "pending":
      return "pending";
    case "ready":
      return "ready";
    case "active":
      return habitPlan && Object.keys(habitPlan).length > 0 ? "ready" : "skipped";
    default:
      return "skipped";
  }
}

export function toChakraColor(apiColor: string): string {
  if (!API_COLORS.includes(apiColor as (typeof API_COLORS)[number])) return "surface.mint";
  return apiColor.replace(/^bg-/, "").replace(/-([^-]+)$/, ".$1");
}

export function toHabitPlan(raw: Record<string, unknown> | null): HabitPlan | null {
  if (!raw || !raw.strategy || !Array.isArray(raw.phases)) return null;
  return raw as unknown as HabitPlan;
}

export function mapApiHabitToHabit(apiHabit: ApiHabit): Habit {
  const targetSkill = toTargetSkill(apiHabit.targetSkill);
  return {
    id: apiHabit.id,
    name: apiHabit.name,
    target_skill: targetSkill,
    habit_mode: toHabitMode(targetSkill),
    icon: apiHabit.icon,
    color: toChakraColor(apiHabit.color),
    frequency: apiHabit.frequency,
    is_active: apiHabit.isActive,
    start_date: apiHabit.startDate ?? "",
    current_day: apiHabit.currentDay ?? 1,
    streak: apiHabit.streak ?? 0,
    completed_today: apiHabit.completedToday ?? false,
    plan_status: toPlanStatus(apiHabit.planStatus, apiHabit.habitPlan),
    habit_plan: toHabitPlan(apiHabit.habitPlan),
  };
}
