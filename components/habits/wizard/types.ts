import { z } from "zod";

export type Level = "beginner" | "intermediate" | "advanced";

export const LEVELS: Level[] = ["beginner", "intermediate", "advanced"];

export const habitSetupSchema = z.object({
  name: z.string().min(1).max(80),
  targetSkill: z.string().min(1),
});

export const skillPlanSchema = z.object({
  struggles: z.string().min(1),
  availableMinutes: z.number().int().min(5).max(120),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export const trackingConfigSchema = z.object({
  wantPlan: z.boolean(),
  barrier: z.string(),
  availableMinutes: z.number().int().min(5).max(120),
  level: z.enum(["beginner", "intermediate", "advanced"]),
});

export type HabitSetupData = z.infer<typeof habitSetupSchema>;
export type SkillPlanData = z.infer<typeof skillPlanSchema>;
export type TrackingConfigData = z.infer<typeof trackingConfigSchema>;

export const WIZARD_FORM_ID = "habit-wizard-form";
