export type TargetSkill =
  | "en-US"
  | "es-ES"
  | "fr-FR"
  | "pt-BR"
  | "general"
  | "fitness"
  | "mindfulness";

export type HabitMode = "skill-building" | "tracking-coached";

export type PlanStatus = "ready" | "generating" | "pending" | "failed" | "skipped";

export interface HabitPlanPhase {
  phase: number;
  days: string;
  theme: string;
  journal_prompt?: string;
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
  completed_today: boolean;
  plan_status: PlanStatus;
  habit_plan: HabitPlan | null;
}

export type SkillMetadata = {
  label: string;
  icon: string;
  shortDescription: string;
  longDescription?: string;
  category: "language" | "behavioral";
  hasDailyPlan: boolean;
};
