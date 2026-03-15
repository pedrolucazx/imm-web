export type TargetSkill = "en-US" | "es-ES" | "pt-BR" | "general" | "fitness" | "mindfulness";

export type HabitMode = "skill-building" | "tracking-coached";

export type PlanStatus = "ready" | "generating" | "pending" | "failed" | "skipped";

export interface HabitPlanPhase {
  phase: number;
  days: string;
  theme: string;
}

export interface SkillBuildingPhase extends HabitPlanPhase {
  daily_tasks: string[];
}

export interface TrackingCoachedPhase extends HabitPlanPhase {
  weekly_focus: string;
  tip: string;
}

export interface HabitPlan {
  strategy: string;
  total_time_per_day_minutes: number;
  success_metrics: string;
  phases: (SkillBuildingPhase | TrackingCoachedPhase)[];
}

export interface Habit {
  id: string;
  name: string;
  target_skill: TargetSkill;
  habit_mode: HabitMode;
  icon: string;
  color: string;
  frequency: string;
  is_active: boolean;
  start_date: string;
  current_day: number;
  streak: number;
  plan_status: PlanStatus;
  habit_plan: HabitPlan | null;
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

export type SkillMetadata = {
  label: string;
  icon: string;
  shortDescription: string;
  longDescription?: string;
  category: "language" | "behavioral";
  hasDailyPlan: boolean;
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

export function deriveHabitMode(skill: TargetSkill): HabitMode {
  return LANGUAGE_SKILLS.includes(skill) ? "skill-building" : "tracking-coached";
}

export const MAX_ACTIVE_HABITS = 5;
export const WARN_ACTIVE_HABITS = 3;
