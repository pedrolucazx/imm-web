import { api } from "@/lib/api-client";
import { ENDPOINTS } from "@/lib/endpoints";
import type { Habit, HabitPlan } from "@/types/habits";
import { type ApiHabit, mapApiHabitToHabit } from "@/lib/habit-utils";

export type { ApiHabit };

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
  feedbackOnPlan?: string;
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
