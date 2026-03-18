import { z } from "zod";
import {
  MAX_HABIT_NAME_LENGTH,
  MIN_AVAILABLE_MINUTES,
  MAX_AVAILABLE_MINUTES,
} from "@/lib/constants";

export type Level = "beginner" | "intermediate" | "advanced";

export const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

export const habitSetupSchema = z.object({
  name: z.string().min(1).max(MAX_HABIT_NAME_LENGTH),
  targetSkill: z.string().min(1),
});

export const skillPlanSchema = z.object({
  struggles: z.string().min(1),
  availableMinutes: z.number().int().min(MIN_AVAILABLE_MINUTES).max(MAX_AVAILABLE_MINUTES),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export const trackingConfigSchema = z
  .object({
    wantPlan: z.boolean(),
    barrier: z.string().trim(),
    availableMinutes: z.number().int().min(MIN_AVAILABLE_MINUTES).max(MAX_AVAILABLE_MINUTES),
    level: z.enum(["beginner", "intermediate", "advanced"]),
  })
  .refine((data) => !data.wantPlan || data.barrier.trim().length > 0, {
    path: ["barrier"],
    message: "required",
  });

export type HabitSetupData = z.infer<typeof habitSetupSchema>;
export type SkillPlanData = z.infer<typeof skillPlanSchema>;
export type TrackingConfigData = z.infer<typeof trackingConfigSchema>;

export const WIZARD_FORM_ID = "habit-wizard-form";
