import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { Habit, HabitMode, HabitPlan, PlanStatus, TargetSkill } from "@/types/habits";
import { LANGUAGE_SKILLS } from "@/types/habits";

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
  habitPlan: Record<string, unknown>;
  planStatus: string;
  streak: number;
  currentDay: number;
  createdAt: string;
  updatedAt: string;
}

export interface HabitLogInput {
  logDate: string;
  completed: boolean;
}

export interface HabitLogResponse {
  id: string;
  habitId: string;
  logDate: string;
  completed: boolean;
  completedAt: string | null;
}

const VALID_SKILLS = new Set<TargetSkill>([
  "en-US",
  "es-ES",
  "pt-BR",
  "general",
  "fitness",
  "mindfulness",
]);

function toTargetSkill(apiSkill: string | null): TargetSkill {
  if (apiSkill && VALID_SKILLS.has(apiSkill as TargetSkill)) {
    return apiSkill as TargetSkill;
  }
  return "general";
}

function toHabitMode(targetSkill: TargetSkill): HabitMode {
  return LANGUAGE_SKILLS.includes(targetSkill) ? "skill-building" : "tracking-coached";
}

function toPlanStatus(apiStatus: string, habitPlan: Record<string, unknown>): PlanStatus {
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
      return Object.keys(habitPlan).length > 0 ? "ready" : "skipped";
    default:
      return "skipped";
  }
}

function toChakraColor(apiColor: string): string {
  // "bg-surface-mint" → "surface.mint"
  return apiColor.replace(/^bg-/, "").replace(/-([^-]+)$/, ".$1");
}

function toHabitPlan(raw: Record<string, unknown>): HabitPlan | null {
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
    plan_status: toPlanStatus(apiHabit.planStatus, apiHabit.habitPlan),
    habit_plan: toHabitPlan(apiHabit.habitPlan),
  };
}

export interface CreateHabitInput {
  name: string;
  icon: string;
  color: string;
  targetSkill?: string;
  frequency?: string;
  sortOrder?: number;
  startDate?: string;
  habitPlan?: HabitPlan;
}

export interface PreviewPlanInput {
  name: string;
  targetSkill?: string;
  painPoints: string[];
  availableMinutes: number;
  level: "beginner" | "intermediate" | "advanced";
}

export interface CreateWithPlanInput extends CreateHabitInput {
  painPoints: string[];
  availableMinutes: number;
  level: "beginner" | "intermediate" | "advanced";
}

export interface RegeneratePlanInput {
  painPoints: string[];
  availableMinutes: number;
  level: "beginner" | "intermediate" | "advanced";
}

export const habitService = {
  async list(): Promise<Habit[]> {
    const data = await api.get<ApiHabit[]>(ENDPOINTS.HABITS.LIST);
    return data.map(mapApiHabitToHabit);
  },

  async getById(id: string): Promise<Habit> {
    const data = await api.get<ApiHabit>(ENDPOINTS.HABITS.GET(id));
    return mapApiHabitToHabit(data);
  },

  async create(input: CreateHabitInput): Promise<Habit> {
    const data = await api.post<ApiHabit>(ENDPOINTS.HABITS.CREATE, input);
    return mapApiHabitToHabit(data);
  },

  async previewPlan(input: PreviewPlanInput): Promise<HabitPlan> {
    return api.post<HabitPlan>(ENDPOINTS.HABITS.PREVIEW_PLAN, input);
  },

  async createWithPlan(input: CreateWithPlanInput): Promise<Habit> {
    const data = await api.post<ApiHabit>(ENDPOINTS.HABITS.CREATE_WITH_PLAN, input);
    return mapApiHabitToHabit(data);
  },

  async regeneratePlan(id: string, input: RegeneratePlanInput): Promise<Habit> {
    const data = await api.post<ApiHabit>(ENDPOINTS.HABITS.REGENERATE_PLAN(id), input);
    return mapApiHabitToHabit(data);
  },

  async log(id: string, input: HabitLogInput): Promise<HabitLogResponse> {
    return api.post<HabitLogResponse>(ENDPOINTS.HABITS.LOG(id), input);
  },
};
